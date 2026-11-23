import React, { useState } from 'react';
import { Download, Check, ArrowRight } from 'lucide-react';
import { siteData, t, type SponsorItem } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

interface SponsorsSectionProps {
  onScheduleSponsorCall: () => void;
}

const MainSponsorCell: React.FC<{ sponsor: SponsorItem }> = ({ sponsor }) => {
  const { lang } = useLanguage();
  const [logoFailed, setLogoFailed] = useState(false);
  const hasLogo = Boolean(sponsor.logoUrl?.trim()) && !logoFailed;

  return (
    <a
      href={sponsor.url}
      className="group flex flex-col justify-between bg-[#070706] px-8 py-14 transition-colors duration-200 hover:bg-[#d9d0bf]/[0.03] sm:px-12 sm:py-16"
    >
      {hasLogo && sponsor.logoUrl ? (
        <div className="flex items-center">
          <img
            src={sponsor.logoUrl}
            alt={sponsor.name}
            loading="lazy"
            decoding="async"
            onError={() => setLogoFailed(true)}
            className="sponsor-logo-mono h-10 w-auto max-w-[220px] object-contain opacity-75 group-hover:opacity-100 sm:h-12"
          />
        </div>
      ) : (
        <p className="font-display text-2xl font-medium tracking-[-0.025em] text-[#ece6db] sm:text-4xl">
          {sponsor.name}
        </p>
      )}
      <p className="mt-3 text-sm text-[#d9d0bf]/45">{t(sponsor.sector, lang)}</p>
    </a>
  );
};

const GoldSponsorItem: React.FC<{ sponsor: SponsorItem; index: number }> = ({
  sponsor,
  index,
}) => {
  const { lang } = useLanguage();
  const [logoFailed, setLogoFailed] = useState(false);
  const hasLogo = Boolean(sponsor.logoUrl?.trim()) && !logoFailed;

  return (
    <a
      href={sponsor.url}
      className={`group flex flex-col justify-between py-7 transition-colors duration-200 ${
        index === 0 ? 'sm:pr-8' : index === 1 ? 'sm:px-8' : 'sm:pl-8'
      }`}
    >
      {hasLogo && sponsor.logoUrl ? (
        <img
          src={sponsor.logoUrl}
          alt={sponsor.name}
          loading="lazy"
          decoding="async"
          onError={() => setLogoFailed(true)}
          className="sponsor-logo-mono h-7 w-auto max-w-[160px] object-contain opacity-75 group-hover:opacity-100"
        />
      ) : (
        <p className="font-display text-base font-medium tracking-[-0.01em] text-[#ece6db] transition-opacity duration-200 group-hover:opacity-80 sm:text-lg">
          {sponsor.name}
        </p>
      )}
      <p className="mt-2 text-xs text-[#d9d0bf]/45">{t(sponsor.sector, lang)}</p>
    </a>
  );
};

const SupporterInlineItem: React.FC<{ sponsor: SponsorItem }> = ({ sponsor }) => {
  const [logoFailed, setLogoFailed] = useState(false);
  const hasLogo = Boolean(sponsor.logoUrl?.trim()) && !logoFailed;

  return (
    <a
      href={sponsor.url}
      className="group link-hairline inline-flex items-center pb-1 text-xs font-medium uppercase tracking-[0.14em] text-[#d9d0bf]/60 transition-colors duration-200 hover:text-[#ece6db]"
    >
      {hasLogo && sponsor.logoUrl ? (
        <img
          src={sponsor.logoUrl}
          alt={sponsor.name}
          loading="lazy"
          decoding="async"
          onError={() => setLogoFailed(true)}
          className="sponsor-logo-mono h-5 w-auto max-w-[120px] object-contain opacity-70 group-hover:opacity-100"
        />
      ) : (
        <span>{sponsor.name}</span>
      )}
    </a>
  );
};

export const SponsorsSection: React.FC<SponsorsSectionProps> = ({ onScheduleSponsorCall }) => {
  const { lang } = useLanguage();
  const [downloaded, setDownloaded] = useState(false);

  const mainSponsors = siteData.sponsorsSection.sponsors.filter((s) => s.tier === 'main');
  const goldSponsors = siteData.sponsorsSection.sponsors.filter((s) => s.tier === 'gold');
  const supporters = siteData.sponsorsSection.sponsors.filter((s) => s.tier === 'supporter');

  const handleDownloadDeck = () => {
    const content = [
      '====================================================================',
      'YELBÖRÜ İHA & VTOL HAVACILIK EKİBİ — 2025/2026 SPONSORLUK ÖZET DOSYASI',
      '====================================================================',
      '',
      'Misyon: Dikey iniş-kalkış (VTOL) yapabilen otonom insansız hava araçları,',
      'karbon fiber kompozit gövdeler, özgün aviyonik ve gömülü yapay zeka.',
      '',
      'AKTİF HAVA ARACI FİLOSU:',
      '- YELBÖRÜ V-03 "BOZKURT" (Hibrit QuadPlane VTOL | 2.85m | 95 dk | 45 km)',
      '- YELBÖRÜ T-02 "ALPEREN" (Tilt-Rotor VTOL | 2.20m | 115 km/s)',
      '- YELBÖRÜ Q-04 "GÖKTÜRK" (Otonom Taktik Hexacopter | Görsel İniş & SLAM)',
      '',
      'SPONSORLUK KATMANLARI:',
      '1. ANA SPONSOR   : Gövde ana logo, özel demo uçuşu, öncelikli yetenek havuzu',
      '2. ALTIN SPONSOR : Kanat/kuyruk logosu, ekip forması, teknik Ar-Ge raporu',
      '3. DESTEKÇİ      : Donanım/malzeme/yazılım desteği, web & sosyal medya görünürlüğü',
      '',
      `İletişim: ${siteData.contactSection.info.sponsorEmail}`,
      `Konum   : ${siteData.contactSection.info.location.tr}`,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'YELBORU_Sponsorluk_Dosyasi_2025_2026.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3500);
  };

  return (
    <section
      id="sponsorlar"
      className="border-t border-[#d9d0bf]/15 bg-[#070706] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50">
              {lang === 'tr' ? 'Sponsorlar & İş Ortakları' : 'Sponsors & Partners'}
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-[#ece6db] sm:text-4xl lg:text-[44px]">
              {t(siteData.sponsorsSection.title, lang)}
            </h2>
          </div>
        </ScrollReveal>

        {/* Tier 1: Exclusive Architectural 2-Column Main Sponsor Grid */}
        <ScrollReveal delayMs={60}>
          <div className="mt-16">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50">
              {t(siteData.sponsorsSection.tiers.main, lang)}
            </p>
            <div className="grid grid-cols-1 gap-px border border-[#d9d0bf]/15 bg-[#d9d0bf]/15 md:grid-cols-2">
              {mainSponsors.map((sp) => (
                <MainSponsorCell key={sp.id} sponsor={sp} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Tier 2: Open Horizontal Hairline Strip for Gold Sponsors */}
        <ScrollReveal delayMs={100}>
          <div className="mt-14">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/45">
              {t(siteData.sponsorsSection.tiers.gold, lang)}
            </p>
            <div className="grid grid-cols-1 divide-y divide-[#d9d0bf]/15 border-y border-[#d9d0bf]/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {goldSponsors.map((sp, idx) => (
                <GoldSponsorItem key={sp.id} sponsor={sp} index={idx} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Tier 3: Quiet Inline Typographic Roll for Supporters */}
        <ScrollReveal delayMs={140}>
          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/40">
              {t(siteData.sponsorsSection.tiers.supporter, lang)}
            </p>
            <div className="flex flex-wrap items-center gap-x-9 gap-y-3">
              {supporters.map((sp) => (
                <SupporterInlineItem key={sp.id} sponsor={sp} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Two-Column Closing Sponsorship Band */}
        <ScrollReveal delayMs={180}>
          <div className="mt-20 grid gap-10 border-t border-[#d9d0bf]/20 pt-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50">
                {t(siteData.sponsorsSection.deckCta.badge, lang)}
              </p>
              <h3 className="mt-4 font-display text-2xl font-medium leading-[1.15] tracking-[-0.025em] text-[#ece6db] sm:text-3xl">
                {t(siteData.sponsorsSection.deckCta.title, lang)}
              </h3>
              <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.7] text-[#d9d0bf]/70 sm:text-[16px]">
                {t(siteData.sponsorsSection.deckCta.description, lang)}
              </p>
            </div>

            <div className="flex flex-col gap-3.5 lg:col-span-5 lg:items-end">
              <button
                type="button"
                onClick={handleDownloadDeck}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-none bg-[#d9d0bf] px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#000000] transition-colors duration-200 hover:bg-[#ece6db] cursor-pointer sm:w-auto sm:min-w-[270px]"
              >
                {downloaded ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>{lang === 'tr' ? 'Dosya İndirildi' : 'Deck Downloaded'}</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>{t(siteData.sponsorsSection.deckCta.downloadButton, lang)}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onScheduleSponsorCall}
                className="group link-hairline inline-flex items-center gap-2 pb-1 text-xs font-medium uppercase tracking-[0.14em] text-[#ece6db] transition-opacity duration-200 hover:opacity-90 cursor-pointer"
              >
                <span>{t(siteData.sponsorsSection.deckCta.contactButton, lang)}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
