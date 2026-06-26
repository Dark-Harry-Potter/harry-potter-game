// Random Ghost Encounter System v6
// Unpredictable ghost and Peeves encounters during exploration
// Includes conditional Crimson Thread logic based on James Potter era existence

import {
  CANON_TIMELINE,
  getGhostsForEra,
  entityExistsInEra,
} from './canon-timeline-v6';
import { generateRandomEncounterDialogue } from './dynamic-dialogue-v6';
import {
  checkCrimsonThreadExistence,
  getRationalEraGhosts,
  getCrimsonThreadEncounter,
} from './crimson-thread-conditional-v6';

export interface GhostEncounter {
  encounterId: string;
  ghostId: string;
  ghostName: string;
  location: string;
  era: string;
  encounterText: string;
  encounterOptions: EncounterOption[];
  timestamp: Date;
  playerReputationImpact?: number;
}

export interface EncounterOption {
  id: string;
  text: string;
  outcome: string;
  reputationChange: number;
  lootReward?: string;
}

// Ghost encounter types
export type EncounterType = 'friendly' | 'mischievous' | 'ominous' | 'helpful' | 'hostile';

// Encounter probability system
export class GhostEncounterManager {
  private lastEncounterTime: Map<string, number> = new Map();
  private readonly ENCOUNTER_COOLDOWN = 5 * 60 * 1000; // 5 minutes between encounters

  // Trigger random encounter based on location and time
  async triggerRandomEncounter(
    playerId: string,
    location: string,
    era: string,
    potterEraBattleOutcome?: 'victory' | 'defeat' | 'unknown'
  ): Promise<GhostEncounter | null> {
    // Check cooldown
    const lastTime = this.lastEncounterTime.get(playerId) || 0;
    if (Date.now() - lastTime < this.ENCOUNTER_COOLDOWN) {
      return null;
    }

    // For Rational Era, check if Crimson Thread should exist
    if (era === 'rational') {
      const crimsonThreadCondition = checkCrimsonThreadExistence({
        potterEraBattleOutcome: potterEraBattleOutcome || 'unknown',
      });

      // Special handling for Crimson Thread in Rational Era
      if (crimsonThreadCondition.crimsonThreadExists && Math.random() < 0.15) {
        // 15% chance to encounter Crimson Thread if it exists
        return this.generateCrimsonThreadEncounter(playerId, location);
      }
    }

    // 30% chance of encounter
    if (Math.random() > 0.3) {
      return null;
    }

    // Determine encounter type
    const ghostsInEra = getGhostsForEra(era);
    if (ghostsInEra.length === 0) {
      return null;
    }

    // Peeves has higher encounter rate (40% of encounters)
    const peevesChance = Math.random();
    const ghostToSpawn =
      peevesChance < 0.4
        ? CANON_TIMELINE.peeves
        : ghostsInEra[Math.floor(Math.random() * ghostsInEra.length)];

    const encounterType = this.determineEncounterType(ghostToSpawn.id);
    const encounter = await this.generateEncounter(
      ghostToSpawn.id,
      ghostToSpawn.name,
      location,
      era,
      encounterType
    );

    if (encounter) {
      this.lastEncounterTime.set(playerId, Date.now());
    }

    return encounter;
  }

  // Determine encounter tone
  private determineEncounterType(ghostId: string): EncounterType {
    if (ghostId === 'peeves') {
      // Peeves is always mischievous
      return 'mischievous';
    }

    const types: EncounterType[] = ['friendly', 'mischievous', 'ominous', 'helpful', 'hostile'];
    return types[Math.floor(Math.random() * types.length)];
  }

  // Special encounter for Crimson Thread in Rational Era
  private generateCrimsonThreadEncounter(
    playerId: string,
    location: string
  ): GhostEncounter {
    const encounterId = `encounter_crimson_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const crimsonEncounter = getCrimsonThreadEncounter();

    const encounterText = `
${crimsonEncounter.appearance}

"${crimsonEncounter.dialogue}"

You sense an ancient magic, threads of fate woven through centuries. This is no ordinary ghost.
    `;

    const options: EncounterOption[] = [
      {
        id: 'crimson_listen',
        text: 'Listen intently to Crimson Thread\'s words',
        outcome: 'You gain insight into the threads of your destiny',
        reputationChange: 10,
        lootReward: 'Crimson Thread Essence (rare)',
      },
      {
        id: 'crimson_question',
        text: 'Ask about the James Potter legacy',
        outcome: 'Crimson Thread reveals fragments of an alternate timeline',
        reputationChange: 5,
        lootReward: 'Memory Fragment (uncommon)',
      },
      {
        id: 'crimson_ignore',
        text: 'Walk away without engaging',
        outcome: 'The threads fade, leaving only mystery',
        reputationChange: -5,
      },
    ];

    this.lastEncounterTime.set(playerId, Date.now());

    return {
      encounterId,
      ghostId: 'crimson_thread',
      ghostName: 'Crimson Thread',
      location,
      era: 'rational',
      encounterText,
      encounterOptions: options,
      timestamp: new Date(),
      playerReputationImpact: 10,
    };
  }

  // Generate encounter dialogue
  private async generateEncounter(
    ghostId: string,
    ghostName: string,
    location: string,
    era: string,
    type: EncounterType
  ): Promise<GhostEncounter> {
    const encounterId = `encounter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Get ghost-specific encounter text
    const encounterText = await this.getEncounterText(
      ghostName,
      location,
      era,
      type
    );

    const options = this.getEncounterOptions(ghostId, type);

    return {
      encounterId,
      ghostId,
      ghostName,
      location,
      era,
      encounterText,
      encounterOptions: options,
      timestamp: new Date(),
      playerReputationImpact: type === 'hostile' ? -10 : type === 'friendly' ? 5 : 0,
    };
  }

  // Get contextual encounter text
  private async getEncounterText(
    ghostName: string,
    location: string,
    era: string,
    type: EncounterType
  ): Promise<string> {
    // Use AI for dynamic text
    const encounterTexts: Record<EncounterType, string[]> = {
      friendly: [
        `${ghostName} materializes before you, translucent and curious. "Well, well, what have we here?"`,
        `A familiar spectral figure drifts down from above. "${ghostName} greets you warmly.`,
        `${ghostName} phases through a wall, noticing you with what seems like genuine interest.`,
      ],
      mischievous: [
        `${ghostName} suddenly manifests with a prankish cackle, causing nearby objects to rattle!`,
        `"Ahahaha!" ${ghostName} shrieks, sending dust swirling through ${location}.`,
        `${ghostName} appears with mischievous intent, already moving furniture with ghostly energy.`,
      ],
      ominous: [
        `A cold chill fills ${location} as ${ghostName} slowly materializes before you, radiating ancient power.`,
        `${ghostName} emerges from the shadows, their presence heavy with unspoken warning.`,
        `The temperature drops as ${ghostName} appears, their expression grave and foreboding.`,
      ],
      helpful: [
        `${ghostName} appears and speaks clearly: "I sense you may need guidance in these halls."`,
        `${ghostName} materializes with purpose, offering aid with an ethereal gesture.`,
        `A translucent figure takes form—${ghostName}—seemingly ready to assist you.`,
      ],
      hostile: [
        `${ghostName} materializes with rage, their spectral form contorting in anger!`,
        `"YOU!" ${ghostName} shrieks, advancing toward you with visible fury.`,
        `A malevolent presence coalesces into the form of ${ghostName}, radiating pure hostility.`,
      ],
    };

    const textArray = encounterTexts[type];
    return textArray[Math.floor(Math.random() * textArray.length)];
  }

  // Get available encounter responses
  private getEncounterOptions(ghostId: string, type: EncounterType): EncounterOption[] {
    if (ghostId === 'peeves') {
      return this.getPeevesOptions();
    }

    const baseOptions: Record<EncounterType, EncounterOption[]> = {
      friendly: [
        {
          id: 'engage_friendly',
          text: 'Strike up a friendly conversation',
          outcome: 'The ghost shares stories of their past',
          reputationChange: 5,
          lootReward: 'Ancient Memory (quest item)',
        },
        {
          id: 'ignore_friendly',
          text: 'Politely excuse yourself',
          outcome: 'The ghost seems slightly disappointed but understanding',
          reputationChange: 0,
        },
        {
          id: 'ask_help',
          text: 'Ask for guidance about the castle',
          outcome: 'The ghost reveals secret passages',
          reputationChange: 10,
          lootReward: 'Map Fragment',
        },
      ],
      mischievous: [
        {
          id: 'join_mischief',
          text: 'Join in the fun',
          outcome: 'You and the ghost cause harmless chaos together',
          reputationChange: 5,
          lootReward: 'Prank Recipe',
        },
        {
          id: 'resist_mischief',
          text: 'Try to stop the pranks',
          outcome: 'The ghost laughs and vanishes',
          reputationChange: -5,
        },
        {
          id: 'ignore_mischief',
          text: 'Keep walking, unbothered',
          outcome: 'The ghost seems amused by your indifference',
          reputationChange: 2,
        },
      ],
      ominous: [
        {
          id: 'stand_firm',
          text: 'Stand your ground and demand answers',
          outcome: 'The ghost respects your courage and shares an ancient secret',
          reputationChange: 8,
          lootReward: 'Ancient Rune',
        },
        {
          id: 'flee',
          text: 'Flee from the presence',
          outcome: 'The ghost watches you go, silent and still',
          reputationChange: -10,
        },
        {
          id: 'listen',
          text: 'Listen to what the ghost has to say',
          outcome: 'The ghost imparts grave knowledge',
          reputationChange: 5,
          lootReward: 'Prophecy Fragment',
        },
      ],
      helpful: [
        {
          id: 'accept_help',
          text: 'Gratefully accept their assistance',
          outcome: 'The ghost helps you solve a problem',
          reputationChange: 10,
          lootReward: 'Blessed Charm',
        },
        {
          id: 'decline_help',
          text: 'Thank them but insist on doing it yourself',
          outcome: 'The ghost nods approvingly at your independence',
          reputationChange: 3,
        },
        {
          id: 'ask_personal',
          text: 'Ask about their own history',
          outcome: 'The ghost opens up about their past',
          reputationChange: 8,
          lootReward: 'Ghost Memento',
        },
      ],
      hostile: [
        {
          id: 'challenge_hostile',
          text: 'Challenge the hostile spirit to combat',
          outcome: 'A spectral duel begins!',
          reputationChange: 15,
          lootReward: 'Vanquished Spirit Badge',
        },
        {
          id: 'flee_hostile',
          text: 'Run away as fast as possible',
          outcome: 'You escape, but feel ashamed',
          reputationChange: -15,
        },
        {
          id: 'reason_hostile',
          text: 'Attempt to reason with the angry spirit',
          outcome: 'The ghost pauses, considering your words',
          reputationChange: 5,
        },
      ],
    };

    return baseOptions[type] || baseOptions.friendly;
  }

  // Peeves-specific encounter options
  private getPeevesOptions(): EncounterOption[] {
    return [
      {
        id: 'engage_peeves',
        text: 'Engage Peeves in witty banter',
        outcome: 'Peeves is impressed by your humor and spares you',
        reputationChange: 3,
        lootReward: 'Jester\'s Joke Book',
      },
      {
        id: 'run_peeves',
        text: 'Run away from the chaos',
        outcome: 'You manage to escape Peeves\' attention',
        reputationChange: 0,
      },
      {
        id: 'join_peeves',
        text: 'Suggest even more outrageous pranks',
        outcome: 'Peeves cackles with delight and helps you pull off a legendary prank',
        reputationChange: 8,
        lootReward: 'Legendary Prank Guide',
      },
      {
        id: 'ignore_peeves',
        text: 'Walk past Peeves without reacting',
        outcome: 'Peeves is bored and drifts away',
        reputationChange: 1,
      },
    ];
  }

  // Process encounter outcome
  processEncounterOutcome(
    encounter: GhostEncounter,
    chosenOptionId: string
  ): {
    outcome: string;
    reputationChange: number;
    loot?: string;
  } {
    const option = encounter.encounterOptions.find((opt) => opt.id === chosenOptionId);

    if (!option) {
      return {
        outcome: 'Nothing happens.',
        reputationChange: 0,
      };
    }

    return {
      outcome: option.outcome,
      reputationChange: option.reputationChange,
      loot: option.lootReward,
    };
  }
}
