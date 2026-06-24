import { create } from 'zustand'

export interface SortingPoints {
  bravery: number
  cunning: number
  loyalty: number
  wisdom: number
}

export interface PlayerCharacter {
  id: string
  characterName: string
  house: string
  pet?: string
  petName?: string
  wand?: {
    core: string
    wood: string
    length: number
  }
  year: number
  house_points: number
  experience: number
  level: number
  health: number
  mana: number
  sorting_points: SortingPoints
}

export interface GameState {
  // Character
  character: PlayerCharacter | null
  setCharacter: (character: PlayerCharacter) => void

  // Sorting
  sortingPoints: SortingPoints
  setSortingPoints: (points: SortingPoints) => void
  addSortingPoints: (points: Partial<SortingPoints>) => void

  // Quest
  currentQuestId: string | null
  completedQuests: string[]
  setCurrentQuestId: (id: string | null) => void
  addCompletedQuest: (id: string) => void

  // World
  currentLocation: string
  unlockedLocations: string[]
  setCurrentLocation: (location: string) => void
  unlockLocation: (location: string) => void

  // Spells
  learnedSpells: string[]
  learnSpell: (spellId: string) => void

  // Inventory
  inventory: { [key: string]: number }
  addItem: (itemId: string, quantity: number) => void
  removeItem: (itemId: string, quantity: number) => void

  // Game Progress
  currentYear: number
  advanceYear: () => void
}

export const useGameStore = create<GameState>((set) => ({
  character: null,
  setCharacter: (character) => set({ character }),

  sortingPoints: { bravery: 0, cunning: 0, loyalty: 0, wisdom: 0 },
  setSortingPoints: (points) => set({ sortingPoints: points }),
  addSortingPoints: (points) =>
    set((state) => ({
      sortingPoints: {
        bravery: state.sortingPoints.bravery + (points.bravery || 0),
        cunning: state.sortingPoints.cunning + (points.cunning || 0),
        loyalty: state.sortingPoints.loyalty + (points.loyalty || 0),
        wisdom: state.sortingPoints.wisdom + (points.wisdom || 0),
      },
    })),

  currentQuestId: null,
  completedQuests: [],
  setCurrentQuestId: (id) => set({ currentQuestId: id }),
  addCompletedQuest: (id) =>
    set((state) => ({
      completedQuests: [...state.completedQuests, id],
    })),

  currentLocation: 'train-station',
  unlockedLocations: ['train-station'],
  setCurrentLocation: (location) => set({ currentLocation: location }),
  unlockLocation: (location) =>
    set((state) => ({
      unlockedLocations: [...new Set([...state.unlockedLocations, location])],
    })),

  learnedSpells: [],
  learnSpell: (spellId) =>
    set((state) => ({
      learnedSpells: [...new Set([...state.learnedSpells, spellId])],
    })),

  inventory: {},
  addItem: (itemId, quantity) =>
    set((state) => ({
      inventory: {
        ...state.inventory,
        [itemId]: (state.inventory[itemId] || 0) + quantity,
      },
    })),
  removeItem: (itemId, quantity) =>
    set((state) => ({
      inventory: {
        ...state.inventory,
        [itemId]: Math.max(0, (state.inventory[itemId] || 0) - quantity),
      },
    })),

  currentYear: 1,
  advanceYear: () => set((state) => ({ currentYear: state.currentYear + 1 })),
}))
