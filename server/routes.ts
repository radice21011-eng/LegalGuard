import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertGdprRequestSchema, insertCopyrightViolationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Privacy protection applied directly in routes for better control

  // Projects API
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:code", async (req, res) => {
    try {
      const project = await storage.getProjectByCode(req.params.code);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  // Legal Documents API
  app.get("/api/legal/:type", async (req, res) => {
    try {
      const document = await storage.getLegalDocument(req.params.type);
      if (!document) {
        return res.status(404).json({ error: "Legal document not found" });
      }
      res.json(document);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch legal document" });
    }
  });

  // GDPR Requests API
  app.post("/api/gdpr/request", async (req, res) => {
    try {
      const validatedData = insertGdprRequestSchema.parse(req.body);
      const request = await storage.createGdprRequest(validatedData);
      
      // Log the audit trail
      await storage.createAuditLog({
        action: "gdpr_request_created",
        resource: "gdpr_request",
        details: { requestId: request.id, type: validatedData.requestType },
        ipAddress: req.ip || 'unknown',
        userAgent: req.get("User-Agent") || "",
      });
      
      res.status(201).json({ message: "GDPR request submitted successfully", requestId: request.id });
    } catch (error) {
      res.status(400).json({ error: "Invalid GDPR request data" });
    }
  });

  // Copyright Protection API
  app.post("/api/copyright/report-violation", async (req, res) => {
    try {
      const violationData = insertCopyrightViolationSchema.parse({
        ...req.body,
        ipAddress: req.ip || 'unknown',
        userAgent: req.get("User-Agent") || "",
      });
      
      const violation = await storage.createCopyrightViolation(violationData);
      
      // Log the violation
      await storage.createAuditLog({
        action: "copyright_violation_reported",
        resource: "copyright_violation",
        details: { violationId: violation.id, type: violationData.violationType },
        ipAddress: req.ip || 'unknown',
        userAgent: req.get("User-Agent") || "",
      });
      
      res.status(201).json({ message: "Copyright violation reported", blocked: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to report copyright violation" });
    }
  });

  app.get("/api/copyright/status", async (req, res) => {
    try {
      const ipAddress = req.ip || 'unknown';
      const isBlocked = await storage.isCopyrightViolator(ipAddress);
      res.json({ blocked: isBlocked });
    } catch (error) {
      res.status(500).json({ error: "Failed to check copyright status" });
    }
  });

  // Economics API - Revenue calculations
  app.get("/api/economics/revenue", async (req, res) => {
    try {
      const revenueData = await storage.getRevenueProjections();
      res.json(revenueData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch revenue data" });
    }
  });

  // Contact & Investment API
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message, type } = req.body;
      
      // Log contact attempt
      await storage.createAuditLog({
        action: "contact_form_submitted",
        resource: "contact",
        details: { email, type },
        ipAddress: req.ip || 'unknown',
        userAgent: req.get("User-Agent") || "",
      });
      
      // In a real implementation, this would send an email
      res.json({ message: "Contact form submitted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Admin API for legal compliance
  app.get("/api/admin/audit-logs", async (req, res) => {
    try {
      const logs = await storage.getAuditLogs();
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch audit logs" });
    }
  });

  app.get("/api/admin/gdpr-requests", async (req, res) => {
    try {
      const requests = await storage.getGdprRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch GDPR requests" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
