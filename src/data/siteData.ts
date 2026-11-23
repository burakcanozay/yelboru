import type { Language } from '../context/LanguageContext';

export interface LocalizedText {
  tr: string;
  en: string;
}

export interface NavItem {
  id: string;
  label: LocalizedText;
}

export interface MetricItem {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  code: string;
  label: LocalizedText;
  sublabel: LocalizedText;
}

export interface AircraftSpec {
  key: string;
  label: LocalizedText;
  value: string;
  unit?: string;
}

export interface AircraftProject {
  id: string;
  code: string;
  name: string;
  nickname: string;
  category: LocalizedText;
  schematicType: 'quadplane' | 'tiltrotor' | 'hexacopter';
  /** Gerçek stüdyo CAD/3D render veya fotoğraf yolu. Örn: './images/aircraft/v03-bozkurt.jpg' */
  renderImage?: string;
  /** Araç detay galerisi için ek açılar. Örn: ['./images/aircraft/v03-side.jpg'] */
  galleryImages?: string[];
  status: LocalizedText;
  statusVariant: 'active' | 'testing' | 'rd';
  year: string;
  tagline: LocalizedText;
  missionDescription: LocalizedText;
  highlights: LocalizedText[];
  specs: AircraftSpec[];
  telemetrySummary: {
    cruiseAlt: string;
    datalink: string;
    autonomy: string;
  };
}

export interface TechDomain {
  id: string;
  code: string;
  icon: 'wind' | 'cpu' | 'radio' | 'eye';
  accent: 'cyan' | 'orange';
  spanClass: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  tags: string[];
  metrics: { label: LocalizedText; value: string }[];
}

export type DepartmentKey = 'all' | 'mechanical' | 'avionics' | 'software' | 'management';

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  callsign: string;
  department: Exclude<DepartmentKey, 'all'>;
  role: LocalizedText;
  specialty: LocalizedText;
  linkedin: string;
  github?: string;
  /** Ekip üyesi portresi (3:4 dikey kadraj önerilir). Örn: './images/team/kerem-alparslan.jpg' */
  photoUrl?: string;
}

export interface MediaGalleryItem {
  id: string;
  flightCode: string;
  type: 'video' | 'photo';
  visualVariant: 'vtol-transition' | 'wind-tunnel' | 'autonomous-landing' | 'night-telemetry' | 'composite-layup' | 'formation-flight';
  /** Galeri kartı kapak görseli. Örn: './images/gallery/flt-042-thumb.jpg' */
  thumbnailUrl?: string;
  /** Modalda açılacak yüksek çözünürlüklü fotoğraf, MP4 video veya YouTube linki. Örn: './images/gallery/flt-042.mp4' veya 'https://youtu.be/...' */
  mediaUrl?: string;
  title: LocalizedText;
  description: LocalizedText;
  date: string;
  location: string;
  duration?: string;
  altitude: string;
  wind: string;
  aircraft: string;
}

export interface SponsorItem {
  id: string;
  name: string;
  shortMark: string;
  tier: 'main' | 'gold' | 'supporter';
  sector: LocalizedText;
  url: string;
  /** Şeffaf PNG/SVG sponsor logosu (otomatik monokrom #d9d0bf tonuna çevrilir). Örn: './images/sponsors/turksav.svg' */
  logoUrl?: string;
}

export interface MilestoneItem {
  year: string;
  title: LocalizedText;
  detail: LocalizedText;
}

export const t = (text: LocalizedText, lang: Language): string => text[lang];

/**
 * ============================================================================
 * YELBÖRÜ EKİP VERİ & MEDYA DOSYASI
 * Ekip üyeleri, projeler, sponsorlar, iletişim ve gerçek medya dosyaları bu
 * dosyadan tek noktadan kolayca güncellenebilir.
 *
 * MEDYA KLASÖR DÜZENİ (`public/images/`):
 * - Hero fotoğraf/video : public/images/hero/      -> './images/hero/v03-studio.jpg'
 * - VTOL stüdyo render  : public/images/aircraft/  -> './images/aircraft/v03-bozkurt.png'
 * - Ekip portreleri     : public/images/team/      -> './images/team/ad-soyad.jpg'
 * - Test uçuşu medyası  : public/images/gallery/   -> './images/gallery/flt-042.mp4' (veya YouTube URL)
 * - Sponsor logoları    : public/images/sponsors/  -> './images/sponsors/marka.svg'
 *
 * Not: Bir görsel alanı boş bırakıldığında veya dosya henüz eklenmediğinde,
 * arayüz otomatik olarak temiz teknik şema / monogram yer tutucusuna düşer.
 * ============================================================================
 */
export const siteData = {
  brand: {
    name: 'YELBÖRÜ',
    tagline: {
      tr: 'OTONOM İHA & VTOL SİSTEMLERİ',
      en: 'AUTONOMOUS UAV & VTOL SYSTEMS',
    },
    callsign: 'YLB-HQ // 41.0082°N 28.9784°E',
  },

  /** Üst menüde gösterilen 5 temel bağlantı */
  navNavigation: [
    { id: 'hakkimizda', label: { tr: 'Hakkımızda', en: 'About' } },
    { id: 'projeler', label: { tr: 'Projeler', en: 'Projects' } },
    { id: 'teknoloji', label: { tr: 'Teknoloji', en: 'Technology' } },
    { id: 'ekip', label: { tr: 'Ekip', en: 'Team' } },
    { id: 'iletisim', label: { tr: 'İletişim', en: 'Contact' } },
  ] as NavItem[],

  /** Footer menüsünde gösterilen tüm sayfa bağlantıları (Testler ve Sponsorlar dahil) */
  navigation: [
    { id: 'hakkimizda', label: { tr: 'Hakkımızda', en: 'About' } },
    { id: 'projeler', label: { tr: 'Projeler', en: 'Projects' } },
    { id: 'teknoloji', label: { tr: 'Teknoloji', en: 'Technology' } },
    { id: 'ekip', label: { tr: 'Ekip', en: 'Team' } },
    { id: 'galeri', label: { tr: 'Testler', en: 'Flight Tests' } },
    { id: 'sponsorlar', label: { tr: 'Sponsorlar', en: 'Sponsors' } },
    { id: 'iletisim', label: { tr: 'İletişim', en: 'Contact' } },
  ] as NavItem[],

  navCta: {
    tr: 'Sponsor Ol',
    en: 'Become a Sponsor',
  },

  hero: {
    /**
     * Karanlık stüdyo VTOL fotoğrafı veya sessiz loop MP4 video arka planı:
     * Örn: backgroundImage: './images/hero/v03-studio.jpg'
     * Örn: backgroundVideo: './images/hero/v03-flight.mp4'
     * İkisi de boş bırakıldığında arka planda zarif Yelbörü amblemi görünür.
     */
    backgroundImage: '' as string | undefined,
    backgroundVideo: '' as string | undefined,
    locationTag: {
      tr: 'İSTANBUL // 41.10°N',
      en: 'ISTANBUL // 41.10°N',
    },
    capabilities: [
      { tr: 'VTOL Geçiş', en: 'VTOL Transition' },
      { tr: '45 km Menzil', en: '45 km Range' },
      { tr: 'Gömülü Yapay Zeka', en: 'Onboard Edge AI' },
    ],
    scrollLabel: {
      tr: 'Keşfet',
      en: 'Explore',
    },
    statusBadge: {
      tr: 'SİSTEM AKTİF // VTOL GEÇİŞ TELEMETRİSİ ÇEVRİMİÇİ',
      en: 'SYSTEM ACTIVE // VTOL TRANSITION TELEMETRY ONLINE',
    },
    headlineLine1: {
      tr: 'Dikey Kalkış,',
      en: 'Vertical Takeoff,',
    },
    headlineLine2: {
      tr: 'Sınırsız Otonomi.',
      en: 'Limitless Autonomy.',
    },
    description: {
      tr: 'Yelbörü; piste bağımsız dikey iniş-kalkış (VTOL) yapabilen, yapay zeka destekli yeni nesil insansız hava araçlarını tasarımdan uçuş testine kadar kendi bünyesinde geliştiren ileri teknoloji havacılık ekibidir.',
      en: 'Yelbörü is an advanced aerospace engineering team designing, manufacturing, and flight-testing next-generation autonomous VTOL and unmanned aerial vehicles from composite airframe to onboard AI.',
    },
    primaryCta: {
      tr: 'VTOL Projelerimiz',
      en: 'Explore VTOL Fleet',
    },
    secondaryCta: {
      tr: 'Bize Katıl / Sponsor Ol',
      en: 'Join Us / Sponsor',
    },
    hudStats: [
      { label: 'MODE', value: 'VTOL_FWD_TRANS', accent: 'cyan' as const },
      { label: 'ALT_AGL', value: '120.4 m', accent: 'slate' as const },
      { label: 'AIRSPEED', value: '24.8 m/s', accent: 'slate' as const },
      { label: 'LINK_RSSI', value: '-64 dBm / 99%', accent: 'orange' as const },
    ],
  },

  metrics: [
    {
      id: 'prototypes',
      value: 7,
      suffix: '+',
      prefix: '0',
      code: 'SYS-PROTO',
      label: { tr: 'Geliştirilen Prototip', en: 'Flight Prototypes' },
      sublabel: { tr: 'VTOL, Sabit & Döner Kanat', en: 'VTOL, Fixed & Multi-Rotor' },
    },
    {
      id: 'flight-hours',
      value: 420,
      suffix: '+',
      code: 'FLT-HOURS',
      label: { tr: 'Otonom Uçuş Saati', en: 'Autonomous Flight Hours' },
      sublabel: { tr: 'Saha & Telemetri Doğrulamalı', en: 'Field & Telemetry Verified' },
    },
    {
      id: 'subteams',
      value: 5,
      suffix: '',
      prefix: '0',
      code: 'ENG-UNITS',
      label: { tr: 'Uzman Alt Takım', en: 'Engineering Sub-Teams' },
      sublabel: { tr: 'Disiplinlerarası Mühendislik', en: 'Multidisciplinary Core' },
    },
    {
      id: 'awards',
      value: 12,
      suffix: '',
      code: 'COMP-RANK',
      label: { tr: 'Yarışma Başarısı', en: 'Competition Honors' },
      sublabel: { tr: 'Ulusal & Uluslararası Derece', en: 'National & Global Finishes' },
    },
  ] as MetricItem[],

  about: {
    eyebrow: { tr: '01 // HAKKIMIZDA & MİSYON', en: '01 // ABOUT & MISSION' },
    title: {
      tr: 'Gökyüzünün Mühendisliğini Sıfırdan İnşa Ediyoruz',
      en: 'Engineering the Next Horizon of Autonomous Flight',
    },
    lead: {
      tr: 'Adını Türk mitolojisindeki rüzgar gibi hızlı ve yönünü şaşırmayan efsanevi kurttan alan Yelbörü, 2021 yılında havacılık tutkunu mühendislik öğrencileri tarafından kuruldu.',
      en: 'Named after the swift mythological wind-wolf of Turkic lore, Yelbörü was founded in 2021 by aerospace-driven engineering students committed to pushing autonomous flight boundaries.',
    },
    story: {
      tr: 'Standart ticari platformları uyarlamak yerine; aerodinamik optimizasyon, vakum infüzyon karbon fiber gövde üretimi, özgün güç dağıtım PCB’leri ve gerçek zamanlı görüntü işleme algoritmalarını uçtan uca geliştiriyoruz. Hedefimiz, pist gerektirmeyen VTOL verimliliğini tam otonom görev zekasıyla birleştirerek TEKNOFEST ve SUAS gibi prestijli arenalarda ülkemizi zirvede temsil etmek.',
      en: 'Rather than adapting off-the-shelf frames, we engineer every layer in-house: CFD-validated airframes, vacuum-infused carbon fiber composites, redundant avionics PCBs, and onboard edge-AI perception. Our mission is to unite runway-independent VTOL endurance with resilient autonomy at TEKNOFEST and international SUAS competitions.',
    },
    pillars: [
      {
        code: 'VIS-01',
        title: { tr: 'VTOL Geçiş Mükemmelliği', en: 'VTOL Transition Mastery' },
        desc: {
          tr: 'Dikey kalkışın manevra kabiliyeti ile sabit kanadın uzun menzilli süzülme verimliliğini tek gövdede birleştiren hibrit kontrol mimarisi.',
          en: 'Hybrid flight control fusing vertical takeoff agility with fixed-wing aerodynamic endurance in seamless transition envelopes.',
        },
      },
      {
        code: 'VIS-02',
        title: { tr: 'Yerli & Özgün Aviyonik', en: 'In-House Avionics Stack' },
        desc: {
          tr: 'Kritik görevlerde hata toleransı sunan çift yedekli güç modülleri, kriptolu uzun menzil telemetri ve özel sensör füzyonu.',
          en: 'Fault-tolerant dual-redundant power boards, long-range encrypted telemetry links, and custom sensor fusion stacks.',
        },
      },
      {
        code: 'VIS-03',
        title: { tr: 'Küresel Yarışma Hedefi', en: 'Global Competition Arena' },
        desc: {
          tr: 'TEKNOFEST Uluslararası İHA, Savaşan İHA ve ABD merkezli SUAS yarışmalarında otonom görev icrası ve uluslararası mühendislik standartları.',
          en: 'Competing for podium finishes at TEKNOFEST International UAV, Fighter UAV, and US-based SUAS autonomous aerial challenges.',
        },
      },
    ],
    milestones: [
      {
        year: '2021',
        title: { tr: 'Kuruluş & İlk Döner Kanat', en: 'Foundation & First Multi-Rotor' },
        detail: {
          tr: '8 kişilik çekirdek kadro ile otonom görev icra eden ilk quadcopter prototipi uçuruldu.',
          en: '8 founding engineers built and flew our first autonomous waypoint-capable quadcopter.',
        },
      },
      {
        year: '2023',
        title: { tr: 'İlk Hibrit VTOL Geçiş Uçuşu', en: 'First Hybrid VTOL Transition' },
        detail: {
          tr: 'Karbon kompozit QuadPlane gövde ile tam otonom hover-seyir geçişi başarıyla tamamlandı.',
          en: 'Completed fully autonomous hover-to-cruise transition with our custom carbon QuadPlane airframe.',
        },
      },
      {
        year: '2024',
        title: { tr: 'TEKNOFEST Finalist & En İyi Tasarım', en: 'TEKNOFEST Finalist & Best Design' },
        detail: {
          tr: 'Gerçek zamanlı yapay zeka destekli hedef tespiti ve hassas faydalı yük bırakma görevinde ödül kazanıldı.',
          en: 'Awarded for real-time edge-AI target recognition and precision autonomous payload delivery.',
        },
      },
      {
        year: '2025+',
        title: { tr: 'Tilt-Rotor & Sürü Otonomisi', en: 'Tilt-Rotor & Swarm Autonomy' },
        detail: {
          tr: 'Yeni nesil YELBÖRÜ V-03 ve Tilt-Rotor T-02 platformlarıyla uluslararası SUAS ve uzun menzil testleri.',
          en: 'Advancing YELBÖRÜ V-03 and Tilt-Rotor T-02 platforms for international SUAS and BVLOS missions.',
        },
      },
    ] as MilestoneItem[],
  },

  projectsSection: {
    eyebrow: { tr: '02 // HAVA ARACI VİTRİNİ', en: '02 // AIRCRAFT FLEET' },
    title: { tr: 'VTOL & Otonom Drone Platformlarımız', en: 'Our VTOL & Autonomous Drone Fleet' },
    subtitle: {
      tr: 'Her biri farklı görev profillerine göre aerodinamik ve yapısal olarak sıfırdan tasarlanmış insansız hava araçlarımızı teknik şemalarıyla inceleyin.',
      en: 'Explore our purpose-built unmanned aircraft—each aerodynamically optimized and structurally engineered in-house for specialized autonomous missions.',
    },
    viewModes: {
      render: { tr: 'Fotoğraf / Render', en: 'Photo / Render' },
      blueprint: { tr: 'Teknik Şema (CAD)', en: 'CAD Blueprint' },
      systems: { tr: 'Aviyonik Katmanı', en: 'Avionics Layer' },
    },
    specTableTitle: { tr: 'TEKNİK ÖZELLİKLER // SPECS', en: 'TECHNICAL SPECIFICATIONS' },
    missionTitle: { tr: 'GÖREV TANIMI', en: 'MISSION PROFILE' },
    highlightsTitle: { tr: 'ÖNE ÇIKAN MÜHENDİSLİK', en: 'ENGINEERING HIGHLIGHTS' },
  },

  aircraft: [
    {
      id: 'v03-bozkurt',
      code: 'YLB-V03',
      name: 'YELBÖRÜ V-03',
      nickname: 'BOZKURT',
      category: { tr: 'Hibrit QuadPlane VTOL', en: 'Hybrid QuadPlane VTOL' },
      schematicType: 'quadplane',
      status: { tr: 'AKTİF UÇUŞ TESTİ', en: 'ACTIVE FLIGHT TEST' },
      statusVariant: 'active',
      year: '2025',
      tagline: {
        tr: 'Uzun menzilli haritalama, gözetleme ve otonom faydalı yük bırakma için geliştirilen amiral gemisi hibrit VTOL platformu.',
        en: 'Flagship hybrid QuadPlane VTOL engineered for long-range reconnaissance, mapping, and autonomous payload delivery.',
      },
      missionDescription: {
        tr: 'Dar ve engebeli arazilerden piste ihtiyaç duymadan dikey olarak kalkış yapar; 35 metre irtifada sabit kanat uçuşuna geçerek yüksek aerodinamik verimlilikle 95 dakikaya kadar havada kalır. Jetson Orin Nano destekli gömülü görüntü işleme sistemi sayesinde yer hedeflerini otonom tespit edip konumlandırır.',
        en: 'Takes off vertically from confined unprepared terrain, transitions seamlessly into fixed-wing cruise at 35m AGL, and sustains up to 95 minutes of endurance. Equipped with onboard Jetson Orin Nano vision for autonomous target localization and precision drops.',
      },
      highlights: [
        { tr: 'NACA 2412 / MH-32 hibrit karbon-epoksi vakum infüzyon kanat', en: 'Vacuum-infused carbon-epoxy hybrid wing profile' },
        { tr: 'Çift yedekli Cube Orange+ uçuş kontrolcüsü & RTK GNSS', en: 'Dual-redundant Cube Orange+ flight stack & RTK GNSS' },
        { tr: 'Modüler hızlı sökülebilir (tool-less) burun faydalı yük bölmesi', en: 'Modular tool-less quick-swap nose payload bay' },
      ],
      specs: [
        { key: 'wingspan', label: { tr: 'Kanat Açıklığı', en: 'Wingspan' }, value: '2.85', unit: 'm' },
        { key: 'mtow', label: { tr: 'MTOW (Maks. Kalkış)', en: 'MTOW' }, value: '12.4', unit: 'kg' },
        { key: 'endurance', label: { tr: 'Uçuş Süresi', en: 'Endurance' }, value: '95', unit: 'dk / min' },
        { key: 'cruise', label: { tr: 'Seyir Hızı', en: 'Cruise Speed' }, value: '24', unit: 'm/s (86 km/h)' },
        { key: 'range', label: { tr: 'Operasyon Menzili', en: 'Operational Range' }, value: '45', unit: 'km (RLOS)' },
        { key: 'propulsion', label: { tr: 'İtki Sistemi', en: 'Propulsion System' }, value: '4× VTOL + 1× Pusher BLDC', unit: '6S Li-Ion' },
      ],
      telemetrySummary: {
        cruiseAlt: '150 m AGL',
        datalink: '900 MHz / 2.4 GHz Dual',
        autonomy: 'PX4 + ROS2 Companion',
      },
    },
    {
      id: 't02-alperen',
      code: 'YLB-T02',
      name: 'YELBÖRÜ T-02',
      nickname: 'ALPEREN',
      category: { tr: 'Tilt-Rotor VTOL', en: 'Tilt-Rotor VTOL' },
      schematicType: 'tiltrotor',
      status: { tr: 'AR-GE & RÜZGAR TÜNELİ', en: 'R&D & WIND TUNNEL' },
      statusVariant: 'rd',
      year: '2026',
      tagline: {
        tr: 'Ön motorları 90° eğilebilen, düşük sürüklemeli yüksek hızlı otonom arama-kurtarma ve acil tıbbi lojistik aracı.',
        en: 'Low-drag tricopter tilt-rotor VTOL engineered for high-speed autonomous search-and-rescue and urgent medical logistics.',
      },
      missionDescription: {
        tr: 'QuadPlane mimarisindeki ek VTOL boom sürüklemesini ortadan kaldırmak için CNC işlenmiş titanyum-alüminyum eğilebilir motor mekanizmaları kullanır. Yüksek rüzgar direnci ve 115 km/s seyir hızıyla acil müdahale senaryolarında hedef bölgeye en kısa sürede ulaşır.',
        en: 'Eliminates parasitic QuadPlane boom drag via CNC-machined titanium-aluminum tilting nacelles. Delivers high wind-penetration capability and 115 km/h cruise speeds for rapid emergency response scenarios.',
      },
      highlights: [
        { tr: 'Yüksek torklu metal dişli kapalı çevrim tilt aktüatör sistemi', en: 'High-torque closed-loop metal-gear tilt actuator assembly' },
        { tr: 'V-Kuyruk aerodinamik konfigürasyonu ile %18 daha düşük sürükleme', en: 'V-tail aerodynamic layout achieving 18% drag reduction' },
        { tr: 'Termal + EO çift eksenli stabilize gimbal entegrasyonu', en: 'Dual-axis stabilized Thermal + EO gimbal integration' },
      ],
      specs: [
        { key: 'wingspan', label: { tr: 'Kanat Açıklığı', en: 'Wingspan' }, value: '2.20', unit: 'm' },
        { key: 'mtow', label: { tr: 'MTOW (Maks. Kalkış)', en: 'MTOW' }, value: '8.6', unit: 'kg' },
        { key: 'endurance', label: { tr: 'Uçuş Süresi', en: 'Endurance' }, value: '68', unit: 'dk / min' },
        { key: 'cruise', label: { tr: 'Seyir Hızı', en: 'Cruise Speed' }, value: '32', unit: 'm/s (115 km/h)' },
        { key: 'range', label: { tr: 'Operasyon Menzili', en: 'Operational Range' }, value: '38', unit: 'km' },
        { key: 'propulsion', label: { tr: 'İtki Sistemi', en: 'Propulsion System' }, value: '2× Tilt + 1× Tail BLDC', unit: '6S HV LiPo' },
      ],
      telemetrySummary: {
        cruiseAlt: '200 m AGL',
        datalink: 'AES-256 Mesh Telemetry',
        autonomy: 'Custom MPC Transition',
      },
    },
    {
      id: 'q04-gokturk',
      code: 'YLB-Q04',
      name: 'YELBÖRÜ Q-04',
      nickname: 'GÖKTÜRK',
      category: { tr: 'Otonom Taktik Hexacopter', en: 'Autonomous Tactical Hexacopter' },
      schematicType: 'hexacopter',
      status: { tr: 'OPERASYONEL', en: 'OPERATIONAL' },
      statusVariant: 'testing',
      year: '2024',
      tagline: {
        tr: 'Tek motor arızasına dayanıklı, görsel-ataletsel navigasyon ve hassas otonom iniş test platformu.',
        en: 'Single-motor-failure tolerant hexacopter serving as our visual-inertial navigation and precision landing testbed.',
      },
      missionDescription: {
        tr: 'GPS’in engellendiği veya zayıf olduğu kentsel ve kapalı alan senaryolarında LiDAR ve optik akış sensörleriyle santimetre hassasiyetinde konum tutar. Hareketli platformlara AprilTag ve derin öğrenme tabanlı görsel kilitlenme ile tam otonom iniş gerçekleştirir.',
        en: 'Maintains centimeter-level positioning in GPS-denied environments using 2D/3D LiDAR and optical flow fusion. Performs fully autonomous precision landings onto moving platforms via AprilTag and deep-learning visual lock.',
      },
      highlights: [
        { tr: '6 motorlu yedekli tahrik ile motor kaybında güvenli acil iniş', en: 'Hexa-rotor redundancy supporting safe emergency descent' },
        { tr: '360° katı hal LiDAR engel sakınma & SLAM haritalama', en: '360° solid-state LiDAR obstacle avoidance & SLAM' },
        { tr: 'Katlanabilir 3K karbon fiber kol yapısı ile 2 dakikada kurulum', en: 'Foldable 3K carbon fiber booms with 2-minute field deploy' },
      ],
      specs: [
        { key: 'wingspan', label: { tr: 'Rotor Çapı (Diagonal)', en: 'Wheelbase (Diagonal)' }, value: '1.15', unit: 'm' },
        { key: 'mtow', label: { tr: 'MTOW (Maks. Kalkış)', en: 'MTOW' }, value: '7.2', unit: 'kg' },
        { key: 'endurance', label: { tr: 'Uçuş Süresi', en: 'Endurance' }, value: '38', unit: 'dk / min' },
        { key: 'cruise', label: { tr: 'Seyir Hızı', en: 'Cruise Speed' }, value: '15', unit: 'm/s (54 km/h)' },
        { key: 'range', label: { tr: 'Operasyon Menzili', en: 'Operational Range' }, value: '8', unit: 'km' },
        { key: 'propulsion', label: { tr: 'İtki Sistemi', en: 'Propulsion System' }, value: '6× 400KV Fırçasız BLDC', unit: '6S 16Ah' },
      ],
      telemetrySummary: {
        cruiseAlt: '50 m AGL',
        datalink: '5.8 GHz HD + MAVLink',
        autonomy: 'ROS2 Humble + SLAM',
      },
    },
  ] as AircraftProject[],

  technologySection: {
    eyebrow: { tr: '03 // MÜHENDİSLİK & TEKNOLOJİ', en: '03 // ENGINEERING & TECH STACK' },
    title: {
      tr: 'Dört Disiplin, Tek Otonom Mimari',
      en: 'Four Disciplines, One Autonomous Stack',
    },
    subtitle: {
      tr: 'Karbon fiber kanat profillerinden gömülü yapay zekaya kadar her alt sistem, yüksek güvenilirlik ve sahada tekrarlanabilir performans için entegre tasarlanır.',
      en: 'From carbon-composite airfoils to onboard neural inference, every subsystem is co-engineered for high reliability and repeatable field performance.',
    },
    domains: [
      {
        id: 'aero',
        code: 'ENG-01 // AERO & COMP',
        icon: 'wind',
        accent: 'cyan',
        spanClass: 'lg:col-span-7',
        title: { tr: 'Aerodinamik & Yapısal Tasarım', en: 'Aerodynamics & Composite Structures' },
        subtitle: { tr: 'CFD Analizi, FEA & Vakum İnfüzyon Karbon Gövde', en: 'CFD Simulation, FEA & Vacuum-Infused Carbon' },
        description: {
          tr: 'XFLR5 ve ANSYS Fluent ile doğrulanan yüksek taşıma/sürükleme oranlı kanat geometrileri, CNC kalıplarda vakum infüzyon yöntemiyle ultra hafif ve yüksek rijitlikli karbon-aramid kompozit gövdelere dönüştürülür.',
          en: 'High lift-to-drag airfoil geometries validated via XFLR5 and ANSYS Fluent are fabricated in CNC-milled molds using vacuum-infused carbon-aramid composites for extreme stiffness-to-weight ratios.',
        },
        tags: ['ANSYS Fluent', 'SolidWorks CAD', 'Karbon Kompozit', 'FEA Yapısal', 'CNC Kalıp'],
        metrics: [
          { label: { tr: 'L/D Verimlilik', en: 'L/D Ratio' }, value: '16.4:1' },
          { label: { tr: 'Gövde Ağırlık Tasarrufu', en: 'Airframe Mass Saved' }, value: '-28%' },
        ],
      },
      {
        id: 'control',
        code: 'ENG-02 // GNC & CTRL',
        icon: 'cpu',
        accent: 'orange',
        spanClass: 'lg:col-span-5',
        title: { tr: 'Otonom Uçuş Kontrolü', en: 'Autonomous Flight Control' },
        subtitle: { tr: 'VTOL Geçiş Dinamiği & Dayanıklı Kontrol', en: 'VTOL Transition Dynamics & Robust Control' },
        description: {
          tr: 'PX4 tabanlı özelleştirilmiş uçuş kontrol yazılımı, dinamik rüzgar bozuntuları altında kararlı hover-seyir geçişi, otonom rota planlama ve arıza-güvenli (fail-safe) geri dönüş algoritmaları.',
          en: 'Custom PX4 flight controllers delivering disturbance-rejecting hover-to-cruise transitions, dynamic path planning, and fail-safe return-to-launch autonomy.',
        },
        tags: ['PX4 / ArduPilot', 'MATLAB Simulink', 'SITL / HITL', 'PID & MPC', 'ROS 2'],
        metrics: [
          { label: { tr: 'Kontrol Döngüsü', en: 'Control Loop' }, value: '400 Hz' },
          { label: { tr: 'İniş Hassasiyeti', en: 'Landing CEP' }, value: '< 18 cm' },
        ],
      },
      {
        id: 'avionics',
        code: 'ENG-03 // AVIONICS & RF',
        icon: 'radio',
        accent: 'orange',
        spanClass: 'lg:col-span-5',
        title: { tr: 'Aviyonik & Haberleşme', en: 'Avionics & RF Telemetry' },
        subtitle: { tr: 'Özgün PCB, Yedekli Güç & Uzun Menzil Link', en: 'Custom PCB, Redundant Power & Long-Range RF' },
        description: {
          tr: 'Altium Designer ile tasarlanan 4 katmanlı akıllı güç dağıtım kartları (PDB), CAN-Bus tabanlı sensör ağı ve gerçek zamanlı şifreli telemetri yer kontrol istasyonu (YKI) mimarisi.',
          en: '4-layer smart power distribution PCBs designed in Altium, UAVCAN/DroneCAN sensor buses, and encrypted dual-band long-range ground control station telemetry.',
        },
        tags: ['Altium PCB', 'DroneCAN', '900MHz RF', 'RTK GNSS', 'Çift Yedekli Güç'],
        metrics: [
          { label: { tr: 'Telemetri Gecikmesi', en: 'Link Latency' }, value: '24 ms' },
          { label: { tr: 'Güç Hattı Yedekliliği', en: 'Power Redundancy' }, value: 'Dual-Rail' },
        ],
      },
      {
        id: 'vision',
        code: 'ENG-04 // VISION & AI',
        icon: 'eye',
        accent: 'cyan',
        spanClass: 'lg:col-span-7',
        title: { tr: 'Görüntü İşleme & Yapay Zeka', en: 'Computer Vision & Edge AI' },
        subtitle: { tr: 'Gerçek Zamanlı Nesne Tespiti & Görsel Kilitlenme', en: 'Real-Time Object Detection & Visual Lock' },
        description: {
          tr: 'NVIDIA Jetson Orin Nano üzerinde TensorRT ile hızlandırılmış derin öğrenme modelleri; hareketli hedeflerin takibi, otonom iniş pedi tanıma, termal anomali analizi ve GPS’siz görsel navigasyon sağlar.',
          en: 'TensorRT-accelerated deep neural networks running on NVIDIA Jetson Orin Nano enable moving target tracking, landing pad recognition, thermal anomaly detection, and visual odometry.',
        },
        tags: ['Jetson Orin Nano', 'TensorRT', 'YOLOv11', 'OpenCV / CUDA', 'Visual SLAM'],
        metrics: [
          { label: { tr: 'Çıkarım Hızı', en: 'Inference Rate' }, value: '60+ FPS' },
          { label: { tr: 'Hedef Doğruluğu (mAP)', en: 'Detection mAP' }, value: '94.6%' },
        ],
      },
    ] as TechDomain[],
  },

  teamSection: {
    eyebrow: { tr: '04 // KADROMUZ', en: '04 // THE CREW' },
    title: { tr: 'Yelbörü Mühendislik Ekibi', en: 'The Yelbörü Engineering Crew' },
    subtitle: {
      tr: 'Uçak, uzay, elektronik ve bilgisayar mühendisliği disiplinlerinden bir araya gelen tutkulu alt takımlarımız.',
      en: 'Passionate aerospace, electronics, mechanical, and software engineers united by autonomous flight.',
    },
    departments: [
      { key: 'all' as DepartmentKey, label: { tr: 'Tümü', en: 'All' } },
      { key: 'mechanical' as DepartmentKey, label: { tr: 'Mekanik', en: 'Mechanical' } },
      { key: 'avionics' as DepartmentKey, label: { tr: 'Aviyonik', en: 'Avionics' } },
      { key: 'software' as DepartmentKey, label: { tr: 'Yazılım', en: 'Software' } },
      { key: 'management' as DepartmentKey, label: { tr: 'Yönetim & Sponsorluk', en: 'Management & Sponsors' } },
    ],
    members: [
      {
        id: 'm1',
        name: 'Kerem Alparslan',
        initials: 'KA',
        callsign: 'LEAD-01',
        department: 'management',
        role: { tr: 'Takım Kaptanı & Sistem Mühendisi', en: 'Team Captain & Systems Lead' },
        specialty: { tr: 'Sistem Entegrasyonu & Uçuş Operasyonları', en: 'Systems Integration & Flight Ops' },
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
      {
        id: 'm2',
        name: 'Zeynep Karahan',
        initials: 'ZK',
        callsign: 'AERO-01',
        department: 'mechanical',
        role: { tr: 'Mekanik & Aerodinamik Lideri', en: 'Mechanical & Aero Lead' },
        specialty: { tr: 'CFD Analizi & VTOL Kanat Optimizasyonu', en: 'CFD Simulation & VTOL Wing Design' },
        linkedin: 'https://linkedin.com',
      },
      {
        id: 'm3',
        name: 'Emirhan Yılmaz',
        initials: 'EY',
        callsign: 'AVIO-01',
        department: 'avionics',
        role: { tr: 'Aviyonik Sistem Lideri', en: 'Avionics Systems Lead' },
        specialty: { tr: 'Özgün PCB Tasarımı & RF Telemetri', en: 'Custom PCB Design & RF Telemetry' },
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
      {
        id: 'm4',
        name: 'Defne Aksoy',
        initials: 'DA',
        callsign: 'GNC-01',
        department: 'software',
        role: { tr: 'Otonomi & Yapay Zeka Lideri', en: 'Autonomy & Edge-AI Lead' },
        specialty: { tr: 'ROS2, PX4 Geçiş Kontrolü & Görüntü İşleme', en: 'ROS2, PX4 Transition & Computer Vision' },
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
      {
        id: 'm5',
        name: 'Burak Demirtaş',
        initials: 'BD',
        callsign: 'COMP-02',
        department: 'mechanical',
        role: { tr: 'Kompozit & Yapısal Tasarım Mühendisi', en: 'Composites & Structures Engineer' },
        specialty: { tr: 'Karbon İnfüzyon, FEA & Tilt Mekanizması', en: 'Carbon Infusion, FEA & Tilt Mechanisms' },
        linkedin: 'https://linkedin.com',
      },
      {
        id: 'm6',
        name: 'Selin Öztürk',
        initials: 'SÖ',
        callsign: 'AVIO-02',
        department: 'avionics',
        role: { tr: 'Gömülü Donanım & Güç Mühendisi', en: 'Embedded Hardware & Power Engineer' },
        specialty: { tr: 'BMS, Yedekli Güç Dağıtımı & STM32', en: 'BMS, Redundant Power & STM32' },
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
      {
        id: 'm7',
        name: 'Arda Kılıç',
        initials: 'AK',
        callsign: 'CV-02',
        department: 'software',
        role: { tr: 'Görüntü İşleme & YKI Geliştiricisi', en: 'Computer Vision & GCS Developer' },
        specialty: { tr: 'TensorRT, Hedef Takibi & Yer Kontrol Arayüzü', en: 'TensorRT, Target Tracking & GCS UI' },
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
      },
      {
        id: 'm8',
        name: 'Elif Naz Çetin',
        initials: 'EÇ',
        callsign: 'OPS-02',
        department: 'management',
        role: { tr: 'Kurumsal İlişkiler & Sponsorluk Lideri', en: 'Corporate Relations & Sponsorship Lead' },
        specialty: { tr: 'İş Ortaklıkları, Bütçe & Yarışma Yönetimi', en: 'Partnerships, Budget & Competition Ops' },
        linkedin: 'https://linkedin.com',
      },
    ] as TeamMember[],
  },

  gallerySection: {
    eyebrow: { tr: '05 // SAHA & UÇUŞ KAYITLARI', en: '05 // FLIGHT LOGS & MEDIA' },
    title: { tr: 'Test Uçuşları & Medya Galerisi', en: 'Flight Tests & Media Gallery' },
    subtitle: {
      tr: 'Saha testlerinden yüksek irtifa telemetri kayıtları, VTOL geçiş denemeleri ve atölye üretim süreçleri.',
      en: 'High-altitude telemetry logs, VTOL transition test runs, and composite workshop milestones from the field.',
    },
    items: [
      {
        id: 'flt-042',
        flightCode: 'FLT-042 // VID',
        type: 'video',
        visualVariant: 'vtol-transition',
        title: { tr: 'V-03 Bozkurt — Tam Otonom VTOL Geçiş Testi', en: 'V-03 Bozkurt — Full Autonomous VTOL Transition' },
        description: {
          tr: '18 knot yan rüzgar altında dikey kalkıştan 24 m/s sabit kanat seyrine pürüzsüz geçiş ve otonom dönüş testi.',
          en: 'Seamless vertical hover to 24 m/s fixed-wing transition and autonomous RTL under 18-knot crosswinds.',
        },
        date: '2025-10-14',
        location: 'Hezarfen Test Sahası',
        duration: '02:48',
        altitude: '145 m AGL',
        wind: '18 kt NW',
        aircraft: 'YELBÖRÜ V-03',
      },
      {
        id: 'flt-039',
        flightCode: 'FLT-039 // VID',
        type: 'video',
        visualVariant: 'autonomous-landing',
        title: { tr: 'Q-04 Göktürk — Hareketli Hedefe Görsel İniş', en: 'Q-04 Göktürk — Visual Precision Landing' },
        description: {
          tr: 'Jetson Orin Nano üzerinde çalışan AprilTag + YOLOv11 füzyonu ile 14 cm sapma ile otonom iniş denemesi.',
          en: 'Autonomous landing achieving 14 cm CEP using onboard AprilTag + YOLOv11 vision fusion on Jetson Orin Nano.',
        },
        date: '2025-09-28',
        location: 'Kampüs İHA Pisti',
        duration: '01:36',
        altitude: '42 m AGL',
        wind: '9 kt N',
        aircraft: 'YELBÖRÜ Q-04',
      },
      {
        id: 'lab-018',
        flightCode: 'LAB-018 // IMG',
        type: 'photo',
        visualVariant: 'wind-tunnel',
        title: { tr: 'T-02 Alperen — Tilt-Rotor Aktüatör Yük Testi', en: 'T-02 Alperen — Tilt-Rotor Actuator Load Test' },
        description: {
          tr: 'Dinamik itki tezgahında 90° motor eğme geçişi sırasında tork, titreşim ve termal kararlılık doğrulaması.',
          en: 'Torque, vibration, and thermal validation across a full 90° nacelle tilt cycle on our dynamic thrust rig.',
        },
        date: '2025-09-05',
        location: 'İtki & Aero Laboratuvarı',
        altitude: 'STATIC RIG',
        wind: '28 m/s SIM',
        aircraft: 'YELBÖRÜ T-02',
      },
      {
        id: 'flt-034',
        flightCode: 'FLT-034 // IMG',
        type: 'photo',
        visualVariant: 'night-telemetry',
        title: { tr: 'Gece Telemetri & Termal Gimbal Kalibrasyonu', en: 'Night Telemetry & Thermal Gimbal Calibration' },
        description: {
          tr: 'Düşük ışık koşullarında termal kamera hedef kilidi ve 15 km uzun menzil RF link bütçesi ölçümü.',
          en: 'Low-light thermal target lock verification and 15 km long-range RF link budget field characterization.',
        },
        date: '2025-08-19',
        location: 'Çatalca Açık Saha',
        altitude: '180 m AGL',
        wind: '6 kt E',
        aircraft: 'YELBÖRÜ V-03',
      },
      {
        id: 'fab-011',
        flightCode: 'FAB-011 // IMG',
        type: 'photo',
        visualVariant: 'composite-layup',
        title: { tr: 'Karbon Fiber Monokok Gövde Vakum İnfüzyonu', en: 'Carbon Fiber Monocoque Vacuum Infusion' },
        description: {
          tr: '200 gsm 3K twill karbon kumaş ve aramid petek çekirdek kullanılarak üretilen V-03 ana kanat kalıp çıkışı.',
          en: 'Demolding of the V-03 main wing fabricated with 200 gsm 3K twill carbon and aramid honeycomb core.',
        },
        date: '2025-07-11',
        location: 'Yelbörü Kompozit Atölyesi',
        altitude: 'WORKSHOP',
        wind: '-0.95 bar VAC',
        aircraft: 'YELBÖRÜ V-03',
      },
      {
        id: 'flt-029',
        flightCode: 'FLT-029 // VID',
        type: 'video',
        visualVariant: 'formation-flight',
        title: { tr: 'Çift Araçlı Senkronize Görev & YKI Testi', en: 'Dual-Aircraft Synchronized GCS Mission' },
        description: {
          tr: 'Tek yer kontrol istasyonu üzerinden iki ayrı İHA’nın eşzamanlı otonom görev icrası ve çarpışma önleme testi.',
          en: 'Simultaneous dual-UAV autonomous mission execution and deconfliction from a unified Ground Control Station.',
        },
        date: '2025-06-22',
        location: 'Hezarfen Test Sahası',
        duration: '03:12',
        altitude: '110 m AGL',
        wind: '12 kt SW',
        aircraft: 'V-03 & Q-04',
      },
    ] as MediaGalleryItem[],
  },

  sponsorsSection: {
    eyebrow: { tr: '06 // SPONSORLAR & İŞ ORTAKLARI', en: '06 // SPONSORS & PARTNERS' },
    title: { tr: 'Geleceğin Havacılığına Güç Verenler', en: 'Powering the Future of Autonomy' },
    subtitle: {
      tr: 'Ar-Ge süreçlerimizi, kompozit üretimimizi ve uluslararası yarışma yolculuğumuzu destekleyen değerli teknoloji ortaklarımız.',
      en: 'Visionary industry partners accelerating our composite fabrication, avionics R&D, and international competition missions.',
    },
    tiers: {
      main: { tr: 'ANA SPONSORLAR', en: 'TITLE SPONSORS' },
      gold: { tr: 'ALTIN SPONSORLAR', en: 'GOLD SPONSORS' },
      supporter: { tr: 'TEKNOLOJİ & ÜRÜN DESTEKÇİLERİ', en: 'TECHNOLOGY & IN-KIND SUPPORTERS' },
    },
    sponsors: [
      {
        id: 'sp-1',
        name: 'TÜRKSAV HAVACILIK',
        shortMark: 'TSV',
        tier: 'main',
        sector: { tr: 'Havacılık & Savunma Sistemleri', en: 'Aerospace & Defense Systems' },
        url: '#iletisim',
      },
      {
        id: 'sp-2',
        name: 'ALTAY KOMPOZİT',
        shortMark: 'ALT',
        tier: 'main',
        sector: { tr: 'İleri Karbon Malzemeler', en: 'Advanced Carbon Materials' },
        url: '#iletisim',
      },
      {
        id: 'sp-3',
        name: 'KUTUP AVİYONİK',
        shortMark: 'KTP',
        tier: 'gold',
        sector: { tr: 'Gömülü Sistem & PCB Üretimi', en: 'Embedded & PCB Fabrication' },
        url: '#iletisim',
      },
      {
        id: 'sp-4',
        name: 'ANADOLU İTKİ TEKNOLOJİLERİ',
        shortMark: 'AİT',
        tier: 'gold',
        sector: { tr: 'Elektrikli Motor & ESC', en: 'Electric Propulsion & ESC' },
        url: '#iletisim',
      },
      {
        id: 'sp-5',
        name: 'RADARNET RF',
        shortMark: 'RNF',
        tier: 'gold',
        sector: { tr: 'Haberleşme & Anten Sistemleri', en: 'RF & Antenna Systems' },
        url: '#iletisim',
      },
      {
        id: 'sp-6',
        name: 'MİKRO CNC',
        shortMark: 'MCN',
        tier: 'supporter',
        sector: { tr: 'Hassas Talaşlı İmalat', en: 'Precision CNC Machining' },
        url: '#iletisim',
      },
      {
        id: 'sp-7',
        name: 'VOLTCELL ENERJİ',
        shortMark: 'VCE',
        tier: 'supporter',
        sector: { tr: 'Yüksek Yoğunluklu Batarya', en: 'High-Density Battery Packs' },
        url: '#iletisim',
      },
      {
        id: 'sp-8',
        name: 'SİMÜLA LABS',
        shortMark: 'SML',
        tier: 'supporter',
        sector: { tr: 'Mühendislik Yazılım Lisansı', en: 'CAE Simulation Licensing' },
        url: '#iletisim',
      },
      {
        id: 'sp-9',
        name: 'SKYPRINT 3D',
        shortMark: 'SKP',
        tier: 'supporter',
        sector: { tr: 'Karbon Takviyeli Eklemeli İmalat', en: 'Carbon-Reinforced Additive Mfg' },
        url: '#iletisim',
      },
    ] as SponsorItem[],
    deckCta: {
      badge: { tr: '2025 – 2026 SEZONU SPONSORLUK DOSYASI', en: '2025 – 2026 SPONSORSHIP PROSPECTUS' },
      title: { tr: 'Yelbörü’nün Bir Sonraki Uçuşuna Ortak Olun', en: 'Partner With Yelbörü’s Next Flight' },
      description: {
        tr: 'Nakit destek, donanım/malzeme sponsorluğu veya mühendislik mentorluğu ile genç havacılık mühendislerine katkı sağlayın; markanızı ulusal ve uluslararası pistlerde gökyüzüne taşıyın.',
        en: 'Support young aerospace engineers through financial backing, hardware/material grants, or mentorship—and put your brand airborne at national and global competitions.',
      },
      benefits: [
        { tr: 'Hava aracı gövdesi & ekip formalarında yüksek görünürlüklü logo', en: 'High-visibility logo placement on airframes & team gear' },
        { tr: 'Doğrudan genç yetenek & stajyer mühendis havuzuna erişim', en: 'Direct access to top aerospace & AI engineering talent' },
        { tr: 'Teknik Ar-Ge raporları ve özel saha demo uçuşu daveti', en: 'Technical R&D briefings & private field demo flight invites' },
      ],
      downloadButton: { tr: 'Sponsorluk Dosyasını İndir', en: 'Download Sponsorship Deck' },
      contactButton: { tr: 'Sponsorluk Görüşmesi Planla', en: 'Schedule Partner Call' },
    },
  },

  contactSection: {
    eyebrow: { tr: '07 // İLETİŞİM & KATILIM', en: '07 // CONTACT & JOIN' },
    title: { tr: 'Yelbörü ile Bağlantıya Geçin', en: 'Connect With Yelbörü' },
    subtitle: {
      tr: 'Sponsorluk teklifleri, yeni dönem ekip başvuruları veya teknik iş birlikleri için doğrudan mesaj gönderebilirsiniz.',
      en: 'Reach out directly for sponsorship partnerships, seasonal team recruitment, or technical collaborations.',
    },
    info: {
      email: 'iletisim@yelboru.org',
      sponsorEmail: 'sponsorluk@yelboru.org',
      shortLocation: {
        tr: 'İstanbul, Türkiye',
        en: 'Istanbul, Türkiye',
      },
      location: {
        tr: 'Uçak ve Uzay Bilimleri Fakültesi, İHA & Kompozit Atölyesi B-14, İstanbul / Türkiye',
        en: 'Faculty of Aeronautics & Astronautics, UAV & Composites Lab B-14, Istanbul / Türkiye',
      },
      university: {
        tr: 'Yelbörü Havacılık ve Otonom Sistemler Topluluğu',
        en: 'Yelbörü Aerospace & Autonomous Systems Society',
      },
      coordinates: '41.1055° N, 29.0252° E',
    },
    subjects: [
      { value: 'sponsorship', label: { tr: 'Sponsorluk', en: 'Sponsorship' } },
      { value: 'membership', label: { tr: 'Üyelik / Ekibe Katılım', en: 'Membership / Join Team' } },
      { value: 'general', label: { tr: 'Genel / Teknik İletişim', en: 'General / Technical Inquiry' } },
    ],
    socials: [
      { name: 'LinkedIn', handle: '@yelboru-uav', url: 'https://linkedin.com' },
      { name: 'GitHub', handle: 'github.com/yelboru', url: 'https://github.com' },
      { name: 'Instagram', handle: '@yelboruuav', url: 'https://instagram.com' },
      { name: 'YouTube', handle: 'Yelbörü Aviation', url: 'https://youtube.com' },
    ],
  },

  footer: {
    copyright: {
      tr: '© 2026 YELBÖRÜ İHA & VTOL Havacılık Ekibi. Tüm hakları saklıdır.',
      en: '© 2026 YELBÖRÜ UAV & VTOL Aerospace Team. All rights reserved.',
    },
    tagline: {
      tr: 'Türkiye’nin Otonom Gökyüzü Mühendisleri',
      en: 'Autonomous Aerospace Engineering from Türkiye',
    },
  },
};
