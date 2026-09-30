import { useState } from 'react';
import { ArrowDown, Menu, Phone, X } from 'lucide-react';
import './_group.css';

type HeaderVariant = 'current' | 'compact-black' | 'masthead-black';

const blackLogo = '/__mockup/images/cpa-top-logo-black.png';

export function HeaderStudy({ variant }: { variant: HeaderVariant }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const masthead = variant === 'masthead-black';

  const brand = variant === 'current' ? (
    <a href="#home" className="group flex items-center gap-3" aria-label="Consultant Pharmacists of America home" data-testid="link-brand-home">
      <span className="flex h-10 w-10 items-center justify-center border border-[#326c68]/40 text-[#326c68] transition group-hover:bg-[#326c68] group-hover:text-[#f4f1e8]">
        <span className="serif text-[24px] leading-none">C</span>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="serif text-[18px] tracking-[-0.035em] sm:text-[20px]">Consultant Pharmacists</span>
        <span className="mt-1 text-[9px] font-semibold tracking-[0.2em] text-[#6b7475] sm:text-[10px]">OF AMERICA, INC.</span>
      </span>
    </a>
  ) : (
    <a href="#home" className="block shrink-0" aria-label="Consultant Pharmacists of America home" data-testid="link-brand-home">
      <img
        src={blackLogo}
        alt="Consultant Pharmacists of America — Independent Clinical Advisory Firm"
        width={1400}
        height={294}
        className={masthead ? 'h-auto w-[220px] max-w-full sm:w-[360px] lg:w-[510px]' : 'h-auto w-[235px] max-w-full sm:w-[275px]'}
      />
    </a>
  );

  const navigation = (
    <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:gap-7 lg:flex">
      <a href="#book" className="nav-link text-[13px] text-[#535f62]" data-testid="link-nav-book">The guide</a>
      <a href="#expertise" className="nav-link text-[13px] text-[#535f62]" data-testid="link-nav-expertise">Services</a>
      <a href="#who-we-serve" className="nav-link text-[13px] text-[#535f62]" data-testid="link-nav-sectors">Who we serve</a>
      <a href="#about" className="nav-link text-[13px] text-[#535f62]" data-testid="link-nav-about">About Dr. Baumgartner</a>
      <a href="#contact" className="nav-link text-[13px] text-[#535f62]" data-testid="link-nav-contact">Contact</a>
    </nav>
  );

  const guideLink = (
    <div className="hidden items-center lg:flex">
      <a href="#book" className="cta-button inline-flex items-center gap-2 bg-[#326c68] px-5 py-3 text-[12px] font-semibold tracking-[0.02em] text-[#f4f1e8] hover:bg-[#203039]" data-testid="link-header-guide-details">
        Explore the guide <ArrowDown size={15} />
      </a>
    </div>
  );

  const mobileMenuButton = (
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
  );

  return (
    <div className="cpa-logo-study min-h-screen overflow-x-clip bg-[#f4f1e8] text-[#26343b]">
      <div className="sticky top-0 z-50">
        <div className="bg-[#203039] px-5 py-2 text-center text-[11px] tracking-[0.08em] text-[#dfe4dc] sm:text-xs">
          Independent clinical pharmacy &amp; nutrition expertise
          <span className="mx-2 hidden text-[#a9c8c2] sm:inline">/</span>
          <a className="hidden underline decoration-[#789690] underline-offset-4 transition hover:text-white sm:inline" href="tel:13526423005">352-642-3005</a>
        </div>

        <header className="relative z-30 border-b border-[#ded9cf] bg-[#f4f1e8]/95 backdrop-blur">
          {masthead ? (
            <div className="mx-auto max-w-[1320px] px-5 md:px-9">
              <div className="flex items-center justify-between py-4 lg:justify-center lg:py-5">
                {brand}
                <div className="lg:hidden">{mobileMenuButton}</div>
              </div>
              <div className="hidden items-center justify-between border-t border-[#ded9cf] py-3 lg:flex">
                {navigation}
                {guideLink}
              </div>
            </div>
          ) : (
            <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-4 md:px-9 lg:py-5">
              {brand}
              {navigation}
              {guideLink}
              {mobileMenuButton}
            </div>
          )}
          {menuOpen && (
            <nav aria-label="Mobile navigation" className="absolute inset-x-0 top-full border-b border-[#ded9cf] bg-[#f4f1e8] px-6 py-5 shadow-lg lg:hidden">
              <div className="mx-auto flex max-w-[1320px] flex-col">
                {[
                  ['The micronutrition guide', '#book'],
                  ['Consulting services', '#expertise'],
                  ['Who we serve', '#who-we-serve'],
                  ['About Dr. Baumgartner', '#about'],
                  ['Contact', '#contact'],
                ].map(([label, href]) => (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-[#ded9cf] py-3.5 text-sm" data-testid={`link-mobile-${href.slice(1)}`}>{label}</a>
                ))}
                <a href="tel:13526423005" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#326c68]"><Phone size={15} /> 352-642-3005</a>
              </div>
            </nav>
          )}
        </header>
      </div>

      <main id="main">
        <section id="home" className="relative isolate bg-[#e8e5dc]">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_30%,rgba(189,205,195,.3),transparent_45%),linear-gradient(115deg,#e8e5dc,#f4f1e8_58%,#e6e3da)]" />
          <div id="book" className="mx-auto grid max-w-[1320px] scroll-mt-32 items-center gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:min-h-[605px] lg:grid-cols-[1fr_.86fr] lg:gap-14 lg:px-12 lg:py-20">
            <div className="order-1 flex flex-col justify-center lg:order-1 lg:py-4">
              <p className="eyebrow text-[#326c68]">Featured clinical reference</p>
              <h1 className="serif mt-5 max-w-[760px] text-[clamp(2.9rem,6.3vw,5.65rem)] leading-[0.97] tracking-[-0.047em] text-[#203039]">
                The Clinical Guide to <em className="font-normal text-[#326c68]">Parenteral Micronutrition</em>
                {' '}<span className="serif mt-4 block text-[clamp(1.1rem,2vw,1.45rem)] font-normal leading-[1.3] tracking-normal text-[#566164]">(Enhanced Third Edition-1,055 pages)</span>
              </h1>
              <p className="mt-5 text-[15px] font-medium text-[#566164]">Edited by Dr. Thomas G. Baumgartner</p>
              <p className="mt-4 max-w-[610px] text-[14px] leading-[1.8] text-[#626d6f]">
                An evidence-based reference for healthcare professionals involved in parenteral nutrition in hospital and home settings. It covers the formulation, monitoring, and administration of electrolytes, trace elements, and vitamins in total parenteral nutrition.
              </p>
            </div>
            <div className="order-2 flex min-h-[355px] items-center justify-center gap-8 border border-[#d5d0c5] bg-[#e9e6dd] px-5 py-8 sm:min-h-[390px] sm:gap-10 lg:order-2 lg:min-h-[425px] lg:px-8">
              <div className="relative flex shrink-0 items-center justify-center">
                <div className="h-[285px] w-[214px] overflow-hidden bg-[#f9f8f1] sm:h-[315px] sm:w-[236px]">
                  <img
                    src="/__mockup/images/cpa-guide-cover.jpg"
                    alt="Cover of The Clinical Guide to Parenteral Micronutrition"
                    width="1024"
                    height="1024"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="hidden max-w-[160px] sm:block">
                <p className="eyebrow text-[#326c68]">Clinical reference</p>
                <p className="serif mt-4 text-[24px] leading-[1.15] text-[#26343b]">Parenteral micronutrition</p>
                <p className="mt-3 text-[12px] leading-[1.7] text-[#687274]">Edited by Dr. Thomas G. Baumgartner, PharmD, MEd</p>
                <div className="mt-5 h-px w-10 bg-[#326c68]" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}