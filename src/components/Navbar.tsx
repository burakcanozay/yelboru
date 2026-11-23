import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteData, t } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { YelboruLogo } from './YelboruLogo';

interface NavbarProps {
  onSelectSponsorCta: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectSponsorCta }) => {
  const { lang, toggleLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let rafId = 0;

    const updateOnScroll = () => {
      rafId = 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;
      setScrollProgress(ratio);

      const offsets = siteData.navNavigation
        .map((item) => {
          const el = document.getElementById(item.id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { id: item.id, top: rect.top };
        })
        .filter((x): x is { id: string; top: number } => x !== null);

      const current = offsets.filter((x) => x.top <= 170).pop();
      setActiveSection(current ? current.id : '');
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateOnScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateOnScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [mobileOpen]);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-[#d9d0bf]/15 bg-[#000000]/92 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Free-Floating Sand Wolf Silhouette + Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMobileOpen(false);
          }}
          className="focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d9d0bf]"
          aria-label="Yelbörü Ana Sayfa"
        >
          <YelboruLogo />
        </a>

        {/* Center: Breathing 5-Link Editorial Navigation */}
        <nav aria-label="Ana Menü" className="hidden lg:flex h-full items-center gap-10">
          {siteData.navNavigation.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative flex h-full items-center text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-200 ${
                  isActive
                    ? 'text-[#ece6db]'
                    : 'text-[#d9d0bf]/50 hover:text-[#ece6db]'
                }`}
              >
                <span
                  className={
                    isActive
                      ? 'relative inline-block after:absolute after:inset-x-0 after:bottom-[-4px] after:h-px after:bg-[#d9d0bf]'
                      : 'link-hairline'
                  }
                >
                  {t(item.label, lang)}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Right: Quiet TR/EN Switcher + Sharp Cornerless Sponsor CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <button
            type="button"
            onClick={toggleLang}
            className="text-[11px] font-medium tracking-[0.16em] text-[#d9d0bf]/45 transition-colors duration-200 hover:text-[#ece6db] cursor-pointer"
            aria-label="Dil Değiştir / Switch Language"
          >
            <span className={lang === 'tr' ? 'text-[#ece6db]' : ''}>TR</span>
            <span className="mx-1.5 text-[#d9d0bf]/25">/</span>
            <span className={lang === 'en' ? 'text-[#ece6db]' : ''}>EN</span>
          </button>

          <button
            type="button"
            onClick={onSelectSponsorCta}
            className="group inline-flex items-center gap-1.5 rounded-none bg-[#d9d0bf] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#000000] transition-colors duration-200 hover:bg-[#ece6db] cursor-pointer"
          >
            <span>{t(siteData.navCta, lang)}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={toggleLang}
            className="text-xs font-medium tracking-[0.14em] text-[#d9d0bf]/55"
            aria-label="Dil Değiştir"
          >
            <span className={lang === 'tr' ? 'text-[#ece6db]' : ''}>TR</span>
            <span className="mx-1 opacity-30">/</span>
            <span className={lang === 'en' ? 'text-[#ece6db]' : ''}>EN</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center border border-[#d9d0bf]/20 text-[#d9d0bf]"
            aria-label={mobileOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Silent 1px GPU Scroll Progress Hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px overflow-hidden"
      >
        <div
          className="h-full w-full origin-left bg-[#d9d0bf]/75 will-change-transform"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#d9d0bf]/15 bg-[#000000] px-4 pb-6 pt-2 lg:hidden">
          <nav aria-label="Mobil Menü" className="flex flex-col divide-y divide-[#d9d0bf]/12">
            {siteData.navNavigation.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`py-4 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-200 ${
                    isActive ? 'text-[#ece6db]' : 'text-[#d9d0bf]/55 hover:text-[#ece6db]'
                  }`}
                >
                  {t(item.label, lang)}
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onSelectSponsorCta();
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-none bg-[#d9d0bf] px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#000000]"
          >
            <span>{t(siteData.navCta, lang)}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};
