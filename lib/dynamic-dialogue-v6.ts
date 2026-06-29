// Dynamic Dialogue Generation v6 - AI-Powered Contextual Responses
// No fixed dialogue - every response is generated based on context

import Anthropic from '@anthropic-ai/sdk';

export interface DialogueContext {
  npcId: string;
  npcName: string;
  npcRole: string;
  playerReputation: number; // -100 to +100
  playerChoices: string[];
  currentEra: string;
  situationDescription: string;
  npcMood?: string;
  playerLastAction?: string;
}

export interface DialogueResponse {
  text: string;
  nextOptions: DialogueOption[];
  npcReactionEmote?: string;
}

export interface DialogueOption {
  id: string;
  text: string;
  consequence: string; // What happens if player chooses this
  reputationImpact: number; // How it affects relationship
}

const client = new Anthropic();

// Generate dynamic NPC dialogue
export async function generateNPCDialogue(context: DialogueContext): Promise<DialogueResponse> {
  const prompt = `
You are ${context.npcName}, a character in the Harry Potter universe during the ${context.currentEra} era.

Character Details:
- Role: ${context.npcRole}
- Current Mood: ${context.npcMood || 'neutral'}
- Your opinion of this person: ${getReputationDescription(context.playerReputation)}

Situation: ${context.situationDescription}

Recent Context:
${context.playerLastAction ? `Player just did: ${context.playerLastAction}` : 'Player approaches you.'}

Important Rules:
- Stay in character. Be authentic to this character's personality and values
- Your response should NOT be a fixed script - it should feel natural and responsive
- Reference specific past interactions if the player and you have history
- Show emotion and complexity - characters aren't one-dimensional
- Consider the era - adapt your language and concerns to the time period
- Be unpredictable - same situation, different mood = different response
- Max 2-3 sentences for opening dialogue

Generate a single natural response, then suggest 3 different ways the conversation could branch.

Format your response EXACTLY as:
DIALOGUE: [Your natural response]
OPTION_1: [First choice for player] | CONSEQUENCE: [What happens] | IMPACT: [+/- reputation]
OPTION_2: [Second choice] | CONSEQUENCE: [What happens] | IMPACT: [+/- reputation]
OPTION_3: [Third choice] | CONSEQUENCE: [What happens] | IMPACT: [+/- reputation]
EMOTE: [Single emoji representing NPC reaction]
`;

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 400,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : '';
    return parseDialogueResponse(responseText);
  } catch (error) {
    console.error('Error generating dialogue:', error);
    return getDefaultDialogue(context);
  }
}

// Parse AI response into structured format
function parseDialogueResponse(responseText: string): DialogueResponse {
  const lines = responseText.split('\n').filter((line) => line.trim());

  let dialogue = 'Hmm... I\'m not sure what to say.';
  const options: DialogueOption[] = [];
  let emote = '🤔';

  for (const line of lines) {
    if (line.startsWith('DIALOGUE:')) {
      dialogue = line.replace('DIALOGUE:', '').trim();
    } else if (line.startsWith('OPTION_')) {
      const parts = line.split('|');
      if (parts.length >= 3) {
        const optionText = parts[0]
          .replace(/OPTION_[0-9]:/, '')
          .trim();
        const consequence = parts[1].replace('CONSEQUENCE:', '').trim();
        const impact = parseInt(parts[2].replace('IMPACT:', '').trim()) || 0;

        options.push({
          id: `option_${options.length}`,
          text: optionText,
          consequence,
          reputationImpact: impact,
        });
      }
    } else if (line.startsWith('EMOTE:')) {
      emote = line.replace('EMOTE:', '').trim();
    }
  }

  return {
    text: dialogue,
    nextOptions:
      options.length > 0
        ? options
        : [
            {
              id: 'continue',
              text: 'Continue',
              consequence: 'Conversation continues',
              reputationImpact: 0,
            },
          ],
    npcReactionEmote: emote,
  };
}

// Get default dialogue if AI fails
function getDefaultDialogue(context: DialogueContext): DialogueResponse {
  const baseResponses = {
    ally: `I'm always glad to see you. What brings you here?`,
    neutral: `Hello there. Can I help you with something?`,
    enemy: `What do you want? I'm quite busy.`,
    unknown: `Do I know you? You seem familiar somehow.`,
  };

  const affinity = getAffinityLevel(context.playerReputation);
  const baseResponse = baseResponses[affinity];

  return {
    text: baseResponse,
    nextOptions: [
      {
        id: 'option_1',
        text: 'Ask about recent events',
        consequence: 'NPC tells you what\'s been happening',
        reputationImpact: 0,
      },
      {
        id: 'option_2',
        text: 'Share your own news',
        consequence: 'NPC listens and responds to your story',
        reputationImpact: 2,
      },
      {
        id: 'option_3',
        text: 'Leave the conversation',
        consequence: 'You part ways',
        reputationImpact: 0,
      },
    ],
    npcReactionEmote: '👁️',
  };
}

// Generate random encounter dialogue (for Peeves, ghosts, etc.)
export async function generateRandomEncounterDialogue(
  encounterType: string,
  currentLocation: string,
  era: string
): Promise<string> {
  const prompt = `
Generate a brief, unpredictable encounter with ${encounterType} in ${currentLocation} during the ${era} era.
This should be surprising and potentially disruptive (like Peeves causing mischief).
Keep it to 1-2 sentences. Be creative and specific to the location and era.
`;

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 150,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return message.content[0].type === 'text'
      ? message.content[0].text
      : `A sudden sound echoes through ${currentLocation}...`;
  } catch (error) {
    console.error('Error generating encounter:', error);
    return `A mysterious presence makes itself known...`;
  }
}

// Helper functions
function getReputationDescription(reputation: number): string {
  if (reputation > 75) return 'You trust this person deeply and consider them a close ally';
  if (reputation > 25) return 'You know this person and have positive interactions';
  if (reputation > -25) return 'This person is mostly neutral toward you';
  if (reputation > -75) return 'This person is suspicious of you';
  return 'This person actively dislikes and distrusts you';
}

function getAffinityLevel(
  reputation: number
): 'ally' | 'neutral' | 'enemy' | 'unknown' {
  if (reputation > 50) return 'ally';
  if (reputation > -50) return 'neutral';
  if (reputation < -50) return 'enemy';
  return 'unknown';
}

// Generate dialogue for era-specific events
export async function generateEraEventDialogue(
  era: string,
  eventType: string,
  participants: string[]
): Promise<string> {
  const prompt = `
Generate a dramatic scene description for a ${eventType} event during the ${era} era in the Harry Potter universe.
Key participants: ${participants.join(', ')}

This should be immersive and set the scene for the player. 3-4 sentences max.
Make it feel like a crucial moment in this era.
`;

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 200,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return message.content[0].type === 'text' ? message.content[0].text : '';
  } catch (error) {
    console.error('Error generating event dialogue:', error);
    return 'An important moment unfolds...';
  }
}
