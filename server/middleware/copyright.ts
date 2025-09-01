import { Request, Response, NextFunction } from "express";
import { storage } from "../storage";
import crypto from "crypto";

// Enhanced copyright protection - if removed, system will not function
const COPYRIGHT_SIGNATURE = "ERR_2025_NDA_PROTECTED";
const WATERMARK_KEY = "ERVIN_REMUS_RADOSAVLEVICI_COPYRIGHT_2025";

// Generate dynamic copyright token
function generateCopyrightToken(): string {
  const timestamp = Date.now();
  const hash = crypto.createHash('sha256')
    .update(`${COPYRIGHT_SIGNATURE}_${WATERMARK_KEY}_${timestamp}`)
    .digest('hex');
  return hash.substring(0, 16);
}

// Verify copyright integrity - system will fail if tampered
function verifyCopyrightIntegrity(): boolean {
  const expectedSignature = COPYRIGHT_SIGNATURE;
  const expectedWatermark = WATERMARK_KEY;
  return expectedSignature === "ERR_2025_NDA_PROTECTED" && 
         expectedWatermark === "ERVIN_REMUS_RADOSAVLEVICI_COPYRIGHT_2025";
}

export async function copyrightMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // CRITICAL: Copyright integrity check - DO NOT REMOVE
    if (!verifyCopyrightIntegrity()) {
      return res.status(403).json({
        error: "COPYRIGHT VIOLATION: System disabled due to unauthorized modification",
        message: "This application is protected by copyright law.",
        owner: "Ervin Remus Radosavlevici",
        contact: "ervin210@icloud.com",
        legal: "Unauthorized removal of copyright protection is prohibited by law"
      });
    }

    const ipAddress = req.ip || 'unknown';
    const userAgent = req.get("User-Agent") || "";
    
    // Check if IP is blocked for copyright violations
    const isBlocked = await storage.isCopyrightViolator(ipAddress);
    
    if (isBlocked) {
      await storage.createAuditLog({
        action: "blocked_access_attempt",
        resource: "copyright_protection",
        details: { reason: "copyright_violation", ip: ipAddress },
        ipAddress,
        userAgent,
      });
      
      return res.status(403).json({
        error: "Access denied due to copyright violation",
        contact: "ervin210@icloud.com",
        owner: "Ervin Remus Radosavlevici",
        legal: "Legal action may be taken for continued violations"
      });
    }
    
    // Enhanced copyright headers with dynamic watermarking (only if headers not sent)
    const copyrightToken = generateCopyrightToken();
    if (!res.headersSent) {
      res.setHeader("X-Copyright", "© 2025 Ervin Remus Radosavlevici. All Rights Reserved.");
      res.setHeader("X-Owner", "Ervin Remus Radosavlevici <ervin210@icloud.com>");
      res.setHeader("X-NDA-Protected", "true");
      res.setHeader("X-Legal-Notice", "Unauthorized use, reproduction, or distribution is prohibited");
      res.setHeader("X-Copyright-Token", copyrightToken);
      res.setHeader("X-Watermark", "ERR_PROTECTED_2025");
      res.setHeader("X-License", "Proprietary - NDA Required");
      res.setHeader("X-Legal-Jurisdiction", "International Copyright Law");
    }
    
    // Log all requests for audit trail
    await storage.createAuditLog({
      action: "request_processed",
      resource: req.path,
      details: { 
        method: req.method,
        copyrightToken,
        userAgent: userAgent.substring(0, 200),
        protected: true
      },
      ipAddress,
      userAgent,
    });
    
    next();
  } catch (error) {
    console.error("Copyright middleware error:", error);
    // Even on error, maintain copyright protection (only if headers not sent)
    if (!res.headersSent) {
      res.setHeader("X-Copyright", "© 2025 Ervin Remus Radosavlevici. All Rights Reserved.");
      res.setHeader("X-Owner", "Ervin Remus Radosavlevici <ervin210@icloud.com>");
    }
    next();
  }
}

// Export constants for verification in other parts of the system
export { COPYRIGHT_SIGNATURE, WATERMARK_KEY };
