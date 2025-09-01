import { useState, useEffect, useCallback } from "react";
import { copyrightChecker } from "@/lib/copyright";

export function useCopyright() {
  const [isViolated, setIsViolated] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const checkCopyright = useCallback(() => {
    const violation = copyrightChecker.checkViolation();
    if (violation.isViolated) {
      setIsViolated(true);
      copyrightChecker.reportViolation(violation.type, violation.details);
    }
    return !violation.isViolated;
  }, []);

  const checkBlockStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/copyright/status");
      const data = await response.json();
      setIsBlocked(data.blocked);
    } catch (error) {
      console.error("Failed to check copyright status:", error);
    }
  }, []);

  useEffect(() => {
    // Initial checks
    checkCopyright();
    checkBlockStatus();

    // Set up continuous monitoring
    const observer = new MutationObserver(() => {
      checkCopyright();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });

    // Periodic checks
    const interval = setInterval(checkCopyright, 5000);

    // Anti-tampering measures
    const preventRightClick = (e: MouseEvent) => e.preventDefault();
    const preventSelect = (e: Event) => e.preventDefault();
    const preventDrag = (e: DragEvent) => e.preventDefault();

    document.addEventListener('contextmenu', preventRightClick);
    document.addEventListener('selectstart', preventSelect);
    document.addEventListener('dragstart', preventDrag);

    // Keyboard shortcuts prevention
    const preventKeyboard = (e: KeyboardEvent) => {
      // Prevent F12, Ctrl+Shift+I, Ctrl+U, etc.
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
        copyrightChecker.reportViolation('dev_tools_attempt', {
          key: e.key,
          ctrlKey: e.ctrlKey,
          shiftKey: e.shiftKey
        });
      }
    };

    document.addEventListener('keydown', preventKeyboard);

    return () => {
      observer.disconnect();
      clearInterval(interval);
      document.removeEventListener('contextmenu', preventRightClick);
      document.removeEventListener('selectstart', preventSelect);
      document.removeEventListener('dragstart', preventDrag);
      document.removeEventListener('keydown', preventKeyboard);
    };
  }, [checkCopyright, checkBlockStatus]);

  return {
    isViolated,
    isBlocked,
    checkCopyright
  };
}
