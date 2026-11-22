import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { siteData, t, type TechDomain } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

export const TechnologyBento: React.FC = () => {
  const { lang } = useLanguage();
  const [activeId, setActiveId] = useState<string>(siteData.technologySection.domains[0].id);

  return (
    <section
      id="teknoloji"
      className="border-t border-[#d9d0bf]/15 bg-[#000000] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50">
              {lang === 'tr' ? 'Mühendislik & Teknoloji' : 'Engineering & Technology'}
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-[#ece6db] sm:text-4xl lg:text-[44px]">
              {t(siteData.technologySection.title, lang)}
            </h2>
          </div>
        </ScrollReveal>

        {/* Editorial Numbered Accordion (01–04) */}
        <ScrollReveal delayMs={80}>
          <div className="mt-16 border-y border-[#d9d0bf]/15 divide-y divide-[#d9d0bf]/15">
            {siteData.technologySection.domains.map((domain: TechDomain, idx) => {
              const isOpen = activeId === domain.id;
              const num = `0${idx + 1}`;
              const leadMetric = domain.metrics[0];

              return (
                <div key={domain.id} className="transition-colors hover:bg-[#d9d0bf]/[0.02]">
                  <button
                    type="button"
                    onClick={() => setActiveId(isOpen ? '' : domain.id)}
                    aria-expanded={isOpen}
                    className="grid w-full grid-cols-12 items-center gap-4 py-8 text-left cursor-pointer"
                  >
                    <div className="col-span-2 sm:col-span-1">
                      <span
                        className={`font-mono tabular-nums text-sm transition-colors ${
                          isOpen ? 'text-[#d9d0bf]' : 'text-[#d9d0bf]/45'
                        }`}
                      >
                        {num}
                      </span>
                    </div>

                    <div className="col-span-8 sm:col-span-7">
                      <h3
                        className={`font-display text-xl font-medium tracking-[-0.02em] transition-colors sm:text-2xl lg:text-[26px] ${
                          isOpen ? 'text-[#ece6db]' : 'text-[#d9d0bf]/70'
                        }`}
                      >
                        {t(domain.title, lang)}
                      </h3>
                    </div>

                    <div className="hidden sm:flex sm:col-span-3 sm:items-baseline sm:justify-end sm:gap-2">
                      <span className="font-mono tabular-nums text-sm text-[#d9d0bf]">
                        {leadMetric.value}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.14em] text-[#d9d0bf]/45">
                        {t(leadMetric.label, lang)}
                      </span>
                    </div>

                    <div className="col-span-2 flex justify-end sm:col-span-1">
                      {isOpen ? (
                        <Minus className="h-4 w-4 text-[#ece6db]" />
                      ) : (
                        <Plus className="h-4 w-4 text-[#d9d0bf]/45" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-12 gap-6 pb-10 pt-1">
                        <div className="hidden sm:block sm:col-span-1" />

                        <div className="col-span-12 sm:col-span-7 lg:col-span-6">
                          <p className="max-w-[58ch] text-[15px] leading-[1.7] text-[#d9d0bf]/70 sm:text-[16px]">
                            {t(domain.description, lang)}
                          </p>
                          <p className="mt-5 text-xs tracking-wide text-[#d9d0bf]/45">
                            {domain.tags.join(' · ')}
                          </p>
                        </div>

                        <div className="col-span-12 sm:col-span-4 lg:col-span-5">
                          <div className="grid grid-cols-2 divide-x divide-[#d9d0bf]/15 border-t border-[#d9d0bf]/15 pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                            {domain.metrics.map((metric, mIdx) => (
                              <div key={mIdx} className={mIdx === 1 ? 'pl-6' : 'pr-6'}>
                                <p className="font-mono tabular-nums text-2xl font-normal text-[#ece6db] sm:text-3xl">
                                  {metric.value}
                                </p>
                                <p className="mt-1.5 text-xs text-[#d9d0bf]/45">
                                  {t(metric.label, lang)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
