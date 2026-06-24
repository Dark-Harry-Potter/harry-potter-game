'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useMultiplayerStore } from '@/lib/websocket-client'

interface DuelPlayer {
  id: string
  name: string
  level: number
  house: string
  health: number
  maxHealth: number
  mana: number
  maxMana: number
}

interface DuelingMatch {
  id: string
  challenger: DuelPlayer
  opponent: DuelPlayer
  status: 'waiting' | 'active' | 'completed'
  currentRound: number
  totalRounds: number
  winner?: string
  wager: number
  startTime: Date
}

interface DuelingArenaProps {
  playerCharacterId: string
  playerName: string
  playerLevel: number
  playerHouse: string
}

export function DuelingArena({
  playerCharacterId,
  playerName,
  playerLevel,
  playerHouse,
}: DuelingArenaProps) {
  const { socket, isConnected, getOnlinePlayers } = useMultiplayerStore()
  const [currentMatch, setCurrentMatch] = useState<DuelingMatch | null>(null)
  const [showChallengeList, setShowChallengeList] = useState(false)
  const [selectedOpponent, setSelectedOpponent] = useState<DuelPlayer | null>(null)
  const [wager, setWager] = useState(0)
  const [matchLog, setMatchLog] = useState<string[]>([])

  useEffect(() => {
    if (!socket || !isConnected) return

    socket.on('duel:invited', (data) => {
      const match: DuelingMatch = {
        id: data.matchId,
        challenger: data.challenger,
        opponent: data.opponent,
        status: 'waiting',
        currentRound: 1,
        totalRounds: 3,
        wager: data.wager,
        startTime: new Date(),
      }
      setCurrentMatch(match)
    })

    socket.on('duel:started', () => {
      if (currentMatch) {
        setCurrentMatch({ ...currentMatch, status: 'active' })
        setMatchLog(['Duel started!'])
      }
    })

    socket.on('duel:opponent:spell', (data) => {
      handleOpponentSpell(data.spellId, data.power)
    })

    socket.on('duel:round:end', (data) => {
      if (currentMatch) {
        setCurrentMatch({
          ...currentMatch,
          currentRound: currentMatch.currentRound + 1,
        })
      }
    })

    socket.on('duel:ended', (data) => {
      if (currentMatch) {
        setCurrentMatch({ ...currentMatch, status: 'completed', winner: data.winner })
        setMatchLog((prev) => [...prev, `${data.winner} wins the duel!`])
      }
    })

    return () => {
      socket.off('duel:invited')
      socket.off('duel:started')
      socket.off('duel:opponent:spell')
      socket.off('duel:round:end')
      socket.off('duel:ended')
    }
  }, [socket, isConnected, currentMatch])

  const handleChallenge = (opponent: DuelPlayer) => {
    setSelectedOpponent(opponent)
  }

  const handleAcceptChallenge = () => {
    if (!selectedOpponent || !socket || !isConnected) return

    socket.emit('duel:accept', {
      opponentId: selectedOpponent.id,
      wager,
    })

    setSelectedOpponent(null)
    setShowChallengeList(false)
  }

  const handleCastSpell = (spellId: string, power: number) => {
    if (!socket || !isConnected || !currentMatch) return

    socket.emit('duel:spell', {
      duelId: currentMatch.id,
      spellId,
      power,
    })

    setMatchLog((prev) => [
      ...prev,
      `${playerName} cast ${spellId} with power ${power}!`,
    ])
  }

  const handleOpponentSpell = (spellId: string, power: number) => {
    if (!currentMatch) return

    // Reduce opponent health
    const damage = power * (Math.random() * 0.5 + 0.75) // 75-125% of power
    const newHealth = Math.max(0, currentMatch.opponent.health - damage)

    setCurrentMatch({
      ...currentMatch,
      opponent: {
        ...currentMatch.opponent,
        health: newHealth,
      },
    })

    setMatchLog((prev) => [
      ...prev,
      `${currentMatch.opponent.name} cast ${spellId}! Dealt ${Math.round(damage)} damage!`,
    ])
  }

  const houseColors: Record<string, string> = {
    gryffindor: 'from-red-600 to-red-800',
    slytherin: 'from-green-600 to-green-800',
    hufflepuff: 'from-yellow-600 to-yellow-800',
    ravenclaw: 'from-blue-600 to-blue-800',
  }

  if (!currentMatch) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6">Dueling Arena</h2>

        <div className="flex gap-3 mb-6">
          <Button
            onClick={() => setShowChallengeList(true)}
            className="bg-red-600 hover:bg-red-700 text-white flex-1"
            disabled={!isConnected}
          >
            Challenge Player
          </Button>
          <Button
            onClick={() => setShowChallengeList(false)}
            className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
            disabled={!isConnected}
          >
            View Rankings
          </Button>
        </div>

        {showChallengeList && (
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Available Players</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getOnlinePlayers()
                .filter((p) => p.characterId !== playerCharacterId)
                .map((player) => (
                  <div
                    key={player.characterId}
                    className="flex justify-between items-center p-3 bg-gray-700 rounded"
                  >
                    <div>
                      <p className="text-white font-semibold">{player.characterName}</p>
                      <p className="text-gray-400 text-sm">
                        Level {player.level} • {player.house}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleChallenge(player)}
                      className="bg-red-600 hover:bg-red-700"
                      size="sm"
                    >
                      Challenge
                    </Button>
                  </div>
                ))}
            </div>

            {selectedOpponent && (
              <div className="mt-4 p-4 bg-gray-900 rounded border border-gray-600">
                <h4 className="text-white font-bold mb-3">Challenge {selectedOpponent.name}</h4>
                <div className="mb-4">
                  <label className="text-gray-300 text-sm">Wager (Currency):</label>
                  <input
                    type="number"
                    min="0"
                    value={wager}
                    onChange={(e) => setWager(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 mt-1"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleAcceptChallenge}
                    className="bg-green-600 hover:bg-green-700 flex-1"
                  >
                    Send Challenge
                  </Button>
                  <Button
                    onClick={() => setSelectedOpponent(null)}
                    className="bg-gray-600 hover:bg-gray-500 flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-900 rounded-lg border border-gray-700">
      {/* Match Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Round {currentMatch.currentRound}/{currentMatch.totalRounds}
        </h2>
        <p className="text-gray-400">Wager: {currentMatch.wager} Currency</p>
      </div>

      {/* Player Stats */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Player 1 */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">{currentMatch.challenger.name}</h3>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Health</span>
                <span className="text-white">{Math.round(currentMatch.challenger.health)}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-red-600 h-4 rounded-full transition-all"
                  style={{
                    width: `${(currentMatch.challenger.health / currentMatch.challenger.maxHealth) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Mana</span>
                <span className="text-white">{Math.round(currentMatch.challenger.mana)}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all"
                  style={{
                    width: `${(currentMatch.challenger.mana / currentMatch.challenger.maxMana) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Player 2 */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">{currentMatch.opponent.name}</h3>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Health</span>
                <span className="text-white">{Math.round(currentMatch.opponent.health)}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-red-600 h-4 rounded-full transition-all"
                  style={{
                    width: `${(currentMatch.opponent.health / currentMatch.opponent.maxHealth) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Mana</span>
                <span className="text-white">{Math.round(currentMatch.opponent.mana)}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all"
                  style={{
                    width: `${(currentMatch.opponent.mana / currentMatch.opponent.maxMana) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Battle Log */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6 max-h-40 overflow-y-auto">
        <h4 className="text-white font-bold mb-2">Battle Log</h4>
        <div className="space-y-1">
          {matchLog.map((log, i) => (
            <p key={i} className="text-gray-300 text-sm">
              {log}
            </p>
          ))}
        </div>
      </div>

      {/* Spell Selection */}
      {currentMatch.status === 'active' && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h4 className="text-white font-bold mb-4">Choose Spell</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              onClick={() => handleCastSpell('stupefy', 25)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Stupefy
            </Button>
            <Button
              onClick={() => handleCastSpell('incendio', 35)}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Incendio
            </Button>
            <Button
              onClick={() => handleCastSpell('protego', 30)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Protego
            </Button>
            <Button
              onClick={() => handleCastSpell('expelliarmus', 20)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              Expelliarmus
            </Button>
          </div>
        </div>
      )}

      {/* Match Result */}
      {currentMatch.status === 'completed' && (
        <div className="bg-gray-800 p-6 rounded-lg border border-yellow-600 text-center">
          <h3 className="text-2xl font-bold text-yellow-400 mb-2">Match Complete</h3>
          <p className="text-white text-lg mb-4">
            {currentMatch.winner === playerCharacterId ? 'You Won!' : 'You Lost!'}
          </p>
          <p className="text-gray-300 mb-4">
            Prize: {currentMatch.wager * (currentMatch.winner === playerCharacterId ? 2 : -1)} Currency
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Return to Arena
          </Button>
        </div>
      )}
    </div>
  )
}
