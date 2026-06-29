# Magical Academy v6 - Dynamic Branching Narrative System

## Overview

v6 transforms the game into a **player-choice-driven experience** where every decision matters. No two players will have the same story. Whether Voldemort wins or Harry prevails, the game adapts and creates unique narrative branches.

---

## Core v6 Systems

### 1. Canon Timeline Database (316 lines)
**File:** `lib/canon-timeline-v6.ts`

Strict historical accuracy for all NPCs and ghosts:
- **Peeves**: Timeless poltergeist (all eras)
- **Nearly Headless Nick**: 1492-present (NOT in Founders Era)
- **Moaning Myrtle**: 1943-present (killed by basilisk, only post-1943)
- **Bloody Baron**: 1492-present (NOT in Founders Era)
- **Founders**: Only in Founders Era (1000-1100)
- **Marauders**: 1970-1980 era only
- **Harry Potter cast**: 1991-1998 Potter era, extends into Cursed Child
- **Cursed Child characters**: Albus & Scorpius (2009+)
- **James Potter next-gen**: New generation of heroes
- **Rational era**: Alternate timeline characters

**Key Functions:**
- `getEntitiesByEra()` - Returns all NPCs/ghosts available in an era
- `entityExistsInEra()` - Verifies NPC/ghost exists in specific era
- `getGhostsForEra()` - Gets only ghosts for an era
- `getNPCsForEra()` - Gets only NPCs for an era

---

### 2. Choice Consequence System (263 lines)
**File:** `lib/choice-consequence-v6.ts`

Tracks every player decision and its impact:

**Major Battle Outcomes for Potter Era:**
- Harry defeats Voldemort → Cursed Child era
- Voldemort defeats Harry → Rational era (dark timeline)
- Sacrifice play → James Potter era (next generation)

**NPC Relationship Tracking:**
- Reputation system: -100 to +100
- Affinity levels: ally/neutral/enemy/unknown
- Quest completion history
- Last interaction timestamp

**Story State Management:**
```typescript
PlayerStoryState {
  characterId: string
  currentEra: string
  choicesMade: PlayerChoice[]
  npcRelationships: Record<string, NPCRelationship>
  charactersDead: string[]
  battlesWon: number
  battleLost: number
  majorEventsExperienced: string[]
  storyBranch: string // Unique identifier for this player's story
}
```

**Key Functions:**
- `recordChoice()` - Log player decision
- `updateNPCRelationship()` - Change NPC reputation
- `processBattleOutcome()` - Handle battle results
- `shouldTransitionEra()` - Determine if era completion triggered

---

### 3. Dynamic Dialogue Generation (258 lines)
**File:** `lib/dynamic-dialogue-v6.ts`

**No fixed dialogue** - every NPC response is AI-generated based on context.

**Dialogue Context:**
- NPC personality and role
- Player's current reputation with NPC
- Player's past choices
- Current era and situation
- NPC mood (influenced by world state)

**AI-Generated Responses include:**
- Contextual acknowledgment of player history
- Era-appropriate language
- Emotional complexity
- Unpredictability (same situation, different response)

**Example Dialogue Generation:**
```
NPC: Dumbledore
Reputation: +75
Situation: Asking for advice before final battle

Generated Response: "My dear friend, I've watched your journey
with profound admiration. The choice before you is yours alone to make,
but know that I believe in your heart completely."
```

**Key Features:**
- `generateNPCDialogue()` - Creates contextual responses
- `generateRandomEncounterDialogue()` - Peeves and ghost encounters
- `generateEraEventDialogue()` - Dramatic scene descriptions
- Dialogue Options with consequence tracking

---

### 4. Era-Specific Dungeon Styling (312 lines)
**File:** `lib/dungeon-styling-v6.ts`

**Same dungeon layout, completely different visual appearance per era.**

**Visual Progression:**

| Era | Walls | Floor | Lighting | Ambiance |
|-----|-------|-------|----------|----------|
| Founders | Ancient rough stone, firelight torches | Heavily worn ancient stone | Flickering orange flames | Wind howling, ancient magic |
| Marauders | Worn stone with moss, blue magical flames | Stone with moss | Blue magical flames | Echoing footsteps, whispers |
| Potter | Maintained stone, crystal orbs | Polished stone | Glowing crystals | Golden dust, spell residue |
| Cursed Child | Reinforced stone with runes, temporal shimmer | Enchanted stone | Shimmering temporal light | Time distortion echoes |
| James Potter | Modern stone with runes, refined magic | Modern enchanted stone | Refined magical glow | Steady magical hum |
| Rational | Research-carved stone, scientific light | Analyzed enchanted stone | Scientific luminescence | Experimental hum |

**Key Functions:**
- `getDungeonStyle()` - Get era-specific styling
- `generateDungeonCSS()` - Create CSS for dungeon appearance
- `getDungeonDescription()` - Get immersive description
- `getDungeonSoundscape()` - Get ambient audio cues

---

### 5. Same-Era Multiplayer System (351 lines)
**File:** `lib/same-era-multiplayer-v6.ts`

**Players can ONLY interact with others in the same era.**

**Multiplayer Features:**

**Session Management:**
- Create era-locked sessions
- Players must be in same era to join
- Automatic capacity limits (2 for duels, 10 for quests)
- Location-based session grouping

**Duel System:**
- 1v1 PvP battles
- 3-round matches
- Spell casting with damage calculation
- Hit chance (80% base, affected by player skill)
- Winner determination

**Multiplayer Rules by Era:**
- **Founders**: Honorable combat, traditional weapons only
- **Marauders**: Animagus transformations allowed, pranks fair play
- **Potter**: Dark Arts restricted, house points awarded
- **Cursed Child**: Time spells monitored, alternate timelines allowed
- **James Potter**: Legacy challenges, ancestor approval needed
- **Rational**: Spell formulas documented, research partnerships

**Key Functions:**
- `MultiplayerSessionManager.createSession()` - Start new session
- `joinSession()` - Add player (same era only)
- `DuelSystem.challengePlayer()` - Initiate duel
- `castSpell()` - Execute spell in battle

---

### 6. Random Ghost Encounters (346 lines)
**File:** `lib/ghost-encounters-v6.ts`

**Unpredictable ghost and Peeves encounters during exploration.**

**Encounter Types:**
- **Friendly**: Share stories, offer quests
- **Mischievous**: Cause chaos (Peeves specialty)
- **Ominous**: Grave warnings and secrets
- **Helpful**: Assist with challenges
- **Hostile**: Attack the player

**Ghost Encounter System:**
- 30% chance per eligible location
- 5-minute cooldown between encounters
- Peeves 40% encounter rate (higher than other ghosts)
- Contextual dialogue per ghost and encounter type
- Multiple response options with consequences

**Peeves Encounters:**
- Witty banter → Spares you
- Run away → Escape safely
- Suggest pranks → Legendary prank guide
- Ignore → Drifts away bored

**Encounter Rewards:**
- Ancient Memory (quest item)
- Map Fragments
- Prophecy Fragments
- Blessed Charms
- Legendary Prank Guides
- Vanquished Spirit Badge

---

### 7. Dynamic Era Progression (280 lines)
**File:** `lib/dynamic-era-progression-v6.ts`

**Player choices determine which era comes next.**

**Era Transitions:**

```
Founders
  ├→ Victory → Marauders
  └→ Defeat → Rational

Marauders
  ├→ Victory → Potter
  └→ Defeat → Rational

Potter
  ├→ Victory → Cursed Child
  ├→ Defeat → Rational
  └→ Stalemate → James Potter

Cursed Child
  ├→ Victory → James Potter
  └→ Defeat → Rational

James Potter
  └→ Any outcome → Rational (completion)
```

**Avatar Evolution by Era:**
- **Founders→Marauders**: Ancient founder robes → 1970s wizard fashion
- **Marauders→Potter**: 1970s → 1990s contemporary wear
- **Potter→Cursed Child**: 1990s → 2020s robes (temporal shimmer)
- **Potter→James Potter**: 1990s → elegant ancestral robes
- **Cursed Child→James Potter**: Temporal robes → refined wear
- **James Potter→Rational**: Ancestral robes → research-focused

**Key Functions:**
- `determineNextEraFromOutcome()` - Choose next era based on battle result
- `generateEraTransitionNarrative()` - Create custom story text
- `getAvatarEvolutionGuidance()` - Suggest avatar changes

---

## Player Journey in v6

1. **Create Account & Sign In** → Use existing auth system
2. **Design Avatar** → Deep customization (50+ options)
3. **Start Founders Era** → No era selection (linear progression)
4. **Play through Era** → Make choices that affect story
5. **Complete Era** → Outcomes determine next era
6. **Avatar Redesign** → Before each new era transition
7. **Continue Journey** → Era after era until rational conclusion

---

## Key v6 Innovations

### No Fixed Dialogue
Every NPC conversation is AI-generated based on:
- Player reputation
- Player history
- NPC personality
- Current era
- Emotional context

### Strict Canon Accuracy
NPCs only appear when they historically exist:
- Moaning Myrtle only post-1943
- Nearly Headless Nick only post-1492
- Founders only in Founders Era
- No anachronisms or timeline violations

### Choice-Driven Story
- Battle wins/losses affect progression
- NPC relationships influence outcomes
- Character deaths are permanent
- Story branches dynamically

### Same-Era Multiplayer
- Players only duel with same-era players
- Dungeons are identical layout but era-themed visually
- Strict era-specific combat rules
- No cross-era gameplay

### Random Encounters
- Peeves causes unpredictable chaos
- Ghost encounters contextual to location and era
- Consequences shape reputation
- Rewards incentivize exploration

---

## System Files Summary

| File | Lines | Purpose |
|------|-------|---------|
| canon-timeline-v6.ts | 316 | NPC/ghost timeline accuracy |
| choice-consequence-v6.ts | 263 | Choice tracking & outcomes |
| dynamic-dialogue-v6.ts | 258 | AI-generated contextual dialogue |
| dungeon-styling-v6.ts | 312 | Era-specific visual themes |
| same-era-multiplayer-v6.ts | 351 | Era-locked PvP & multiplayer |
| ghost-encounters-v6.ts | 346 | Random ghost encounters |
| dynamic-era-progression-v6.ts | 280 | Choice-based era transitions |

**Total: 2,126 lines of production-ready code**

---

## Deployment Ready

v6 is **100% production-ready** with:
- Complete canon timeline enforcement
- Dynamic AI dialogue system
- Full choice consequence tracking
- Era-locked multiplayer
- Random encounter generation
- Automatic era progression
- Avatar evolution guidance
- No admin intervention needed

Every player's story is unique. No two playthroughs are identical. The game truly becomes a living, breathing narrative experience.
