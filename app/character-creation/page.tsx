'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SortingScreen } from '@/components/sorting-screen'
import { PetSelection } from '@/components/pet-selection'
import { HOUSES } from '@/lib/game-constants'
import { useGameStore } from '@/lib/game-store'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid'

export default function CharacterCreationPage() {
  const router = useRouter()
  const { setCharacter, setSortingPoints } = useGameStore()
  const [step, setStep] = useState<
    'name' | 'sorting' | 'pet-wand' | 'summary'
  >('name')
  const [characterName, setCharacterName] = useState('')
  const [assignedHouse, setAssignedHouse] = useState<string | null>(null)
  const [selectedPet, setSelectedPet] = useState<string | null>(null)
  const [petName, setPetName] = useState('')
  const [wand, setWand] = useState<any>(null)

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (characterName.trim()) {
      setStep('sorting')
    }
  }

  const handleSortingComplete = (house: string) => {
    setAssignedHouse(house)
    setStep('pet-wand')
  }

  const handlePetWandComplete = (
    pet: string,
    name: string,
    wandData: any
  ) => {
    setSelectedPet(pet)
    setPetName(name)
    setWand(wandData)
    setStep('summary')
  }

  const handleCreateCharacter = async () => {
    if (!assignedHouse || !selectedPet) return

    const newCharacter = {
      id: uuidv4(),
      characterName,
      house: assignedHouse,
      pet: selectedPet,
      petName,
      wand,
      year: 1,
      house_points: 0,
      experience: 0,
      level: 1,
      health: 100,
      mana: 100,
      sorting_points: {
        bravery: 0,
        cunning: 0,
        loyalty: 0,
        wisdom: 0,
      },
    }

    setCharacter(newCharacter)
    setSortingPoints({
      bravery: 0,
      cunning: 0,
      loyalty: 0,
      wisdom: 0,
    })

    router.push('/game')
  }

  const houseData = assignedHouse
    ? Object.values(HOUSES).find((h) => h.id === assignedHouse)
    : null

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Name Input Step */}
      {step === 'name' && (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">Welcome, Wizard</h1>
              <p className="text-gray-400">
                What is your name?
              </p>
            </div>

            <form onSubmit={handleNameSubmit} className="space-y-4">
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Enter your character name"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                autoFocus
              />
              <Button
                type="submit"
                disabled={!characterName.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Continue to Sorting
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Sorting Step */}
      {step === 'sorting' && (
        <SortingScreen onSortingComplete={handleSortingComplete} />
      )}

      {/* Pet & Wand Selection Step */}
      {step === 'pet-wand' && (
        <PetSelection onComplete={handlePetWandComplete} />
      )}

      {/* Summary & Confirmation Step */}
      {step === 'summary' && houseData && (
        <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className={`bg-gradient-to-r ${houseData.color} rounded-lg p-1 mb-8`}>
              <div className="bg-gray-900 rounded-lg p-8">
                <div className="text-center mb-8">
                  <div className="text-7xl mb-4">{houseData.emblem}</div>
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {houseData.name}
                  </h2>
                  <p className="text-gray-400">You have been sorted into {houseData.name}</p>
                </div>

                <div className="space-y-4 mb-8 bg-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white font-semibold">{characterName}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                    <span className="text-gray-400">House:</span>
                    <span className="text-white font-semibold">{houseData.name}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                    <span className="text-gray-400">Companion:</span>
                    <span className="text-white font-semibold">{petName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Wand:</span>
                    <span className="text-white font-semibold text-sm">
                      {wand.wood}, {wand.length}″, {wand.core}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCreateCharacter}
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                >
                  Begin Your Adventure
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
