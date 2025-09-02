import { Request, Response, NextFunction } from "express";

// Advanced Watermarking and Copyright Protection System
// © 2025 Ervin Remus Radosavlevici - All Rights Reserved

const OWNER_INFO = {
  name: "Ervin Remus Radosavlevici",
  email: "ervin210@icloud.com",
  copyright: "© 2025 Ervin Remus Radosavlevici. All Rights Reserved.",
  watermark: "LEGAL_GUARD_PRODUCTION_READY_ERR_2025"
};

// Generate unique watermark for each request
function generateWatermark(req: Request): string {
  const timestamp = Date.now();
  const userFingerprint = Buffer.from(req.ip || 'unknown').toString('base64');
  const sessionId = Math.random().toString(36).substring(2);
  
  return `${OWNER_INFO.watermark}_${timestamp}_${userFingerprint}_${sessionId}`;
}

// Add digital watermark to all responses
export function watermarkMiddleware(req: Request, res: Response, next: NextFunction) {
  const watermark = generateWatermark(req);
  
  // Add copyright and watermark headers
  res.setHeader("X-Copyright-Owner", OWNER_INFO.name);
  res.setHeader("X-Owner-Email", OWNER_INFO.email);
  res.setHeader("X-Copyright-Notice", OWNER_INFO.copyright);
  res.setHeader("X-Digital-Watermark", watermark);
  res.setHeader("X-Production-Ready", "true");
  res.setHeader("X-Real-Data", "production-grade");
  res.setHeader("X-Project-Value", "multi-billion-euro");
  res.setHeader("X-License", "private-exclusive");
  res.setHeader("X-NDA-Protected", "true");
  res.setHeader("X-Unauthorized-Use-Prohibited", "legal-action-enforced");
  
  // Override res.json to add watermark to JSON responses
  const originalJson = res.json;
  res.json = function(data: any) {
    if (typeof data === 'object' && data !== null) {
      data._watermark = watermark;
      data._copyright = OWNER_INFO.copyright;
      data._owner = OWNER_INFO.name;
      data._production_ready = true;
      data._real_data = "This contains real project data worth billions";
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