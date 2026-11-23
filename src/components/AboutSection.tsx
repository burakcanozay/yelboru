import React from 'react';
import { siteData, t } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section id="hakkimizda" className="bg-[#000000] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column (5/12): Focused Manifesto + Free-Floating Brand Emblem */}
            <div className="lg:col-span-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50">
                {lang === 'tr' ? 'Hakkımızda' : 'About'}
              </p>

              <h2 className="mt-5 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-[#ece6db] sm:text-4xl lg:text-[44px]">
                {t(siteData.about.title, lang)}
              </h2>

              <div className="mt-10 flex items-center gap-4 border-t border-[#d9d0bf]/15 pt-7">
                <img
                  src="./logo-mark-sand.png"
                  alt="Yelbörü Arması"
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-12 shrink-0 object-contain"
                />
                <div>
                  <p className="text-sm font-medium text-[#ece6db]">
                    {lang === 'tr'
                      ? 'Rüzgarın Hızı, Kurdun İradesi'
                      : 'Velocity of Wind, Precision of the Wolf'}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#d9d0bf]/45">
                    TEKNOFEST · SAVAŞAN İHA · SUAS
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column (7/12): Concise Narrative + Compact 2021–2026 Hairline Timeline */}
            <div className="lg:col-span-7">
              <p className="max-w-[58ch] text-[17px] font-normal leading-[1.65] text-[#ece6db]/90 sm:text-[18px]">
                {t(siteData.about.lead, lang)}
              </p>

              <p className="mt-5 max-w-[58ch] text-[15px] font-normal leading-[1.7] text-[#d9d0bf]/70 sm:text-[16px]">
                {t(siteData.about.story, lang)}
              </p>

              <div className="mt-12">
                <div className="flex items-center justify-between border-b border-[#d9d0bf]/25 pb-3">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50">
                    {lang === 'tr' ? 'Kronoloji' : 'Timeline'}
                  </span>
                  <span className="font-mono tabular-nums text-[11px] text-[#d9d0bf]/45">
                    2021 — 2026
                  </span>
                </div>

                <div className="divide-y divide-[#d9d0bf]/15 border-b border-[#d9d0bf]/15">
                  {siteData.about.milestones.map((item) => (
                    <div key={item.year} className="grid grid-cols-12 items-baseline gap-4 py-4">
                      <span className="col-span-3 font-mono tabular-nums text-sm text-[#d9d0bf] sm:col-span-2">
                        {item.year}
                      </span>
                      <div className="col-span-9 sm:col-span-10">
                        <h3 className="font-display text-sm font-medium text-[#ece6db] sm:text-base">
                          {t(item.title, lang)}
                        </h3>
                        <p className="mt-1 max-w-[58ch] text-[13.5px] leading-[1.6] text-[#d9d0bf]/65">
                          {t(item.detail, lang)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
