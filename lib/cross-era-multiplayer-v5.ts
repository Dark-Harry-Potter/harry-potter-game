// Cross-Era Multiplayer Systems v5
// Players in different eras can interact while maintaining era authenticity

import { Era } from './era-lore-v5'

export interface CrossEraPlayer {
  id: string
  username: string
  era: Era
  level: number
  house: string
  eraSpecificStat: number
  lastSeen: Date
  status: 'online' | 'offline' | 'in-quest'
}

export interface CrossEraGuild {
  id: string
  name: string
  leader: string
  members: CrossEraGuildMember[]
  treasury: number
  eras: Set<Era>
  founded: Date
  perks: GuildPerk[]
}

export interface CrossEraGuildMember {
  userId: string
  username: string
  era: Era
  joinedAt: Date
  role: 'leader' | 'officer' | 'member'
  contribution: number
}

export interface GuildPerk {
  id: string
  name: string
  description: string
  requirement: 'level' | 'treasury' | 'members' | 'eras'
  requirementValue: number
  bonusType: 'xp' | 'currency' | 'spell' | 'ability'
  bonusValue: number
  unlocked: boolean
}

export interface EraMarketplace {
  era: Era
  itemListings: MarketplaceListing[]
  priceHistory: PriceRecord[]
  tradingVolume: number
}

export interface MarketplaceListing {
  id: string
  sellerId: string
  sellerEra: Era
  itemId: string
  itemName: string
  price: number
  quantity: number
  timestamp: Date
  active: boolean
}

export interface PriceRecord {
  itemId: string
  era: Era
  avgPrice: number
  timestamp: Date
  trend: 'up' | 'down' | 'stable'
}

export interface CrossEraTrade {
  id: string
  initiator: CrossEraPlayer
  recipient: CrossEraPlayer
  offeredItems: TradeItem[]
  requestedItems: TradeItem[]
  status: 'pending' | 'accepted' | 'completed' | 'cancelled'
  timestamp: Date
}

export interface TradeItem {
  id: string
  name: string
  quantity: number
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
}

// ========================================
// CROSS-ERA GUILD SYSTEM
// ========================================

export const GUILD_PERKS: GuildPerk[] = [
  {
    id: 'perk_xp_boost',
    name: 'Shared Knowledge',
    description: '+5% XP gain for all members across eras',
    requirement: 'members',
    requirementValue: 10,
    bonusType: 'xp',
    bonusValue: 1.05,
    unlocked: false,
  },
  {
    id: 'perk_currency_boost',
    name: 'Guild Treasury',
    description: '+3% currency rewards',
    requirement: 'treasury',
    requirementValue: 5000,
    bonusType: 'currency',
    bonusValue: 1.03,
    unlocked: false,
  },
  {
    id: 'perk_exclusive_spell',
    name: 'Guild Signature Spell',
    description: 'Unlock exclusive spell available only to members',
    requirement: 'eras',
    requirementValue: 3,
    bonusType: 'spell',
    bonusValue: 1,
    unlocked: false,
  },
  {
    id: 'perk_weekly_raid',
    name: 'Weekly Raid Access',
    description: 'Access to cross-era raid dungeons',
    requirement: 'level',
    requirementValue: 30,
    bonusType: 'ability',
    bonusValue: 1,
    unlocked: false,
  },
  {
    id: 'perk_ancient_vault',
    name: 'Ancient Vault Access',
    description: 'Legendary items exclusive to guild members',
    requirement: 'treasury',
    requirementValue: 20000,
    bonusType: 'ability',
    bonusValue: 1,
    unlocked: false,
  },
]

// ========================================
// CROSS-ERA TRADING SYSTEM
// ========================================

export const TRADEABLE_ITEMS = {
  founders: [
    'Enchanted Marble',
    'Ancient Blueprint',
    'Founder\'s Token',
    'Architectural Shard',
    'Wisdom Stone',
  ],
  marauders: [
    'Animagus Essence',
    'Moonstone Powder',
    'Secret Map Fragment',
    'Marauder\'s Note',
    'Transformation Crystal',
  ],
  potter: [
    'Prophecy Fragment',
    'Horcrux Remnant',
    'Phoenix Feather',
    'Dark Artifact Piece',
    'Prophecy Scroll',
  ],
  newgen: [
    'Legacy Token',
    'Ancestral Ring',
    'Next-Gen Spell Tome',
    'Inheritance Proof',
    'Modern Artifact',
  ],
  rational: [
    'Research Paper',
    'Optimized Spell Formula',
    'Theoretical Breakthrough',
    'Alchemical Catalyst',
    'Scientific Discovery',
  ],
}

// ========================================
// CROSS-ERA MATCHMAKING
// ========================================

export interface MatchmakingRule {
  type: 'level_based' | 'era_pure' | 'legacy_match' | 'challenge_mode'
  description: string
  eraRestriction: Era[] | 'any'
  levelRange: { min: number; max: number }
  bonusMultiplier: number
}

export const MATCHMAKING_RULES: MatchmakingRule[] = [
  {
    type: 'era_pure',
    description: 'Play only with players from your era',
    eraRestriction: 'any',
    levelRange: { min: 0, max: 100 },
    bonusMultiplier: 1.0,
  },
  {
    type: 'level_based',
    description: 'Play with players within 5 levels',
    eraRestriction: 'any',
    levelRange: { min: 0, max: 100 },
    bonusMultiplier: 1.1,
  },
  {
    type: 'legacy_match',
    description: 'Play with other legacy holders (New Gen only)',
    eraRestriction: ['newgen'],
    levelRange: { min: 20, max: 100 },
    bonusMultiplier: 1.15,
  },
  {
    type: 'challenge_mode',
    description: 'Face players from completely different eras',
    eraRestriction: 'any',
    levelRange: { min: 40, max: 100 },
    bonusMultiplier: 1.3,
  },
]

// ========================================
// CROSS-ERA EVENTS & ACTIVITIES
// ========================================

export interface CrossEraEvent {
  id: string
  name: string
  description: string
  eras: Era[]
  duration: { start: Date; end: Date }
  rewards: EventReward
  participants: string[]
  status: 'upcoming' | 'active' | 'completed'
}

export interface EventReward {
  xp: number
  currency: number
  items: string[]
  exclusiveTitle: string
}

export const CROSS_ERA_EVENTS: CrossEraEvent[] = [
  {
    id: 'event_convergence',
    name: 'The Era Convergence',
    description: 'All eras merge temporarily for massive collaborative quest',
    eras: ['founders', 'marauders', 'potter', 'newgen', 'rational'],
    duration: {
      start: new Date('2024-06-01'),
      end: new Date('2024-06-07'),
    },
    rewards: {
      xp: 10000,
      currency: 2000,
      items: ['Convergence Token', 'Cross-Era Robe'],
      exclusiveTitle: 'Timeline Traveler',
    },
    participants: [],
    status: 'upcoming',
  },
  {
    id: 'event_legacy_clash',
    description: 'Legacy holders compete across eras for ultimate prize',
    name: 'Legacy Clash Tournament',
    eras: ['newgen', 'potter', 'marauders'],
    duration: {
      start: new Date('2024-06-15'),
      end: new Date('2024-06-22'),
    },
    rewards: {
      xp: 15000,
      currency: 3000,
      items: ['Champion\'s Sash', 'Legacy Crown'],
      exclusiveTitle: 'Champion of Ages',
    },
    participants: [],
    status: 'upcoming',
  },
  {
    id: 'event_research_symposium',
    name: 'Grand Research Symposium',
    description: 'Rational era leads knowledge sharing across all timelines',
    eras: ['rational', 'potter', 'founders'],
    duration: {
      start: new Date('2024-07-01'),
      end: new Date('2024-07-14'),
    },
    rewards: {
      xp: 8000,
      currency: 1500,
      items: ['Knowledge Tome', 'Research Catalyst'],
      exclusiveTitle: 'Scholar of Ages',
    },
    participants: [],
    status: 'upcoming',
  },
]

// ========================================
// CROSS-ERA DUNGEON RAIDS
// ========================================

export interface CrossEraDungeon {
  id: string
  name: string
  description: string
  minLevel: number
  requiredEras: number
  difficulty: 'normal' | 'hard' | 'legendary'
  rewards: DungeonReward
  bosses: DungeonBoss[]
}

export interface DungeonReward {
  xp: number
  currency: number
  rareLoot: string[]
  allPlayersBonus: number
}

export interface DungeonBoss {
  name: string
  era: Era
  health: number
  attacks: string[]
  phase2Trigger: number
  specialMechanic: string
}

export const CROSS_ERA_DUNGEONS: CrossEraDungeon[] = [
  {
    id: 'dungeon_shadow_realm',
    name: 'Shadow Realm Convergence',
    description: 'A dark dimension where all eras collide',
    minLevel: 35,
    requiredEras: 2,
    difficulty: 'hard',
    rewards: {
      xp: 12000,
      currency: 2000,
      rareLoot: ['Shadow Cloak', 'Convergence Crystal'],
      allPlayersBonus: 0.1,
    },
    bosses: [
      {
        name: 'Chaos Amalgam',
        era: 'rational',
        health: 5000,
        attacks: ['Dark Blast', 'Temporal Rupture', 'Reality Fracture'],
        phase2Trigger: 2500,
        specialMechanic: 'Requires coordinated spell casting across eras',
      },
    ],
  },
  {
    id: 'dungeon_temporal_vortex',
    name: 'Temporal Vortex',
    description: 'Navigate through fragmented timelines',
    minLevel: 40,
    requiredEras: 3,
    difficulty: 'legendary',
    rewards: {
      xp: 20000,
      currency: 4000,
      rareLoot: ['Time Stone', 'Eternal Artifact', 'Prophecy Key'],
      allPlayersBonus: 0.25,
    },
    bosses: [
      {
        name: 'Chrono Guardian',
        era: 'founders',
        health: 8000,
        attacks: ['Time Freeze', 'Age Reversal', 'Paradox Strike'],
        phase2Trigger: 4000,
        specialMechanic: 'Boss gains strength with each era represented',
      },
    ],
  },
]

// ========================================
// HELPER FUNCTIONS
// ========================================

export function canTradeAcrossEras(era1: Era, era2: Era): boolean {
  const incompatibilities: Record<Era, Era[]> = {
    rational: [], // Can trade with anyone
    founders: ['rational'], // Founders avoid modern era
    marauders: ['newgen'], // Past avoids future
    potter: [],
    newgen: ['marauders', 'founders'], // New gen avoids too far past
  }

  return !incompatibilities[era1]?.includes(era2)
}

export function getEraMatchmakingBonus(era1: Era, era2: Era): number {
  const eraDistances: Record<string, number> = {
    'founders-marauders': 0.9,
    'marauders-potter': 0.95,
    'potter-newgen': 1.0,
    'newgen-rational': 1.1,
    'founders-rational': 1.2, // Very different eras = bonus
  }

  const key = [era1, era2].sort().join('-')
  return eraDistances[key] || 1.0
}

export function getAvailableGuildPerks(
  guildData: Partial<CrossEraGuild>
): GuildPerk[] {
  return GUILD_PERKS.filter((perk) => {
    switch (perk.requirement) {
      case 'members':
        return (guildData.members?.length || 0) >= perk.requirementValue
      case 'treasury':
        return (guildData.treasury || 0) >= perk.requirementValue
      case 'eras':
        return (guildData.eras?.size || 0) >= perk.requirementValue
      case 'level':
        return true // TODO: implement level check
      default:
        return false
    }
  })
}

export function getEraTradeableItems(era: Era): string[] {
  return TRADEABLE_ITEMS[era] || []
}
