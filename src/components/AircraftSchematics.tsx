import React from 'react';
import type { MediaGalleryItem } from '../data/siteData';

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
  return (
    <div className="relative h-full w-full bg-[#000000] bg-cad-grid py-6">
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
            <rect x="256" y="22" width="88" height="20" fill="#000000" />
            <text x="300" y="36" textAnchor="middle" fill="#d9d0bf" fontSize="10" fontFamily="IBM Plex Mono, monospace">
              2.85 m
            </text>

            <rect x="206" y="98" width="6" height="196" fill="#000000" stroke="#d9d0bf" strokeOpacity="0.55" strokeWidth="1.2" />
            <rect x="388" y="98" width="6" height="196" fill="#000000" stroke="#d9d0bf" strokeOpacity="0.55" strokeWidth="1.2" />

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
              fill="#000000"
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
                  strokeOpacity={showSystems ? 0.8 : 0.35}
                  strokeWidth={showSystems ? '1.3' : '1'}
                  strokeDasharray="4 4"
                  fill={showSystems ? 'rgba(217,208,191,0.06)' : 'none'}
                />
                <circle cx={p.x} cy={p.y} r="3.5" fill="#000000" stroke="#d9d0bf" strokeWidth="1.3" />
              </g>
            ))}

            {showSystems && (
              <g>
                <line x1="82" y1="164" x2="518" y2="164" stroke="#d9d0bf" strokeWidth="2" />
                <rect x="289" y="84" width="22" height="24" fill="rgba(217,208,191,0.22)" stroke="#d9d0bf" strokeWidth="1.2" />
                <rect x="287" y="126" width="26" height="32" fill="rgba(217,208,191,0.18)" stroke="#d9d0bf" strokeWidth="1.2" />
                <rect x="288" y="168" width="24" height="44" fill="rgba(217,208,191,0.12)" stroke="#d9d0bf" strokeWidth="1.2" />

                <polyline points="311,96 445,72 530,72" stroke="#d9d0bf" strokeOpacity="0.6" strokeWidth="1" />
                <text x="530" y="67" textAnchor="end" fill="#d9d0bf" fontSize="9.5" fontFamily="IBM Plex Mono, monospace">
                  Jetson Orin + EO/IR
                </text>

                <polyline points="287,142 150,118 62,118" stroke="#d9d0bf" strokeOpacity="0.6" strokeWidth="1" />
                <text x="62" y="113" textAnchor="start" fill="#d9d0bf" fontSize="9.5" fontFamily="IBM Plex Mono, monospace">
                  Dual Cube Orange+
                </text>

                <polyline points="300,252 300,322 420,322" stroke="#d9d0bf" strokeOpacity="0.6" strokeWidth="1" />
                <text x="424" y="326" textAnchor="start" fill="#d9d0bf" fontSize="9.5" fontFamily="IBM Plex Mono, monospace">
                  Pusher Propulsion
                </text>
              </g>
            )}
          </g>
        )}

        {type === 'tiltrotor' && (
          <g>
            <line x1="108" y1="32" x2="492" y2="32" stroke="rgba(217,208,191,0.35)" strokeWidth="1" />
            <line x1="108" y1="26" x2="108" y2="38" stroke="rgba(217,208,191,0.5)" strokeWidth="1" />
            <line x1="492" y1="26" x2="492" y2="38" stroke="rgba(217,208,191,0.5)" strokeWidth="1" />
            <rect x="256" y="22" width="88" height="20" fill="#000000" />
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
              fill="#000000"
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
                <rect x={xPos - 7} y="124" width="14" height="44" fill="#000000" stroke="#d9d0bf" strokeWidth="1.3" />
                <circle
                  cx={xPos}
                  cy={124}
                  r="34"
                  stroke="#d9d0bf"
                  strokeOpacity={showSystems ? 0.8 : 0.4}
                  strokeWidth={showSystems ? '1.3' : '1'}
                  strokeDasharray="4 4"
                  fill={showSystems ? 'rgba(217,208,191,0.06)' : 'none'}
                />
                <circle cx={xPos} cy={124} r="3.5" fill="#d9d0bf" />
              </g>
            ))}

            <circle cx="300" cy="284" r="24" stroke="#d9d0bf" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="300" cy="284" r="3" fill="#d9d0bf" />

            {showSystems && (
              <g>
                <line x1="120" y1="160" x2="480" y2="160" stroke="#d9d0bf" strokeWidth="2" />
                <rect x="288" y="98" width="24" height="32" fill="rgba(217,208,191,0.22)" stroke="#d9d0bf" strokeWidth="1.2" />
                <rect x="289" y="144" width="22" height="40" fill="rgba(217,208,191,0.16)" stroke="#d9d0bf" strokeWidth="1.2" />

                <polyline points="406,124 475,82 544,82" stroke="#d9d0bf" strokeOpacity="0.6" strokeWidth="1" />
                <text x="544" y="77" textAnchor="end" fill="#d9d0bf" fontSize="9.5" fontFamily="IBM Plex Mono, monospace">
                  0°–90° Tilt Nacelle
                </text>

                <polyline points="288,114 140,82 64,82" stroke="#d9d0bf" strokeOpacity="0.6" strokeWidth="1" />
                <text x="64" y="77" textAnchor="start" fill="#d9d0bf" fontSize="9.5" fontFamily="IBM Plex Mono, monospace">
                  Thermal + EO Gimbal
                </text>
              </g>
            )}
          </g>
        )}

        {type === 'hexacopter' && (
          <g>
            <line x1="158" y1="32" x2="442" y2="32" stroke="rgba(217,208,191,0.35)" strokeWidth="1" />
            <line x1="158" y1="26" x2="158" y2="38" stroke="rgba(217,208,191,0.5)" strokeWidth="1" />
            <line x1="442" y1="26" x2="442" y2="38" stroke="rgba(217,208,191,0.5)" strokeWidth="1" />
            <rect x="256" y="22" width="88" height="20" fill="#000000" />
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
                    strokeOpacity={showSystems ? 0.8 : 0.5}
                    strokeWidth="4"
                  />
                  <circle
                    cx={x2}
                    cy={y2}
                    r="34"
                    fill={showSystems ? 'rgba(217,208,191,0.06)' : 'none'}
                    stroke="#d9d0bf"
                    strokeOpacity={showSystems ? 0.75 : 0.35}
                    strokeWidth={showSystems ? '1.2' : '1'}
                    strokeDasharray="4 4"
                  />
                  <circle cx={x2} cy={y2} r="5.5" fill="#000000" stroke="#d9d0bf" strokeWidth="1.3" />
                </g>
              );
            })}

            <polygon
              points="300,134 334,150 348,182 334,214 300,230 266,214 252,182 266,150"
              fill="#000000"
              stroke="#d9d0bf"
              strokeWidth="1.5"
            />
            <circle cx="300" cy="182" r="18" fill="rgba(217,208,191,0.08)" stroke="#d9d0bf" strokeWidth="1" />
            <circle cx="300" cy="182" r="4.5" fill="#d9d0bf" />

            {showSystems && (
              <g>
                <circle cx="300" cy="182" r="62" stroke="#d9d0bf" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                <polyline points="300,150 440,82 538,82" stroke="#d9d0bf" strokeOpacity="0.6" strokeWidth="1" />
                <text x="538" y="77" textAnchor="end" fill="#d9d0bf" fontSize="9.5" fontFamily="IBM Plex Mono, monospace">
                  360° Solid-State LiDAR
                </text>

                <polyline points="266,196 140,278 62,278" stroke="#d9d0bf" strokeOpacity="0.6" strokeWidth="1" />
                <text x="62" y="273" textAnchor="start" fill="#d9d0bf" fontSize="9.5" fontFamily="IBM Plex Mono, monospace">
                  Hex Redundancy (N-1)
                </text>
              </g>
            )}
          </g>
        )}
      </svg>
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
