import './guide-purpose.css';

const reasons = [
  {
    title: 'TPN micronutrient dosing is high-stakes, and the knowledge is scattered.',
    description: 'When nutrition is delivered intravenously, electrolytes, trace elements and vitamins require careful management. Deficiency or excess can cause harm that is difficult to recognize. This guide brings decades of specialized clinical knowledge into one reference.',
  },
  {
    title: 'Nutrition and medication interact in ways that aren’t obvious.',
    description: 'Medication use, electrolyte balance and nutrient status need to be considered together. The guide brings interactions, monitoring summaries and formulation considerations into a practical reference for clinical teams—not just theory.',
  },
  {
    title: 'One formula doesn’t fit every patient.',
    description: 'Children, adults and patients receiving home parenteral nutrition can have different micronutrient needs. The guide addresses these settings alongside electrolyte, trace-element and vitamin management, providing context for individualized care.',
  },
];

export default function GuidePurpose({ variant }: { variant: 'multi' | 'single' }) {
  return (
    <section id="why-guide" className={`guide-purpose guide-purpose--${variant}`} aria-labelledby="guide-purpose-title">
      <div className="guide-purpose-inner">
        <p className="guide-purpose-kicker">A practical clinical reference</p>
        <h2 id="guide-purpose-title">Why This Guide Exists</h2>
        <div className="guide-purpose-reasons">
          {reasons.map((reason, index) => (
            <article key={reason.title} className="guide-purpose-reason">
              <span className="guide-purpose-number" aria-hidden="true">0{index + 1}</span>
              <h3 className="guide-purpose-heading">{reason.title}</h3>
              <p className="guide-purpose-description">{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}