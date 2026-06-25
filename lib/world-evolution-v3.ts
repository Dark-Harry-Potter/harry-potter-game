// World Evolution System v3 - Persistent Dynamic World
// The world changes, evolves, and responds to player actions autonomously

export interface WorldLocation {
  id: string;
  name: string;
  danger: number; // 0-100
  prosperity: number; // 0-100
  population: number; // player count
  resources: Map<string, number>;
  events: WorldEvent[];
  lastUpdated: Date;
  dominantHouse?: string; // Which house controls it
  structure: Map<string, any>; // buildings, NPCs, etc
}

export interface WorldEvent {
  id: string;
  type: 'invasion' | 'alliance' | 'discovery' | 'disaster' | 'blessing';
  title: string;
  description: string;
  affectedLocations: string[];
  severity: number; // 0-100
  duration: number; // hours
  startTime: Date;
  rewards: { currency: number; xp: number };
  worldImpact: number; // how much it changes the world
}

export interface SeasonalCycle {
  currentSeason: 'spring' | 'summer' | 'autumn' | 'winter';
  seasonalEvents: string[];
  harvestMultiplier: number;
  creatureSpawns: Map<string, number>;
  environmentalChanges: string[];
}

export class WorldEvolution {
  private locations: Map<string, WorldLocation> = new Map();
  private events: WorldEvent[] = [];
  private seasonalCycle: SeasonalCycle;
  private globalTension: number = 50; // 0-100
  private timeAccelerationFactor: number = 24; // 1 real hour = 24 game hours

  constructor() {
    this.seasonalCycle = {
      currentSeason: 'spring',
      seasonalEvents: [],
      harvestMultiplier: 1.0,
      creatureSpawns: new Map(),
      environmentalChanges: [],
    };

    this.initializeWorld();
  }

  // Initialize world locations
  private initializeWorld() {
    const locations: WorldLocation[] = [
      {
        id: 'hogwarts',
        name: 'Hogwarts Academy',
        danger: 10,
        prosperity: 90,
        population: 0,
        resources: new Map([
          ['magical_essence', 100],
          ['ancient_knowledge', 50],
        ]),
        events: [],
        lastUpdated: new Date(),
        dominantHouse: 'gryffindor',
        structure: new Map(),
      },
      {
        id: 'hogsmeade',
        name: "Hogsmeade Village",
        danger: 20,
        prosperity: 80,
        population: 0,
        resources: new Map([
          ['supplies', 75],
          ['rare_goods', 30],
        ]),
        events: [],
        lastUpdated: new Date(),
        structure: new Map(),
      },
      {
        id: 'forbidden_forest',
        name: 'Forbidden Forest',
        danger: 70,
        prosperity: 30,
        population: 0,
        resources: new Map([
          ['rare_herbs', 60],
          ['magical_crystals', 40],
        ]),
        events: [],
        lastUpdated: new Date(),
        dominantHouse: 'slytherin',
        structure: new Map(),
      },
      {
        id: 'diagon_alley',
        name: 'Diagon Alley',
        danger: 15,
        prosperity: 95,
        population: 0,
        resources: new Map([
          ['magical_artifacts', 80],
          ['rare_materials', 50],
        ]),
        events: [],
        lastUpdated: new Date(),
        structure: new Map(),
      },
      {
        id: 'ministry_of_magic',
        name: 'Ministry of Magic',
        danger: 25,
        prosperity: 85,
        population: 0,
        resources: new Map([
          ['political_influence', 100],
          ['ancient_records', 60],
        ]),
        events: [],
        lastUpdated: new Date(),
        dominantHouse: 'ravenclaw',
        structure: new Map(),
      },
      {
        id: 'burrow',
        name: 'The Burrow',
        danger: 5,
        prosperity: 60,
        population: 0,
        resources: new Map([
          ['family_warmth', 100],
          ['homegrown_supplies', 50],
        ]),
        events: [],
        lastUpdated: new Date(),
        dominantHouse: 'hufflepuff',
        structure: new Map(),
      },
    ];

    for (const location of locations) {
      this.locations.set(location.id, location);
    }
  }

  // Update world locations based on player activity
  updateLocationState(locationId: string, playerCount: number, playerActions: string[]) {
    const location = this.locations.get(locationId);
    if (!location) return;

    location.population = playerCount;

    // Prosperity increases with player activity
    location.prosperity = Math.min(
      100,
      location.prosperity + playerCount * 0.5 + playerActions.length * 0.1,
    );

    // Danger decreases with more players defending (natural emergent behavior)
    if (playerActions.includes('combat')) {
      location.danger = Math.max(0, location.danger - playerCount * 0.2);
    }

    // Resources regenerate based on location type
    for (const [resource, amount] of location.resources) {
      const regen = Math.random() * 5;
      location.resources.set(resource, Math.min(100, amount + regen));
    }

    location.lastUpdated = new Date();
  }

  // Generate location-specific events
  generateLocationEvent(locationId: string): WorldEvent | null {
    const location = this.locations.get(locationId);
    if (!location) return null;

    const eventRoll = Math.random();

    // Event probability increases with danger, decreases with prosperity
    const eventChance = location.danger / 100 - location.prosperity / 200;

    if (eventRoll > 1 - eventChance) {
      const eventType = this.selectEventType(location);
      const severity = Math.ceil(location.danger / 20);
      const impact = Math.floor(severity * (1 - location.prosperity / 100) * 10);

      const event: WorldEvent = {
        id: `event_${locationId}_${Date.now()}`,
        type: eventType,
        title: this.generateEventTitle(eventType, location.name),
        description: this.generateEventDescription(eventType, location),
        affectedLocations: [locationId, ...this.getNearbyLocations(locationId)],
        severity,
        duration: 12 + Math.random() * 24, // 12-36 hours
        startTime: new Date(),
        rewards: {
          currency: 100 * severity,
          xp: 200 * severity,
        },
        worldImpact: impact,
      };

      this.events.push(event);
      location.events.push(event);

      // Update global tension
      this.globalTension = Math.min(100, this.globalTension + impact);

      return event;
    }

    return null;
  }

  // Seasonal cycle evolution
  advanceSeason() {
    const seasons: Array<'spring' | 'summer' | 'autumn' | 'winter'> = [
      'spring',
      'summer',
      'autumn',
      'winter',
    ];
    const currentIndex = seasons.indexOf(this.seasonalCycle.currentSeason);
    this.seasonalCycle.currentSeason = seasons[(currentIndex + 1) % 4];

    // Update seasonal effects
    this.applySeasonalEffects();
  }

  // Apply seasonal effects to world
  private applySeasonalEffects() {
    const season = this.seasonalCycle.currentSeason;

    switch (season) {
      case 'spring':
        this.seasonalCycle.harvestMultiplier = 1.2;
        this.seasonalCycle.creatureSpawns.set('pixie', 150);
        this.seasonalCycle.creatureSpawns.set('bowtruckle', 100);
        this.seasonalCycle.environmentalChanges = [
          'Flowers bloom across the land',
          'New magical creatures emerge',
        ];
        break;
      case 'summer':
        this.seasonalCycle.harvestMultiplier = 1.5;
        this.seasonalCycle.creatureSpawns.set('phoenix', 80);
        this.seasonalCycle.creatureSpawns.set('thestral', 60);
        this.seasonalCycle.environmentalChanges = [
          'The sun blazes powerfully',
          'Ancient magic peaks',
        ];
        break;
      case 'autumn':
        this.seasonalCycle.harvestMultiplier = 1.3;
        this.seasonalCycle.creatureSpawns.set('acromantula', 120);
        this.seasonalCycle.creatureSpawns.set('hippogriff', 90);
        this.seasonalCycle.environmentalChanges = [
          'Leaves turn golden and red',
          'Dark magic stirs',
        ];
        break;
      case 'winter':
        this.seasonalCycle.harvestMultiplier = 0.7;
        this.seasonalCycle.creatureSpawns.set('dementor', 140);
        this.seasonalCycle.creatureSpawns.set('basilisk', 50);
        this.seasonalCycle.environmentalChanges = [
          'Snow covers the world',
          'Cold darkness prevails',
        ];
        break;
    }
  }

  // Persistent world changes - locations can be conquered
  conquerLocation(locationId: string, byHouse: string, playerCount: number) {
    const location = this.locations.get(locationId);
    if (!location || playerCount < 5) return false; // Need minimum force

    const conquestDifficulty = location.danger + (100 - location.prosperity);
    const conquestStrength = playerCount * 10;

    if (conquestStrength > conquestDifficulty) {
      location.dominantHouse = byHouse;
      location.prosperity *= 1.2; // Conquered location gets benefits
      return true;
    }

    return false;
  }

  // Track cumulative world changes
  worldMilestone(): string[] {
    const milestones: string[] = [];

    // Check if any location reached critical state
    for (const [id, location] of this.locations) {
      if (location.prosperity > 95) {
        milestones.push(`${location.name} has flourished!`);
      }
      if (location.danger > 90) {
        milestones.push(`${location.name} is in extreme danger!`);
      }
      if (location.population > 100) {
        milestones.push(`${location.name} is overcrowded!`);
      }
    }

    if (this.globalTension > 80) {
      milestones.push('The world is on the brink of chaos!');
    }

    return milestones;
  }

  // Helper functions
  private selectEventType(location: WorldLocation): 'invasion' | 'alliance' | 'discovery' | 'disaster' | 'blessing' {
    const types: Array<'invasion' | 'alliance' | 'discovery' | 'disaster' | 'blessing'> = [
      'invasion',
      'alliance',
      'discovery',
      'disaster',
      'blessing',
    ];

    if (location.danger > 70) return 'invasion';
    if (location.prosperity > 80) return 'blessing';
    if (Math.random() > 0.6) return 'discovery';

    return types[Math.floor(Math.random() * types.length)];
  }

  private generateEventTitle(type: string, locationName: string): string {
    const titles = {
      invasion: `${locationName} Under Attack!`,
      alliance: `${locationName} Forms Alliance`,
      discovery: `Great Discovery in ${locationName}`,
      disaster: `Disaster Strikes ${locationName}`,
      blessing: `${locationName} Blessed`,
    };
    return titles[type as keyof typeof titles] || 'Strange Event';
  }

  private generateEventDescription(type: string, location: WorldLocation): string {
    const descriptions: Record<string, string> = {
      invasion: `Dark forces have invaded ${location.name}. All heroes must defend!`,
      alliance: `${location.name} has formed a powerful alliance with neighboring regions.`,
      discovery: `Adventurers have discovered something remarkable in ${location.name}!`,
      disaster: `A terrible disaster has befallen ${location.name}. Rebuilding efforts needed!`,
      blessing: `${location.name} has been blessed with good fortune and prosperity.`,
    };
    return descriptions[type] || 'Something unexpected happened.';
  }

  private getNearbyLocations(locationId: string): string[] {
    // Define location proximity
    const proximity: Record<string, string[]> = {
      hogwarts: ['hogsmeade', 'forbidden_forest'],
      hogsmeade: ['hogwarts', 'diagon_alley'],
      forbidden_forest: ['hogwarts', 'ministry_of_magic'],
      diagon_alley: ['hogsmeade', 'ministry_of_magic'],
      ministry_of_magic: ['diagon_alley', 'forbidden_forest'],
      burrow: ['hogsmeade'],
    };

    return proximity[locationId] || [];
  }

  // Getters
  getLocation(locationId: string): WorldLocation | undefined {
    return this.locations.get(locationId);
  }

  getAllLocations(): WorldLocation[] {
    return Array.from(this.locations.values());
  }

  getActiveEvents(): WorldEvent[] {
    return this.events.filter((e) => {
      const elapsed = (Date.now() - e.startTime.getTime()) / 3600000; // hours
      return elapsed < e.duration;
    });
  }

  getGlobalTension(): number {
    return this.globalTension;
  }

  getSeasonalCycle(): SeasonalCycle {
    return this.seasonalCycle;
  }

  // Tick function - call this regularly to evolve world
  tick() {
    // Update location states (prosperity/danger drift toward 50)
    for (const location of this.locations.values()) {
      if (location.prosperity > 50) {
        location.prosperity -= 0.5;
      } else {
        location.prosperity += 0.5;
      }

      if (location.danger > 50) {
        location.danger -= 0.3;
      } else {
        location.danger += 0.3;
      }
    }

    // Gradually reduce global tension
    this.globalTension = Math.max(20, this.globalTension - 0.5);

    // Clean up old events
    this.events = this.events.filter((e) => {
      const elapsed = (Date.now() - e.startTime.getTime()) / 3600000;
      return elapsed < e.duration;
    });
  }
}

export const WorldEvolutionManager = new WorldEvolution();
