# Magical Academy - 3D Wizard RPG

## Game Overview

Welcome to the Magical Academy, an immersive 3D wizard RPG built with Next.js 16, React Three Fiber, and real-time multiplayer capabilities. Create your wizard character, get sorted into a house, master spells through gesture-based casting, and embark on epic quests across a magical realm.

## Core Game Systems

### 1. Authentication & Character Management
- **Sign Up / Sign In**: Create accounts and manage multiple characters
- **Character Creation**: Name your character, get sorted into a house based on personality
- **House System**: Four houses (Valor, Cunning, Harmony, Wisdom) with unique traits
- **Pet Selection**: Choose from Owl, Cat, Toad, or Rat as your companion
- **Wand Customization**: Select wand core, wood, and length

### 2. Dynamic House Sorting
- **5-Question Sorting Quiz**: Answer questions that reveal your personality
- **Attributes Tracked**: Bravery, Cunning, Loyalty, Wisdom
- **House Assignment**: Automatically sorted based on highest attribute
- **Persistent Storage**: House assignment saved to database

### 3. 3D World System
- **Academy Castle**: Main hub with training grounds
- **Forbidden Forest**: Dangerous exploration area with creatures
- **Magical Village**: NPCs and shops
- **Crystal Lake**: Mystery location
- **Ancient Ruins**: High-level exploration
- **Progressive Unlocking**: New locations unlock as you level up

### 4. Gesture-Based Spell Casting
- **Canvas Drawing System**: Draw gestures on screen to cast spells
- **Gesture Recognition**: Supports circle, upward, downward, leftward, rightward motions
- **Learned Spells**: 4 starter spells (Luminous, Protectus, Glacius, Inflamara)
- **Visual Feedback**: Real-time gesture feedback with start/end points
- **Spell Display**: View learned spells with gesture requirements

### 5. Quest System
- **Story Quests**: Main narrative progression
- **Side Quests**: Optional adventures for rewards
- **Tutorial Quests**: Learn game mechanics
- **Objectives**: Multi-step quest objectives with completion tracking
- **Rewards**: Experience, house points, and items

### 6. Combat & Creature Encounters
- **Creature Types**: 4 creatures with varying difficulty levels
  - Flobberworm (Difficulty 1)
  - Pixie (Difficulty 2)
  - Hippogriff (Difficulty 3)
  - Acromantula (Difficulty 4)
- **Battle System**: Cast learned spells to defeat creatures
- **Battle Log**: Track combat events in real-time
- **Progression**: Defeat creatures to earn experience

### 7. Character Progression
- **Levels**: Gain experience to level up
- **House Points**: Earn points for your house through achievements
- **Stats**: Health, Mana, Experience, Level
- **Persistent Data**: All progress saved to database

### 8. Inventory System
- **Item Collection**: Collect items throughout your adventure
- **Quest Rewards**: Earn special items from quests
- **Management**: Track inventory in character stats

## Game Flow

### First Time Experience
1. **Home Page**: Learn about the academy and sign in/up
2. **Character Creation**: Choose name, get sorted into house
3. **Pet & Wand Selection**: Customize your companion and wand
4. **Game Start**: Begin at Platform 9¾ train station
5. **Academy Castle**: Explore main hub and take tutorials

### Gameplay Loop
1. **World Navigation**: Move between locations
2. **Quest Selection**: Choose available quests
3. **Spell Casting**: Use gesture system to cast spells
4. **Creature Encounters**: Battle creatures in locations
5. **Progression**: Gain experience and unlock new areas
6. **Trading/Interaction**: Connect with NPCs (coming soon)

## Technical Stack

- **Frontend**: Next.js 16, React, TypeScript
- **3D Engine**: React Three Fiber, Three.js
- **State Management**: Zustand for client-side state
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with email/password
- **Styling**: Tailwind CSS
- **Gesture Recognition**: Canvas-based drawing engine

## Key Features Implemented

✓ User authentication with Better Auth
✓ Character creation with dynamic sorting
✓ 3D world with multiple locations
✓ Gesture-based spell casting system
✓ Quest tracking and progression
✓ Creature encounter system
✓ Player stats and progression
✓ House-based customization
✓ Persistent database storage
✓ Real-time UI updates

## Database Schema

### Core Tables
- `user`: Better Auth user table
- `session`: Authentication sessions
- `account`: OAuth accounts
- `verification`: Email verification

### Game Tables
- `playerCharacter`: Character data and stats
- `questProgress`: Quest tracking and completion
- `spellLearned`: Spell proficiency tracking
- `creatureEncounter`: Creature encounter history
- `locationVisited`: Location exploration tracking
- `playerInventory`: Item inventory management

## Future Enhancements

- Multiplayer PvP spell battles
- Trading system between players
- Seasonal events and limited-time quests
- NPC dialogue system
- Advanced 3D character models
- Pet customization and abilities
- Guild/House competitions
- Leaderboards
- In-app chat system
- Expanded spell library
- Boss encounters
- Puzzle dungeons

## How to Run

```bash
# Install dependencies
pnpm install

# Set up environment variables
# - DATABASE_URL (Neon PostgreSQL)
# - BETTER_AUTH_SECRET (random 32-char string)

# Run dev server
pnpm dev

# Open browser
http://localhost:3000
```

## Game Pages

- `/` - Home/Landing page
- `/sign-in` - Sign in page
- `/sign-up` - Create account
- `/character-creation` - Character creation flow
  - Name input
  - House sorting quiz
  - Pet and wand selection
  - Summary and confirmation
- `/game` - Main game interface
  - 3D world view
  - Spell casting canvas
  - Quest journal
  - Character stats
  - Battle log

## Credits

Built with inspiration from the Harry Potter universe, featuring original game mechanics and systems. This is a fan-created educational project demonstrating full-stack web development with 3D graphics and real-time multiplayer capabilities.

---

**Ready to begin your magical journey? Sign up and enter the academy!**
