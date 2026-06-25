'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ALL_ERAS, Era, getEraDescription, getEraMechanic } from '@/lib/era-lore-v5'
import { useRouter } from 'next/navigation'

interface EraSelectionScreenProps {
  characterId: string
  onEraSelected: (era: Era) => void
}

export default function EraSelectionScreen({
  characterId,
  onEraSelected,
}: EraSelectionScreenProps) {
  const router = useRouter()
  const [selectedEra, setSelectedEra] = useState<Era | null>(null)
  const [hoveredEra, setHoveredEra] = useState<Era | null>(null)

  const eras: Era[] = ['founders', 'marauders', 'potter', 'newgen', 'rational']

  const eraColors: Record<Era, { bg: string; border: string; glow: string }> = {
    founders: {
      bg: 'from-amber-900 to-yellow-800',
      border: 'border-yellow-600',
      glow: 'shadow-[0_0_30px_rgba(217,119,6,0.5)]',
    },
    marauders: {
      bg: 'from-slate-900 to-slate-700',
      border: 'border-slate-500',
      glow: 'shadow-[0_0_30px_rgba(148,163,184,0.5)]',
    },
    potter: {
      bg: 'from-red-900 to-rose-800',
      border: 'border-red-600',
      glow: 'shadow-[0_0_30px_rgba(220,38,38,0.5)]',
    },
    newgen: {
      bg: 'from-blue-900 to-indigo-800',
      border: 'border-blue-600',
      glow: 'shadow-[0_0_30px_rgba(37,99,235,0.5)]',
    },
    rational: {
      bg: 'from-purple-900 to-violet-800',
      border: 'border-purple-600',
      glow: 'shadow-[0_0_30px_rgba(126,34,206,0.5)]',
    },
  }

  const eraIcons: Record<Era, string> = {
    founders: '⚔️',
    marauders: '🗺️',
    potter: '📖',
    newgen: '✨',
    rational: '🔬',
  }

  const eraYears: Record<Era, string> = {
    founders: '~1000 CE',
    marauders: '1970s',
    potter: '1990s-2000s',
    newgen: '2010s',
    rational: 'Alternate Timeline',
  }

  const handleEraSelect = (era: Era) => {
    setSelectedEra(era)
    setTimeout(() => {
      onEraSelected(era)
      router.push(`/game?era=${era}&character=${characterId}`)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml')] opacity-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-bold text-white mb-4 text-glow">
          Choose Your Era
        </h1>
        <p className="text-xl text-gray-300">
          Step into a moment in the wizarding world and forge your destiny
        </p>
      </motion.div>

      {/* Era Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl w-full mb-8">
        {eras.map((era, index) => {
          const eraData = ALL_ERAS[era]
          const colors = eraColors[era]
          const isSelected = selectedEra === era
          const isHovered = hoveredEra === era

          return (
            <motion.div
              key={era}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredEra(era)}
              onHoverEnd={() => setHoveredEra(null)}
              onClick={() => handleEraSelect(era)}
              className={`cursor-pointer relative group`}
            >
              <div
                className={`
                  relative p-6 rounded-lg border-2 transition-all duration-300
                  ${colors.border} ${colors.glow}
                  ${isSelected ? 'scale-105 ' + colors.glow : ''}
                  ${isHovered ? 'scale-105 ' + colors.glow : 'scale-100'}
                  bg-gradient-to-br ${colors.bg}
                  hover:shadow-lg transform
                `}
              >
                {/* Selected indicator */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-white"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Icon */}
                <div className="text-5xl mb-4 text-center">{eraIcons[era]}</div>

                {/* Era Name */}
                <h2 className="text-2xl font-bold text-white mb-2 text-center">
                  {eraData.name}
                </h2>

                {/* Era Year */}
                <p className="text-sm text-gray-200 text-center mb-4">
                  {eraYears[era]}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent mb-4" />

                {/* Description (hidden until hover) */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    height: isHovered ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-gray-100 mb-3 leading-relaxed">
                    {eraData.description}
                  </p>

                  <div className="bg-black bg-opacity-50 p-2 rounded mb-3">
                    <p className="text-xs text-gray-300">
                      <span className="font-bold text-yellow-300">Unique Mechanic:</span>
                    </p>
                    <p className="text-xs text-gray-200 mt-1">{getEraMechanic(era as Era)}</p>
                  </div>
                </motion.div>

                {/* Click to select */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center text-sm font-bold text-yellow-300 mt-2"
                >
                  Click to Select
                </motion.div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent
                      opacity-0 group-hover:opacity-30 transition-opacity duration-500
                      -translate-x-full group-hover:translate-x-full
                    `}
                    style={{ transitionDuration: '1s' }}
                  />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Selected Era Details Panel */}
      {selectedEra && (
        <motion.div
          className="max-w-2xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-purple-500 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              Entering {ALL_ERAS[selectedEra].name}
            </h3>
            <p className="text-gray-200 mb-4">
              {ALL_ERAS[selectedEra].description}
            </p>
            <div className="flex items-start gap-2 bg-black bg-opacity-30 p-4 rounded">
              <span className="text-yellow-300 font-bold">⚡</span>
              <p className="text-gray-200 text-sm">
                Your choices in this era will shape your entire game experience. Each era features
                unique quests, NPCs, locations, and progression mechanics specific to its time period.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Footer Info */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 text-center text-gray-500 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p>
          You can change eras later by creating a new character, but your current choice will be permanent
          for this playthrough.
        </p>
      </motion.div>
    </div>
  )
}
