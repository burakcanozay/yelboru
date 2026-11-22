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
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center bg-[#d9d0bf] p-1">
        <img
          src="./logo-mark-dark.png"
          alt="Yelbörü Logo"
          className="h-full w-full object-contain"
        />
      </div>
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
