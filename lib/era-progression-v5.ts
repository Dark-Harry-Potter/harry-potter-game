// Era-Specific Progression & Mechanics v5
import { Era } from './era-lore-v5'

export interface EraProgression {
  era: Era
  currentLevel: number
  currentXP: number
  eraSpecificStat: number
  milestones: EraaMilestone[]
  achievements: EraAchievement[]
}

export interface EraMilestone {
  id: string
  name: string
  description: string
  requirements: string[]
  reward: {
    xp: number
    currency: number
    ability: string
  }
  completed: boolean
  era: Era
}

export interface EraAchievement {
  id: string
  title: string
  description: string
  condition: string
  reward: number
  unlockedAt?: Date
}

// ========================================
// FOUNDERS ERA - BUILDING MECHANIC
// ========================================
export const FOUNDERS_PROGRESSION = {
  era: 'founders' as Era,
  uniqueStat: 'BuildingPoints',
  description: 'Construct and upgrade Hogwarts infrastructure to gain power',

  mechanics: {
    buildingSystem: {
      buildings: [
        {
          id: 'library',
          name: 'Great Library',
          cost: 1000,
          buildTime: 3600,
          bonusXp: 1.1,
          bonusInventory: 10,
        },
        {
          id: 'tower',
          name: 'Astronomy Tower',
          cost: 1500,
          buildTime: 5400,
          bonusSpellPower: 1.05,
          bonusSkills: ['Astronomy', 'Navigation'],
        },
        {
          id: 'chamber',
          name: 'Dueling Chamber',
          cost: 2000,
          buildTime: 7200,
          bonusCombat: 1.2,
          bonusReputation: 50,
        },
      ],
      totalBuildingPoints: 0,
      completedBuildings: [],
    },
  },

  milestones: [
    {
      id: 'founders_build_01',
      name: 'First Foundation',
      description: 'Complete your first building',
      requirements: ['Build 1 structure'],
      reward: { xp: 2000, currency: 200, ability: 'Blueprint Insight' },
      completed: false,
      era: 'founders',
    },
    {
      id: 'founders_build_02',
      name: 'Master Builder',
      description: 'Construct 5 buildings for Hogwarts',
      requirements: ['Build 5 structures'],
      reward: { xp: 5000, currency: 500, ability: 'Structural Reinforcement' },
      completed: false,
      era: 'founders',
    },
    {
      id: 'founders_build_03',
      name: 'Founder\'s Legacy',
      description: 'Unlock all available buildings in Founders era',
      requirements: ['Build all 10+ structures'],
      reward: { xp: 10000, currency: 1000, ability: 'Eternal Architecture' },
      completed: false,
      era: 'founders',
    },
  ],

  achievements: [
    {
      id: 'founders_ach_01',
      title: 'Stone Gatherer',
      description: 'Collect 1000 enchanted marble',
      condition: 'enchanted_marble >= 1000',
      reward: 500,
    },
    {
      id: 'founders_ach_02',
      title: 'Rapid Constructor',
      description: 'Complete a building in under 1 hour',
      condition: 'building_time < 3600',
      reward: 750,
    },
  ],
}

// ========================================
// MARAUDERS ERA - ANIMAGUS MECHANIC
// ========================================
export const MARAUDERS_PROGRESSION = {
  era: 'marauders' as Era,
  uniqueStat: 'AnimagusProgress',
  description: 'Master dangerous transformation magic and uncover secrets',

  mechanics: {
    animagusSystem: {
      forms: [
        {
          id: 'stag',
          name: 'Stag Form',
          difficulty: 'hard',
          requirements: ['Complete 5 meditation sessions', 'Consume powdered moonstone'],
          abilities: ['Swift Running', 'Antler Attack', 'Herd Connection'],
          unlocked: false,
        },
        {
          id: 'dog',
          name: 'Dog Form',
          difficulty: 'medium',
          requirements: ['Complete 3 meditation sessions', 'Bond with animal'],
          abilities: ['Acute Smell', 'Loyal Guardian', 'Pack Mentality'],
          unlocked: false,
        },
        {
          id: 'rat',
          name: 'Rat Form',
          difficulty: 'medium',
          requirements: ['Complete 2 meditation sessions', 'Study rat behavior'],
          abilities: ['Small Size', 'Precision Movement', 'Underground Navigation'],
          unlocked: false,
        },
        {
          id: 'wolf',
          name: 'Wolf Form',
          difficulty: 'legendary',
          requirements: [
            'Complete 10 meditation sessions',
            'Defeat 5 dark creatures',
            'Understand moonlight magic',
          ],
          abilities: ['Primal Strength', 'Pack Leadership', 'Lunar Enhancement'],
          unlocked: false,
        },
      ],
      meditationProgress: 0,
      currentForm: null,
      transformationCount: 0,
    },
  },

  milestones: [
    {
      id: 'marauders_anim_01',
      name: 'First Transformation',
      description: 'Successfully transform into your first animal form',
      requirements: ['Complete animagus ritual', 'Transform once'],
      reward: { xp: 3000, currency: 300, ability: 'Partial Transformation' },
      completed: false,
      era: 'marauders',
    },
    {
      id: 'marauders_anim_02',
      name: 'The Four',
      description: 'Unlock all four Marauder-inspired forms',
      requirements: ['Transform into Stag, Dog, Rat, Wolf'],
      reward: { xp: 8000, currency: 800, ability: 'Rapid Shift' },
      completed: false,
      era: 'marauders',
    },
    {
      id: 'marauders_secret_01',
      name: 'Map Keeper',
      description: 'Discover all secret passages in Hogwarts',
      requirements: ['Find 20+ hidden locations'],
      reward: { xp: 5000, currency: 500, ability: 'Secret Navigation' },
      completed: false,
      era: 'marauders',
    },
  ],

  achievements: [
    {
      id: 'marauders_ach_01',
      title: 'Master Meditator',
      description: 'Complete 30 meditation sessions',
      condition: 'meditation_count >= 30',
      reward: 1000,
    },
    {
      id: 'marauders_ach_02',
      title: 'Swift as Stag',
      description: 'Transform into Stag form and travel 1km',
      condition: 'stag_distance >= 1000',
      reward: 750,
    },
  ],
}

// ========================================
// HARRY POTTER ERA - PROPHECY MECHANIC
// ========================================
export const POTTER_PROGRESSION = {
  era: 'potter' as Era,
  uniqueStat: 'ProphecyPoints',
  description: 'Uncover hidden prophecies and change your destiny',

  mechanics: {
    prophecySystem: {
      prophecies: [
        {
          id: 'prophecy_chosen',
          title: 'The One',
          text: 'The one with power to vanquish the dark lord...',
          discovered: false,
          impact: 1.3,
        },
        {
          id: 'prophecy_love',
          title: 'Love\'s Protection',
          text: 'The power of love shall prevail...',
          discovered: false,
          impact: 1.2,
        },
      ],
      horcruxCount: 0,
      horcruxesDestroyed: 0,
      destinyPath: 'hero' as 'hero' | 'neutral' | 'dark',
    },
  },

  milestones: [
    {
      id: 'potter_prop_01',
      name: 'Prophecy Seeker',
      description: 'Discover your first prophecy',
      requirements: ['Find prophecy chamber', 'Learn about destiny'],
      reward: { xp: 2500, currency: 250, ability: 'Prophecy Sensitivity' },
      completed: false,
      era: 'potter',
    },
    {
      id: 'potter_horcrux_01',
      name: 'Horcrux Hunter',
      description: 'Locate and destroy 7 Horcruxes',
      requirements: ['Destroy 7 dark artifacts'],
      reward: { xp: 10000, currency: 1000, ability: 'Dark Artifact Destruction' },
      completed: false,
      era: 'potter',
    },
    {
      id: 'potter_final_01',
      name: 'The Final Battle',
      description: 'Complete the ultimate confrontation against darkness',
      requirements: ['Reach level 50', 'Gather allies', 'Face the dark lord'],
      reward: { xp: 15000, currency: 1500, ability: 'Ultimate Sacrifice' },
      completed: false,
      era: 'potter',
    },
  ],

  achievements: [
    {
      id: 'potter_ach_01',
      title: 'Chosen One',
      description: 'Fulfill a major prophecy',
      condition: 'prophecy_fulfilled >= 1',
      reward: 2000,
    },
  ],
}

// ========================================
// NEW GENERATION ERA - LEGACY MECHANIC
// ========================================
export const NEWGEN_PROGRESSION = {
  era: 'newgen' as Era,
  uniqueStat: 'LegacyPoints',
  description: 'Inherit and build upon the achievements of legendary wizards',

  mechanics: {
    legacySystem: {
      availableLegacies: [
        {
          id: 'potter_legacy',
          name: 'Potter Legacy',
          ancestor: 'Harry Potter',
          bonusXp: 1.2,
          bonusMagic: 1.15,
          uniqueSpells: ['Expecto Patronum (Enhanced)', 'Phoenix Protection'],
          unlocked: false,
        },
        {
          id: 'weasley_legacy',
          name: 'Weasley Legacy',
          ancestor: 'Ron Weasley',
          bonusStrategy: 1.25,
          bonusLoyalty: 50,
          uniqueSpells: ['Loyalty Bind', 'Family Recall'],
          unlocked: false,
        },
        {
          id: 'granger_legacy',
          name: 'Granger Legacy',
          ancestor: 'Hermione Granger',
          bonusIntelligence: 1.3,
          bonusSpellPower: 1.15,
          uniqueSpells: ['Knowledge Transfer', 'Mind Archive'],
          unlocked: false,
        },
      ],
      inheritedLegacy: null,
      ancestralQuests: 0,
      ancestralPower: 0,
    },
  },

  milestones: [
    {
      id: 'newgen_legacy_01',
      name: 'Heir Apparent',
      description: 'Claim your family legacy',
      requirements: ['Research family history', 'Complete legacy trial'],
      reward: { xp: 4000, currency: 400, ability: 'Legacy Activation' },
      completed: false,
      era: 'newgen',
    },
    {
      id: 'newgen_legacy_02',
      name: 'Surpass the Ancestor',
      description: 'Reach level higher than your legendary ancestor',
      requirements: ['Reach level 60+', 'Complete ancestral quests'],
      reward: { xp: 12000, currency: 1200, ability: 'Ancestral Transcendence' },
      completed: false,
      era: 'newgen',
    },
  ],

  achievements: [
    {
      id: 'newgen_ach_01',
      title: 'Legacy Bearer',
      description: 'Activate a legendary family legacy',
      condition: 'legacy_active === true',
      reward: 1500,
    },
  ],
}

// ========================================
// RATIONAL ERA - EMPIRICAL MECHANIC
// ========================================
export const RATIONAL_PROGRESSION = {
  era: 'rational' as Era,
  uniqueStat: 'ResearchPoints',
  description: 'Advance magic through scientific research and logical discovery',

  mechanics: {
    researchSystem: {
      researchTrees: [
        {
          id: 'spell_theory',
          name: 'Spell Theory',
          tier: 1,
          researches: [
            {
              id: 'optimize_basic',
              title: 'Optimize Basic Spells',
              cost: 500,
              duration: 1800,
              benefit: 'Increase spell power by 15%',
              completed: false,
            },
          ],
          progress: 0,
        },
        {
          id: 'potion_science',
          name: 'Potion Science',
          tier: 1,
          researches: [
            {
              id: 'ingredient_efficiency',
              title: 'Ingredient Efficiency',
              cost: 600,
              duration: 2400,
              benefit: 'Reduce potion ingredient costs by 20%',
              completed: false,
            },
          ],
          progress: 0,
        },
        {
          id: 'magical_engineering',
          name: 'Magical Engineering',
          tier: 2,
          researches: [
            {
              id: 'enchantment_boost',
              title: 'Enchantment Amplification',
              cost: 1000,
              duration: 3600,
              benefit: 'Enchanted items gain 25% bonus power',
              completed: false,
            },
          ],
          progress: 0,
        },
      ],
      totalResearchPoints: 0,
      publications: 0,
      theoriesBreakthrough: 0,
    },
  },

  milestones: [
    {
      id: 'rational_research_01',
      name: 'Junior Researcher',
      description: 'Complete your first research project',
      requirements: ['Spend 500 research points', 'Publish 1 finding'],
      reward: { xp: 2000, currency: 200, ability: 'Research Acceleration' },
      completed: false,
      era: 'rational',
    },
    {
      id: 'rational_research_02',
      name: 'Leading Scholar',
      description: 'Publish 10 breakthrough theories',
      requirements: ['Complete 10 research projects', 'Gain 5000 research points'],
      reward: { xp: 8000, currency: 800, ability: 'Theoretical Mastery' },
      completed: false,
      era: 'rational',
    },
    {
      id: 'rational_research_03',
      name: 'Nobel Prize of Magic',
      description: 'Make a paradigm-shifting discovery',
      requirements: ['Complete all research trees', 'Unlock 3 new spell types'],
      reward: { xp: 15000, currency: 1500, ability: 'Fundamental Transformation' },
      completed: false,
      era: 'rational',
    },
  ],

  achievements: [
    {
      id: 'rational_ach_01',
      title: 'Prolific Author',
      description: 'Publish 20 research papers',
      condition: 'publications >= 20',
      reward: 2000,
    },
    {
      id: 'rational_ach_02',
      title: 'Eureka Moment',
      description: 'Unlock a breakthrough theory',
      condition: 'breakthrough_count >= 1',
      reward: 1500,
    },
  ],
}

// Registry for all era progressions
export const ERA_PROGRESSIONS = {
  founders: FOUNDERS_PROGRESSION,
  marauders: MARAUDERS_PROGRESSION,
  potter: POTTER_PROGRESSION,
  newgen: NEWGEN_PROGRESSION,
  rational: RATIONAL_PROGRESSION,
}

export function getEraProgression(era: Era) {
  return ERA_PROGRESSIONS[era]
}

export function initializeEraProgression(era: Era): EraProgression {
  const eraData = ERA_PROGRESSIONS[era]

  return {
    era,
    currentLevel: 1,
    currentXP: 0,
    eraSpecificStat: 0,
    milestones: eraData.milestones,
    achievements: eraData.achievements,
  }
}

export function calculateEraBonus(era: Era, multiplier: number = 1): number {
  const baseMultiplier: Record<Era, number> = {
    founders: 1.0,
    marauders: 1.1,
    potter: 1.2,
    newgen: 1.15,
    rational: 1.25,
  }

  return baseMultiplier[era] * multiplier
}

export type EraaMilestone = Omit<EraMilestone, 'era'>
