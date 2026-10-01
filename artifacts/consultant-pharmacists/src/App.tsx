import { useEffect, useState } from 'react';
import { ArrowDownToLine, ArrowRight, ArrowUpRight, Mail, MapPin, Menu, Phone, Plus, X } from 'lucide-react';
import { webinarDivisions } from '@/data/webinars';
import SinglePage from '@/single-page/SinglePage';
import ReviewBanner from '@/ReviewBanner';
import GuidePurpose from '@/components/GuidePurpose';
import BookEndorsement from '@/components/BookEndorsement';
import { Link, Redirect, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const base = import.meta.env.BASE_URL;
const email = 'info@consultantpharmacistsofamerica.com';
const amazonUrl = 'https://www.amazon.com/dp/B0BM39YRRR';
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/client-relationships', label: 'Client Relationships' },
  { href: '/webinars', label: 'Webinars' },
  { href: '/contact', label: 'Contact' },
];

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Consultant Pharmacists of America | Clinical Advisory',
    description: 'Independent clinical pharmacy and nutrition advisory services from Dr. Thomas G. Baumgartner, with expertise in parenteral nutrition and micronutrition.',
  },
  '/about': {
    title: 'About Dr. Baumgartner | Consultant Pharmacists of America',
    description: 'Explore Dr. Thomas G. Baumgartner’s credentials, professional recognition, and more than 30 years of clinical pharmacy experience.',
  },
  '/client-relationships': {
    title: 'Client Relationships | Consultant Pharmacists of America',
    description: 'Learn about the healthcare, pharmacy, institutional, and private-patient settings served by Consultant Pharmacists of America.',
  },
  '/webinars': {
    title: 'Clinical Webinars | Consultant Pharmacists of America',
    description: 'Browse clinical nutrition, parenteral nutrition, and pharmacy education topics from Dr. Thomas G. Baumgartner.',
  },
  '/contact': {
    title: 'Contact | Consultant Pharmacists of America',
    description: 'Contact Consultant Pharmacists of America about clinical consultation, medico-legal expertise, healthcare writing, and guest speaking.',
  },
};

function Header() {
  const [location] = useLocation();
  const currentPath = location.replace(/\/+$/, '') || '/';
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [location]);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#f4f1e8] focus:px-4 focus:py-3">Skip to content</a>
      <header className="masthead">
        <div className="wrap masthead-inner">
          <Link href="/" className="brand" aria-label="Consultant Pharmacists of America home" data-testid="link-brand">
            <img src={`${base}consultant-pharmacists-top-logo-black.png`} alt="Consultant Pharmacists of America" />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(item => <Link key={item.href} href={item.href} className={`nav-item ${item.href === '/contact' ? 'nav-contact' : ''}`} aria-current={currentPath === item.href ? 'page' : undefined} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
          </nav>
          <button className="mobile-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-navigation">{open ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
        {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map(item => <Link key={item.href} href={item.href} className={`nav-item ${item.href === '/contact' ? 'nav-contact' : ''}`} aria-current={currentPath === item.href ? 'page' : undefined} onClick={() => setOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
        </nav>}
      </header>
    </>
  );
}

function Footer() {
  return <footer className="site-footer">
    <div className="wrap">
      <div className="footer-grid">
        <div>
          <p className="section-kicker !text-[#a9c4bc]">Consultant Pharmacists of America</p>
          <p className="serif mt-5 max-w-[390px] text-[28px] leading-[1.2]">Excellence in Parenteral Nutrition, Micronutrition, and Clinical Pharmacy.</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-col items-start gap-3 text-[16px]">
          <span className="mb-2 text-[14px] font-bold uppercase tracking-[.15em] text-[#9fb8b2]">Explore</span>
          {navItems.map(item => <Link key={item.href} href={item.href} data-testid={`link-footer-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
        </nav>
        <div className="text-[16px] leading-[1.7]">
          <span className="mb-4 block text-[14px] font-bold uppercase tracking-[.15em] text-[#9fb8b2]">Contact</span>
          <a href="tel:+13526423005" data-testid="link-footer-phone">352-642-3005</a><br />
          <a href={`mailto:${email}`} className="break-all" data-testid="link-footer-email">{email}</a>
          <p className="mt-4 text-[#cad4cf]">1616 SW 77th Terrace<br />Gainesville, FL 32607</p>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Consultant Pharmacists of America, Inc.</span><span>Independent clinical pharmacy advisory firm</span></div>
    </div>
  </footer>;
}

function PageHeader({ label, title, description }: { label: string; title: string; description: string }) {
  return <section className="page-header"><div className="wrap fade-up"><span className="section-kicker">{label}</span><h1 className="display">{title}</h1><p className="lede">{description}</p></div></section>;
}

function Home() {
  return <main id="main">
    <section className="home-hero">
      <div className="wrap home-intro fade-up">
        <div><span className="section-kicker">Independent clinical advisory firm</span><h1 className="display">Consultant Pharmacists <em className="font-normal text-[#326c68]">of America</em></h1></div>
        <div><p className="positioning">Excellence in Parenteral Nutrition, Micronutrition, and Clinical Pharmacy.</p><div className="mt-7 flex flex-wrap items-center gap-4"><a className="button-primary" href={amazonUrl} target="_blank" rel="noopener noreferrer" data-testid="link-hero-amazon">Buy Kindle edition on Amazon <ArrowUpRight size={16} /></a><span className="text-[14px] leading-[1.6] text-[#536064]">Price and checkout on Amazon</span></div><p className="body-copy mt-5 max-w-[500px]">A comprehensive, evidence-based reference for healthcare professionals involved in the administration of parenteral nutrition, especially in hospital and home settings. Covers formulation, monitoring, and administration of micronutrients (electrolytes, trace elements, vitamins) in Total Parenteral Nutrition.</p></div>
      </div>
    </section>
    <section className="feature-book" aria-labelledby="book-title">
      <div className="wrap book-layout">
        <div className="book-visual fade-up"><img className="book-cover" src={`${base}parenteral-micronutrition-cover-enhanced.jpg`} alt="Cover of The Clinical Guide to Parenteral Micronutrition" data-testid="img-book-cover" /></div>
        <div className="book-content">
          <span className="section-kicker">The clinical reference · Enhanced third edition</span>
          <h2 id="book-title" className="display">The Clinical Guide to Parenteral Micronutrition</h2>
          <p className="mb-5 text-[16px] font-semibold text-[#536064]">Edited by Dr. Thomas G. Baumgartner</p>
          <p className="body-copy max-w-[580px]">Structured in four chapter groups: Review chapters (PN overview, pediatric PN, home PN), Electrolytes (Ch. 5–11), Trace Elements (Ch. 12–20), and Vitamins (Ch. 21–33), plus Special Topics (Carnitine) and Appendices (customizable TPN handbooks, teaching materials). Designed for pharmacists, physicians, dietitians, nurses, and clinical support teams.</p>
          <BookEndorsement variant="multi" />
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a className="button-primary" href={amazonUrl} target="_blank" rel="noopener noreferrer" data-testid="link-book-amazon">View Kindle edition on Amazon <ArrowUpRight size={16} /></a>
          </div>
          <p className="book-note mt-3 max-w-[490px]">Amazon handles the purchase, current price, and delivery of the Kindle edition.</p>
        </div>
      </div>
    </section>
    <GuidePurpose variant="multi" />
    <section className="stat-band" aria-label="Reference use"><div className="wrap stat-inner"><strong>Referenced over 100,000 times by leading institutions and medical professionals like you.</strong></div></section>
    <section className="wrap page-links" aria-labelledby="explore-title">
      <div className="page-links-head"><div><span className="section-kicker">The practice</span><h2 id="explore-title" className="section-title mt-4">Explore the work.</h2></div><span className="hidden text-[14px] text-[#74817f] sm:block">Clinical expertise, organized for the question at hand.</span></div>
      <div className="page-links-grid">
        <Link className="page-card" href="/about" data-testid="link-home-about"><span className="number">01 / Background</span><h3>About Dr. Baumgartner</h3><p>Credentials, professional recognition, and experience.</p><ArrowRight size={20} aria-hidden="true" /></Link>
        <Link className="page-card" href="/client-relationships" data-testid="link-home-clients"><span className="number">02 / Relationships</span><h3>Client Relationships</h3><p>The facilities, organizations, and patients served by the practice.</p><ArrowRight size={20} aria-hidden="true" /></Link>
        <Link className="page-card" href="/webinars" data-testid="link-home-webinars"><span className="number">03 / Education</span><h3>Webinars</h3><p>Browse the catalog of clinical education topics.</p><ArrowRight size={20} aria-hidden="true" /></Link>
      </div>
    </section>
    <section className="border-t border-[#d5d1c6] bg-[#e9e6dd]"><div className="wrap flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between"><div><span className="section-kicker">Complimentary resource</span><p className="serif mt-2 text-[25px]">Electrolytes self-assessment</p><p className="body-copy mt-1">Free PDF with electrolyte self-assessment questions and appendices related to Chapters 5–11; not the full chapter content.</p></div><a className="button-outline shrink-0" href={`${base}electrolytes-self-assessment-excerpt.pdf`} download data-testid="link-free-pdf">Download PDF <ArrowDownToLine size={16} /></a></div></section>
  </main>;
}

function About() {
  return <main id="main">
    <PageHeader label="About the practice" title="Thomas G. Baumgartner" description="An independent advisory firm specializing in parenteral products, clinical pharmacy and clinical nutrition." />
    <div className="wrap profile-layout">
      <aside className="profile-aside"><img src={`${base}baumgartner-portrait-enhanced.jpg`} alt="Dr. Thomas G. Baumgartner" data-testid="img-doctor-portrait" /><p className="caption">Dr. Thomas G. Baumgartner</p><p className="body-copy mt-6">Medical chart review, expert legal consultation, and healthcare writing/publishing.</p><Link className="text-link mt-6" href="/contact" data-testid="link-about-contact">Contact the practice <ArrowRight size={16} /></Link></aside>
      <div>
        <section className="profile-section" aria-labelledby="credentials-title"><h2 id="credentials-title">Credentials</h2><ul><li>Pharm.D. — University of the Pacific, cum laude</li><li>M.Ed. — Stetson University</li><li>B.S. Chemistry/Pharmacy — Rutgers</li></ul></section>
        <section className="profile-section" aria-labelledby="recognition-title"><h2 id="recognition-title">Recognition</h2><ul><li>FASHP Fellow</li><li>Florida Society of Health-Systems Pharmacists' “Health-Systems Pharmacist of the Year”</li><li>National Academy of Pharmacy Practice</li></ul></section>
        <section className="profile-section" aria-labelledby="experience-title"><h2 id="experience-title">Experience</h2><ul><li>100+ publications</li><li>30+ years' experience</li></ul></section>
      </div>
    </div>
  </main>;
}

const clientClusters = [
  { title: 'Acute & Ambulatory Care', items: ['acute care hospitals', 'ambulatory medical centers', 'surgical centers'] },
  { title: 'Long-Term & Residential Care', items: ['assisted living facilities', 'continuing care retirement communities', 'nursing facilities', 'boarding homes', 'senior centers'] },
  { title: 'Home & Transitional Care', items: ['home health care', 'hospice services', 'transitional care facilities'] },
  { title: 'Pharmacy & Institutional', items: ['community pharmacies', 'wholesale/retail pharmacies', 'correctional institutions', 'dialysis centers'] },
  { title: 'Private Patients', items: ['private patients'] },
];

function ClientRelationships() {
  return <main id="main">
    <PageHeader label="Client relationships" title="Across settings of care." description="Our consult services extend to:" />
    <div className="wrap cluster-grid">
      {clientClusters.map((cluster, index) => <section className="cluster" key={cluster.title} aria-labelledby={`cluster-${index}`}><span className="number">{String(index + 1).padStart(2, '0')}</span><div><h2 id={`cluster-${index}`}>{cluster.title}</h2><ul>{cluster.items.map(item => <li key={item}>{item}</li>)}</ul></div></section>)}
    </div>
  </main>;
}

function Webinars() {
  return <main id="main">
    <PageHeader label="Clinical education" title="Webinar topics." description="Browse the clinical education catalog by division and subject. Expand a category to see its topics." />
    <div className="wrap webinar-layout">
      <aside className="webinar-index"><span className="section-kicker">Contents</span><p>10 divisions · 26 categories</p><nav aria-label="Webinar divisions">{webinarDivisions.map((division, index) => <a key={division.title} href={`#division-${index + 1}`} data-testid={`link-webinar-division-${index + 1}`}>{String(index + 1).padStart(2, '0')} &nbsp; {division.title}</a>)}</nav></aside>
      <div>{webinarDivisions.map((division, index) => <section className="division" id={`division-${index + 1}`} key={division.title} aria-labelledby={`division-title-${index + 1}`}>
        <div className="division-heading"><span className="number">{String(index + 1).padStart(2, '0')}</span><h2 id={`division-title-${index + 1}`}>{division.title}</h2></div>
        {division.categories.map((category, catIndex) => <details className="category" key={`${category.title}-${catIndex}`}><summary data-testid={`toggle-webinar-${index + 1}-${catIndex + 1}`}><span>{category.title} <span className="ml-2 font-normal text-[#87928f]">({category.topics.length})</span></span><Plus size={17} aria-hidden="true" /></summary><ul className="topic-list">{category.topics.map((topic, topicIndex) => <li key={`${topic}-${topicIndex}`}>{topic}</li>)}</ul></details>)}
      </section>)}</div>
    </div>
    <section className="wrap speaker-box" aria-labelledby="speaker-title"><div><span className="section-kicker">Guest speaking</span><h2 className="serif mt-3 text-[32px] leading-[1.1]" id="speaker-title">Speaking sessions</h2><p className="body-copy mt-3">Approximately $4,500 per session. Limited availability; contact for details.</p></div><Link href="/contact" className="button-primary shrink-0" data-testid="link-webinar-contact">Inquire about speaking <ArrowRight size={16} /></Link></section>
  </main>;
}

const services = ['Medico-legal', 'General consultation', 'Medical/Pharmacy Writing', 'Webinars', 'Other'];

function Contact() {
  return <main id="main">
    <PageHeader label="Contact" title="Start a conversation." description="For clinical consultation, legal expertise, healthcare writing, and webinars." />
    <div className="wrap contact-grid">
      <aside className="contact-info"><span className="section-kicker">Direct contact</span><h2 className="section-title mt-4 max-w-[400px]">Reach the practice.</h2>
        <div className="contact-detail mt-8"><span className="section-kicker mb-2"><Phone size={13} className="inline mr-2" />Phone</span><a href="tel:+13526423005" className="serif text-[23px]" data-testid="link-contact-phone">352-642-3005</a></div>
        <div className="contact-detail"><span className="section-kicker mb-2"><Mail size={13} className="inline mr-2" />Email</span><a href={`mailto:${email}`} className="text-[18px]" data-testid="link-contact-email">{email}</a></div>
        <div className="contact-detail"><span className="section-kicker mb-2"><MapPin size={13} className="inline mr-2" />Address</span><address className="not-italic text-[18px] leading-[1.7]">1616 SW 77th Terrace<br />Gainesville, FL 32607</address></div>
      </aside>
      <section aria-labelledby="inquiry-title"><span className="section-kicker">Inquiry form</span><h2 className="serif mt-3 mb-2 text-[34px]" id="inquiry-title">Your inquiry</h2><p className="body-copy mb-8">The form is displayed for review. Submission is unavailable until a secure form endpoint is connected. Please use the email or phone links to get in touch.</p>
        <form onSubmit={event => event.preventDefault()}>
          <fieldset disabled aria-label="Inquiry form awaiting a submission service">
          <div className="grid gap-x-5 sm:grid-cols-2"><label className="field">Name <span aria-label="required">*</span><input name="name" type="text" required autoComplete="name" data-testid="input-contact-name" /></label><label className="field">Email <span aria-label="required">*</span><input name="email" type="email" required autoComplete="email" data-testid="input-contact-email" /></label></div>
          <fieldset><legend className="text-[16px] font-bold text-[#344b4e]">Services</legend><div className="check-grid">{services.map((service, index) => <label className="check-option" key={service}><input type="checkbox" name="services" value={service} data-testid={`checkbox-service-${index + 1}`} /><span>{service}</span></label>)}</div></fieldset>
          <label className="field">Message<textarea name="message" rows={5} data-testid="input-contact-message" /></label>
          <button type="submit" disabled className="button-primary" data-testid="button-contact-submit">Submit <ArrowRight size={16} /></button>
          </fieldset>
          <p className="book-note mt-3">Form submission pending connection to Formspree or Getform. Do not include sensitive patient information.</p>
        </form>
      </section>
    </div>
  </main>;
}

function NotFound() {
  return <main id="main" className="wrap py-28"><span className="section-kicker">Page not found</span><h1 className="display mt-5 text-[clamp(3rem,8vw,6rem)]">This page isn’t here.</h1><Link href="/" className="text-link mt-9" data-testid="link-not-found-home">Return home <ArrowRight size={16} /></Link></main>;
}

function RoutedSite() {
  const [location] = useLocation();
  useEffect(() => {
    const normalizedPath = location.replace(/\/+$/, '') || '/';
    const { title, description } = pageMeta[normalizedPath] ?? {
      title: 'Page not found | Consultant Pharmacists of America',
      description: 'Return to Consultant Pharmacists of America to explore clinical pharmacy advisory services.',
    };
    document.title = title;
    const origin = import.meta.env.VITE_SITE_URL || window.location.origin;
    const canonical = new URL(`${base}option-a${normalizedPath === '/' ? '/' : `${normalizedPath}/`}`, origin).href;
    const image = new URL(`${base}og-preview.png`, origin).href;
    const update = (selector: string, content: string) => {
      document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
    };
    update('meta[name="description"]', description);
    update('meta[property="og:title"]', title);
    update('meta[property="og:description"]', description);
    update('meta[property="og:url"]', canonical);
    update('meta[property="og:image"]', image);
    update('meta[name="twitter:title"]', title);
    update('meta[name="twitter:description"]', description);
    update('meta[name="twitter:image"]', image);
    update('meta[name="robots"]', 'noindex, follow');
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonical);
  }, [location]);
  return <div className="site-shell"><ReviewBanner option="A" /><Header /><Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/about/" component={About} />
    <Route path="/client-relationships" component={ClientRelationships} />
    <Route path="/client-relationships/" component={ClientRelationships} />
    <Route path="/webinars" component={Webinars} />
    <Route path="/webinars/" component={Webinars} />
    <Route path="/contact" component={Contact} />
    <Route path="/contact/" component={Contact} />
    <Route component={NotFound} />
  </Switch><Footer /></div>;
}

function App() {
  return <WouterRouter base={base.replace(/\/$/, '')}><Switch>
    <Route path="/" component={SinglePage} />
    <Route path="/single-page" component={SinglePage} />
    <Route path="/single-page/" component={SinglePage} />
    <Route path="/option-a" nest><RoutedSite /></Route>
    {['about', 'client-relationships', 'webinars', 'contact'].flatMap(path => [
      <Route key={path} path={`/${path}`}><Redirect to={`/option-a/${path}/`} replace /></Route>,
      <Route key={`${path}/`} path={`/${path}/`}><Redirect to={`/option-a/${path}/`} replace /></Route>,
    ])}
    <Route component={NotFound} />
  </Switch></WouterRouter>;
}

export default App;
