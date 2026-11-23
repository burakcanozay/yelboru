import React, { useEffect, useRef, useState } from 'react';
import { siteData, t, type MetricItem } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

const MetricCell: React.FC<{
  item: MetricItem;
  index: number;
  start: boolean;
  total: number;
}> = ({ item, index, start, total }) => {
  const { lang } = useLanguage();
  const [displayValue, setDisplayValue] = useState(item.value);

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(item.value);
      return;
    }

    const duration = 1100 + index * 120;
    let startTime: number | null = null;
    let rafId = 0;

    setDisplayValue(0);

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * item.value));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, item.value, index]);

  const formattedNumber =
    item.prefix && displayValue < 10 ? `${item.prefix}${displayValue}` : `${displayValue}`;

  return (
    <ScrollReveal
      delayMs={index * 60}
      className={`py-14 sm:py-16 ${index > 0 ? 'lg:pl-10' : ''} ${
        index < total - 1 ? 'lg:pr-10' : ''
      } ${index === 1 ? 'sm:border-l sm:border-[#d9d0bf]/15 sm:pl-10 lg:border-l' : ''} ${
        index >= 2 ? 'sm:border-t sm:border-[#d9d0bf]/15 lg:border-t-0' : ''
      } ${index === 3 ? 'sm:border-l sm:border-[#d9d0bf]/15 sm:pl-10' : ''}`}
    >
      <div className="flex items-baseline gap-1 font-mono tabular-nums">
        <span className="text-5xl font-normal tracking-[-0.04em] text-[#ece6db] sm:text-6xl">
          {formattedNumber}
        </span>
        {item.suffix && (
          <span className="text-3xl font-normal text-[#d9d0bf]/55">{item.suffix}</span>
        )}
      </div>

      <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50">
        {t(item.label, lang)}
      </p>
    </ScrollReveal>
  );
};

export const MetricsBand: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="metrikler" ref={ref} className="border-y border-[#d9d0bf]/15 bg-[#000000]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-[#d9d0bf]/15 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {siteData.metrics.map((item, idx) => (
            <MetricCell
              key={item.id}
              item={item}
              index={idx}
              start={triggered}
              total={siteData.metrics.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
