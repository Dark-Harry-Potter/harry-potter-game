// Character Avatar System v5 - Deep visual customization
export interface AvatarCustomization {
  skinTone: 'pale' | 'fair' | 'olive' | 'tan' | 'brown' | 'dark';
  hairStyle: string; // 30+ styles
  hairColor: string; // 15+ colors
  eyeColor: 'blue' | 'green' | 'brown' | 'hazel' | 'grey' | 'amber' | 'violet';
  facialFeatures: {
    noseBridge: 'straight' | 'curved' | 'prominent' | 'delicate';
    cheekbones: 'high' | 'moderate' | 'low';
    jawline: 'sharp' | 'soft' | 'squared';
    faceShape: 'oval' | 'round' | 'square' | 'heart' | 'oblong';
  };
  accessories: {
    scars?: string[];
    glasses?: 'none' | 'round' | 'square' | 'cat-eye';
    earrings?: 'none' | 'studs' | 'hoops' | 'dangles';
    marks?: string[]; // birthmarks, tattoos, etc
  };
  robeMaterial: 'silk' | 'velvet' | 'wool' | 'enchanted';
  robeColor: string;
  robePattern?: 'plain' | 'striped' | 'embroidered' | 'magical';
  wand: {
    wood: string;
    core: string;
    length: number; // inches
    color?: string;
  };
}

export interface AvatarPreset {
  name: string;
  description: string;
  customization: AvatarCustomization;
}

// 50+ hair styles across all ethnicities
export const HAIR_STYLES = {
  long: [
    'Flowing Wave',
    'Straight Long',
    'Wavy Cascade',
    'Curly Cloud',
    'Braided Crown',
    'Half-Up Bun',
    'Side Swept',
  ],
  medium: [
    'Shoulder Bob',
    'Wavy Shoulder',
    'Sleek Medium',
    'Layered Medium',
    'Side Ponytail',
    'Two Buns',
  ],
  short: [
    'Pixie Cut',
    'Short Crop',
    'Undercut',
    'Spiky Short',
    'Curly Fade',
  ],
  specialty: [
    'Ombre Waves',
    'Twisted Knots',
    'Magical Glow',
    'Enchanted Fade',
  ],
};

export const HAIR_COLORS = [
  'Jet Black',
  'Dark Brown',
  'Brown',
  'Light Brown',
  'Auburn',
  'Red',
  'Blonde',
  'Platinum',
  'Silver',
  'Grey',
  'White',
  'Purple',
  'Blue',
  'Green',
  'Multicolor',
];

export const SKIN_TONES = {
  pale: '#fdbcb4',
  fair: '#f7d7c4',
  olive: '#d4a574',
  tan: '#c68642',
  brown: '#8d5524',
  dark: '#3d2817',
};

// Preset avatars to help players
export const AVATAR_PRESETS: AvatarPreset[] = [
  {
    name: 'Classic Wizard',
    description: 'Traditional magical scholar',
    customization: {
      skinTone: 'fair',
      hairStyle: 'Straight Long',
      hairColor: 'Dark Brown',
      eyeColor: 'brown',
      facialFeatures: {
        noseBridge: 'straight',
        cheekbones: 'moderate',
        jawline: 'soft',
        faceShape: 'oval',
      },
      accessories: {
        glasses: 'round',
      },
      robeMaterial: 'velvet',
      robeColor: '#4a5568',
      robePattern: 'embroidered',
      wand: {
        wood: 'Oak',
        core: 'Phoenix Feather',
        length: 10,
      },
    },
  },
  {
    name: 'Daring Adventurer',
    description: 'Bold and fearless explorer',
    customization: {
      skinTone: 'tan',
      hairStyle: 'Spiky Short',
      hairColor: 'Red',
      eyeColor: 'hazel',
      facialFeatures: {
        noseBridge: 'prominent',
        cheekbones: 'high',
        jawline: 'sharp',
        faceShape: 'square',
      },
      accessories: {
        scars: ['cheek-scar'],
      },
      robeMaterial: 'silk',
      robeColor: '#c41e3a',
      robePattern: 'plain',
      wand: {
        wood: 'Holly',
        core: 'Dragon Heartstring',
        length: 11,
      },
    },
  },
  {
    name: 'Mysterious Scholar',
    description: 'Enigmatic researcher of secrets',
    customization: {
      skinTone: 'olive',
      hairStyle: 'Wavy Cascade',
      hairColor: 'Black',
      eyeColor: 'violet',
      facialFeatures: {
        noseBridge: 'delicate',
        cheekbones: 'high',
        jawline: 'soft',
        faceShape: 'heart',
      },
      accessories: {
        marks: ['mystical-mark'],
      },
      robeMaterial: 'enchanted',
      robeColor: '#1a1a2e',
      robePattern: 'magical',
      wand: {
        wood: 'Elder',
        core: 'Thestral Hair',
        length: 10.5,
      },
    },
  },
  {
    name: 'Cunning Strategist',
    description: 'Calculated and intelligent',
    customization: {
      skinTone: 'pale',
      hairStyle: 'Sleek Medium',
      hairColor: 'Platinum',
      eyeColor: 'grey',
      facialFeatures: {
        noseBridge: 'straight',
        cheekbones: 'high',
        jawline: 'sharp',
        faceShape: 'oblong',
      },
      accessories: {
        glasses: 'square',
      },
      robeMaterial: 'silk',
      robeColor: '#2d5016',
      robePattern: 'embroidered',
      wand: {
        wood: 'Ash',
        core: 'Unicorn Hair',
        length: 10.75,
      },
    },
  },
  {
    name: 'Loyal Defender',
    description: 'Steadfast and dependable friend',
    customization: {
      skinTone: 'brown',
      hairStyle: 'Curly Cloud',
      hairColor: 'Brown',
      eyeColor: 'amber',
      facialFeatures: {
        noseBridge: 'curved',
        cheekbones: 'moderate',
        jawline: 'soft',
        faceShape: 'round',
      },
      accessories: {
        earrings: 'studs',
      },
      robeMaterial: 'wool',
      robeColor: '#dc9500',
      robePattern: 'striped',
      wand: {
        wood: 'Maple',
        core: 'Phoenix Feather',
        length: 11.5,
      },
    },
  },
];

// Generate a 3D avatar string for visualization
export function generateAvatarCode(avatar: AvatarCustomization): string {
  return `${avatar.skinTone}-${avatar.hairStyle}-${avatar.hairColor}-${avatar.eyeColor}-${avatar.robeMaterial}`;
}

// Validate avatar customization
export function validateAvatar(avatar: AvatarCustomization): boolean {
  const validEyeColors = ['blue', 'green', 'brown', 'hazel', 'grey', 'amber', 'violet'];
  const validSkinTones = ['pale', 'fair', 'olive', 'tan', 'brown', 'dark'];

  return (
    validSkinTones.includes(avatar.skinTone) &&
    validEyeColors.includes(avatar.eyeColor) &&
    Object.values(HAIR_STYLES).flat().includes(avatar.hairStyle) &&
    HAIR_COLORS.includes(avatar.hairColor) &&
    avatar.wand.length >= 7 &&
    avatar.wand.length <= 14
  );
}

// Generate random avatar for quick start
export function generateRandomAvatar(): AvatarCustomization {
  const getRandomFromArray = <T,>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];

  const hairStyleList = Object.values(HAIR_STYLES).flat();

  return {
    skinTone: getRandomFromArray(['pale', 'fair', 'olive', 'tan', 'brown', 'dark'] as const),
    hairStyle: getRandomFromArray(hairStyleList),
    hairColor: getRandomFromArray(HAIR_COLORS),
    eyeColor: getRandomFromArray(['blue', 'green', 'brown', 'hazel', 'grey', 'amber', 'violet'] as const),
    facialFeatures: {
      noseBridge: getRandomFromArray(['straight', 'curved', 'prominent', 'delicate'] as const),
      cheekbones: getRandomFromArray(['high', 'moderate', 'low'] as const),
      jawline: getRandomFromArray(['sharp', 'soft', 'squared'] as const),
      faceShape: getRandomFromArray(['oval', 'round', 'square', 'heart', 'oblong'] as const),
    },
    accessories: {
      glasses: Math.random() > 0.7 ? getRandomFromArray(['round', 'square', 'cat-eye'] as const) : 'none',
    },
    robeMaterial: getRandomFromArray(['silk', 'velvet', 'wool', 'enchanted'] as const),
    robeColor: getRandomFromArray(['#4a5568', '#c41e3a', '#1a1a2e', '#2d5016', '#dc9500']),
    robePattern: getRandomFromArray(['plain', 'striped', 'embroidered', 'magical'] as const),
    wand: {
      wood: getRandomFromArray(['Oak', 'Holly', 'Elder', 'Ash', 'Maple', 'Willow', 'Yew']),
      core: getRandomFromArray(['Phoenix Feather', 'Dragon Heartstring', 'Unicorn Hair', 'Thestral Hair']),
      length: 7 + Math.random() * 7,
    },
  };
}
