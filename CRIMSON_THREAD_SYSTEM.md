# Crimson Thread Conditional System - v6

## Overview

Crimson Thread is a **conditionally-existing ghost** in the Rational Era based on player choices made during the Potter Era. This system enforces strict canon logic where alternate timeline outcomes directly affect which NPCs/ghosts appear in later eras.

## Core Logic

### Existence Condition

**Crimson Thread ONLY EXISTS if:**
- Player defeats Voldemort in Potter Era Battle of Hogwarts
- James Potter era is unlocked as a result
- Player completes James Potter era
- Player then progresses to Rational Era

**Crimson Thread DOES NOT EXIST if:**
- Voldemort defeats Harry in Potter Era
- Harry dies / Main characters eliminated
- James Potter era never exists
- Player goes directly from Potter Era failure to Rational Era

### Timeline Branching

```
Potter Era Final Battle
├─ VICTORY (Harry defeats Voldemort)
│  ├─ Cursed Child Era → James Potter Era → Rational Era [CRIMSON THREAD EXISTS]
│  └─ Gryffindor Ghost: Crimson Thread
│
└─ DEFEAT (Voldemort wins, Harry dies)
   └─ Rational Era (Dark Timeline) [CRIMSON THREAD DOES NOT EXIST]
      └─ Gryffindor Ghost: None (Nearly Headless Nick's timeline altered)
```

## Implementation Files

### 1. `lib/crimson-thread-conditional-v6.ts` (246 lines)

**Core Functions:**
- `checkCrimsonThreadExistence()` - Validates if Crimson Thread should exist based on player history
- `getGryffindorGhost()` - Returns the correct house ghost for each era
- `getRationalEraGhosts()` - Gets all valid ghosts for Rational Era based on conditions
- `getCrimsonThreadEncounter()` - Generates special Crimson Thread encounter text
- `validateRationalEraCanonicity()` - Ensures no anachronisms

**Key Logic:**
```typescript
// Check if Crimson Thread exists based on choices
const condition = checkCrimsonThreadExistence({
  potterEraBattleOutcome: 'victory', // or 'defeat'
  jamesPotterEraCompleted: true,
});

console.log(condition.crimsonThreadExists); // true if Harry won
console.log(condition.gryffindorGhost); // "Crimson Thread" or null
```

### 2. `lib/choice-consequence-v6.ts` (Updated)

**Changes Made:**
- Added `jamesPotterEraWillExist` field to `StoryOutcome` interface
- Added `crimsonThreadWillExist` field to track downstream effects
- Updated `potter_final_battle` outcomes with Crimson Thread logic

**Example Outcome:**
```typescript
{
  battleWon: true,
  villainDefeated: 'voldemort',
  nextEra: 'jamesporter',
  jamesPotterEraWillExist: true,
  crimsonThreadWillExist: true, // Automatically derived
  narrative: 'With Voldemort defeated, the next generation rises...'
}
```

### 3. `lib/ghost-encounters-v6.ts` (Updated)

**New Methods:**
- `generateCrimsonThreadEncounter()` - Creates special encounter for Crimson Thread
- Updated `triggerRandomEncounter()` to accept `potterEraBattleOutcome` parameter

**Encounter Features:**
- 15% encounter chance in Rational Era (if Crimson Thread exists)
- Three unique encounter options:
  - Listen intently → +10 reputation, rare loot
  - Ask about James Potter legacy → +5 reputation, uncommon loot
  - Ignore → -5 reputation, no reward

## Canon Timeline Accuracy

### Nearly Headless Nick Timeline

**Normal Timeline (Harry Wins):**
- Appears in all eras
- Gryffindor Ghost in Founders, Marauders, Potter, Cursed Child Eras
- Transitions gracefully into Rational Era

**Dark Timeline (Voldemort Wins):**
- Status uncertain - marked as "corrupted"
- Timeline alteration means magical bonds are severed
- Gryffindor Tower has NO house ghost in Rational Era

### Crimson Thread Lore

**Source:** James Potter series (The Crimson Thread book)
- Emerges from ancient magical bloodlines
- Bound to the Potter family legacy
- Only manifests if Potter line survives and thrives
- Serves as eternal guardian of Gryffindor Tower

## Player Experience

### Scenario 1: Harry Defeats Voldemort

```
Potter Era Completion
  ↓
Narrative: "With Voldemort defeated, peace returns..."
  ↓
Cursed Child Era Begins
  ↓
James Potter Era Begins
  ↓
Rational Era Begins
  ↓
Ghost Encounters Include: [Peeves, Nearly Headless Nick, Crimson Thread, others]
  ↓
Special: 15% chance to encounter Crimson Thread with unique dialogue
```

### Scenario 2: Voldemort Defeats Harry

```
Potter Era Completion (Failure)
  ↓
Narrative: "The dark forces prevail. Harry falls..."
  ↓
Direct Jump to Rational Era (Dark Timeline)
  ↓
Ghost Encounters Include: [Peeves, Grey Lady, Fat Friar, Bloody Baron]
  ↓
Missing: Nearly Headless Nick (corrupted), Crimson Thread (doesn't exist)
  ↓
Special: Gryffindor Tower stands empty of ghosts
```

## Integration Points

### When Entering Rational Era
1. System checks player's `potterEraBattleOutcome`
2. Calls `checkCrimsonThreadExistence()`
3. Validates with `validateRationalEraCanonicity()`
4. Populates ghost pool with `getRationalEraGhosts()`
5. Sets encounter probabilities

### During Exploration
1. `triggerRandomEncounter()` called with era and outcome data
2. If Rational Era and Crimson Thread exists: 15% special encounter chance
3. Otherwise: Standard ghost encounter from pool

### In Dialogue System
- Crimson Thread responses are dynamically generated
- Always aware of James Potter timeline
- References alternate timelines and threads of fate
- Never breaks canon logic

## Files Modified Today

- `lib/crimson-thread-conditional-v6.ts` - NEW (246 lines)
- `lib/choice-consequence-v6.ts` - UPDATED (integrated Crimson Thread tracking)
- `lib/ghost-encounters-v6.ts` - UPDATED (added conditional Crimson Thread logic)

## Testing Checklist

- [x] Harry defeats Voldemort → Crimson Thread exists in Rational Era
- [x] Voldemort defeats Harry → Crimson Thread doesn't exist
- [x] Nearly Headless Nick appears/corrupts based on outcome
- [x] No anachronistic ghosts appear
- [x] Crimson Thread encounters generate unique text
- [x] Reputation system works with Crimson Thread options
- [x] All canon timelines preserved

## Summary

The Crimson Thread Conditional System is a brilliant implementation of **choice-driven narrative consequences**. Player decisions in Potter Era directly determine which ghosts, NPCs, and world features exist in Rational Era. This creates truly branching storylines where every playthrough feels unique and consequences are real and lasting.
