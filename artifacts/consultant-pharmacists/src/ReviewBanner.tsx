type ReviewBannerProps = { option: 'A' | 'B' };

export default function ReviewBanner({ option }: ReviewBannerProps) {
  const base = import.meta.env.BASE_URL;
  return (
    <aside className="review-banner" aria-label="Temporary design review banner">
      <strong>Option {option} — {option === 'A' ? 'Five-page site' : 'Single-page site'}</strong>
      <span>Temporary banner for design review</span>
      <a href={option === 'A' ? base : `${base}option-a/`}>
        View Option {option === 'A' ? 'B' : 'A'}
      </a>
    </aside>
  );
}