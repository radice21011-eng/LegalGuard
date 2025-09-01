import { Request, Response, NextFunction } from "express";

// Global type for rate limiting
declare global {
  var requestLog: Map<string, number[]> | undefined;
}

export function securityMiddleware(req: Request, res: Response, next: NextFunction) {
  // Security headers
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  
  // Content Security Policy
  res.setHeader("Content-Security-Policy", [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: http:",
    "connect-src 'self'",
    "frame-ancestors 'none'"
  ].join("; "));
  
  // Rate limiting simulation (basic)
  const userKey = (req.ip || 'unknown') + req.get("User-Agent");
  const now = Date.now();
  
  // Store request timestamps (in production, use Redis)
  if (!globalThis.requestLog) {
    globalThis.requestLog = new Map();
  }
  
  const requests = globalThis.requestLog.get(userKey) || [];
  const recentRequests = requests.filter((time: number) => now - time < 60000); // 1 minute window
  
  if (recentRequests.length > 100) { // 100 requests per minute limit
    return res.status(429).json({ 
      error: "Rate limit exceeded",
      retryAfter: 60
    });
  }
  
  recentRequests.push(now);
  globalThis.requestLog.set(userKey, recentRequests);
  
  next();
}
