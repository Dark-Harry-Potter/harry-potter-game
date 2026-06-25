// Procedural Content Generation v3 - Dynamic Quests, Dungeons, Encounters
import SimplexNoise from 'simplex-noise';
import Alea from 'alea';
import { EXTENDED_LORE, generateLoreBasedQuest, getCreatureByLoreSource, getLocationByLoreSource, getDifficultyFromLevel } from './extended-lore-v3';

// Seeded noise for deterministic procedural generation
export class ProceduralGenerator {
  private noise: SimplexNoise;
  private rng: Alea;
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
    this.rng = new Alea(seed.toString());
    this.noise = new SimplexNoise(() => this.rng());
  }

  // Lore-aware quest generation (uses extended Harry Potter universe)
  generateLoreQuest(playerLevel: number) {
    const loreQuest = generateLoreBasedQuest(playerLevel);
    const difficultyTier = getDifficultyFromLevel(playerLevel);
    
    return {
      ...loreQuest,
      seed: this.seed,
      generatedAt: Date.now(),
    };
  }

  // Procedural quest generation
  generateQuest(playerLevel: number, location: string, questType: string) {
    const questTypes = {
      combat: [
        'Defeat {count} {creatures}',
        'Eliminate the {creature} nest',
        'Defend the {location} from invaders',
        'Hunt {creature} for their {item}',
        'Investigate mysterious {creature} activity',
        'Protect {location} from {creature} invasion', // Extended universe
        'Stop the {creature} rampage in {location}',
      ],
      exploration: [
        'Find {item} in the {location}',
        'Map the unknown territories of {location}',
        'Discover {count} hidden areas',
        'Uncover the secrets of {location}',
        'Retrieve ancient artifacts from {location}',
        'Explore the {location} to find {item}', // James Potter theme
        'Navigate the {location} challenges',
      ],
      collection: [
        'Gather {count} {item}',
        'Collect ingredients for {npc}',
        'Assemble {count} different {item}',
        'Harvest {item} from {location}',
        'Find rare {item} for research', // Rationalist theme
      ],
      escort: [
        'Protect {npc} during their journey',
        'Guide {npc} to {location}',
        'Rescue {npc} from {location}',
        'Escort {npc} safely through dangerous lands',
      ],
      social: [
        'Mediate dispute between {npc} and {npc}',
        'Gather information about {topic}',
        'Convince {npc} to help with {task}',
        'Learn the truth from {npc} about {topic}',
      ],
      rationalist: [ // Methods of Rationality quests
        'Solve the logical puzzle about {topic}',
        'Experiment with {item} to understand {topic}',
        'Design a solution to the {topic} problem',
        'Deduce the secret behind {item}',
      ],
      fantastic: [ // Fantastic Beasts quests
        'Locate and catalog the {creature}',
        'Care for injured {creature} at {location}',
        'Photograph rare {creature} in {location}',
        'Rescue {creature} from danger',
      ],
    };

    const templates = questTypes[questType as keyof typeof questTypes] || questTypes.combat;
    const template = templates[Math.floor(this.rng() * templates.length)];

    // Creatures from all lore sources: canonical HP, Fantastic Beasts, James Potter, extended universe
    const creatures = [
      ...EXTENDED_LORE.creatures.fromBooks,
      ...EXTENDED_LORE.creatures.fromFantasticBeasts,
      ...EXTENDED_LORE.creatures.fromExtendedUniverse,
    ];
    
    const items = [
      'Ancient Scroll',
      'Phoenix Feather',
      'Moonstone',
      'Dragon Scale',
      'Rare Herb',
      'Magical Crystal',
      'Destiny Stone', // From James Potter
      'Prophecy Crystal',
      'Artifact Shard',
      'Beast Egg',
      'Magical Essence',
    ];
    
    const npcs = [
      'Dumbledore',
      'Snape',
      'Luna',
      'Hagrid',
      'McGonagall',
      'Flitwick',
      'James Potter', // Next generation
      'Lily Potter',
      'Newt Scamander', // Fantastic Beasts
      'Albus Potter',
    ];

    let description = template;
    description = description.replace('{count}', Math.ceil(2 + playerLevel / 5).toString());
    description = description.replace('{creature}', creatures[Math.floor(this.rng() * creatures.length)]);
    description = description.replace('{item}', items[Math.floor(this.rng() * items.length)]);
    description = description.replace('{location}', location);
    description = description.replace('{npc}', npcs[Math.floor(this.rng() * npcs.length)]);
    description = description.replace('{topic}', 'Dark Magic threats');
    description = description.replace('{task}', 'stop the invasion');

    const baseReward = 100 + playerLevel * 50;
    const reward = Math.floor(baseReward * (0.8 + this.rng() * 0.4));
    const difficulty = Math.min(5, Math.ceil(playerLevel / 5));

    return {
      id: `quest_${this.seed}_${Date.now()}`,
      title: this.capitalizeWords(description.split(' ').slice(0, 5).join(' ')),
      description,
      reward,
      difficulty,
      type: questType,
      location,
      objectives: this.generateObjectives(questType, Math.ceil(2 + playerLevel / 5)),
      timeLimit: 24 * 3600000, // 24 hours
    };
  }

  // Procedural dungeon generation
  generateDungeon(playerLevel: number, dungeonName: string) {
    const roomCount = Math.ceil(3 + playerLevel / 5);
    const rooms = [];

    for (let i = 0; i < roomCount; i++) {
      const roomNoise = this.noise.noise3D(i, playerLevel, this.seed);
      const roomType = this.selectWeighted(
        ['treasure', 'combat', 'puzzle', 'trap', 'boss'],
        [0.15, 0.4, 0.2, 0.15, i === roomCount - 1 ? 1 : 0.1],
      );

      rooms.push({
        id: `room_${i}`,
        type: roomType,
        difficulty: Math.ceil((i / roomCount) * playerLevel + this.rng() * 3),
        enemies: this.generateRoomEnemies(roomType, playerLevel + i),
        traps: roomType === 'trap' ? this.generateTraps(i) : [],
        treasure: roomType === 'treasure' ? this.generateTreasure(playerLevel + i * 2) : null,
        description: this.generateRoomDescription(roomType, i, roomCount),
      });
    }

    return {
      id: `dungeon_${this.seed}`,
      name: dungeonName,
      difficulty: playerLevel,
      rooms,
      bossReward: { currency: 500 + playerLevel * 100, xp: 1000 + playerLevel * 200 },
    };
  }

  // Procedural encounter generation
  generateEncounter(playerLevel: number, encounterType: string = 'random') {
    const types = ['single', 'group', 'boss', 'swarm'];
    const type = encounterType === 'random' ? types[Math.floor(this.rng() * types.length)] : encounterType;

    const enemyCount = {
      single: 1,
      group: Math.ceil(2 + this.rng() * 3),
      boss: 1,
      swarm: Math.ceil(5 + this.rng() * 5),
    }[type];

    const enemies = [];
    for (let i = 0; i < enemyCount; i++) {
      enemies.push(this.generateEnemy(playerLevel, type === 'boss'));
    }

    const difficulty = enemies.reduce((sum, e) => sum + e.difficulty, 0) / enemies.length;
    const reward = Math.floor((100 + playerLevel * 50) * (difficulty / playerLevel));

    return {
      id: `encounter_${this.seed}_${Date.now()}`,
      type,
      enemies,
      difficulty,
      reward: { currency: reward, xp: reward * 2 },
      description: this.generateEncounterDescription(type, enemies),
    };
  }

  // Helper: Generate enemies
  private generateEnemy(playerLevel: number, isBoss: boolean = false) {
    const levelVariance = isBoss ? playerLevel : playerLevel + (this.rng() - 0.5) * 3;
    const creatures = [
      'Dark Wizard',
      'Dementor',
      'Basilisk',
      'Death Eater',
      'Acromantula',
      'Dark Knight',
    ];

    return {
      name: creatures[Math.floor(this.rng() * creatures.length)] + (isBoss ? ' (Boss)' : ''),
      level: Math.max(1, Math.ceil(levelVariance)),
      health: (100 + levelVariance * 30) * (isBoss ? 3 : 1),
      damage: 10 + levelVariance * 5,
      difficulty: isBoss ? levelVariance * 1.5 : levelVariance,
      isBoss,
    };
  }

  // Helper: Generate objectives
  private generateObjectives(questType: string, count: number) {
    const objectives: string[] = [];
    for (let i = 0; i < Math.min(count, 5); i++) {
      objectives.push(`Objective ${i + 1}: Complete ${questType} task`);
    }
    return objectives;
  }

  // Helper: Generate room description
  private generateRoomDescription(type: string, roomNumber: number, totalRooms: number) {
    const descriptions = {
      treasure: 'A glittering chamber filled with ancient artifacts and magical treasures.',
      combat: 'A battle-scarred arena with signs of recent conflict.',
      puzzle: 'An intricate chamber with mysterious symbols and mechanisms.',
      trap: 'A dangerous room with visible and hidden hazards.',
      boss: 'A magnificent throne room, the lair of a powerful foe.',
    };
    return descriptions[type as keyof typeof descriptions] || 'A mysterious chamber';
  }

  // Helper: Generate traps
  private generateTraps(roomId: number) {
    return [
      { type: 'spikes', damage: 20 + roomId * 5 },
      { type: 'fire', damage: 15 + roomId * 4 },
    ];
  }

  // Helper: Generate treasure
  private generateTreasure(level: number) {
    return {
      currency: Math.floor(100 + level * 50 + this.rng() * 200),
      items: [`Rare Item ${level}`, `Rune Stone ${level}`],
    };
  }

  // Helper: Generate encounter description
  private generateEncounterDescription(type: string, enemies: any[]) {
    const descs = {
      single: 'You face a lone adversary',
      group: 'A group of enemies approaches',
      boss: 'A powerful boss emerges',
      swarm: 'You are surrounded by enemies',
    };
    return `${descs[type as keyof typeof descs]}: ${enemies.map((e) => e.name).join(', ')}`;
  }

  // Helper: Weighted random selection
  private selectWeighted(options: string[], weights: number[]) {
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = this.rng() * totalWeight;

    for (let i = 0; i < options.length; i++) {
      random -= weights[i];
      if (random <= 0) return options[i];
    }
    return options[options.length - 1];
  }

  // Helper: Capitalize words
  private capitalizeWords(str: string) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  // Generate world map features
  generateMapFeature(x: number, y: number, scale: number = 0.1) {
    const noise1 = this.noise.noise2D(x * scale, y * scale);
    const noise2 = this.noise.noise2D(x * scale + 100, y * scale + 100);

    if (noise1 > 0.6) return 'mountain';
    if (noise1 > 0.3) return 'forest';
    if (noise1 < -0.4) return 'water';
    if (noise2 > 0.7) return 'dungeon';
    return 'plains';
  }

  // Generate loot table
  generateLoot(difficulty: number, count: number = 1) {
    const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    const loot = [];

    for (let i = 0; i < count; i++) {
      const rarityIndex = Math.min(
        4,
        Math.floor((this.rng() * this.rng()) * difficulty / 5),
      );
      const rarity = rarities[rarityIndex];

      loot.push({
        name: `${rarity.charAt(0).toUpperCase() + rarity.slice(1)} Item`,
        rarity,
        value: Math.floor((100 + difficulty * 50) * (rarityIndex + 1)),
      });
    }

    return loot;
  }
}

// Seeded generation for consistency
export function createProceduralGenerator(seed: number) {
  return new ProceduralGenerator(seed);
}

// Global seed for daily world generation
export function getDailySeed() {
  const today = new Date();
  return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
}

export const ProceduralGeneration = {
  createProceduralGenerator,
  getDailySeed,
};
