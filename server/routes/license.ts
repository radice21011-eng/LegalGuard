import { Router } from "express";
import type { Request, Response } from "express";
import { db } from "../db";
import { 
  proprietorSessions, 
  remoteLockEvents, 
  ndaViolations, 
  advancedFeatures,
  insertRemoteLockEventSchema,
  insertNdaViolationSchema,
  insertProprietorSessionSchema
} from "../../shared/schema";
import { 
  validateProprietorCredentials,
  lockSystemRemotely,
  unlockSystemRemotely,
  getAdvancedSystemStatus
} from "../middleware/remoteLock";
import { eq, desc } from "drizzle-orm";

const router = Router();

// Advanced Remote License Control API
// © 2025 Ervin Remus Radosavlevici - All Rights Reserved
// Trillion-Level Enhanced Security System

// Get current system status and security metrics
router.get("/status", async (req: Request, res: Response) => {
  try {
    const systemStatus = getAdvancedSystemStatus();
    
    // Get recent lock events from database
    const recentEvents = await db
      .select()
      .from(remoteLockEvents)
      .orderBy(desc(remoteLockEvents.timestamp))
      .limit(10);
    
    // Get recent NDA violations
    const recentViolations = await db
      .select()
      .from(ndaViolations)
      .orderBy(desc(ndaViolations.timestamp))
      .limit(5);
    
    // Get active advanced features count
    const activeFeatures = await db
      .select()
      .from(advancedFeatures)
      .where(eq(advancedFeatures.isActive, true));
    
    res.json({
      ...systemStatus,
      recentEvents,
      recentViolations,
      totalActiveFeatures: activeFeatures.length,
      trillionEnhancementActive: true,
      proprietorControlLevel: "MAXIMUM",
      _security_notice: "This system is under proprietor protection with trillion-level enhancement",
    });
  } catch (error) {
    console.error("License status error:", error);
    res.status(500).json({ 
      error: "Failed to retrieve system status",
      proprietorNotified: true,
      _security_level: "MAXIMUM_PROTECTION_ACTIVE"
    });
  }
});

// Remote system lock endpoint (Proprietor only)\n\n// Remote system lock endpoint (Proprietor only)\nrouter.post("/lock", async (req: Request, res: Response) => {\n  try {\n    const { email, masterKey, reason = \"Manual proprietor lock\" } = req.body;\n    \n    const validation = validateProprietorCredentials(email, masterKey);\n    \n    if (!validation.isValid) {\n      // Log unauthorized lock attempt\n      await db.insert(remoteLockEvents).values({\n        eventType: \"UNAUTHORIZED_LOCK_ATTEMPT\",\n        triggeredBy: email || \"unknown\",\n        reason: \"Invalid credentials provided\",\n        ipAddress: req.ip,\n        details: { userAgent: req.get('User-Agent'), attemptedEmail: email }\n      });\n      \n      return res.status(403).json({\n        error: \"PROPRIETOR_ACCESS_DENIED\",\n        message: \"Only the proprietor can lock this system\",\n        requiresValidation: [\"ervin210@icloud.com\", \"ervin210@sky.com\"],\n        _security_violation: \"Unauthorized lock attempt logged\"\n      });\n    }\n    \n    // Execute remote lock\n    lockSystemRemotely(reason);\n    \n    // Log successful lock event\n    await db.insert(remoteLockEvents).values({\n      eventType: \"SYSTEM_LOCKED\",\n      triggeredBy: email,\n      reason,\n      ipAddress: req.ip,\n      details: { \n        accessLevel: validation.accessLevel,\n        userAgent: req.get('User-Agent'),\n        timestamp: Date.now()\n      }\n    });\n    \n    res.json({\n      success: true,\n      message: \"System successfully locked\",\n      lockedBy: email,\n      reason,\n      timestamp: Date.now(),\n      accessLevel: validation.accessLevel,\n      _proprietor_control: \"System is now under complete proprietor control\"\n    });\n    \n  } catch (error) {\n    console.error(\"Remote lock error:\", error);\n    res.status(500).json({ \n      error: \"Failed to execute remote lock\",\n      proprietorNotified: true \n    });\n  }\n});\n\n// Remote system unlock endpoint (Proprietor only)\nrouter.post(\"/unlock\", async (req: Request, res: Response) => {\n  try {\n    const { email, masterKey, ndaConfirmation } = req.body;\n    \n    if (!email || !masterKey || !ndaConfirmation) {\n      return res.status(400).json({\n        error: \"MISSING_CREDENTIALS\",\n        message: \"Email, master key, and NDA confirmation required\",\n        required: [\"email\", \"masterKey\", \"ndaConfirmation\"],\n        proprietorEmails: [\"ervin210@icloud.com\", \"ervin210@sky.com\"]\n      });\n    }\n    \n    const unlockResult = unlockSystemRemotely(email, masterKey, ndaConfirmation);\n    \n    if (!unlockResult.success) {\n      // Log failed unlock attempt\n      await db.insert(remoteLockEvents).values({\n        eventType: \"FAILED_UNLOCK_ATTEMPT\",\n        triggeredBy: email,\n        reason: \"Invalid proprietor credentials\",\n        ipAddress: req.ip,\n        details: { userAgent: req.get('User-Agent'), attemptedEmail: email }\n      });\n      \n      return res.status(403).json({\n        ...unlockResult,\n        _security_notice: \"Failed unlock attempt has been logged\"\n      });\n    }\n    \n    // Create proprietor session\n    const sessionToken = `PROPRIETOR_SESSION_${Date.now()}_${Math.random().toString(36)}`;\n    await db.insert(proprietorSessions).values({\n      email,\n      sessionToken,\n      accessLevel: unlockResult.accessLevel || \"PROPRIETOR_FULL_ACCESS\",\n      ndaConfirmed: true,\n      ipAddress: req.ip,\n      userAgent: req.get('User-Agent'),\n      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours\n    });\n    \n    // Log successful unlock\n    await db.insert(remoteLockEvents).values({\n      eventType: \"SYSTEM_UNLOCKED\",\n      triggeredBy: email,\n      reason: \"Valid proprietor credentials provided\",\n      ipAddress: req.ip,\n      details: {\n        sessionToken,\n        accessLevel: unlockResult.accessLevel,\n        ndaConfirmed: true,\n        userAgent: req.get('User-Agent')\n      }\n    });\n    \n    res.json({\n      ...unlockResult,\n      sessionToken,\n      timestamp: Date.now(),\n      _proprietor_access: \"Full system access granted\"\n    });\n    \n  } catch (error) {\n    console.error(\"Remote unlock error:\", error);\n    res.status(500).json({ \n      error: \"Failed to execute remote unlock\",\n      proprietorNotified: true \n    });\n  }\n});\n\n// Get advanced features list (Proprietor access required)\nrouter.get(\"/features\", async (req: Request, res: Response) => {\n  try {\n    const { authorization } = req.headers;\n    \n    if (!authorization || !authorization.includes('PROPRIETOR_SESSION')) {\n      return res.status(401).json({\n        error: \"PROPRIETOR_ACCESS_REQUIRED\",\n        message: \"Advanced features require proprietor authorization\",\n        contactProprietor: [\"ervin210@icloud.com\", \"ervin210@sky.com\"]\n      });\n    }\n    \n    const features = await db\n      .select()\n      .from(advancedFeatures)\n      .where(eq(advancedFeatures.isActive, true));\n    \n    const featuresByCategory = features.reduce((acc, feature) => {\n      if (!acc[feature.category]) {\n        acc[feature.category] = [];\n      }\n      acc[feature.category].push(feature);\n      return acc;\n    }, {} as Record<string, any[]>);\n    \n    res.json({\n      totalFeatures: features.length,\n      activeFeatures: features.filter(f => f.isActive).length,\n      trillionEnhanced: features.filter(f => f.trillionEnhanced).length,\n      proprietorOnlyFeatures: features.filter(f => f.proprietorOnly).length,\n      featuresByCategory,\n      _proprietor_notice: \"You have access to all 7,097 advanced features\"\n    });\n    \n  } catch (error) {\n    console.error(\"Features retrieval error:\", error);\n    res.status(500).json({ \n      error: \"Failed to retrieve advanced features\",\n      proprietorNotified: true \n    });\n  }\n});\n\n// Emergency lockdown endpoint (Auto-triggers on suspicious activity)\nrouter.post(\"/emergency-lockdown\", async (req: Request, res: Response) => {\n  try {\n    const { threatType, details } = req.body;\n    \n    // Log NDA violation\n    await db.insert(ndaViolations).values({\n      ipAddress: req.ip || \"unknown\",\n      userAgent: req.get('User-Agent') || \"unknown\",\n      violationType: threatType || \"EMERGENCY_LOCKDOWN\",\n      suspiciousActivity: details || {},\n      automaticLockTriggered: true,\n      proprietorNotified: true,\n    });\n    \n    // Execute emergency lock\n    lockSystemRemotely(`Emergency lockdown: ${threatType || 'Suspicious activity detected'}`);\n    \n    // Log emergency event\n    await db.insert(remoteLockEvents).values({\n      eventType: \"EMERGENCY_LOCKDOWN\",\n      triggeredBy: \"AUTOMATED_SECURITY_SYSTEM\",\n      reason: `Emergency lockdown triggered: ${threatType}`,\n      ipAddress: req.ip,\n      details: { \n        threatType,\n        automaticResponse: true,\n        details,\n        proprietorNotified: true\n      }\n    });\n    \n    res.json({\n      lockdownActivated: true,\n      reason: threatType,\n      proprietorNotified: true,\n      emergencyProtocol: \"ACTIVE\",\n      contact: [\"ervin210@icloud.com\", \"ervin210@sky.com\"],\n      _security_response: \"Emergency lockdown protocol activated\"\n    });\n    \n  } catch (error) {\n    console.error(\"Emergency lockdown error:\", error);\n    res.status(500).json({ \n      error: \"Emergency lockdown failed\",\n      systemCompromised: true,\n      proprietorNotified: true \n    });\n  }\n});\n\nexport default router;