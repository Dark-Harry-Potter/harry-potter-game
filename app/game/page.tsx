'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore, PlayerCharacter } from '@/lib/game-store'
import { GameWorld } from '@/components/game-world'
import { SpellCasting } from '@/components/spell-casting'
import { HOUSES, CREATURES, SPELLS } from '@/lib/game-constants'
import { Button } from '@/components/ui/button'
import { getPlayerCharacter, updateCharacterStats } from '@/app/actions/character'

export default function GamePage() {
  const router = useRouter()
  const { character, learnedSpells, learnSpell } = useGameStore()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'world' | 'spells' | 'quest' | 'stats'>('world')
  const [currentHealth, setCurrentHealth] = useState(100)
  const [currentMana, setCurrentMana] = useState(100)
  const [encounteringCreature, setEncounteringCreature] = useState<string | null>(null)
  const [battleLog, setBattleLog] = useState<string[]>([])

  useEffect(() => {
    const initializeGame = async () => {
      // Check if character exists in database
      try {
        const dbCharacter = await getPlayerCharacter()
        if (!dbCharacter && !character) {
          router.push('/character-creation')
          return
        }
        if (!learnedSpells.includes('luminous')) {
          learnSpell('luminous')
        }
      } catch (error) {
        console.error('Failed to load character:', error)
      }
      setLoading(false)
    }

    initializeGame()
  }, [character, learnedSpells, learnSpell, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-4">Loading...</div>
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto" />
        </div>
      </div>
    )
  }

  if (!character) {
    return null
  }

  const houseData = Object.values(HOUSES).find((h) => h.id === character.house)
  const healthPercent = (currentHealth / 100) * 100
  const manaPercent = (currentMana / 100) * 100

  const handleSpellCast = (spellId: string) => {
    if (encounteringCreature) {
      const creature = CREATURES.find((c) => c.id === encounteringCreature)
      if (creature) {
        const damage = Math.floor(Math.random() * 20) + 10
        const newCreatureHealth = Math.max(0, 100 - damage)

        setBattleLog((prev) => [
          ...prev,
          `${SPELLS.find((s) => s.id === spellId)?.name} hits ${creature.name} for ${damage} damage!`,
        ])

        if (newCreatureHealth <= 0) {
          setBattleLog((prev) => [...prev, `${creature.name} defeated! ⭐`])
          setEncounteringCreature(null)
          setTimeout(() => {
            setEncounteringCreature(null)
            setBattleLog([])
          }, 3000)
        }
      }
    }
  }

  const startEncounter = (creatureId: string) => {
    setEncounteringCreature(creatureId)
    setBattleLog([`${CREATURES.find((c) => c.id === creatureId)?.name} appeared!`])
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header with Character Info */}
      <div className={`bg-gradient-to-r ${houseData?.color} border-b-2 border-purple-500 p-4`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-3xl">{houseData?.emblem}</div>
            <div>
              <h1 className="text-2xl font-bold">{character.characterName}</h1>
              <p className="text-sm text-gray-200">
                {houseData?.name} • Year {character.year}
              </p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-xs text-gray-300">Level</p>
              <p className="text-2xl font-bold">{character.level}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-300">House Points</p>
              <p className="text-2xl font-bold text-yellow-300">{character.house_points}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Health and Mana Bars */}
      <div className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Health</span>
              <span className="text-sm text-red-400">{currentHealth}/100</span>
            </div>
            <div className="h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <div
                className="h-full bg-red-500 transition-all"
                style={{ width: `${healthPercent}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Mana</span>
              <span className="text-sm text-blue-400">{currentMana}/100</span>
            </div>
            <div className="h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${manaPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* Left - 3D World or Main Content */}
        <div className="flex-1 rounded-lg border border-gray-700 bg-gray-900 overflow-hidden">
          {activeTab === 'world' && <GameWorld />}
          {activeTab === 'spells' && (
            <div className="p-6 overflow-auto h-full">
              <SpellCasting
                learnedSpells={learnedSpells}
                onSpellCast={handleSpellCast}
                disabled={!encounteringCreature}
              />
            </div>
          )}
          {activeTab === 'quest' && (
            <div className="p-6 overflow-auto h-full">
              <h2 className="text-2xl font-bold mb-4">Active Quest</h2>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <p className="text-gray-400 mb-4">
                  Learn your first spell and encounter creatures to test your powers!
                </p>
                <div className="space-y-2">
                  {CREATURES.slice(0, 3).map((creature) => (
                    <button
                      key={creature.id}
                      onClick={() => startEncounter(creature.id)}
                      className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded text-left transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span>
                          {creature.icon} {creature.name}
                        </span>
                        <span className="text-sm text-gray-400">Difficulty: {creature.difficulty}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'stats' && (
            <div className="p-6 overflow-auto h-full">
              <h2 className="text-2xl font-bold mb-6">Character Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Experience</p>
                  <p className="text-2xl font-bold">{character.experience}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Pet</p>
                  <p className="text-xl font-bold">{character.petName}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right - Battle Log and Controls */}
        <div className="w-64 flex flex-col gap-4">
          {/* Battle Log */}
          <div className="flex-1 border border-gray-700 rounded-lg bg-gray-900 p-4 overflow-auto">
            <h3 className="font-bold mb-3 text-sm">
              {encounteringCreature ? '⚔️ Battle Log' : '📜 Info'}
            </h3>
            <div className="space-y-2 text-sm">
              {battleLog.length > 0 ? (
                battleLog.map((log, i) => (
                  <div key={i} className="text-gray-300">
                    {log}
                  </div>
                ))
              ) : (
                <div className="text-gray-500">
                  {encounteringCreature
                    ? 'Battle started!'
                    : 'Ready for adventure. Select a tab to begin!'}
                </div>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => setActiveTab('world')}
              variant={activeTab === 'world' ? 'default' : 'outline'}
              className="w-full"
            >
              🌍 World
            </Button>
            <Button
              onClick={() => setActiveTab('spells')}
              variant={activeTab === 'spells' ? 'default' : 'outline'}
              className="w-full"
            >
              ✨ Spells
            </Button>
            <Button
              onClick={() => setActiveTab('quest')}
              variant={activeTab === 'quest' ? 'default' : 'outline'}
              className="w-full"
            >
              📋 Quest
            </Button>
            <Button
              onClick={() => setActiveTab('stats')}
              variant={activeTab === 'stats' ? 'default' : 'outline'}
              className="w-full"
            >
              📊 Stats
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
