import { useState, useRef, useEffect } from "react";

export const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const privacyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showPrivacy && privacyRef.current) {
      privacyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showPrivacy]);

  return (
    <div className="bg-primary mt-4">
      <div
        className="mx-auto truncate w-full max-w-[1500px] px-4 sm:px-6 lg:px-8 
                    flex justify-between items-center text-lg text-secondary"
      >
        <span>&copy; 2025 Casimir Lundberg</span>
        <button
          onClick={() => setShowPrivacy(!showPrivacy)}
          className="underline hover:opacity-80 cursor-pointer"
        >
          Privacy
        </button>
      </div>

      {showPrivacy && (
        <div
          ref={privacyRef}
          className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 mt-2 text-sm text-secondary"
        >
          This site uses <strong>Cloudflare Web Analytics</strong> to measure
          traffic. The analytics are <strong>anonymous</strong>,{" "}
          <strong>cookie-free</strong>, and
          <strong> GDPR-compliant</strong>. No personal data is collected or
          stored.
        </div>
      )}
    </div>
  );
};
