import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  gdprConsent: boolean("gdpr_consent").default(false),
  lastLogin: timestamp("last_login"),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  focus: text("focus").notNull(),
  status: text("status").notNull(),
  nextSteps: text("next_steps"),
  revenueMin: decimal("revenue_min", { precision: 12, scale: 2 }),
  revenueMax: decimal("revenue_max", { precision: 12, scale: 2 }),
  jobsCreated: integer("jobs_created"),
  description: text("description"),
  features: jsonb("features"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const legalDocuments = pgTable("legal_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  type: text("type").notNull(), // copyright, nda, gdpr, terms, privacy
  content: text("content").notNull(),
  version: text("version").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const auditLogs = pgTable("audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  action: text("action").notNull(),
  resource: text("resource"),
  details: jsonb("details"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const gdprRequests = pgTable("gdpr_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  requestType: text("request_type").notNull(), // access, deletion, rectification
  status: text("status").notNull().default("pending"), // pending, processed, completed
  details: jsonb("details"),
  processedAt: timestamp("processed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const copyrightViolations = pgTable("copyright_violations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ipAddress: text("ip_address").notNull(),
  userAgent: text("user_agent"),
  violationType: text("violation_type").notNull(),
  details: jsonb("details"),
  blocked: boolean("blocked").default(true),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const proprietorSessions = pgTable("proprietor_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  sessionToken: text("session_token").notNull().unique(),
  accessLevel: text("access_level").notNull(),
  ndaConfirmed: boolean("nda_confirmed").default(false),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
  isActive: boolean("is_active").default(true),
});

export const remoteLockEvents = pgTable("remote_lock_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventType: text("event_type").notNull(), // LOCK, UNLOCK, VIOLATION, ATTEMPT
  triggeredBy: text("triggered_by"),
  reason: text("reason").notNull(),
  ipAddress: text("ip_address"),
  details: jsonb("details"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const ndaViolations = pgTable("nda_violations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ipAddress: text("ip_address").notNull(),
  userAgent: text("user_agent"),
  violationType: text("violation_type").notNull(),
  suspiciousActivity: jsonb("suspicious_activity"),
  automaticLockTriggered: boolean("automatic_lock_triggered").default(false),
  proprietorNotified: boolean("proprietor_notified").default(true),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const advancedFeatures = pgTable("advanced_features", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  featureCode: text("feature_code").notNull().unique(),
  featureName: text("feature_name").notNull(),
  category: text("category").notNull(),
  securityLevel: text("security_level").notNull(),
  proprietorOnly: boolean("proprietor_only").default(true),
  trillionEnhanced: boolean("trillion_enhanced").default(true),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const financialAccounts = pgTable("financial_accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  accountName: text("account_name").notNull(),
  beneficiaryName: text("beneficiary_name").notNull(),
  iban: text("iban").notNull().unique(),
  swiftBic: text("swift_bic").notNull(),
  intermediaryBic: text("intermediary_bic"),
  bankName: text("bank_name").notNull(),
  countryCode: text("country_code").notNull(),
  currency: text("currency").notNull().default("GBP"),
  accountType: text("account_type").notNull().default("BUSINESS_CURRENT"),
  isLocked: boolean("is_locked").default(true),
  isPrimary: boolean("is_primary").default(true),
  proprietorEmail: text("proprietor_email").notNull(),
  immutableProtection: boolean("immutable_protection").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const financialTransactions = pgTable("financial_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  transactionId: text("transaction_id").notNull().unique(),
  accountId: varchar("account_id").references(() => financialAccounts.id),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  currency: text("currency").notNull(),
  transactionType: text("transaction_type").notNull(), // WIRE_TRANSFER, INTERNATIONAL_TRANSFER
  status: text("status").notNull().default("PENDING"), // PENDING, COMPLETED, FAILED
  reference: text("reference").notNull(),
  swiftReference: text("swift_reference"),
  senderDetails: jsonb("sender_details"),
  complianceStatus: text("compliance_status").notNull().default("VERIFIED"),
  amlChecked: boolean("aml_checked").default(true),
  kycVerified: boolean("kyc_verified").default(true),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const financialCompliance = pgTable("financial_compliance", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  complianceType: text("compliance_type").notNull(), // AML, KYC, PCI_DSS, GDPR_FINANCIAL
  status: text("status").notNull().default("ACTIVE"),
  lastAudit: timestamp("last_audit").defaultNow(),
  nextAudit: timestamp("next_audit"),
  regulatoryFramework: text("regulatory_framework").notNull(),
  certificationLevel: text("certification_level").notNull(),
  auditTrail: jsonb("audit_trail"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  auditLogs: many(auditLogs),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLegalDocumentSchema = createInsertSchema(legalDocuments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAuditLogSchema = createInsertSchema(auditLogs).omit({
  id: true,
  timestamp: true,
});

export const insertGdprRequestSchema = createInsertSchema(gdprRequests).omit({
  id: true,
  createdAt: true,
  processedAt: true,
});

export const insertCopyrightViolationSchema = createInsertSchema(copyrightViolations).omit({
  id: true,
  timestamp: true,
});

export const insertProprietorSessionSchema = createInsertSchema(proprietorSessions).omit({
  id: true,
  createdAt: true,
});

export const insertRemoteLockEventSchema = createInsertSchema(remoteLockEvents).omit({
  id: true,
  timestamp: true,
});

export const insertNdaViolationSchema = createInsertSchema(ndaViolations).omit({
  id: true,
  timestamp: true,
});

export const insertAdvancedFeatureSchema = createInsertSchema(advancedFeatures).omit({
  id: true,
  createdAt: true,
});

export const insertFinancialAccountSchema = createInsertSchema(financialAccounts).omit({
  id: true,
  createdAt: true,
});

export const insertFinancialTransactionSchema = createInsertSchema(financialTransactions).omit({
  id: true,
  timestamp: true,
});

export const insertFinancialComplianceSchema = createInsertSchema(financialCompliance).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type LegalDocument = typeof legalDocuments.$inferSelect;
export type InsertLegalDocument = z.infer<typeof insertLegalDocumentSchema>;
export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = z.infer<typeof insertAuditLogSchema>;
export type GdprRequest = typeof gdprRequests.$inferSelect;
export type InsertGdprRequest = z.infer<typeof insertGdprRequestSchema>;
export type CopyrightViolation = typeof copyrightViolations.$inferSelect;
export type InsertCopyrightViolation = z.infer<typeof insertCopyrightViolationSchema>;
export type ProprietorSession = typeof proprietorSessions.$inferSelect;
export type InsertProprietorSession = z.infer<typeof insertProprietorSessionSchema>;
export type RemoteLockEvent = typeof remoteLockEvents.$inferSelect;
export type InsertRemoteLockEvent = z.infer<typeof insertRemoteLockEventSchema>;
export type NdaViolation = typeof ndaViolations.$inferSelect;
export type InsertNdaViolation = z.infer<typeof insertNdaViolationSchema>;
export type AdvancedFeature = typeof advancedFeatures.$inferSelect;
export type InsertAdvancedFeature = z.infer<typeof insertAdvancedFeatureSchema>;
export type FinancialAccount = typeof financialAccounts.$inferSelect;
export type InsertFinancialAccount = z.infer<typeof insertFinancialAccountSchema>;
export type FinancialTransaction = typeof financialTransactions.$inferSelect;
export type InsertFinancialTransaction = z.infer<typeof insertFinancialTransactionSchema>;
export type FinancialCompliance = typeof financialCompliance.$inferSelect;
export type InsertFinancialCompliance = z.infer<typeof insertFinancialComplianceSchema>;
