import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFading(true), 1150);
    const doneTimer = window.setTimeout(() => onComplete(), 1550);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      onClick={() => {
        setFading(true);
        window.setTimeout(onComplete, 250);
      }}
      role="presentation"
      aria-label="Yelbörü açılış ekranı"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000] transition-opacity duration-500 ease-out cursor-pointer ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center px-6 text-center">
        <img
          src="./logo-mark-sand.png"
          alt="Yelbörü Logo"
          className="h-24 w-24 object-contain sm:h-28 sm:w-28"
        />

        <span className="mt-8 font-display text-xl font-semibold tracking-[0.34em] text-[#d9d0bf] sm:text-2xl">
          YELBÖRÜ
        </span>

        <div className="mt-6 h-px w-40 overflow-hidden bg-[#d9d0bf]/15">
          <div className="splash-progress h-full w-full bg-[#d9d0bf]" />
        </div>
      </div>
    </div>
  );
};
