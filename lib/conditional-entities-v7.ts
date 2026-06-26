// Conditional Entities Database v7
// 50+ NPCs whose existence depends on player choices and era outcomes
// Each entity has conditions under which it exists

export interface ConditionalEntity {
  id: string;
  name: string;
  title: string;
  source: 'canonical' | 'james_potter' | 'methods_of_rationality' | 'fantastic_beasts';
  existsIf: {
    harryWins?: boolean; // true = only if Harry defeats Voldemort
    voldemortWins?: boolean; // true = only if Voldemort wins
    eraCompleted?: string[]; // Array of eras that must complete
    minEra?: string;
    maxEra?: string;
  };
  role: 'npc' | 'ghost' | 'romance' | 'enemy' | 'ally' | 'mentor';
  description: string;
}

// James Potter Series Entities (conditional on Harry winning)
const JAMES_POTTER_ENTITIES: ConditionalEntity[] = [
  {
    id: 'crimson_thread_ghost',
    name: 'Crimson Thread',
    title: 'Gryffindor House Ghost',
    source: 'james_potter',
    existsIf: { harryWins: true, minEra: 'james_potter' },
    role: 'ghost',
    description: 'The mysterious Gryffindor house ghost who appears only when the James Potter bloodline continues.',
  },
  {
    id: 'albus_potter',
    name: 'Albus Severus Potter',
    title: 'Young Wizard, Harry\'s Son',
    source: 'james_potter',
    existsIf: { harryWins: true, minEra: 'james_potter' },
    role: 'npc',
    description: 'Harry\'s son, named after Dumbledore and Snape, struggles with his father\'s legacy.',
  },
  {
    id: 'lily_luna_potter',
    name: 'Lily Luna Potter',
    title: 'Harry\'s Daughter',
    source: 'james_potter',
    existsIf: { harryWins: true, minEra: 'james_potter' },
    role: 'npc',
    description: 'Harry\'s youngest child, named after his mother Lily and Luna Lovegood.',
  },
  {
    id: 'james_potter_jnr',
    name: 'James Potter',
    title: 'Harry\'s Eldest Son',
    source: 'james_potter',
    existsIf: { harryWins: true, minEra: 'james_potter' },
    role: 'npc',
    description: 'Harry\'s eldest, carrying his grandfather\'s name and adventurous spirit.',
  },
  {
    id: 'scorpius_malfoy',
    name: 'Scorpius Hyperion Malfoy',
    title: 'Slytherin Heir',
    source: 'james_potter',
    existsIf: { harryWins: true, minEra: 'james_potter' },
    role: 'ally',
    description: 'Draco\'s son, trying to rebuild the Malfoy family reputation.',
  },
  {
    id: 'rose_granger_weasley',
    name: 'Rose Granger-Weasley',
    title: 'Young Gryffindor Scholar',
    source: 'james_potter',
    existsIf: { harryWins: true, minEra: 'james_potter' },
    role: 'ally',
    description: 'Hermione and Ron\'s daughter, brilliant and devoted to learning.',
  },
  {
    id: 'hugo_granger_weasley',
    name: 'Hugo Granger-Weasley',
    title: 'Young Weasley',
    source: 'james_potter',
    existsIf: { harryWins: true, minEra: 'james_potter' },
    role: 'npc',
    description: 'Hermione and Ron\'s son, younger than Rose.',
  },
  {
    id: 'vault_of_destinies',
    name: 'Vault of Destinies',
    title: 'Ancient Magical Artifact',
    source: 'james_potter',
    existsIf: { harryWins: true, minEra: 'james_potter' },
    role: 'npc',
    description: 'A legendary vault containing powerful magical artifacts and prophecies.',
  },
  {
    id: 'morrigan_web',
    name: 'Morrigan Web',
    title: 'Mystical Threat',
    source: 'james_potter',
    existsIf: { harryWins: true, minEra: 'james_potter' },
    role: 'enemy',
    description: 'A dark magical force that threatens the wizarding world in the James Potter era.',
  },
];

// Methods of Rationality Entities (conditional on dark timeline - Voldemort wins)
const METHODS_OF_RATIONALITY_ENTITIES: ConditionalEntity[] = [
  {
    id: 'rational_harry',
    name: 'Harriet Potter (Rational)',
    title: 'Rogue Researcher',
    source: 'methods_of_rationality',
    existsIf: { voldemortWins: true, minEra: 'rational' },
    role: 'mentor',
    description: 'An alternate version of Harry who survived and uses pure logic to resist dark rule.',
  },
  {
    id: 'dumbledore_resistance',
    name: 'Dumbledore\'s Remnant',
    title: 'Underground Leader',
    source: 'methods_of_rationality',
    existsIf: { voldemortWins: true, minEra: 'rational' },
    role: 'ally',
    description: 'Dumbledore\'s secret organization working to overthrow Voldemort through science and reason.',
  },
  {
    id: 'research_collective',
    name: 'Empirical Circle',
    title: 'Secret Research Group',
    source: 'methods_of_rationality',
    existsIf: { voldemortWins: true, minEra: 'rational' },
    role: 'ally',
    description: 'Wizards using rationalist methods to develop counter-spells and defenses.',
  },
  {
    id: 'voldemort_regime',
    name: 'Voldemort\'s Regime',
    title: 'Ruling Dark Force',
    source: 'methods_of_rationality',
    existsIf: { voldemortWins: true, minEra: 'rational' },
    role: 'enemy',
    description: 'The oppressive dark government controlling the wizarding world.',
  },
];

// Fantastic Beasts Conditional Entities
const FANTASTIC_BEASTS_ENTITIES: ConditionalEntity[] = [
  {
    id: 'newt_scamander',
    name: 'Newt Scamander',
    title: 'Magizoologist',
    source: 'fantastic_beasts',
    existsIf: { maxEra: 'marauders' }, // Only in early eras
    role: 'mentor',
    description: 'The legendary beast expert, author of Fantastic Beasts.',
  },
  {
    id: 'tina_goldstein',
    name: 'Tina Goldstein',
    title: 'MACUSA Auror',
    source: 'fantastic_beasts',
    existsIf: { maxEra: 'marauders' },
    role: 'ally',
    description: 'American magical law enforcement officer.',
  },
  {
    id: 'queenie_goldstein',
    name: 'Queenie Goldstein',
    title: 'Legilimens',
    source: 'fantastic_beasts',
    existsIf: { maxEra: 'marauders' },
    role: 'ally',
    description: 'Tina\'s sister with powerful mind-reading abilities.',
  },
];

// Cursed Child Era Entities
const CURSED_CHILD_ENTITIES: ConditionalEntity[] = [
  {
    id: 'albus_dumbledore_portrait',
    name: 'Dumbledore\'s Portrait',
    title: 'Headmaster\'s Memory',
    source: 'canonical',
    existsIf: { harryWins: true, minEra: 'cursed_child' },
    role: 'mentor',
    description: 'Dumbledore\'s portrait provides guidance in the cursed child era.',
  },
  {
    id: 'delphi_riddle',
    name: 'Delphini Riddle',
    title: 'Voldemort\'s Daughter',
    source: 'canonical',
    existsIf: { harryWins: true, minEra: 'cursed_child' },
    role: 'enemy',
    description: 'The mysterious daughter of Voldemort who appears in the Cursed Child.',
  },
];

// Combine all conditional entities
export const ALL_CONDITIONAL_ENTITIES: ConditionalEntity[] = [
  ...JAMES_POTTER_ENTITIES,
  ...METHODS_OF_RATIONALITY_ENTITIES,
  ...FANTASTIC_BEASTS_ENTITIES,
  ...CURSED_CHILD_ENTITIES,
];

// Function to get entities that exist given specific conditions
export function getAvailableEntities(conditions: {
  harryWon?: boolean;
  voldemortWon?: boolean;
  currentEra?: string;
  completedEras?: string[];
}): ConditionalEntity[] {
  return ALL_CONDITIONAL_ENTITIES.filter((entity) => {
    const { existsIf } = entity;

    // Check Harry win condition
    if (existsIf.harryWins !== undefined && conditions.harryWon !== undefined) {
      if (existsIf.harryWins && !conditions.harryWon) return false;
    }

    // Check Voldemort win condition
    if (existsIf.voldemortWins !== undefined && conditions.voldemortWon !== undefined) {
      if (existsIf.voldemortWins && !conditions.voldemortWon) return false;
    }

    // Check era range
    if (existsIf.minEra && conditions.currentEra) {
      const eraOrder = ['founders', 'marauders', 'potter', 'cursed_child', 'james_potter', 'rational'];
      const minIndex = eraOrder.indexOf(existsIf.minEra);
      const currentIndex = eraOrder.indexOf(conditions.currentEra);
      if (currentIndex < minIndex) return false;
    }

    if (existsIf.maxEra && conditions.currentEra) {
      const eraOrder = ['founders', 'marauders', 'potter', 'cursed_child', 'james_potter', 'rational'];
      const maxIndex = eraOrder.indexOf(existsIf.maxEra);
      const currentIndex = eraOrder.indexOf(conditions.currentEra);
      if (currentIndex > maxIndex) return false;
    }

    return true;
  });
}

// Get NPC by ID if it exists in current conditions
export function getNPCIfExists(npcId: string, conditions: {
  harryWon?: boolean;
  voldemortWon?: boolean;
  currentEra?: string;
  completedEras?: string[];
}): ConditionalEntity | null {
  const available = getAvailableEntities(conditions);
  return available.find((e) => e.id === npcId) || null;
}
