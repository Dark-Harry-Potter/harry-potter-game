'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useMultiplayerStore } from '@/lib/websocket-client'

interface PlayerProfileProps {
  userId: string
  characterName: string
  level: number
  experience: number
  house: string
  housePoints: number
  totalPlayTime: number
  achievements: number
  friends: number
  guild?: string
}

export function PlayerProfile({
  userId,
  characterName,
  level,
  experience,
  house,
  housePoints,
  totalPlayTime,
  achievements,
  friends,
  guild,
}: PlayerProfileProps) {
  const { socket, isConnected } = useMultiplayerStore()
  const [showFriendsModal, setShowFriendsModal] = useState(false)
  const [copiedId, setCopiedId] = useState(false)

  const handleAddFriend = () => {
    if (socket && isConnected) {
      socket.emit('friend:request', { targetUserId: userId })
    }
  }

  const handleCopyUserId = () => {
    navigator.clipboard.writeText(userId)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  const houseColors: Record<string, string> = {
    gryffindor: 'from-red-600 to-red-800',
    slytherin: 'from-green-600 to-green-800',
    hufflepuff: 'from-yellow-600 to-yellow-800',
    ravenclaw: 'from-blue-600 to-blue-800',
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg border border-gray-700">
      {/* Header */}
      <div
        className={`bg-gradient-to-r ${houseColors[house] || 'from-purple-600 to-purple-800'} p-6 rounded-lg mb-6`}
      >
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{characterName}</h1>
            <p className="text-gray-100 capitalize text-lg">{house} - Level {level}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{housePoints}</div>
            <p className="text-gray-100">House Points</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Experience</p>
          <p className="text-white font-bold text-lg">{experience.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Play Time</p>
          <p className="text-white font-bold text-lg">{Math.floor(totalPlayTime / 3600)}h</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Achievements</p>
          <p className="text-white font-bold text-lg">{achievements}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Friends</p>
          <p className="text-white font-bold text-lg">{friends}</p>
        </div>
      </div>

      {/* Guild Info */}
      {guild && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6">
          <p className="text-gray-400 text-sm mb-2">Guild</p>
          <p className="text-white font-bold text-lg">{guild}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 justify-center">
        <Button
          onClick={handleAddFriend}
          className="bg-purple-600 hover:bg-purple-700 text-white"
          disabled={!isConnected}
        >
          Add Friend
        </Button>
        <Button
          onClick={handleCopyUserId}
          className="bg-gray-700 hover:bg-gray-600 text-white"
        >
          {copiedId ? 'Copied!' : 'Copy User ID'}
        </Button>
      </div>
    </div>
  )
}
