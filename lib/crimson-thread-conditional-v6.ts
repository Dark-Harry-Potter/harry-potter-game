// Crimson Thread Conditional System v6
// Crimson Thread only exists in Rational Era if James Potter era exists
// James Potter era only exists if player defeated Voldemort in Potter Era
// This creates strict canon logic for NPC/ghost availability

export interface CrimsonThreadCondition {
  jamesPotterEraExists: boolean;
  crimsonThreadExists: boolean;
  gryffindorGhost: string | null; // "Crimson Thread" or null
  reason: string;
}

/**
 * Check if Crimson Thread should exist in current player's Rational Era
 * Based on whether they progressed through James Potter era (Harry won vs Voldemort)
 */
export function checkCrimsonThreadExistence(
  playerChoiceHistory: {
    potterEraBattleOutcome: 'victory' | 'defeat' | 'unknown';
    jamesPotterEraCompleted?: boolean;
  }
): CrimsonThreadCondition {
  const potterOutcome = playerChoiceHistory.potterEraBattleOutcome;
  
  let jamesPotterExists = false;
  let reason = '';

  if (potterOutcome === 'victory') {
    jamesPotterExists = true;
    reason = 'Harry defeated Voldemort - James Potter era unlocked';
  } else if (potterOutcome === 'defeat') {
    jamesPotterExists = false;
    reason = 'Voldemort defeated Harry - James Potter era does not exist';
  } else {
    jamesPotterExists = false;
    reason = 'Battle outcome unknown - defaulting to no James Potter era';
  }

  return {
    jamesPotterEraExists: jamesPotterExists,
    crimsonThreadExists: jamesPotterExists, // Crimson Thread only exists if James Potter exists
    gryffindorGhost: jamesPotterExists ? 'Crimson Thread' : null,
    reason,
  };
}

/**
 * Get Gryffindor house ghost for current era
 * Historical logic:
 * - Before 1943: Nearly Headless Nick (1492-present)
 * - 1943 onwards: Nearly Headless Nick
 * - If James Potter exists in timeline: Crimson Thread (from Crimson Thread book storyline)
 * - If James Potter doesn't exist: No Gryffindor ghost (Nearly Headless Nick timeline altered)
 */
export function getGryffindorGhost(
  eraName: string,
  crimsonThreadCondition: CrimsonThreadCondition
): {
  name: string | null;
  yearsActive: string;
  description: string;
  available: boolean;
} {
  if (eraName === 'Rational Era') {
    if (crimsonThreadCondition.crimsonThreadExists) {
      return {
        name: 'Crimson Thread',
        yearsActive: 'Eternal Guardian',
        description:
          'The legendary ghost of Gryffindor Tower, bound by ancient magic from the James Potter lineage. Known for cryptic wisdom and protective enchantments.',
        available: true,
      };
    } else {
      return {
        name: null,
        yearsActive: 'N/A',
        description:
          'With the fall of the Potter line, Gryffindor Tower stands without a house ghost. The magical bonds that would have created one were severed.',
        available: false,
      };
    }
  }

  // For other eras, use canonical ghosts
  const canonicalGhost: { [key: string]: { name: string; yearsActive: string; description: string } } = {
    "Founders' Era": {
      name: null, // No ghosts yet, Still living
      yearsActive: 'N/A',
      description: 'Gryffindor Tower is defended by the living founder Godric Gryffindor himself.',
    },
    'Marauders Era': {
      name: 'Nearly Headless Nick',
      yearsActive: 'Since 1492',
      description: 'Sir Nicholas de Mimsy-Porpington, ghost of Gryffindor Tower.',
    },
    'Potter Era': {
      name: 'Nearly Headless Nick',
      yearsActive: 'Since 1492',
      description: 'Sir Nicholas de Mimsy-Porpington, ghost of Gryffindor Tower.',
    },
    'Cursed Child Era': {
      name: 'Nearly Headless Nick',
      yearsActive: 'Since 1492',
      description: 'Sir Nicholas de Mimsy-Porpington, ghost of Gryffindor Tower.',
    },
    'James Potter Era': {
      name: 'Nearly Headless Nick / Crimson Thread',
      yearsActive: 'Variable',
      description:
        'Both ghosts may appear - Nearly Headless Nick continues his duties, while Crimson Thread manifests through magical bloodline connections.',
    },
  };

  if (canonicalGhost[eraName]) {
    return {
      ...canonicalGhost[eraName],
      available: canonicalGhost[eraName].name !== null,
    };
  }

  return {
    name: null,
    yearsActive: 'Unknown',
    description: 'Ghost status unknown for this era.',
    available: false,
  };
}

/**
 * Get all valid NPCs/ghosts for Rational Era based on player's journey
 * This ensures strict timeline consistency
 */
export function getRationalEraGhosts(crimsonThreadCondition: CrimsonThreadCondition): string[] {
  const ghosts: string[] = [
    'Peeves', // Poltergeist - timeless
    'Grey Lady (Helena Ravenclaw)', // Always exists
    'Fat Friar', // Always exists
    'Bloody Baron', // Always exists
  ];

  // Nearly Headless Nick availability depends on storyline
  // In the Voldemort-wins timeline, timeline might be altered
  if (crimsonThreadCondition.jamesPotterEraExists) {
    ghosts.push('Nearly Headless Nick');
    ghosts.push('Crimson Thread'); // NEW GHOST
  } else {
    // If Voldemort won, the magical world is fundamentally different
    // Nearly Headless Nick might not manifest the same way
    ghosts.push('Nearly Headless Nick (corrupted)');
  }

  return ghosts;
}

/**
 * Get random ghost encounter for Rational Era
 * Accounts for Crimson Thread conditional existence
 */
export function getRandomRationalEraGhost(crimsonThreadCondition: CrimsonThreadCondition): string {
  const ghosts = getRationalEraGhosts(crimsonThreadCondition);
  return ghosts[Math.floor(Math.random() * ghosts.length)];
}

/**
 * Crimson Thread specific encounter dialogue generator
 * Only called if Crimson Thread exists
 */
export function getCrimsonThreadEncounter(): {
  appearance: string;
  mood: string;
  dialogue: string;
  interactionType: 'cryptic' | 'protective' | 'mysterious';
} {
  const encounters = [
    {
      appearance:
        'A shimmering golden thread materializes in the air, weaving intricate patterns. An ethereal voice echoes.',
      mood: 'Cryptic and wise',
      dialogue:
        'The threads of fate bind together. You walk a path few have walked. What will you choose when the choice matters most?',
      interactionType: 'cryptic' as const,
    },
    {
      appearance: 'Golden light swirls around you, forming a protective barrier. Crimson Thread manifests clearly.',
      mood: 'Protective',
      dialogue:
        'The Potter line flows through this place. I guard what was fought for. Will you honor that sacrifice?',
      interactionType: 'protective' as const,
    },
    {
      appearance:
        'Reality seems to shimmer. Crimson Thread speaks in whispers from beyond, multiple voices layered.',
      mood: 'Mysterious',
      dialogue:
        'In another timeline, in another choice... but here, now, you must decide your own fate.',
      interactionType: 'mysterious' as const,
    },
  ];

  return encounters[Math.floor(Math.random() * encounters.length)];
}

/**
 * Strict canon validation - ensure no anachronisms in Rational Era
 */
export function validateRationalEraCanonicity(
  eraName: string,
  crimsonThreadCondition: CrimsonThreadCondition,
  npcsToSpawn: string[]
): { valid: boolean; violations: string[] } {
  const violations: string[] = [];

  // Crimson Thread should ONLY appear if James Potter exists
  if (npcsToSpawn.includes('Crimson Thread') && !crimsonThreadCondition.crimsonThreadExists) {
    violations.push(
      'Crimson Thread detected but James Potter era does not exist - CANON VIOLATION'
    );
  }

  // If James Potter doesn't exist, Gryffindor ghost should be null or corrupted
  if (!crimsonThreadCondition.jamesPotterEraExists && npcsToSpawn.includes('Nearly Headless Nick')) {
    violations.push('Nearly Headless Nick status uncertain in dark timeline - consider marking as corrupted');
  }

  // Check for anachronistic NPCs
  const validRationalEraNPCs = [
    'Peeves',
    'Grey Lady',
    'Fat Friar',
    'Bloody Baron',
    'Nearly Headless Nick',
    'Crimson Thread', // Only if condition met
  ];

  for (const npc of npcsToSpawn) {
    if (!validRationalEraNPCs.includes(npc)) {
      violations.push(`NPC "${npc}" is not valid for Rational Era`);
    }
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}
