'use client'

import { useState } from 'react'
import { SORTING_QUESTIONS, HOUSES } from '@/lib/game-constants'
import { useGameStore } from '@/lib/game-store'
import { Button } from '@/components/ui/button'

interface SortingScreenProps {
  onSortingComplete: (house: string) => void
}

export function SortingScreen({ onSortingComplete }: SortingScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [animating, setAnimating] = useState(false)
  const { sortingPoints, setSortingPoints, addSortingPoints } = useGameStore()

  const question = SORTING_QUESTIONS[currentQuestion]

  const handleAnswer = (attribute: string, value: number) => {
    setAnimating(true)
    addSortingPoints({ [attribute]: value } as any)

    setTimeout(() => {
      if (currentQuestion < SORTING_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setAnimating(false)
      } else {
        // Sorting complete
        determineSortingResult()
      }
    }, 600)
  }

  const determineSortingResult = () => {
    const points = { ...sortingPoints }
    const maxPoints = Math.max(
      points.bravery,
      points.cunning,
      points.loyalty,
      points.wisdom
    )

    let house = 'valor'
    if (points.cunning === maxPoints) house = 'cunning'
    if (points.loyalty === maxPoints) house = 'harmony'
    if (points.wisdom === maxPoints) house = 'wisdom'

    onSortingComplete(house)
  }

  const progress = ((currentQuestion + 1) / SORTING_QUESTIONS.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Question {currentQuestion + 1} of {SORTING_QUESTIONS.length}
          </p>
        </div>

        {/* Question */}
        <div
          className={`bg-gray-900 border border-purple-500 rounded-lg p-8 mb-8 transition-opacity duration-300 ${
            animating ? 'opacity-50' : 'opacity-100'
          }`}
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            {question.question}
          </h2>

          {/* Answers */}
          <div className="space-y-4">
            {question.answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() =>
                  handleAnswer(answer.attribute, answer.value)
                }
                disabled={animating}
                className="w-full p-4 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 border border-gray-700 hover:border-purple-500 rounded-lg text-white text-left transition-all group"
              >
                <span className="text-lg">{answer.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Scoring */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
          <div className="grid grid-cols-4 gap-2 text-center text-sm">
            <div>
              <p className="text-gray-400">Bravery</p>
              <p className="text-red-400 font-bold">{sortingPoints.bravery}</p>
            </div>
            <div>
              <p className="text-gray-400">Cunning</p>
              <p className="text-green-400 font-bold">{sortingPoints.cunning}</p>
            </div>
            <div>
              <p className="text-gray-400">Loyalty</p>
              <p className="text-yellow-400 font-bold">{sortingPoints.loyalty}</p>
            </div>
            <div>
              <p className="text-gray-400">Wisdom</p>
              <p className="text-blue-400 font-bold">{sortingPoints.wisdom}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
