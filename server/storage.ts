import { 
  users, 
  projects, 
  legalDocuments, 
  auditLogs, 
  gdprRequests, 
  copyrightViolations,
  type User, 
  type InsertUser,
  type Project,
  type InsertProject,
  type LegalDocument,
  type InsertLegalDocument,
  type AuditLog,
  type InsertAuditLog,
  type GdprRequest,
  type InsertGdprRequest,
  type CopyrightViolation,
  type InsertCopyrightViolation
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getProjectByCode(code: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Legal documents methods
  getLegalDocument(type: string): Promise<LegalDocument | undefined>;
  createLegalDocument(document: InsertLegalDocument): Promise<LegalDocument>;
  
  // Audit log methods
  createAuditLog(log: InsertAuditLog): Promise<AuditLog>;
  getAuditLogs(): Promise<AuditLog[]>;
  
  // GDPR methods
  createGdprRequest(request: InsertGdprRequest): Promise<GdprRequest>;
  getGdprRequests(): Promise<GdprRequest[]>;
  
  // Copyright violation methods
  createCopyrightViolation(violation: InsertCopyrightViolation): Promise<CopyrightViolation>;
  isCopyrightViolator(ipAddress: string): Promise<boolean>;
  
  // Revenue calculations
  getRevenueProjections(): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(projects.createdAt);
  }

  async getProjectByCode(code: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.code, code));
    return project || undefined;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async getLegalDocument(type: string): Promise<LegalDocument | undefined> {
    const [document] = await db
      .select()
      .from(legalDocuments)
      .where(eq(legalDocuments.type, type))
      .orderBy(desc(legalDocuments.createdAt));
    return document || undefined;
  }

  async createLegalDocument(insertDocument: InsertLegalDocument): Promise<LegalDocument> {
    const [document] = await db
      .insert(legalDocuments)
      .values(insertDocument)
      .returning();
    return document;
  }

  async createAuditLog(insertLog: InsertAuditLog): Promise<AuditLog> {
    const [log] = await db
      .insert(auditLogs)
      .values(insertLog)
      .returning();
    return log;
  }

  async getAuditLogs(): Promise<AuditLog[]> {
    return await db
      .select()
      .from(auditLogs)
      .orderBy(desc(auditLogs.timestamp))
      .limit(100);
  }

  async createGdprRequest(insertRequest: InsertGdprRequest): Promise<GdprRequest> {
    const [request] = await db
      .insert(gdprRequests)
      .values(insertRequest)
      .returning();
    return request;
  }

  async getGdprRequests(): Promise<GdprRequest[]> {
    return await db
      .select()
      .from(gdprRequests)
      .orderBy(desc(gdprRequests.createdAt));
  }

  async createCopyrightViolation(insertViolation: InsertCopyrightViolation): Promise<CopyrightViolation> {
    const [violation] = await db
      .insert(copyrightViolations)
      .values(insertViolation)
      .returning();
    return violation;
  }

  async isCopyrightViolator(ipAddress: string): Promise<boolean> {
    const [violation] = await db
      .select()
      .from(copyrightViolations)
      .where(eq(copyrightViolations.ipAddress, ipAddress))
      .limit(1);
    return !!violation?.blocked;
  }

  async getRevenueProjections(): Promise<any> {
    // In a real implementation, this would calculate based on project data
    return [
      {
        sector: "Fabrica EV + Centru Date",
        description: "Producție, export, servicii AI/Cloud",
        minRevenue: 1200000000,
        maxRevenue: 1800000000,
        icon: "fas fa-industry",
        color: "bg-primary",
        percentage: 100
      },
      {
        sector: "Turism & Festivaluri",
        description: "Festivaluri UNTOLD-style, canale Venice, eco-turism",
        minRevenue: 400000000,
        maxRevenue: 600000000,
        icon: "fas fa-camera",
        color: "bg-emerald-500",
        percentage: 66
      },
      {
        sector: "SPA & Wellness",
        description: "Stațiuni de lux și accesibile",
        minRevenue: 250000000,
        maxRevenue: 400000000,
        icon: "fas fa-spa",
        color: "bg-purple-500",
        percentage: 50
      },
      {
        sector: "Universul Copiilor",
        description: "Parcuri tematice, acvatice, hub-uri educaționale",
        minRevenue: 200000000,
        maxRevenue: 300000000,
        icon: "fas fa-child",
        color: "bg-orange-500",
        percentage: 40
      },
      {
        sector: "Transport & Conectivitate",
        description: "Trenuri, gondole, logistică",
        minRevenue: 120000000,
        maxRevenue: 180000000,
        icon: "fas fa-train",
        color: "bg-blue-500",
        percentage: 25
      },
      {
        sector: "Ferme Pești & Agricultură",
        description: "Export + aprovizionare locală",
        minRevenue: 80000000,
        maxRevenue: 120000000,
        icon: "fas fa-seedling",
        color: "bg-green-500",
        percentage: 16
      }
    ];
  }
}

export const storage = new DatabaseStorage();
