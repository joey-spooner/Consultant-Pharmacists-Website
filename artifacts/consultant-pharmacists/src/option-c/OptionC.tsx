import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { webinarDivisions } from '../data/webinars';
import cvSource from './cv-content.md?raw';
import sampleQaSource from './sample-qa.md?raw';
import { siteConfig as cfg } from './config';
import { trackEvent } from './analytics';
import { Markdown } from './markdown';
import { bagIngredients } from './TpnBag';
import { chapterFormat, contents, painPoints, preface, quotes, services } from './content';
import './option-c.css';

type Page = 'home' | 'contact' | 'webinars' | 'cv' | 'join';
const base = import.meta.env.BASE_URL;
const oc = `${base}option-c/`;
const buyProps = { target: '_blank', rel: 'noopener noreferrer' } as const;

const titles: Record<Page, string> = {
  home: 'Clinical Guide to Parenteral Micronutrition — Enhanced Third Edition | Consultant Pharmacists of America',
  contact: 'Contact | Consultant Pharmacists of America',
  webinars: 'Webinar topics | Consultant Pharmacists of America',
  cv: 'Curriculum Vitae, Thomas G. Baumgartner | Consultant Pharmacists of America',
  join: 'Join the call | Consultant Pharmacists of America',
};

const descriptions: Record<Page, string> = {
  home: 'Compatibility, dosing and monitoring for every TPN micronutrient, in one reference you can search. For multidiscipline clinical nutritionists, particularly hospital and home nutrition teams.',
  contact: 'Contact Consultant Pharmacists of America about clinical consultation, healthcare writing, and classroom pricing.',
  webinars: 'Explore the complete clinical nutrition, parenteral nutrition, and pharmacy education topic catalog.',
  cv: 'Curriculum vitae of Thomas G. Baumgartner, Pharm.D., M.Ed., FASHP, FASPEN, R.Ph., President and CEO of Consultant Pharmacists of America.',
  join: 'Join the call with Consultant Pharmacists of America.',
};

function Header({ page }: { page: Page }) {
  const links: [Page, string, string][] = [
    ['home', 'Home', base],
    ['webinars', 'Webinars', `${oc}webinars/`],
    ['cv', 'CV', `${base}cv/`],
    ['contact', 'Contact', `${oc}contact/`],
  ];
  return (
    <>
      <a className="oc-skip" href="#main">Skip to content</a>
      <header className="oc-head">
        <div className="oc-wrap">
          <a href={base} aria-label="Consultant Pharmacists of America home"><img src={cfg.images.logo} alt="Consultant Pharmacists of America" /></a>
          <nav className="oc-nav" aria-label="Main navigation">
            {links.map(([k, l, h]) => <a key={k} href={h} aria-current={page === k ? 'page' : undefined}>{l}</a>)}
            <a href={`${base}#about`}>About</a>
          </nav>
        </div>
      </header>
    </>
  );
}

function ContactBlock() {
  return (
    <div className="oc-contact-block">
      <div>Consultant Pharmacists of America</div>
      <div>Thomas G. Baumgartner</div>
      <div>Pharm.D., M.Ed., FASHP, FASPEN, R.Ph.</div>
      <div>President and Chief Executive Officer</div>
      <div>ORCID iD: <a href="https://orcid.org/0009-0007-1591-4269">0009-0007-1591-4269</a></div>
      <div className="oc-contact-email">E-mail: <a href="mailto:ConsultantPharmacistsofAmerica@gmail.com">ConsultantPharmacistsofAmerica@gmail.com</a></div>
      <div>Web site: <a href="https://consultantpharmacistsofamerica.com/">consultantpharmacistsofamerica.com</a></div>
      <div>Phone: <a href="tel:+13526423005">+1-352-642-3005</a></div>
      <div className="oc-contact-address">
        <div>Office: 9200 NW 36th Place, Suite A-5, Gainesville, FL 32606</div>
        <div>Mailing address (preferred): 1616 SW 77th Terrace, Gainesville, FL 32607</div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="oc-foot">
      <div className="oc-wrap">
        <div className="oc-foot-grid">
          <div><h2>Consultant Pharmacists of America</h2><p className="serif" style={{ fontSize: 22 }}>Excellence in Parenteral Nutrition, Micronutrition, and Clinical Pharmacy.</p></div>
          <nav aria-label="Footer navigation"><h2>Explore</h2><ul>
             <li><a href={base}>Home</a></li><li><a href={`${oc}webinars/`}>Webinars</a></li><li><a href={`${base}cv/`}>Curriculum vitae</a></li><li><a href={`${oc}contact/`}>Contact</a></li>
          </ul></nav>
          <div><h2>Contact</h2>
            <ContactBlock />
          </div>
        </div>
        <p className="legal">© {new Date().getFullYear()} Consultant Pharmacists of America</p>
      </div>
    </footer>
  );
}

function BuyBlock({ id }: { id?: string }) {
  const b = cfg.products.book;
  return (
    <div id={id}>
      <div className="oc-buy">
        <span className="oc-price" aria-label={`Price ${b.price}`}>{b.price}</span>
        <a className="oc-btn" href={b.url} {...buyProps}>Buy the PDF, {b.price}</a>
      </div>
      <p className="oc-small">One PDF. Delivered through Gumroad. <span className="oc-ph">(Placeholder link until the Gumroad product is live.)</span></p>
      <p className="oc-small"><a href={`${oc}contact/`}>Teaching a course? Ask about classroom pricing.</a></p>
    </div>
  );
}

function Det({ label, event, children }: { label: string; event: string; children: ReactNode }) {
  return (
    <details className="oc-det" onToggle={e => { if (e.currentTarget.open) trackEvent(event); }}>
      <summary>{label}</summary>
      <div className="body">{children}</div>
    </details>
  );
}

function SampleQa() {
  // Match only numbered items; keep the source and spelling notes in the file, off the page.
  const items = Array.from(sampleQaSource.matchAll(/^(\d+)\. (.+)\\\r?\n\*\*Answer:\*\* ([^\r\n]+)\r?$/gm));
  if (items.length !== 36 || items.some((item, i) => Number(item[1]) !== i + 1)) {
    throw new Error('The Calcium sample must contain 36 consecutive questions with answers.');
  }
  return (
    <ol style={{ listStyleType: 'decimal' }}>
      {items.map(([, number, question, answer]) => (
        <li key={number} style={{ marginBottom: 20, overflowWrap: 'anywhere', whiteSpace: 'pre-wrap' }}>
          <p>{question}</p>
          <p><strong>Answer:</strong> {answer}</p>
        </li>
      ))}
    </ol>
  );
}

function Home() {
  const { electrolyte, traceVitamin, book } = cfg.products;
  const mac = bagIngredients[0];
  const [el, tr, vi] = [bagIngredients[1], bagIngredients[2], bagIngredients[3]];
  return (
    <main id="main">
      <section className="oc-hero">
        <div className="oc-wrap">
          <p className="oc-hero-eyebrow">Consultant Pharmacists of America</p>
          <h1 className="oc-rise">Compatibility, dosing and monitoring for every TPN micronutrient, in one reference you can search.</h1>
          <p className="sub oc-rise d1">For multidiscipline clinical nutritionists, particularly hospital and home nutrition teams.</p>
          <div className="oc-hero-grid oc-rise d2">
            <img
              className="oc-bag"
              src={`${base}IV-bag-yellow.png`}
              alt="Parenteral infusion bag of yellow vitamin solution hanging from an IV pole"
              loading="lazy"
              width={1116}
              height={1409}
            />
            <div className="oc-ing">
              <h2>Intravenous Total Parenteral Nutrition (TPN)</h2>
              <dl>
                <div><dt>{mac.group}</dt><dd>{mac.items.join(', ')}</dd></div>
                <div><dt>Micronutrients</dt>
                  <dd className="nest">
                    <span><b>{el.group}:</b> {el.items.join(', ')}</span>
                    <span><b>{tr.group}:</b> {tr.items.join(', ')}</span>
                    <span>
                      <b>{vi.group}:</b>
                      <span className="oc-vit-groups">
                        {vi.items.map(vitamins => (
                          <span key={vitamins.group}>
                            <b>{vitamins.group}:</b>
                            {'groups' in vitamins ? (
                              <span className="oc-vit-groups">
                                {vitamins.groups.map(({ group, items }) => (
                                  <span key={group}><b>{group}:</b> {items.join(', ')}</span>
                                ))}
                              </span>
                            ) : ` ${vitamins.items.join(', ')}`}
                          </span>
                        ))}
                      </span>
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="oc-sec" aria-labelledby="pain-h">
        <div className="oc-wrap">
          <p className="oc-kick">The questions at the bedside and the bench</p>
          <h2 id="pain-h">Four questions, and where the book answers them.</h2>
          <ol className="oc-pain">
            {painPoints.map(p => (
              <li key={p.pain}><q>{p.pain}</q><p><span className="ans">The book: </span>{p.answer}</p></li>
            ))}
          </ol>
          <BuyBlock />
        </div>
      </section>

      <section className="oc-sec oc-tint" aria-labelledby="book-title">
        <div className="oc-wrap oc-book">
          <div><img className="oc-cover" src={cfg.images.cover} alt={cfg.images.coverAlt} /></div>
          <div>
            <h2 id="book-title">{cfg.title}</h2>
            <p className="oc-badge">ENHANCED</p>
            <p className="serif" style={{ fontSize: 22 }}>{cfg.editionLabel}</p>
            <p className="oc-pages">{cfg.pageCountLine}</p>
            <p className="oc-small">{cfg.editor}</p>
            <BuyBlock id="buy" />
            <Det label="Sample chapter: Calcium (Chapter 5)" event="open_sample_chapter">
              <p>Every chapter follows this format.</p>
              {chapterFormat.map(s => (
                <div key={s.head}>
                  <h3>{s.head}</h3>
                  {s.items.length > 0 && <ul>{s.items.map(i => <li key={i}>{i}</li>)}</ul>}
                </div>
              ))}
            </Det>
            <Det label="Sample Q&A: Calcium (Chapter 5 self assessment)" event="open_sample_qa">
              <p>Self assessment questions with answers follow every micronutrient chapter. They are useful for teaching and for exam preparation.</p>
              <SampleQa />
            </Det>
            <Det label="Preface and full contents" event="open_full_contents">
              {preface.map(t => <p key={t}>{t}</p>)}
              {contents.map(g => (
                <div key={g.group}>
                  <h3>{g.group}</h3>
                  <ul className="chl">{g.chapters.map(([n, t]) => <li key={n}><span className="num">{n}</span> {t}</li>)}</ul>
                </div>
              ))}
              <h3>Appendices</h3>
            </Det>
          </div>
        </div>
      </section>

      <section className="oc-sec" aria-labelledby="ladder-h">
        <div className="oc-wrap">
          <p className="oc-kick">Choose your starting point</p>
          <h2 id="ladder-h">From a free primer to the full text.</h2>
          <div className="oc-ladder">
            <div className="oc-step"><span className="n">Step 1</span><h3>{electrolyte.name}</h3><p className="oc-small">Excerpt of Chapters 5 to 11. Gumroad asks for your email address.</p><span className="p">{electrolyte.price}</span><a className="oc-btn alt" href={electrolyte.url} {...buyProps}>Get the free primer</a></div>
            <div className="oc-step"><span className="n">Step 2</span><h3>{traceVitamin.name}</h3><p className="oc-small">Question and answer sets for trace elements and vitamins.</p><span className="p">{traceVitamin.price}</span><a className="oc-btn alt" href={traceVitamin.url} {...buyProps}>Buy the primer, {traceVitamin.price}</a></div>
            <div className="oc-step"><span className="n">Or the full book</span><h3>Enhanced Third Edition PDF</h3><p className="oc-small">The complete text.</p><span className="p">{book.price}</span><a className="oc-btn" href={book.url} {...buyProps}>Buy the PDF, {book.price}</a></div>
          </div>
          <p style={{ marginTop: 18, fontWeight: 600 }}>{cfg.ladderLine}</p>
          <p className="oc-ph">Gumroad links are placeholders.</p>
        </div>
      </section>

      <section className="oc-sec oc-tint" aria-labelledby="q-h">
        <div className="oc-wrap">
          <h2 id="q-h">From the clinicians who know the field.</h2>
          <div className="oc-quotes">
            {quotes.map(q => (
              <figure key={q.name} style={{ margin: 0 }}><blockquote><p>{q.text}</p><footer><cite>{q.name}</cite><small>{q.role}</small></footer></blockquote></figure>
            ))}
          </div>
        </div>
      </section>

      <section className="oc-ref" aria-label="Reference use"><p>{cfg.reference}</p></section>

      <section className="oc-sec" id="about" aria-labelledby="about-h">
        <div className="oc-wrap oc-about">
          <img className="oc-photo" src={cfg.images.portrait} width={cfg.images.portraitWidth} height={cfg.images.portraitHeight} alt="Dr. Thomas G. Baumgartner" />
          <div>
            <p className="oc-kick">About</p>
            <h2 id="about-h">Thomas G. Baumgartner, <span style={{ display: 'inline-block', whiteSpace: 'nowrap', fontSize: 'clamp(0.8125rem, calc((100vw - 3rem) / 20), 1.25rem)' }}>Pharm.D., M.Ed., FASHP, FASPEN, R.Ph.</span></h2>
            <p>President and CEO of Consultant Pharmacists of America, and a Fellow of the American Society for Parenteral and Enteral Nutrition. Former Clinical Professor at the University of Florida Colleges of Pharmacy, Medicine, Nursing and Dentistry in Gainesville, Florida.</p>
             <p><a className="oc-btn alt" href={`${base}cv/`}>Read the full curriculum vitae</a></p>
          </div>
        </div>
      </section>

      <section className="oc-sec oc-tint" aria-labelledby="web-h">
        <div className="oc-wrap">
          <h2 id="web-h">Webinar topics</h2>
          <p>Browse the clinical education catalog by division and subject.</p>
          <a className="oc-btn" href={`${oc}webinars/`}>View the Webinars page</a>
        </div>
      </section>
    </main>
  );
}

function Webinars() {
  return (
    <main id="main">
      <section className="oc-page-head"><div className="oc-wrap"><h1>Webinar topics.</h1><p>Browse the clinical education catalog by division and subject. Expand a category to see its topics.</p><p>Mailing address is preferred for webinar and speaking inquiries.<br />1616 SW 77th Terrace, Gainesville, FL 32607</p></div></section>
      <section className="oc-sec"><div className="oc-wrap oc-web">
        <nav aria-label="Webinar divisions"><p className="oc-kick">Divisions</p>
          {webinarDivisions.map((d, i) => <a key={d.title} href={`#division-${i + 1}`}>{String(i + 1).padStart(2, '0')} {d.title}</a>)}
        </nav>
        <div>
          {webinarDivisions.map((d, i) => (
            <section className="oc-div" id={`division-${i + 1}`} key={d.title} aria-labelledby={`dt-${i}`}>
              <h2 id={`dt-${i}`}>{d.title}</h2>
              {d.categories.map((c, ci) => (
                <details className="oc-det" key={`${c.title}-${ci}`}>
                  <summary>{c.title} ({c.topics.length})</summary>
                  <div className="body"><ul>{c.topics.map((t, ti) => <li key={`${t}-${ti}`}>{t}</li>)}</ul></div>
                </details>
              ))}
            </section>
          ))}
        </div>
      </div></section>
    </main>
  );
}

function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const sending = useRef(false);

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    sending.current = true;
    setStatus('sending');
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error('Inquiry submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      sending.current = false;
    }
  }

  return (
    <main id="main">
      <section className="oc-page-head"><div className="oc-wrap"><h1>Start a conversation.</h1><p>For clinical consultation, legal expertise, healthcare writing, webinars, and classroom pricing.</p></div></section>
      <section className="oc-sec"><div className="oc-wrap oc-contact">
        <ContactBlock />
        <div>
          <p className="oc-kick">Inquiry form</p>
          <h2>Your inquiry</h2>
          {status === 'success' ? (
            <p role="status">Thank you. Your message was sent. Dr. Baumgartner will reply by email.</p>
          ) : (
          <form className="oc-form" action="https://formspree.io/f/xzedkjve" method="POST" onSubmit={submitInquiry} aria-busy={status === 'sending'}>
            <input type="hidden" name="_gotcha" tabIndex={-1} aria-hidden="true" />
            <input type="hidden" name="_subject" value="Website inquiry from consultantpharmacistsofamerica.com" />
            <fieldset aria-label="Inquiry form">
              <label className="oc-field">Name *<input name="name" type="text" autoComplete="name" required /></label>
              <label className="oc-field">Email *<input name="email" type="email" autoComplete="email" required /></label>
              <label className="oc-field">Organization<input name="organization" type="text" autoComplete="organization" /></label>
              <fieldset><legend style={{ fontWeight: 700, fontSize: 16 }}>Services</legend>
                <div className="oc-checks">{services.map(s => <label key={s}><input type="checkbox" name="services" value={s} />{s}</label>)}</div>
              </fieldset>
              <label className="oc-field">Message *<textarea name="message" rows={5} required /></label>
              {status === 'error' && <p className="oc-notice" role="alert">Sorry, that did not send. Please try again, or email consultantpharmacistsofamerica@gmail.com.</p>}
              <button type="submit" className="oc-btn" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Submit'}</button>
            </fieldset>
            <p className="oc-small">Do not include sensitive patient information.</p>
          </form>
          )}
        </div>
      </div></section>
    </main>
  );
}

function Cv() {
  // Preserve the supplied source; omit only the three publisher credits to
  // honor the brief's explicit removal of visible retailer mentions.
  const displayCv = cvSource
    .replace(/^#\s+Curriculum Vitae\s*\n/, '')
    .replace(/,\s*Amazon-Kindle(?=,)/g, '');
  return (
    <main id="main">
       <section className="oc-page-head"><div className="oc-wrap"><p style={{ margin: 0, color: '#FBEFEF', fontSize: 14, letterSpacing: '.12em', textTransform: 'uppercase' }}>President and CEO</p><h1>Curriculum Vitae</h1><p><a href={base} style={{ color: '#fff' }}>Back to the clinical guide</a></p></div></section>
      <section className="oc-sec"><div className="oc-wrap"><article className="oc-cv"><Markdown source={displayCv} /></article></div></section>
    </main>
  );
}

function JoinCall() {
  return (
    <main id="main">
      <section className="oc-page-head"><div className="oc-wrap"><h1>Join the call</h1></div></section>
      <section className="oc-sec"><div className="oc-wrap">
        <a className="oc-btn" href="https://calendar.app.google/2zFGqAHBqA97E36Y8" rel="noreferrer">Join the call</a>
      </div></section>
    </main>
  );
}

export default function OptionC({ page = 'home' }: { page?: Page }) {
  useEffect(() => {
    document.title = titles[page];
    const origin = import.meta.env.VITE_SITE_URL || window.location.origin;
    const route = page === 'join' ? 'join/' : page === 'cv' ? 'cv/' : page === 'home' ? '' : `option-c/${page}/`;
    const canonical = new URL(`${base}${route}`, origin).href;
    const image = new URL(page === 'cv' ? cfg.images.portrait : cfg.images.cover, origin).href;
    for (const [selector, content] of [
      ['meta[name="description"]', descriptions[page]],
      ['meta[property="og:title"]', titles[page]],
      ['meta[property="og:description"]', descriptions[page]],
      ['meta[property="og:url"]', canonical],
      ['meta[property="og:image"]', image],
      ['meta[name="twitter:title"]', titles[page]],
      ['meta[name="twitter:description"]', descriptions[page]],
      ['meta[name="twitter:image"]', image],
    ]) document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonical);
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    robots?.setAttribute('content', page === 'join' ? 'noindex, nofollow' : page === 'home' && window.location.pathname === base ? 'index, follow' : 'noindex, follow');
    if (page === 'home' && window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [page]);
  return (
    <div className="oc">
      <Header page={page} />
      {page === 'home' && <Home />}
      {page === 'webinars' && <Webinars />}
      {page === 'contact' && <Contact />}
      {page === 'cv' && <Cv />}
      {page === 'join' && <JoinCall />}
      <Footer />
    </div>
  );
}
