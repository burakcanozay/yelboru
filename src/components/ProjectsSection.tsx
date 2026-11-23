import React, { useEffect, useState } from 'react';
import { siteData, t } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { AircraftBlueprint } from './AircraftSchematics';
import { ScrollReveal } from './ScrollReveal';

type ViewMode = 'render' | 'blueprint' | 'systems';

export const ProjectsSection: React.FC = () => {
  const { lang } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>(siteData.aircraft[0].id);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const activeAircraft =
    siteData.aircraft.find((a) => a.id === selectedId) ?? siteData.aircraft[0];

  const allPhotos = [
    ...(activeAircraft.renderImage ? [activeAircraft.renderImage] : []),
    ...(activeAircraft.galleryImages ?? []),
  ].filter((src) => src.trim().length > 0 && !failedImages[src]);

  const hasRender = allPhotos.length > 0;
  const [viewMode, setViewMode] = useState<ViewMode>(hasRender ? 'render' : 'blueprint');

  useEffect(() => {
    setActivePhotoIndex(0);
    setViewMode(hasRender ? 'render' : 'blueprint');
  }, [selectedId, hasRender]);

  const currentPhotoSrc = allPhotos[activePhotoIndex] ?? allPhotos[0];

  const handleImageError = (src: string) => {
    setFailedImages((prev) => ({ ...prev, [src]: true }));
  };

  return (
    <section
      id="projeler"
      className="border-t border-[#d9d0bf]/15 bg-[#070706] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-6 border-b border-[#d9d0bf]/15 pb-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50">
                {lang === 'tr' ? 'VTOL & Drone Platformları' : 'VTOL & Drone Fleet'}
              </p>
              <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-[#ece6db] sm:text-4xl lg:text-[44px]">
                {activeAircraft.name}{' '}
                <span className="font-normal text-[#d9d0bf]/55">{activeAircraft.nickname}</span>
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Hava Aracı Seçimi"
              className="no-scrollbar flex max-w-full flex-nowrap gap-7 overflow-x-auto whitespace-nowrap sm:gap-8"
            >
              {siteData.aircraft.map((vehicle) => {
                const isSelected = vehicle.id === activeAircraft.id;
                const shortTitle = `${vehicle.name.replace('YELBÖRÜ ', '')} ${vehicle.nickname}`;
                return (
                  <button
                    key={vehicle.id}
                    role="tab"
                    type="button"
                    aria-selected={isSelected}
                    onClick={() => setSelectedId(vehicle.id)}
                    className={`relative shrink-0 pb-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-200 cursor-pointer ${
                      isSelected
                        ? 'text-[#ece6db]'
                        : 'text-[#d9d0bf]/45 hover:text-[#d9d0bf]'
                    }`}
                  >
                    {shortTitle}
                    {isSelected && (
                      <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#d9d0bf]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Centerpiece: Studio Render / Real Photo <-> CAD Blueprint Stage */}
        <ScrollReveal delayMs={70}>
          <div className="py-10 sm:py-14">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em]">
              <span className="text-[#d9d0bf]/45">
                {t(activeAircraft.category, lang)} ·{' '}
                <span className="font-mono tabular-nums">{activeAircraft.year}</span> ·{' '}
                {t(activeAircraft.status, lang)}
              </span>

              <div className="flex flex-wrap items-center gap-4">
                {hasRender && (
                  <>
                    <button
                      type="button"
                      onClick={() => setViewMode('render')}
                      className={`pb-0.5 font-medium transition-colors duration-200 cursor-pointer ${
                        viewMode === 'render'
                          ? 'border-b border-[#d9d0bf] text-[#ece6db]'
                          : 'text-[#d9d0bf]/45 hover:text-[#d9d0bf]'
                      }`}
                    >
                      {t(siteData.projectsSection.viewModes.render, lang)}
                    </button>
                    <span className="text-[#d9d0bf]/20">/</span>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setViewMode('blueprint')}
                  className={`pb-0.5 font-medium transition-colors duration-200 cursor-pointer ${
                    viewMode === 'blueprint'
                      ? 'border-b border-[#d9d0bf] text-[#ece6db]'
                      : 'text-[#d9d0bf]/45 hover:text-[#d9d0bf]'
                  }`}
                >
                  {t(siteData.projectsSection.viewModes.blueprint, lang)}
                </button>

                <span className="text-[#d9d0bf]/20">/</span>

                <button
                  type="button"
                  onClick={() => setViewMode('systems')}
                  className={`pb-0.5 font-medium transition-colors duration-200 cursor-pointer ${
                    viewMode === 'systems'
                      ? 'border-b border-[#d9d0bf] text-[#ece6db]'
                      : 'text-[#d9d0bf]/45 hover:text-[#d9d0bf]'
                  }`}
                >
                  {t(siteData.projectsSection.viewModes.systems, lang)}
                </button>
              </div>
            </div>

            <div
              key={`${activeAircraft.id}-${viewMode}-${activePhotoIndex}`}
              className="tab-fade-in mx-auto max-w-5xl"
            >
              {viewMode === 'render' && currentPhotoSrc ? (
                <div>
                  <div className="group relative aspect-[16/9] w-full overflow-hidden border border-[#d9d0bf]/15 bg-[#050505]">
                    <img
                      src={currentPhotoSrc}
                      alt={`${activeAircraft.name} ${activeAircraft.nickname}`}
                      loading="lazy"
                      decoding="async"
                      onError={() => handleImageError(currentPhotoSrc)}
                      className="media-editorial h-full w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="media-vignette pointer-events-none absolute inset-0"
                    />
                  </div>

                  {/* Optional multi-angle gallery strip when galleryImages are provided */}
                  {allPhotos.length > 1 && (
                    <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                      {allPhotos.map((src, idx) => (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setActivePhotoIndex(idx)}
                          className={`relative h-14 w-24 shrink-0 overflow-hidden border transition-colors cursor-pointer ${
                            idx === activePhotoIndex
                              ? 'border-[#d9d0bf]'
                              : 'border-[#d9d0bf]/20 opacity-55 hover:opacity-90'
                          }`}
                        >
                          <img
                            src={src}
                            alt={`${activeAircraft.name} görünüm ${idx + 1}`}
                            loading="lazy"
                            decoding="async"
                            onError={() => handleImageError(src)}
                            className="media-editorial h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <AircraftBlueprint
                  type={activeAircraft.schematicType}
                  showSystems={viewMode === 'systems'}
                  code={activeAircraft.code}
                />
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom 2-Column Aviation Brochure Spec Sheet */}
        <ScrollReveal delayMs={110}>
          <div
            key={activeAircraft.id}
            className="tab-fade-in grid gap-12 border-t border-[#d9d0bf]/15 pt-12 lg:grid-cols-12 lg:gap-16"
          >
            <div className="lg:col-span-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50">
                {t(siteData.projectsSection.missionTitle, lang)}
              </p>
              <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.7] text-[#d9d0bf]/70 sm:text-[16px]">
                {t(activeAircraft.missionDescription, lang)}
              </p>

              <ul className="mt-7 space-y-2.5 border-t border-[#d9d0bf]/15 pt-6">
                {activeAircraft.highlights.map((hl, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#d9d0bf]/70"
                  >
                    <span className="text-[#d9d0bf]/45">—</span>
                    <span>{t(hl, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="flex items-center justify-between border-b border-[#d9d0bf]/25 pb-3">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#ece6db]">
                  {lang === 'tr' ? 'Teknik Şartname' : 'Technical Specification'}
                </span>
                <span className="font-mono text-[11px] text-[#d9d0bf]/45">
                  {activeAircraft.telemetrySummary.autonomy}
                </span>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
                {activeAircraft.specs.map((spec) => (
                  <div
                    key={spec.key}
                    className="flex items-baseline justify-between gap-4 border-b border-[#d9d0bf]/15 py-4"
                  >
                    <dt className="text-xs text-[#d9d0bf]/55">{t(spec.label, lang)}</dt>
                    <dd className="text-right font-mono tabular-nums text-xs font-medium text-[#d9d0bf] sm:text-sm">
                      <span>{spec.value}</span>
                      {spec.unit && (
                        <span className="ml-1.5 text-[11px] font-normal text-[#d9d0bf]/45">
                          {spec.unit}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}

                <div className="flex items-baseline justify-between gap-4 border-b border-[#d9d0bf]/15 py-4">
                  <dt className="text-xs text-[#d9d0bf]/55">
                    {lang === 'tr' ? 'Seyir İrtifası' : 'Cruise Altitude'}
                  </dt>
                  <dd className="font-mono tabular-nums text-xs font-medium text-[#d9d0bf] sm:text-sm">
                    {activeAircraft.telemetrySummary.cruiseAlt}
                  </dd>
                </div>

                <div className="flex items-baseline justify-between gap-4 border-b border-[#d9d0bf]/15 py-4">
                  <dt className="text-xs text-[#d9d0bf]/55">
                    {lang === 'tr' ? 'Haberleşme' : 'Datalink'}
                  </dt>
                  <dd className="font-mono tabular-nums text-xs font-medium text-[#d9d0bf] sm:text-sm">
                    {activeAircraft.telemetrySummary.datalink}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
