import React, { useEffect, useState } from 'react';
import { Send, ArrowUpRight, ArrowUp, Check } from 'lucide-react';
import { siteData, t } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';
import { YelboruLogo } from './YelboruLogo';
import { ScrollReveal } from './ScrollReveal';

export type ContactSubjectValue = 'sponsorship' | 'membership' | 'general';

interface ContactFooterProps {
  preselectedSubject: ContactSubjectValue;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ preselectedSubject }) => {
  const { lang } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<ContactSubjectValue>(preselectedSubject);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubject(preselectedSubject);
  }, [preselectedSubject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="border-t border-[#d9d0bf]/15 bg-[#000000]">
      <section id="iletisim" className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              {/* Left Column: Pared Down to 3 Essentials (Primary Email, Short Location, Socials) */}
              <div className="flex flex-col justify-between lg:col-span-5">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50">
                    {lang === 'tr' ? 'İletişim' : 'Contact'}
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-[#ece6db] sm:text-4xl lg:text-[44px]">
                    {t(siteData.contactSection.title, lang)}
                  </h2>
                  <p className="mt-5 max-w-[44ch] text-[15px] leading-[1.7] text-[#d9d0bf]/70">
                    {t(siteData.contactSection.subtitle, lang)}
                  </p>

                  <dl className="mt-10 divide-y divide-[#d9d0bf]/15 border-y border-[#d9d0bf]/15">
                    <div className="py-5">
                      <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/45">
                        {lang === 'tr' ? 'E-Posta' : 'Email'}
                      </dt>
                      <dd className="mt-2">
                        <a
                          href={`mailto:${siteData.contactSection.info.email}`}
                          className="link-hairline inline-block pb-0.5 text-sm font-medium text-[#ece6db] transition-opacity duration-200 hover:opacity-85"
                        >
                          {siteData.contactSection.info.email}
                        </a>
                      </dd>
                    </div>

                    <div className="py-5">
                      <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/45">
                        {lang === 'tr' ? 'Konum' : 'Location'}
                      </dt>
                      <dd className="mt-2 text-sm text-[#d9d0bf]/80">
                        {t(siteData.contactSection.info.shortLocation, lang)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                  {siteData.contactSection.socials.map((soc) => (
                    <a
                      key={soc.name}
                      href={soc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group link-hairline inline-flex items-center gap-1 pb-0.5 text-xs font-medium text-[#d9d0bf]/60 transition-colors duration-200 hover:text-[#ece6db]"
                    >
                      <span>{soc.name}</span>
                      <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Column: Clean Minimalist Underline Form */}
              <div className="lg:col-span-7 lg:border-l lg:border-[#d9d0bf]/15 lg:pl-16">
                {submitted ? (
                  <div className="flex h-full flex-col justify-center py-12">
                    <div className="flex h-10 w-10 items-center justify-center border border-[#d9d0bf]/35 text-[#ece6db]">
                      <Check className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-medium text-[#ece6db]">
                      {lang === 'tr' ? 'Mesajınız İletildi' : 'Message Received'}
                    </h3>
                    <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.7] text-[#d9d0bf]/70">
                      {lang === 'tr'
                        ? `Teşekkürler ${name}. Talebiniz ilgili birime yönlendirildi; en kısa sürede ${email} üzerinden dönüş yapacağız.`
                        : `Thank you ${name}. Your inquiry has been routed to our team; we will reply shortly via ${email}.`}
                    </p>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="mt-8 w-fit rounded-none border border-[#d9d0bf]/35 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-[#ece6db] transition-colors duration-200 hover:bg-[#d9d0bf] hover:text-[#000000] cursor-pointer"
                    >
                      {lang === 'tr' ? 'Yeni Mesaj' : 'New Message'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid gap-8 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50"
                        >
                          {lang === 'tr' ? 'Ad Soyad *' : 'Full Name *'}
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={lang === 'tr' ? 'Ahmet Yılmaz' : 'Alex Morgan'}
                          className="mt-2 w-full border-b border-[#d9d0bf]/25 bg-transparent py-3 text-[15px] text-[#ece6db] placeholder-[#d9d0bf]/30 transition-colors focus:border-[#d9d0bf] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50"
                        >
                          {lang === 'tr' ? 'E-Posta *' : 'Email *'}
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ornek@kurum.com"
                          className="mt-2 w-full border-b border-[#d9d0bf]/25 bg-transparent py-3 text-[15px] text-[#ece6db] placeholder-[#d9d0bf]/30 transition-colors focus:border-[#d9d0bf] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50">
                        {lang === 'tr' ? 'Konu *' : 'Subject *'}
                      </span>
                      <div className="mt-3 grid grid-cols-1 gap-px border border-[#d9d0bf]/20 bg-[#d9d0bf]/20 sm:grid-cols-3">
                        {siteData.contactSection.subjects.map((opt) => {
                          const selected = subject === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setSubject(opt.value as ContactSubjectValue)}
                              className={`px-4 py-3 text-xs font-medium transition-colors duration-200 cursor-pointer ${
                                selected
                                  ? 'bg-[#d9d0bf] text-[#000000] font-semibold'
                                  : 'bg-[#000000] text-[#d9d0bf]/65 hover:text-[#ece6db]'
                              }`}
                            >
                              {t(opt.label, lang)}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-[11px] font-medium uppercase tracking-[0.2em] text-[#d9d0bf]/50"
                      >
                        {lang === 'tr' ? 'Mesajınız *' : 'Message *'}
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={
                          lang === 'tr'
                            ? 'Sponsorluk detayları, katılmak istediğiniz alt birim veya teknik sorunuz...'
                            : 'Sponsorship details, target sub-team, or technical inquiry...'
                        }
                        className="mt-2 w-full resize-none border-b border-[#d9d0bf]/25 bg-transparent py-3 text-[15px] text-[#ece6db] placeholder-[#d9d0bf]/30 transition-colors focus:border-[#d9d0bf] focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="group inline-flex w-full items-center justify-center gap-2.5 rounded-none bg-[#d9d0bf] px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#000000] transition-colors duration-200 hover:bg-[#ece6db] cursor-pointer sm:w-auto"
                      >
                        <span>{lang === 'tr' ? 'Mesajı Gönder' : 'Send Message'}</span>
                        <Send className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Editorial Footer + Monumental Closing Brand Signature */}
      <footer className="overflow-hidden border-t border-[#d9d0bf]/15 bg-[#000000] pt-14 pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <YelboruLogo showSubtext />

            <nav className="flex flex-wrap gap-x-7 gap-y-2 text-xs text-[#d9d0bf]/55">
              {siteData.navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="link-hairline pb-0.5 transition-colors duration-200 hover:text-[#ece6db]"
                >
                  {t(item.label, lang)}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[#d9d0bf]/12 pt-6 text-xs text-[#d9d0bf]/45 sm:flex-row sm:items-center">
            <span>{t(siteData.footer.copyright, lang)}</span>

            <div className="flex items-center gap-6">
              <span className="hidden sm:inline">{t(siteData.footer.tagline, lang)}</span>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group link-hairline inline-flex items-center gap-1.5 pb-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#d9d0bf]/65 transition-colors duration-200 hover:text-[#ece6db] cursor-pointer"
              >
                <span>{lang === 'tr' ? 'Yukarı Çık' : 'Back to Top'}</span>
                <ArrowUp className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-[2px]" />
              </button>
            </div>
          </div>

          {/* Monumental Low-Opacity Brand Wordmark */}
          <div aria-hidden="true" className="mt-12 select-none text-center sm:mt-16">
            <span className="block font-display text-[15vw] font-medium leading-[0.82] tracking-[0.12em] text-[#d9d0bf]/[0.06] sm:text-[13vw] lg:text-[148px]">
              YELBÖRÜ
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
