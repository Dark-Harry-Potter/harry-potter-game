'use client'

import { PETS, WAND_CORES, WAND_WOODS, WAND_LENGTHS } from '@/lib/game-constants'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface PetSelectionProps {
  onComplete: (pet: string, petName: string, wand: any) => void
}

export function PetSelection({ onComplete }: PetSelectionProps) {
  const [selectedPet, setSelectedPet] = useState<string | null>(null)
  const [petName, setPetName] = useState('')
  const [wandCore, setWandCore] = useState(WAND_CORES[0])
  const [wandWood, setWandWood] = useState(WAND_WOODS[0])
  const [wandLength, setWandLength] = useState(WAND_LENGTHS[3])
  const [step, setStep] = useState<'pet' | 'name' | 'wand' | 'review'>('pet')

  const handlePetSelect = (petId: string) => {
    setSelectedPet(petId)
    setStep('name')
  }

  const handleNameSubmit = () => {
    if (petName.trim()) {
      setStep('wand')
    }
  }

  const handleWandConfirm = () => {
    setStep('review')
  }

  const handleComplete = () => {
    if (selectedPet && petName) {
      onComplete(selectedPet, petName, {
        core: wandCore,
        wood: wandWood,
        length: wandLength,
      })
    }
  }

  const selectedPetData = PETS.find((p) => p.id === selectedPet)

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          {step === 'pet' && 'Choose Your Companion'}
          {step === 'name' && 'Name Your Companion'}
          {step === 'wand' && 'Select Your Wand'}
          {step === 'review' && 'Confirm Your Choices'}
        </h1>

        {/* Pet Selection */}
        {step === 'pet' && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            {PETS.map((pet) => (
              <button
                key={pet.id}
                onClick={() => handlePetSelect(pet.id)}
                className="p-6 bg-gray-900 border-2 border-gray-700 hover:border-purple-500 rounded-lg text-center transition-all hover:scale-105"
              >
                <div className="text-6xl mb-4">{pet.icon}</div>
                <p className="text-white font-semibold">{pet.name}</p>
              </button>
            ))}
          </div>
        )}

        {/* Name Selection */}
        {step === 'name' && (
          <div className="bg-gray-900 border border-purple-500 rounded-lg p-8 mb-8">
            <div className="mb-6">
              <div className="text-6xl text-center mb-4">
                {selectedPetData?.icon}
              </div>
              <p className="text-center text-gray-400 mb-4">
                What would you like to name your {selectedPetData?.name}?
              </p>
            </div>

            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Enter name..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 mb-4"
              autoFocus
            />

            <Button
              onClick={handleNameSubmit}
              disabled={!petName.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Wand Selection */}
        {step === 'wand' && (
          <div className="bg-gray-900 border border-purple-500 rounded-lg p-8 mb-8 space-y-6">
            <div>
              <label className="block text-white mb-3 font-semibold">
                Wand Core
              </label>
              <select
                value={wandCore}
                onChange={(e) => setWandCore(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              >
                {WAND_CORES.map((core) => (
                  <option key={core} value={core}>
                    {core}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white mb-3 font-semibold">
                Wand Wood
              </label>
              <select
                value={wandWood}
                onChange={(e) => setWandWood(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              >
                {WAND_WOODS.map((wood) => (
                  <option key={wood} value={wood}>
                    {wood}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white mb-3 font-semibold">
                Wand Length: {wandLength} inches
              </label>
              <input
                type="range"
                min={9}
                max={15}
                value={wandLength}
                onChange={(e) => setWandLength(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <Button
              onClick={handleWandConfirm}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Confirm Wand
            </Button>
          </div>
        )}

        {/* Review */}
        {step === 'review' && (
          <div className="bg-gray-900 border border-purple-500 rounded-lg p-8 mb-8">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                <span className="text-gray-400">Companion:</span>
                <span className="text-white font-semibold">
                  {selectedPetData?.name} ({petName})
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                <span className="text-gray-400">Wand:</span>
                <span className="text-white font-semibold">
                  {wandWood}, {wandLength}″, {wandCore}
                </span>
              </div>
            </div>

            <Button
              onClick={handleComplete}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Begin Your Journey
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
