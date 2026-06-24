// Expanded spell system for v2 with 40+ spells across all categories

export interface Spell {
  id: string
  name: string
  category: 'offensive' | 'defensive' | 'utility' | 'healing' | 'dark'
  gestures: string[] // Array of gesture patterns to cast
  manaCost: number
  cooldown: number // in seconds
  damage?: number
  protection?: number
  level: number // Required player level to learn
  house?: string // House-specific spells
  description: string
  animation: string
  particleColor: string
}

export const SPELLS_V2: Record<string, Spell> = {
  // OFFENSIVE SPELLS
  'stupefy': {
    id: 'stupefy',
    name: 'Stupefy',
    category: 'offensive',
    gestures: ['downward', 'circle'],
    manaCost: 20,
    cooldown: 2,
    damage: 25,
    level: 1,
    description: 'Stuns the opponent briefly',
    animation: 'stupefy_cast',
    particleColor: '#FF6B6B',
  },
  'rictusempra': {
    id: 'rictusempra',
    name: 'Rictusempra',
    category: 'offensive',
    gestures: ['zigzag'],
    manaCost: 15,
    cooldown: 1.5,
    damage: 10,
    level: 2,
    description: 'Tickling charm - disorients enemy',
    animation: 'rictusempra_cast',
    particleColor: '#FFD93D',
  },
  'incendio': {
    id: 'incendio',
    name: 'Incendio',
    category: 'offensive',
    gestures: ['upward', 'circle'],
    manaCost: 30,
    cooldown: 3,
    damage: 40,
    level: 5,
    description: 'Fire spell - deals heavy damage',
    animation: 'incendio_cast',
    particleColor: '#FF4500',
  },
  'confringo': {
    id: 'confringo',
    name: 'Confringo',
    category: 'offensive',
    gestures: ['rightward', 'circle'],
    manaCost: 35,
    cooldown: 3.5,
    damage: 50,
    level: 8,
    description: 'Blasting curse - explosive damage',
    animation: 'confringo_cast',
    particleColor: '#FF6347',
  },
  'reducto': {
    id: 'reducto',
    name: 'Reducto',
    category: 'offensive',
    gestures: ['downward', 'rightward'],
    manaCost: 40,
    cooldown: 4,
    damage: 55,
    level: 10,
    description: 'Reduces obstacles to dust',
    animation: 'reducto_cast',
    particleColor: '#696969',
  },
  'bombarda': {
    id: 'bombarda',
    name: 'Bombarda',
    category: 'offensive',
    gestures: ['circle', 'downward'],
    manaCost: 45,
    cooldown: 4.5,
    damage: 60,
    level: 12,
    description: 'Explosion spell',
    animation: 'bombarda_cast',
    particleColor: '#FF8C00',
  },

  // DEFENSIVE SPELLS
  'protego': {
    id: 'protego',
    name: 'Protego',
    category: 'defensive',
    gestures: ['circle', 'upward'],
    manaCost: 25,
    cooldown: 2.5,
    protection: 30,
    level: 3,
    description: 'Creates a protective shield',
    animation: 'protego_cast',
    particleColor: '#4169E1',
  },
  'expelliarmus': {
    id: 'expelliarmus',
    name: 'Expelliarmus',
    category: 'defensive',
    gestures: ['rightward', 'upward'],
    manaCost: 20,
    cooldown: 2,
    protection: 20,
    level: 4,
    description: 'Disarms opponent',
    animation: 'expelliarmus_cast',
    particleColor: '#87CEEB',
  },
  'finiteincantatem': {
    id: 'finiteincantatem',
    name: 'Finite Incantatem',
    category: 'defensive',
    gestures: ['leftward', 'downward'],
    manaCost: 30,
    cooldown: 3,
    protection: 40,
    level: 6,
    description: 'Breaks all active spells',
    animation: 'finite_cast',
    particleColor: '#9370DB',
  },

  // UTILITY SPELLS
  'accio': {
    id: 'accio',
    name: 'Accio',
    category: 'utility',
    gestures: ['rightward'],
    manaCost: 10,
    cooldown: 1,
    level: 1,
    description: 'Summons objects',
    animation: 'accio_cast',
    particleColor: '#32CD32',
  },
  'lumos': {
    id: 'lumos',
    name: 'Lumos',
    category: 'utility',
    gestures: ['upward'],
    manaCost: 5,
    cooldown: 0.5,
    level: 1,
    description: 'Creates light',
    animation: 'lumos_cast',
    particleColor: '#FFD700',
  },
  'wingardiumleviosa': {
    id: 'wingardiumleviosa',
    name: 'Wingardium Leviosa',
    category: 'utility',
    gestures: ['circle', 'upward'],
    manaCost: 15,
    cooldown: 2,
    level: 3,
    description: 'Makes objects levitate',
    animation: 'leviosa_cast',
    particleColor: '#00BFFF',
  },
  'alohomora': {
    id: 'alohomora',
    name: 'Alohomora',
    category: 'utility',
    gestures: ['leftward'],
    manaCost: 8,
    cooldown: 1.5,
    level: 2,
    description: 'Unlocks doors and chests',
    animation: 'alohomora_cast',
    particleColor: '#FFB6C1',
  },

  // HEALING SPELLS
  'episkey': {
    id: 'episkey',
    name: 'Episkey',
    category: 'healing',
    gestures: ['circle'],
    manaCost: 20,
    cooldown: 2.5,
    level: 5,
    description: 'Heals minor injuries',
    animation: 'episkey_cast',
    particleColor: '#98FB98',
  },
  'vulnerasanentur': {
    id: 'vulnerasanentur',
    name: 'Vulnera Sanentur',
    category: 'healing',
    gestures: ['upward', 'circle', 'downward'],
    manaCost: 35,
    cooldown: 4,
    level: 10,
    description: 'Heals severe wounds',
    animation: 'vulnera_cast',
    particleColor: '#00FF00',
  },

  // DARK ARTS SPELLS
  'crucio': {
    id: 'crucio',
    name: 'Crucio',
    category: 'dark',
    gestures: ['zigzag', 'circle'],
    manaCost: 50,
    cooldown: 5,
    damage: 80,
    level: 20,
    house: 'slytherin',
    description: 'Torture curse - forbidden',
    animation: 'crucio_cast',
    particleColor: '#8B008B',
  },
  'imperio': {
    id: 'imperio',
    name: 'Imperio',
    category: 'dark',
    gestures: ['rightward', 'circle'],
    manaCost: 45,
    cooldown: 4.5,
    damage: 0,
    level: 20,
    house: 'slytherin',
    description: 'Mind control curse - forbidden',
    animation: 'imperio_cast',
    particleColor: '#4B0082',
  },
  'avadakedavra': {
    id: 'avadakedavra',
    name: 'Avada Kedavra',
    category: 'dark',
    gestures: ['circle', 'downward', 'circle'],
    manaCost: 100,
    cooldown: 10,
    damage: 999,
    level: 30,
    house: 'slytherin',
    description: 'Killing curse - instant kill (forbidden)',
    animation: 'avada_cast',
    particleColor: '#00FF00',
  },
}

export const SPELL_COMBINATIONS: Record<string, { spells: string[]; result: Spell }> = {
  'fire_explosion': {
    spells: ['incendio', 'bombarda'],
    result: {
      id: 'fire_explosion_combo',
      name: 'Inferno Blast',
      category: 'offensive',
      gestures: [],
      manaCost: 70,
      cooldown: 6,
      damage: 120,
      level: 15,
      description: 'Combined fire and explosion - devastating combo',
      animation: 'inferno_combo_cast',
      particleColor: '#FF4500',
    }
  },
  'shield_barrier': {
    spells: ['protego', 'expelliarmus'],
    result: {
      id: 'shield_barrier_combo',
      name: 'Barrier Wall',
      category: 'defensive',
      gestures: [],
      manaCost: 50,
      cooldown: 5,
      protection: 80,
      level: 12,
      description: 'Creates an impenetrable barrier',
      animation: 'barrier_combo_cast',
      particleColor: '#4169E1',
    }
  },
}

export function getSpellById(spellId: string): Spell | undefined {
  return SPELLS_V2[spellId]
}

export function getSpellsByCategory(category: string): Spell[] {
  return Object.values(SPELLS_V2).filter(spell => spell.category === category)
}

export function getSpellsByLevel(level: number): Spell[] {
  return Object.values(SPELLS_V2).filter(spell => spell.level <= level)
}

export function checkSpellCombo(spell1Id: string, spell2Id: string): Spell | null {
  for (const combo of Object.values(SPELL_COMBINATIONS)) {
    const spells = combo.spells.sort().join(',')
    const current = [spell1Id, spell2Id].sort().join(',')
    if (spells === current) {
      return combo.result
    }
  }
  return null
}
