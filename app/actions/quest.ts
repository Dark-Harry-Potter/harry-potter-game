'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { questProgress } from '@/lib/db/schema'
import { headers } from 'next/headers'
import { eq, and } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function startQuest(
  characterId: string,
  questId: string
) {
  const userId = await getUserId()

  const newQuestProgress = {
    id: uuidv4(),
    userId,
    characterId,
    questId,
    status: 'in_progress',
    progress: JSON.stringify({}),
    completed_at: null,
    created_at: new Date(),
  }

  await db.insert(questProgress).values(newQuestProgress as any)
  return newQuestProgress
}

export async function completeQuest(
  characterId: string,
  questId: string
) {
  const userId = await getUserId()

  const existingQuest = await db
    .select()
    .from(questProgress)
    .where(
      and(
        eq(questProgress.userId, userId),
        eq(questProgress.characterId, characterId),
        eq(questProgress.questId, questId)
      )
    )
    .limit(1)

  if (existingQuest[0]) {
    await db
      .update(questProgress)
      .set({
        status: 'completed',
        completed_at: new Date(),
      })
      .where(eq(questProgress.id, existingQuest[0].id))

    return existingQuest[0]
  }

  return null
}

export async function getCharacterQuests(characterId: string) {
  const userId = await getUserId()

  const quests = await db
    .select()
    .from(questProgress)
    .where(
      and(
        eq(questProgress.userId, userId),
        eq(questProgress.characterId, characterId)
      )
    )

  return quests
}

export async function updateQuestProgress(
  characterId: string,
  questId: string,
  progressData: any
) {
  const userId = await getUserId()

  const existingQuest = await db
    .select()
    .from(questProgress)
    .where(
      and(
        eq(questProgress.userId, userId),
        eq(questProgress.characterId, characterId),
        eq(questProgress.questId, questId)
      )
    )
    .limit(1)

  if (existingQuest[0]) {
    await db
      .update(questProgress)
      .set({
        progress: JSON.stringify(progressData),
      })
      .where(eq(questProgress.id, existingQuest[0].id))

    return existingQuest[0]
  }

  return null
}
