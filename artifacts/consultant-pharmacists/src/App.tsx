import { type FormEvent, type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseMedical,
  Check,
  ChevronRight,
  FileSearch,
  Gavel,
  Mail,
  Menu,
  PenLine,
  Phone,
  Presentation,
  Quote,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [topic, setTopic] = useState('Clinical consultation');

  const closeMenu = () => setMenuOpen(false);
  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const organization = String(formData.get('organization') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const subject = `Consultation inquiry: ${topic}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      organization ? `Organization: ${organization}` : '',
      `Area of interest: ${topic}`,
      '',
      message,
    ].filter(Boolean).join('\n');
    window.location.href = `mailto:consultantpharmacistsofamerica@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#f4f1e8] text-[#26343b]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#f4f1e8] focus:px-4 focus:py-3">
        Skip to content
      </a>
      <div className="bg-[#203039] px-5 py-2 text-center text-[11px] tracking-[0.08em] text-[#dfe4dc] sm:text-xs">
        Independent clinical pharmacy &amp; nutrition expertise
        <span className="mx-2 hidden text-[#a9c8c2] sm:inline">/</span>
        <a className="hidden underline decoration-[#789690] underline-offset-4 transition hover:text-white sm:inline" href="tel:13526423005" data-testid="link-top-phone">352-642-3005</a>
      </div>

      <header className="relative z-30 border-b border-[#ded9cf] bg-[#f4f1e8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-4 md:px-9 lg:py-5">
          <a href="#home" className="group flex items-center gap-3" aria-label="Consultant Pharmacists of America home" data-testid="link-brand-home">
            <span className="flex h-10 w-10 items-center justify-center border border-[#326c68]/40 text-[#326c68] transition group-hover:bg-[#326c68] group-hover:text-[#f4f1e8]">
              <span className="serif text-[24px] leading-none">C</span>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="serif text-[18px] tracking-[-0.035em] sm:text-[20px]">Consultant Pharmacists</span>
              <span className="mt-1 text-[9px] font-semibold tracking-[0.2em] text-[#6b7475] sm:text-[10px]">OF AMERICA, INC.</span>
            </span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            <a href="#book" className="nav-link text-[13px] text-[#535f62]" data-testid="link-nav-book">The guide</a>
            <a href="#expertise" className="nav-link text-[13px] text-[#535f62]" data-testid="link-nav-expertise">Services</a>
            <a href="#who-we-serve" className="nav-link text-[13px] text-[#535f62]" data-testid="link-nav-sectors">Who we serve</a>
            <a href="#about" className="nav-link text-[13px] text-[#535f62]" data-testid="link-nav-about">About Dr. Baumgartner</a>
            <a href="#resources" className="nav-link text-[13px] text-[#535f62]" data-testid="link-nav-resources">Free resource</a>
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            <a href="mailto:consultantpharmacistsofamerica@gmail.com" aria-label="Email Consultant Pharmacists of America" className="text-[#326c68] transition hover:text-[#203039]" data-testid="link-header-email"><Mail size={18} strokeWidth={1.7} /></a>
            <a href="https://www.payloadz.com/go/?id=1554165" target="_blank" rel="noopener noreferrer" className="cta-button inline-flex items-center gap-2 bg-[#326c68] px-5 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#f4f1e8] hover:bg-[#203039]" data-testid="link-header-buy-guide">
              Buy the guide · $29.95 <ArrowUpRight size={15} />
            </a>
          </div>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center border border-[#d6d1c7] text-[#203039] lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile navigation" className="absolute inset-x-0 top-full border-b border-[#ded9cf] bg-[#f4f1e8] px-6 py-5 shadow-lg lg:hidden">
            <div className="mx-auto flex max-w-[1320px] flex-col">
              {[
                ['The micronutrition guide', '#book'],
                ['Consulting services', '#expertise'],
                ['Who we serve', '#who-we-serve'],
                ['About Dr. Baumgartner', '#about'],
                ['Free resource', '#resources'],
                ['Start a conversation', '#contact'],
              ].map(([label, href]) => (
                <a key={href} href={href} onClick={closeMenu} className="border-b border-[#ded9cf] py-3.5 text-sm" data-testid={`link-mobile-${href.slice(1)}`}>{label}</a>
              ))}
              <a href="tel:13526423005" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#326c68]" data-testid="link-mobile-phone"><Phone size={15} /> 352-642-3005</a>
            </div>
          </nav>
        )}
      </header>

      <main id="main">
        <section id="home" className="relative isolate bg-[#e8e5dc]">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_30%,rgba(189,205,195,.3),transparent_45%),linear-gradient(115deg,#e8e5dc,#f4f1e8_58%,#e6e3da)]" />
          <div id="book" className="mx-auto grid max-w-[1320px] items-center gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:min-h-[605px] lg:grid-cols-[1fr_.86fr] lg:gap-14 lg:px-12 lg:py-20">
            <div className="order-1 flex flex-col justify-center lg:order-1 lg:py-4">
              <p className="eyebrow reveal text-[#326c68]">Featured clinical reference</p>
              <h1 className="serif reveal reveal-delay-1 mt-5 max-w-[760px] text-[clamp(2.9rem,6.3vw,5.65rem)] leading-[0.97] tracking-[-0.047em] text-[#203039]">
                The Clinical Guide to <em className="font-normal text-[#326c68]">Parenteral Micronutrition</em>
                {" "}<span className="serif mt-4 block text-[clamp(1.1rem,2vw,1.45rem)] font-normal leading-[1.3] tracking-normal text-[#566164]">(Enhanced Third Edition-1,055 pages)</span>
              </h1>
              <p className="reveal reveal-delay-2 mt-5 text-[15px] font-medium text-[#566164]">
                Edited by Dr. Thomas G. Baumgartner
              </p>
              <p className="reveal reveal-delay-2 mt-4 max-w-[610px] text-[14px] leading-[1.8] text-[#626d6f]">
                A clinical reference focused on parenteral micronutrition, from Consultant Pharmacists of America, Inc.
              </p>
              <div className="reveal reveal-delay-3 mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#596567]">
                <span>Listed price <strong className="text-[#26343b]">$29.95</strong></span>
              </div>
              <div className="reveal reveal-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="https://www.payloadz.com/go/?id=1554165" target="_blank" rel="noopener noreferrer" className="cta-button inline-flex min-h-[53px] items-center justify-center gap-3 bg-[#326c68] px-6 text-sm font-semibold text-[#f6f3eb] hover:bg-[#203039]" data-testid="link-hero-buy-guide">
                  Purchase the guide · $29.95 <ArrowUpRight size={17} />
                </a>
                <a href="#expertise" className="inline-flex min-h-[52px] items-center justify-center gap-2 px-3 text-sm font-medium text-[#326c68] transition hover:text-[#203039]" data-testid="link-hero-expertise">
                  Explore consulting services <ArrowDown size={15} />
                </a>
              </div>
              <p className="mt-5 text-[11px] text-[#7a807d]">Purchase securely through the official Payloadz link.</p>
            </div>
            <div className="order-2 flex min-h-[265px] items-center justify-center gap-8 border border-[#d5d0c5] bg-[#f0ede5]/65 px-5 py-8 sm:min-h-[310px] sm:gap-10 lg:order-2 lg:min-h-[425px] lg:px-8">
              <div className="relative flex shrink-0 items-center justify-center">
                <span className="absolute -inset-5 border border-[#c8c2b5]" aria-hidden="true" />
                <img
                  src={`${import.meta.env.BASE_URL}parenteral-micronutrition-cover.jpg`}
                  alt="Cover of The Clinical Guide to Parenteral Micronutrition (Enhanced Third Edition-1,055 pages)"
                  width="162"
                  height="215"
                  className="relative h-[215px] w-[162px] object-contain shadow-[8px_12px_24px_rgba(32,48,57,.18)]"
                  data-testid="img-guide-cover"
                />
              </div>
              <div className="hidden max-w-[160px] sm:block">
                <p className="eyebrow text-[#326c68]">Clinical reference</p>
                <p className="serif mt-4 text-[24px] leading-[1.15] text-[#26343b]">Parenteral micronutrition</p>
                <p className="mt-3 text-[12px] leading-[1.7] text-[#687274]">Edited by Dr. Thomas G. Baumgartner, PharmD, MEd</p>
                <div className="mt-5 h-px w-10 bg-[#326c68]" />
              </div>
            </div>
          </div>
          <div className="border-t border-[#d5d0c5]">
            <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-6 py-4 text-[11px] leading-relaxed text-[#687274] sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12">
              <span>Edited by Dr. Thomas G. Baumgartner, PharmD, MEd</span>
              <a href="#expertise" className="inline-flex items-center gap-2 font-semibold text-[#326c68] hover:text-[#203039]" data-testid="link-book-to-services">Looking for expert consultation? Explore services <ArrowRight size={13} /></a>
            </div>
          </div>
        </section>

        <section aria-label="Practice credentials" className="border-y border-[#ded9cf] bg-[#eeece4]">
          <div className="mx-auto grid max-w-[1320px] grid-cols-2 divide-x divide-y divide-[#d7d2c8] px-5 sm:grid-cols-4 sm:divide-y-0 lg:px-9">
            {[
              ['01', 'PharmD · MEd', 'Advanced clinical training'],
              ['02', '100+ publications', 'Clinical and professional writing'],
              ['03', 'Four UF colleges', 'Former clinical professor'],
              ['04', 'Board certified', 'Nutrition support pharmacy'],
            ].map(([num, title, sub]) => (
              <div key={num} className="flex min-h-[99px] items-center gap-4 px-3 py-5 sm:px-5 lg:px-7">
                <span className="serif text-[20px] text-[#9b927f]">{num}</span>
                <div>
                  <p className="text-[13px] font-semibold text-[#26343b]" data-testid={`text-credential-${num}`}>{title}</p>
                  <p className="mt-1 text-[11px] leading-[1.4] text-[#6b7475]">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="expertise" className="scroll-mt-20 bg-[#f4f1e8] py-20 sm:py-28">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
              <div>
                <p className="eyebrow text-[#326c68]">How we help</p>
                <h2 className="serif mt-5 max-w-[420px] text-[clamp(2.6rem,5vw,4.15rem)] leading-[1.02] tracking-[-0.04em]">Expertise that meets the question.</h2>
                <p className="mt-5 max-w-[390px] text-[14px] leading-[1.8] text-[#667073]">
                  One focused practice. Direct access to senior clinical judgment across the medication-use and nutrition continuum.
                </p>
              </div>
              <div className="grid gap-px bg-[#d8d3c8] sm:grid-cols-2">
                {[
                  { icon: FileSearch, num: '01', title: 'Chart review & analysis', copy: 'Independent review of clinical records and medication-related questions, with findings organized for the decision at hand.' },
                  { icon: Gavel, num: '02', title: 'Legal & expert consultation', copy: 'Clinical pharmacy and nutrition perspective for legal teams evaluating matters that call for specialized expertise.' },
                  { icon: BriefcaseMedical, num: '03', title: 'General consultation', copy: 'Focused advisory support for healthcare organizations and professionals navigating complex clinical pharmacy questions.' },
                  { icon: PenLine, num: '04', title: 'Writing, editing & publishing', copy: 'Experienced clinical writing and editorial leadership for healthcare content, publications, and educational materials.' },
                  { icon: Presentation, num: '05', title: 'Custom client webinars', copy: 'Educational programs developed around your organization’s audience, subject matter, and learning needs.' },
                  { icon: BookOpen, num: '06', title: 'Clinical nutrition expertise', copy: 'Specialist perspective on parenteral products, nutrition support, and the clinical details surrounding their use.' },
                ].map(({ icon: Icon, num, title, copy }) => (
                  <article key={num} className="service-card bg-[#eeece4] p-6 sm:p-7 lg:p-8" data-testid={`card-service-${num}`}>
                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center border border-[#b8c8c2] text-[#326c68]"><Icon size={18} strokeWidth={1.5} /></span>
                      <span className="serif text-[18px] text-[#a29b8c]">{num}</span>
                    </div>
                    <h3 className="serif mt-7 text-[25px] leading-tight tracking-[-0.02em]">{title}</h3>
                    <p className="mt-3 text-[13px] leading-[1.75] text-[#626d6f]">{copy}</p>
                    <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.04em] text-[#326c68] transition hover:gap-3" data-testid={`link-service-inquire-${num}`}>
                      Discuss this service <ChevronRight size={14} />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="who-we-serve" className="relative scroll-mt-20 bg-[#203039] text-[#f4f1e8]">
          <div className="paper-grain absolute inset-0" />
          <div className="relative mx-auto grid max-w-[1320px] gap-12 px-6 py-20 sm:px-10 sm:py-24 lg:grid-cols-[.82fr_1.18fr] lg:gap-20 lg:px-12">
            <div>
              <p className="eyebrow text-[#b4d0c8]">Where insight is needed</p>
              <h2 className="serif mt-5 max-w-[430px] text-[clamp(2.75rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.04em]">Built for the realities of care.</h2>
              <p className="mt-5 max-w-[410px] text-[14px] leading-[1.8] text-[#c5ccca]">
                We work with people and organizations whose decisions touch medication use, nutrition support, and patient care.
              </p>
              <a href="#contact" className="cta-button mt-8 inline-flex min-h-[49px] items-center gap-3 border border-[#94b1a9] px-5 text-sm font-medium text-[#edf1ea] hover:bg-[#f4f1e8] hover:text-[#203039]" data-testid="link-sectors-contact">
                Talk through a specific need <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {[
                'Hospitals & health systems',
                'Ambulatory & surgical centers',
                'Assisted living & long-term care',
                'Correctional healthcare',
                'Dialysis & ESRD care',
                'Home health & hospice',
                'Pharmacies & care organizations',
                'Private patients & professionals',
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-4 border-b border-white/15 py-[18px]" data-testid={`text-sector-${index + 1}`}>
                  <span className="h-[5px] w-[5px] shrink-0 rotate-45 bg-[#a8c8be]" />
                  <span className="text-[14px] text-[#e4e7e1]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-20 bg-[#e8e5dc]">
          <div className="mx-auto grid max-w-[1320px] lg:grid-cols-[.94fr_1.06fr]">
            <div className="relative min-h-[400px] overflow-hidden bg-[#b5b9ad] lg:min-h-[590px]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_25%,rgba(248,244,231,.58),transparent_37%),linear-gradient(145deg,#7a8a81,#344a4a_58%,#24343b)]" />
              <div className="absolute inset-[9%] border border-white/25" />
              <div className="absolute left-[14%] top-[17%] text-[#f3f0e7]">
                <p className="eyebrow text-[#d3e2d8]">Clinical perspective, shaped over time</p>
              </div>
              <div className="absolute bottom-[12%] left-[14%] right-[12%]">
                <span className="serif block max-w-[470px] text-[clamp(2.1rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.035em] text-[#f3f0e7]">
                  “Good analysis starts with the details others might miss.”
                </span>
                <span className="mt-5 block text-[11px] font-semibold uppercase tracking-[0.17em] text-[#d5e0d8]">An independent clinical lens</span>
              </div>
              <span className="absolute bottom-6 right-7 serif text-[18px] italic text-white/65">CP · America</span>
            </div>
            <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16 xl:px-20">
              <p className="eyebrow text-[#326c68]">The expert behind the practice</p>
              <h2 className="serif mt-5 text-[clamp(2.7rem,5vw,4.4rem)] leading-[1] tracking-[-0.045em]">Thomas G. Baumgartner, <span className="italic text-[#326c68]">PharmD, MEd</span></h2>
              <p className="mt-5 text-[15px] leading-[1.8] text-[#566164]">
                A clinical pharmacist, educator, and editor whose work spans parenteral products, nutrition support, and clinical practice.
              </p>
              <div className="mt-8 space-y-5 border-t border-[#cbc6bb] pt-7">
                {[
                  ['Academic leadership', 'Former clinical professor at four University of Florida colleges: Pharmacy, Medicine, Dentistry, and Nursing.'],
                  ['Editorial experience', 'More than 100 publications, with decades of editorial leadership in healthcare publishing.'],
                  ['Specialized credentials', 'Board-certified nutrition support pharmacist; recognized with professional awards and fellowships.'],
                ].map(([title, copy]) => (
                  <div className="grid grid-cols-[22px_1fr] gap-3" key={title}>
                    <Check size={16} className="mt-1 text-[#326c68]" />
                    <p className="text-[13px] leading-[1.7] text-[#626d6f]"><strong className="font-semibold text-[#26343b]">{title}.</strong> {copy}</p>
                  </div>
                ))}
              </div>
              <div className="mt-9 border-l-2 border-[#326c68] pl-5">
                <p className="serif text-[20px] italic leading-[1.35] text-[#35474b]">“Independent expertise, grounded in the science and the clinical context.”</p>
              </div>
            </div>
          </div>
        </section>

        <section id="resources" className="scroll-mt-20 border-t border-[#ded9cf] bg-[#f4f1e8]">
          <div className="mx-auto grid max-w-[1320px] gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[.76fr_1.24fr] lg:items-center lg:px-12">
            <div>
              <p className="eyebrow text-[#326c68]">Free educational resource</p>
              <h2 className="serif mt-4 text-[clamp(2.5rem,4vw,3.7rem)] leading-[1.02] tracking-[-0.04em]">Electrolytes primer.</h2>
            </div>
            <div className="flex flex-col gap-6 border-l border-[#cfc9bd] pl-6 sm:pl-9 md:flex-row md:items-center md:justify-between">
              <div className="max-w-[510px]">
                <div className="flex items-center gap-2 text-[#326c68]"><BookOpen size={16} /><span className="eyebrow">Complimentary PDF</span></div>
                <p className="mt-4 text-[14px] leading-[1.8] text-[#626d6f]">
                  A free Electrolytes PDF is available as a secondary educational resource.
                </p>
              </div>
              <a href="https://consultantpharmacistsofamerica.com/wp-content/uploads/2022/04/final-pdf-3.31.22-free-primer-electrolytes-.pdf" target="_blank" rel="noopener noreferrer" className="cta-button inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 border border-[#326c68] px-5 text-[12px] font-semibold text-[#326c68] hover:bg-[#326c68] hover:text-[#f4f1e8]" data-testid="link-resource-electrolytes">
                Open free PDF <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#326c68] text-[#f4f1e8]">
          <div className="mx-auto grid max-w-[1320px] gap-7 px-6 py-12 sm:grid-cols-[1fr_auto] sm:items-center sm:px-10 lg:px-12">
            <div className="flex gap-4">
              <Quote className="mt-1 shrink-0 text-[#b9d1c8]" size={23} strokeWidth={1.5} />
              <p className="serif max-w-[780px] text-[22px] leading-[1.25] sm:text-[28px]">The right perspective can help make a complicated clinical question more manageable.</p>
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 text-[12px] font-semibold text-white underline decoration-white/45 underline-offset-4 hover:decoration-white" data-testid="link-quote-contact">
              Start with a conversation <ArrowRight size={15} />
            </a>
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 bg-[#e8e5dc]">
          <div className="mx-auto grid max-w-[1320px] lg:grid-cols-[.82fr_1.18fr]">
            <div className="relative overflow-hidden bg-[#203039] px-6 py-16 text-[#f4f1e8] sm:px-10 sm:py-20 lg:px-12 xl:px-16">
              <div className="paper-grain absolute inset-0" />
              <div className="relative">
                <p className="eyebrow text-[#b9d1c8]">Make an inquiry</p>
                <h2 className="serif mt-5 max-w-[440px] text-[clamp(2.9rem,5vw,4.8rem)] leading-[.98] tracking-[-0.045em]">Let’s start with the question.</h2>
                <p className="mt-6 max-w-[410px] text-[14px] leading-[1.8] text-[#cad0cc]">
                  Share what you’re working through. We’ll open a draft email with your details so you can review it before sending.
                </p>
                <div className="mt-10 space-y-5 border-t border-white/20 pt-7">
                  <a href="tel:13526423005" className="group flex items-center gap-4" data-testid="link-contact-phone">
                    <span className="flex h-10 w-10 items-center justify-center border border-white/30 text-[#b9d1c8] transition group-hover:bg-white/10"><Phone size={16} /></span>
                    <span><span className="block text-[10px] uppercase tracking-[0.16em] text-[#aebbb7]">Call</span><span className="mt-1 block text-[15px]">352-642-3005</span></span>
                  </a>
                  <a href="mailto:consultantpharmacistsofamerica@gmail.com" className="group flex items-center gap-4" data-testid="link-contact-email">
                    <span className="flex h-10 w-10 items-center justify-center border border-white/30 text-[#b9d1c8] transition group-hover:bg-white/10"><Mail size={16} /></span>
                    <span className="min-w-0"><span className="block text-[10px] uppercase tracking-[0.16em] text-[#aebbb7]">Email</span><span className="mt-1 block break-all text-[13px] sm:text-[14px]">consultantpharmacistsofamerica@gmail.com</span></span>
                  </a>
                </div>
                <p className="mt-9 text-[11px] leading-[1.7] text-[#aebbb7]">For legal, clinical, editorial, or educational inquiries. Please do not send sensitive patient information by email.</p>
              </div>
            </div>
            <div className="px-6 py-14 sm:px-10 sm:py-16 lg:px-14 xl:px-20">
              <div className="mb-8">
                <p className="eyebrow text-[#326c68]">A direct line to the practice</p>
                <h3 className="serif mt-3 text-[33px] leading-tight tracking-[-0.03em]">What would you like to discuss?</h3>
              </div>
              <form onSubmit={submitInquiry} className="space-y-5" data-testid="form-inquiry">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-[12px] font-semibold text-[#39494c]">
                    Your name <span aria-hidden="true" className="text-[#326c68]">*</span>
                    <input required name="name" autoComplete="name" className="mt-2 h-12 w-full border border-[#c9c4b9] bg-[#f4f1e8] px-3 text-[14px] font-normal text-[#26343b] placeholder:text-[#8a908c] focus:border-[#326c68] focus:outline-none" placeholder="Name" data-testid="input-inquiry-name" />
                  </label>
                  <label className="block text-[12px] font-semibold text-[#39494c]">
                    Email address <span aria-hidden="true" className="text-[#326c68]">*</span>
                    <input required type="email" name="email" autoComplete="email" className="mt-2 h-12 w-full border border-[#c9c4b9] bg-[#f4f1e8] px-3 text-[14px] font-normal text-[#26343b] placeholder:text-[#8a908c] focus:border-[#326c68] focus:outline-none" placeholder="you@organization.com" data-testid="input-inquiry-email" />
                  </label>
                </div>
                <label className="block text-[12px] font-semibold text-[#39494c]">
                  Organization <span className="font-normal text-[#808783]">(optional)</span>
                  <input name="organization" autoComplete="organization" className="mt-2 h-12 w-full border border-[#c9c4b9] bg-[#f4f1e8] px-3 text-[14px] font-normal text-[#26343b] placeholder:text-[#8a908c] focus:border-[#326c68] focus:outline-none" placeholder="Organization or practice" data-testid="input-inquiry-organization" />
                </label>
                <label className="block text-[12px] font-semibold text-[#39494c]">
                  Area of interest
                  <select value={topic} onChange={(event) => setTopic(event.target.value)} className="mt-2 h-12 w-full appearance-none border border-[#c9c4b9] bg-[#f4f1e8] px-3 text-[14px] font-normal text-[#26343b] focus:border-[#326c68] focus:outline-none" data-testid="select-inquiry-topic">
                    <option>Clinical consultation</option>
                    <option>Chart review &amp; analysis</option>
                    <option>Legal / expert consultation</option>
                    <option>Writing, editing &amp; publishing</option>
                    <option>Custom client webinar</option>
                    <option>Parenteral micronutrition guide</option>
                    <option>Other inquiry</option>
                  </select>
                </label>
                <label className="block text-[12px] font-semibold text-[#39494c]">
                  A brief note <span aria-hidden="true" className="text-[#326c68]">*</span>
                  <textarea required name="message" rows={4} className="mt-2 w-full resize-y border border-[#c9c4b9] bg-[#f4f1e8] px-3 py-3 text-[14px] font-normal leading-relaxed text-[#26343b] placeholder:text-[#8a908c] focus:border-[#326c68] focus:outline-none" placeholder="What question or project brings you here? Please avoid including sensitive patient information." data-testid="input-inquiry-message" />
                </label>
                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" className="cta-button inline-flex min-h-[52px] items-center justify-center gap-3 bg-[#326c68] px-6 text-sm font-semibold text-[#f4f1e8] hover:bg-[#203039]" data-testid="button-submit-inquiry">
                    Prepare email inquiry <ArrowRight size={17} />
                  </button>
                  <span className="text-[11px] text-[#717a78]">Your email app will open with a draft.</span>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d8d3c8] bg-[#f4f1e8]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12">
          <a href="#home" className="flex items-center gap-3" data-testid="link-footer-brand">
            <span className="serif text-[18px] text-[#326c68]">C</span>
            <span className="serif text-[15px]">Consultant Pharmacists of America, Inc.</span>
          </a>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#687274]">
            <span>Independent clinical pharmacy &amp; nutrition advisory</span>
            <a href="tel:13526423005" className="hover:text-[#326c68]" data-testid="link-footer-phone">352-642-3005</a>
            <a href="mailto:consultantpharmacistsofamerica@gmail.com" aria-label="Email Consultant Pharmacists of America" className="text-[#326c68] hover:text-[#203039]" data-testid="link-footer-email"><Mail size={14} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
