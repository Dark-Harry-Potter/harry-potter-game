// AI Engine v3 - Autonomous Game Management System
// This system runs autonomously without admin intervention
// Incorporates all extended Harry Potter lore: canonical HP 1-7, Fantastic Beasts, James Potter series, Methods of Rationality
import Anthropic from '@anthropic-ai/sdk';
import { EXTENDED_LORE, getRandomLoreContext, getDifficultyFromLevel } from './extended-lore-v3';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// NPC personality types
export type NPCPersonality = 'mentor' | 'rival' | 'ally' | 'mysterious' | 'merchant';

export interface NPC {
  id: string;
  name: string;
  personality: NPCPersonality;
  location: string;
  mood: 'happy' | 'neutral' | 'angry' | 'sad' | 'mysterious';
  currentActivity: string;
  dialogueMemory: string[];
  relationshipScores: Map<string, number>; // userId -> relationship
  inventory: string[];
  lastUpdate: Date;
}

export interface GameEvent {
  id: string;
  type: 'combat' | 'exploration' | 'trade' | 'social' | 'worldchange';
  title: string;
  description: string;
  affectedPlayers: string[];
  reward: { currency: number; xp: number };
  timestamp: Date;
  worldImpact: number; // 0-100
}

export interface WorldState {
  timeOfDay: 'dawn' | 'morning' | 'noon' | 'afternoon' | 'dusk' | 'night';
  weather: 'clear' | 'cloudy' | 'rainy' | 'stormy' | 'foggy';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  conflicts: number; // 0-100 world tension
  harmony: number; // 0-100 world peace
  economyInflation: number; // price multiplier
}

// AI-driven NPC behavior generator with extended lore context
export async function generateNPCBehavior(npc: NPC, worldState: WorldState, playerActions: string[]): Promise<string> {
  const loreContext = getRandomLoreContext();
  const loreSource = typeof loreContext === 'object' && 'title' in loreContext ? loreContext.title : 'Wizarding World';
  
  const prompt = `
You are an intelligent NPC in a magical wizard academy game set in the comprehensive wizarding universe spanning:
- Canonical Harry Potter books (1-7) and Fantastic Beasts films
- Extended universe including James Potter series (next generation wizards)
- Rationalist magical studies and advanced spell theory
- Extended wizarding materials (Quidditch, creature care, magical history)

Your responses should reflect knowledge of these interconnected lore sources while maintaining your NPC personality.
Current lore context: ${loreSource}

Your role is to respond naturally based on your personality and the world state.

NPC Profile:
- Name: ${npc.name}
- Personality: ${npc.personality}
- Current Mood: ${npc.mood}
- Location: ${npc.location}
- Current Activity: ${npc.currentActivity}
- Recent Dialogue Memory: ${npc.dialogueMemory.slice(-3).join('; ')}

World State:
- Time: ${worldState.timeOfDay}
- Weather: ${worldState.weather}
- Season: ${worldState.season}
- World Tension: ${worldState.conflicts}/100
- World Harmony: ${worldState.harmony}/100

Recent Player Actions:
${playerActions.join('\n')}

Based on this context, generate:
1. A natural dialogue response (2-3 sentences)
2. An action the NPC would take
3. How the NPC's mood/relationship might change

Format as JSON: { "dialogue": "...", "action": "...", "moodChange": "..." }
`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 300,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  return message.content[0].type === 'text' ? message.content[0].text : '';
}

// AI-driven world event generator
export async function generateWorldEvent(worldState: WorldState, recentEvents: GameEvent[], playerCount: number): Promise<GameEvent> {
  const eventPrompt = `
You are the intelligent game master for a wizard academy MMO. Generate a dynamic world event based on current conditions.

World State:
- Current Time: ${worldState.timeOfDay}
- Weather: ${worldState.weather}
- Season: ${worldState.season}
- World Tension: ${worldState.conflicts}/100
- World Harmony: ${worldState.harmony}/100
- Active Players: ${playerCount}

Recent Events (last 5):
${recentEvents.map((e) => `- ${e.title}: ${e.description}`).join('\n')}

Generate an engaging world event that:
1. Is contextually appropriate for the world state
2. Affects ${Math.ceil(playerCount * 0.3)}-${Math.ceil(playerCount * 0.7)} players
3. Has realistic rewards (50-500 currency, 100-1000 XP)
4. Creates interesting gameplay opportunities

Format as JSON: {
  "type": "combat|exploration|trade|social|worldchange",
  "title": "...",
  "description": "...",
  "reward": { "currency": number, "xp": number },
  "worldImpact": number (0-100)
}
`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 300,
    messages: [
      {
        role: 'user',
        content: eventPrompt,
      },
    ],
  });

  try {
    const responseText = message.content[0].type === 'text' ? message.content[0].text : '{}';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const eventData = JSON.parse(jsonMatch ? jsonMatch[0] : '{}');

    return {
      id: `event_${Date.now()}`,
      type: eventData.type || 'exploration',
      title: eventData.title || 'Mysterious Event',
      description: eventData.description || 'Something strange is happening...',
      affectedPlayers: [],
      reward: eventData.reward || { currency: 100, xp: 200 },
      timestamp: new Date(),
      worldImpact: eventData.worldImpact || 50,
    };
  } catch (error) {
    console.error('[v0] Event generation error:', error);
    return {
      id: `event_${Date.now()}`,
      type: 'exploration',
      title: 'Unexpected Discovery',
      description: 'A mysterious phenomenon has appeared in the world',
      affectedPlayers: [],
      reward: { currency: 150, xp: 300 },
      timestamp: new Date(),
      worldImpact: 60,
    };
  }
}

// AI-driven difficulty balancing
export async function calculateDynamicDifficulty(
  playerLevel: number,
  winRate: number,
  playtimeHours: number,
  recentFailures: number,
): Promise<{ difficulty: 'easy' | 'medium' | 'hard' | 'extreme'; explanation: string }> {
  const balancePrompt = `
Calculate adaptive difficulty for a player with these stats:
- Level: ${playerLevel}
- Win Rate: ${(winRate * 100).toFixed(1)}%
- Playtime: ${playtimeHours} hours
- Recent Failures: ${recentFailures}

Rules:
1. Target win rate: 60-70% for engaging gameplay
2. Increase difficulty if win rate > 75%
3. Decrease difficulty if win rate < 45%
4. Consider playtime experience curve

Respond with JSON: {
  "difficulty": "easy|medium|hard|extreme",
  "explanation": "brief reason"
}
`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 200,
    messages: [
      {
        role: 'user',
        content: balancePrompt,
      },
    ],
  });

  try {
    const responseText = message.content[0].type === 'text' ? message.content[0].text : '{}';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const data = JSON.parse(jsonMatch ? jsonMatch[0] : '{}');

    return {
      difficulty: data.difficulty || 'medium',
      explanation: data.explanation || 'Balanced for your skill level',
    };
  } catch (error) {
    return {
      difficulty: 'medium',
      explanation: 'Standard difficulty',
    };
  }
}

// World state evolution AI
export async function evolveWorldState(currentState: WorldState, daysPassed: number): Promise<WorldState> {
  const evolutionPrompt = `
Evolve the game world state after ${daysPassed} days have passed.

Current State:
- Time of Day: ${currentState.timeOfDay}
- Weather: ${currentState.weather}
- Season: ${currentState.season}
- Conflicts: ${currentState.conflicts}/100
- Harmony: ${currentState.harmony}/100
- Inflation: ${currentState.economyInflation.toFixed(2)}x

Rules:
1. Gradually shift season every 60 days
2. Weather changes randomly but appropriately
3. Conflict/harmony trend toward 50 unless events push them
4. Inflation fluctuates between 0.8x and 1.5x based on supply/demand
5. Time of day cycles every 4 hours

Generate evolved state: {
  "timeOfDay": "dawn|morning|noon|afternoon|dusk|night",
  "weather": "clear|cloudy|rainy|stormy|foggy",
  "season": "spring|summer|autumn|winter",
  "conflicts": number (0-100),
  "harmony": number (0-100),
  "economyInflation": number (0.8-1.5)
}
`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 250,
    messages: [
      {
        role: 'user',
        content: evolutionPrompt,
      },
    ],
  });

  try {
    const responseText = message.content[0].type === 'text' ? message.content[0].text : '{}';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const evolved = JSON.parse(jsonMatch ? jsonMatch[0] : '{}');

    return {
      timeOfDay: evolved.timeOfDay || currentState.timeOfDay,
      weather: evolved.weather || currentState.weather,
      season: evolved.season || currentState.season,
      conflicts: Math.max(0, Math.min(100, evolved.conflicts ?? currentState.conflicts)),
      harmony: Math.max(0, Math.min(100, evolved.harmony ?? currentState.harmony)),
      economyInflation: Math.max(0.8, Math.min(1.5, evolved.economyInflation ?? currentState.economyInflation)),
    };
  } catch (error) {
    return currentState;
  }
}

// Create default NPCs with personality
export function createDefaultNPCs(): NPC[] {
  return [
    {
      id: 'npc_dumbledore',
      name: 'Albus Dumbledore',
      personality: 'mentor',
      location: 'Academy Castle',
      mood: 'neutral',
      currentActivity: 'Meditating in tower',
      dialogueMemory: [],
      relationshipScores: new Map(),
      inventory: ['Elder Wand', 'Memories', 'Wisdom'],
      lastUpdate: new Date(),
    },
    {
      id: 'npc_snape',
      name: 'Severus Snape',
      personality: 'rival',
      location: 'Potions Classroom',
      mood: 'angry',
      currentActivity: 'Brewing potions',
      dialogueMemory: [],
      relationshipScores: new Map(),
      inventory: ['Veritaserum', 'Brewing Supplies'],
      lastUpdate: new Date(),
    },
    {
      id: 'npc_luna',
      name: 'Luna Lovegood',
      personality: 'ally',
      location: 'Forbidden Forest',
      mood: 'happy',
      currentActivity: 'Studying creatures',
      dialogueMemory: [],
      relationshipScores: new Map(),
      inventory: ['Wrackspurt Notes', 'Rare Plants'],
      lastUpdate: new Date(),
    },
    {
      id: 'npc_hogsmeade_merchant',
      name: 'Aberforth Dumbledore',
      personality: 'merchant',
      location: 'Hog\'s Head Tavern',
      mood: 'neutral',
      currentActivity: 'Running tavern',
      dialogueMemory: [],
      relationshipScores: new Map(),
      inventory: ['Butterbeer', 'Merchandise', 'Rumors'],
      lastUpdate: new Date(),
    },
  ];
}

// AI Quest Generator Hook
export async function generateAIQuest(
  playerLevel: number,
  playerHouse: string,
  playtimeHours: number,
): Promise<{ title: string; description: string; reward: number; difficulty: string }> {
  const questPrompt = `
Generate a personalized quest for a player:
- Level: ${playerLevel}
- House: ${playerHouse}
- Experience: ${playtimeHours} hours of play

Create a unique, contextual quest that:
1. Is appropriate difficulty for their level
2. Aligns with their house values
3. Is engaging and story-driven
4. Provides meaningful rewards

Format as JSON: {
  "title": "...",
  "description": "...",
  "reward": number (100-5000),
  "difficulty": "easy|medium|hard"
}
`;

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 250,
    messages: [
      {
        role: 'user',
        content: questPrompt,
      },
    ],
  });

  try {
    const responseText = message.content[0].type === 'text' ? message.content[0].text : '{}';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const quest = JSON.parse(jsonMatch ? jsonMatch[0] : '{}');

    return {
      title: quest.title || 'Unknown Quest',
      description: quest.description || 'A mysterious task awaits',
      reward: Math.max(100, Math.min(5000, quest.reward || 500)),
      difficulty: quest.difficulty || 'medium',
    };
  } catch (error) {
    return {
      title: 'Explore & Discover',
      description: 'Venture out into the world and find something interesting',
      reward: 300,
      difficulty: 'medium',
    };
  }
}

export const AIEngine = {
  generateNPCBehavior,
  generateWorldEvent,
  calculateDynamicDifficulty,
  evolveWorldState,
  createDefaultNPCs,
  generateAIQuest,
};
