// Central place for prices, URLs, images and unconfirmed site copy.
const base = import.meta.env.BASE_URL;

export const siteConfig = {
  // TOM TO CONFIRM: page count. Change here only.
  pageCountLine: 'Over 1000 pages',
  editionLabel: 'Enhanced Third Edition',
  title: 'Clinical Guide to Parenteral Micronutrition',
  editor: 'Edited by Dr. Thomas G. Baumgartner',
  images: {
    // Swap these two paths to change the book image or portrait.
    cover: `${base}book-cover.png`,
    coverAlt: 'Cover of Clinical Guide to Parenteral Micronutrition, Enhanced Third Edition',
    portrait: `${base}baumgartner.jpg`,
    portraitWidth: 290,
    portraitHeight: 300,
    logo: `${base}consultant-pharmacists-top-logo-black.png`,
  },
  products: {
    book: {
      name: 'Clinical Guide to Parenteral Micronutrition, Enhanced Third Edition (PDF)',
      price: '$12.99',
      // PLACEHOLDER Gumroad URL: replace before launch.
      url: 'https://gumroad.com/l/PLACEHOLDER-book-pdf',
    },
    traceVitamin: {
      name: 'Trace Element/Vitamin Q&A Primer',
      price: '$5.99',
      // Product is unpublished; Gumroad will show "not available" until Tom publishes it.
      url: 'https://pharmacistconnect5.gumroad.com/l/trace-element-vitamin-primer',
    },
    electrolyte: {
      name: 'Electrolyte Q&A Primer',
      price: 'Free',
      // Product is unpublished; Gumroad will show "not available" until Tom publishes it.
      url: 'https://pharmacistconnect5.gumroad.com/l/electrolyte-primer',
    },
  },
  boxIncludesLine: 'Includes the electrolyte, trace element and vitamin Q&A primers.',
  sharingLine: 'You may share it with one other person (a friend or colleague), for a limit of two copies in all.',
  ladderLine: 'All three micronutrient Q&A sets are also included in the full text PDF.',
  reference: 'The Clinical Guide to Parenteral Micronutrition has been used as a reference text by more than 100,000 multidisciplinary professionals.',
  phone: '(352) 642-3005',
  phoneHref: 'tel:+13526423005',
  email: 'ConsultantPharmacistsofAmerica@gmail.com',
};
