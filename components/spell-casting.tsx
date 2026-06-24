'use client'

import { useRef, useState, useEffect } from 'react'
import { SPELLS } from '@/lib/game-constants'

interface SpellCastingProps {
  learnedSpells: string[]
  onSpellCast?: (spellId: string) => void
  disabled?: boolean
}

type GestureType = 'circle' | 'upward' | 'downward' | 'leftward' | 'rightward' | 'none'

export function SpellCasting({ learnedSpells, onSpellCast, disabled }: SpellCastingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState<[number, number][]>([])
  const [detectedSpell, setDetectedSpell] = useState<string | null>(null)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = 'rgba(100, 100, 255, 0.1)'
    ctx.lineWidth = 0.5
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw gesture trail
    if (points.length > 1) {
      ctx.strokeStyle = 'rgb(100, 150, 255)'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      ctx.moveTo(points[0][0], points[0][1])
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1])
      }
      ctx.stroke()

      // Draw start point
      ctx.fillStyle = 'rgb(100, 255, 100)'
      ctx.beginPath()
      ctx.arc(points[0][0], points[0][1], 5, 0, Math.PI * 2)
      ctx.fill()

      // Draw end point
      ctx.fillStyle = 'rgb(255, 100, 100)'
      ctx.beginPath()
      ctx.arc(points[points.length - 1][0], points[points.length - 1][1], 5, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [points])

  const detectGesture = (pts: [number, number][]): GestureType => {
    if (pts.length < 10) return 'none'

    const start = pts[0]
    const end = pts[pts.length - 1]
    const dx = end[0] - start[0]
    const dy = end[1] - start[1]
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 20) return 'circle'

    const angle = Math.atan2(dy, dx)
    const normalizedAngle = ((angle * 180) / Math.PI + 360) % 360

    if (normalizedAngle < 45 || normalizedAngle > 315) return 'rightward'
    if (normalizedAngle < 135) return 'downward'
    if (normalizedAngle < 225) return 'leftward'
    return 'upward'
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (disabled) return
    setIsDrawing(true)
    setPoints([])
    setDetectedSpell(null)
    setFeedback('')
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPoints((prev) => [...prev, [x, y]])
  }

  const handleMouseUp = () => {
    if (!isDrawing) return
    setIsDrawing(false)

    const gesture = detectGesture(points)
    const matchingSpell = learnedSpells.find((spellId) => {
      const spell = SPELLS.find((s) => s.id === spellId)
      return spell?.gesture === gesture
    })

    if (matchingSpell) {
      const spell = SPELLS.find((s) => s.id === matchingSpell)
      setDetectedSpell(matchingSpell)
      setFeedback(`Cast: ${spell?.name}! ✨`)
      onSpellCast?.(matchingSpell)

      // Clear feedback after 2 seconds
      setTimeout(() => {
        setFeedback('')
        setDetectedSpell(null)
        setPoints([])
      }, 2000)
    } else if (points.length > 10) {
      setFeedback('Gesture not recognized. Try again!')
      setTimeout(() => {
        setFeedback('')
        setPoints([])
      }, 1500)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`border-2 border-blue-500 rounded-lg cursor-crosshair bg-black ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
        <div className="absolute top-2 left-2 text-xs text-gray-400">
          Draw a gesture to cast a spell
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`text-center font-semibold ${
          feedback.includes('Cast') ? 'text-green-400' : 'text-yellow-400'
        }`}>
          {feedback}
        </div>
      )}

      {/* Learned Spells List */}
      <div className="w-full">
        <p className="text-sm text-gray-400 mb-2">Learned Spells:</p>
        <div className="grid grid-cols-2 gap-2">
          {learnedSpells.map((spellId) => {
            const spell = SPELLS.find((s) => s.id === spellId)
            return (
              <div
                key={spellId}
                className={`p-2 rounded border text-xs ${
                  detectedSpell === spellId
                    ? 'border-green-500 bg-green-900/20'
                    : 'border-gray-700 bg-gray-900/20'
                }`}
              >
                <p className="font-semibold">{spell?.name}</p>
                <p className="text-gray-400">{spell?.description}</p>
                <p className="text-gray-500 text-xs mt-1">
                  Draw {spell?.gesture}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
