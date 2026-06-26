// Era-Specific Dungeon Styling v6
// Same layout, different visual appearance per era

export interface DungeonStyle {
  era: string;
  walls: {
    color: string;
    texture: string;
    torches: boolean;
    glowType: string;
  };
  floor: {
    material: string;
    color: string;
    wear: string;
  };
  decorations: string[];
  ambiance: {
    lighting: string;
    soundscape: string;
    particleEffects: string[];
  };
  description: string;
}

export const ERA_DUNGEON_STYLES: Record<string, DungeonStyle> = {
  founders: {
    era: 'founders',
    walls: {
      color: '#4a3f35',
      texture: 'rough_stone_ancient',
      torches: true,
      glowType: 'firelight',
    },
    floor: {
      material: 'ancient_stone',
      color: '#3d342d',
      wear: 'heavily_worn',
    },
    decorations: [
      'Carved founder symbols on walls',
      'Ancient wooden beams',
      'Glowing rune stones',
      'Medieval torture devices (historical)',
      'Tapestries with founder sigils',
      'Stone gargoyles',
    ],
    ambiance: {
      lighting: 'flickering_torchlight',
      soundscape: 'wind_howling_distant_magic',
      particleEffects: [
        'dust_particles',
        'ethereal_blue_orbs',
        'ancient_mist',
      ],
    },
    description:
      'The oldest dungeon, carved from living rock by the founders themselves. Magic hums through ancient stone.',
  },

  marauders: {
    era: 'marauders',
    walls: {
      color: '#5c5752',
      texture: 'worn_stone_moss',
      torches: true,
      glowType: 'magical_blue_flames',
    },
    floor: {
      material: 'stone_with_moss',
      color: '#4a4540',
      wear: 'slightly_worn',
    },
    decorations: [
      'Map of Marauders scratched into walls',
      'Enchanted locks on doors',
      'Older house colors fading on banners',
      'Prisoner cells (from Azkaban references)',
      'Animagus transformation circles marked on floor',
      'Graffiti from student pranks',
    ],
    ambiance: {
      lighting: 'blue_magical_flames',
      soundscape: 'echoing_footsteps_distant_spells',
      particleEffects: [
        'blue_sparks',
        'shifting_shadows',
        'faint_whispers',
      ],
    },
    description:
      'The dungeon from the 1970s, where the Marauders once roamed. Magic feels mischievous here.',
  },

  potter: {
    era: 'potter',
    walls: {
      color: '#6b6560',
      texture: 'maintained_stone',
      torches: false,
      glowType: 'enchanted_crystals',
    },
    floor: {
      material: 'polished_stone',
      color: '#595450',
      wear: 'well_maintained',
    },
    decorations: [
      'House banners hanging with pride',
      'Shelves with magical artifacts',
      'Dueling platforms',
      'Illuminated crystal globes',
      'Recent carvings: memories of battles',
      'Portraits of recent heroes',
    ],
    ambiance: {
      lighting: 'glowing_crystal_orbs',
      soundscape: 'ambient_magic_energy',
      particleEffects: [
        'golden_dust',
        'purple_spell_residue',
        'defensive_ward_shimmer',
      ],
    },
    description:
      'The dungeons of the 1990s, home to intense duels and pivotal moments. Danger still lingers in the air.',
  },

  cursedchild: {
    era: 'cursedchild',
    walls: {
      color: '#7a7066',
      texture: 'reinforced_stone_runes',
      torches: false,
      glowType: 'temporal_shimmer',
    },
    floor: {
      material: 'enchanted_stone',
      color: '#6b625d',
      wear: 'restored',
    },
    decorations: [
      'Time-worn symbols glowing faintly',
      'Temporal portals inactive on walls',
      'Scorch marks from alternate timelines',
      'New generation graffiti mixed with old',
      'Plaques honoring fallen wizards',
      'Advanced protective enchantments visible',
    ],
    ambiance: {
      lighting: 'shimmering_temporal_light',
      soundscape: 'time_distortion_echoes',
      particleEffects: [
        'temporal_rifts',
        'causality_ripples',
        'chrono_dust',
      ],
    },
    description:
      'Dungeons touched by time magic. Threads of different timelines are visible if you know where to look.',
  },

  jamesporter: {
    era: 'jamesporter',
    walls: {
      color: '#8a8277',
      texture: 'modern_stone_runes',
      torches: false,
      glowType: 'refined_magic',
    },
    floor: {
      material: 'modern_enchanted_stone',
      color: '#7b726d',
      wear: 'recently_restored',
    },
    decorations: [
      'New house banners of next generation',
      'Innovative magical architecture',
      'Ancestor portraits with living eyes',
      'Legacy challenges marked on walls',
      'Contemporary artwork',
      'Advanced protective wards',
    ],
    ambiance: {
      lighting: 'refined_magical_glow',
      soundscape: 'steady_magical_hum',
      particleEffects: [
        'legacy_light_trails',
        'ancestral_wisps',
        'power_resonance',
      ],
    },
    description:
      'The dungeons of a new era. Ancient and modern magic blend seamlessly here.',
  },

  rational: {
    era: 'rational',
    walls: {
      color: '#9a9187',
      texture: 'research_carved_stone',
      torches: false,
      glowType: 'scientific_luminescence',
    },
    floor: {
      material: 'analyzed_enchanted_stone',
      color: '#8b827d',
      wear: 'meticulously_maintained',
    },
    decorations: [
      'Elaborate experimental apparatus',
      'Spell formulas carved into stone',
      'Research notes and diagrams everywhere',
      'Scientific instruments hanging on walls',
      'Evidence of careful magical experiments',
      'Clean, organized magical circles',
    ],
    ambiance: {
      lighting: 'controlled_scientific_light',
      soundscape: 'ambient_experimental_hum',
      particleEffects: [
        'controlled_spell_particles',
        'formula_glyphs_floating',
        'precision_energy_flows',
      ],
    },
    description:
      'The dungeons transformed into research laboratories. Every shadow hides discovery and measured inquiry.',
  },
};

// Get dungeon style for an era
export function getDungeonStyle(era: string): DungeonStyle {
  return ERA_DUNGEON_STYLES[era] || ERA_DUNGEON_STYLES.potter;
}

// Generate CSS for dungeon appearance
export function generateDungeonCSS(era: string): string {
  const style = getDungeonStyle(era);

  return `
    .dungeon-container {
      background-color: ${style.walls.color};
      background-image: url('/textures/${style.walls.texture}.png');
      background-size: 256px 256px;
    }

    .dungeon-floor {
      background-color: ${style.floor.color};
      background-image: url('/textures/${style.floor.material}.png');
      box-shadow: inset 0 10px 30px rgba(0, 0, 0, 0.8);
    }

    .dungeon-lighting {
      filter: ${generateLightingFilter(style.ambiance.lighting)};
    }

    .dungeon-particles {
      animation: ${style.ambiance.particleEffects[0]} 4s ease-in-out infinite;
    }

    .dungeon-decoration {
      opacity: 0.85;
      filter: drop-shadow(0 0 10px ${getDominantColor(era)});
    }
  `;
}

// Generate lighting filter based on era
function generateLightingFilter(lightingType: string): string {
  const filters: Record<string, string> = {
    flickering_torchlight:
      'saturate(0.9) brightness(0.85) drop-shadow(0 0 20px rgba(255, 140, 0, 0.4))',
    blue_magical_flames:
      'saturate(1.1) brightness(0.9) drop-shadow(0 0 25px rgba(100, 150, 255, 0.5))',
    glowing_crystal_orbs:
      'saturate(1) brightness(0.95) drop-shadow(0 0 30px rgba(200, 200, 255, 0.3))',
    temporal_shimmer:
      'saturate(0.8) brightness(0.9) drop-shadow(0 0 35px rgba(150, 100, 255, 0.4)) hue-rotate(15deg)',
    refined_magical_glow:
      'saturate(0.95) brightness(1) drop-shadow(0 0 40px rgba(200, 180, 255, 0.35))',
    scientific_luminescence:
      'saturate(0.7) brightness(1.05) drop-shadow(0 0 45px rgba(100, 200, 255, 0.3))',
  };

  return filters[lightingType] || filters.glowing_crystal_orbs;
}

// Get dominant color for an era
function getDominantColor(era: string): string {
  const colors: Record<string, string> = {
    founders: 'rgba(255, 100, 0, 0.5)', // Fiery orange
    marauders: 'rgba(100, 150, 255, 0.5)', // Magical blue
    potter: 'rgba(200, 200, 255, 0.4)', // Cool white-blue
    cursedchild: 'rgba(150, 100, 255, 0.4)', // Purple time magic
    jamesporter: 'rgba(200, 180, 255, 0.35)', // Elegant lavender
    rational: 'rgba(100, 200, 255, 0.3)', // Scientific cyan
  };

  return colors[era] || colors.potter;
}

// Get dungeon description for UI
export function getDungeonDescription(era: string): string {
  return getDungeonStyle(era).description;
}

// Get ambient soundscape for dungeon
export function getDungeonSoundscape(era: string): string {
  return getDungeonStyle(era).ambiance.soundscape;
}
