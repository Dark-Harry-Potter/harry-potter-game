export interface Location {
  id: string
  name: string
  description: string
  type: 'hub' | 'story' | 'exploration' | 'landmark'
  unlockedAt: number // Year when unlocked
  creatures?: string[] // Creature IDs that spawn here
  quests?: string[]
  npcs?: string[]
  position: [number, number, number]
}

export const GAME_LOCATIONS: Record<string, Location> = {
  'train-station': {
    id: 'train-station',
    name: 'Platform 9¾',
    description: 'The magical train station where your adventure begins',
    type: 'story',
    unlockedAt: 1,
    position: [0, 0, -30],
    quests: ['train-journey'],
  },
  castle: {
    id: 'castle',
    name: 'Academy Castle',
    description: 'The grand castle of the magical academy - your new home',
    type: 'hub',
    unlockedAt: 1,
    creatures: ['flobberworm', 'pixie'],
    quests: ['sorting-ceremony', 'find-dorm'],
    npcs: ['headmaster', 'librarian'],
    position: [0, 0, 0],
  },
  'forbidden-forest': {
    id: 'forbidden-forest',
    name: 'Forbidden Forest',
    description: 'A mysterious woodland filled with magical creatures',
    type: 'exploration',
    unlockedAt: 2,
    creatures: ['hippogriff', 'acromantula'],
    quests: ['forest-exploration', 'creature-rescue'],
    position: [-20, 0, 0],
  },
  'magical-village': {
    id: 'magical-village',
    name: 'Magical Village',
    description: 'A quaint village with shops, taverns, and local legends',
    type: 'hub',
    unlockedAt: 2,
    npcs: ['merchant', 'innkeeper'],
    quests: ['village-quest'],
    position: [20, 0, 0],
  },
  'training-grounds': {
    id: 'training-grounds',
    name: 'Training Grounds',
    description: 'Open field for spell practice and duels',
    type: 'landmark',
    unlockedAt: 1,
    creatures: ['flobberworm'],
    quests: ['spell-training'],
    position: [0, 0, -15],
  },
  'lake': {
    id: 'lake',
    name: 'Crystal Lake',
    description: 'A beautiful lake with magical properties',
    type: 'exploration',
    unlockedAt: 3,
    creatures: ['pixie'],
    quests: ['lake-mystery'],
    position: [15, 0, 20],
  },
  'ruins': {
    id: 'ruins',
    name: 'Ancient Ruins',
    description: 'Crumbling structures from ages past',
    type: 'exploration',
    unlockedAt: 4,
    creatures: ['acromantula'],
    quests: ['ruin-expedition'],
    position: [-30, 0, 20],
  },
  'tower': {
    id: 'tower',
    name: 'Observation Tower',
    description: 'A tall tower offering views of the entire realm',
    type: 'landmark',
    unlockedAt: 2,
    quests: ['tower-climb'],
    position: [0, 0, 30],
  },
}

export function getUnlockedLocations(year: number): Location[] {
  return Object.values(GAME_LOCATIONS).filter((loc) => loc.unlockedAt <= year)
}

export function isLocationUnlocked(locationId: string, year: number): boolean {
  const location = GAME_LOCATIONS[locationId]
  return location ? location.unlockedAt <= year : false
}
