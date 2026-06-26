// Same-Era Multiplayer System v6
// Players only interact with others in the same era

export interface MultiplayerSession {
  sessionId: string;
  era: string;
  location: string;
  host: string;
  participants: MultiplayerPlayer[];
  createdAt: Date;
  maxParticipants: number;
  sessionType: 'duel' | 'quest' | 'exploration' | 'tournament';
}

export interface MultiplayerPlayer {
  playerId: string;
  characterName: string;
  era: string;
  level: number;
  house: string;
  health: number;
  mana: number;
  spells: string[];
  joinedAt: Date;
  status: 'ready' | 'in_battle' | 'waiting' | 'spectating';
}

export interface DuelMatch {
  matchId: string;
  challenger: MultiplayerPlayer;
  opponent: MultiplayerPlayer;
  era: string;
  location: string;
  round: number;
  maxRounds: number;
  challengers_health: number;
  opponents_health: number;
  battleLog: BattleAction[];
  winner?: string;
  startedAt: Date;
  endedAt?: Date;
}

export interface BattleAction {
  playerId: string;
  action: 'spell_cast' | 'dodge' | 'defend' | 'taunt';
  spell?: string;
  damage?: number;
  timestamp: Date;
}

// Session management
export class MultiplayerSessionManager {
  private sessions: Map<string, MultiplayerSession> = new Map();
  private duels: Map<string, DuelMatch> = new Map();

  // Create a new session
  createSession(
    era: string,
    location: string,
    hostId: string,
    sessionType: 'duel' | 'quest' | 'exploration' | 'tournament'
  ): MultiplayerSession {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const session: MultiplayerSession = {
      sessionId,
      era,
      location,
      host: hostId,
      participants: [],
      createdAt: new Date(),
      maxParticipants: sessionType === 'duel' ? 2 : 10,
      sessionType,
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  // Join a session (same era only)
  joinSession(
    sessionId: string,
    player: MultiplayerPlayer
  ): MultiplayerSession | null {
    const session = this.sessions.get(sessionId);

    if (!session) return null;

    // Enforce same-era rule
    if (session.era !== player.era) {
      console.error(
        `[v0] Player era (${player.era}) doesn't match session era (${session.era})`
      );
      return null;
    }

    // Check capacity
    if (session.participants.length >= session.maxParticipants) {
      return null;
    }

    // Add player
    session.participants.push(player);
    return session;
  }

  // Leave a session
  leaveSession(sessionId: string, playerId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.participants = session.participants.filter(
        (p) => p.playerId !== playerId
      );

      // Clean up empty sessions
      if (session.participants.length === 0) {
        this.sessions.delete(sessionId);
      }
    }
  }

  // Get available sessions for an era
  getSessionsForEra(era: string): MultiplayerSession[] {
    return Array.from(this.sessions.values()).filter(
      (session) =>
        session.era === era && session.participants.length < session.maxParticipants
    );
  }

  // Get players in an era
  getPlayersInEra(era: string): MultiplayerPlayer[] {
    const players: MultiplayerPlayer[] = [];
    this.sessions.forEach((session) => {
      if (session.era === era) {
        players.push(...session.participants);
      }
    });
    return players;
  }
}

// Duel system
export class DuelSystem {
  private duels: Map<string, DuelMatch> = new Map();

  // Challenge another player to a duel
  challengePlayer(
    challenger: MultiplayerPlayer,
    opponent: MultiplayerPlayer,
    location: string
  ): DuelMatch | null {
    // Same era only
    if (challenger.era !== opponent.era) {
      return null;
    }

    const matchId = `duel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const match: DuelMatch = {
      matchId,
      challenger,
      opponent,
      era: challenger.era,
      location,
      round: 0,
      maxRounds: 3,
      challengers_health: challenger.health,
      opponents_health: opponent.health,
      battleLog: [],
      startedAt: new Date(),
    };

    this.duels.set(matchId, match);
    return match;
  }

  // Execute spell in duel
  castSpell(
    matchId: string,
    casterId: string,
    spell: string,
    difficulty: number
  ): BattleAction | null {
    const match = this.duels.get(matchId);
    if (!match) return null;

    // Determine damage based on spell and difficulty
    const damage = this.calculateDamage(spell, difficulty);

    // Determine if spell hits
    const hitChance = Math.random();
    const missChance = 0.2; // 20% miss rate

    if (hitChance > missChance) {
      // Hit
      if (casterId === match.challenger.playerId) {
        match.opponents_health = Math.max(0, match.opponents_health - damage);
      } else {
        match.challengers_health = Math.max(0, match.challengers_health - damage);
      }
    }

    const action: BattleAction = {
      playerId: casterId,
      action: 'spell_cast',
      spell,
      damage: hitChance > missChance ? damage : 0,
      timestamp: new Date(),
    };

    match.battleLog.push(action);

    // Check for winner
    if (match.opponents_health <= 0) {
      match.winner = match.challenger.playerId;
      match.endedAt = new Date();
    } else if (match.challengers_health <= 0) {
      match.winner = match.opponent.playerId;
      match.endedAt = new Date();
    }

    return action;
  }

  // Calculate damage based on spell
  private calculateDamage(spell: string, difficulty: number): number {
    const baseSpellDamage: Record<string, number> = {
      stupefy: 15,
      incendio: 20,
      expelliarmus: 10,
      protego: 0,
      bombarda: 30,
      reducto: 25,
      crucio: 40,
      avada_kedavra: 100,
    };

    const baseDamage = baseSpellDamage[spell] || 10;
    const variance = (Math.random() - 0.5) * 0.4; // ±20% variance
    return Math.floor(baseDamage * (1 + variance) * (difficulty / 5));
  }

  // Get duel status
  getDuel(matchId: string): DuelMatch | null {
    return this.duels.get(matchId) || null;
  }

  // End duel
  endDuel(matchId: string): DuelMatch | null {
    const match = this.duels.get(matchId);
    if (match) {
      match.endedAt = new Date();
      if (!match.winner) {
        match.winner = 'draw';
      }
      return match;
    }
    return null;
  }
}

// Location finder - same era only
export function findPlayersInLocation(
  era: string,
  location: string,
  sessionManager: MultiplayerSessionManager
): MultiplayerPlayer[] {
  const sessions = sessionManager.getSessionsForEra(era);
  return sessions
    .filter((session) => session.location === location)
    .flatMap((session) => session.participants);
}

// Get multiplayer status for era
export function getEraMultiplayerStatus(
  era: string,
  sessionManager: MultiplayerSessionManager
): {
  activePlayers: number;
  activeSessions: number;
  mainLocation: string;
} {
  const sessions = sessionManager.getSessionsForEra(era);
  const players = sessionManager.getPlayersInEra(era);

  // Find most common location
  const locationCounts: Record<string, number> = {};
  sessions.forEach((session) => {
    locationCounts[session.location] =
      (locationCounts[session.location] || 0) + session.participants.length;
  });

  const mainLocation = Object.entries(locationCounts).sort(
    ([, a], [, b]) => b - a
  )[0]?.[0] || 'Hogwarts Dungeons';

  return {
    activePlayers: players.length,
    activeSessions: sessions.length,
    mainLocation,
  };
}

// Enforce era matching for trades
export function validateTrade(
  playerA: MultiplayerPlayer,
  playerB: MultiplayerPlayer
): boolean {
  // Same era only
  return playerA.era === playerB.era;
}

// Get era-specific multiplayer rules
export function getEraMultiplayerRules(era: string): string[] {
  const rules: Record<string, string[]> = {
    founders: [
      'No spells beyond the founding four',
      'Duels use traditional weapons or magic only',
      'Honorable conduct is enforced',
    ],
    marauders: [
      'Animagus transformations allowed in duels',
      'Map reading is permitted',
      'Pranks and tricks are fair play',
    ],
    potter: [
      'Dark Arts are restricted to Defense Against lessons',
      'House points awarded for victories',
      'Tournament format preferred',
    ],
    cursedchild: [
      'Time-related spells carefully monitored',
      'Alternate timeline interactions allowed',
      'Temporal anchors required for safety',
    ],
    jamesporter: [
      'Next-generation spells permitted',
      'Legacy challenges have special rules',
      'Ancestor approval required for major duels',
    ],
    rational: [
      'Spell formulas must be documented',
      'Empirical dueling frameworks enforced',
      'Research partnerships encouraged',
    ],
  };

  return rules[era] || rules.potter;
}
