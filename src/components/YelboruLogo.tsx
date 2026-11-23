import React from 'react';

interface YelboruLogoProps {
  className?: string;
  showSubtext?: boolean;
}

export const YelboruLogo: React.FC<YelboruLogoProps> = ({
  className = '',
  showSubtext = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <img
        src="./logo-mark-sand.png"
        alt="Yelbörü Logo"
        decoding="async"
        className="h-9 w-9 shrink-0 object-contain"
      />
      <div className="flex flex-col leading-none">
        <span className="font-display text-sm font-medium tracking-[0.26em] text-[#ece6db]">
          YELBÖRÜ
        </span>
        {showSubtext && (
          <span className="mt-1.5 text-[9px] uppercase tracking-[0.22em] text-[#d9d0bf]/45">
            VTOL & UAV Systems
          </span>
        )}
      </div>
    </div>
  );
};
