// Smart Progression & Self-Balancing System v3
// Automatically adjusts difficulty and progression curves based on player performance

export interface PlayerProgressionData {
  characterId: string;
  currentLevel: number;
  experience: number;
  winRate: number;
  playtimeHours: number;
  lastSessionLength: number;
  recentFailures: number;
  streak: number; // consecutive wins
  skillTier: 'novice' | 'apprentice' | 'journeyman' | 'expert' | 'master' | 'legendary';
  performanceIndex: number; // 0-100, measures overall capability
}

export interface DifficultyProfile {
  baseDifficulty: number;
  damageMultiplier: number;
  healthMultiplier: number;
  rewardMultiplier: number;
  encounterComplexity: number;
  aiDifficulty: 'trivial' | 'easy' | 'normal' | 'hard' | 'extreme' | 'insane';
}

export class SmartProgression {
  private playerData: Map<string, PlayerProgressionData> = new Map();
  private difficultyProfiles: Map<string, DifficultyProfile> = new Map();

  // Experience curve - gets progressively harder
  getExperienceForLevel(level: number): number {
    // Exponential curve: each level requires more XP
    return Math.round(1000 * Math.pow(1.1, level - 1));
  }

  // Calculate performance index (0-100)
  calculatePerformanceIndex(data: PlayerProgressionData): number {
    const winRateScore = data.winRate * 40; // 0-40
    const levelScore = Math.min(30, (data.currentLevel / 100) * 30); // 0-30
    const streakBonus = Math.min(20, data.streak * 2); // 0-20
    const playtimeScore = Math.min(10, (data.playtimeHours / 100) * 10); // 0-10

    return Math.round(winRateScore + levelScore + streakBonus + playtimeScore);
  }

  // Determine skill tier
  determineSkillTier(performanceIndex: number): PlayerProgressionData['skillTier'] {
    if (performanceIndex < 20) return 'novice';
    if (performanceIndex < 35) return 'apprentice';
    if (performanceIndex < 50) return 'journeyman';
    if (performanceIndex < 70) return 'expert';
    if (performanceIndex < 85) return 'master';
    return 'legendary';
  }

  // Self-balancing difficulty
  calculateDifficulty(playerData: PlayerProgressionData): DifficultyProfile {
    const performanceIndex = this.calculatePerformanceIndex(playerData);
    playerData.performanceIndex = performanceIndex;
    playerData.skillTier = this.determineSkillTier(performanceIndex);

    // Target: 60-65% win rate for engaging gameplay
    const winRateDelta = 0.625 - playerData.winRate; // 0 = perfect, + = too hard, - = too easy

    // Adjust difficulty based on delta
    let baseDifficulty = playerData.currentLevel * 0.5;
    baseDifficulty += winRateDelta * 20; // +/- 20 levels based on performance

    // Recent session sentiment
    const recentFailureImpact = playerData.recentFailures > 5 ? -5 : playerData.recentFailures > 2 ? -2 : 0;
    baseDifficulty += recentFailureImpact;

    // Streak bonus (player is hot)
    const streakBonus = playerData.streak > 5 ? 2 : 0;
    baseDifficulty += streakBonus;

    baseDifficulty = Math.max(1, Math.min(100, baseDifficulty));

    // Calculate multipliers
    const damageMultiplier = 0.5 + (baseDifficulty / 100) * 2; // 0.5x - 2.5x
    const healthMultiplier = 0.7 + (baseDifficulty / 100) * 1.8; // 0.7x - 2.5x
    const rewardMultiplier = 0.5 + (baseDifficulty / 100) * 2; // 0.5x - 2.5x
    const encounterComplexity = Math.ceil((baseDifficulty / 100) * 5); // 1-5

    // AI difficulty tiers
    const aiTiers: Array<'trivial' | 'easy' | 'normal' | 'hard' | 'extreme' | 'insane'> = [
      'trivial',
      'easy',
      'normal',
      'hard',
      'extreme',
      'insane',
    ];
    const aiIndex = Math.floor((baseDifficulty / 100) * aiTiers.length);
    const aiDifficulty = aiTiers[Math.min(aiIndex, aiTiers.length - 1)];

    const profile: DifficultyProfile = {
      baseDifficulty,
      damageMultiplier,
      healthMultiplier,
      rewardMultiplier,
      encounterComplexity,
      aiDifficulty,
    };

    this.difficultyProfiles.set(playerData.characterId, profile);
    return profile;
  }

  // Track session performance
  recordSessionEnd(
    characterId: string,
    winsThisSession: number,
    lossesThisSession: number,
    experienceGained: number,
  ) {
    const data = this.playerData.get(characterId);
    if (!data) return;

    const totalFights = winsThisSession + lossesThisSession;
    const sessionWinRate = totalFights > 0 ? winsThisSession / totalFights : 0;

    // Update metrics
    data.winRate = (data.winRate * 0.7 + sessionWinRate * 0.3); // Weighted average
    data.experience += experienceGained;
    data.recentFailures = lossesThisSession;

    // Update streak
    if (winsThisSession > lossesThisSession) {
      data.streak += winsThisSession;
    } else {
      data.streak = 0;
    }

    // Level up if enough experience
    const nextLevelXP = this.getExperienceForLevel(data.currentLevel + 1);
    if (data.experience >= nextLevelXP) {
      data.currentLevel++;
      data.experience = 0;
      return { leveledUp: true, newLevel: data.currentLevel };
    }

    return { leveledUp: false };
  }

  // Adaptive reward scaling
  calculateRewards(
    baseReward: number,
    playerLevel: number,
    difficulty: DifficultyProfile,
    playerPerformance: number, // 0-100
  ): { currency: number; xp: number; bonus: string } {
    let currency = Math.round(baseReward * difficulty.rewardMultiplier);
    let xp = Math.round(baseReward * 2 * difficulty.rewardMultiplier);

    let bonus = 'Normal';

    // Performance bonuses
    if (playerPerformance > 80) {
      currency = Math.round(currency * 1.5);
      xp = Math.round(xp * 1.5);
      bonus = 'Excellent Performance Bonus';
    } else if (playerPerformance > 60) {
      currency = Math.round(currency * 1.2);
      xp = Math.round(xp * 1.2);
      bonus = 'Good Performance Bonus';
    }

    // Challenge bonus (higher difficulty = more reward)
    if (difficulty.baseDifficulty > 60) {
      currency = Math.round(currency * 1.3);
      bonus += ' + Challenge Bonus';
    }

    // Level scaling
    const levelScaling = 1 + (playerLevel / 100) * 0.5;
    currency = Math.round(currency * levelScaling);
    xp = Math.round(xp * levelScaling);

    return { currency, xp, bonus };
  }

  // Progression pacing - ensure not too fast, not too slow
  getPacingRecommendation(data: PlayerProgressionData): string {
    const sessionsPerWeek = Math.max(1, data.playtimeHours / 3); // Rough estimate
    const levelsPerWeek = data.currentLevel / Math.max(1, data.playtimeHours / 168); // levels per week

    if (levelsPerWeek > 3) {
      return 'Progression too fast - increasing difficulty';
    }
    if (levelsPerWeek < 0.5) {
      return 'Progression too slow - decreasing difficulty to maintain engagement';
    }
    return 'Progression balanced';
  }

  // Content recommendations based on progression
  recommendNextContent(data: PlayerProgressionData): string[] {
    const recommendations: string[] = [];

    if (data.currentLevel < 20) {
      recommendations.push('Complete tutorial zones');
      recommendations.push('Practice basic spells');
    } else if (data.currentLevel < 50) {
      recommendations.push('Explore mid-tier dungeons');
      recommendations.push('Join guild activities');
    } else if (data.currentLevel < 75) {
      recommendations.push('Challenge raid bosses');
      recommendations.push('Participate in PvP tournaments');
    } else {
      recommendations.push('Extreme difficulty dungeons');
      recommendations.push('Hardcore PvP challenges');
      recommendations.push('Lead guild wars');
    }

    if (data.winRate < 0.5) {
      recommendations.push('Train combat skills');
    }
    if (data.winRate > 0.7) {
      recommendations.push('Increase difficulty for better rewards');
    }

    return recommendations;
  }

  // Create progression for new character
  createProgressionData(characterId: string): PlayerProgressionData {
    const data: PlayerProgressionData = {
      characterId,
      currentLevel: 1,
      experience: 0,
      winRate: 0.5,
      playtimeHours: 0,
      lastSessionLength: 0,
      recentFailures: 0,
      streak: 0,
      skillTier: 'novice',
      performanceIndex: 25,
    };

    this.playerData.set(characterId, data);
    return data;
  }

  // Get progression data
  getProgressionData(characterId: string): PlayerProgressionData | undefined {
    return this.playerData.get(characterId);
  }

  // Milestone events
  checkProgressionMilestones(data: PlayerProgressionData): string[] {
    const milestones: string[] = [];

    if (data.currentLevel === 10) milestones.push('Reached Level 10 - Apprentice Rank!');
    if (data.currentLevel === 25) milestones.push('Reached Level 25 - Journeyman Rank!');
    if (data.currentLevel === 50) milestones.push('Reached Level 50 - Expert Rank!');
    if (data.currentLevel === 75) milestones.push('Reached Level 75 - Master Rank!');
    if (data.currentLevel === 100) milestones.push('Reached Level 100 - Legendary Status!');

    if (data.winRate > 0.7 && data.playtimeHours > 50) {
      milestones.push('Achieved 70%+ Win Rate - Champion!');
    }

    if (data.streak >= 10) {
      milestones.push(`10-Win Streak! Current: ${data.streak}`);
    }

    return milestones;
  }

  // Export for analytics
  getProgressionStats() {
    const allData = Array.from(this.playerData.values());

    return {
      totalPlayers: allData.length,
      averageLevel: allData.reduce((sum, d) => sum + d.currentLevel, 0) / Math.max(1, allData.length),
      averageWinRate: allData.reduce((sum, d) => sum + d.winRate, 0) / Math.max(1, allData.length),
      totalPlaytime: allData.reduce((sum, d) => sum + d.playtimeHours, 0),
      skillDistribution: this.getSkillDistribution(allData),
    };
  }

  private getSkillDistribution(data: PlayerProgressionData[]) {
    const distribution = {
      novice: 0,
      apprentice: 0,
      journeyman: 0,
      expert: 0,
      master: 0,
      legendary: 0,
    };

    for (const player of data) {
      distribution[player.skillTier]++;
    }

    return distribution;
  }
}

export const SmartProgressionManager = new SmartProgression();
