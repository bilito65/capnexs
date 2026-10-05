import React from 'react';

interface CapnexsLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  light?: boolean;
}

export const CapnexsLogo: React.FC<CapnexsLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  light = false,
}) => {
  const sizeClasses = {
    sm: {
      text: 'text-lg tracking-[0.25em]',
      sub: 'text-[7px] tracking-[0.22em] mt-0.5',
      payote: 'text-[6px] tracking-[0.3em] mt-0.5',
      divider: 'w-6 h-[1px] my-0.5',
      xSize: 'text-lg',
    },
    md: {
      text: 'text-2xl tracking-[0.28em]',
      sub: 'text-[9px] tracking-[0.28em] mt-1',
      payote: 'text-[8px] tracking-[0.35em] mt-0.5',
      divider: 'w-9 h-[1.5px] my-1',
      xSize: 'text-2xl',
    },
    lg: {
      text: 'text-4xl tracking-[0.32em]',
      sub: 'text-[11px] tracking-[0.32em] mt-1.5',
      payote: 'text-[9px] tracking-[0.4em] mt-1',
      divider: 'w-12 h-[2px] my-1.5',
      xSize: 'text-4xl',
    },
    xl: {
      text: 'text-6xl md:text-7xl tracking-[0.35em]',
      sub: 'text-xs md:text-sm tracking-[0.35em] mt-2',
      payote: 'text-[11px] md:text-xs tracking-[0.45em] mt-1.5',
      divider: 'w-16 h-[2.5px] my-2',
      xSize: 'text-6xl md:text-7xl',
    }
  };

  const currentSize = sizeClasses[size];
  const textColor = light ? 'text-payote-cream' : 'text-payote-cream';
  const subColor = light ? 'text-payote-slate' : 'text-[#A0988E]';

  return (
    <div className={`inline-flex flex-col items-center select-none font-sans ${className}`}>
      {/* Brand Name with Custom Glyph Styling */}
      <div className={`flex items-center font-medium ${currentSize.text} ${textColor}`}>
        <span>C</span>
        {/* Lambda / Minimal Chevron A */}
        <span className="inline-block mx-[0.06em] font-normal scale-y-95">Λ</span>
        <span>P</span>
        <span>N</span>
        {/* Triple horizontal line E */}
        <span className="inline-flex flex-col justify-center gap-[3px] mx-[0.08em] h-[0.7em] w-[0.55em]">
          <span className="w-full h-[1.5px] bg-current rounded-full"></span>
          <span className="w-full h-[1.5px] bg-current rounded-full"></span>
          <span className="w-full h-[1.5px] bg-current rounded-full"></span>
        </span>
        {/* Glowing Champagne Gold Metallic X */}
        <span className="relative inline-block font-semibold bg-gradient-to-br from-[#F5E2A8] via-[#C9A84C] to-[#8C6D23] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(201,168,76,0.45)]">
          X
        </span>
        <span>S</span>
      </div>

      {showSubtitle && (
        <>
          {/* Subtitle: PRIVATE FINANCE & CAPITAL ADVISORY */}
          <div className={`font-mono uppercase font-light ${currentSize.sub} ${subColor} text-center`}>
            PRIVATE FINANCE & CAPITAL ADVISORY
          </div>

          {/* Golden metallic divider bar */}
          <div className={`${currentSize.divider} bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent rounded-full`} />

          {/* BY PAYOTE */}
          <div className={`font-mono uppercase font-semibold ${currentSize.payote} text-[#C9A84C] text-center`}>
            BY PAYOTE
          </div>
        </>
      )}
    </div>
  );
};
