import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      const offsets = siteData.navigation
        .map((item) => {
          const el = document.getElementById(item.id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { id: item.id, top: rect.top };
        })
        .filter((x): x is { id: string; top: number } => x !== null);

      const current = offsets.filter((x) => x.top <= 160).pop();
      setActiveSection(current ? current.id : '');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d9d0bf]/15 bg-[#000000]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

        {/* Wide-Spaced Editorial Sans Links */}
        <nav className="hidden lg:flex h-full items-center gap-8">
          {siteData.navigation.map((item) => {
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
                <span className={!isActive ? 'link-hairline' : ''}>{t(item.label, lang)}</span>
                {isActive && (
                  <span className="absolute inset-x-0 bottom-[-1px] h-px bg-[#d9d0bf]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: TR/EN & Sharp Cornerless CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <button
            type="button"
            onClick={toggleLang}
            className="text-[11px] font-medium tracking-[0.16em] text-[#d9d0bf]/45 transition-colors hover:text-[#ece6db] cursor-pointer"
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

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#d9d0bf]/15 bg-[#000000] px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col divide-y divide-[#d9d0bf]/10">
            {siteData.navigation.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`py-3.5 text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
                    isActive ? 'text-[#ece6db]' : 'text-[#d9d0bf]/55'
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
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-none bg-[#d9d0bf] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#000000]"
          >
            <span>{t(siteData.navCta, lang)}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};
