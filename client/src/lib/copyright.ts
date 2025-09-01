interface ViolationResult {
  isViolated: boolean;
  type: string;
  details: any;
}

class CopyrightChecker {
  private readonly requiredTexts = [
    "Ervin Remus Radosavlevici",
    "ervin210@icloud.com",
    "© 2025"
  ];

  private readonly protectedPhrases = [
    "Moldova Nouă Master Blueprint 2025",
    "Children First – without children, the project has no heart",
    "NDA PROTECTED"
  ];

  checkViolation(): ViolationResult {
    const content = document.documentElement.innerHTML;
    
    // Check for copyright removal
    for (const text of this.requiredTexts) {
      if (!content.includes(text)) {
        return {
          isViolated: true,
          type: "copyright_removal",
          details: { missingText: text, timestamp: new Date().toISOString() }
        };
      }
    }

    // Check for content tampering
    const copyrightElements = document.querySelectorAll('.copyright-protected');
    if (copyrightElements.length === 0) {
      return {
        isViolated: true,
        type: "copyright_element_removal",
        details: { timestamp: new Date().toISOString() }
      };
    }

    // Check for watermark tampering
    const body = document.body;
    const computedStyle = window.getComputedStyle(body, '::before');
    const watermarkContent = computedStyle.getPropertyValue('content');
    
    if (!watermarkContent || watermarkContent === 'none') {
      return {
        isViolated: true,
        type: "watermark_removal",
        details: { timestamp: new Date().toISOString() }
      };
    }

    // Check for prohibited modifications
    const titleElement = document.querySelector('title');
    if (titleElement && !titleElement.textContent?.includes('Ervin Remus Radosavlevici')) {
      return {
        isViolated: true,
        type: "title_modification",
        details: { 
          currentTitle: titleElement.textContent,
          timestamp: new Date().toISOString() 
        }
      };
    }

    return { isViolated: false, type: "", details: {} };
  }

  async reportViolation(type: string, details: any): Promise<void> {
    try {
      await fetch("/api/copyright/report-violation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          violationType: type,
          details: {
            ...details,
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString()
          }
        })
      });
    } catch (error) {
      console.error("Failed to report copyright violation:", error);
    }
  }

  blockAccess(): void {
    document.body.innerHTML = `
      <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;z-index:9999;font-family:Arial,sans-serif;text-align:center;">
        <div>
          <h1 style="color:#ff4444;margin-bottom:20px;font-size:2.5rem;">⚠️ COPYRIGHT VIOLATION DETECTED</h1>
          <p style="font-size:1.2rem;margin-bottom:15px;">This content is protected by copyright law.</p>
          <p style="margin-bottom:10px;"><strong>Owner:</strong> Ervin Remus Radosavlevici</p>
          <p style="margin-bottom:30px;"><strong>Contact:</strong> ervin210@icloud.com</p>
          <p style="color:#888;margin-top:40px;">All rights reserved. Unauthorized use is prohibited.</p>
          <p style="color:#666;margin-top:20px;font-size:0.9rem;">Violation logged and reported to authorities.</p>
        </div>
      </div>
    `;
    
    // Prevent further interaction
    document.addEventListener('keydown', (e) => e.preventDefault());
    document.addEventListener('mousedown', (e) => e.preventDefault());
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
    });
  }

  addWatermark(): void {
    // Ensure watermark is present
    const style = document.createElement('style');
    style.textContent = `
      body::before {
        content: "© 2025 Ervin Remus Radosavlevici";
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 3rem;
        font-weight: 800;
        color: rgba(34, 211, 238, 0.1);
        z-index: -1;
        pointer-events: none;
        white-space: nowrap;
      }
    `;
    document.head.appendChild(style);
  }

  enableProtection(): void {
    // Disable dev tools
    const devtools = {
      open: false,
      orientation: null
    };

    const threshold = 160;

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          this.reportViolation('dev_tools_opened', {
            windowSize: {
              outer: { width: window.outerWidth, height: window.outerHeight },
              inner: { width: window.innerWidth, height: window.innerHeight }
            }
          });
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Disable common shortcuts
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        this.reportViolation('dev_tools_attempt', {
          key: e.key,
          ctrlKey: e.ctrlKey,
          shiftKey: e.shiftKey
        });
      }
    });

    // Disable printing
    window.addEventListener('beforeprint', (e) => {
      e.preventDefault();
      this.reportViolation('print_attempt', {});
      alert('Printing is disabled to protect copyright.');
    });

    // Console warning
    console.clear();
    console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
    console.log('%cThis is a browser feature intended for developers. Content is protected by copyright law.', 'color: red; font-size: 16px;');
    console.log('%c© 2025 Ervin Remus Radosavlevici - All Rights Reserved', 'color: blue; font-size: 14px;');
  }
}

export const copyrightChecker = new CopyrightChecker();
