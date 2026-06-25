// Era-Aware Procedural Generation v5
// Each era generates content specific to its lore and mechanics

import { Era, getEraQuests, getEraLocations, getEraNPCs } from './era-lore-v5'
import { getEraProgression } from './era-progression-v5'
import SimplexNoise from 'simplex-noise'
import Alea from 'alea'

export interface EraProceduralContext {
  era: Era
  seed: string
  playerLevel: number
  difficultyMultiplier: number
  locationBias?: string
}

export interface EraGeneratedQuest {
  id: string
  title: string
  description: string
  era: Era
  objectives: string[]
  reward: {
    xp: number
    currency: number
    eraSpecificStat: number
  }
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary'
  generatedAt: Date
}

export interface EraGeneratedLocation {
  id: string
  name: string
  era: Era
  description: string
  creatures: string[]
  treasureRarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  eraUniqueMechanics: Record<string, any>
}

// ========================================
// FOUNDERS ERA PROCEDURAL GENERATION
// ========================================

export function generateFoundersQuest(
  playerLevel: number,
  seed: string
): EraGeneratedQuest {
  const prng = new Alea(seed)
  const noise = new SimplexNoise(prng)

  const questTypes = [
    'Gather construction materials',
    'Build a structure',
    'Defend Hogwarts from threats',
    'Retrieve a lost artifact',
    'Study ancient magical theory',
    'Negotiate with ancient creatures',
  ]

  const buildings = [
    'Tower',
    'Wing',
    'Chamber',
    'Library Section',
    'Training Grounds',
    'Garden',
  ]

  const selectedType = questTypes[Math.floor(prng() * questTypes.length)]
  const selectedBuilding = buildings[Math.floor(prng() * buildings.length)]

  const baseXp = Math.floor(playerLevel * 150)
  const baseCurrency = Math.floor(playerLevel * 50)
  const buildingPoints = Math.floor(playerLevel * 5)

  return {
    id: `founders_quest_${Date.now()}`,
    title: `${selectedType}: ${selectedBuilding}`,
    description: `As a student during Hogwarts' founding, ${selectedType.toLowerCase()} for the ${selectedBuilding}.`,
    era: 'founders',
    objectives: [
      `Complete 3 tasks related to ${selectedBuilding}`,
      `Gather 10 materials`,
      `Return to the Founder for completion`,
    ],
    reward: {
      xp: baseXp,
      currency: baseCurrency,
      eraSpecificStat: buildingPoints,
    },
    difficulty: playerLevel < 10 ? 'easy' : playerLevel < 25 ? 'medium' : 'hard',
    generatedAt: new Date(),
  }
}

// ========================================
// MARAUDERS ERA PROCEDURAL GENERATION
// ========================================

export function generateMaraudersQuest(
  playerLevel: number,
  seed: string
): EraGeneratedQuest {
  const prng = new Alea(seed)

  const questTypes = [
    'Discover a secret passage',
    'Learn to transform',
    'Map hidden locations',
    'Investigate mysterious activity',
    'Meditate for magical mastery',
    'Uncover a hidden truth',
  ]

  const locations = [
    'Forbidden Forest',
    'Room of Requirement',
    'Shrieking Shack',
    'Hogsmeade tunnel',
    'Whomping Willow',
    'Seven secret passages',
  ]

  const selectedType = questTypes[Math.floor(prng() * questTypes.length)]
  const selectedLocation = locations[Math.floor(prng() * locations.length)]

  const baseXp = Math.floor(playerLevel * 180)
  const baseCurrency = Math.floor(playerLevel * 60)
  const transformationProgress = Math.floor(playerLevel * 3)

  return {
    id: `marauders_quest_${Date.now()}`,
    title: `${selectedType} in ${selectedLocation}`,
    description: `Navigate the dangers of the Marauders era. ${selectedType} at ${selectedLocation}.`,
    era: 'marauders',
    objectives: [
      `Travel to ${selectedLocation}`,
      `${selectedType}`,
      `Survive the encounter`,
      `Report back to your Marauder contact`,
    ],
    reward: {
      xp: baseXp,
      currency: baseCurrency,
      eraSpecificStat: transformationProgress,
    },
    difficulty: playerLevel < 15 ? 'medium' : playerLevel < 35 ? 'hard' : 'legendary',
    generatedAt: new Date(),
  }
}

// ========================================
// POTTER ERA PROCEDURAL GENERATION
// ========================================

export function generatePotterQuest(
  playerLevel: number,
  seed: string
): EraGeneratedQuest {
  const prng = new Alea(seed)

  const questTypes = [
    'Locate and destroy a Horcrux',
    'Investigate dark magic',
    'Protect innocents from danger',
    'Gather intelligence on threats',
    'Master a powerful spell',
    'Uncover a prophecy',
  ]

  const threats = [
    'Dark creatures',
    'Death Eaters',
    'Dark artifacts',
    'Corrupted magic',
    'Ancient evils',
    'Prophecy enemies',
  ]

  const selectedType = questTypes[Math.floor(prng() * questTypes.length)]
  const selectedThreat = threats[Math.floor(prng() * threats.length)]

  const baseXp = Math.floor(playerLevel * 220)
  const baseCurrency = Math.floor(playerLevel * 80)
  const prophecyPoints = Math.floor(playerLevel * 4)

  return {
    id: `potter_quest_${Date.now()}`,
    title: `${selectedType}`,
    description: `In the age of darkness, ${selectedType.toLowerCase()}. Beware: ${selectedThreat.toLowerCase()}.`,
    era: 'potter',
    objectives: [
      `Search for clues about the threat`,
      `Overcome ${selectedThreat.toLowerCase()}`,
      `${selectedType}`,
      `Complete your mission and survive`,
    ],
    reward: {
      xp: baseXp,
      currency: baseCurrency,
      eraSpecificStat: prophecyPoints,
    },
    difficulty: playerLevel < 25 ? 'hard' : 'legendary',
    generatedAt: new Date(),
  }
}

// ========================================
// NEW GENERATION ERA PROCEDURAL GENERATION
// ========================================

export function generateNewGenQuest(
  playerLevel: number,
  seed: string
): EraGeneratedQuest {
  const prng = new Alea(seed)

  const questTypes = [
    'Inherit ancestral power',
    'Complete legacy trial',
    'Prove yourself worthy',
    'Surpass your ancestor',
    'Unlock family secrets',
    'Face new threats',
  ]

  const legacies = ['Potter', 'Weasley', 'Granger', 'Longbottom', 'Luna\'s Heir']

  const selectedType = questTypes[Math.floor(prng() * questTypes.length)]
  const selectedLegacy = legacies[Math.floor(prng() * legacies.length)]

  const baseXp = Math.floor(playerLevel * 200)
  const baseCurrency = Math.floor(playerLevel * 70)
  const legacyPoints = Math.floor(playerLevel * 6)

  return {
    id: `newgen_quest_${Date.now()}`,
    title: `${selectedType}: ${selectedLegacy} Line`,
    description: `As heir to the ${selectedLegacy} legacy, ${selectedType.toLowerCase()}.`,
    era: 'newgen',
    objectives: [
      `Research the ${selectedLegacy} family history`,
      `${selectedType}`,
      `Prove your connection to your ancestors`,
      `Claim your inheritance`,
    ],
    reward: {
      xp: baseXp,
      currency: baseCurrency,
      eraSpecificStat: legacyPoints,
    },
    difficulty: playerLevel < 20 ? 'hard' : playerLevel < 40 ? 'legendary' : 'legendary',
    generatedAt: new Date(),
  }
}

// ========================================
// RATIONAL ERA PROCEDURAL GENERATION
// ========================================

export function generateRationalQuest(
  playerLevel: number,
  seed: string
): EraGeneratedQuest {
  const prng = new Alea(seed)

  const questTypes = [
    'Conduct magical experiment',
    'Optimize a spell formula',
    'Research potion chemistry',
    'Document magical phenomenon',
    'Publish research findings',
    'Break magical barriers',
  ]

  const topics = [
    'spell efficiency',
    'potion science',
    'magical theory',
    'enchantment mechanics',
    'creature biology',
    'elemental magic',
  ]

  const selectedType = questTypes[Math.floor(prng() * questTypes.length)]
  const selectedTopic = topics[Math.floor(prng() * topics.length)]

  const baseXp = Math.floor(playerLevel * 240)
  const baseCurrency = Math.floor(playerLevel * 90)
  const researchPoints = Math.floor(playerLevel * 8)

  return {
    id: `rational_quest_${Date.now()}`,
    title: `${selectedType}: ${selectedTopic}`,
    description: `Using scientific methodology, ${selectedType.toLowerCase()} related to ${selectedTopic}.`,
    era: 'rational',
    objectives: [
      `Design experimental framework`,
      `Conduct 5 tests`,
      `Analyze results`,
      `Document and publish findings`,
    ],
    reward: {
      xp: baseXp,
      currency: baseCurrency,
      eraSpecificStat: researchPoints,
    },
    difficulty: playerLevel < 30 ? 'medium' : playerLevel < 45 ? 'hard' : 'legendary',
    generatedAt: new Date(),
  }
}

// ========================================
// MAIN ERA QUEST GENERATOR
// ========================================

export function generateEraQuest(
  era: Era,
  playerLevel: number,
  seed: string
): EraGeneratedQuest {
  switch (era) {
    case 'founders':
      return generateFoundersQuest(playerLevel, seed)
    case 'marauders':
      return generateMaraudersQuest(playerLevel, seed)
    case 'potter':
      return generatePotterQuest(playerLevel, seed)
    case 'newgen':
      return generateNewGenQuest(playerLevel, seed)
    case 'rational':
      return generateRationalQuest(playerLevel, seed)
    default:
      throw new Error(`Unknown era: ${era}`)
  }
}

// ========================================
// ERA-SPECIFIC LOCATION GENERATION
// ========================================

export function generateEraLocation(
  era: Era,
  playerLevel: number,
  seed: string
): EraGeneratedLocation {
  const prng = new Alea(seed)
  const baseLocations = getEraLocations(era)

  if (baseLocations.length === 0) {
    throw new Error(`No locations available for era: ${era}`)
  }

  const baseLocation = baseLocations[Math.floor(prng() * baseLocations.length)]

  const rarityScale = ['common', 'uncommon', 'rare', 'epic', 'legendary'] as const
  const rarityIndex = Math.min(
    Math.floor(playerLevel / 15),
    rarityScale.length - 1
  )

  const eraUniqueMechanics: Record<string, any> = {}

  switch (era) {
    case 'founders':
      eraUniqueMechanics.constructionSites = Math.floor(prng() * 3) + 1
      eraUniqueMechanics.ancientMagic = true
      break
    case 'marauders':
      eraUniqueMechanics.secretPassages = Math.floor(prng() * 5) + 2
      eraUniqueMechanics.moonPhase = ['new', 'waxing', 'full', 'waning'][
        Math.floor(prng() * 4)
      ]
      break
    case 'potter':
      eraUniqueMechanics.darkMagicPresence = Math.floor(prng() * 100)
      eraUniqueMechanics.prophecyStrength = Math.floor(prng() * 100)
      break
    case 'newgen':
      eraUniqueMechanics.legacyResonance = Math.floor(prng() * 100)
      eraUniqueMechanics.modernEnhancements = true
      break
    case 'rational':
      eraUniqueMechanics.magicalStability = Math.floor(prng() * 100)
      eraUniqueMechanics.researchLabs = Math.floor(prng() * 3) + 1
      break
  }

  return {
    id: `${era}_location_${Date.now()}`,
    name: `${baseLocation.name} (Era-Specific)`,
    era,
    description: `${baseLocation.description} (Generated for level ${playerLevel})`,
    creatures: baseLocation.creatures,
    treasureRarity: rarityScale[rarityIndex],
    eraUniqueMechanics,
  }
}

// ========================================
// ERA ENVIRONMENT SCALING
// ========================================

export function scaleEraContentToDifficulty(
  era: Era,
  playerLevel: number
): number {
  const eraBaseMultipliers: Record<Era, number> = {
    founders: 1.0,
    marauders: 1.15,
    potter: 1.3,
    newgen: 1.2,
    rational: 1.35,
  }

  const levelScaling = 1 + (playerLevel - 1) * 0.05

  return eraBaseMultipliers[era] * levelScaling
}

// ========================================
// BATCH ERA CONTENT GENERATION
// ========================================

export function generateEraContent(context: EraProceduralContext) {
  const quests = Array.from({ length: 5 }, (_, i) =>
    generateEraQuest(
      context.era,
      context.playerLevel,
      `${context.seed}_quest_${i}`
    )
  )

  const locations = Array.from({ length: 3 }, (_, i) =>
    generateEraLocation(
      context.era,
      context.playerLevel,
      `${context.seed}_location_${i}`
    )
  )

  const difficultyScale = scaleEraContentToDifficulty(
    context.era,
    context.playerLevel
  )

  return {
    quests,
    locations,
    difficultyScale,
    eraProgression: getEraProgression(context.era),
  }
}
