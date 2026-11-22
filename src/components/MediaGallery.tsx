import React, { useEffect, useState } from 'react';
import { Play, X } from 'lucide-react';
import { siteData, t, type MediaGalleryItem } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { MediaTelemetryVisual } from './AircraftSchematics';
import { ScrollReveal } from './ScrollReveal';

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : null;
    }
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname.startsWith('/embed/')) {
        return `https://www.youtube-nocookie.com${parsed.pathname}?rel=0`;
      }
      if (parsed.pathname.startsWith('/shorts/')) {
        const id = parsed.pathname.split('/')[2];
        return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : null;
      }
      const v = parsed.searchParams.get('v');
      return v ? `https://www.youtube-nocookie.com/embed/${v}?rel=0` : null;
    }
  } catch {
    return null;
  }
  return null;
}

function isDirectVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

export const MediaGallery: React.FC = () => {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'video' | 'photo'>('all');
  const [activeItem, setActiveItem] = useState<MediaGalleryItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({});

  const markFailed = (url: string) => {
    setFailedUrls((prev) => ({ ...prev, [url]: true }));
  };

  const openModal = (item: MediaGalleryItem) => {
    setActiveItem(item);
    requestAnimationFrame(() => setModalVisible(true));
  };

  const closeModal = () => {
    setModalVisible(false);
    window.setTimeout(() => setActiveItem(null), 220);
  };

  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem]);

  const items =
    filter === 'all'
      ? siteData.gallerySection.items
      : siteData.gallerySection.items.filter((i) => i.type === filter);

  const renderModalMedia = (item: MediaGalleryItem) => {
    const rawMedia = item.mediaUrl?.trim();
    const rawThumb = item.thumbnailUrl?.trim();

    if (rawMedia && !failedUrls[rawMedia]) {
      const ytEmbed = getYouTubeEmbedUrl(rawMedia);
      if (ytEmbed) {
        return (
          <iframe
            src={ytEmbed}
            title={t(item.title, lang)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        );
      }

      if (isDirectVideoUrl(rawMedia)) {
        return (
          <video
            controls
            playsInline
            poster={rawThumb && !failedUrls[rawThumb] ? rawThumb : undefined}
            onError={() => markFailed(rawMedia)}
            className="h-full w-full bg-[#000000] object-cover"
          >
            <source src={rawMedia} />
          </video>
        );
      }

      return (
        <img
          src={rawMedia}
          alt={t(item.title, lang)}
          decoding="async"
          onError={() => markFailed(rawMedia)}
          className="media-editorial-clear h-full w-full object-cover"
        />
      );
    }

    if (rawThumb && !failedUrls[rawThumb]) {
      return (
        <img
          src={rawThumb}
          alt={t(item.title, lang)}
          decoding="async"
          onError={() => markFailed(rawThumb)}
          className="media-editorial-clear h-full w-full object-cover"
        />
      );
    }

    return <MediaTelemetryVisual variant={item.visualVariant} aircraft={item.aircraft} />;
  };

  return (
    <section
      id="galeri"
      className="border-t border-[#d9d0bf]/15 bg-[#000000] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50">
                {lang === 'tr' ? 'Saha Arşivi' : 'Field Archive'}
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-[#ece6db] sm:text-4xl lg:text-[44px]">
                {t(siteData.gallerySection.title, lang)}
              </h2>
            </div>

            <div className="flex gap-6 border-b border-[#d9d0bf]/15">
              {(
                [
                  { key: 'all', tr: 'Tümü', en: 'All' },
                  { key: 'video', tr: 'Videolar', en: 'Videos' },
                  { key: 'photo', tr: 'Fotoğraflar', en: 'Photos' },
                ] as const
              ).map((tab) => {
                const isSelected = filter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setFilter(tab.key)}
                    className={`relative pb-3 text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-200 cursor-pointer ${
                      isSelected
                        ? 'text-[#ece6db]'
                        : 'text-[#d9d0bf]/45 hover:text-[#d9d0bf]'
                    }`}
                  >
                    {tab[lang]}
                    {isSelected && (
                      <span className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-[#d9d0bf]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Asymmetric Editorial Spread */}
        <div
          key={filter}
          className="tab-fade-in mt-14 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, idx) => {
            const isFeatured = idx === 0;
            const thumbCandidate =
              item.thumbnailUrl?.trim() ||
              (item.type === 'photo' ? item.mediaUrl?.trim() : '');
            const hasThumb = Boolean(thumbCandidate) && !failedUrls[thumbCandidate!];

            return (
              <ScrollReveal
                key={item.id}
                delayMs={(idx % 3) * 60}
                className={isFeatured ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <article
                  onClick={() => openModal(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal(item);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={t(item.title, lang)}
                  className="group flex h-full cursor-pointer flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d9d0bf]"
                >
                  <div
                    className={`relative w-full overflow-hidden border border-[#d9d0bf]/15 bg-[#050505] transition-colors duration-200 group-hover:border-[#d9d0bf]/40 ${
                      isFeatured ? 'aspect-[16/9]' : 'aspect-[16/10]'
                    }`}
                  >
                    {hasThumb && thumbCandidate ? (
                      <>
                        <img
                          src={thumbCandidate}
                          alt={t(item.title, lang)}
                          loading="lazy"
                          decoding="async"
                          onError={() => markFailed(thumbCandidate)}
                          className="media-editorial h-full w-full object-cover"
                        />
                        <div
                          aria-hidden="true"
                          className="media-vignette pointer-events-none absolute inset-0"
                        />
                      </>
                    ) : (
                      <MediaTelemetryVisual variant={item.visualVariant} aircraft={item.aircraft} />
                    )}

                    {item.type === 'video' && (
                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-[#d9d0bf] px-2.5 py-1 font-mono tabular-nums text-[10px] font-medium text-[#000000]">
                        <Play className="h-2.5 w-2.5 fill-current" />
                        {item.duration}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex flex-1 flex-col justify-between border-b border-[#d9d0bf]/12 pb-5">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#d9d0bf]/45">
                        <span>
                          <span className="font-mono tabular-nums">{item.date}</span> · {item.location}
                        </span>
                        <span className="font-mono tabular-nums">
                          {item.altitude} · {item.wind}
                        </span>
                      </div>

                      <h3
                        className={`mt-2.5 font-display font-medium leading-snug tracking-[-0.02em] text-[#ece6db] transition-opacity duration-200 group-hover:opacity-85 ${
                          isFeatured ? 'text-xl sm:text-2xl' : 'text-base'
                        }`}
                      >
                        {t(item.title, lang)}
                      </h3>

                      <p
                        className={`mt-2 leading-[1.65] text-[#d9d0bf]/70 ${
                          isFeatured ? 'max-w-[58ch] text-[15px]' : 'text-[13px]'
                        }`}
                      >
                        {t(item.description, lang)}
                      </p>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Smooth Fade + Scale Editorial Inspection Modal (Supports Photo, MP4, YouTube & Fallback) */}
      {activeItem && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/92 p-4 backdrop-blur-sm transition-opacity duration-200 ease-out ${
            modalVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-flight-title"
        >
          <div
            className={`w-full max-w-3xl border border-[#d9d0bf]/25 bg-[#000000] transition-[opacity,transform] duration-200 ease-out ${
              modalVisible ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#d9d0bf]/15 px-6 py-4">
              <span className="font-mono tabular-nums text-xs text-[#d9d0bf]/70">
                {activeItem.aircraft} · {activeItem.date}
              </span>
              <button
                type="button"
                onClick={closeModal}
                className="flex h-8 w-8 items-center justify-center border border-[#d9d0bf]/20 text-[#d9d0bf] transition-colors duration-200 hover:bg-[#d9d0bf] hover:text-[#000000] cursor-pointer"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="aspect-[16/9] w-full border-b border-[#d9d0bf]/15 bg-[#050505]">
              {renderModalMedia(activeItem)}
            </div>

            <div className="p-6 sm:p-8">
              <h3 id="modal-flight-title" className="font-display text-xl font-medium text-[#ece6db]">
                {t(activeItem.title, lang)}
              </h3>
              <p className="mt-2.5 max-w-[58ch] text-[15px] leading-[1.7] text-[#d9d0bf]/70">
                {t(activeItem.description, lang)}
              </p>

              <div className="mt-6 grid grid-cols-2 divide-y divide-[#d9d0bf]/15 border-t border-[#d9d0bf]/15 pt-4 text-xs sm:grid-cols-4 sm:divide-x sm:divide-y-0">
                <div className="py-2 sm:py-0 sm:pr-4">
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-[#d9d0bf]/45">
                    {lang === 'tr' ? 'Tarih' : 'Date'}
                  </span>
                  <span className="mt-1 block font-mono tabular-nums text-[#d9d0bf]">
                    {activeItem.date}
                  </span>
                </div>
                <div className="py-2 sm:px-4 sm:py-0">
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-[#d9d0bf]/45">
                    {lang === 'tr' ? 'İrtifa' : 'Altitude'}
                  </span>
                  <span className="mt-1 block font-mono tabular-nums text-[#d9d0bf]">
                    {activeItem.altitude}
                  </span>
                </div>
                <div className="py-2 sm:px-4 sm:py-0">
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-[#d9d0bf]/45">
                    {lang === 'tr' ? 'Koşul' : 'Condition'}
                  </span>
                  <span className="mt-1 block font-mono tabular-nums text-[#d9d0bf]">
                    {activeItem.wind}
                  </span>
                </div>
                <div className="py-2 sm:py-0 sm:pl-4">
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-[#d9d0bf]/45">
                    {lang === 'tr' ? 'Saha' : 'Site'}
                  </span>
                  <span className="mt-1 block text-[#d9d0bf]">{activeItem.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
