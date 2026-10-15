import './book-endorsement.css';

export default function BookEndorsement({ variant }: { variant: 'multi' | 'single' }) {
  return (
    <figure id="book-endorsement" className={`book-endorsement book-endorsement--${variant}`}>
      <blockquote>
        <p className="book-endorsement-quote">“Widely acclaimed and accepted as the ‘Gold Standard’ of parenteral micronutrition.”</p>
      </blockquote>
      <figcaption>
        <span className="book-endorsement-name">— Dr. Stanley J. Dudrick, M.D., F.A.C.S.</span>
        <span className="book-endorsement-role">Pioneer of total parenteral nutrition (1968), Clinical Professor of Surgery, Yale University School of Medicine</span>
      </figcaption>
    </figure>
  );
}