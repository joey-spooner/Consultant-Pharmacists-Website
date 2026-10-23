import { useEffect, useRef, useState } from 'react';

const base = import.meta.env.BASE_URL;
const imageAlt = 'Parenteral infusion bag of yellow solution on an IV pole, with the ingredients of total parenteral nutrition: macronutrients, electrolytes, trace elements and vitamins.';

export function IngredientImage() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <figure className="oc-infographic">
        <button className="oc-infographic-open" type="button" onClick={() => setOpen(true)} aria-label="Enlarge the ingredient image" aria-haspopup="dialog" aria-describedby="ingredient-enlarge-hint">
          <picture>
            <source srcSet={`${base}ingredients-image.webp`} type="image/webp" />
            <img src={`${base}ingredients-image.jpg`} alt={imageAlt} loading="eager" width={1122} height={1402} />
          </picture>
        </button>
        <figcaption id="ingredient-enlarge-hint">
          <button className="oc-infographic-caption" type="button" onClick={() => setOpen(true)} aria-haspopup="dialog">Tap to enlarge</button>
        </figcaption>
      </figure>
      <dialog className="oc-image-modal" ref={dialogRef} aria-label="Enlarged ingredient image" onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}>
        <div className="oc-image-modal-content">
          <button className="oc-image-modal-close" type="button" autoFocus onClick={() => setOpen(false)}>Close</button>
          <img src={`${base}ingredients-image.jpg`} alt={imageAlt} width={1122} height={1402} />
        </div>
      </dialog>
    </>
  );
}
