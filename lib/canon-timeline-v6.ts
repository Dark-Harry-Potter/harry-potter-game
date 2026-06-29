// Canon Timeline Database v6 - Strict Timeline for NPCs, Ghosts, Objects
// Ensures historical accuracy: Moaning Myrtle only exists post-1943, Nearly Headless Nick from 1492, etc.

export interface TimelineEntity {
  id: string;
  name: string;
  type: 'ghost' | 'npc' | 'object' | 'event';
  birthYear?: number;
  deathYear?: number;
  appearanceYear?: number;
  disappearanceYear?: number;
  eras: string[];
  description: string;
  defaultLocation?: string;
  canonicalRole?: string;
}

export const CANON_TIMELINE: Record<string, TimelineEntity> = {
  // GHOSTS - with exact appearance dates
  peeves: {
    id: 'peeves',
    name: 'Peeves the Poltergeist',
    type: 'ghost',
    appearanceYear: 900,
    eras: ['founders', 'marauders', 'potter', 'cursedchild', 'jamesporter', 'rational'],
    description: 'Mischievous poltergeist, unpredictable and dangerous',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Poltergeist',
  },

  nearlyHeadlessNick: {
    id: 'nearly_headless_nick',
    name: 'Nearly Headless Nick',
    type: 'ghost',
    birthYear: 1432,
    deathYear: 1492,
    appearanceYear: 1492,
    eras: ['marauders', 'potter', 'cursedchild', 'jamesporter', 'rational'],
    description: 'Gryffindor ghost, beheaded 45 times but not quite decapitated',
    defaultLocation: 'Gryffindor Tower',
    canonicalRole: 'Gryffindor House Ghost',
  },

  moaningMyrtle: {
    id: 'moaning_myrtle',
    name: 'Moaning Myrtle',
    type: 'ghost',
    birthYear: 1929,
    deathYear: 1943,
    appearanceYear: 1943,
    eras: ['marauders', 'potter', 'cursedchild', 'jamesporter', 'rational'],
    description: 'Ravenclaw student killed by basilisk, haunts bathrooms',
    defaultLocation: 'Bathrooms',
    canonicalRole: 'Student Ghost',
  },

  baroneBlood: {
    id: 'baron_blood',
    name: 'Bloody Baron',
    type: 'ghost',
    birthYear: 1430,
    deathYear: 1492,
    appearanceYear: 1492,
    eras: ['marauders', 'potter', 'cursedchild', 'jamesporter', 'rational'],
    description: 'Slytherin house ghost, killed Helena Ravenclaw',
    defaultLocation: 'Slytherin Dungeon',
    canonicalRole: 'Slytherin House Ghost',
  },

  fatFriar: {
    id: 'fat_friar',
    name: 'Fat Friar',
    type: 'ghost',
    appearanceYear: 1400,
    eras: ['marauders', 'potter', 'cursedchild', 'jamesporter', 'rational'],
    description: 'Hufflepuff house ghost, jolly and well-liked',
    defaultLocation: 'Hufflepuff Common Room',
    canonicalRole: 'Hufflepuff House Ghost',
  },

  greyLady: {
    id: 'grey_lady',
    name: 'Grey Lady (Helena Ravenclaw)',
    type: 'ghost',
    birthYear: 1430,
    deathYear: 1492,
    appearanceYear: 1492,
    eras: ['marauders', 'potter', 'cursedchild', 'jamesporter', 'rational'],
    description: 'Ravenclaw house ghost, daughter of Rowena Ravenclaw',
    defaultLocation: 'Ravenclaw Tower',
    canonicalRole: 'Ravenclaw House Ghost',
  },

  // FOUNDERS ERA NPCs (1000-1100)
  godricGryffindor: {
    id: 'godric_gryffindor',
    name: 'Godric Gryffindor',
    type: 'npc',
    birthYear: 850,
    deathYear: 1100,
    eras: ['founders'],
    description: 'Founder of Hogwarts, legendary swordsman',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Founder',
  },

  helgaHufflepuff: {
    id: 'helga_hufflepuff',
    name: 'Helga Hufflepuff',
    type: 'npc',
    birthYear: 850,
    deathYear: 1100,
    eras: ['founders'],
    description: 'Founder of Hogwarts, known for her kindness',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Founder',
  },

  rowenaRavenclaw: {
    id: 'rowena_ravenclaw',
    name: 'Rowena Ravenclaw',
    type: 'npc',
    birthYear: 850,
    deathYear: 1100,
    eras: ['founders'],
    description: 'Founder of Hogwarts, brilliant witch',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Founder',
  },

  salazarSlytherin: {
    id: 'salazar_slytherin',
    name: 'Salazar Slytherin',
    type: 'npc',
    birthYear: 850,
    deathYear: 1100,
    eras: ['founders'],
    description: 'Founder of Hogwarts, parseltongue speaker',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Founder',
  },

  // MARAUDERS ERA NPCs (1970-1980)
  jamesPotter: {
    id: 'james_potter',
    name: 'James Potter',
    type: 'npc',
    birthYear: 1960,
    deathYear: 1981,
    eras: ['marauders'],
    description: 'Marauder, Gryffindor Quidditch player',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Marauder',
  },

  siriusBlack: {
    id: 'sirius_black',
    name: 'Sirius Black',
    type: 'npc',
    birthYear: 1959,
    deathYear: 1996,
    eras: ['marauders'],
    description: 'Marauder, animagus, Gryffindor',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Marauder',
  },

  remusLupin: {
    id: 'remus_lupin',
    name: 'Remus Lupin',
    type: 'npc',
    birthYear: 1960,
    deathYear: 1998,
    eras: ['marauders', 'potter'],
    description: 'Marauder, werewolf, Defence professor',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Marauder',
  },

  peterPettigrew: {
    id: 'peter_pettigrew',
    name: 'Peter Pettigrew',
    type: 'npc',
    birthYear: 1960,
    deathYear: 1998,
    eras: ['marauders'],
    description: 'Marauder, animagus, traitor',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Marauder',
  },

  // HARRY POTTER ERA NPCs (1991-1998)
  harryPotter: {
    id: 'harry_potter',
    name: 'Harry Potter',
    type: 'npc',
    birthYear: 1980,
    deathYear: -1,
    eras: ['potter', 'cursedchild'],
    description: 'The Boy Who Lived, Gryffindor',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Hero',
  },

  hermionGranger: {
    id: 'hermione_granger',
    name: 'Hermione Granger',
    type: 'npc',
    birthYear: 1979,
    eras: ['potter', 'cursedchild'],
    description: 'Brightest witch of her age, Gryffindor',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Protagonist',
  },

  ronWeasley: {
    id: 'ron_weasley',
    name: 'Ron Weasley',
    type: 'npc',
    birthYear: 1980,
    eras: ['potter', 'cursedchild'],
    description: 'Loyal friend, Gryffindor',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Protagonist',
  },

  dracoMalfoy: {
    id: 'draco_malfoy',
    name: 'Draco Malfoy',
    type: 'npc',
    birthYear: 1980,
    eras: ['potter', 'cursedchild'],
    description: 'Slytherin rival, complex character',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Antagonist/Neutral',
  },

  dumbledore: {
    id: 'dumbledore',
    name: 'Albus Dumbledore',
    type: 'npc',
    birthYear: 1881,
    deathYear: 1997,
    eras: ['marauders', 'potter'],
    description: 'Headmaster, greatest wizard',
    defaultLocation: 'Headmaster Office',
    canonicalRole: 'Headmaster',
  },

  // CURSED CHILD ERA NPCs (1998-2025)
  albusPotter: {
    id: 'albus_potter',
    name: 'Albus Severus Potter',
    type: 'npc',
    birthYear: 2009,
    eras: ['cursedchild', 'jamesporter'],
    description: 'Son of Harry Potter, Slytherin',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Protagonist',
  },

  scorpiusMalfoy: {
    id: 'scorpius_malfoy',
    name: 'Scorpius Hyperion Malfoy',
    type: 'npc',
    birthYear: 2009,
    eras: ['cursedchild', 'jamesporter'],
    description: 'Son of Draco Malfoy, Albus friend',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Protagonist',
  },

  // JAMES POTTER ERA NPCs (2020+)
  jamesSiriusPotter: {
    id: 'james_sirius_potter',
    name: 'James Sirius Potter',
    type: 'npc',
    birthYear: 2005,
    eras: ['jamesporter'],
    description: 'Elder son of Harry Potter, Gryffindor',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Protagonist',
  },

  // RATIONAL ERA - Alternate timeline
  harrietPotter: {
    id: 'harriet_potter',
    name: 'Harriet Potter (Rational)',
    type: 'npc',
    birthYear: 1980,
    eras: ['rational'],
    description: 'Alternate timeline Harry, scientific approach to magic',
    defaultLocation: 'Hogwarts',
    canonicalRole: 'Protagonist',
  },
};

export function getEntitiesByEra(era: string): TimelineEntity[] {
  return Object.values(CANON_TIMELINE).filter((entity) =>
    entity.eras.includes(era)
  );
}

export function entityExistsInEra(entityId: string, era: string): boolean {
  const entity = CANON_TIMELINE[entityId];
  return entity ? entity.eras.includes(era) : false;
}

export function getGhostsForEra(era: string): TimelineEntity[] {
  return getEntitiesByEra(era).filter((entity) => entity.type === 'ghost');
}

export function getNPCsForEra(era: string): TimelineEntity[] {
  return getEntitiesByEra(era).filter((entity) => entity.type === 'npc');
}
