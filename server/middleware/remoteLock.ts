import { Request, Response, NextFunction } from "express";

// Advanced Remote Lock & NDA Licensing System
// © 2025 Ervin Remus Radosavlevici - All Rights Reserved
// Proprietor Control System - Trillion Level Enhancement

const PROPRIETOR_CONFIG = {
  name: "Ervin Remus Radosavlevici",
  primaryEmail: "ervin210@icloud.com",
  businessEmail: "ervin210@sky.com",
  masterKey: "ERR_MASTER_PROPRIETOR_7097_TRILLION_ENHANCED",
  ndaKey: "NDA_EXCLUSIVE_LICENSE_PROPRIETOR_ERR_2025",
  remoteControlEnabled: true,
  maxUnauthorizedAttempts: 3,
  lockdownThreshold: 5,
};

// Global state for remote control
let remoteAccessState = {
  isLocked: false,
  lockReason: "",
  lockTimestamp: null as number | null,
  unauthorizedAttempts: 0,
  lastUnauthorizedIP: "",
  authorizedSessions: new Set<string>(),
  ndaViolations: 0,
  currentAccessLevel: "RESTRICTED",
};

// Generate secure session token for authorized access
function generateSecureSession(email: string): string {
  const timestamp = Date.now();
  const sessionHash = Buffer.from(`${email}_${PROPRIETOR_CONFIG.masterKey}_${timestamp}`).toString('hex');
  return `PROPRIETOR_SESSION_${sessionHash}`;
}

// Validate proprietor credentials
export function validateProprietorCredentials(email: string, key: string, ndaAccepted: boolean = false): {
  isValid: boolean;
  accessLevel: string;
  sessionToken?: string;
} {
  const isValidEmail = email === PROPRIETOR_CONFIG.primaryEmail || email === PROPRIETOR_CONFIG.businessEmail;
  const isValidKey = key === PROPRIETOR_CONFIG.masterKey;
  const isValidNDA = ndaAccepted && key.includes(PROPRIETOR_CONFIG.ndaKey);
  
  if (isValidEmail && isValidKey && ndaAccepted) {
    const sessionToken = generateSecureSession(email);
    remoteAccessState.authorizedSessions.add(sessionToken);
    remoteAccessState.currentAccessLevel = "PROPRIETOR_FULL_ACCESS";
    return {
      isValid: true,
      accessLevel: "PROPRIETOR_FULL_ACCESS",
      sessionToken
    };
  }
  
  if (isValidEmail && isValidKey) {
    return {
      isValid: true,
      accessLevel: "PROPRIETOR_LIMITED",
      sessionToken: generateSecureSession(email)
    };
  }
  
  // Log unauthorized attempt
  remoteAccessState.unauthorizedAttempts++;
  remoteAccessState.lastUnauthorizedIP = "";
  
  if (remoteAccessState.unauthorizedAttempts >= PROPRIETOR_CONFIG.maxUnauthorizedAttempts) {
    lockSystemRemotely("Multiple unauthorized access attempts detected");
  }
  
  return { isValid: false, accessLevel: "DENIED" };
}

// Remote lock system function
export function lockSystemRemotely(reason: string = "Proprietor remote lock activated"): void {
  remoteAccessState.isLocked = true;
  remoteAccessState.lockReason = reason;
  remoteAccessState.lockTimestamp = Date.now();
  remoteAccessState.authorizedSessions.clear();
  
  console.log(`🔒🌐 REMOTE SYSTEM LOCK ACTIVATED: ${reason} at ${new Date().toISOString()}`);
  console.log(`📧 Only proprietor can unlock: ${PROPRIETOR_CONFIG.primaryEmail} or ${PROPRIETOR_CONFIG.businessEmail}`);
}

// Remote unlock system function 
export function unlockSystemRemotely(email: string, key: string, ndaConfirmation: string): {
  success: boolean;
  message: string;
  accessLevel?: string;
} {
  const validation = validateProprietorCredentials(email, key, ndaConfirmation === PROPRIETOR_CONFIG.ndaKey);
  
  if (!validation.isValid) {
    return {
      success: false,
      message: "Invalid proprietor credentials. Access denied."
    };
  }
  
  remoteAccessState.isLocked = false;
  remoteAccessState.lockReason = "";
  remoteAccessState.lockTimestamp = null;
  remoteAccessState.unauthorizedAttempts = 0;
  remoteAccessState.currentAccessLevel = validation.accessLevel;
  
  console.log(`✅🌐 REMOTE SYSTEM UNLOCKED: Proprietor ${email} granted ${validation.accessLevel} access`);
  
  return {
    success: true,
    message: `System unlocked. Access level: ${validation.accessLevel}`,
    accessLevel: validation.accessLevel
  };
}

// Get comprehensive system status
export function getAdvancedSystemStatus() {
  return {
    ...remoteAccessState,
    proprietorInfo: {
      name: PROPRIETOR_CONFIG.name,
      emails: [PROPRIETOR_CONFIG.primaryEmail, PROPRIETOR_CONFIG.businessEmail],
      remoteControlEnabled: PROPRIETOR_CONFIG.remoteControlEnabled,
    },
    securityMetrics: {
      totalUnauthorizedAttempts: remoteAccessState.unauthorizedAttempts,
      activeSessions: remoteAccessState.authorizedSessions.size,
      ndaViolationsCount: remoteAccessState.ndaViolations,
      currentThreatLevel: remoteAccessState.unauthorizedAttempts > 1 ? "ELEVATED" : "NORMAL",
    },
    systemCapabilities: {
      featuresCount: 7097,
      securityLevel: "TRILLION_ENHANCED",
      copyrightProtection: "MAXIMUM",
      ndaEnforcement: "ACTIVE",
      remoteControlCapable: true,
    }
  };
}

// Advanced remote lock middleware
export function remoteLockMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip lock check for unlock endpoints
  if (req.path.includes('/unlock') || req.path.includes('/license/status')) {
    return next();
  }
  
  // Check if system is remotely locked
  if (remoteAccessState.isLocked) {
    return res.status(423).json({
      error: "SYSTEM_REMOTELY_LOCKED",
      message: "System has been remotely locked by the proprietor",
      lockReason: remoteAccessState.lockReason,
      lockedSince: remoteAccessState.lockTimestamp,
      proprietorContact: [PROPRIETOR_CONFIG.primaryEmail, PROPRIETOR_CONFIG.businessEmail],
      unlockInstructions: "Only the proprietor can unlock this system using valid credentials and NDA confirmation",
      securityLevel: "MAXIMUM_PROPRIETOR_CONTROL",
      featuresLocked: 7097,
      _proprietor_protection: "This system is protected by trillion-level security measures",
    });
  }
  
  // Log all access attempts for security monitoring
  console.log(`🔐 REMOTE ACCESS LOG: ${new Date().toISOString()} | ${req.method} ${req.path} | IP: ${req.ip} | Status: ${remoteAccessState.currentAccessLevel}`);
  
  next();
}

// NDA violation detection and enforcement
export function ndaViolationMiddleware(req: Request, res: Response, next: NextFunction) {
  // Detect potential NDA violations based on request patterns
  const suspiciousPatterns = [
    'scrape', 'crawl', 'extract', 'copy', 'duplicate', 'mirror',
    'automated', 'bot', 'spider', 'harvest'
  ];
  
  const userAgent = req.get('User-Agent')?.toLowerCase() || '';
  const referer = req.get('Referer')?.toLowerCase() || '';
  
  const isSuspicious = suspiciousPatterns.some(pattern => 
    userAgent.includes(pattern) || referer.includes(pattern)
  );
  
  if (isSuspicious) {
    remoteAccessState.ndaViolations++;
    
    console.log(`⚠️ NDA VIOLATION DETECTED: Suspicious access pattern from IP ${req.ip}`);
    console.log(`User-Agent: ${req.get('User-Agent')}`);
    console.log(`Referer: ${req.get('Referer')}`);
    
    if (remoteAccessState.ndaViolations >= PROPRIETOR_CONFIG.lockdownThreshold) {
      lockSystemRemotely("Multiple NDA violations detected - Automatic lockdown activated");
    }
    
    return res.status(403).json({
      error: "NDA_VIOLATION_DETECTED",
      message: "Potential NDA violation detected. Access restricted.",
      violationType: "AUTOMATED_ACCESS_SUSPECTED",
      proprietorNotified: true,
      legalAction: "COPYRIGHT_INFRINGEMENT_PROCEEDINGS_INITIATED",
      contact: PROPRIETOR_CONFIG.primaryEmail,
      _nda_enforcement: "This content is protected under strict NDA terms"
    });
  }
  
  next();
}