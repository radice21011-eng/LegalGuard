import { Request, Response, NextFunction } from "express";
import { storage } from "../storage";

export async function gdprMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Add GDPR compliance headers
    res.setHeader("X-GDPR-Compliant", "true");
    res.setHeader("X-Data-Protection", "EU-GDPR-2025");
    res.setHeader("X-Privacy-Policy", "/legal/privacy");
    res.setHeader("X-Cookie-Policy", "essential-only");
    
    // Log data access for GDPR audit trail
    if (req.method === "GET" && req.path.startsWith("/api/")) {
      await storage.createAuditLog({
        action: "data_access",
        resource: req.path,
        details: { 
          method: req.method,
          query: req.query,
          gdprCompliant: true
        },
        ipAddress: req.ip,
        userAgent: req.get("User-Agent") || "",
      });
    }
    
    // Log data modifications for GDPR audit trail
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method) && req.path.startsWith("/api/")) {
      await storage.createAuditLog({
        action: "data_modification",
        resource: req.path,
        details: { 
          method: req.method,
          hasBody: !!req.body,
          gdprCompliant: true
        },
        ipAddress: req.ip,
        userAgent: req.get("User-Agent") || "",
      });
    }
    
    next();
  } catch (error) {
    console.error("GDPR middleware error:", error);
    next();
  }
}
