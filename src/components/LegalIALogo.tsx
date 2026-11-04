import React from 'react';

interface LegalIALogoProps {
  size?: number;
  className?: string;
  variant?: 'sky' | 'navy' | 'white';
}

/**
 * Official Brand Logo of Legal-IA based on Brand Book (Page 3):
 * Square frame with vertical "LEGAL" on the left and bold geometric "IA" on the right.
 */
export const LegalIALogo: React.FC<LegalIALogoProps> = ({
  size = 40,
  className = '',
  variant = 'sky'
}) => {
  const color =
    variant === 'sky'
      ? '#38B6FF'
      : variant === 'navy'
      ? '#1E293B'
      : '#FFFFFF';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="Logo Legal-IA"
    >
      {/* Outer bounding box frame with Brand Book stroke */}
      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        stroke={color}
        strokeWidth="6"
        rx="2"
      />

      {/* Vertical divider line separating LEGAL column from IA */}
      <line
        x1="28"
        y1="5"
        x2="28"
        y2="95"
        stroke={color}
        strokeWidth="5"
      />

      {/* Vertical text: "LEGAL" */}
      <g transform="translate(18, 50) rotate(-90)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          dominantBaseline="central"
          fill={color}
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="800"
          fontSize="17"
          letterSpacing="4"
        >
          LEGAL
        </text>
      </g>

      {/* Large bold geometric "I" and "A" */}
      {/* Letter "I" */}
      <rect
        x="36"
        y="22"
        width="8"
        height="56"
        fill={color}
      />

      {/* Letter "A" */}
      <path
        d="M51 78V22H84V78H74V56H61V78H51ZM61 48H74V30H61V48Z"
        fill={color}
      />
    </svg>
  );
};
