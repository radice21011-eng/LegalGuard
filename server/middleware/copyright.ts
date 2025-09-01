import { Request, Response, NextFunction } from "express";
import { storage } from "../storage";

export async function copyrightMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const ipAddress = req.ip;
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
        owner: "Ervin Remus Radosavlevici"
      });
    }
    
    // Add copyright headers
    res.setHeader("X-Copyright", "© 2025 Ervin Remus Radosavlevici. All Rights Reserved.");
    res.setHeader("X-Owner", "Ervin Remus Radosavlevici <ervin210@icloud.com>");
    res.setHeader("X-NDA-Protected", "true");
    
    next();
  } catch (error) {
    console.error("Copyright middleware error:", error);
    next();
  }
}
