// Autonomous Event Orchestrator v3 - Emergent Gameplay System
// Orchestrates all autonomous systems to create emergent, self-managing gameplay

import { AIEngine, type WorldState } from './ai-engine-v3';
import { ProceduralGenerator, getDailySeed } from './procedural-gen-v3';
import { AutonomousEconomyManager } from './economy-v3';
import { WorldEvolutionManager } from './world-evolution-v3';
import { SmartProgressionManager } from './progression-v3';

export interface GameSnapshot {
  timestamp: Date;
  playerCount: number;
  globalEvents: any[];
  worldState: WorldState;
  economicState: any;
  progressionStats: any;
  emergentNarratives: string[];
}

export class EventOrchestrator {
  private gameState: WorldState = {
    timeOfDay: 'dawn',
    weather: 'clear',
    season: 'spring',
    conflicts: 50,
    harmony: 50,
    economyInflation: 1.0,
  };

  private procedureGen: ProceduralGenerator;
  private tickCount: number = 0;
  private eventLog: any[] = [];
  private narrativeEvents: string[] = [];

  constructor() {
    this.procedureGen = new ProceduralGenerator(getDailySeed());
  }

  // Main game tick - called every game loop
  async orchestrateTick(activePlayers: string[], playerActions: Map<string, string[]>) {
    this.tickCount++;

    // Every 60 ticks (5 minutes) run full orchestration
    if (this.tickCount % 60 === 0) {
      await this.fullOrchestration(activePlayers, playerActions);
    }

    // Every 10 ticks update world state
    if (this.tickCount % 10 === 0) {
      this.updateWorldState();
    }

    // Every 30 ticks process player progression
    if (this.tickCount % 30 === 0) {
      this.processPlayerProgressionUpdates();
    }
  }

  // Full orchestration cycle - coordinates all systems
  private async fullOrchestration(activePlayers: string[], playerActions: Map<string, string[]>) {
    // 1. Update economy based on trades
    AutonomousEconomyManager.updateMarketPrices();
    AutonomousEconomyManager.calculateInflation();
    AutonomousEconomyManager.regulateEconomy();

    // 2. Generate location-specific events
    for (const location of WorldEvolutionManager.getAllLocations()) {
      const locationPlayers = activePlayers.filter((p) => playerActions.get(p)?.includes(`visit_${location.id}`));
      const actions = Array.from(playerActions.values()).flat();

      WorldEvolutionManager.updateLocationState(location.id, locationPlayers.length, actions);

      const event = WorldEvolutionManager.generateLocationEvent(location.id);
      if (event) {
        this.narrativeEvents.push(event.title);
        await this.handleWorldEvent(event, activePlayers);
      }
    }

    // 3. Generate global events
    if (Math.random() > 0.7) {
      await this.generateGlobalEvent(activePlayers);
    }

    // 4. Evolve world state
    if (this.tickCount % 1440 === 0) {
      // Every 24 game hours (120 ticks = 10 min per tick = 20 hours)
      AIEngine.evolveWorldState(this.gameState, 1);
      WorldEvolutionManager.tick();
    }

    // 5. Detect world milestones
    const milestones = WorldEvolutionManager.worldMilestone();
    for (const milestone of milestones) {
      this.narrativeEvents.push(`[WORLD]: ${milestone}`);
    }

    // 6. Check economy events
    const economicEvent = AutonomousEconomyManager.generateEconomicEvent();
    if (economicEvent !== 'Market Stable: Normal trading conditions') {
      this.narrativeEvents.push(`[ECONOMY]: ${economicEvent}`);
    }

    // 7. Log the snapshot
    this.eventLog.push(this.createSnapshot(activePlayers));
  }

  // Handle world events and their cascading effects
  private async handleWorldEvent(event: any, affectedPlayers: string[]) {
    // Calculate impact on locations
    for (const locationId of event.affectedLocations) {
      const location = WorldEvolutionManager.getLocation(locationId);
      if (location) {
        if (event.type === 'invasion') {
          location.danger = Math.min(100, location.danger + event.severity * 10);
          location.prosperity = Math.max(0, location.prosperity - event.severity * 5);
        } else if (event.type === 'blessing') {
          location.prosperity = Math.min(100, location.prosperity + event.severity * 10);
          location.danger = Math.max(0, location.danger - event.severity * 5);
        } else if (event.type === 'discovery') {
          location.prosperity = Math.min(100, location.prosperity + event.severity * 7);
        }
      }
    }

    // Update economy based on event
    if (event.type === 'disaster') {
      AutonomousEconomyManager.calculateInflation();
    }

    // Notify affected players
    for (const playerId of affectedPlayers) {
      if (event.affectedLocations.some((loc: string) => playerActions.get(playerId)?.includes(`in_${loc}`))) {
        // Player is affected
        this.narrativeEvents.push(`${event.title} affects you!`);
      }
    }
  }

  // Generate global events that affect entire world
  private async generateGlobalEvent(activePlayers: string[]) {
    const conflict = this.gameState.conflicts;
    const harmony = this.gameState.harmony;

    let globalEventType: string = 'normal';
    if (conflict > 80) globalEventType = 'war';
    else if (conflict > 60) globalEventType = 'turmoil';
    else if (harmony > 80) globalEventType = 'peace';
    else globalEventType = 'intrigue';

    const descriptions: Record<string, string> = {
      war: `War breaks out! All players gain +50% XP in combat quests`,
      turmoil: `Political turmoil spreads. House conflicts intensify.`,
      peace: `A period of peace descends. Trade flourishes (+20% currency)`,
      intrigue: `Mysterious intrigues unfold across the realm`,
    };

    this.narrativeEvents.push(`[GLOBAL EVENT]: ${descriptions[globalEventType]}`);

    // Update world state
    if (globalEventType === 'war') {
      this.gameState.conflicts = Math.min(100, this.gameState.conflicts + 10);
    } else if (globalEventType === 'peace') {
      this.gameState.harmony = Math.min(100, this.gameState.harmony + 10);
    }
  }

  // Update world state based on time
  private updateWorldState() {
    // Time of day cycles
    const times: Array<'dawn' | 'morning' | 'noon' | 'afternoon' | 'dusk' | 'night'> = [
      'dawn',
      'morning',
      'noon',
      'afternoon',
      'dusk',
      'night',
    ];
    const currentIndex = times.indexOf(this.gameState.timeOfDay);
    this.gameState.timeOfDay = times[(currentIndex + 1) % times.length];

    // Weather changes occasionally
    if (Math.random() > 0.85) {
      const weathers: Array<'clear' | 'cloudy' | 'rainy' | 'stormy' | 'foggy'> = [
        'clear',
        'cloudy',
        'rainy',
        'stormy',
        'foggy',
      ];
      this.gameState.weather = weathers[Math.floor(Math.random() * weathers.length)];
      this.narrativeEvents.push(`[WEATHER]: Weather changed to ${this.gameState.weather}`);
    }

    // Conflict/harmony drift
    if (this.gameState.conflicts > 50) {
      this.gameState.conflicts -= 0.5;
    } else {
      this.gameState.conflicts += 0.5;
    }

    if (this.gameState.harmony > 50) {
      this.gameState.harmony -= 0.5;
    } else {
      this.gameState.harmony += 0.5;
    }
  }

  // Process progression updates
  private processPlayerProgressionUpdates() {
    const stats = SmartProgressionManager.getProgressionStats();
    if (stats.averageWinRate < 0.55) {
      this.narrativeEvents.push(`[SYSTEM]: Players need easier content - reducing difficulty`);
    } else if (stats.averageWinRate > 0.75) {
      this.narrativeEvents.push(`[SYSTEM]: Players need harder content - increasing difficulty`);
    }
  }

  // Create game snapshot for analytics
  private createSnapshot(activePlayers: string[]): GameSnapshot {
    return {
      timestamp: new Date(),
      playerCount: activePlayers.length,
      globalEvents: this.eventLog.slice(-10),
      worldState: this.gameState,
      economicState: {
        inflation: (AutonomousEconomyManager as any).state?.inflation || 1.0,
        health: (AutonomousEconomyManager as any).state?.marketHealth || 75,
      },
      progressionStats: SmartProgressionManager.getProgressionStats(),
      emergentNarratives: this.narrativeEvents.slice(-10),
    };
  }

  // Generate procedural content for players
  async generatePlayerContent(
    playerId: string,
    playerLevel: number,
    house: string,
    playtimeHours: number,
  ) {
    const seed = getDailySeed() + playerLevel;
    const procGen = new ProceduralGenerator(seed);

    return {
      dailyQuest: procGen.generateQuest(playerLevel, 'Hogwarts', 'combat'),
      randomEncounter: procGen.generateEncounter(playerLevel),
      dungeon: procGen.generateDungeon(playerLevel, `Daily Dungeon ${seed}`),
      aiGeneratedQuest: await AIEngine.generateAIQuest(playerLevel, house, playtimeHours),
    };
  }

  // Get game state snapshot
  getGameSnapshot(): GameSnapshot {
    return this.createSnapshot([]);
  }

  // Get recent narratives (for UI display)
  getRecentNarratives(count: number = 10): string[] {
    return this.narrativeEvents.slice(-count);
  }

  // Force seasonal advance (admin-less, triggered by time/events)
  advanceSeason() {
    WorldEvolutionManager.tick();
    this.narrativeEvents.push(`[WORLD]: Season advanced! New creatures and resources available.`);
  }

  // Check for emergent scenarios
  detectEmergentScenarios(): string[] {
    const scenarios: string[] = [];

    const worldState = this.gameState;
    const locations = WorldEvolutionManager.getAllLocations();

    // Scenario 1: Multiple locations in danger
    const dangerousLocations = locations.filter((l) => l.danger > 80);
    if (dangerousLocations.length > 2) {
      scenarios.push(
        `[EMERGENT] Multiple locations under threat! Guilds needed to defend: ${dangerousLocations.map((l) => l.name).join(', ')}`,
      );
    }

    // Scenario 2: Economic opportunity
    const inflationHigh = (AutonomousEconomyManager as any).state?.inflation > 1.3;
    if (inflationHigh) {
      scenarios.push('[EMERGENT] Inflation spike! Smart traders can profit from market swings');
    }

    // Scenario 3: Guild wars forming (houses competing for locations)
    const houseCounts = new Map();
    for (const location of locations) {
      if (location.dominantHouse) {
        houseCounts.set(location.dominantHouse, (houseCounts.get(location.dominantHouse) || 0) + 1);
      }
    }
    if (houseCounts.size > 1) {
      scenarios.push('[EMERGENT] House dominion war: Guilds are competing for territorial control!');
    }

    // Scenario 4: Rare seasonal event
    if (Math.random() > 0.95) {
      scenarios.push('[EMERGENT] A rare celestial event is about to occur! Limited-time quests available!');
    }

    return scenarios;
  }
}

export const GameOrchestrator = new EventOrchestrator();
