// Mini-games system for v2

export interface MiniGameScore {
  gameId: string
  characterId: string
  score: number
  timestamp: Date
  difficulty: 'easy' | 'normal' | 'hard'
}

export interface QuiddtchGame {
  id: string
  type: 'quidditch'
  playerTeam: string[]
  opponentTeam: string[]
  duration: number // seconds
  score: { player: number; opponent: number }
  status: 'waiting' | 'active' | 'completed'
  rewards: { experience: number; currency: number }
}

export interface DuelingClubMatch {
  id: string
  type: 'dueling'
  challenger: { id: string; name: string }
  opponent: { id: string; name: string }
  rounds: number
  currentRound: number
  status: 'waiting' | 'active' | 'completed'
  winner?: string
  rewards: { experience: number; currency: number }
}

export interface PotionBrewing {
  id: string
  type: 'potion_brewing'
  recipeName: string
  ingredients: { name: string; quantity: number; added: boolean }[]
  temperature: number
  targetTemperature: number
  timeRemaining: number
  difficulty: 'easy' | 'normal' | 'hard'
  rewards: { experience: number; currency: number; item: string }
}

export interface WandlessTraining {
  id: string
  type: 'wandless_training'
  patterns: string[]
  correctPatterns: number
  totalPatterns: number
  timeLimit: number
  difficulty: 'easy' | 'normal' | 'hard'
  rewards: { experience: number; currency: number }
}

// QUIDDITCH GAME LOGIC
export class QuiddtchGameManager {
  static createGame(playerTeam: string[], opponentTeam: string[]): QuiddtchGame {
    return {
      id: `qd_${Date.now()}`,
      type: 'quidditch',
      playerTeam,
      opponentTeam,
      duration: 1800, // 30 minutes
      score: { player: 0, opponent: 0 },
      status: 'waiting',
      rewards: { experience: 500, currency: 200 },
    }
  }

  static scoreGoal(game: QuiddtchGame, team: 'player' | 'opponent'): void {
    if (team === 'player') game.score.player += 10
    else game.score.opponent += 10
  }

  static caughtSnitch(game: QuiddtchGame, team: 'player' | 'opponent'): void {
    if (team === 'player') {
      game.score.player += 150
      game.status = 'completed'
    } else {
      game.score.opponent += 150
      game.status = 'completed'
    }
  }
}

// DUELING CLUB LOGIC
export class DuelingClubManager {
  static createMatch(
    challenger: { id: string; name: string },
    opponent: { id: string; name: string }
  ): DuelingClubMatch {
    return {
      id: `dc_${Date.now()}`,
      type: 'dueling',
      challenger,
      opponent,
      rounds: 3,
      currentRound: 1,
      status: 'waiting',
      rewards: { experience: 300, currency: 150 },
    }
  }

  static executeSpell(
    match: DuelingClubMatch,
    caster: 'challenger' | 'opponent',
    spellId: string
  ): { damage: number; success: boolean } {
    // Spell logic
    const baseDamage = Math.floor(Math.random() * 30) + 10
    const accuracy = Math.random() > 0.2 // 80% accuracy
    return {
      damage: accuracy ? baseDamage : 0,
      success: accuracy,
    }
  }

  static endRound(match: DuelingClubMatch, winner: 'challenger' | 'opponent'): void {
    if (match.currentRound >= match.rounds) {
      match.status = 'completed'
      match.winner = winner
    } else {
      match.currentRound++
    }
  }
}

// POTION BREWING LOGIC
export class PotionBrewingManager {
  static createRecipe(difficulty: 'easy' | 'normal' | 'hard'): PotionBrewing {
    const recipes = {
      easy: {
        name: 'Simple Healing Potion',
        ingredients: [
          { name: 'Moonstone', quantity: 2, added: false },
          { name: 'Mint', quantity: 1, added: false },
          { name: 'Water', quantity: 5, added: false },
        ],
        targetTemperature: 180,
        timeLimit: 120,
        rewards: { experience: 100, currency: 50, item: 'healing_potion' },
      },
      normal: {
        name: 'Strengthening Elixir',
        ingredients: [
          { name: 'Wyvern Stone', quantity: 1, added: false },
          { name: 'Phoenix Ash', quantity: 2, added: false },
          { name: 'Powered Moonstone', quantity: 3, added: false },
          { name: 'Essence of Dragon', quantity: 1, added: false },
        ],
        targetTemperature: 220,
        timeLimit: 180,
        rewards: { experience: 250, currency: 150, item: 'strength_elixir' },
      },
      hard: {
        name: 'Polyjuice Potion',
        ingredients: [
          { name: 'Castor Oil', quantity: 2, added: false },
          { name: 'Snake Shed Skin', quantity: 2, added: false },
          { name: 'Boomslang Skin', quantity: 1, added: false },
          { name: 'Hair Sample', quantity: 1, added: false },
          { name: 'Powdered Mooncalf', quantity: 3, added: false },
        ],
        targetTemperature: 250,
        timeLimit: 300,
        rewards: { experience: 500, currency: 300, item: 'polyjuice_potion' },
      },
    }

    const recipe = recipes[difficulty]
    return {
      id: `pb_${Date.now()}`,
      type: 'potion_brewing',
      recipeName: recipe.name,
      ingredients: recipe.ingredients,
      temperature: 20,
      targetTemperature: recipe.targetTemperature,
      timeRemaining: recipe.timeLimit,
      difficulty,
      rewards: recipe.rewards,
    }
  }

  static addIngredient(
    potion: PotionBrewing,
    ingredientName: string
  ): { success: boolean; message: string } {
    const ingredient = potion.ingredients.find((i) => i.name === ingredientName)
    if (!ingredient) return { success: false, message: 'Ingredient not found' }
    if (ingredient.added) return { success: false, message: 'Already added' }

    ingredient.added = true
    potion.temperature += Math.random() * 20
    return { success: true, message: `Added ${ingredientName}` }
  }

  static heatPotion(potion: PotionBrewing, amount: number): void {
    potion.temperature = Math.min(potion.temperature + amount, potion.targetTemperature + 50)
  }

  static checkCompletion(potion: PotionBrewing): {
    completed: boolean
    success: boolean
    message: string
  } {
    const allAdded = potion.ingredients.every((i) => i.added)
    const tempCorrect = Math.abs(potion.temperature - potion.targetTemperature) < 10
    const success = allAdded && tempCorrect && potion.timeRemaining > 0

    return {
      completed: allAdded && potion.timeRemaining <= 0,
      success,
      message: success ? 'Perfect potion!' : 'Potion recipe failed',
    }
  }
}

// WANDLESS TRAINING LOGIC
export class WandlessTrainingManager {
  static createTraining(difficulty: 'easy' | 'normal' | 'hard'): WandlessTraining {
    const configs = {
      easy: {
        patterns: ['up', 'down', 'left', 'right'],
        timeLimit: 60,
      },
      normal: {
        patterns: [
          'up-down',
          'left-right',
          'circle-left',
          'circle-right',
          'zigzag',
        ],
        timeLimit: 90,
      },
      hard: {
        patterns: [
          'up-down-up',
          'circle-left-right',
          'zigzag-up-down',
          'spiral-left',
          'spiral-right',
          'wave',
        ],
        timeLimit: 120,
      },
    }

    const config = configs[difficulty]
    return {
      id: `wt_${Date.now()}`,
      type: 'wandless_training',
      patterns: Array.from({ length: 10 }, () =>
        config.patterns[Math.floor(Math.random() * config.patterns.length)]
      ),
      correctPatterns: 0,
      totalPatterns: 10,
      timeLimit: config.timeLimit,
      difficulty,
      rewards: { experience: 200, currency: 100 },
    }
  }

  static checkPattern(
    training: WandlessTraining,
    inputPattern: string,
    targetIndex: number
  ): { correct: boolean; reward: number } {
    const targetPattern = training.patterns[targetIndex]
    const correct = inputPattern === targetPattern

    if (correct) {
      training.correctPatterns++
    }

    return {
      correct,
      reward: correct ? 10 : 0,
    }
  }

  static getAccuracy(training: WandlessTraining): number {
    return (training.correctPatterns / training.totalPatterns) * 100
  }
}

// Mini-game registry
export const MINIGAMES = {
  QUIDDITCH: 'quidditch',
  DUELING_CLUB: 'dueling_club',
  POTION_BREWING: 'potion_brewing',
  WANDLESS_TRAINING: 'wandless_training',
}

export function getMiniGameRewards(gameId: string, score: number, difficulty: string) {
  const difficultyMultiplier = {
    easy: 1,
    normal: 1.5,
    hard: 2.5,
  }[difficulty] || 1

  return {
    experience: Math.floor(score * difficultyMultiplier),
    currency: Math.floor((score / 10) * difficultyMultiplier),
  }
}
