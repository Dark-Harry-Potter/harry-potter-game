// Autonomous Economy System v3 - Self-Balancing Markets
// This system manages prices, supply/demand, inflation, and player-driven economy

export interface MarketItem {
  id: string;
  name: string;
  basePrice: number;
  currentPrice: number;
  supply: number;
  demand: number;
  trend: 'rising' | 'stable' | 'falling';
  volatility: number;
  lastUpdated: Date;
}

export interface EconomyState {
  inflation: number; // 0.5 - 2.0
  gdp: number; // total currency in circulation
  unemployment: number; // 0 - 100 (player inactivity %)
  marketHealth: number; // 0 - 100
  priceIndex: number; // baseline price changes
  lastUpdated: Date;
}

export interface TradeData {
  itemId: string;
  quantity: number;
  price: number;
  timestamp: Date;
  buyerId: string;
  sellerId: string;
}

// Core economy manager
export class AutonomousEconomy {
  private items: Map<string, MarketItem> = new Map();
  private state: EconomyState;
  private tradeHistory: TradeData[] = [];
  private priceHistory: Map<string, number[]> = new Map();

  constructor() {
    this.state = {
      inflation: 1.0,
      gdp: 1000000, // Starting GDP
      unemployment: 15,
      marketHealth: 75,
      priceIndex: 1.0,
      lastUpdated: new Date(),
    };

    this.initializeMarket();
  }

  // Initialize market with base items
  private initializeMarket() {
    const baseItems = [
      { id: 'potion_health', name: 'Health Potion', basePrice: 100 },
      { id: 'potion_mana', name: 'Mana Potion', basePrice: 120 },
      { id: 'spell_scroll', name: 'Spell Scroll', basePrice: 250 },
      { id: 'rare_herb', name: 'Rare Herb', basePrice: 80 },
      { id: 'dragon_scale', name: 'Dragon Scale', basePrice: 500 },
      { id: 'moonstone', name: 'Moonstone', basePrice: 300 },
      { id: 'ancient_scroll', name: 'Ancient Scroll', basePrice: 400 },
      { id: 'phoenix_feather', name: 'Phoenix Feather', basePrice: 350 },
    ];

    for (const item of baseItems) {
      this.items.set(item.id, {
        ...item,
        currentPrice: item.basePrice,
        supply: 100 + Math.random() * 200,
        demand: 50 + Math.random() * 100,
        trend: 'stable',
        volatility: 0.1,
        lastUpdated: new Date(),
      });
      this.priceHistory.set(item.id, [item.basePrice]);
    }
  }

  // Record a trade (happens when players buy/sell)
  recordTrade(itemId: string, quantity: number, price: number, buyerId: string, sellerId: string) {
    const item = this.items.get(itemId);
    if (!item) return;

    // Update supply and demand based on trade
    item.supply -= quantity;
    item.demand += quantity * 0.5; // demand increases with trades

    this.tradeHistory.push({
      itemId,
      quantity,
      price,
      timestamp: new Date(),
      buyerId,
      sellerId,
    });

    this.state.gdp += price * quantity;
  }

  // Calculate dynamic price based on supply/demand
  calculatePrice(itemId: string): number {
    const item = this.items.get(itemId);
    if (!item) return 0;

    // Supply/demand ratio (lower supply = higher price)
    const supplyDemandRatio = item.supply / Math.max(1, item.demand);
    const supplyFactor = Math.max(0.3, Math.min(2.0, 1 / supplyDemandRatio));

    // Market sentiment (recent trend)
    const recentTrades = this.tradeHistory.filter(
      (t) => t.itemId === itemId && Date.now() - t.timestamp.getTime() < 86400000, // 24 hours
    );
    const sentimentFactor = recentTrades.length > 0 ? 1 + (Math.random() - 0.5) * 0.1 : 1.0;

    // Calculate new price
    const newPrice = item.basePrice * supplyFactor * sentimentFactor * this.state.inflation;
    return Math.round(Math.max(item.basePrice * 0.5, Math.min(newPrice, item.basePrice * 3)));
  }

  // Update all market prices
  updateMarketPrices() {
    for (const [id, item] of this.items) {
      const oldPrice = item.currentPrice;
      const newPrice = this.calculatePrice(id);

      // Update trend
      if (newPrice > oldPrice) item.trend = 'rising';
      else if (newPrice < oldPrice) item.trend = 'falling';
      else item.trend = 'stable';

      item.currentPrice = newPrice;
      item.volatility = Math.abs(newPrice - oldPrice) / oldPrice;

      // Record price history
      const history = this.priceHistory.get(id) || [];
      history.push(newPrice);
      if (history.length > 168) history.shift(); // Keep 7 days of history
      this.priceHistory.set(id, history);

      // Regenerate supply gradually
      item.supply += 10 + Math.random() * 20;
      item.demand = Math.max(0, item.demand * 0.95); // Demand decays
    }

    this.state.lastUpdated = new Date();
  }

  // Calculate and adjust inflation
  calculateInflation(): number {
    // Inflation based on GDP and money supply
    const moneyVelocity = this.tradeHistory.filter(
      (t) => Date.now() - t.timestamp.getTime() < 86400000,
    ).length;

    const gdpGrowth = this.state.gdp > 1000000 ? this.state.gdp / 1000000 : 1;
    const inflationFactor = 0.98 + moneyVelocity * 0.001 + (gdpGrowth - 1) * 0.05;

    this.state.inflation = Math.max(0.5, Math.min(2.0, this.state.inflation * inflationFactor));
    return this.state.inflation;
  }

  // Self-regulate economy health
  regulateEconomy() {
    // Reduce GDP if too much money in circulation
    if (this.state.gdp > 5000000) {
      this.state.gdp *= 0.98; // Slow sink
    }

    // Increase market health based on trade volume
    const dailyTrades = this.tradeHistory.filter(
      (t) => Date.now() - t.timestamp.getTime() < 86400000,
    ).length;
    const tradeHealth = Math.min(100, dailyTrades * 5);
    this.state.marketHealth = this.state.marketHealth * 0.8 + tradeHealth * 0.2;

    // Update unemployment (inverse of active players)
    // This would be set by player activity tracking in actual game
    this.state.unemployment = Math.max(5, this.state.unemployment - 2);

    // Adjust prices if market is too volatile
    const avgVolatility =
      Array.from(this.items.values()).reduce((sum, item) => sum + item.volatility, 0) /
      this.items.size;
    if (avgVolatility > 0.3) {
      // Apply stabilization
      for (const item of this.items.values()) {
        item.currentPrice = item.basePrice * this.state.inflation;
      }
    }
  }

  // Get market report for players
  getMarketReport() {
    return {
      items: Array.from(this.items.values()),
      economy: this.state,
      topTrending: this.getTopTrending(),
      recommendations: this.getInvestmentRecommendations(),
    };
  }

  // Find top trending items
  private getTopTrending() {
    return Array.from(this.items.values())
      .sort((a, b) => b.volatility - a.volatility)
      .slice(0, 5);
  }

  // AI investment recommendations
  private getInvestmentRecommendations() {
    const recommendations: string[] = [];

    for (const item of this.items.values()) {
      if (item.trend === 'rising' && item.supply < 50) {
        recommendations.push(`${item.name} is rising - good investment opportunity`);
      }
      if (item.trend === 'falling' && item.demand > 80) {
        recommendations.push(`${item.name} is falling but high demand - buying opportunity`);
      }
    }

    return recommendations;
  }

  // Generate market crisis/boom
  generateEconomicEvent(): string {
    const eventRoll = Math.random();

    if (eventRoll > 0.9 && this.state.marketHealth > 50) {
      // Market boom
      this.state.marketHealth = Math.min(100, this.state.marketHealth + 20);
      this.state.inflation *= 1.1;
      return 'Market Boom: Prices rising, selling opportunity!';
    } else if (eventRoll > 0.8 && this.state.marketHealth < 60) {
      // Market crash
      this.state.marketHealth = Math.max(0, this.state.marketHealth - 20);
      this.state.inflation *= 0.9;
      return 'Market Crash: Prices falling, buying opportunity!';
    } else if (eventRoll > 0.7) {
      // Supply shortage
      const randomItem = Array.from(this.items.values())[
        Math.floor(Math.random() * this.items.size)
      ];
      randomItem.supply *= 0.5;
      return `Supply Shortage: ${randomItem.name} prices surging!`;
    } else if (eventRoll > 0.6) {
      // Oversupply
      const randomItem = Array.from(this.items.values())[
        Math.floor(Math.random() * this.items.size)
      ];
      randomItem.supply *= 1.5;
      return `Oversupply: ${randomItem.name} prices dropping!`;
    }

    return 'Market Stable: Normal trading conditions';
  }

  // Get item price
  getItemPrice(itemId: string): number {
    const item = this.items.get(itemId);
    return item ? item.currentPrice : 0;
  }

  // Get all items
  getAllItems() {
    return Array.from(this.items.values());
  }

  // Create wealth distribution system
  getWealthDistribution(playerWealth: number[]): { gini: number; distribution: string } {
    const sorted = [...playerWealth].sort((a, b) => a - b);
    const mean = playerWealth.reduce((a, b) => a + b, 0) / playerWealth.length;

    // Gini coefficient calculation
    let sum = 0;
    for (let i = 0; i < sorted.length; i++) {
      sum += (i + 1) * sorted[i];
    }
    const gini = (2 * sum) / (playerWealth.length * playerWealth.reduce((a, b) => a + b, 0)) - (playerWealth.length + 1) / playerWealth.length;

    let distribution = 'balanced';
    if (gini > 0.6) distribution = 'highly-unequal';
    else if (gini > 0.4) distribution = 'unequal';
    else if (gini > 0.2) distribution = 'slightly-unequal';

    // If too unequal, trigger redistribution events
    if (gini > 0.65) {
      this.state.marketHealth *= 0.9; // Inequality reduces market health
    }

    return { gini, distribution };
  }
}

export const AutonomousEconomyManager = new AutonomousEconomy();
