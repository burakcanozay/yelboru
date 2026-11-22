YELBÖRÜ MEDYA KLASÖR REHBERİ
=============================

Gerçek fotoğraf, 3D/CAD render, video ve sponsor logolarınızı aşağıdaki
klasörlere bırakıp `src/data/siteData.ts` içindeki ilgili alanlara yolunu yazın:

1. hero/      -> Hero arka plan fotoğrafı veya sessiz loop MP4 videosu
                 Örn: './images/hero/v03-studio.jpg' veya './images/hero/v03-flight.mp4'
                 Öneri: 1920x1080+, koyu arka plan, düşük dosya boyutu (< 4 MB video)

2. aircraft/  -> VTOL & drone stüdyo render'ları ve galeri fotoğrafları
                 Örn: './images/aircraft/v03-bozkurt-render.png'
                 Öneri: 16:9 veya 16:10, siyah/koyu stüdyo arka planlı SolidWorks/Blender render

3. team/      -> Ekip üyesi portre fotoğrafları
                 Örn: './images/team/kerem-alparslan.jpg'
                 Öneri: 3:4 dikey kadraj (ör. 900x1200 px), sade arka plan

4. gallery/   -> Test uçuşları kapak görselleri ve MP4 videoları
                 Örn: './images/gallery/flt-042-thumb.jpg' ve './images/gallery/flt-042.mp4'
                 Not: YouTube video linki de doğrudan `mediaUrl` alanına yazılabilir.

5. sponsors/  -> Sponsor marka logoları (şeffaf arka planlı SVG veya PNG)
                 Örn: './images/sponsors/turksav.svg'
                 Not: Renkli/siyah logolar sitede otomatik olarak monokrom #d9d0bf tonuna uyarlanır.
