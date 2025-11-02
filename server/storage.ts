import { type WaterEntry, type InsertWaterEntry, type Settings, type InsertSettings } from "@shared/schema";
import { randomUUID } from "crypto";
import { format, subDays } from "date-fns";

export interface IStorage {
  getWaterEntries(date: string): Promise<WaterEntry[]>;
  addWaterEntry(entry: InsertWaterEntry): Promise<WaterEntry>;
  deleteWaterEntry(id: string): Promise<void>;
  getSettings(): Promise<Settings | undefined>;
  updateSettings(settings: InsertSettings): Promise<Settings>;
  getHistory(days: number): Promise<{ date: string; amount: number; goal: number }[]>;
}

export class MemStorage implements IStorage {
  private waterEntries: Map<string, WaterEntry>;
  private settings: Settings;

  constructor() {
    this.waterEntries = new Map();
    this.settings = {
      id: randomUUID(),
      dailyGoal: 3000,
      presetVolumes: "150,200,450,850,1000",
    };
  }

  async getWaterEntries(date: string): Promise<WaterEntry[]> {
    return Array.from(this.waterEntries.values()).filter(
      (entry) => entry.date === date
    );
  }

  async addWaterEntry(insertEntry: InsertWaterEntry): Promise<WaterEntry> {
    const id = randomUUID();
    const entry: WaterEntry = {
      ...insertEntry,
      id,
      timestamp: new Date(),
    };
    this.waterEntries.set(id, entry);
    return entry;
  }

  async deleteWaterEntry(id: string): Promise<void> {
    this.waterEntries.delete(id);
  }

  async getSettings(): Promise<Settings | undefined> {
    return this.settings;
  }

  async updateSettings(insertSettings: InsertSettings): Promise<Settings> {
    this.settings = {
      ...this.settings,
      ...insertSettings,
    };
    return this.settings;
  }

  async getHistory(days: number): Promise<{ date: string; amount: number; goal: number }[]> {
    const today = new Date();
    const history = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = format(subDays(today, i), "yyyy-MM-dd");
      const entries = await this.getWaterEntries(date);
      const amount = entries.reduce((sum, entry) => sum + entry.amount, 0);
      
      history.push({
        date,
        amount,
        goal: this.settings.dailyGoal,
      });
    }

    return history;
  }
}

export const storage = new MemStorage();
