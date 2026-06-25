// Extended Harry Potter Universe Lore Database - v3
// Incorporates canonical HP 1-7, Fantastic Beasts, James Potter series, 
// Methods of Rationality, and extended universe materials

export const EXTENDED_LORE = {
  // ============================================================================
  // CANONICAL SOURCES (HP 1-7 + Fantastic Beasts + Cursed Child)
  // ============================================================================
  canonical: {
    harryPotterSaga: [
      {
        book: 1,
        title: "Harry Potter and the Philosopher's Stone",
        year: 1991,
        keyEvents: [
          "Platform 9¾ first journey",
          "Sorting ceremony",
          "Discovery of the Philosopher's Stone",
          "Encounter with Voldemort's return"
        ],
        locations: ["Hogwarts Castle", "Forbidden Forest", "Platform 9¾"],
        creatures: ["Cerberus", "Devil's Snare", "Troll", "Fluffy"],
        spells: ["Wingardium Leviosa", "Rictusempra", "Alohomora"],
        themes: ["Friendship", "Good vs Evil", "Discovery"]
      },
      {
        book: 2,
        title: "Harry Potter and the Chamber of Secrets",
        year: 1992,
        keyEvents: [
          "Chamber of Secrets opened",
          "Basilisk discovered",
          "Tom Riddle's memory preserved",
          "Parsing Parseltongue mystery"
        ],
        locations: ["Hogwarts Castle", "Diagon Alley", "Chamber of Secrets"],
        creatures: ["Basilisk", "Acromantula", "Poltergeist Peeves"],
        spells: ["Diffindo", "Piertotum Locomotor", "Procrastinus"],
        themes: ["Heritage", "Prejudice", "Memory"]
      },
      {
        book: 3,
        title: "Harry Potter and the Prisoner of Azkaban",
        year: 1993,
        keyEvents: [
          "Escape of Sirius Black",
          "Dementors introduced",
          "Time-turner mechanics",
          "Patronus charm discovered"
        ],
        locations: ["Hogwarts Castle", "Hogsmeade", "Azkaban Prison"],
        creatures: ["Dementor", "Hippogriff", "Werewolf"],
        spells: ["Expecto Patronum", "Lumos Solem"],
        themes: ["Justice", "Redemption", "Trust"]
      },
      {
        book: 4,
        title: "Harry Potter and the Goblet of Fire",
        year: 1994,
        keyEvents: [
          "Triwizard Tournament",
          "Voldemort's return",
          "Cross-school competition",
          "Death of Cedric Diggory"
        ],
        locations: ["Hogwarts Castle", "Graveyard", "Dumbledore's Army headquarters"],
        creatures: ["Dragon", "Blast-Ended Skrewt", "Sphinx"],
        spells: ["Crucio", "Imperio", "Avada Kedavra"],
        themes: ["Coming of age", "Consequence", "Dark magic"]
      },
      {
        book: 5,
        title: "Harry Potter and the Order of the Phoenix",
        year: 1995,
        keyEvents: [
          "Dumbledore's Army formed",
          "Department of Mysteries raid",
          "Death of Sirius Black",
          "Horcrux discovery hints"
        ],
        locations: ["Hogwarts Castle", "Ministry of Magic", "Grimmauld Place"],
        creatures: ["Thestral", "Centaur"],
        spells: ["Stupefy", "Protego", "Finite Incantatem"],
        themes: ["Rebellion", "Connection", "Manipulation"]
      },
      {
        book: 6,
        title: "Harry Potter and the Half-Blood Prince",
        year: 1996,
        keyEvents: [
          "Horcrux hunting begins",
          "Dumbledore's death",
          "Half-Blood Prince revealed",
          "Advanced Potions knowledge"
        ],
        locations: ["Hogwarts Castle", "Slugworth's Mansion", "Shell Cottage"],
        creatures: ["Inferi", "Infernal creatures"],
        spells: ["Sectumsempra", "Levicorpus", "Expelliarmus"],
        themes: ["Ambition", "Betrayal", "Hidden truth"]
      },
      {
        book: 7,
        title: "Harry Potter and the Deathly Hallows",
        year: 1997,
        keyEvents: [
          "Final Battle of Hogwarts",
          "Horcrux destruction",
          "Deathly Hallows revealed",
          "Voldemort's defeat"
        ],
        locations: ["Hogwarts Castle", "Godwin's Hollow", "King's Cross"],
        creatures: ["Basilisk", "Fiendfyre phoenix"],
        spells: ["Fiendfyre", "Bombarda", "Diffindo"],
        themes: ["Sacrifice", "Love", "Redemption"]
      }
    ],
    
    fantastBeastsFilms: [
      {
        film: 1,
        title: "Fantastic Beasts and Where to Find Them",
        year: 1926,
        location: "New York",
        keyCreatures: [
          "Niffler", "Demiguise", "Occamy", "Erumpent", "Thunderbird"
        ],
        keyEvents: [
          "Newt Scamander arrives in NY",
          "Obscurial discovered",
          "Magical Congress revealed",
          "Grindelwald's influence grows"
        ]
      },
      {
        film: 2,
        title: "Fantastic Beasts: The Crimes of Grindelwald",
        year: 1927,
        location: "Europe",
        keyCreatures: ["Kneazle", "Graphorn", "Thestral"],
        keyEvents: [
          "Grindelwald escapes",
          "Blood pact discovered",
          "Credence's heritage revealed",
          "Dumbledore's past exposed"
        ]
      },
      {
        film: 3,
        title: "Fantastic Beasts: The Secrets of Dumbledore",
        year: 1928,
        location: "Bhutan & Paris",
        keyCreatures: ["Qilin", "Phoenix"],
        keyEvents: [
          "Dumbledore confronts Grindelwald",
          "Qilin's prophecy",
          "Dark wizards vs good",
          "War begins to unfold"
        ]
      }
    ]
  },

  // ============================================================================
  // JAMES POTTER EXTENDED UNIVERSE (Fan-Authored)
  // ============================================================================
  jamesPotterSeries: [
    {
      book: 1,
      title: "James Potter and the Hall of Elders' Crossing",
      author: "G. Norman Lippert",
      year: 2009,
      themes: ["Next generation", "New mysteries", "Ancient magic"],
      keyCharacters: ["James Potter II", "Lily Potter", "Albus Potter"],
      keyLocations: ["Hall of Elders", "Sunken City", "Dumbledore's Army hideout"],
      newMagic: ["Elder magic system", "Artifact-based spells", "Ancient rituals"],
      questHooks: [
        "Discover Hall of Elders secrets",
        "Unlock ancient magical artifacts",
        "Learn next-generation spellcraft"
      ]
    },
    {
      book: 2,
      title: "James Potter and the Curse of the Gatekeeper",
      author: "G. Norman Lippert",
      year: 2010,
      themes: ["Corruption", "Gateway magic", "Prophecy"],
      keyCharacters: ["Gatekeeper curse", "Mysterious villain", "Young wizards"],
      keyLocations: ["Forbidden gateway", "Cursed chambers", "Time-locked areas"],
      newSpells: ["Gate-opening incantations", "Curse-breaking hexes", "Protective wards"],
      questHooks: [
        "Cure the gatekeeper's curse",
        "Explore forbidden gateways",
        "Unlock time-sealed chambers"
      ]
    },
    {
      book: 3,
      title: "James Potter and the Vault of Destinies",
      author: "G. Norman Lippert",
      year: 2011,
      themes: ["Fate", "Prophecy", "Destiny artifacts"],
      keyCharacters: ["Destiny vault keepers", "Prophecy interpreters"],
      keyLocations: ["Vault of Destinies", "Prophecy chamber", "Fate corridors"],
      artifacts: ["Destiny stones", "Prophecy crystals", "Fate-altering items"],
      questHooks: [
        "Discover your destiny through the vault",
        "Interpret prophecies",
        "Change your fate"
      ]
    },
    {
      book: 4,
      title: "James Potter and the Morrigan Web",
      author: "G. Norman Lippert",
      year: 2012,
      themes: ["Ancient mythology", "Celtic magic", "Web of fate"],
      keyCharacters: ["Morrigan spirits", "Fate weavers"],
      keyLocations: ["Morrigan's realm", "Web of fate", "Celtic magical sites"],
      creatures: ["Morrigan servants", "Fate creatures", "Mythical beasts"],
      questHooks: [
        "Navigate the Morrigan Web",
        "Survive fate challenges",
        "Learn mythological magic"
      ]
    },
    {
      book: 5,
      title: "James Potter and the Crimson Thread",
      author: "G. Norman Lippert",
      year: 2013,
      themes: ["Connection", "Destiny threads", "Fate manipulation"],
      keyCharacters: ["Thread weavers", "Fate manipulators"],
      keyLocations: ["Thread chambers", "Crimson halls", "Connection nexuses"],
      mechanics: ["Thread manipulation", "Fate weaving", "Connection magic"],
      questHooks: [
        "Find your crimson thread",
        "Connect with other destinies",
        "Weave your fate"
      ]
    }
  ],

  // ============================================================================
  // METHODS OF RATIONALITY (Rationalist Fan Fiction)
  // ============================================================================
  methodsOfRationality: {
    title: "Harry Potter and the Methods of Rationality",
    author: "Eliezer Yudkowsky",
    themes: [
      "Logic and reason",
      "Scientific method",
      "Problem-solving",
      "Rationalist philosophy"
    ],
    keyCharacters: [
      "Harry Verres-Potter (rationalist Harry)",
      "Hermione Granger",
      "Draco Malfoy (reformed)",
      "Professor McGonagall"
    ],
    keyMechanics: [
      "Experimental spellcraft",
      "Logical deduction",
      "Scientific innovation",
      "Rational problem-solving"
    ],
    locations: [
      "Hogwarts School of Witchcraft and Wizardry",
      "Laboratory chambers",
      "Rational research facilities"
    ],
    questTypes: [
      "Scientific mysteries to solve",
      "Logic puzzles",
      "Experimental challenges",
      "Rational duels"
    ],
    specialItems: [
      "Rationalist spellbook",
      "Scientific instruments",
      "Logic puzzles",
      "Research journals"
    ]
  },

  // ============================================================================
  // EXTENDED UNIVERSE MATERIALS
  // ============================================================================
  extendedMaterials: {
    quidditch: {
      source: "Quidditch Through The Ages",
      positions: ["Seeker", "Chaser", "Beater", "Keeper"],
      rules: [
        "150 points for catching Snitch",
        "10 points per goal",
        "Beaters protect teammates",
        "Strategic positioning"
      ],
      famous: ["Firebolt broomstick", "Nimbus 2000", "Comet 260"],
      questHooks: [
        "Master Quidditch positions",
        "Obtain rare broomsticks",
        "Compete in tournaments",
        "Break Quidditch records"
      ]
    },

    beedleTales: {
      source: "The Tales of Beedle The Bard",
      tales: [
        {
          title: "The Sorcerer's Stone",
          lesson: "Immortality and its dangers",
          magical: ["Philosopher's Stone creation"]
        },
        {
          title: "The Fountain of Fair Fortune",
          lesson: "Cooperation and unity",
          magical: ["Transformation magic"]
        },
        {
          title: "The Three Brothers",
          lesson: "Acceptance of mortality",
          magical: ["Deathly Hallows origin"]
        }
      ],
      questHooks: [
        "Unlock Beedle tale rewards",
        "Learn tale-based magic",
        "Discover hidden lessons"
      ]
    },

    defenseGuide: {
      source: "Defense Against the Dark Arts: A Guide to Self-Protection",
      sections: [
        "Recognizing dark curses",
        "Protective spells",
        "Counter-hexes",
        "Emergency escape spells",
        "Dark creature defense"
      ],
      skills: [
        "Curse recognition",
        "Shield charm mastery",
        "Defensive positioning",
        "Emergency protocols"
      ],
      questHooks: [
        "Master defensive spells",
        "Face dark creatures safely",
        "Become a defense expert",
        "Teach others protection"
      ]
    },

    historyOfMagic: {
      source: "Harry Potter: A History of Magic (British Library)",
      periods: [
        "Ancient Magic Era",
        "Medieval Wizardry",
        "Goblin Rebellion Era",
        "Modern Magical Period"
      ],
      historicalEvents: [
        "Formation of Hogwarts",
        "Goblin rebellions",
        "Rise of dark wizards",
        "Magical treaties"
      ],
      questHooks: [
        "Explore magical history",
        "Discover ancient sites",
        "Uncover hidden history",
        "Learn historical magic"
      ]
    },

    unofficialSpellbook: {
      source: "The Unofficial Harry Potter Spellbook",
      categories: [
        "Beginner spells",
        "Advanced hexes",
        "Defensive magic",
        "Transformative spells",
        "Utility magic"
      ],
      rarityLevels: ["Common", "Uncommon", "Rare", "Legendary", "Forbidden"],
      discoveryMethod: "Players can discover spells through gameplay"
    },

    wizardingWorld: {
      source: "Wizarding World (JK Rowling's Pottermore)",
      content: [
        "House sorting deeper",
        "Wand choosing ceremony lore",
        "Creature care guidelines",
        "Potion brewing secrets",
        "Spell etymology"
      ],
      questHooks: [
        "Master your house legacy",
        "Understand wand compatibility",
        "Care for magical creatures",
        "Brew advanced potions"
      ]
    }
  },

  // ============================================================================
  // INTEGRATED QUEST GENERATION FROM ALL SOURCES
  // ============================================================================
  questGenerationRules: {
    sources: [
      "Canonical HP 1-7 lore",
      "Fantastic Beasts universe",
      "James Potter series",
      "Methods of Rationality",
      "Extended universe materials"
    ],
    
    questTemplates: [
      {
        name: "Canonical Recreation",
        description: "Experience iconic moments from the books",
        examples: [
          "Prevent Chamber of Secrets opening",
          "Gather Triwizard items",
          "Recruit Order of the Phoenix members"
        ]
      },
      {
        name: "Extended Universe Exploration",
        description: "Discover James Potter era mysteries",
        examples: [
          "Navigate Hall of Elders",
          "Break the Gatekeeper's curse",
          "Weave Crimson threads"
        ]
      },
      {
        name: "Rationalist Challenge",
        description: "Solve magical problems with logic",
        examples: [
          "Design a new spell through experimentation",
          "Solve a logical riddle",
          "Engineer a magical solution"
        ]
      },
      {
        name: "Fantastic Beast Quest",
        description: "Care for and encounter magical creatures",
        examples: [
          "Find and photograph rare beasts",
          "Defend against dangerous creatures",
          "Care for injured magical creatures"
        ]
      },
      {
        name: "Historical Discovery",
        description: "Uncover magical history",
        examples: [
          "Explore ancient wizard sites",
          "Research historical events",
          "Recover lost magical artifacts"
        ]
      }
    ],

    difficultyScaling: {
      beginner: "Canonical HP1-3 content",
      intermediate: "Canonical HP4-5 content + Methods of Rationality intro",
      advanced: "Canonical HP6-7 + James Potter series",
      expert: "Fantastic Beasts + Extended universe combinations",
      legendary: "All lore integrated with procedurally generated super-quests"
    }
  },

  // ============================================================================
  // NPC & DIALOGUE GENERATION FROM LORE
  // ============================================================================
  npcGenerationRules: {
    characterTypes: [
      "Canonical characters (Dumbledore, McGonagall, etc.)",
      "James Potter era characters",
      "Next-generation students",
      "Beast experts (from Fantastic Beasts)",
      "Rationalist scholars"
    ],

    dialogueStyles: [
      "Canonical (from books)",
      "Rationalist (logical)",
      "Historical (period-specific)",
      "Professorial (teaching-oriented)",
      "Mysterious (lore-hinting)"
    ]
  },

  // ============================================================================
  // CREATURE DATABASE EXPANDED
  // ============================================================================
  creatures: {
    fromBooks: [
      "Basilisk",
      "Acromantula",
      "Dementor",
      "Thestral",
      "Hippogriff",
      "Phoenix",
      "Centaur"
    ],
    
    fromFantasticBeasts: [
      "Niffler",
      "Demiguise",
      "Occamy",
      "Erumpent",
      "Thunderbird",
      "Bowtruckle",
      "Graphorn",
      "Qilin"
    ],
    
    fromExtendedUniverse: [
      "Morrigan creatures",
      "Fate weavers",
      "Destiny guardians",
      "Ancient magical beasts"
    ]
  },

  // ============================================================================
  // LOCATIONS DATABASE EXPANDED
  // ============================================================================
  locations: {
    canonical: [
      "Hogwarts Castle",
      "Ministry of Magic",
      "Diagon Alley",
      "Hogsmeade",
      "Forbidden Forest",
      "Lake",
      "Gringotts"
    ],
    
    extendedUniverse: [
      "Hall of Elders",
      "Vault of Destinies",
      "Morrigan's Realm",
      "Sunken City",
      "Dumbledore's Army headquarters",
      "Time-locked chambers"
    ],
    
    fantastBeasts: [
      "MACUSA (New York)",
      "Magical Congress",
      "Beast sanctuary",
      "Grindelwald's stronghold"
    ]
  }
};

// ============================================================================
// AI ENGINE INTEGRATION - USE THIS IN AI RESPONSES
// ============================================================================
export function getRandomLoreContext() {
  const allSources = [
    ...EXTENDED_LORE.canonical.harryPotterSaga,
    ...EXTENDED_LORE.canonical.fantastBeastsFilms,
    ...EXTENDED_LORE.jamesPotterSeries
  ];
  return allSources[Math.floor(Math.random() * allSources.length)];
}

export function generateLoreBasedQuest(playerLevel: number) {
  const templates = EXTENDED_LORE.questGenerationRules.questTemplates;
  const selected = templates[Math.floor(Math.random() * templates.length)];
  
  return {
    type: selected.name,
    template: selected,
    difficulty: getDifficultyFromLevel(playerLevel),
    loreContext: getRandomLoreContext()
  };
}

export function getDifficultyFromLevel(level: number) {
  if (level <= 5) return EXTENDED_LORE.questGenerationRules.difficultyScaling.beginner;
  if (level <= 15) return EXTENDED_LORE.questGenerationRules.difficultyScaling.intermediate;
  if (level <= 30) return EXTENDED_LORE.questGenerationRules.difficultyScaling.advanced;
  if (level <= 50) return EXTENDED_LORE.questGenerationRules.difficultyScaling.expert;
  return EXTENDED_LORE.questGenerationRules.difficultyScaling.legendary;
}

export function getCreatureByLoreSource(source: string) {
  switch(source.toLowerCase()) {
    case "books": return EXTENDED_LORE.creatures.fromBooks;
    case "fantastic": return EXTENDED_LORE.creatures.fromFantasticBeasts;
    case "extended": return EXTENDED_LORE.creatures.fromExtendedUniverse;
    default: return [
      ...EXTENDED_LORE.creatures.fromBooks,
      ...EXTENDED_LORE.creatures.fromFantasticBeasts,
      ...EXTENDED_LORE.creatures.fromExtendedUniverse
    ];
  }
}

export function getLocationByLoreSource(source: string) {
  switch(source.toLowerCase()) {
    case "canonical": return EXTENDED_LORE.locations.canonical;
    case "extended": return EXTENDED_LORE.locations.extendedUniverse;
    case "fantastic": return EXTENDED_LORE.locations.fantastBeasts;
    default: return [
      ...EXTENDED_LORE.locations.canonical,
      ...EXTENDED_LORE.locations.extendedUniverse,
      ...EXTENDED_LORE.locations.fantastBeasts
    ];
  }
}
