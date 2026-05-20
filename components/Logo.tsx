type LogoProps = {
  className?: string;
  size?: number;
};

/**
 * Stable Reef logo mark.
 * Three stacked wave/reef layers — abstract coral strata viewed from the side.
 * Uses currentColor so it inherits the surrounding text color.
 */
export function LogoMark({ className, size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 22 Q 8 18, 16 22 T 30 22 L 30 26 L 2 26 Z"
        opacity="0.95"
      />
      <path
        d="M4 16 Q 10 12, 16 16 T 28 16 L 28 19 L 4 19 Z"
        opacity="0.7"
      />
      <path
        d="M8 10 Q 12 7, 16 10 T 24 10 L 24 12 L 8 12 Z"
        opacity="0.45"
      />
    </svg>
  );
}

/**
 * Full lockup: logo mark + "Stable Reef" wordmark.
 * Sized for use as the primary site brand in the page header.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 sm:gap-5 ${className ?? ""}`}>
      <LogoMark
        className="text-[var(--accent)] h-20 w-20 sm:h-28 sm:w-28"
        size={128}
      />
      <span className="text-4xl font-semibold tracking-tight sm:text-6xl">
        Stable<span className="text-[var(--accent)]">Reef</span>
      </span>
    </div>
  );
}
