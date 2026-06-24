'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (!isPending) {
      if (session?.user) {
        router.push('/character-creation')
      }
    }
  }, [session, isPending, router])

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-4">Magical Academy</div>
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto" />
        </div>
      </div>
    )
  }

  if (session?.user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <div className="text-7xl mb-6">✨🧙‍♂️</div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to the Magical Academy
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            An immersive 3D wizard RPG where you&apos;ll master spells, encounter magical creatures, 
            and embark on epic quests. Your adventure awaits!
          </p>
        </div>

        <div className="bg-gray-900 border border-purple-500 rounded-lg p-8 mb-8">
          <div className="grid grid-cols-2 gap-6 mb-8 text-left">
            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-2">Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ 3D Immersive World</li>
                <li>✓ Gesture-Based Spell Casting</li>
                <li>✓ Dynamic House Sorting</li>
                <li>✓ Epic Quests & Adventures</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-2">More</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Creature Encounters</li>
                <li>✓ Character Progression</li>
                <li>✓ Multiplayer Potential</li>
                <li>✓ Seasonal Events</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              onClick={() => router.push('/sign-in')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg"
            >
              Sign In
            </Button>
            <Button
              onClick={() => router.push('/sign-up')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
            >
              Create Account
            </Button>
          </div>
        </div>

        <p className="text-gray-500 text-sm">
          Begin your magical journey today. The academy awaits!
        </p>
      </div>
    </div>
  )
}
