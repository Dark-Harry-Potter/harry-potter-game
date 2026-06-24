import { pgTable, text, timestamp, boolean, integer, json } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------
// Add your app tables below. Always include a plain `userId` column so queries
// can be scoped per user — the security model depends on this column existing,
// not on a foreign key. Do NOT add a foreign key constraint
// (`.references(() => user.id, ...)`) unless the user explicitly asks for
// foreign keys or referential integrity; FK constraints make iterating on the
// schema harder.
//
// Example:
//
// import { serial } from "drizzle-orm/pg-core"
//
// export const todos = pgTable("todos", {
//   id: serial("id").primaryKey(),
//   userId: text("userId").notNull(),
//   title: text("title").notNull(),
//   completed: boolean("completed").notNull().default(false),
//   createdAt: timestamp("createdAt").notNull().defaultNow(),
// })
//
// If the user asks for foreign keys, add the reference back in:
//   userId: text("userId")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),

// --- Harry Potter Game Tables ---------------------------------------------

export const playerCharacter = pgTable('playerCharacter', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  characterName: text('characterName').notNull(),
  house: text('house').notNull(), // 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw'
  pet: text('pet'), // 'owl' | 'cat' | 'toad' | 'rat'
  petName: text('petName'),
  wand: text('wand'), // JSON: { core, wood, length }
  year: integer('year').default(1), // 1-5 for game scope
  house_points: integer('house_points').default(0),
  experience: integer('experience').default(0),
  level: integer('level').default(1),
  health: integer('health').default(100),
  mana: integer('mana').default(100),
  sorting_points: json('sorting_points').default({ bravery: 0, cunning: 0, loyalty: 0, wisdom: 0 }),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
})

export const questProgress = pgTable('questProgress', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  characterId: text('characterId').notNull(),
  questId: text('questId').notNull(),
  status: text('status').default('available'), // 'available' | 'in_progress' | 'completed'
  progress: json('progress').default({}), // Custom quest state
  completed_at: timestamp('completed_at'),
  created_at: timestamp('created_at').notNull().defaultNow(),
})

export const spellLearned = pgTable('spellLearned', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  characterId: text('characterId').notNull(),
  spellId: text('spellId').notNull(),
  proficiency: integer('proficiency').default(1), // 1-5 mastery level
  learned_at: timestamp('learned_at').notNull().defaultNow(),
})

export const creatureEncounter = pgTable('creatureEncounter', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  characterId: text('characterId').notNull(),
  creatureId: text('creatureId').notNull(),
  encountered_at: timestamp('encountered_at').notNull().defaultNow(),
  defeated: boolean('defeated').default(false),
})

export const locationVisited = pgTable('locationVisited', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  characterId: text('characterId').notNull(),
  locationId: text('locationId').notNull(),
  first_visited: timestamp('first_visited').notNull().defaultNow(),
  last_visited: timestamp('last_visited').notNull().defaultNow(),
  visit_count: integer('visit_count').default(1),
})

export const playerInventory = pgTable('playerInventory', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  characterId: text('characterId').notNull(),
  itemId: text('itemId').notNull(),
  quantity: integer('quantity').default(1),
  added_at: timestamp('added_at').notNull().defaultNow(),
})
