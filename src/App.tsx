import React, { useCallback, useEffect, useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetricsBand } from './components/MetricsBand';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TechnologyBento } from './components/TechnologyBento';
import { TeamSection } from './components/TeamSection';
import { MediaGallery } from './components/MediaGallery';
import { SponsorsSection } from './components/SponsorsSection';
import { ContactFooter, type ContactSubjectValue } from './components/ContactFooter';

const SPLASH_STORAGE_KEY = 'yelboru_splash_seen';

const AppContent: React.FC = () => {
  const { lang } = useLanguage();
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    try {
      return typeof window !== 'undefined' && !window.sessionStorage.getItem(SPLASH_STORAGE_KEY);
    } catch {
      return true;
    }
  });
  const [contactSubject, setContactSubject] = useState<ContactSubjectValue>('sponsorship');

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleSplashComplete = useCallback(() => {
    try {
      window.sessionStorage.setItem(SPLASH_STORAGE_KEY, '1');
    } catch {
      // ignore storage restrictions
    }
    setShowSplash(false);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = (subject: ContactSubjectValue) => {
    setContactSubject(subject);
    scrollToSection('iletisim');
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#d9d0bf]">
      {/* Keyboard Accessibility Skip-to-Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:bg-[#d9d0bf] focus:px-4 focus:py-2.5 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-[#000000] focus:outline-none"
      >
        {lang === 'tr' ? 'İçeriğe Geç' : 'Skip to Content'}
      </a>

      {/* Global 2.5% Analog Micro Film Grain Surface Overlay */}
      <div
        aria-hidden="true"
        className="bg-film-grain pointer-events-none fixed inset-0 z-40 opacity-[0.025]"
      />

      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <Navbar onSelectSponsorCta={() => handleOpenContact('sponsorship')} />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Hero
          ready={!showSplash}
          onExploreProjects={() => scrollToSection('projeler')}
          onJoinOrSponsor={() => handleOpenContact('membership')}
        />
        <MetricsBand />
        <AboutSection />
        <ProjectsSection />
        <TechnologyBento />
        <TeamSection />
        <MediaGallery />
        <SponsorsSection onScheduleSponsorCall={() => handleOpenContact('sponsorship')} />
      </main>

      <ContactFooter preselectedSubject={contactSubject} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
