'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useMultiplayerStore } from '@/lib/websocket-client'

interface Guild {
  id: string
  name: string
  description: string
  leader: string
  level: number
  memberCount: number
  treasury: number
  banner: string
  house?: string
}

interface GuildMember {
  id: string
  name: string
  level: number
  role: 'leader' | 'officer' | 'member'
  joinedAt: Date
  contribution: number
}

interface GuildSystemProps {
  playerGuild?: Guild
  playerRole?: string
  playerContribution?: number
}

export function GuildSystem({ playerGuild, playerRole, playerContribution }: GuildSystemProps) {
  const { socket, isConnected } = useMultiplayerStore()
  const [showCreateGuild, setShowCreateGuild] = useState(false)
  const [showGuildList, setShowGuildList] = useState(false)
  const [guildName, setGuildName] = useState('')
  const [guildDescription, setGuildDescription] = useState('')
  const [members, setMembers] = useState<GuildMember[]>([])

  const handleCreateGuild = async () => {
    if (!guildName.trim() || !socket || !isConnected) return

    socket.emit('guild:create', {
      name: guildName,
      description: guildDescription,
    })

    setGuildName('')
    setGuildDescription('')
    setShowCreateGuild(false)
  }

  const handleJoinGuild = (guildId: string) => {
    if (!socket || !isConnected) return
    socket.emit('guild:join', { guildId })
  }

  const handleLeaveGuild = () => {
    if (!socket || !isConnected) return
    socket.emit('guild:leave')
  }

  const handleKickMember = (memberId: string) => {
    if (!socket || !isConnected || playerRole !== 'leader') return
    socket.emit('guild:kick', { memberId })
  }

  const handlePromoteMember = (memberId: string, newRole: string) => {
    if (!socket || !isConnected || playerRole !== 'leader') return
    socket.emit('guild:promote', { memberId, role: newRole })
  }

  if (!playerGuild) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Guilds</h2>
        <p className="text-gray-400 mb-6">You are not currently in a guild.</p>

        <div className="flex gap-3">
          <Button
            onClick={() => setShowCreateGuild(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
            disabled={!isConnected}
          >
            Create Guild
          </Button>
          <Button
            onClick={() => setShowGuildList(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
            disabled={!isConnected}
          >
            Browse Guilds
          </Button>
        </div>

        {/* Create Guild Modal */}
        {showCreateGuild && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Create New Guild</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Guild Name"
                value={guildName}
                onChange={(e) => setGuildName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 placeholder-gray-500"
                maxLength={50}
              />
              <textarea
                placeholder="Guild Description"
                value={guildDescription}
                onChange={(e) => setGuildDescription(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 placeholder-gray-500"
                rows={4}
                maxLength={200}
              />
              <div className="flex gap-3">
                <Button
                  onClick={handleCreateGuild}
                  className="bg-green-600 hover:bg-green-700 text-white flex-1"
                  disabled={!guildName.trim()}
                >
                  Create
                </Button>
                <Button
                  onClick={() => setShowCreateGuild(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg border border-gray-700">
      {/* Guild Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{playerGuild.name}</h1>
            <p className="text-gray-100 mb-3">{playerGuild.description}</p>
            <p className="text-gray-200 text-sm">
              Level {playerGuild.level} • {playerGuild.memberCount} Members
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{playerGuild.treasury}</div>
            <p className="text-gray-100">Treasury</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Member List */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Members ({members.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {members.length === 0 ? (
                <p className="text-gray-400">Loading members...</p>
              ) : (
                members.map((member) => (
                  <div
                    key={member.id}
                    className="flex justify-between items-center p-3 bg-gray-700 rounded border border-gray-600"
                  >
                    <div>
                      <p className="text-white font-semibold">{member.name}</p>
                      <p className="text-gray-400 text-sm">Level {member.level} • {member.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-400 font-semibold">{member.contribution}</p>
                      {playerRole === 'leader' && member.role !== 'leader' && (
                        <button
                          onClick={() => handleKickMember(member.id)}
                          className="text-red-400 hover:text-red-300 text-sm mt-1"
                        >
                          Kick
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Guild Stats */}
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Your Contribution</p>
            <p className="text-white font-bold text-2xl">{playerContribution || 0}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Your Role</p>
            <p className="text-white font-bold text-lg capitalize">{playerRole}</p>
          </div>
          <Button
            onClick={handleLeaveGuild}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Leave Guild
          </Button>
        </div>
      </div>

      {/* Guild Perks */}
      <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">Guild Perks</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-gray-700 rounded text-center">
            <p className="text-purple-400 font-semibold">+5%</p>
            <p className="text-gray-300 text-sm">Experience Bonus</p>
          </div>
          <div className="p-3 bg-gray-700 rounded text-center">
            <p className="text-green-400 font-semibold">+3%</p>
            <p className="text-gray-300 text-sm">Currency Bonus</p>
          </div>
          <div className="p-3 bg-gray-700 rounded text-center">
            <p className="text-blue-400 font-semibold">x2</p>
            <p className="text-gray-300 text-sm">Quest Rewards</p>
          </div>
          <div className="p-3 bg-gray-700 rounded text-center">
            <p className="text-pink-400 font-semibold">Rare</p>
            <p className="text-gray-300 text-sm">Item Drop Rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}
