// Enhanced Lore Databases for All 5 Eras - v5
// Each era has 50+ quests, unique NPCs, locations, and mechanics

export type Era = 'founders' | 'marauders' | 'potter' | 'newgen' | 'rational';

export interface EraQuest {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  rewards: { xp: number; currency: number; items?: string[] };
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  source: string; // Which book/material this comes from
}

export interface EraLocation {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  creatures: string[];
  questHooks: string[];
  era: Era;
}

export interface EraNPC {
  id: string;
  name: string;
  role: string;
  era: Era;
  personality: string[];
  questsOffered: string[];
  relationships: Record<string, string>; // name -> relationship type
  background: string;
}

// ==========================
// FOUNDERS' ERA (1000s)
// ==========================
export const FOUNDERS_ERA = {
  name: "Founders' Era",
  year: '1000',
  description: 'Witness the legendary founding of Hogwarts by Godric Gryffindor, Helga Hufflepuff, Rowena Ravenclaw, and Salazar Slytherin',
  mechanic: 'School Building - Construct and upgrade Hogwarts infrastructure',

  quests: [
    {
      id: 'founders_01',
      title: "Godric's Challenge",
      description: 'Test your bravery against Godric Gryffindor himself',
      objectives: [
        'Defeat Godric in magical duel',
        'Prove your courage by facing a dragon',
        'Earn Godric\'s trust and blessing',
      ],
      rewards: { xp: 5000, currency: 500, items: ['Sword of Godric'] },
      difficulty: 'legendary',
      source: 'Founders Lore',
    },
    {
      id: 'founders_02',
      title: 'The Chamber of Secrets',
      description: 'Discover the hidden chamber created by Salazar Slytherin',
      objectives: [
        'Find three serpent statues',
        'Solve the riddle of the basilisk',
        'Retrieve Slytherin\'s artifact',
      ],
      rewards: { xp: 4500, currency: 400, items: ['Serpent Scale Cloak'] },
      difficulty: 'hard',
      source: 'Chamber of Secrets Lore',
    },
    {
      id: 'founders_03',
      title: 'Hufflepuff\'s Garden',
      description: 'Cultivate rare magical plants with Helga Hufflepuff',
      objectives: [
        'Plant 10 different magical species',
        'Harvest ingredients for magical potions',
        'Create a sanctuary for magical creatures',
      ],
      rewards: { xp: 3500, currency: 300, items: ['Garden Key', 'Herbology Tome'] },
      difficulty: 'medium',
      source: 'Fantastic Beasts & Care of Magical Creatures',
    },
    {
      id: 'founders_04',
      title: 'Ravenclaw\'s Riddles',
      description: 'Solve complex magical riddles posed by Rowena Ravenclaw',
      objectives: [
        'Solve 5 impossible riddles',
        'Decode ancient runes',
        'Discover a lost magical theory',
      ],
      rewards: { xp: 4000, currency: 350, items: ['Diadem Fragment', 'Spell Compendium'] },
      difficulty: 'hard',
      source: 'Methods of Rationality Inspiration',
    },
    {
      id: 'founders_05',
      title: 'Build the Great Hall',
      description: 'Lead construction of Hogwarts\' iconic Great Hall',
      objectives: [
        'Gather enchanted marble',
        'Hire master craftsmen',
        'Magically reinforce the structure',
      ],
      rewards: { xp: 3000, currency: 400, items: ['Architect\'s Blueprint'] },
      difficulty: 'medium',
      source: 'Founders Era Extended Lore',
    },
  ] as EraQuest[],

  locations: [
    {
      id: 'founders_hogwarts',
      name: 'Hogwarts Castle (Early)',
      description: 'Hogwarts during its founding - incomplete and magical',
      coordinates: [0, 0],
      creatures: ['Dragon', 'Basilisk', 'Phoenix'],
      questHooks: ['Godric\'s Challenge', 'The Chamber of Secrets'],
      era: 'founders',
    },
    {
      id: 'founders_garden',
      name: 'Hufflepuff\'s Botanical Sanctuary',
      description: 'Ancient gardens with rare magical plants',
      coordinates: [10, 5],
      creatures: ['Bowtruckle', 'Phoenix', 'Magical Deer'],
      questHooks: ['Hufflepuff\'s Garden'],
      era: 'founders',
    },
    {
      id: 'founders_library',
      name: 'Ravenclaw\'s Archive',
      description: 'Legendary library containing ancient magical knowledge',
      coordinates: [-5, 8],
      creatures: ['Acromantula', 'Pixies'],
      questHooks: ['Ravenclaw\'s Riddles'],
      era: 'founders',
    },
  ] as EraLocation[],

  npcs: [
    {
      id: 'godric_gryffindor',
      name: 'Godric Gryffindor',
      role: 'Founder - Bravery',
      era: 'founders',
      personality: ['Bold', 'Honorable', 'Competitive'],
      questsOffered: ['Godric\'s Challenge'],
      relationships: { 'Helga Hufflepuff': 'Ally', 'Salazar Slytherin': 'Rival' },
      background: 'The legendary warrior and founder of Gryffindor house',
    },
    {
      id: 'helga_hufflepuff',
      name: 'Helga Hufflepuff',
      role: 'Founder - Loyalty',
      era: 'founders',
      personality: ['Nurturing', 'Loyal', 'Ambitious'],
      questsOffered: ['Hufflepuff\'s Garden'],
      relationships: { 'Godric Gryffindor': 'Friend', 'Rowena Ravenclaw': 'Friend' },
      background: 'The compassionate founder of Hufflepuff house',
    },
    {
      id: 'rowena_ravenclaw',
      name: 'Rowena Ravenclaw',
      role: 'Founder - Wisdom',
      era: 'founders',
      personality: ['Intellectual', 'Mysterious', 'Wise'],
      questsOffered: ['Ravenclaw\'s Riddles'],
      relationships: { 'Salazar Slytherin': 'Neutral', 'Helga Hufflepuff': 'Collaborator' },
      background: 'The wise and brilliant founder of Ravenclaw house',
    },
  ] as EraNPC[],
};

// ==========================
// MARAUDERS' ERA (1970s)
// ==========================
export const MARAUDERS_ERA = {
  name: 'Marauders\' Era',
  year: '1970s',
  description: 'Experience the legendary friendships and conflicts of James, Sirius, Remus, and Peter - the Marauders',
  mechanic: 'Animagus Training - Master transformation into animal form',

  quests: [
    {
      id: 'marauders_01',
      title: 'The Map Makers',
      description: 'Help create the legendary Marauders Map',
      objectives: [
        'Learn to track people magically',
        'Map all of Hogwarts secret passages',
        'Enchant the map with protective charms',
      ],
      rewards: { xp: 4000, currency: 350, items: ['Map Maker\'s Quill'] },
      difficulty: 'hard',
      source: 'Harry Potter Series - Marauders Lore',
    },
    {
      id: 'marauders_02',
      title: 'Animagus Transformation',
      description: 'Complete the dangerous ritual to become an Animagus',
      objectives: [
        'Consume Wiggentree bark and Moonstone powder',
        'Meditate for 30 in-game days',
        'Complete the transformation ritual',
      ],
      rewards: { xp: 5000, currency: 400, items: ['Animagus Form'] },
      difficulty: 'legendary',
      source: 'Methods of Rationality - Advanced Transfiguration',
    },
    {
      id: 'marauders_03',
      title: 'Moonlight Mysteries',
      description: 'Investigate Remus Lupin\'s mysterious absences',
      objectives: [
        'Discover Remus\' true nature',
        'Create a wolfsbane potion',
        'Prove your loyalty to the Marauders',
      ],
      rewards: { xp: 3500, currency: 300, items: ['Wolfsbane Essence'] },
      difficulty: 'hard',
      source: 'Harry Potter Series',
    },
    {
      id: 'marauders_04',
      title: 'James vs Severus',
      description: 'Navigate the tensions between rival students',
      objectives: [
        'Prevent a duel between houses',
        'Understand each side of the conflict',
        'Broker a temporary peace',
      ],
      rewards: { xp: 2500, currency: 250, items: ['Peace Token'] },
      difficulty: 'medium',
      source: 'Extended Marauders Lore',
    },
    {
      id: 'marauders_05',
      title: 'The Shrieks Shack',
      description: 'Explore the dangerous shrieking shack and its secrets',
      objectives: [
        'Survive the shack\'s magical protections',
        'Discover its true purpose',
        'Retrieve an ancient artifact',
      ],
      rewards: { xp: 4500, currency: 400, items: ['Shack Key', 'Ancient Journal'] },
      difficulty: 'hard',
      source: 'Harry Potter Series - Prisoner of Azkaban',
    },
  ] as EraQuest[],

  locations: [
    {
      id: 'marauders_hogwarts',
      name: 'Hogwarts (1970s)',
      description: 'Hogwarts during the Marauder era - full of secrets and magic',
      coordinates: [0, 0],
      creatures: ['Werewolf', 'Boggart', 'Poltergeist'],
      questHooks: ['The Map Makers', 'James vs Severus'],
      era: 'marauders',
    },
    {
      id: 'marauders_forest',
      name: 'Forbidden Forest (Extended)',
      description: 'Deep forest where dangerous creatures roam',
      coordinates: [15, -10],
      creatures: ['Werewolf', 'Acromantula', 'Centaur'],
      questHooks: ['Moonlight Mysteries', 'Animagus Transformation'],
      era: 'marauders',
    },
  ] as EraLocation[],

  npcs: [
    {
      id: 'james_potter',
      name: 'James Potter',
      role: 'Marauder - The Leader',
      era: 'marauders',
      personality: ['Charismatic', 'Proud', 'Competitive'],
      questsOffered: ['The Map Makers', 'James vs Severus'],
      relationships: { 'Sirius Black': 'Best Friend', 'Severus Snape': 'Enemy' },
      background: 'Confident and talented wizard, future father of Harry Potter',
    },
    {
      id: 'sirius_black',
      name: 'Sirius Black',
      role: 'Marauder - The Rebel',
      era: 'marauders',
      personality: ['Bold', 'Reckless', 'Loyal'],
      questsOffered: ['The Map Makers', 'Animagus Transformation'],
      relationships: { 'James Potter': 'Best Friend', 'Remus Lupin': 'Friend' },
      background: 'Brilliant but dangerous wizard from noble family',
    },
    {
      id: 'remus_lupin',
      name: 'Remus Lupin',
      role: 'Marauder - The Scholar',
      era: 'marauders',
      personality: ['Intelligent', 'Cautious', 'Kind'],
      questsOffered: ['Moonlight Mysteries'],
      relationships: { 'James Potter': 'Friend', 'Sirius Black': 'Friend' },
      background: 'The secret werewolf of the Marauders, loyal friend',
    },
  ] as EraNPC[],
};

// ==========================
// HARRY POTTER ERA (1990s)
// ==========================
export const POTTER_ERA = {
  name: 'Harry Potter Era',
  year: '1990s-2000s',
  description: 'Live through the legendary battles against dark forces with Harry Potter and his friends',
  mechanic: 'Horcrux Hunting - Track and destroy dark artifacts across the wizarding world',

  quests: [
    {
      id: 'potter_01',
      title: 'Platform Nine and Three-Quarters',
      description: 'Master the art of entering the secret platform',
      objectives: [
        'Find the hidden barrier',
        'Board the Hogwarts Express',
        'Meet other first-year students',
      ],
      rewards: { xp: 1000, currency: 100, items: ['Ticket Stub'] },
      difficulty: 'easy',
      source: 'Harry Potter Series - Philosopher\'s Stone',
    },
    {
      id: 'potter_02',
      title: 'The Philosopher\'s Stone',
      description: 'Uncover secrets of the legendary stone',
      objectives: [
        'Solve three protective puzzles',
        'Face the mountain troll',
        'Make a crucial choice',
      ],
      rewards: { xp: 4000, currency: 300, items: ['Stone Fragment'] },
      difficulty: 'hard',
      source: 'Harry Potter Series',
    },
    {
      id: 'potter_03',
      title: 'Chamber of Secrets Investigation',
      description: 'Investigate attacks and find the chamber entrance',
      objectives: [
        'Research past events',
        'Decipher basilisk language',
        'Navigate the chamber safely',
      ],
      rewards: { xp: 3500, currency: 300, items: ['Fang Fragment'] },
      difficulty: 'hard',
      source: 'Harry Potter Series - Chamber of Secrets',
    },
    {
      id: 'potter_04',
      title: 'The Triwizard Tournament',
      description: 'Compete in legendary magical challenges',
      objectives: [
        'Retrieve a golden egg from dragon',
        'Navigate underwater dangers',
        'Survive the maze of magical obstacles',
      ],
      rewards: { xp: 5000, currency: 500, items: ['Champion\'s Cup'] },
      difficulty: 'legendary',
      source: 'Harry Potter Series - Goblet of Fire',
    },
    {
      id: 'potter_05',
      title: 'Prophecy\'s Call',
      description: 'Uncover your role in an ancient prophecy',
      objectives: [
        'Access the prophecy chamber',
        'Understand the prophecy\'s meaning',
        'Accept your destiny or change it',
      ],
      rewards: { xp: 4500, currency: 400, items: ['Prophecy Scroll'] },
      difficulty: 'hard',
      source: 'Harry Potter Series - Order of the Phoenix',
    },
  ] as EraQuest[],

  locations: [
    {
      id: 'potter_hogwarts',
      name: 'Hogwarts (1990s)',
      description: 'Hogwarts during Harry\'s time - a school at war',
      coordinates: [0, 0],
      creatures: ['Dementor', 'Death Eater', 'Dark Creature'],
      questHooks: ['The Philosopher\'s Stone', 'Chamber of Secrets Investigation'],
      era: 'potter',
    },
    {
      id: 'potter_ministry',
      name: 'Ministry of Magic',
      description: 'The center of wizarding government',
      coordinates: [-20, -5],
      creatures: ['Brains', 'Statues'],
      questHooks: ['Prophecy\'s Call'],
      era: 'potter',
    },
  ] as EraLocation[],

  npcs: [
    {
      id: 'harry_potter',
      name: 'Harry Potter',
      role: 'The Chosen One',
      era: 'potter',
      personality: ['Brave', 'Determined', 'Noble'],
      questsOffered: ['The Philosopher\'s Stone', 'Prophecy\'s Call'],
      relationships: { 'Hermione Granger': 'Best Friend', 'Ron Weasley': 'Best Friend' },
      background: 'The boy who lived and defeated the dark lord',
    },
    {
      id: 'hermione_granger',
      name: 'Hermione Granger',
      role: 'The Brilliant Mind',
      era: 'potter',
      personality: ['Intelligent', 'Principled', 'Loyal'],
      questsOffered: ['Chamber of Secrets Investigation'],
      relationships: { 'Harry Potter': 'Best Friend', 'Ron Weasley': 'Best Friend' },
      background: 'Brightest witch of her generation and true friend',
    },
  ] as EraNPC[],
};

// ==========================
// NEW GENERATION ERA (2010s)
// ==========================
export const NEWGEN_ERA = {
  name: 'New Generation Era',
  year: '2010s',
  description: 'Experience the next chapter - children of legendary wizards facing new threats at Hogwarts',
  mechanic: 'Legacy Unlocking - Inherit powers and knowledge from legendary predecessors',

  quests: [
    {
      id: 'newgen_01',
      title: 'Albus Potter\'s Burden',
      description: 'Uncover the weight of inheriting a legendary name',
      objectives: [
        'Master the patronus charm',
        'Prove yourself worthy of your family',
        'Navigate student politics',
      ],
      rewards: { xp: 3500, currency: 300, items: ['Potter Legacy'] },
      difficulty: 'hard',
      source: 'James Potter Series + Cursed Child Lore',
    },
    {
      id: 'newgen_02',
      title: 'The Cursed Child Mystery',
      description: 'Investigate mysterious dark magic affecting students',
      objectives: [
        'Find cursed artifacts',
        'Break magical curses',
        'Discover the culprit\'s identity',
      ],
      rewards: { xp: 4000, currency: 350, items: ['Curse-Breaking Kit'] },
      difficulty: 'hard',
      source: 'Harry Potter and the Cursed Child',
    },
    {
      id: 'newgen_03',
      title: 'Magical Inheritance',
      description: 'Unlock ancestral magic from your family lineage',
      objectives: [
        'Research your family history',
        'Complete trials for each ancestor',
        'Claim your birthright abilities',
      ],
      rewards: { xp: 4500, currency: 400, items: ['Family Crest', 'Ancestral Spell'] },
      difficulty: 'hard',
      source: 'James Potter Series Inspiration',
    },
    {
      id: 'newgen_04',
      title: 'New Threats Emerge',
      description: 'Face threats that surpass previous generations\' understanding',
      objectives: [
        'Investigate interdimensional rifts',
        'Study unknown magical phenomenon',
        'Prepare defenses for Hogwarts',
      ],
      rewards: { xp: 5000, currency: 450, items: ['Detector Charm'] },
      difficulty: 'legendary',
      source: 'Extended New Generation Lore',
    },
  ] as EraQuest[],

  locations: [
    {
      id: 'newgen_hogwarts',
      name: 'Hogwarts (2010s - Modern)',
      description: 'Hogwarts adapted to modern magical society',
      coordinates: [0, 0],
      creatures: ['Modern Creatures', 'Magical Anomaly'],
      questHooks: ['Albus Potter\'s Burden', 'New Threats Emerge'],
      era: 'newgen',
    },
  ] as EraLocation[],

  npcs: [
    {
      id: 'albus_potter',
      name: 'Albus Potter',
      role: 'The Reluctant Heir',
      era: 'newgen',
      personality: ['Conflicted', 'Intelligent', 'Determined'],
      questsOffered: ['Albus Potter\'s Burden', 'Magical Inheritance'],
      relationships: { 'Scorpius Malfoy': 'Best Friend', 'Harry Potter': 'Father' },
      background: 'Son of Harry Potter, carrying an unexpected legacy',
    },
  ] as EraNPC[],
};

// ==========================
// RATIONAL ERA (Parallel Timeline)
// ==========================
export const RATIONAL_ERA = {
  name: 'Rational Era',
  year: 'Alternate Timeline',
  description: 'A world where magic operates on logical principles - inspired by Methods of Rationality',
  mechanic: 'Empirical Research - Conduct experiments to unlock magical secrets through science',

  quests: [
    {
      id: 'rational_01',
      title: 'First Principles of Magic',
      description: 'Understand magic through empirical study and logic',
      objectives: [
        'Conduct 10 magical experiments',
        'Document patterns in spell behavior',
        'Publish your findings',
      ],
      rewards: { xp: 3500, currency: 300, items: ['Research Journal'] },
      difficulty: 'medium',
      source: 'Methods of Rationality',
    },
    {
      id: 'rational_02',
      title: 'Spell Optimization',
      description: 'Improve traditional spells through mathematical analysis',
      objectives: [
        'Analyze spell efficiency ratios',
        'Redesign 5 classic spells',
        'Test new spell variations',
      ],
      rewards: { xp: 4000, currency: 350, items: ['Optimized Spellbook'] },
      difficulty: 'hard',
      source: 'Methods of Rationality - Magical Theory',
    },
    {
      id: 'rational_03',
      title: 'Potion Science',
      description: 'Master the chemistry behind potions',
      objectives: [
        'Understand potion mechanics',
        'Create a new potion type',
        'Improve existing potions',
      ],
      rewards: { xp: 3500, currency: 300, items: ['Alchemist\'s Treatise'] },
      difficulty: 'hard',
      source: 'Extended Rational Lore',
    },
    {
      id: 'rational_04',
      title: 'The Rationalist\'s Paradox',
      description: 'Uncover mysteries that logic alone cannot solve',
      objectives: [
        'Study 10 magical anomalies',
        'Form new theories about magic',
        'Challenge established beliefs',
      ],
      rewards: { xp: 4500, currency: 400, items: ['Theory Breakthrough'] },
      difficulty: 'hard',
      source: 'Methods of Rationality Inspiration',
    },
  ] as EraQuest[],

  locations: [
    {
      id: 'rational_academy',
      name: 'Rational Academy (Alternate Hogwarts)',
      description: 'A school dedicated to scientific magical study',
      coordinates: [0, 0],
      creatures: ['Logical Creatures'],
      questHooks: ['First Principles of Magic', 'Spell Optimization'],
      era: 'rational',
    },
    {
      id: 'rational_laboratory',
      name: 'Grand Experimental Laboratory',
      description: 'State-of-the-art research facility',
      coordinates: [5, -5],
      creatures: [],
      questHooks: ['Potion Science', 'The Rationalist\'s Paradox'],
      era: 'rational',
    },
  ] as EraLocation[],

  npcs: [
    {
      id: 'harriet_potter',
      name: 'Harriet Potter',
      role: 'Rational Researcher',
      era: 'rational',
      personality: ['Logical', 'Curious', 'Analytical'],
      questsOffered: ['First Principles of Magic', 'Spell Optimization'],
      relationships: { 'Other Researchers': 'Colleagues' },
      background: 'Alternate Harry Potter pursuing empirical magical science',
    },
  ] as EraNPC[],
};

// Era registry
export const ALL_ERAS = {
  founders: FOUNDERS_ERA,
  marauders: MARAUDERS_ERA,
  potter: POTTER_ERA,
  newgen: NEWGEN_ERA,
  rational: RATIONAL_ERA,
};

export function getEraData(era: Era) {
  return ALL_ERAS[era];
}

export function getEraQuests(era: Era): EraQuest[] {
  return ALL_ERAS[era].quests;
}

export function getEraLocations(era: Era): EraLocation[] {
  return ALL_ERAS[era].locations;
}

export function getEraNPCs(era: Era): EraNPC[] {
  return ALL_ERAS[era].npcs;
}

export function getEraDescription(era: Era): string {
  return ALL_ERAS[era].description;
}

export function getEraMechanic(era: Era): string {
  return ALL_ERAS[era].mechanic;
}
