import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const waterEntries = pgTable("water_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  amount: integer("amount").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  date: text("date").notNull(),
});

export const settings = pgTable("settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  dailyGoal: integer("daily_goal").notNull().default(3000),
  presetVolumes: text("preset_volumes").notNull().default("150,200,450,850,1000"),
});

export const insertWaterEntrySchema = createInsertSchema(waterEntries).omit({
  id: true,
  timestamp: true,
});

export const insertSettingsSchema = createInsertSchema(settings).omit({
  id: true,
});

export type InsertWaterEntry = z.infer<typeof insertWaterEntrySchema>;
export type WaterEntry = typeof waterEntries.$inferSelect;
export type Settings = typeof settings.$inferSelect;
export type InsertSettings = z.infer<typeof insertSettingsSchema>;
