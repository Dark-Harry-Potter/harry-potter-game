'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { playerCharacter } from '@/lib/db/schema'
import { headers } from 'next/headers'
import { eq, and } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function createPlayerCharacter(characterData: {
  characterName: string
  house: string
  pet?: string
  petName?: string
  wand?: any
}) {
  const userId = await getUserId()

  const newCharacter = {
    id: uuidv4(),
    userId,
    characterName: characterData.characterName,
    house: characterData.house,
    pet: characterData.pet,
    petName: characterData.petName,
    wand: characterData.wand ? JSON.stringify(characterData.wand) : null,
    year: 1,
    house_points: 0,
    experience: 0,
    level: 1,
    health: 100,
    mana: 100,
    sorting_points: JSON.stringify({
      bravery: 0,
      cunning: 0,
      loyalty: 0,
      wisdom: 0,
    }),
    created_at: new Date(),
    updated_at: new Date(),
  }

  await db.insert(playerCharacter).values(newCharacter as any)
  return newCharacter
}

export async function getPlayerCharacter() {
  const userId = await getUserId()
  const result = await db
    .select()
    .from(playerCharacter)
    .where(eq(playerCharacter.userId, userId))
    .limit(1)

  return result[0] || null
}

export async function updateCharacterStats(data: {
  health?: number
  mana?: number
  house_points?: number
  experience?: number
  level?: number
}) {
  const userId = await getUserId()
  const char = await getPlayerCharacter()
  if (!char) throw new Error('Character not found')

  await db
    .update(playerCharacter)
    .set({
      health: data.health ?? char.health,
      mana: data.mana ?? char.mana,
      house_points: data.house_points ?? char.house_points,
      experience: data.experience ?? char.experience,
      level: data.level ?? char.level,
      updated_at: new Date(),
    })
    .where(and(eq(playerCharacter.id, char.id), eq(playerCharacter.userId, userId)))

  return getPlayerCharacter()
}
