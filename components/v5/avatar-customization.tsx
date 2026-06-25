'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AvatarCustomization,
  AVATAR_PRESETS,
  HAIR_STYLES,
  HAIR_COLORS,
  generateRandomAvatar,
} from '@/lib/avatar-system-v5'
import { Button } from '@/components/ui/button'

interface AvatarCustomizationComponentProps {
  onAvatarCreated: (avatar: AvatarCustomization) => void
}

export default function AvatarCustomizationComponent({
  onAvatarCreated,
}: AvatarCustomizationComponentProps) {
  const [currentAvatar, setCurrentAvatar] = useState<AvatarCustomization>(generateRandomAvatar())
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [step, setStep] = useState<'preset' | 'custom'>('preset')

  const hairStyleList = Object.values(HAIR_STYLES).flat()

  const handlePresetSelect = (presetName: string) => {
    const preset = AVATAR_PRESETS.find((p) => p.name === presetName)
    if (preset) {
      setCurrentAvatar(preset.customization)
      setSelectedPreset(presetName)
    }
  }

  const handleCustomizationChange = (field: string, value: any) => {
    setCurrentAvatar((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleConfirm = () => {
    onAvatarCreated(currentAvatar)
  }

  const handleRandomize = () => {
    setCurrentAvatar(generateRandomAvatar())
    setSelectedPreset(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black flex flex-col items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-900 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-900 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Title */}
      <motion.h1
        className="text-5xl font-bold text-white mb-2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Design Your Wizard
      </motion.h1>
      <motion.p
        className="text-gray-300 text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Create your unique magical identity
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {/* Avatar Preview */}
        <motion.div
          className="lg:col-span-1 flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-64 h-96 bg-gradient-to-b from-gray-800 to-black rounded-xl border-2 border-purple-500 shadow-2xl overflow-hidden">
            {/* Avatar Placeholder - 3D representation */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <div className="text-7xl mb-4">
                {currentAvatar.eyeColor === 'violet' ? '👁️‍🗨️' : '🧙'}
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-yellow-300">Hair:</span> {currentAvatar.hairColor}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-yellow-300">Eyes:</span> {currentAvatar.eyeColor}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-yellow-300">Robe:</span> {currentAvatar.robeMaterial}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-yellow-300">Wand:</span> {currentAvatar.wand.wood}
                </p>
              </div>
            </div>

            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30 animate-pulse" />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button
              onClick={handleRandomize}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              🎲 Randomize
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              ✓ Confirm
            </Button>
          </div>
        </motion.div>

        {/* Customization Options */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Step Selector */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setStep('preset')}
              className={`px-4 py-2 rounded font-bold transition-all ${
                step === 'preset'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Quick Presets
            </button>
            <button
              onClick={() => setStep('custom')}
              className={`px-4 py-2 rounded font-bold transition-all ${
                step === 'custom'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Detailed Customization
            </button>
          </div>

          {/* Presets Section */}
          {step === 'preset' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {AVATAR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetSelect(preset.name)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedPreset === preset.name
                      ? 'border-yellow-400 bg-gray-800 shadow-lg shadow-yellow-400/50'
                      : 'border-gray-600 bg-gray-900 hover:border-gray-400'
                  }`}
                >
                  <h3 className="font-bold text-white">{preset.name}</h3>
                  <p className="text-sm text-gray-300 mt-1">{preset.description}</p>
                </button>
              ))}
            </motion.div>
          )}

          {/* Custom Section */}
          {step === 'custom' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 max-h-96 overflow-y-auto pr-4"
            >
              {/* Hair Style */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Hair Style
                </label>
                <select
                  value={currentAvatar.hairStyle}
                  onChange={(e) =>
                    handleCustomizationChange('hairStyle', e.target.value)
                  }
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  {hairStyleList.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hair Color */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Hair Color
                </label>
                <select
                  value={currentAvatar.hairColor}
                  onChange={(e) =>
                    handleCustomizationChange('hairColor', e.target.value)
                  }
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  {HAIR_COLORS.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Eye Color */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Eye Color
                </label>
                <select
                  value={currentAvatar.eyeColor}
                  onChange={(e) =>
                    handleCustomizationChange('eyeColor', e.target.value)
                  }
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  {['blue', 'green', 'brown', 'hazel', 'grey', 'amber', 'violet'].map(
                    (color) => (
                      <option key={color} value={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Robe Material */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Robe Material
                </label>
                <select
                  value={currentAvatar.robeMaterial}
                  onChange={(e) =>
                    handleCustomizationChange('robeMaterial', e.target.value)
                  }
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  {['silk', 'velvet', 'wool', 'enchanted'].map((material) => (
                    <option key={material} value={material}>
                      {material.charAt(0).toUpperCase() + material.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Wand Wood */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Wand Wood
                </label>
                <select
                  value={currentAvatar.wand.wood}
                  onChange={(e) =>
                    handleCustomizationChange('wand', {
                      ...currentAvatar.wand,
                      wood: e.target.value,
                    })
                  }
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  {['Oak', 'Holly', 'Elder', 'Ash', 'Maple', 'Willow', 'Yew'].map(
                    (wood) => (
                      <option key={wood} value={wood}>
                        {wood}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Wand Core */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Wand Core
                </label>
                <select
                  value={currentAvatar.wand.core}
                  onChange={(e) =>
                    handleCustomizationChange('wand', {
                      ...currentAvatar.wand,
                      core: e.target.value,
                    })
                  }
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  {[
                    'Phoenix Feather',
                    'Dragon Heartstring',
                    'Unicorn Hair',
                    'Thestral Hair',
                  ].map((core) => (
                    <option key={core} value={core}>
                      {core}
                    </option>
                  ))}
                </select>
              </div>

              {/* Wand Length */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Wand Length: {currentAvatar.wand.length.toFixed(1)} inches
                </label>
                <input
                  type="range"
                  min="7"
                  max="14"
                  step="0.1"
                  value={currentAvatar.wand.length}
                  onChange={(e) =>
                    handleCustomizationChange('wand', {
                      ...currentAvatar.wand,
                      length: parseFloat(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
