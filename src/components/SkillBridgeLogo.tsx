import React from 'react';

interface SkillBridgeLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'white';
  height?: number;
  width?: number;
}

export const SkillBridgeLogo: React.FC<SkillBridgeLogoProps> = ({
  className = 'h-9 w-auto',
  variant = 'full',
  height,
  width,
}) => {
  // Variant colors
  const isWhite = variant === 'white';
  const skillColor = isWhite ? '#FFFFFF' : '#5A6270';
  const bridgeColor = isWhite ? '#93C5FD' : '#1251BA';
  const iconColor = isWhite ? '#60A5FA' : '#1251BA';

  if (variant === 'mark') {
    // Just the Bridge Icon Mark
    return (
      <svg
        viewBox="0 0 250 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ height, width }}
        aria-label="SkillBridge Logo Mark"
        role="img"
      >
        <g fill={iconColor}>
          {/* Bridge Arch & Struts (Left segment) */}
          {/* Top arch rib */}
          <path d="M12 70 C30 35, 60 16, 100 12 C98 19, 95 25, 93 30 C64 34, 40 48, 26 76 Z" />
          {/* Vertical suspension struts */}
          <path d="M29 67 L39 67 L39 49 C35 55, 32 61, 29 67 Z" />
          <path d="M44 67 L54 67 L54 39 C50 43, 47 48, 44 54 Z" />
          <path d="M59 67 L69 67 L69 32 C65 35, 62 39, 59 44 Z" />
          <path d="M74 67 L84 67 L84 27 C80 29, 77 32, 74 36 Z" />

          {/* Right Swooping Cable Lanes */}
          {/* Band 1 (Top / Outer) */}
          <path d="M100 12 C135 15, 175 42, 245 128 L218 128 C158 56, 126 31, 98 25 C100 18, 100 14, 100 12 Z" />
          {/* Band 2 (Middle) */}
          <path d="M105 32 C135 40, 168 64, 210 128 L188 128 C152 72, 124 50, 96 42 C99 38, 102 35, 105 32 Z" />
          {/* Band 3 (Inner / Bottom) */}
          <path d="M106 51 C128 58, 154 78, 180 128 L160 128 C138 84, 118 67, 95 60 C98 56, 102 53, 106 51 Z" />
        </g>
      </svg>
    );
  }

  // Full Wordmark with Arch
  return (
    <svg
      viewBox="0 0 680 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ height, width }}
      aria-label="SkillBridge"
      role="img"
    >
      {/* "SKILL" Text */}
      <text
        x="15"
        y="126"
        fill={skillColor}
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
        fontSize="78"
        fontWeight="300"
        letterSpacing="3.5"
      >
        SKILL
      </text>

      {/* "BRIDGE" Text */}
      <text
        x="215"
        y="126"
        fill={bridgeColor}
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
        fontSize="78"
        fontWeight="800"
        letterSpacing="2.5"
      >
        BRIDGE
      </text>

      {/* Bridge Arch Graphic positioned above the right section */}
      <g fill={iconColor} transform="translate(390, 10) scale(1.15)">
        {/* Left curve and vertical struts */}
        <path d="M0 64 C16 32, 42 15, 78 12 C76 18, 74 23, 72 28 C45 31, 24 45, 12 70 Z" />
        {/* Struts */}
        <path d="M14 62 L22 62 L22 47 C19 52, 16 57, 14 62 Z" />
        <path d="M26 62 L34 62 L34 38 C31 42, 28 47, 26 52 Z" />
        <path d="M38 62 L46 62 L46 32 C43 35, 40 39, 38 43 Z" />
        <path d="M50 62 L58 62 L58 27 C55 29, 52 32, 50 36 Z" />

        {/* Right swooping lanes */}
        {/* Lane 1 (Outer/Top) */}
        <path d="M78 12 C108 15, 142 38, 205 110 L182 110 C128 48, 100 27, 76 22 C78 16, 78 13, 78 12 Z" />
        {/* Lane 2 (Middle) */}
        <path d="M82 28 C108 35, 136 55, 175 110 L156 110 C124 62, 100 43, 75 36 C77 33, 80 30, 82 28 Z" />
        {/* Lane 3 (Inner) */}
        <path d="M84 44 C104 50, 126 67, 148 110 L131 110 C114 73, 97 58, 75 52 C78 49, 81 46, 84 44 Z" />
      </g>
    </svg>
  );
};
