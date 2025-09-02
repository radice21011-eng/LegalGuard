interface ConsentData {
  hasConsent: boolean;
  hasRejected: boolean;
  timestamp: string;
  version: string;
}

interface GDPRLog {
  timestamp: string;
  action: string;
  path: string;
  userAgent: string;
}

class GDPRManager {
  private readonly CONSENT_KEY = 'moldovanoua_gdpr_consent';
  private readonly LOG_KEY = 'moldovanoua_gdpr_logs';
  private readonly CURRENT_VERSION = '2025.1';

  getConsent(): ConsentData {
    try {
      const stored = localStorage.getItem(this.CONSENT_KEY);
      if (stored) {
        const consent = JSON.parse(stored);
        // Check if consent is still valid (version check)
        if (consent.version === this.CURRENT_VERSION) {
          return consent;
        }
      }
    } catch (error) {
      console.error('Error reading GDPR consent:', error);
    }

    return {
      hasConsent: false,
      hasRejected: false,
      timestamp: '',
      version: this.CURRENT_VERSION
    };
  }

  setConsent(accepted: boolean): void {
    const consentData: ConsentData = {
      hasConsent: accepted,
      hasRejected: !accepted,
      timestamp: new Date().toISOString(),
      version: this.CURRENT_VERSION
    };

    try {
      localStorage.setItem(this.CONSENT_KEY, JSON.stringify(consentData));
      this.logAction(accepted ? 'consent_accepted' : 'consent_rejected');
      
      // Send to server for audit
      this.sendConsentToServer(consentData);
    } catch (error) {
      console.error('Error storing GDPR consent:', error);
    }
  }

  private async sendConsentToServer(consent: ConsentData): Promise<void> {
    try {
      await fetch('/api/gdpr/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consent: consent.hasConsent,
          timestamp: consent.timestamp,
          version: consent.version,
          userAgent: navigator.userAgent
        })
      });
    } catch (error) {
      console.error('Failed to send consent to server:', error);
    }
  }

  logAccess(path: string): void {
    const log: GDPRLog = {
      timestamp: new Date().toISOString(),
      action: 'page_access',
      path: path,
      userAgent: navigator.userAgent
    };

    try {
      const logs = this.getLogs();
      logs.push(log);
      
      // Keep only last 100 logs to prevent storage overflow
      const trimmedLogs = logs.slice(-100);
      localStorage.setItem(this.LOG_KEY, JSON.stringify(trimmedLogs));
    } catch (error) {
      console.error('Error logging GDPR access:', error);
    }
  }

  private logAction(action: string): void {
    const log: GDPRLog = {
      timestamp: new Date().toISOString(),
      action: action,
      path: window.location.pathname,
      userAgent: navigator.userAgent
    };

    try {
      const logs = this.getLogs();
      logs.push(log);
      localStorage.setItem(this.LOG_KEY, JSON.stringify(logs));
    } catch (error) {
      console.error('Error logging GDPR action:', error);
    }
  }

  private getLogs(): GDPRLog[] {
    try {
      const stored = localStorage.getItem(this.LOG_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading GDPR logs:', error);
      return [];
    }
  }

  clearAllData(): void {
    try {
      localStorage.removeItem(this.CONSENT_KEY);
      localStorage.removeItem(this.LOG_KEY);
      this.logAction('data_cleared');
    } catch (error) {
      console.error('Error clearing GDPR data:', error);
    }
  }

  exportData(): string {
    const consent = this.getConsent();
    const logs = this.getLogs();
    
    const exportData = {
      consent,
      logs,
      exportTimestamp: new Date().toISOString(),
      dataController: {
        name: 'Ervin Remus Radosavlevici',
        email: 'ervin210@icloud.com',
        project: 'Moldova Nouă Master Blueprint 2025'
      }
    };

    return JSON.stringify(exportData, null, 2);
  }

  async requestDataDeletion(email: string): Promise<void> {
    try {
      const response = await fetch('/api/gdpr/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          requestType: 'deletion',
          details: {
            localStorage: this.exportData(),
            timestamp: new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit deletion request');
      }

      // Clear local data immediately
      this.clearAllData();
      
    } catch (error) {
      console.error('Error requesting data deletion:', error);
      throw error;
    }
  }

  async requestDataAccess(email: string): Promise<void> {
    try {
      const response = await fetch('/api/gdpr/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          requestType: 'access',
          details: {
            localStorage: this.exportData(),
            timestamp: new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit access request');
      }
      
    } catch (error) {
      console.error('Error requesting data access:', error);
      throw error;
    }
  }

  checkCompliance(): boolean {
    const consent = this.getConsent();
    
    // If user hasn't made a choice yet, they're still compliant
    if (!consent.hasConsent && !consent.hasRejected) {
      return true;
    }

    // If user has made a choice with current version, they're compliant
    return consent.version === this.CURRENT_VERSION;
  }

  getCookiePolicy(): string {
    return `
POLITICA DE COOKIES - Moldova Nouă Blueprint 2025

1. COOKIES ESENȚIALE (Nu pot fi dezactivate)
   • Sesiune și autentificare
   • Preferințe de limbă
   • Protecție CSRF
   • Consimțământ GDPR

2. COOKIES DE SECURITATE
   • Rate limiting
   • Detectarea activității suspecte
   • Protecția copyright

3. DURATA DE STOCARE
   • Cookies de sesiune: Până la închiderea browser-ului
   • Preferințe: 1 an
   • Consimțământ GDPR: 2 ani

4. DREPTURILE DVS.
   • Puteți șterge cookies oricând din browser
   • Puteți solicita informații despre cookies: ervin210@icloud.com

© 2025 Ervin Remus Radosavlevici - Toate drepturile rezervate
    `;
  }
}

export const gdprManager = new GDPRManager();
