// Game Constants and Data

export const HOUSES = {
  VALOR: { id: 'valor', name: 'Valor', color: 'from-red-600 to-red-700', emblem: '🦁' },
  CUNNING: { id: 'cunning', name: 'Cunning', color: 'from-green-600 to-green-700', emblem: '🐍' },
  HARMONY: { id: 'harmony', name: 'Harmony', color: 'from-yellow-600 to-yellow-700', emblem: '🦡' },
  WISDOM: { id: 'wisdom', name: 'Wisdom', color: 'from-blue-600 to-blue-700', emblem: '🦅' },
}

export const PETS = [
  { id: 'owl', name: 'Owl', icon: '🦉' },
  { id: 'cat', name: 'Cat', icon: '🐈' },
  { id: 'toad', name: 'Toad', icon: '🐸' },
  { id: 'rat', name: 'Rat', icon: '🐭' },
]

export const WAND_CORES = ['Phoenix Feather', 'Dragon Heartstring', 'Unicorn Hair', 'Basilisk Scale']
export const WAND_WOODS = ['Oak', 'Ash', 'Elder', 'Holly', 'Hawthorn', 'Birch']
export const WAND_LENGTHS = [9, 10, 11, 12, 13, 14, 15]

export const LOCATIONS = {
  CASTLE: {
    id: 'castle',
    name: 'Academy Castle',
    description: 'The grand castle of the magical academy',
    type: 'hub',
  },
  FORBIDDEN_FOREST: {
    id: 'forbidden-forest',
    name: 'Forbidden Forest',
    description: 'A mysterious and dangerous woodland',
    type: 'exploration',
  },
  VILLAGE: {
    id: 'village',
    name: 'Magical Village',
    description: 'A quaint village with shops and taverns',
    type: 'hub',
  },
  TRAIN_STATION: {
    id: 'train-station',
    name: 'Platform 9¾',
    description: 'The departure point for the magical academy',
    type: 'story',
  },
}

export const SPELLS = [
  {
    id: 'luminous',
    name: 'Luminous',
    description: 'Creates a bright light',
    gesture: 'circle',
    element: 'light',
  },
  {
    id: 'shield',
    name: 'Protectus',
    description: 'Creates a protective barrier',
    gesture: 'upward',
    element: 'protection',
  },
  {
    id: 'freeze',
    name: 'Glacius',
    description: 'Freezes objects or creatures',
    gesture: 'downward',
    element: 'cold',
  },
  {
    id: 'flame',
    name: 'Inflamara',
    description: 'Shoots a burst of flame',
    gesture: 'rightward',
    element: 'fire',
  },
]

export const CREATURES = [
  {
    id: 'flobberworm',
    name: 'Flobberworm',
    icon: '🪱',
    difficulty: 1,
    health: 10,
  },
  {
    id: 'pixie',
    name: 'Pixie',
    icon: '✨',
    difficulty: 2,
    health: 15,
  },
  {
    id: 'hippogriff',
    name: 'Hippogriff',
    icon: '🦅',
    difficulty: 3,
    health: 25,
  },
  {
    id: 'acromantula',
    name: 'Acromantula',
    icon: '🕷️',
    difficulty: 4,
    health: 40,
  },
]

export const SORTING_QUESTIONS = [
  {
    id: 'challenge',
    question: 'When faced with an impossible challenge, you:',
    answers: [
      { text: 'Face it head-on with courage', attribute: 'bravery', value: 10 },
      { text: 'Find a clever workaround', attribute: 'cunning', value: 10 },
      { text: 'Ask others for help', attribute: 'loyalty', value: 10 },
      { text: 'Study and prepare carefully', attribute: 'wisdom', value: 10 },
    ],
  },
  {
    id: 'moral',
    question: 'What matters most to you?',
    answers: [
      { text: 'Honor and bravery', attribute: 'bravery', value: 10 },
      { text: 'Ambition and success', attribute: 'cunning', value: 10 },
      { text: 'Loyalty to friends', attribute: 'loyalty', value: 10 },
      { text: 'Knowledge and truth', attribute: 'wisdom', value: 10 },
    ],
  },
  {
    id: 'conflict',
    question: 'In a conflict with a friend, you would:',
    answers: [
      { text: 'Stand firm in your conviction', attribute: 'bravery', value: 10 },
      { text: 'Use persuasion strategically', attribute: 'cunning', value: 10 },
      { text: 'Value the friendship most', attribute: 'loyalty', value: 10 },
      { text: 'Listen and understand both sides', attribute: 'wisdom', value: 10 },
    ],
  },
  {
    id: 'power',
    question: 'If you had great power, you would:',
    answers: [
      { text: 'Use it to protect others', attribute: 'bravery', value: 10 },
      { text: 'Use it to advance yourself', attribute: 'cunning', value: 10 },
      { text: 'Use it to help those you care about', attribute: 'loyalty', value: 10 },
      { text: 'Use it to discover new things', attribute: 'wisdom', value: 10 },
    ],
  },
  {
    id: 'fear',
    question: 'Your greatest fear is:',
    answers: [
      { text: 'Being a coward', attribute: 'bravery', value: 10 },
      { text: 'Losing your influence', attribute: 'cunning', value: 10 },
      { text: 'Betraying loved ones', attribute: 'loyalty', value: 10 },
      { text: 'Ignorance and mistakes', attribute: 'wisdom', value: 10 },
    ],
  },
]
