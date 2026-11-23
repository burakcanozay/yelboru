import React, { useEffect, useState } from 'react';
import type { LocalizedText, MediaGalleryItem } from '../data/siteData';
import { t } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';

interface SubsystemPoint {
  id: string;
  num: string;
  x: number;
  y: number;
  title: LocalizedText;
  detail: LocalizedText;
}

const SUBSYSTEM_POINTS: Record<'quadplane' | 'tiltrotor' | 'hexacopter', SubsystemPoint[]> = {
  quadplane: [
    {
      id: 'qp-ai',
      num: '01',
      x: 300,
      y: 96,
      title: { tr: 'Jetson Orin Nano + EO/IR Burun Bölmesi', en: 'Jetson Orin Nano + EO/IR Nose Bay' },
      detail: {
        tr: '60+ FPS gerçek zamanlı hedef tespiti ve otonom faydalı yük bırakma için hızlı sökülebilir sensör yuvası.',
        en: 'Quick-swap sensor bay running 60+ FPS real-time target recognition and autonomous payload release.',
      },
    },
    {
      id: 'qp-fc',
      num: '02',
      x: 300,
      y: 146,
      title: { tr: 'Çift Yedekli Cube Orange+ & RTK GNSS', en: 'Dual-Redundant Cube Orange+ & RTK GNSS' },
      detail: {
        tr: '400 Hz PX4 geçiş kontrol döngüsü, üçlü IMU yedekliliği ve santimetre hassasiyetinde konumlama.',
        en: '400 Hz PX4 transition control loop with triple-redundant IMUs and centimeter-grade RTK positioning.',
      },
    },
    {
      id: 'qp-prop',
      num: '03',
      x: 300,
      y: 250,
      title: { tr: '4× VTOL Kaldırma + Arka İtici Motor', en: '4× VTOL Lift + Pusher Cruise Propulsion' },
      detail: {
        tr: '35 m irtifada sabit kanat uçuşuna geçiş yaparak 95 dakikaya kadar verimli seyir sağlayan hibrit tahrik.',
        en: 'Hybrid propulsion transitioning to fixed-wing cruise at 35 m AGL for up to 95 minutes endurance.',
      },
    },
  ],
  tiltrotor: [
    {
      id: 'tr-gimbal',
      num: '01',
      x: 300,
      y: 112,
      title: { tr: 'Termal + EO Çift Eksen Gimbal', en: 'Dual-Axis Thermal + EO Gimbal' },
      detail: {
        tr: 'Yüksek hızlı arama-kurtarma görevlerinde gece/gündüz titreşimsiz hedef kilidi ve canlı aktarım.',
        en: 'Stabilized day/night target lock and low-latency stream for high-speed search and rescue.',
      },
    },
    {
      id: 'tr-nacelle',
      num: '02',
      x: 406,
      y: 124,
      title: { tr: '0°–90° CNC Titanyum Tilt Aktüatör', en: '0°–90° CNC Titanium Tilt Nacelle' },
      detail: {
        tr: 'Ek VTOL boom sürüklemesini ortadan kaldırarak 115 km/s seyir hızına ulaşan kapalı çevrim eğme mekanizması.',
        en: 'Closed-loop tilting nacelle eliminating boom drag to achieve 115 km/h high-speed cruise.',
      },
    },
    {
      id: 'tr-tail',
      num: '03',
      x: 300,
      y: 284,
      title: { tr: 'V-Kuyruk & Arka Hover Dengeleyici', en: 'V-Tail & Rear Hover Stabilizer' },
      detail: {
        tr: 'Dikey kalkışta yunuslama dengesi sağlayan, seyir fazında kapanarak %18 sürükleme tasarrufu sunan kuyruk iticisi.',
        en: 'Pitch-stabilizing hover rotor that folds during cruise for an 18% aerodynamic drag reduction.',
      },
    },
  ],
  hexacopter: [
    {
      id: 'hx-lidar',
      num: '01',
      x: 300,
      y: 182,
      title: { tr: '360° Katı Hal LiDAR & SLAM Çekirdeği', en: '360° Solid-State LiDAR & SLAM Core' },
      detail: {
        tr: 'GPS sinyali olmayan kapalı ve kentsel alanlarda engel sakınma ve gerçek zamanlı 3B haritalama.',
        en: 'Obstacle avoidance and real-time 3D mapping in GPS-denied urban and confined spaces.',
      },
    },
    {
      id: 'hx-hex',
      num: '02',
      x: 404,
      y: 122,
      title: { tr: '6 Motorlu (N-1) Yedekli Tahrik', en: 'Hexa-Rotor (N-1) Fault-Tolerant Drive' },
      detail: {
        tr: 'Tek motor veya ESC arızasında kontrolü kaybetmeden güvenli acil iniş gerçekleştiren katlanabilir 3K karbon kollar.',
        en: 'Foldable 3K carbon arms maintaining controlled descent even after a single motor or ESC failure.',
      },
    },
    {
      id: 'hx-opt',
      num: '03',
      x: 196,
      y: 242,
      title: { tr: 'AprilTag Hassas Görsel İniş Modülü', en: 'AprilTag Precision Visual Landing' },
      detail: {
        tr: 'Hareketli platformlara 14 cm sapma payı ile tam otonom iniş sağlayan aşağı yönlü optik akış ve kamera sistemi.',
        en: 'Downward optical flow and vision stack delivering 14 cm CEP autonomous landings on moving pads.',
      },
    },
  ],
};

interface AircraftBlueprintProps {
  type: 'quadplane' | 'tiltrotor' | 'hexacopter';
  showSystems: boolean;
  code: string;
}

export const AircraftBlueprint: React.FC<AircraftBlueprintProps> = ({
  type,
  showSystems,
  code,
}) => {
  const { lang } = useLanguage();
  const points = SUBSYSTEM_POINTS[type];
  const [activePointId, setActivePointId] = useState<string>(points[0].id);

  useEffect(() => {
    setActivePointId(SUBSYSTEM_POINTS[type][0].id);
  }, [type]);

  const activePoint = points.find((p) => p.id === activePointId) ?? points[0];

  return (
    <div className="relative h-full w-full bg-[#070706] bg-cad-grid">
      <div className="py-6">
        <svg
          viewBox="0 0 600 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[260px] w-full sm:h-[320px]"
          aria-label={`${code} teknik çizimi`}
        >
          <line x1="300" y1="16" x2="300" y2="334" stroke="rgba(217,208,191,0.1)" strokeDasharray="5 6" />
          <line x1="36" y1="175" x2="564" y2="175" stroke="rgba(217,208,191,0.08)" strokeDasharray="5 6" />

          {type === 'quadplane' && (
            <g>
              <line x1="68" y1="32" x2="532" y2="32" stroke="rgba(217,208,191,0.35)" strokeWidth="1" />
              <line x1="68" y1="26" x2="68" y2="38" stroke="rgba(217,208,191,0.5)" strokeWidth="1" />
              <line x1="532" y1="26" x2="532" y2="38" stroke="rgba(217,208,191,0.5)" strokeWidth="1" />
              <rect x="256" y="22" width="88" height="20" fill="#070706" />
              <text x="300" y="36" textAnchor="middle" fill="#d9d0bf" fontSize="10" fontFamily="IBM Plex Mono, monospace">
                2.85 m
              </text>

              <rect x="206" y="98" width="6" height="196" fill="#070706" stroke="#d9d0bf" strokeOpacity="0.55" strokeWidth="1.2" />
              <rect x="388" y="98" width="6" height="196" fill="#070706" stroke="#d9d0bf" strokeOpacity="0.55" strokeWidth="1.2" />

              <path
                d="M300 128 L532 158 L526 192 L300 180 L74 192 L68 158 Z"
                fill={showSystems ? 'rgba(217,208,191,0.04)' : 'rgba(217,208,191,0.08)'}
                stroke="#d9d0bf"
                strokeWidth="1.4"
              />
              <path
                d="M206 282 L394 282 L394 302 L206 302 Z"
                fill="rgba(217,208,191,0.06)"
                stroke="#d9d0bf"
                strokeWidth="1.3"
              />
              <path
                d="M300 62 C318 78 326 120 323 192 L312 242 L288 242 L277 192 C274 120 282 78 300 62 Z"
                fill="#070706"
                stroke="#d9d0bf"
                strokeWidth="1.5"
              />
              <line x1="274" y1="248" x2="326" y2="248" stroke="#d9d0bf" strokeWidth="2.2" />

              {[
                { x: 209, y: 104 },
                { x: 391, y: 104 },
                { x: 209, y: 234 },
                { x: 391, y: 234 },
              ].map((p, idx) => (
                <g key={idx}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="30"
                    stroke="#d9d0bf"
                    strokeOpacity={showSystems ? 0.65 : 0.35}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    fill={showSystems ? 'rgba(217,208,191,0.04)' : 'none'}
                  />
                  <circle cx={p.x} cy={p.y} r="3.5" fill="#070706" stroke="#d9d0bf" strokeWidth="1.2" />
                </g>
              ))}

              {showSystems && (
                <g opacity="0.65">
                  <line x1="82" y1="164" x2="518" y2="164" stroke="#d9d0bf" strokeWidth="1.6" strokeDasharray="3 3" />
                  <rect x="289" y="84" width="22" height="24" fill="rgba(217,208,191,0.14)" stroke="#d9d0bf" strokeWidth="1" />
                  <rect x="287" y="128" width="26" height="34" fill="rgba(217,208,191,0.12)" stroke="#d9d0bf" strokeWidth="1" />
                </g>
              )}
            </g>
          )}

          {type === 'tiltrotor' && (
            <g>
              <line x1="108" y1="32" x2="492" y2="32" stroke="rgba(217,208,191,0.35)" strokeWidth="1" />
              <line x1="108" y1="26" x2="108" y2="38" stroke="rgba(217,208,191,0.5)" strokeWidth="1" />
              <line x1="492" y1="26" x2="492" y2="38" stroke="rgba(217,208,191,0.5)" strokeWidth="1" />
              <rect x="256" y="22" width="88" height="20" fill="#070706" />
              <text x="300" y="36" textAnchor="middle" fill="#d9d0bf" fontSize="10" fontFamily="IBM Plex Mono, monospace">
                2.20 m
              </text>

              <path
                d="M300 134 L492 152 L484 182 L300 178 L116 182 L108 152 Z"
                fill={showSystems ? 'rgba(217,208,191,0.04)' : 'rgba(217,208,191,0.08)'}
                stroke="#d9d0bf"
                strokeWidth="1.4"
              />
              <path
                d="M300 68 C316 84 322 128 316 204 L308 290 L292 290 L284 204 C278 128 284 84 300 68 Z"
                fill="#070706"
                stroke="#d9d0bf"
                strokeWidth="1.5"
              />
              <path
                d="M294 272 L232 314 L244 326 L300 292 L356 326 L368 314 L306 272 Z"
                fill="rgba(217,208,191,0.07)"
                stroke="#d9d0bf"
                strokeWidth="1.3"
              />

              {[194, 406].map((xPos, i) => (
                <g key={i}>
                  <rect x={xPos - 7} y="124" width="14" height="44" fill="#070706" stroke="#d9d0bf" strokeWidth="1.3" />
                  <circle
                    cx={xPos}
                    cy={124}
                    r="34"
                    stroke="#d9d0bf"
                    strokeOpacity={showSystems ? 0.65 : 0.4}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    fill={showSystems ? 'rgba(217,208,191,0.04)' : 'none'}
                  />
                  <circle cx={xPos} cy={124} r="3.5" fill="#d9d0bf" />
                </g>
              ))}

              <circle cx="300" cy="284" r="24" stroke="#d9d0bf" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="300" cy="284" r="3" fill="#d9d0bf" />

              {showSystems && (
                <line x1="120" y1="160" x2="480" y2="160" stroke="#d9d0bf" strokeOpacity="0.6" strokeWidth="1.6" strokeDasharray="3 3" />
              )}
            </g>
          )}

          {type === 'hexacopter' && (
            <g>
              <line x1="158" y1="32" x2="442" y2="32" stroke="rgba(217,208,191,0.35)" strokeWidth="1" />
              <line x1="158" y1="26" x2="158" y2="38" stroke="rgba(217,208,191,0.5)" strokeWidth="1" />
              <line x1="442" y1="26" x2="442" y2="38" stroke="rgba(217,208,191,0.5)" strokeWidth="1" />
              <rect x="256" y="22" width="88" height="20" fill="#070706" />
              <text x="300" y="36" textAnchor="middle" fill="#d9d0bf" fontSize="10" fontFamily="IBM Plex Mono, monospace">
                1.15 m
              </text>

              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const rad = ((deg - 30) * Math.PI) / 180;
                const x2 = 300 + Math.cos(rad) * 120;
                const y2 = 182 + Math.sin(rad) * 120;
                return (
                  <g key={deg}>
                    <line
                      x1="300"
                      y1="182"
                      x2={x2}
                      y2={y2}
                      stroke="#d9d0bf"
                      strokeOpacity={showSystems ? 0.75 : 0.5}
                      strokeWidth="4"
                    />
                    <circle
                      cx={x2}
                      cy={y2}
                      r="34"
                      fill={showSystems ? 'rgba(217,208,191,0.04)' : 'none'}
                      stroke="#d9d0bf"
                      strokeOpacity={showSystems ? 0.6 : 0.35}
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <circle cx={x2} cy={y2} r="5.5" fill="#070706" stroke="#d9d0bf" strokeWidth="1.3" />
                  </g>
                );
              })}

              <polygon
                points="300,134 334,150 348,182 334,214 300,230 266,214 252,182 266,150"
                fill="#070706"
                stroke="#d9d0bf"
                strokeWidth="1.5"
              />
              <circle cx="300" cy="182" r="18" fill="rgba(217,208,191,0.08)" stroke="#d9d0bf" strokeWidth="1" />
              <circle cx="300" cy="182" r="4.5" fill="#d9d0bf" />

              {showSystems && (
                <circle cx="300" cy="182" r="62" stroke="#d9d0bf" strokeWidth="1" strokeDasharray="3 3" opacity="0.45" />
              )}
            </g>
          )}

          {/* Interactive Numbered Inspection Points (01, 02, 03) in Avionics Layer */}
          {showSystems &&
            points.map((pt) => {
              const isSelected = pt.id === activePoint.id;
              return (
                <g
                  key={pt.id}
                  onClick={() => setActivePointId(pt.id)}
                  onMouseEnter={() => setActivePointId(pt.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${pt.num} ${t(pt.title, lang)}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActivePointId(pt.id);
                    }
                  }}
                  style={{ cursor: 'pointer', outline: 'none' }}
                >
                  {isSelected && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="18"
                      fill="none"
                      stroke="#ece6db"
                      strokeOpacity="0.45"
                      strokeWidth="1"
                    />
                  )}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="12"
                    fill={isSelected ? '#ece6db' : '#070706'}
                    stroke={isSelected ? '#ece6db' : '#d9d0bf'}
                    strokeWidth="1.3"
                  />
                  <text
                    x={pt.x}
                    y={pt.y + 3.5}
                    textAnchor="middle"
                    fill={isSelected ? '#000000' : '#d9d0bf'}
                    fontSize="9"
                    fontWeight="500"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    {pt.num}
                  </text>
                </g>
              );
            })}
        </svg>
      </div>

      {/* Single-Line Interactive Subsystem Readout Strip */}
      {showSystems && (
        <div className="border-t border-[#d9d0bf]/15 bg-[#000000]/75 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div key={activePoint.id} className="tab-fade-in flex items-baseline gap-3">
              <span className="font-mono tabular-nums text-xs text-[#ece6db]">
                {activePoint.num}
              </span>
              <div>
                <span className="text-xs font-medium text-[#ece6db]">
                  {t(activePoint.title, lang)}
                </span>
                <span className="mx-2 text-[#d9d0bf]/25">—</span>
                <span className="text-xs text-[#d9d0bf]/65">
                  {t(activePoint.detail, lang)}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              {points.map((pt) => {
                const isSelected = pt.id === activePoint.id;
                return (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setActivePointId(pt.id)}
                    className={`border px-2 py-1 font-mono tabular-nums text-[10px] transition-colors duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-[#d9d0bf] bg-[#d9d0bf] text-[#000000] font-medium'
                        : 'border-[#d9d0bf]/20 text-[#d9d0bf]/55 hover:border-[#d9d0bf]/50 hover:text-[#ece6db]'
                    }`}
                  >
                    {pt.num}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const MediaTelemetryVisual: React.FC<{
  variant: MediaGalleryItem['visualVariant'];
  aircraft: string;
}> = ({ variant, aircraft }) => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#000000] bg-cad-grid">
      <svg
        viewBox="0 0 400 225"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
      >
        <line x1="24" y1="112" x2="376" y2="112" stroke="rgba(217,208,191,0.08)" strokeDasharray="4 6" />

        {variant === 'vtol-transition' && (
          <g>
            <path d="M72 184 L72 114 C72 72 120 64 185 64 L336 64" stroke="#d9d0bf" strokeWidth="1.4" strokeDasharray="5 4" />
            <circle cx="72" cy="184" r="3.5" fill="#d9d0bf" />
            <circle cx="118" cy="72" r="4.5" stroke="#d9d0bf" strokeWidth="1.4" fill="#000000" />
            <path d="M225 64 L260 58 L266 64 L260 70 Z" fill="#d9d0bf" />
          </g>
        )}

        {variant === 'autonomous-landing' && (
          <g>
            <circle cx="200" cy="112" r="56" stroke="rgba(217,208,191,0.2)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="200" cy="112" r="32" stroke="#d9d0bf" strokeWidth="1.2" />
            <rect x="184" y="96" width="32" height="32" stroke="#d9d0bf" strokeWidth="1.3" fill="rgba(217,208,191,0.06)" />
            <line x1="200" y1="42" x2="200" y2="88" stroke="#d9d0bf" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="200" y1="136" x2="200" y2="182" stroke="#d9d0bf" strokeOpacity="0.4" strokeWidth="1" />
          </g>
        )}

        {variant === 'wind-tunnel' && (
          <g>
            <path d="M40 68 Q180 46 360 74" stroke="#d9d0bf" strokeWidth="1" opacity="0.3" />
            <path d="M40 90 Q170 68 360 92" stroke="#d9d0bf" strokeWidth="1.2" opacity="0.65" />
            <path d="M40 138 Q185 150 360 132" stroke="#d9d0bf" strokeWidth="1.1" opacity="0.5" />
            <path
              d="M118 112 C138 88 218 90 290 114 C224 125 144 127 118 112 Z"
              fill="rgba(217,208,191,0.12)"
              stroke="#d9d0bf"
              strokeWidth="1.4"
            />
          </g>
        )}

        {variant === 'night-telemetry' && (
          <g>
            <circle cx="152" cy="112" r="46" stroke="#d9d0bf" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="152" cy="112" r="20" stroke="#d9d0bf" strokeWidth="1.2" />
            <circle cx="152" cy="112" r="4" fill="#d9d0bf" />
            {[28, 44, 62, 88, 56, 38, 70, 48, 30].map((h, i) => (
              <rect
                key={i}
                x={236 + i * 14}
                y={158 - h}
                width="7"
                height={h}
                fill="#d9d0bf"
                opacity={i === 3 ? 0.9 : 0.35}
              />
            ))}
          </g>
        )}

        {variant === 'composite-layup' && (
          <g>
            <rect x="86" y="64" width="228" height="96" stroke="#d9d0bf" strokeOpacity="0.55" strokeWidth="1.2" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={i} x1={86 + i * 38} y1="160" x2={124 + i * 38} y2="64" stroke="rgba(217,208,191,0.16)" strokeWidth="1" />
            ))}
            <path d="M110 132 L290 92" stroke="#d9d0bf" strokeWidth="1.5" strokeDasharray="6 3" />
          </g>
        )}

        {variant === 'formation-flight' && (
          <g>
            <path d="M46 154 Q160 74 346 86" stroke="#d9d0bf" strokeWidth="1.4" />
            <path d="M62 174 Q176 96 356 112" stroke="#d9d0bf" strokeOpacity="0.45" strokeWidth="1.3" strokeDasharray="5 4" />
            <polygon points="244,80 258,86 244,92" fill="#d9d0bf" />
            <polygon points="222,108 236,114 222,120" fill="#d9d0bf" fillOpacity="0.6" />
          </g>
        )}

        <text x="20" y="206" fill="#d9d0bf" fillOpacity="0.55" fontSize="9" fontFamily="IBM Plex Mono, monospace">
          {aircraft}
        </text>
      </svg>
    </div>
  );
};
