import { useCopyright } from "@/hooks/useCopyright";

export function Copyright() {
  const { checkCopyright } = useCopyright();

  // Continuous copyright monitoring
  setInterval(checkCopyright, 5000);

  return (
    <div className="hidden" data-testid="copyright-component">
      {/* This component ensures copyright protection is always active */}
      <span className="copyright-protected">© 2025 Ervin Remus Radosavlevici</span>
      <span className="copyright-protected">ervin210@icloud.com</span>
    </div>
  );
}
