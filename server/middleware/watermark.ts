import { Request, Response, NextFunction } from "express";

// Advanced Watermarking and Copyright Protection System
// © 2025 Ervin Remus Radosavlevici - All Rights Reserved

const OWNER_INFO = {
  name: "Ervin Remus Radosavlevici",
  email: "ervin210@icloud.com",
  businessEmail: "ervin210@sky.com", 
  copyright: "© 2025 Ervin Remus Radosavlevici. All Rights Reserved.",
  watermark: "LEGAL_GUARD_PRODUCTION_READY_ERR_2025_TRILLION_ENHANCED",
  proprietorKey: "ERR_PROPRIETOR_MASTER_KEY_7097_FEATURES",
  ndaProtected: true,
  remoteLockEnabled: true,
  trilionUpgradeActive: true
};

// Remote lock state - can only be unlocked by proprietor
let isSystemLocked = false;
let lockReason = "";
let lockTimestamp: number | null = null;

// Generate ultra-secure watermark with trillion-level enhancement
function generateWatermark(req: Request): string {
  const timestamp = Date.now();
  const userFingerprint = Buffer.from(req.ip || 'unknown').toString('base64');
  const sessionId = Math.random().toString(36).substring(2);
  const securityHash = Buffer.from(`${OWNER_INFO.proprietorKey}_${timestamp}`).toString('hex');
  
  return `${OWNER_INFO.watermark}_${timestamp}_${userFingerprint}_${sessionId}_${securityHash}_TRILLION_PROTECTED`;
}

// Validate proprietor access
function validateProprietorAccess(email?: string, key?: string): boolean {
  if (!email || !key) return false;
  return (email === OWNER_INFO.email || email === OWNER_INFO.businessEmail) && 
         key === OWNER_INFO.proprietorKey;
}

// Remote lock management functions
export function lockSystem(reason: string = "Unauthorized access detected"): void {
  isSystemLocked = true;
  lockReason = reason;
  lockTimestamp = Date.now();
  console.log(`🔒 SYSTEM LOCKED: ${reason} at ${new Date().toISOString()}`);
}

export function unlockSystem(email: string, key: string): boolean {
  if (!validateProprietorAccess(email, key)) {
    console.log(`❌ UNLOCK ATTEMPT FAILED: Invalid credentials from ${email}`);
    return false;
  }
  
  isSystemLocked = false;
  lockReason = "";
  lockTimestamp = null;
  console.log(`✅ SYSTEM UNLOCKED: Proprietor access granted to ${email}`);
  return true;
}

export function getSystemLockStatus() {
  return {
    isLocked: isSystemLocked,
    reason: lockReason,
    lockedAt: lockTimestamp,
    proprietorEmails: [OWNER_INFO.email, OWNER_INFO.businessEmail]
  };
}

// Advanced trillion-level watermark and remote lock middleware
export function watermarkMiddleware(req: Request, res: Response, next: NextFunction) {
  // Check if system is locked
  if (isSystemLocked && !req.path.startsWith('/api/license/unlock')) {
    return res.status(423).json({
      error: "SYSTEM_LOCKED",
      message: "System is remotely locked by proprietor",
      reason: lockReason,
      lockedAt: lockTimestamp,
      contact: [OWNER_INFO.email, OWNER_INFO.businessEmail],
      _watermark: "SYSTEM_LOCKED_ERR_PROPRIETOR_CONTROL"
    });
  }
  
  const watermark = generateWatermark(req);
  
  // Enhanced copyright and watermark headers with trillion-level protection
  res.setHeader("X-Copyright-Owner", OWNER_INFO.name);
  res.setHeader("X-Owner-Email", OWNER_INFO.email);
  res.setHeader("X-Owner-Business-Email", OWNER_INFO.businessEmail);
  res.setHeader("X-Copyright-Notice", OWNER_INFO.copyright);
  res.setHeader("X-Digital-Watermark", watermark);
  res.setHeader("X-Production-Ready", "trillion-enhanced");
  res.setHeader("X-Real-Data", "production-grade-7097-features");
  res.setHeader("X-Project-Value", "7.9-trillion-times-enhanced");
  res.setHeader("X-License", "private-exclusive-nda-protected");
  res.setHeader("X-NDA-Protected", "trillion-level-enforcement");
  res.setHeader("X-Unauthorized-Use-Prohibited", "legal-action-enforced-globally");
  res.setHeader("X-Proprietor-Protected", "true");
  res.setHeader("X-Remote-Lock-Enabled", "true");
  res.setHeader("X-Security-Level", "maximum-proprietor-control");
  res.setHeader("X-Features-Count", "7097-advanced-features");
  
  // Enhanced JSON response watermarking with trillion-level protection
  const originalJson = res.json;
  res.json = function(data: any) {
    if (typeof data === 'object' && data !== null) {
      data._watermark = watermark;
      data._copyright = OWNER_INFO.copyright;
      data._owner = OWNER_INFO.name;
      data._proprietor_emails = [OWNER_INFO.email, OWNER_INFO.businessEmail];
      data._production_ready = "trillion-enhanced";
      data._real_data = "Real project data worth 7.9 trillion times enhanced value";
      data._nda_protected = true;
      data._remote_lock_enabled = OWNER_INFO.remoteLockEnabled;
      data._security_level = "maximum-proprietor-control";
      data._features_count = 7097;
      data._unauthorized_use = "Strictly prohibited - Legal action enforced globally";
      data._proprietor_key_required = "Contact proprietor for access authorization";
    }
    return originalJson.call(this, data);
  };
  
  next();
}

// Advanced security logging
export function securityLogMiddleware(req: Request, res: Response, next: NextFunction) {
  // Log all access attempts for security monitoring
  console.log(`🔒 SECURITY LOG: ${new Date().toISOString()} | ${req.method} ${req.path} | IP: ${req.ip} | User-Agent: ${req.get('User-Agent') || 'Unknown'} | Owner: ${OWNER_INFO.name}`);
  
  next();
}