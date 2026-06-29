// Life Simulation System v7
// GTA-style life simulator for wizards with full character progression
// All players start at age 11 with era-specific cutscenes

import { getEraCutscene, generateCharacterBackstory } from './era-cutscenes-v7';

export const STARTING_AGE = 11;

export interface CharacterStats {
  strength: number; // Physical/magical power
  intelligence: number; // Magic knowledge
  charisma: number; // Social influence
  courage: number; // Bravery in battle
  cunning: number; // Deception/strategy
  loyalty: number; // Trustworthiness
}

// Function to initialize new character with age 11 and cutscene
export function initializeCharacterForEra(
  characterName: string,
  house: string,
  eraId: string,
  userId: string
): CharacterProfile & { cutsceneRequired: boolean } {
  const cutscene = getEraCutscene(eraId);
  const backstory = generateCharacterBackstory(eraId, characterName, house);

  return {
    id: `char_${userId}_${eraId}_${Date.now()}`,
    name: characterName,
    age: STARTING_AGE, // Always 11
    maxAge: 100,
    house,
    currentEra: eraId,
    backstory,
    cutsceneViewed: false,
    cutsceneRequired: !!cutscene,
    stats: {
      strength: 50,
      intelligence: 50,
      charisma: 50,
      courage: 50,
      cunning: 50,
      loyalty: 50,
    },
    health: {
      hp: 100,
      maxHp: 100,
      mana: 100,
      maxMana: 100,
      hunger: 0,
      exhaustion: 0,
      corruption: 0,
    },
    relationships: [],
    career: null,
    experience: 0,
    level: 1,
    fame: 0,
    wealth: 0,
    family: [],
    createdAt: new Date(),
    lastActive: new Date(),
  };
}

export interface CharacterHealth {
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  hunger: number;
  exhaustion: number;
  corruption: number; // Dark magic exposure
}

export interface Relationship {
  npcId: string;
  npcName: string;
  affection: number; // -100 to 100
  trust: number; // -100 to 100
  history: string[]; // Past interactions
  romanceLevel: number; // 0-5 (none to married)
  lastInteraction: Date;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  requiredLevel: number;
  requiredStats: Partial<CharacterStats>;
  salary: number;
  skillGains: Partial<CharacterStats>;
  prestigeGain: number;
  unlocks: string[];
}

export interface CharacterProfile {
  id: string;
  name: string;
  age: number; // Always starts at 11
  maxAge: number;
  house: string;
  currentEra: string;
  backstory: string;
  cutsceneViewed: boolean;
  era: string;
  appearance: {
    skinTone: string;
    hairColor: string;
    hairStyle: string;
    eyeColor: string;
    outfit: string;
  };
  stats: CharacterStats;
  health: CharacterHealth;
  career: Career | null;
  level: number;
  experience: number;
  currency: number;
  relationships: Map<string, Relationship>;
  family: {
    spouse?: string;
    children: string[];
    parents: string[];
  };
  reputation: {
    goodEvil: number; // -100 (evil) to 100 (good)
    lawChaos: number; // -100 (lawful) to 100 (chaotic)
    heroBully: number; // -100 (bully) to 100 (hero)
  };
  skills: Set<string>;
  inventory: Map<string, number>;
  housing: {
    location: string;
    furnishings: string[];
    upgrade: number;
  };
  lifeChoices: string[]; // Track major life decisions
}

// 9 Career Paths with full progression
export const CAREERS: Career[] = [
  {
    id: 'auror',
    title: 'Auror',
    description: 'Ministry enforcement officer specializing in dark wizard capture',
    requiredLevel: 15,
    requiredStats: { courage: 70, strength: 65, intelligence: 60 },
    salary: 800,
    skillGains: { courage: 5, strength: 3, intelligence: 2 },
    prestigeGain: 20,
    unlocks: ['lead_auror_team', 'international_auror'],
  },
  {
    id: 'dark_wizard',
    title: 'Dark Wizard',
    description: 'Practitioner of forbidden magic and dark arts',
    requiredLevel: 15,
    requiredStats: { cunning: 70, intelligence: 65, strength: 60 },
    salary: 1200,
    skillGains: { cunning: 5, intelligence: 3, strength: 2 },
    prestigeGain: -30,
    unlocks: ['dark_lord', 'horcrux_maker'],
  },
  {
    id: 'healer',
    title: 'St. Mungo\'s Healer',
    description: 'Medical wizard treating magical ailments',
    requiredLevel: 12,
    requiredStats: { intelligence: 75, charisma: 55 },
    salary: 700,
    skillGains: { intelligence: 4, charisma: 2 },
    prestigeGain: 15,
    unlocks: ['chief_healer', 'curse_breaker_healer'],
  },
  {
    id: 'magizoologist',
    title: 'Magizoologist',
    description: 'Expert in magical creatures and their care',
    requiredLevel: 14,
    requiredStats: { intelligence: 70, courage: 60 },
    salary: 650,
    skillGains: { intelligence: 3, courage: 3 },
    prestigeGain: 10,
    unlocks: ['sanctuary_keeper', 'beast_master'],
  },
  {
    id: 'ministry_official',
    title: 'Ministry Official',
    description: 'Government administrator and bureaucrat',
    requiredLevel: 13,
    requiredStats: { intelligence: 70, charisma: 65 },
    salary: 750,
    skillGains: { charisma: 4, intelligence: 2 },
    prestigeGain: 5,
    unlocks: ['department_head', 'minister_for_magic'],
  },
  {
    id: 'researcher',
    title: 'Magical Researcher',
    description: 'Scientist studying magic through empirical methods',
    requiredLevel: 14,
    requiredStats: { intelligence: 80, cunning: 60 },
    salary: 700,
    skillGains: { intelligence: 5, cunning: 2 },
    prestigeGain: 12,
    unlocks: ['head_researcher', 'spell_innovator'],
  },
  {
    id: 'professor',
    title: 'Hogwarts Professor',
    description: 'Teacher at the school of witchcraft and wizardry',
    requiredLevel: 16,
    requiredStats: { intelligence: 75, charisma: 70 },
    salary: 600,
    skillGains: { intelligence: 3, charisma: 3 },
    prestigeGain: 25,
    unlocks: ['headmaster', 'ancient_magic_expert'],
  },
  {
    id: 'curse_breaker',
    title: 'Curse Breaker',
    description: 'Specialist in breaking and studying magical curses',
    requiredLevel: 15,
    requiredStats: { intelligence: 75, courage: 65, cunning: 60 },
    salary: 850,
    skillGains: { intelligence: 4, courage: 2, cunning: 2 },
    prestigeGain: 18,
    unlocks: ['master_curse_breaker', 'ancient_artifact_expert'],
  },
  {
    id: 'resistance_fighter',
    title: 'Resistance Fighter',
    description: 'Underground operative fighting oppressive regimes',
    requiredLevel: 14,
    requiredStats: { courage: 75, cunning: 70, loyalty: 65 },
    salary: 0,
    skillGains: { courage: 4, cunning: 3, loyalty: 3 },
    prestigeGain: -10,
    unlocks: ['rebel_leader', 'freedom_fighter'],
  },
];

// Create new character with base stats
export function createCharacter(
  name: string,
  house: string,
  era: string
): CharacterProfile {
  const baseStats: CharacterStats = {
    strength: 50,
    intelligence: 50,
    charisma: 50,
    courage: 50,
    cunning: 50,
    loyalty: 50,
  };

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    age: 11,
    maxAge: 100,
    house,
    era,
    appearance: {
      skinTone: 'medium',
      hairColor: 'brown',
      hairStyle: 'default',
      eyeColor: 'brown',
      outfit: 'school_robes',
    },
    stats: baseStats,
    health: {
      hp: 100,
      maxHp: 100,
      mana: 100,
      maxMana: 100,
      hunger: 100,
      exhaustion: 0,
      corruption: 0,
    },
    career: null,
    level: 1,
    experience: 0,
    currency: 50,
    relationships: new Map(),
    family: {
      children: [],
      parents: [],
    },
    reputation: {
      goodEvil: 0,
      lawChaos: 0,
      heroBully: 0,
    },
    skills: new Set(),
    inventory: new Map(),
    housing: {
      location: 'dormitory',
      furnishings: [],
      upgrade: 0,
    },
    lifeChoices: [],
  };
}

// Apply life choice consequences to character
export function applyLifeChoice(
  character: CharacterProfile,
  choiceId: string,
  statModifiers: Partial<CharacterStats> = {},
  reputationModifiers: Partial<{
    goodEvil: number;
    lawChaos: number;
    heroBully: number;
  }> = {}
): CharacterProfile {
  const updated = { ...character };

  // Apply stat changes
  Object.entries(statModifiers).forEach(([stat, change]) => {
    const key = stat as keyof CharacterStats;
    updated.stats[key] = Math.max(0, Math.min(100, updated.stats[key] + change));
  });

  // Apply reputation changes
  Object.entries(reputationModifiers).forEach(([axis, change]) => {
    const key = axis as keyof typeof updated.reputation;
    updated.reputation[key] = Math.max(-100, Math.min(100, updated.reputation[key] + change));
  });

  updated.lifeChoices.push(choiceId);

  return updated;
}

// Get character age in years (simple progression)
export function getCharacterAge(character: CharacterProfile): number {
  return character.age;
}

// Advance character age and trigger aging effects
export function ageCharacter(character: CharacterProfile, years: number = 1): CharacterProfile {
  const updated = { ...character };
  updated.age = Math.min(updated.age + years, updated.maxAge);

  // Age-based stat adjustments
  if (updated.age > 60) {
    updated.stats.strength = Math.max(30, updated.stats.strength - 5);
    updated.stats.courage = Math.max(35, updated.stats.courage - 2);
  } else if (updated.age > 40) {
    updated.stats.strength = Math.max(40, updated.stats.strength - 2);
  } else if (updated.age < 20) {
    updated.stats.courage = Math.min(100, updated.stats.courage + 3);
  }

  return updated;
}

// Start career
export function startCareer(
  character: CharacterProfile,
  careerTitle: string
): CharacterProfile {
  const career = CAREERS.find((c) => c.title === careerTitle);
  if (!career || character.level < career.requiredLevel) {
    return character;
  }

  const updated = { ...character };
  updated.career = career;
  updated.currency += career.salary;

  return updated;
}

// Add relationship or update existing
export function updateRelationship(
  character: CharacterProfile,
  npcId: string,
  npcName: string,
  affectionChange: number = 0,
  trustChange: number = 0,
  interaction: string = ''
): CharacterProfile {
  const updated = { ...character };

  if (updated.relationships.has(npcId)) {
    const rel = updated.relationships.get(npcId)!;
    rel.affection = Math.max(-100, Math.min(100, rel.affection + affectionChange));
    rel.trust = Math.max(-100, Math.min(100, rel.trust + trustChange));
    rel.history.push(interaction);
    rel.lastInteraction = new Date();
  } else {
    const newRel: Relationship = {
      npcId,
      npcName,
      affection: affectionChange,
      trust: trustChange,
      history: interaction ? [interaction] : [],
      romanceLevel: 0,
      lastInteraction: new Date(),
    };
    updated.relationships.set(npcId, newRel);
  }

  return updated;
}

// Check if character can marry NPC
export function canMarry(character: CharacterProfile, npcId: string): boolean {
  const rel = character.relationships.get(npcId);
  if (!rel) return false;
  return rel.affection >= 80 && character.age >= 18 && rel.romanceLevel >= 4;
}

// Marry character to NPC
export function marryCharacter(
  character: CharacterProfile,
  npcId: string,
  npcName: string
): CharacterProfile {
  if (!canMarry(character, npcId)) {
    return character;
  }

  const updated = { ...character };
  updated.family.spouse = npcId;
  const rel = updated.relationships.get(npcId)!;
  rel.romanceLevel = 5;

  return updated;
}

// Have child with spouse
export function haveChild(
  character: CharacterProfile,
  childName: string,
  inheritTraits: Partial<CharacterStats> = {}
): CharacterProfile {
  if (!character.family.spouse) return character;

  const updated = { ...character };
  const childId = `child_${childName.toLowerCase()}_${Date.now()}`;
  updated.family.children.push(childId);

  return updated;
}
