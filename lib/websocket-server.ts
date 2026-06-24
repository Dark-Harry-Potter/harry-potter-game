import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import { createClient } from 'redis'

interface PlayerLocation {
  characterId: string
  userId: string
  characterName: string
  house: string
  level: number
  location: string
  x: number
  y: number
  z: number
  timestamp: number
}

interface GameMessage {
  userId: string
  characterId: string
  characterName: string
  message: string
  location: string
  timestamp: number
}

let io: SocketIOServer | null = null
const playersOnline = new Map<string, PlayerLocation>()
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
})

// Initialize WebSocket server
export async function initializeWebSocket(httpServer: HTTPServer) {
  if (io) return io

  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
    pingInterval: 25000,
    pingTimeout: 20000,
  })

  // Connect Redis for persistence
  await redisClient.connect()

  // Socket event handlers
  io.on('connection', (socket: Socket) => {
    console.log(`[v0] Player connected: ${socket.id}`)

    // Player joins location
    socket.on('location:join', async (data: PlayerLocation) => {
      const playerId = data.characterId
      playersOnline.set(socket.id, data)

      // Store in Redis for persistence
      await redisClient.hSet(
        'players:online',
        socket.id,
        JSON.stringify(data)
      )

      // Broadcast to all players in that location
      socket.to(`location:${data.location}`).emit('player:joined', {
        characterId: data.characterId,
        characterName: data.characterName,
        house: data.house,
        level: data.level,
        x: data.x,
        y: data.y,
        z: data.z,
      })

      // Send all current players to new player
      const playersInLocation = Array.from(playersOnline.values()).filter(
        (p) => p.location === data.location && p.characterId !== data.characterId
      )
      socket.emit('players:list', playersInLocation)

      // Join room for location
      socket.join(`location:${data.location}`)
    })

    // Player moves in world
    socket.on('player:move', (data: { characterId: string; x: number; y: number; z: number }) => {
      const player = playersOnline.get(socket.id)
      if (player) {
        player.x = data.x
        player.y = data.y
        player.z = data.z
        player.timestamp = Date.now()

        // Broadcast movement to location
        socket.to(`location:${player.location}`).emit('player:moved', {
          characterId: data.characterId,
          x: data.x,
          y: data.y,
          z: data.z,
        })
      }
    })

    // Chat message
    socket.on('message:send', async (data: GameMessage) => {
      const message = {
        ...data,
        timestamp: Date.now(),
      }

      // Store in Redis
      await redisClient.lPush(
        `messages:${data.location}`,
        JSON.stringify(message)
      )

      // Broadcast to location
      socket.to(`location:${data.location}`).emit('message:received', message)
    })

    // Get chat history
    socket.on('messages:fetch', async (data: { location: string; limit: number }) => {
      const messages = await redisClient.lRange(
        `messages:${data.location}`,
        0,
        data.limit - 1
      )
      socket.emit('messages:history', messages.map((m) => JSON.parse(m)).reverse())
    })

    // Player joins dueling arena
    socket.on('duel:challenge', (data: { challengerId: string; challengedId: string }) => {
      socket.emit('duel:invited', {
        challenger: data.challengerId,
        challenged: data.challengedId,
      })
    })

    // Duel spell cast
    socket.on('duel:spell', (data: { duelId: string; spellId: string; power: number }) => {
      socket.to(`duel:${data.duelId}`).emit('duel:opponent:spell', {
        spellId: data.spellId,
        power: data.power,
      })
    })

    // Guild notifications
    socket.on('guild:join', (data: { guildId: string; characterId: string }) => {
      socket.join(`guild:${data.guildId}`)
      socket.to(`guild:${data.guildId}`).emit('guild:member:joined', {
        characterId: data.characterId,
      })
    })

    // Leaderboard updates
    socket.on('leaderboard:fetch', async (data: { type: string }) => {
      const leaderboard = await redisClient.get(`leaderboard:${data.type}`)
      socket.emit('leaderboard:data', leaderboard ? JSON.parse(leaderboard) : [])
    })

    // Player leaves
    socket.on('disconnect', async () => {
      const player = playersOnline.get(socket.id)
      if (player) {
        socket.to(`location:${player.location}`).emit('player:left', {
          characterId: player.characterId,
        })

        playersOnline.delete(socket.id)
        await redisClient.hDel('players:online', socket.id)
      }

      console.log(`[v0] Player disconnected: ${socket.id}`)
    })
  })

  return io
}

// Get online player count
export function getOnlinePlayerCount(): number {
  return playersOnline.size
}

// Get players in location
export function getPlayersInLocation(location: string): PlayerLocation[] {
  return Array.from(playersOnline.values()).filter((p) => p.location === location)
}

// Broadcast to all players
export function broadcastToAll(event: string, data: unknown) {
  if (io) {
    io.emit(event, data)
  }
}

// Broadcast to location
export function broadcastToLocation(location: string, event: string, data: unknown) {
  if (io) {
    io.to(`location:${location}`).emit(event, data)
  }
}

export { io }
