export const bagIngredients = {
  macronutrients: { group: 'Macronutrients', items: ['Amino Acids', 'Carbohydrate', 'Lipid'] },
  micronutrients: {
    group: 'Micronutrients',
    blocks: [
      { group: 'Electrolytes', items: ['Calcium', 'Magnesium', 'Potassium', 'Phosphate', 'Sodium'] },
      { group: 'Trace Elements', items: ['Chromium', 'Copper', 'Iodide', 'Manganese', 'Molybdenum', 'Selenium', 'Zinc'] },
      { group: 'Vitamins', groups: [
        { group: 'Fat soluble', items: ['A', 'D', 'E', 'K'] },
        { group: 'Water soluble', items: ['Ascorbic Acid', 'Cyanocobalamin', 'Folic Acid', 'Niacin', 'Pyridoxine', 'Riboflavin', 'Thiamine'] },
      ] },
    ],
  },
} as const;

function IngredientItems({ items }: { items: readonly string[] }) {
  return <ul role="list">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export function IngredientBlocks() {
  const { macronutrients, micronutrients } = bagIngredients;
  return (
    <div className="oc-ingredient-blocks">
      <section className="oc-ingredient-block" aria-labelledby="macronutrients-h">
        <h3 id="macronutrients-h">{macronutrients.group}</h3>
        <IngredientItems items={macronutrients.items} />
      </section>
      <section className="oc-micronutrients" aria-labelledby="micronutrients-h">
        <h3 id="micronutrients-h" className="oc-micronutrients-label">{micronutrients.group}</h3>
        <div className="oc-micronutrient-blocks">
          {micronutrients.blocks.map(block => (
            <section key={block.group} className={`oc-ingredient-block${'groups' in block ? ' oc-vitamin-block' : ''}`}>
              <h4>{block.group}</h4>
              {'items' in block ? <IngredientItems items={block.items} /> : (
                <div className="oc-vitamin-groups">
                  {block.groups.map(group => (
                    <section key={group.group}>
                      <h5>{group.group}</h5>
                      <IngredientItems items={group.items} />
                    </section>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}

export function TpnBagSvg() {
  return (
    <svg className="oc-bag" viewBox="0 0 160 260" role="img" aria-label="Illustration of an intravenous parenteral nutrition bag">
      <path d="M80 6 V30" stroke="#FBEFEF" strokeWidth="5" strokeLinecap="round" />
      <circle cx="80" cy="12" r="9" fill="none" stroke="#FBEFEF" strokeWidth="4" />
      <path d="M30 36 H130 Q142 36 142 50 V190 Q142 214 118 218 L96 222 H64 L42 218 Q18 214 18 190 V50 Q18 36 30 36Z" fill="#FBEFEF" stroke="#FBEFEF" strokeWidth="3" />
      <path d="M26 112 H134 V190 Q134 208 114 211 L96 214 H64 L46 211 Q26 208 26 190Z" fill="#FFFFFF" />
      <path d="M26 112 Q53 102 80 112 T134 112" fill="none" stroke="#7F1519" strokeWidth="3" />
      <rect x="40" y="52" width="80" height="40" rx="3" fill="#fff" stroke="#9E1B22" strokeWidth="2" />
      <text x="80" y="79" textAnchor="middle" fontSize="20" fontWeight="700" fill="#7F1519" fontFamily="inherit">TPN</text>
      <path d="M72 222 V240 H88 V222" fill="#FBEFEF" />
      <path d="M80 240 V256" stroke="#FBEFEF" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
