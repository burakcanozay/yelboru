import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { siteData, t } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  ready: boolean;
  onExploreProjects: () => void;
  onJoinOrSponsor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ ready, onExploreProjects, onJoinOrSponsor }) => {
  const { lang } = useLanguage();
  const [mediaFailed, setMediaFailed] = useState(false);
  const [entered, setEntered] = useState<boolean>(false);

  useEffect(() => {
    if (!ready) {
      setEntered(false);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEntered(true);
      return;
    }
    const rafId = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(rafId);
  }, [ready]);

  const backgroundVideo = siteData.hero.backgroundVideo?.trim();
  const backgroundImage = siteData.hero.backgroundImage?.trim();
  const hasRealMedia = !mediaFailed && Boolean(backgroundVideo || backgroundImage);

  const revealStyle = (delayMs: number): React.CSSProperties => ({
    transitionDuration: '700ms',
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    transitionDelay: `${delayMs}ms`,
    transform: entered ? 'translate3d(0, 0, 0)' : 'translate3d(0, 8px, 0)',
    opacity: entered ? 1 : 0,
  });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#000000] pt-[72px]"
    >
      {/* Background Layer 1: Optional Studio VTOL Photo / Video with Automatic Fallback */}
      {hasRealMedia && backgroundVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          onError={() => setMediaFailed(true)}
          className="media-editorial pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : hasRealMedia && backgroundImage ? (
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          decoding="async"
          onError={() => setMediaFailed(true)}
          className="media-editorial pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
        />
      ) : null}

      {/* Background Layer 2: Top & Bottom Pure #000000 Scrim Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: hasRealMedia
            ? 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.45) 38%, rgba(0, 0, 0, 0.55) 68%, #000000 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.35) 55%, rgba(0, 0, 0, 0.5) 100%)'
            : 'radial-gradient(ellipse 58% 60% at 76% 48%, rgba(217, 208, 191, 0.055) 0%, rgba(0, 0, 0, 0) 68%), linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.15) 45%, #000000 100%)',
        }}
      />

      {/* Background Layer 3: Monumental Official Yelbörü Emblem (Fallback when no Hero media) */}
      {!hasRealMedia && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-[-12%] flex items-center justify-end sm:right-[-6%] lg:right-[2%]"
        >
          <img
            src="./logo-mark-sand.png"
            alt=""
            decoding="async"
            className="h-[420px] w-[420px] select-none object-contain opacity-[0.055] sm:h-[560px] sm:w-[560px] lg:h-[680px] lg:w-[680px]"
          />
        </div>
      )}

      {/* Main Cinematic Full-Viewport Stage — Synchronized Gently After Splash */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p
            style={revealStyle(0)}
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50 transition-[opacity,transform] will-change-[opacity,transform]"
          >
            {t(siteData.brand.tagline, lang)}
          </p>

          <h1
            style={revealStyle(80)}
            className="mt-8 font-display text-5xl font-medium leading-[0.98] tracking-[-0.04em] text-[#ece6db] transition-[opacity,transform] will-change-[opacity,transform] sm:text-6xl lg:text-[76px]"
          >
            <span className="block">{t(siteData.hero.headlineLine1, lang)}</span>
            <span className="mt-1.5 block text-[#d9d0bf]">
              {t(siteData.hero.headlineLine2, lang)}
            </span>
          </h1>

          <p
            style={revealStyle(170)}
            className="mt-9 max-w-[58ch] text-[15px] font-normal leading-[1.7] text-[#d9d0bf]/70 transition-[opacity,transform] will-change-[opacity,transform] sm:text-[16px]"
          >
            {t(siteData.hero.description, lang)}
          </p>

          {/* Calm Dual Actions */}
          <div
            style={revealStyle(250)}
            className="mt-12 flex flex-col items-start gap-6 transition-[opacity,transform] will-change-[opacity,transform] sm:flex-row sm:items-center sm:gap-10"
          >
            <button
              type="button"
              onClick={onExploreProjects}
              className="group inline-flex items-center justify-center gap-2.5 rounded-none bg-[#d9d0bf] px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#000000] transition-colors duration-200 hover:bg-[#ece6db] cursor-pointer"
            >
              <span>{t(siteData.hero.primaryCta, lang)}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
            </button>

            <button
              type="button"
              onClick={onJoinOrSponsor}
              className="group link-hairline inline-flex items-center gap-2 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-[#ece6db] transition-opacity duration-200 hover:opacity-90 cursor-pointer"
            >
              <span>{t(siteData.hero.secondaryCta, lang)}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Borderless Bottom Edge Anchors */}
      <div
        style={revealStyle(320)}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 pb-8 pt-2 transition-[opacity,transform] will-change-[opacity,transform] sm:px-6 lg:px-8"
      >
        <span className="font-mono tabular-nums text-[11px] uppercase tracking-[0.16em] text-[#d9d0bf]/40">
          {t(siteData.hero.locationTag, lang)}
        </span>

        <a
          href="#metrikler"
          className="link-hairline inline-flex items-center gap-2 pb-0.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/55 transition-colors duration-200 hover:text-[#ece6db]"
        >
          <span>{t(siteData.hero.scrollLabel, lang)}</span>
          <ArrowDown className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
};
