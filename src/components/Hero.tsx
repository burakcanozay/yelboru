import React, { useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { siteData, t } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onExploreProjects: () => void;
  onJoinOrSponsor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onJoinOrSponsor }) => {
  const { lang } = useLanguage();
  const [mediaFailed, setMediaFailed] = useState(false);

  const backgroundVideo = siteData.hero.backgroundVideo?.trim();
  const backgroundImage = siteData.hero.backgroundImage?.trim();
  const hasRealMedia = !mediaFailed && Boolean(backgroundVideo || backgroundImage);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#000000] pt-16"
    >
      {/* Background Layer 1: Real Studio VTOL Photo / Video with Automatic Fallback */}
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

      {/* Background Layer 2: Top & Bottom Pure #000000 Scrim Gradient for Crisp Legibility */}
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

      {/* Main Cinematic Full-Viewport Stage */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50">
            {t(siteData.brand.tagline, lang)}
          </p>

          <h1 className="mt-8 font-display text-5xl font-medium leading-[0.98] tracking-[-0.04em] text-[#ece6db] sm:text-6xl lg:text-[76px]">
            <span className="block">{t(siteData.hero.headlineLine1, lang)}</span>
            <span className="mt-1.5 block text-[#d9d0bf]">
              {t(siteData.hero.headlineLine2, lang)}
            </span>
          </h1>

          <p className="mt-9 max-w-[58ch] text-[15px] font-normal leading-[1.7] text-[#d9d0bf]/70 sm:text-[16px]">
            {t(siteData.hero.description, lang)}
          </p>

          {/* Calm Dual Actions */}
          <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
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

      {/* Bottom 1px Architectural Hero Footer Bar */}
      <div className="relative z-10 border-t border-[#d9d0bf]/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <span className="font-mono tabular-nums text-[11px] uppercase tracking-[0.16em] text-[#d9d0bf]/45">
            {t(siteData.hero.locationTag, lang)}
          </span>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#d9d0bf]/70">
            {siteData.hero.capabilities.map((cap, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-[#d9d0bf]/25">/</span>}
                <span>{t(cap, lang)}</span>
              </React.Fragment>
            ))}
          </div>

          <a
            href="#metrikler"
            className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/55 transition-colors hover:text-[#ece6db]"
          >
            <span>{t(siteData.hero.scrollLabel, lang)}</span>
            <ArrowDown className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
