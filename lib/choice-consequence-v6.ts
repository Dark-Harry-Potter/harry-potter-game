// Choice Consequence System v6 - Dynamic Story Branching
// Tracks player choices and determines which era comes next
// Integrates conditional Crimson Thread logic based on James Potter era existence

import { checkCrimsonThreadExistence } from './crimson-thread-conditional-v6';

export interface PlayerChoice {
  id: string;
  questId: string;
  choiceText: string;
  consequencePoints: Record<string, number>; // alignment, wisdom, cunning, bravery, etc.
  eraProgression?: string; // Which era this leads to if chosen
  characterImpact?: string; // How this affects character reputation
}

export interface StoryOutcome {
  battleWon: boolean;
  villainDefeated?: string;
  charactersAlive: string[];
  charactersDead: string[];
  nextEra: string;
  narrative: string;
  jamesPotterEraWillExist?: boolean; // True if this outcome leads to James Potter era existing
  crimsonThreadWillExist?: boolean; // Derived from jamesPotterEraWillExist
}

// Consequence mapping for major choices
export const MAJOR_CONSEQUENCES: Record<string, StoryOutcome[]> = {
  potter_final_battle: [
    {
      battleWon: true,
      villainDefeated: 'voldemort',
      charactersAlive: ['harry_potter', 'hermione_granger', 'ron_weasley'],
      charactersDead: [],
      nextEra: 'cursedchild',
      narrative: 'With Voldemort defeated, peace returns to the wizarding world. The next generation begins their journey.',
      jamesPotterEraWillExist: true,
      crimsonThreadWillExist: true, // Crimson Thread exists if James Potter era exists
    },
    {
      battleWon: false,
      villainDefeated: undefined,
      charactersAlive: ['voldemort'],
      charactersDead: ['harry_potter', 'dumbledore'],
      nextEra: 'rational',
      narrative: 'The dark forces prevail. A new era of resistance begins in secret. Wizards must rediscover magic through science and reason. Gryffindor Tower stands without a house ghost—Nearly Headless Nick\'s presence fades as the timeline darkens.',
      jamesPotterEraWillExist: false,
      crimsonThreadWillExist: false, // Crimson Thread CANNOT exist without James Potter era
    },
    {
      battleWon: true,
      villainDefeated: 'voldemort',
      charactersAlive: ['harry_potter', 'dumbledore'],
      charactersDead: ['ron_weasley'],
      nextEra: 'jamesporter',
      narrative: 'Victory comes at great cost. Harry and the survivors move forward, and a new chapter begins with the next generation.',
      jamesPotterEraWillExist: true,
      crimsonThreadWillExist: true, // Crimson Thread manifests through the bloodline
    },
  ],

  marauders_confrontation: [
    {
      battleWon: true,
      charactersAlive: ['sirius_black', 'remus_lupin'],
      charactersDead: ['peter_pettigrew'],
      nextEra: 'potter',
      narrative: 'With the traitor exposed, the Marauders triumph. Their victory sets the stage for the next era.',
    },
    {
      battleWon: false,
      charactersAlive: ['peter_pettigrew'],
      charactersDead: ['sirius_black'],
      nextEra: 'rational',
      narrative: 'The Marauders fall. Their enemies consolidate power. Magic enters a new, uncertain age.',
    },
  ],

  founders_legacy_choice: [
    {
      battleWon: true,
      charactersAlive: ['godric_gryffindor', 'helga_hufflepuff', 'rowena_ravenclaw'],
      charactersDead: ['salazar_slytherin'],
      nextEra: 'marauders',
      narrative: 'The founders establish Hogwarts with unity and purpose. Their legacy will echo through centuries.',
    },
    {
      battleWon: false,
      charactersAlive: ['salazar_slytherin'],
      charactersDead: ['godric_gryffindor'],
      nextEra: 'rational',
      narrative: 'The founders clash. Slytherin seizes control. Dark magic reigns for generations.',
    },
  ],

  cursedchild_time_heist: [
    {
      battleWon: true,
      villainDefeated: 'dementor_voldemort',
      charactersAlive: ['albus_potter', 'scorpius_malfoy'],
      charactersDead: [],
      nextEra: 'jamesporter',
      narrative: 'The time heist succeeds. Reality is restored. Albus and Scorpius return to their time, transformed by their journey.',
    },
    {
      battleWon: false,
      charactersAlive: ['dementor_voldemort'],
      charactersDead: ['albus_potter'],
      nextEra: 'rational',
      narrative: 'The timeline fractures. A dark alternate reality takes hold. Only through empirical magic research can this be undone.',
    },
  ],
};

// NPC relationship tracking
export interface NPCRelationship {
  npcId: string;
  reputation: number; // -100 to +100
  questsCompleted: string[];
  lastInteraction: Date;
  affinity: 'ally' | 'neutral' | 'enemy' | 'unknown';
}

// Player story state
export interface PlayerStoryState {
  characterId: string;
  currentEra: string;
  choicesMade: PlayerChoice[];
  npcRelationships: Record<string, NPCRelationship>;
  charactersDead: string[];
  battlesWon: number;
  battlesLost: number;
  majorEventsExperienced: string[];
  storyBranch: string; // Unique identifier for this player's story
}

// Initialize empty story state
export function initializeStoryState(characterId: string): PlayerStoryState {
  return {
    characterId,
    currentEra: 'founders',
    choicesMade: [],
    npcRelationships: {},
    charactersDead: [],
    battlesWon: 0,
    battlesLost: 0,
    majorEventsExperienced: [],
    storyBranch: `${characterId}-${Date.now()}`,
  };
}

// Record a player choice
export function recordChoice(
  storyState: PlayerStoryState,
  choice: PlayerChoice
): PlayerStoryState {
  return {
    ...storyState,
    choicesMade: [...storyState.choicesMade, choice],
  };
}

// Update NPC relationship based on player actions
export function updateNPCRelationship(
  storyState: PlayerStoryState,
  npcId: string,
  reputationChange: number,
  affinity: 'ally' | 'neutral' | 'enemy' | 'unknown'
): PlayerStoryState {
  const currentRep = storyState.npcRelationships[npcId] || {
    npcId,
    reputation: 0,
    questsCompleted: [],
    lastInteraction: new Date(),
    affinity: 'unknown',
  };

  return {
    ...storyState,
    npcRelationships: {
      ...storyState.npcRelationships,
      [npcId]: {
        ...currentRep,
        reputation: Math.max(-100, Math.min(100, currentRep.reputation + reputationChange)),
        affinity,
        lastInteraction: new Date(),
      },
    },
  };
}

// Determine next era based on story outcomes
export function determineNextEra(
  currentEra: string,
  outcome: StoryOutcome,
  playerRelationships: Record<string, NPCRelationship>
): string {
  // Strong ally bonus to preferred outcome
  const allyCount = Object.values(playerRelationships).filter(
    (rel) => rel.affinity === 'ally' && rel.reputation > 50
  ).length;

  // If player has strong allies, they may unlock alternative eras
  if (allyCount >= 3 && outcome.nextEra === 'rational') {
    return 'jamesporter'; // Jump to better outcome
  }

  return outcome.nextEra;
}

// Get contextual dialogue based on player history
export function getContextualDialogue(
  npcId: string,
  playerRelationship: NPCRelationship | undefined,
  currentEra: string
): string {
  if (!playerRelationship) {
    return `Greetings, stranger. I don't believe we've met.`;
  }

  if (playerRelationship.reputation > 75) {
    return `Ah, my dear friend! It's wonderful to see you again.`;
  } else if (playerRelationship.reputation > 25) {
    return `Hello there. We've crossed paths before, haven't we?`;
  } else if (playerRelationship.reputation < -50) {
    return `I remember you. Not fondly, I might add.`;
  }

  return `I know of you. Your reputation precedes you.`;
}

// Battle outcome processor
export function processBattleOutcome(
  storyState: PlayerStoryState,
  battleWon: boolean,
  opposingNPC: string,
  reward: number
): PlayerStoryState {
  const updated = {
    ...storyState,
    battlesWon: storyState.battlesWon + (battleWon ? 1 : 0),
    battlesLost: storyState.battlesLost + (battleWon ? 0 : 1),
  };

  if (!battleWon) {
    updated.charactersDead = [...storyState.charactersDead, opposingNPC];
  }

  return updated;
}

// Check if era transition should occur
export function shouldTransitionEra(
  storyState: PlayerStoryState,
  eraCompletionEvents: string[]
): boolean {
  // Era transitions when specific story events are completed
  const requiredEvents = {
    founders: ['founded_hogwarts', 'chose_four_founders'],
    marauders: ['discovered_animagus', 'confronted_traitor'],
    potter: ['destroyed_horcruxes', 'defeated_voldemort_or_died'],
    cursedchild: ['time_heist_attempted', 'timeline_resolved'],
    jamesporter: ['next_generation_tested', 'legacy_challenged'],
    rational: ['empirical_research_complete', 'new_magic_discovered'],
  };

  const currentEraRequirements = requiredEvents[storyState.currentEra] || [];
  const completedRequired = currentEraRequirements.filter((req) =>
    eraCompletionEvents.includes(req)
  );

  return completedRequired.length === currentEraRequirements.length;
}
