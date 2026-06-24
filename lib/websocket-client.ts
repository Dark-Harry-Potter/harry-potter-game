import { io, Socket } from 'socket.io-client'
import { create } from 'zustand'

interface MultiplayerState {
  socket: Socket | null
  isConnected: boolean
  onlinePlayers: Map<string, any>
  messages: any[]
  connect: (userId: string, characterId: string, location: string) => void
  disconnect: () => void
  sendMessage: (message: string) => void
  movePlayer: (x: number, y: number, z: number) => void
  joinLocation: (location: string) => void
  leaveLocation: () => void
  getOnlinePlayers: () => any[]
  getMessages: () => any[]
}

export const useMultiplayerStore = create<MultiplayerState>((set, get) => ({
  socket: null,
  isConnected: false,
  onlinePlayers: new Map(),
  messages: [],

  connect: (userId: string, characterId: string, location: string) => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL || window.location.origin, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    })

    socket.on('connect', () => {
      console.log('[v0] WebSocket connected')
      set({ isConnected: true })

      // Join location
      socket.emit('location:join', {
        userId,
        characterId,
        location,
      })

      // Fetch chat history
      socket.emit('messages:fetch', { location, limit: 50 })
    })

    socket.on('players:list', (players: any[]) => {
      const onlinePlayers = new Map()
      players.forEach((p) => {
        onlinePlayers.set(p.characterId, p)
      })
      set({ onlinePlayers })
    })

    socket.on('player:joined', (player: any) => {
      set((state) => {
        state.onlinePlayers.set(player.characterId, player)
        return state
      })
    })

    socket.on('player:left', (data: { characterId: string }) => {
      set((state) => {
        state.onlinePlayers.delete(data.characterId)
        return state
      })
    })

    socket.on('player:moved', (data: any) => {
      set((state) => {
        const player = state.onlinePlayers.get(data.characterId)
        if (player) {
          player.x = data.x
          player.y = data.y
          player.z = data.z
        }
        return state
      })
    })

    socket.on('message:received', (message: any) => {
      set((state) => {
        state.messages.push(message)
        return state
      })
    })

    socket.on('messages:history', (messages: any[]) => {
      set({ messages })
    })

    socket.on('disconnect', () => {
      console.log('[v0] WebSocket disconnected')
      set({ isConnected: false })
    })

    set({ socket })
  },

  disconnect: () => {
    const { socket } = get()
    if (socket) {
      socket.disconnect()
      set({ socket: null, isConnected: false })
    }
  },

  sendMessage: (message: string) => {
    const { socket } = get()
    if (socket) {
      socket.emit('message:send', { message })
    }
  },

  movePlayer: (x: number, y: number, z: number) => {
    const { socket } = get()
    if (socket) {
      socket.emit('player:move', { x, y, z })
    }
  },

  joinLocation: (location: string) => {
    const { socket } = get()
    if (socket) {
      socket.emit('location:join', { location })
    }
  },

  leaveLocation: () => {
    const { socket } = get()
    if (socket) {
      socket.emit('location:leave')
    }
  },

  getOnlinePlayers: () => {
    const { onlinePlayers } = get()
    return Array.from(onlinePlayers.values())
  },

  getMessages: () => {
    const { messages } = get()
    return messages
  },
}))
