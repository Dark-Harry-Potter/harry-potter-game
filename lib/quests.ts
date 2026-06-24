export interface Quest {
  id: string
  name: string
  description: string
  year: number
  location: string
  objectives: string[]
  rewards: {
    experience: number
    house_points: number
    items?: string[]
  }
  type: 'story' | 'side' | 'tutorial'
}

export const QUESTS: Record<string, Quest> = {
  'train-journey': {
    id: 'train-journey',
    name: 'The Magical Express',
    description: 'Your first journey on the magical train to the academy',
    year: 1,
    location: 'train-station',
    objectives: [
      'Board the magical train at Platform 9¾',
      'Meet other students during the journey',
      'Arrive at the academy',
    ],
    rewards: {
      experience: 50,
      house_points: 10,
    },
    type: 'story',
  },
  'sorting-ceremony': {
    id: 'sorting-ceremony',
    name: 'The Sorting Hat Ceremony',
    description: 'Face the legendary Sorting Hat and discover your house',
    year: 1,
    location: 'castle',
    objectives: [
      'Enter the Great Hall',
      'Place the Sorting Hat on your head',
      'Accept your house placement',
    ],
    rewards: {
      experience: 100,
      house_points: 25,
    },
    type: 'story',
  },
  'find-dorm': {
    id: 'find-dorm',
    name: 'Find Your Dormitory',
    description: 'Navigate the castle to find your house dormitory',
    year: 1,
    location: 'castle',
    objectives: [
      'Find your house dormitory',
      'Meet your roommate',
      'Unpack your belongings',
    ],
    rewards: {
      experience: 50,
      house_points: 15,
    },
    type: 'tutorial',
  },
  'spell-training': {
    id: 'spell-training',
    name: 'First Spell Lesson',
    description: 'Learn your first spell from the spell master',
    year: 1,
    location: 'training-grounds',
    objectives: [
      'Practice the Luminous spell',
      'Successfully cast it 3 times',
      'Report back to the instructor',
    ],
    rewards: {
      experience: 75,
      house_points: 20,
      items: ['spell-scroll'],
    },
    type: 'tutorial',
  },
  'forest-exploration': {
    id: 'forest-exploration',
    name: 'Into the Forbidden Forest',
    description: 'Explore the mysterious Forbidden Forest and study magical creatures',
    year: 2,
    location: 'forbidden-forest',
    objectives: [
      'Enter the Forbidden Forest',
      'Encounter 3 different creatures',
      'Collect forest samples',
      'Return with your findings',
    ],
    rewards: {
      experience: 200,
      house_points: 50,
      items: ['forest-leaf', 'creature-scale'],
    },
    type: 'side',
  },
  'creature-rescue': {
    id: 'creature-rescue',
    name: 'Rescue Mission',
    description: 'Rescue a magical creature from danger',
    year: 2,
    location: 'forbidden-forest',
    objectives: [
      'Find the lost creature',
      'Protect it from other creatures',
      'Guide it back to safety',
    ],
    rewards: {
      experience: 250,
      house_points: 75,
    },
    type: 'side',
  },
  'village-quest': {
    id: 'village-quest',
    name: 'Village Affairs',
    description: 'Help the local villagers with their problems',
    year: 2,
    location: 'magical-village',
    objectives: [
      'Speak with the villagers',
      'Complete their tasks',
      'Return for rewards',
    ],
    rewards: {
      experience: 150,
      house_points: 40,
      items: ['village-gift'],
    },
    type: 'side',
  },
  'lake-mystery': {
    id: 'lake-mystery',
    name: 'Mystery of Crystal Lake',
    description: 'Investigate strange occurrences at Crystal Lake',
    year: 3,
    location: 'lake',
    objectives: [
      'Visit Crystal Lake',
      'Find clues about the mystery',
      'Uncover the truth',
      'Report your findings',
    ],
    rewards: {
      experience: 300,
      house_points: 100,
      items: ['crystal-shard'],
    },
    type: 'side',
  },
  'ruin-expedition': {
    id: 'ruin-expedition',
    name: 'Ancient Ruin Expedition',
    description: 'Explore ancient ruins and uncover its secrets',
    year: 4,
    location: 'ruins',
    objectives: [
      'Navigate the ruins',
      'Solve ancient puzzles',
      'Find the artifact',
      'Escape safely',
    ],
    rewards: {
      experience: 500,
      house_points: 150,
      items: ['ancient-artifact'],
    },
    type: 'side',
  },
  'tower-climb': {
    id: 'tower-climb',
    name: 'Tower Ascension',
    description: 'Climb the tall observation tower for a secret reward',
    year: 2,
    location: 'tower',
    objectives: [
      'Reach the tower base',
      'Climb to the top',
      'View the realm from above',
    ],
    rewards: {
      experience: 100,
      house_points: 30,
    },
    type: 'side',
  },
}

export function getQuestsByYear(year: number): Quest[] {
  return Object.values(QUESTS).filter((q) => q.year <= year)
}

export function getQuestsByLocation(locationId: string): Quest[] {
  return Object.values(QUESTS).filter((q) => q.location === locationId)
}

export function getQuestsByType(type: 'story' | 'side' | 'tutorial'): Quest[] {
  return Object.values(QUESTS).filter((q) => q.type === type)
}
