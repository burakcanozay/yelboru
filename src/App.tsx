import React, { useCallback, useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
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

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [contactSubject, setContactSubject] = useState<ContactSubjectValue>('sponsorship');

  const handleSplashComplete = useCallback(() => {
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
      {/* Global 2.5% Analog Micro Film Grain Surface Overlay */}
      <div
        aria-hidden="true"
        className="bg-film-grain pointer-events-none fixed inset-0 z-40 opacity-[0.025]"
      />

      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <Navbar onSelectSponsorCta={() => handleOpenContact('sponsorship')} />

      <main>
        <Hero
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
