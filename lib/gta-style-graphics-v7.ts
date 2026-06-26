// GTA-Style Graphics & UI System v7
// High-fidelity 3D character models, environments, and minimalist HUD

export interface CharacterModel {
  id: string;
  name: string;
  meshes: {
    head: string;
    body: string;
    arms: string;
    legs: string;
    robes: string;
  };
  textures: {
    skin: string;
    hair: string;
    eyes: string;
    outfit: string;
  };
  animations: {
    idle: string;
    walk: string;
    run: string;
    spellcast: string;
    interact: string;
    sit: string;
    sleep: string;
    celebrate: string;
    mourn: string;
  };
  aging: {
    young: number; // 11-17
    adult: number; // 18-40
    elder: number; // 40+
  };
}

export interface EnvironmentAsset {
  id: string;
  name: string;
  type: 'building' | 'terrain' | 'prop' | 'npc' | 'effect';
  model: string;
  textures: string[];
  lighting: {
    ambientColor: string;
    shadowIntensity: number;
    timeOfDayVariation: boolean;
  };
  interactions: string[];
}

export interface WeatherSystem {
  currentWeather: 'clear' | 'rain' | 'snow' | 'fog' | 'storm';
  timeOfDay: number; // 0-24 hours
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  dynamic: boolean;
  intensity: number; // 0-100
}

export interface MinimalistHUD {
  healthBar: {
    visible: boolean;
    position: 'top-left';
    color: string;
  };
  manaBar: {
    visible: boolean;
    position: 'top-left';
    color: string;
  };
  miniMap: {
    visible: boolean;
    position: 'top-right';
    zoom: number;
  };
  quickSlots: {
    visible: boolean;
    position: 'bottom-right';
    slots: number;
  };
  dialogue: {
    position: 'center-bottom';
    fadeOutTime: number; // ms
    fontSize: string;
  };
  objective: {
    visible: boolean;
    position: 'top-center';
    fadeOutTime: number;
  };
  characterName: {
    visible: boolean;
    position: 'center-top';
  };
}

export const DEFAULT_HUD: MinimalistHUD = {
  healthBar: {
    visible: true,
    position: 'top-left',
    color: '#e74c3c',
  },
  manaBar: {
    visible: true,
    position: 'top-left',
    color: '#3498db',
  },
  miniMap: {
    visible: true,
    position: 'top-right',
    zoom: 1,
  },
  quickSlots: {
    visible: true,
    position: 'bottom-right',
    slots: 5,
  },
  dialogue: {
    position: 'center-bottom',
    fadeOutTime: 3000,
    fontSize: '16px',
  },
  objective: {
    visible: true,
    position: 'top-center',
    fadeOutTime: 5000,
  },
  characterName: {
    visible: true,
    position: 'center-top',
  },
};

// High-fidelity character model generation based on appearance
export function generateCharacterModel(appearance: {
  skinTone: string;
  hairColor: string;
  hairStyle: string;
  eyeColor: string;
  outfit: string;
  age: number;
}): CharacterModel {
  const ageCategory = appearance.age < 18 ? 'young' : appearance.age < 40 ? 'adult' : 'elder';

  return {
    id: `model_${Date.now()}`,
    name: `Character Model (${appearance.skinTone})`,
    meshes: {
      head: `head_${appearance.skinTone}_${ageCategory}`,
      body: `body_${ageCategory}`,
      arms: `arms_${appearance.skinTone}`,
      legs: `legs_${appearance.skinTone}`,
      robes: `robes_${appearance.outfit}`,
    },
    textures: {
      skin: `skin_${appearance.skinTone}`,
      hair: `hair_${appearance.hairColor}_${appearance.hairStyle}`,
      eyes: `eyes_${appearance.eyeColor}`,
      outfit: `outfit_${appearance.outfit}`,
    },
    animations: {
      idle: 'anim_idle_wizard',
      walk: 'anim_walk_casual',
      run: 'anim_run_urgent',
      spellcast: 'anim_spellcast_extended',
      interact: 'anim_interact_dialogue',
      sit: 'anim_sit_chair',
      sleep: 'anim_sleep_bed',
      celebrate: 'anim_celebrate_victory',
      mourn: 'anim_mourn_loss',
    },
    aging: {
      young: appearance.age < 18 ? 1 : 0,
      adult: appearance.age >= 18 && appearance.age < 40 ? 1 : 0,
      elder: appearance.age >= 40 ? 1 : 0,
    },
  };
}

// Environment variations by era
export const ERA_ENVIRONMENTS: Record<string, EnvironmentAsset[]> = {
  founders: [
    {
      id: 'founders_castle',
      name: 'Ancient Hogwarts',
      type: 'building',
      model: 'hogwarts_founders_era',
      textures: ['stone_weathered', 'wood_ancient', 'metal_iron'],
      lighting: {
        ambientColor: '#8B7355',
        shadowIntensity: 0.6,
        timeOfDayVariation: true,
      },
      interactions: ['explore', 'study', 'sleep'],
    },
    {
      id: 'founders_forest',
      name: 'Forbidden Forest (Ancient)',
      type: 'terrain',
      model: 'forest_dense_ancient',
      textures: ['grass_overgrown', 'tree_ancient', 'moss_thick'],
      lighting: {
        ambientColor: '#2F4F2F',
        shadowIntensity: 0.8,
        timeOfDayVariation: true,
      },
      interactions: ['explore', 'hunt', 'gather'],
    },
  ],
  marauders: [
    {
      id: 'marauders_castle',
      name: 'Hogwarts (1970s)',
      type: 'building',
      model: 'hogwarts_marauders_era',
      textures: ['stone_maintained', 'wood_polished', 'metal_brass'],
      lighting: {
        ambientColor: '#696969',
        shadowIntensity: 0.5,
        timeOfDayVariation: true,
      },
      interactions: ['explore', 'study', 'prank'],
    },
  ],
  potter: [
    {
      id: 'potter_castle',
      name: 'Hogwarts (1990s)',
      type: 'building',
      model: 'hogwarts_potter_era',
      textures: ['stone_clean', 'wood_refined', 'metal_enchanted'],
      lighting: {
        ambientColor: '#808080',
        shadowIntensity: 0.4,
        timeOfDayVariation: true,
      },
      interactions: ['explore', 'study', 'defend'],
    },
  ],
  rational: [
    {
      id: 'rational_underground',
      name: 'Underground Sanctuary',
      type: 'building',
      model: 'research_facility_underground',
      textures: ['concrete_reinforced', 'metal_industrial', 'glass_crystal'],
      lighting: {
        ambientColor: '#1a1a2e',
        shadowIntensity: 0.9,
        timeOfDayVariation: false,
      },
      interactions: ['research', 'strategize', 'communicate'],
    },
  ],
};

// Dynamic weather affects gameplay
export function createWeatherSystem(): WeatherSystem {
  return {
    currentWeather: 'clear',
    timeOfDay: 12,
    season: 'autumn',
    dynamic: true,
    intensity: 0,
  };
}

// Update weather based on time progression
export function updateWeather(weather: WeatherSystem, deltaTime: number): WeatherSystem {
  const updated = { ...weather };

  // Advance time
  updated.timeOfDay = (updated.timeOfDay + deltaTime / 60) % 24;

  // Random weather changes
  if (Math.random() < 0.05) {
    const weatherTypes: Array<'clear' | 'rain' | 'snow' | 'fog' | 'storm'> = [
      'clear',
      'rain',
      'snow',
      'fog',
      'storm',
    ];
    updated.currentWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
  }

  return updated;
}

// Camera system for cinematic experience
export interface CameraMode {
  type: 'first_person' | 'third_person' | 'cinematic' | 'isometric';
  distance?: number;
  height?: number;
  angle?: number;
  smoothing: number;
}

export const CAMERA_PRESETS: Record<string, CameraMode> = {
  first_person: {
    type: 'first_person',
    smoothing: 0.8,
  },
  third_person: {
    type: 'third_person',
    distance: 5,
    height: 1.5,
    angle: 45,
    smoothing: 0.9,
  },
  cinematic: {
    type: 'cinematic',
    distance: 8,
    height: 3,
    angle: 35,
    smoothing: 0.95,
  },
  isometric: {
    type: 'isometric',
    distance: 10,
    height: 10,
    angle: 45,
    smoothing: 1,
  },
};

// Particle effects system
export interface ParticleEffect {
  id: string;
  type: 'spell' | 'damage' | 'healing' | 'death' | 'celebration';
  position: { x: number; y: number; z: number };
  color: string;
  lifetime: number; // ms
  particleCount: number;
  emission: {
    speed: number;
    spread: number;
  };
}

export function createSpellEffect(
  spellName: string,
  position: { x: number; y: number; z: number }
): ParticleEffect {
  const effects: Record<string, Partial<ParticleEffect>> = {
    stupefy: {
      color: '#FF6B6B',
      particleCount: 20,
      lifetime: 800,
      emission: { speed: 5, spread: 30 },
    },
    expecto_patronum: {
      color: '#FFD93D',
      particleCount: 50,
      lifetime: 1200,
      emission: { speed: 8, spread: 45 },
    },
    incendio: {
      color: '#FF8C42',
      particleCount: 40,
      lifetime: 1000,
      emission: { speed: 6, spread: 35 },
    },
  };

  const baseEffect = effects[spellName.toLowerCase()] || {
    color: '#FFFFFF',
    particleCount: 15,
    lifetime: 600,
    emission: { speed: 4, spread: 25 },
  };

  return {
    id: `effect_${Date.now()}`,
    type: 'spell',
    position,
    lifetime: baseEffect.lifetime || 600,
    particleCount: baseEffect.particleCount || 15,
    emission: baseEffect.emission || { speed: 4, spread: 25 },
    color: baseEffect.color || '#FFFFFF',
  };
}
