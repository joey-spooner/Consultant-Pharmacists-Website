import { siteConfig as cfg } from './config';

const email = 'ConsultantPharmacistsofAmerica@gmail.com';

function EmailLink() {
  return <a href={`mailto:${email}`}>{email}</a>;
}

export function Terms() {
  return (
    <main id="main">
      <section className="oc-page-head">
        <div className="oc-wrap"><h1>Terms of Sale</h1></div>
      </section>
      <section className="oc-sec">
        <div className="oc-wrap">
          <article className="oc-terms" aria-label="Terms of Sale">
            <p><strong>What you are buying.</strong> A digital PDF for your own professional use, delivered by Gumroad right after payment.</p>
            <p><strong>One copy.</strong> Your purchase includes one copy of the PDF. {cfg.sharingLine} If you do, I would be glad to hear about it at <EmailLink />.</p>
            <p><strong>What is not permitted.</strong> Posting the PDF online, selling it, or sharing it more widely.</p>
            <p><strong>Classroom and group use.</strong> For classes or teams, write to <EmailLink /> for classroom pricing.</p>
            <p><strong>Refunds.</strong> Because this is a digital download, it cannot be returned. If something is wrong with your purchase, or it is not what you expected, write to <EmailLink /> within 14 days of buying and we will make it right, including a refund where it is warranted.</p>
            <p><strong>Clinical use.</strong> The material is educational. Always follow your own institution's protocols and the product labeling, and use your professional judgment.</p>
            <p><strong>Questions.</strong> <EmailLink /></p>
          </article>
        </div>
      </section>
    </main>
  );
}
