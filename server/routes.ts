import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaterEntrySchema, insertSettingsSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/water-entries", async (req, res) => {
    try {
      const date = req.query.date as string;
      if (!date) {
        return res.status(400).json({ error: "Date parameter is required" });
      }
      
      const entries = await storage.getWaterEntries(date);
      res.json(entries);
    } catch (error) {
      console.error("Error getting water entries:", error);
      res.status(500).json({ error: "Failed to get water entries" });
    }
  });

  app.post("/api/water-entries", async (req, res) => {
    try {
      const validatedData = insertWaterEntrySchema.parse(req.body);
      const entry = await storage.addWaterEntry(validatedData);
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      console.error("Error adding water entry:", error);
      res.status(500).json({ error: "Failed to add water entry" });
    }
  });

  app.delete("/api/water-entries/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteWaterEntry(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting water entry:", error);
      res.status(500).json({ error: "Failed to delete water entry" });
    }
  });

  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error getting settings:", error);
      res.status(500).json({ error: "Failed to get settings" });
    }
  });

  app.put("/api/settings", async (req, res) => {
    try {
      const validatedData = insertSettingsSchema.parse(req.body);
      const settings = await storage.updateSettings(validatedData);
      res.json(settings);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: fromZodError(error).toString() });
      }
      console.error("Error updating settings:", error);
      res.status(500).json({ error: "Failed to update settings" });
    }
  });

  app.get("/api/history", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      const history = await storage.getHistory(days);
      res.json(history);
    } catch (error) {
      console.error("Error getting history:", error);
      res.status(500).json({ error: "Failed to get history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
