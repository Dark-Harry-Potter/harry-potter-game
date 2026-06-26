// Dynamic Era Progression System v6
// Player choices determine which era comes next

import { PlayerStoryState, StoryOutcome, determineNextEra } from './choice-consequence-v6';

export interface EraProgression {
  fromEra: string;
  toEra: string;
  condition: 'victory' | 'defeat' | 'stalemate' | 'choice' | 'consequence';
  description: string;
}

// All possible era transitions
export const ERA_PROGRESSIONS: EraProgression[] = [
  // FOUNDERS ERA → MARAUDERS ERA
  {
    fromEra: 'founders',
    toEra: 'marauders',
    condition: 'victory',
    description:
      'The founders unite and establish Hogwarts. Centuries pass. The Marauders\' time begins.',
  },
  {
    fromEra: 'founders',
    toEra: 'rational',
    condition: 'defeat',
    description:
      'The founders conflict consumes the school. Ancient magic is corrupted. Logic and reason must triumph.',
  },

  // MARAUDERS ERA → POTTER ERA
  {
    fromEra: 'marauders',
    toEra: 'potter',
    condition: 'victory',
    description:
      'The Marauders overcome their greatest challenges. Years pass. A new generation rises against darkness.',
  },
  {
    fromEra: 'marauders',
    toEra: 'rational',
    condition: 'defeat',
    description:
      'The Marauders\' era ends in tragedy. The wizarding world turns inward. A new scientific age begins.',
  },

  // POTTER ERA → CURSED CHILD ERA
  {
    fromEra: 'potter',
    toEra: 'cursedchild',
    condition: 'victory',
    description:
      'Harry defeats Voldemort. Peace returns. Time itself becomes unstable. Albus and Scorpius face new challenges.',
  },
  {
    fromEra: 'potter',
    toEra: 'rational',
    condition: 'defeat',
    description:
      'Voldemort triumphs. Harry falls. The wizarding world enters darkness. Only through empirical research can salvation be found.',
  },
  {
    fromEra: 'potter',
    toEra: 'jamesporter',
    condition: 'stalemate',
    description:
      'The battle ends inconclusively. Both sides survive. The next generation must find their own path forward.',
  },

  // CURSED CHILD ERA → JAMES POTTER ERA
  {
    fromEra: 'cursedchild',
    toEra: 'jamesporter',
    condition: 'victory',
    description:
      'The time heist succeeds. Reality stabilizes. Albus returns to find his family waiting. The legacy begins anew.',
  },
  {
    fromEra: 'cursedchild',
    toEra: 'rational',
    condition: 'defeat',
    description:
      'The timeline fractures. Multiple realities collide. Empirical magic research is the only way to rebuild.',
  },

  // JAMES POTTER ERA → RATIONAL ERA (or completion)
  {
    fromEra: 'jamesporter',
    toEra: 'rational',
    condition: 'consequence',
    description:
      'The next generation faces unprecedented challenges. They turn to science and reason to forge a new path.',
  },
];

// Get possible next eras for current era
export function getPossibleNextEras(
  currentEra: string
): Array<{ era: string; description: string; probability: number }> {
  const progressions = ERA_PROGRESSIONS.filter((p) => p.fromEra === currentEra);

  return progressions.map((p) => ({
    era: p.toEra,
    description: p.description,
    probability: getTransitionProbability(p.condition),
  }));
}

// Get transition probability based on condition type
function getTransitionProbability(condition: string): number {
  const probabilities: Record<string, number> = {
    victory: 0.4, // 40% chance for victory
    defeat: 0.25, // 25% chance for defeat
    stalemate: 0.2, // 20% chance for stalemate
    choice: 0.1, // 10% chance for choice-based
    consequence: 0.05, // 5% chance for consequence
  };

  return probabilities[condition] || 0.1;
}

// Determine next era based on final battle outcome
export function determineNextEraFromOutcome(
  currentEra: string,
  outcome: StoryOutcome,
  playerStats: {
    choicesMade: number;
    charactersAlive: string[];
    charactersDead: string[];
    battleSuccess: boolean;
  }
): string {
  const progressions = ERA_PROGRESSIONS.filter((p) => p.fromEra === currentEra);

  // Find matching progression
  let nextEra = 'rational'; // Default to rational if no match

  for (const progression of progressions) {
    if (progression.condition === 'victory' && outcome.battleWon) {
      nextEra = progression.toEra;
      break;
    } else if (progression.condition === 'defeat' && !outcome.battleWon) {
      nextEra = progression.toEra;
      break;
    } else if (
      progression.condition === 'stalemate' &&
      outcome.battleWon &&
      outcome.charactersDead.length > 2
    ) {
      nextEra = progression.toEra;
      break;
    }
  }

  return nextEra;
}

// Generate era transition narrative
export async function generateEraTransitionNarrative(
  fromEra: string,
  toEra: string,
  playerChoices: number,
  charactersDead: string[]
): Promise<string> {
  const narratives: Record<string, Record<string, string>> = {
    founders_marauders: {
      victory:
        'You have guided the founders to establish the greatest school of magic. Their legacy will endure for centuries. Now, the halls of Hogwarts echo with new voices—the Marauders have arrived.',
      defeat:
        'The founders\' conflict has scarred the school. Magic itself has become unstable. The next era will require a different approach.',
    },
    marauders_potter: {
      victory:
        'The Marauders have proven their worth. As years pass, their secrets remain hidden, and their influence extends beyond their time. A young wizard with a lightning bolt scar is born.',
      defeat:
        'The Marauders\' story ends in tragedy. The world moves on, but the questions they asked remain unanswered. Magic must find a new foundation.',
    },
    potter_cursedchild: {
      victory:
        'Harry Potter defeated Voldemort. Peace returns to the wizarding world. But something stirs in time itself—strange rifts appear in reality. Albus and Scorpius are about to discover their true purpose.',
      defeat:
        'Voldemort has won. The wizarding world is consumed by darkness. Only in the shadows do wizards dare to ask: is there another way?',
    },
    potter_jamesporter: {
      victory:
        'The battle ends inconclusively. Both sides survive, forever changed. The next generation must navigate a world that could have ended—but didn\'t.',
      defeat:
        'The battle is lost, but the war continues. In the ruins of the old world, new questions arise about the nature of magic itself.',
    },
    cursedchild_jamesporter: {
      victory:
        'The time heist succeeds. Reality stabilizes. As Albus and Scorpius return, they find their families waiting—and a new era ready to begin.',
      defeat:
        'The timeline fractures. Multiple versions of reality exist simultaneously. The world must rebuild from fundamental principles.',
    },
    jamesporter_rational: {
      victory:
        'The next generation faces impossible odds. They turn to science, empiricism, and reason. A new age of magical discovery begins.',
      defeat:
        'The old ways have failed. Chaos reigns. Only through systematic study and empirical research can order be restored.',
    },
  };

  const key = `${fromEra}_${toEra}`;
  const narrativeSet = narratives[key];

  if (!narrativeSet) {
    return `The story continues. A new era awaits...`;
  }

  return narrativeSet.victory || narrativeSet.defeat;
}

// Avatar evolution guidance based on era
export function getAvatarEvolutionGuidance(
  currentEra: string,
  nextEra: string
): {
  outfitSuggestion: string;
  hairSuggestion: string;
  styleDescription: string;
} {
  const guidance: Record<string, Record<string, any>> = {
    founders_marauders: {
      outfitSuggestion: 'From ancient founder robes to 1970s wizard fashion',
      hairSuggestion:
        'Longer, more styled hair matching the 1970s aesthetic',
      styleDescription:
        'Your robes remain formal but adopt contemporary tailoring. Colors are more vibrant.',
    },
    marauders_potter: {
      outfitSuggestion: 'From 1970s to 1990s contemporary wizard wear',
      hairSuggestion: 'Shorter, more practical styling for modern times',
      styleDescription:
        'Your appearance becomes more refined. House colors are prominently displayed.',
    },
    potter_cursedchild: {
      outfitSuggestion: 'From 1990s to contemporary 2020s robes',
      hairSuggestion:
        'Modern styling with touches of both classic and contemporary',
      styleDescription:
        'Your robes show signs of time travel influence—slightly shimmering, temporally shifted.',
    },
    potter_jamesporter: {
      outfitSuggestion: 'From 1990s to elegant ancestral robes',
      hairSuggestion: 'Refined, dignified styling befitting the next generation',
      styleDescription:
        'Your appearance gains elegance. Ancestral House crests become more visible.',
    },
    cursedchild_jamesporter: {
      outfitSuggestion: 'From temporal robes to refined generational wear',
      hairSuggestion: 'Professional styling reflecting leadership potential',
      styleDescription:
        'The temporal shimmer fades. You appear grounded and ready to lead.',
    },
    jamesporter_rational: {
      outfitSuggestion: 'From ancestral to empirical research robes',
      hairSuggestion: 'Practical, scientific styling',
      styleDescription:
        'Your robes become simpler, more functional. Rune patterns appear, showing your research focus.',
    },
    founders_rational: {
      outfitSuggestion: 'Ancient founder robes transform to research wear',
      hairSuggestion: 'Scholarly, focused styling',
      styleDescription:
        'Your appearance reflects the shift from tradition to empiricism. Simplicity replaces ornamentation.',
    },
  };

  const key = `${currentEra}_${nextEra}`;
  return (
    guidance[key] || {
      outfitSuggestion: 'Update your appearance for the new era',
      hairSuggestion: 'Reflect your character growth',
      styleDescription:
        'Your appearance evolves with your journey through time.',
    }
  );
}
