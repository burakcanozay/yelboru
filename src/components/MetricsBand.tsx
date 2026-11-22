import React from 'react';
import { siteData, t } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

export const MetricsBand: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section id="metrikler" className="border-y border-[#d9d0bf]/15 bg-[#000000]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-[#d9d0bf]/15 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {siteData.metrics.map((item, idx) => {
            const formattedNumber =
              item.prefix && item.value < 10 ? `${item.prefix}${item.value}` : `${item.value}`;

            return (
              <ScrollReveal
                key={item.id}
                delayMs={idx * 70}
                className={`py-14 sm:py-16 ${
                  idx > 0 ? 'lg:pl-10' : ''
                } ${idx < siteData.metrics.length - 1 ? 'lg:pr-10' : ''} ${
                  idx === 1 ? 'sm:border-l sm:border-[#d9d0bf]/15 sm:pl-10 lg:border-l' : ''
                } ${idx >= 2 ? 'sm:border-t sm:border-[#d9d0bf]/15 lg:border-t-0' : ''} ${
                  idx === 3 ? 'sm:border-l sm:border-[#d9d0bf]/15 sm:pl-10' : ''
                }`}
              >
                <div className="flex items-baseline gap-1 font-mono tabular-nums">
                  <span className="text-5xl font-normal tracking-[-0.04em] text-[#ece6db] sm:text-6xl">
                    {formattedNumber}
                  </span>
                  {item.suffix && (
                    <span className="text-3xl font-normal text-[#d9d0bf]/55">
                      {item.suffix}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50">
                  {t(item.label, lang)}
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
