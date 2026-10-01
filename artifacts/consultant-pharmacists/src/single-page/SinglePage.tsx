import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, Mail, Menu, X } from 'lucide-react';
import GuidePurpose from '@/components/GuidePurpose';
import BookEndorsement from '@/components/BookEndorsement';
import './single-page.css';

const base = import.meta.env.BASE_URL;
const email = 'info@consultantpharmacistsofamerica.com';
const amazonUrl = 'https://www.amazon.com/dp/B0BM39YRRR';
const mail = (subject: string, body: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const webinarMail = mail(
  'Webinar list request',
  'Hello,\n\nPlease send me the current webinar list.\n\nName:\nOrganization / team:\nRole:\n\nPlease do not include patient information in this email.\n'
);
const speakingMail = mail(
  'Speaking engagement inquiry',
  'Hello,\n\nI would like to ask about a speaking engagement.\n\nName:\nOrganization:\nAudience (for example, hospital or home nutrition team):\nTopic of interest:\nPreferred timeframe:\n\nPlease do not include patient information in this email.\n'
);

const nav = [
  { id: 'why-guide', label: 'Why this guide' },
  { id: 'guide', label: 'The guide' },
  { id: 'sample', label: 'Free sample' },
  { id: 'author', label: 'Author' },
  { id: 'work-with', label: 'Webinars and speaking' },
];

const parts = [
  { n: '5–11', t: 'Electrolytes', d: 'Seven chapters. The self-assessment excerpt below belongs to this group.' },
  { n: '12–20', t: 'Trace elements', d: 'Nine chapters.' },
  { n: '21–33', t: 'Vitamins', d: 'Thirteen chapters.' },
  { n: '34', t: 'Carnitine', d: 'A dedicated chapter.' },
  { n: '35', t: 'Home PN', d: 'Home parenteral nutrition.' },
  { n: 'App.', t: 'Appendices', d: 'Monitoring summaries, interactions, formula development, compounding guidance.' },
];

export default function SinglePage() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = 'The Clinical Guide to Parenteral Micronutrition | Consultant Pharmacists of America';
    const description = 'A practical clinical reference for hospital and home nutrition teams, by pharmacist educator Dr. Thomas G. Baumgartner. Get the Kindle edition or the free Chapters 5–11 self-assessment.';
    const origin = import.meta.env.VITE_SITE_URL || window.location.origin;
    const canonical = new URL(base, origin).href;
    const image = new URL(`${base}parenteral-micronutrition-cover-enhanced.jpg`, origin).href;
    document.title = title;
    const set = (s: string, c: string) => document.querySelector<HTMLMetaElement>(s)?.setAttribute('content', c);
    set('meta[name="description"]', description);
    set('meta[property="og:title"]', title);
    set('meta[property="og:description"]', description);
    set('meta[property="og:url"]', canonical);
    set('meta[property="og:image"]', image);
    set('meta[name="twitter:title"]', title);
    set('meta[name="twitter:description"]', description);
    set('meta[name="twitter:image"]', image);
    set('meta[name="robots"]', 'index, follow');
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonical);
    if (window.location.hash) {
      requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const els = root.current?.querySelectorAll('.sp-rv') ?? [];
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);

  const Buy = ({ id, label = 'Get the Kindle edition on Amazon' }: { id: string; label?: string }) => (
    <a className="sp-btn sp-btn-buy" href={amazonUrl} target="_blank" rel="noopener noreferrer" data-testid={id}>{label} <ArrowUpRight size={17} aria-hidden="true" /></a>
  );
  const Free = ({ id, ghost }: { id: string; ghost?: boolean }) => (
    <a className={`sp-btn ${ghost ? 'sp-btn-ghost' : 'sp-btn-free'}`} href={`${base}electrolytes-self-assessment-excerpt.pdf`} download data-testid={id}>Download the free Chapters 5–11 self-assessment <ArrowDownToLine size={17} aria-hidden="true" /></a>
  );

  return (
    <div className="sp" ref={root}>
      <a href="#sp-main" className="sp-skip">Skip to content</a>
      <header className="sp-head">
        <div className="sp-w sp-head-in">
          <a href="#top" className="sp-logo" aria-label="Consultant Pharmacists of America, top of page"><img src={`${base}consultant-pharmacists-top-logo-black.png`} alt="Consultant Pharmacists of America" /></a>
          <nav className="sp-nav" aria-label="Page sections">
            {nav.map(n => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
          </nav>
          <a className="sp-head-cta" href={amazonUrl} target="_blank" rel="noopener noreferrer" data-testid="link-header-amazon">Buy on Kindle</a>
          <button type="button" className="sp-burger" aria-expanded={open} aria-controls="sp-mnav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)} data-testid="button-sp-menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {open && (
          <nav id="sp-mnav" className="sp-mnav" aria-label="Page sections, mobile">
            {nav.map(n => <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>{n.label}</a>)}
            <a href={amazonUrl} target="_blank" rel="noopener noreferrer">Buy on Kindle</a>
          </nav>
        )}
      </header>

      <main id="sp-main">
        <section className="sp-hero" id="top" aria-labelledby="sp-h1">
          <div className="sp-w sp-hero-grid">
            <div className="sp-hero-copy">
              <p className="sp-kick sp-in" style={{ ['--d' as string]: '0ms' }}>For hospital and home nutrition teams</p>
              <h1 id="sp-h1" className="sp-in" style={{ ['--d' as string]: '90ms' }}>The micronutrition question on your desk, <em>worked through.</em></h1>
              <p className="sp-lede sp-in" style={{ ['--d' as string]: '180ms' }}>The Clinical Guide to Parenteral Micronutrition is a practical reference on electrolytes, trace elements and vitamins in parenteral nutrition, edited by pharmacist educator Dr. Thomas G. Baumgartner.</p>
              <div className="sp-cta sp-in" style={{ ['--d' as string]: '270ms' }}>
                <Buy id="link-hero-amazon" />
                <Free id="link-hero-sample" ghost />
              </div>
              <p className="sp-fine sp-in" style={{ ['--d' as string]: '330ms' }}>Price, format details and checkout are on Amazon. The free download is self-assessment questions, not full chapters.</p>
            </div>
            <div className="sp-hero-art sp-in" style={{ ['--d' as string]: '200ms' }}>
              <div className="sp-ring" aria-hidden="true" />
              <img className="sp-cover" src={`${base}parenteral-micronutrition-cover-enhanced.jpg`} alt="Cover of The Clinical Guide to Parenteral Micronutrition" data-testid="img-sp-cover" />
            </div>
          </div>
        </section>

        <GuidePurpose variant="single" />

        <section className="sp-guide" id="guide" aria-labelledby="sp-g">
          <div className="sp-w">
            <div className="sp-rv sp-guide-top">
              <div><p className="sp-kick">The guide</p><h2 id="sp-g">Organized by what you are looking up.</h2></div>
              <div className="sp-guide-buy"><p>Kindle edition. Amazon handles current price, format details and delivery.</p><Buy id="link-guide-amazon" label="View on Amazon" /></div>
            </div>
            <figure className="sp-rv sp-endorsement">
              <blockquote>“Widely acclaimed and accepted as the ‘Gold Standard’ of parenteral micronutrition.”</blockquote>
              <figcaption>
                <strong>— Dr. Stanley J. Dudrick, M.D., F.A.C.S.</strong>
                <span>Pioneer of total parenteral nutrition (1968), Clinical Professor of Surgery, Yale University School of Medicine</span>
                <cite>From the book preface; titles reflect the attribution at that time.</cite>
              </figcaption>
            </figure>
            <ul className="sp-parts">
              {parts.map((p, i) => (
                <li key={p.t} className="sp-rv sp-part" style={{ ['--d' as string]: `${i * 60}ms` }}>
                  <span className="sp-pn">{p.n}</span><h3>{p.t}</h3><p>{p.d}</p>
                </li>
              ))}
            </ul>
            <BookEndorsement variant="single" />
          </div>
        </section>

        <section className="sp-sec sp-sample" id="sample" aria-labelledby="sp-s">
          <div className="sp-w sp-sample-grid">
            <div className="sp-rv">
              <p className="sp-kick sp-kick-dark">Free, no sign-up</p>
              <h2 id="sp-s">Try the electrolytes self-assessment first.</h2>
              <p className="sp-body">A 29-page PDF of self-assessment questions for Chapters 5–11, plus contents. It is a way to test your own recall and see how the guide is organized.</p>
              <Free id="link-sample-download" />
            </div>
            <div className="sp-rv sp-sheet" aria-hidden="true">
              <span>29</span><small>pages of self-assessment and contents</small>
            </div>
          </div>
        </section>

        <section className="sp-author" id="author" aria-labelledby="sp-a">
          <div className="sp-w sp-author-grid">
            <div className="sp-rv sp-portrait"><img src={`${base}baumgartner-portrait-enhanced.jpg`} alt="Dr. Thomas G. Baumgartner" data-testid="img-sp-portrait" /></div>
            <div className="sp-rv">
              <p className="sp-kick">About the author</p>
              <h2 id="sp-a">Dr. Thomas G. Baumgartner</h2>
              <p className="sp-body sp-light">Pharmacist educator and editor of the guide. Independent advisory work through Consultant Pharmacists of America spans parenteral products, clinical pharmacy and clinical nutrition.</p>
              <ul className="sp-facts">
                <li>Pharm.D., University of the Pacific, cum laude</li>
                <li>M.Ed., Stetson University</li>
                <li>B.S. Chemistry/Pharmacy, Rutgers</li>
                <li>FASHP Fellow; Florida Society of Health-Systems Pharmacists Health-Systems Pharmacist of the Year; National Academy of Pharmacy Practice</li>
                <li>100+ publications; 30+ years of experience</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="sp-sec" id="work-with" aria-labelledby="sp-w">
          <div className="sp-w">
            <div className="sp-rv sp-sh"><p className="sp-kick sp-kick-dark">Education for your team</p><h2 id="sp-w">Webinars and speaking.</h2></div>
            <div className="sp-two">
              <article className="sp-rv sp-card">
                <h3>Webinars</h3>
                <p>Email us to request the current webinar list. The list is shared on request rather than displayed here.</p>
                <a className="sp-btn sp-btn-dark" href={webinarMail} data-testid="link-webinar-list">Request the webinar list <Mail size={17} aria-hidden="true" /></a>
                <p className="sp-fine sp-dark">Opens your email app with a draft to review and send.</p>
              </article>
              <article className="sp-rv sp-card" style={{ ['--d' as string]: '80ms' }}>
                <h3>Speaking</h3>
                <p>Invite Dr. Baumgartner to speak with your pharmacy, nutrition or clinical team.</p>
                <a className="sp-btn sp-btn-dark" href={speakingMail} data-testid="link-speaking">Request a speaking engagement <Mail size={17} aria-hidden="true" /></a>
                <p className="sp-fine sp-dark">Opens your email app with a draft to review and send.</p>
              </article>
            </div>
            <p className="sp-rv sp-fine sp-dark">Please do not send patient information by email. Online forms are not yet available.</p>
          </div>
        </section>
      </main>

      <footer className="sp-foot">
        <div className="sp-w">
          <div className="sp-foot-cta"><p>Get the guide, or start with the free self-assessment.</p><div className="sp-cta"><Buy id="link-footer-amazon" label="Kindle edition on Amazon" /><Free id="link-footer-sample" ghost /></div></div>
          <div className="sp-foot-grid">
            <div><strong>Consultant Pharmacists of America, Inc.</strong><br />1616 SW 77th Terrace, Gainesville, FL 32607<br /><a href="tel:+13526423005">352-642-3005</a> · <a href={`mailto:${email}`}>{email}</a></div>
          </div>
          <p className="sp-fine">© {new Date().getFullYear()} Consultant Pharmacists of America, Inc. Guideline citations provide clinical context, not evidence of endorsement. For educational reference only.</p>
        </div>
      </footer>
    </div>
  );
}
