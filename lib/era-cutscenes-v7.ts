// Era Cutscene System v7 - Cinematic Backstory for Each Era
// Shows character origin story and sets context for era
// Player starts at age 11 in Founders Era

export interface Cutscene {
  eraId: string;
  title: string;
  duration: number; // in seconds
  scenes: CutsceneScene[];
  characterAge: number;
  characterBackstory: string;
  narratorVoice: string;
}

export interface CutsceneScene {
  sceneId: string;
  duration: number;
  narration: string;
  visualDescription: string;
  cameraMovement: string;
  ambientSound: string;
  music: string;
}

export const ERA_CUTSCENES = {
  founders: {
    eraId: 'founders',
    title: "The Beginning",
    duration: 180,
    characterAge: 11,
    characterBackstory: `You are a young wizard from a noble family, recently discovered to have magical abilities. 
    Your parents have sent you to Hogwarts School of Witchcraft and Wizardry, 
    where the legendary Founders are still alive, guiding the school's earliest years.
    You arrive at the gates of Hogwarts, ready to begin your magical education in this golden age of wizardry.`,
    narratorVoice: 'Wise Elder',
    scenes: [
      {
        sceneId: 'founders_1',
        duration: 45,
        narration: `"In the year 1000, the great wizarding school stood not as it does today, 
        but as a vision brought to life by four legendary wizards—Godric, Helga, Rowena, and Salazar. 
        You arrive as one of its first students, destined to shape its future."`,
        visualDescription: 'Ancient Hogwarts materializing from fog, stone towers rising, magical auras glowing',
        cameraMovement: 'Slow zoom through castle gates, cinematic pan across grounds',
        ambientSound: 'Mystical wind, distant magic crackling',
        music: 'Orchestral, grand theme with ancient flutes',
      },
      {
        sceneId: 'founders_2',
        duration: 60,
        narration: `"Your family has prepared you well. Years of hidden magic lessons, whispered about in candlelit rooms. 
        But now, you step into a world where magic is celebrated, where your gifts will flourish or wither. 
        The Sorting Ceremony awaits. Your house will define your bonds, your rivalries, your very destiny."`,
        visualDescription: 'Character as child, sitting in family home, magical books glowing, then standing at Sorting Hat',
        cameraMovement: 'Flashback sequence, then transition to ceremony',
        ambientSound: 'Crackling fireplace, children chattering nervously, Sorting Hat voice',
        music: 'Mysterious, building tension with warmth',
      },
      {
        sceneId: 'founders_3',
        duration: 75,
        narration: `"The Founders have built something eternal. A place where magic transcends bloodline, 
        where courage and cunning, loyalty and wisdom are celebrated equally. 
        You are among the first to walk these halls. What mark will you leave on history?"`,
        visualDescription: 'Character in house robes, walking through candlelit corridors, meeting other students, Founders greeting newcomers',
        cameraMovement: 'Third-person follow camera, reverent pans of castle interiors',
        ambientSound: 'Footsteps on stone, distant conversations, magical ambience',
        music: 'Hopeful, triumphant orchestral score',
      },
    ],
  },

  marauders: {
    eraId: 'marauders',
    title: "The Era of Secrets",
    duration: 160,
    characterAge: 11,
    characterBackstory: `Years have passed. The wizarding world has evolved. You now arrive at Hogwarts in the 1970s, 
    during a time of hidden conflicts and remarkable friendships. Four boys—James, Sirius, Remus, and Peter—
    will define this era through their mischief, loyalty, and secret magic.
    Your story intertwines with theirs, though none know what you will become.`,
    narratorVoice: 'Mysterious Observer',
    scenes: [
      {
        sceneId: 'marauders_1',
        duration: 50,
        narration: `"The 1970s. An era of turmoil and joy, danger and friendship. 
        The Dark Lord's power grows in shadows, yet Hogwarts remains a beacon of hope and mischief. 
        You arrive knowing none of this yet, innocent of the dangers ahead."`,
        visualDescription: 'Misty 1970s Hogwarts, autumn leaves, students in period-appropriate robes, Marauders visible in distance',
        cameraMovement: 'Sweeping establishing shots, cinematic arrival at Platform 9¾',
        ambientSound: 'Train whistle, bustling station, magic crackling subtly',
        music: '1970s inspired orchestral with slight rock undertones',
      },
      {
        sceneId: 'marauders_2',
        duration: 60,
        narration: `"Four friends will change everything. James Potter, arrogant yet noble. Sirius Black, wild and daring. 
        Remus Lupin, quiet and careful. Peter Pettigrew, overlooked but present. Together, they discover magic beyond magic—
        the transformation magic that will define their legacy."`,
        visualDescription: 'Marauders meeting, practicing spells in forbidden locations, transforming into animals (Animagi)',
        cameraMovement: 'Dynamic action sequences, slow-motion spell casting',
        ambientSound: 'Magical transformations, whispered incantations, adventure music',
        music: 'Adventurous, youthful, with hints of danger',
      },
      {
        sceneId: 'marauders_3',
        duration: 50,
        narration: `"You will meet them. You will choose sides. Friendship or rivalry? Loyalty or ambition? 
        Your choices now will ripple through time itself."`,
        visualDescription: 'Character meeting the Marauders in various locations, choices displayed as branching paths',
        cameraMovement: 'First-person perspective moments, choices highlighted',
        ambientSound: 'Magical ambience, heartbeat building',
        music: 'Intense, uncertain, building to climax',
      },
    ],
  },

  potter: {
    eraId: 'potter',
    title: "The Boy Who Lived",
    duration: 200,
    characterAge: 11,
    characterBackstory: `Two decades have passed since the Marauders' time. The Dark Lord has risen and fallen catastrophically. 
    A young boy, Harry Potter, survived an impossible curse and became a legend. 
    You now arrive at Hogwarts in 1991, in the same year as this famous child.
    Your story will intersect with prophecy, with darkness, with the fight for the very soul of the wizarding world.`,
    narratorVoice: 'Dumbledore\'s Echo',
    scenes: [
      {
        sceneId: 'potter_1',
        duration: 60,
        narration: `"Eleven years ago, a child survived the unsurvivable. The Dark Lord's greatest creation met its match. 
        Now that child sits in our Great Hall for the first time. And you, equally unknown, equally full of potential, 
        sit beside destiny without knowing it."`,
        visualDescription: 'Harry Potter arriving at Hogwarts, crowds welcoming him, character arriving unnoticed',
        cameraMovement: 'Contrasting shots: famous arrival vs humble arrival',
        ambientSound: 'Whispers, excitement, magical hum',
        music: 'Iconic Harry Potter theme with new character motif woven in',
      },
      {
        sceneId: 'potter_2',
        duration: 80,
        narration: `"Dark forces stir. The Dark Lord, though defeated, left darkness in his wake. Horcruxes hide in shadows. 
        Prophecies whisper of blood debts unpaid. This is not a gentle era. This is an era where children must become warriors."`,
        visualDescription: 'Shadows in Forbidden Forest, Dark Mark in sky, ancient magic coiling, Voldemort\'s presence hinted',
        cameraMovement: 'Ominous pans, oppressive angles, horror movie cinematography',
        ambientSound: 'Unsettling sounds, whispers, magical disturbances',
        music: 'Dark, foreboding, mixing classical with sinister undertones',
      },
      {
        sceneId: 'potter_3',
        duration: 60,
        narration: `"Your choices here will matter more than you know. Will you stand with Harry? Against him? For your own survival? 
        In this era, every decision shapes not just your fate, but the fate of the wizarding world itself."`,
        visualDescription: 'Character facing multiple paths, Harry Potter in various situations, choices visibly branching',
        cameraMovement: 'Choice-focused cinematography, slow-motion decision moments',
        ambientSound: 'Heartbeat, magical resonance, time bending sound',
        music: 'Tense, with multiple musical themes representing different choices',
      },
    ],
  },

  cursedchild: {
    eraId: 'cursedchild',
    title: "Time's Curse",
    duration: 190,
    characterAge: 11, // Story ages character through the cutscene
    characterBackstory: `Harry defeated the Dark Lord. Peace came. But not all wounds heal. A curse binds two boys across time—
    Albus Potter and Scorpius Malfoy. They meddle with time itself, creating alternate timelines where Voldemort never fell.
    You arrive at Hogwarts in an era where magic itself is fractured, where time bleeds, where reality bends.
    The rules you knew no longer apply.`,
    narratorVoice: 'Temporal Narrator',
    scenes: [
      {
        sceneId: 'cursedchild_1',
        duration: 50,
        narration: `"Nineteen years after victory, the world seems peaceful. Harry Potter's son arrives at Hogwarts, 
        expected to follow in his father's footsteps. But expectations and destiny are not the same thing."`,
        visualDescription: 'Contemporary Hogwarts, 2020s style, Albus arriving, peaceful scenes',
        cameraMovement: 'Modern, clean cinematography, bright colors',
        ambientSound: 'Contemporary magical ambience, students chatting',
        music: 'Modern orchestral, hopeful but with hidden melancholy',
      },
      {
        sceneId: 'cursedchild_2',
        duration: 80,
        narration: `"A secret plot unfolds. Time-turners, ancient magic, the Triwizard Tournament twisted into a weapon. 
        Alternate timelines flicker into being. In one, Voldemort never died. In another, the world fell to darkness. 
        And you—you are caught between worlds, between possibilities."`,
        visualDescription: 'Reality fracturing, timelines overlapping, Voldemort winning scenarios visible, temporal distortions',
        cameraMovement: 'Glitching camera, multiple realities visible simultaneously, unsettling perspective shifts',
        ambientSound: 'Time distortion sounds, reality tearing, multiple musical themes overlapping',
        music: 'Dissonant, experimental, representing broken timelines',
      },
      {
        sceneId: 'cursedchild_3',
        duration: 60,
        narration: `"In this era, you must navigate fractured reality. Every choice could seal a timeline. 
        Will you restore the original past? Create a better future? Or watch as everything collapses?"`,
        visualDescription: 'Character navigating between timelines, making crucial decisions, magic flowing strangely',
        cameraMovement: 'Reality solidifying with choices, timeline becoming fixed',
        ambientSound: 'Magic settling, timeline locking in, destiny sound',
        music: 'Resolving from chaos to clarity with player\'s choice',
      },
    ],
  },

  jamesporter: {
    eraId: 'jamesporter',
    title: "Legacy Awakens",
    duration: 170,
    characterAge: 11,
    characterBackstory: `The timeline has been restored. The next generation inherits a world won by blood and sacrifice. 
    Albus Potter, Scorpius Malfoy, and their friends must find their own paths. James Potter—Harry's oldest son—
    arrives at Hogwarts with expectations that would crush lesser wizards.
    You are among his generation. What mark will you leave on this post-war world?`,
    narratorVoice: 'Legacy Keeper',
    scenes: [
      {
        sceneId: 'jamesporter_1',
        duration: 50,
        narration: `"The war is over. The scars remain. Harry Potter's generation sacrificed everything for peace. 
        Now their children inherit not just magic, but responsibility. James Potter arrives at Hogwarts 
        expected to honor his father's legacy. Will he embrace it or forge his own path?"`,
        visualDescription: 'Hogwarts in peaceful times, memorials to the fallen, students in contemporary robes, James arriving',
        cameraMovement: 'Respectful, honoring cinematography, slow established shots',
        ambientSound: 'Solemn yet hopeful ambience, commemorative sounds',
        music: 'Honoring fallen, yet hopeful for future',
      },
      {
        sceneId: 'jamesporter_2',
        duration: 70,
        narration: `"But darkness never truly dies. It only waits. Ancient families plot, blood feuds resurface, 
        and a new generation discovers that peace is fragile, that legacy is a burden, 
        and that choice is more important than bloodline."`,
        visualDescription: 'Family politics, ancient magic returning, mysterious threats emerging, James and friends discovering conspiracies',
        cameraMovement: 'Intrigue-focused, revealing hidden agendas, mysterious camera work',
        ambientSound: 'Whispered plots, magical tension building',
        music: 'Mysterious, with themes of inheritance and burden',
      },
      {
        sceneId: 'jamesporter_3',
        duration: 50,
        narration: `"You will help write this new chapter. Will you fight to preserve the legacy? Challenge it? 
        Transcend it entirely? The James Potter era belongs to those brave enough to define it."`,
        visualDescription: 'Character and James making crucial decisions, foundations of next adventure being laid',
        cameraMovement: 'Empowering cinematography, character centered, choices visible',
        ambientSound: 'Magic resonating with potential, future sounds',
        music: 'Adventurous, hopeful, new beginnings',
      },
    ],
  },

  rational: {
    eraId: 'rational',
    title: "The Age of Reason",
    duration: 180,
    characterAge: 11,
    characterBackstory: `In a world where Voldemort's darkness prevailed, wizarding society transformed. 
    Magic could not be conquered by conventional means, so wizards turned to empirical research, 
    systematic study, and rational thought. Hogwarts Academy of Magical Sciences teaches not tradition, 
    but discovery. You are a student in this dark timeline's brightest hope—that understanding magic 
    through science might someday free the wizarding world from tyranny.`,
    narratorVoice: 'Rational Researcher',
    scenes: [
      {
        sceneId: 'rational_1',
        duration: 50,
        narration: `"In this timeline, Harry Potter fell. The Dark Lord's regime rules with iron will. 
        Magic became systematized, studied, weaponized. In secret laboratories and underground academies, 
        resistance fighters teach the next generation that knowledge is the only true freedom."`,
        visualDescription: 'Dark oppressive Hogwarts transformed into research facility, underground hideout, surveillance, controlled magic',
        cameraMovement: 'Dystopian angles, oppressive framing, hope flickering in darkness',
        ambientSound: 'Mechanical sounds mixed with magic, surveillance, whispered resistance',
        music: 'Dark, industrial, with undertones of hope and defiance',
      },
      {
        sceneId: 'rational_2',
        duration: 80,
        narration: `"Crimson Thread watches from beyond death—a ghost who died for the resistance, 
        now guiding from the ethereal realm. Your studies focus on understanding magic at its core. 
        Transmutation, elemental theory, consciousness projection. Every discovery is a weapon against tyranny."`,
        visualDescription: 'Crimson Thread appearing as ghostly mentor, advanced research equipment, students experimenting with spells scientifically',
        cameraMovement: 'Mystical yet technical, balancing science and magic cinematography',
        ambientSound: 'Magical research sounds, Crimson Thread\'s ethereal voice, experimental magic',
        music: 'Mysterious yet technological, resistance anthem underlying',
      },
      {
        sceneId: 'rational_3',
        duration: 50,
        narration: `"You will become a researcher, perhaps a revolutionary. Every spell you master, 
        every principle you understand, brings hope to the oppressed. In this darkest timeline, 
        you are a light. Will you burn bright enough to change the world?"`,
        visualDescription: 'Character mastering complex magic through research, joining resistance network, hope spreading',
        cameraMovement: 'Inspiring cinematography, character as hero despite darkness',
        ambientSound: 'Magic power building, resistance gathering strength',
        music: 'Building hope, inspiring, revolutionary spirit',
      },
    ],
  },
};

// Function to get cutscene for an era
export function getEraCutscene(eraId: string): Cutscene | null {
  return ERA_CUTSCENES[eraId as keyof typeof ERA_CUTSCENES] || null;
}

// Function to generate character starting stats based on cutscene backstory
export function getCharacterStartingAge(eraId: string): number {
  return 11; // All eras start player at age 11
}

// Function to generate backstory narrative text for character profile
export function generateCharacterBackstory(
  eraId: string,
  characterName: string,
  selectedHouse: string
): string {
  const cutscene = getEraCutscene(eraId);
  if (!cutscene) return '';

  return `${characterName}, a ${selectedHouse} student entering Hogwarts at age 11. ${cutscene.characterBackstory}`;
}

// Cutscene playback duration calculation
export function calculateCutsceneDuration(eraId: string): number {
  const cutscene = getEraCutscene(eraId);
  return cutscene ? cutscene.duration : 0;
}
