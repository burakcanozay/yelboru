import React, { useState } from 'react';
import { Linkedin, Github } from 'lucide-react';
import { siteData, t, type DepartmentKey } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';

const departmentLabels: Record<Exclude<DepartmentKey, 'all'>, { tr: string; en: string }> = {
  mechanical: { tr: 'Mekanik', en: 'Mechanical' },
  avionics: { tr: 'Aviyonik', en: 'Avionics' },
  software: { tr: 'Yazılım', en: 'Software' },
  management: { tr: 'Yönetim & Sponsorluk', en: 'Management' },
};

export const TeamSection: React.FC = () => {
  const { lang } = useLanguage();
  const [activeDept, setActiveDept] = useState<DepartmentKey>('all');
  const [failedPhotos, setFailedPhotos] = useState<Record<string, boolean>>({});

  const filteredMembers =
    activeDept === 'all'
      ? siteData.teamSection.members
      : siteData.teamSection.members.filter((m) => m.department === activeDept);

  return (
    <section
      id="ekip"
      className="border-t border-[#d9d0bf]/15 bg-[#000000] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50">
                {lang === 'tr' ? 'Kadro' : 'The Crew'}
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-[#ece6db] sm:text-4xl lg:text-[44px]">
                {t(siteData.teamSection.title, lang)}
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Ekip Alt Birim Filtresi"
              className="no-scrollbar flex max-w-full flex-nowrap gap-6 overflow-x-auto whitespace-nowrap border-b border-[#d9d0bf]/15"
            >
              {siteData.teamSection.departments.map((dept) => {
                const isSelected = activeDept === dept.key;
                const count =
                  dept.key === 'all'
                    ? siteData.teamSection.members.length
                    : siteData.teamSection.members.filter((m) => m.department === dept.key).length;

                return (
                  <button
                    key={dept.key}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveDept(dept.key)}
                    className={`relative shrink-0 pb-3 text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-200 cursor-pointer ${
                      isSelected
                        ? 'text-[#ece6db]'
                        : 'text-[#d9d0bf]/45 hover:text-[#d9d0bf]'
                    }`}
                  >
                    <span>{t(dept.label, lang)}</span>
                    <span className="ml-1.5 font-mono tabular-nums text-[10px] text-[#d9d0bf]/45">
                      {count}
                    </span>
                    {isSelected && (
                      <span className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-[#d9d0bf]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Frameless 3:4 Editorial Portrait Gallery */}
        <div
          key={activeDept}
          className="tab-fade-in mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          {filteredMembers.map((member, idx) => {
            const hasPhoto = Boolean(member.photoUrl?.trim()) && !failedPhotos[member.id];

            return (
              <ScrollReveal key={member.id} delayMs={(idx % 4) * 65}>
                <article className="group">
                  <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#d9d0bf]/15 bg-[#060606]">
                    {hasPhoto && member.photoUrl ? (
                      <>
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          loading="lazy"
                          decoding="async"
                          onError={() =>
                            setFailedPhotos((prev) => ({ ...prev, [member.id]: true }))
                          }
                          className="media-editorial h-full w-full object-cover"
                        />
                        <div
                          aria-hidden="true"
                          className="media-vignette pointer-events-none absolute inset-0"
                        />
                      </>
                    ) : (
                      <div className="relative flex h-full w-full flex-col justify-between p-5">
                        <span className="text-[11px] uppercase tracking-[0.2em] text-[#d9d0bf]/45">
                          {t(departmentLabels[member.department], lang)}
                        </span>

                        <div className="flex flex-1 items-center justify-center">
                          <span className="font-display text-5xl font-light tracking-[0.06em] text-[#ece6db]/85">
                            {member.initials}
                          </span>
                        </div>

                        <div className="h-px w-8 bg-[#d9d0bf]/25" />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-3 border-b border-[#d9d0bf]/15 pb-4">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-base font-medium text-[#ece6db]">
                        {member.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#d9d0bf]/70">
                        {t(member.role, lang)}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5 pt-0.5">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} LinkedIn`}
                        className="text-[#d9d0bf]/45 transition-colors duration-200 hover:text-[#ece6db]"
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} GitHub`}
                          className="text-[#d9d0bf]/45 transition-colors duration-200 hover:text-[#ece6db]"
                        >
                          <Github className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
