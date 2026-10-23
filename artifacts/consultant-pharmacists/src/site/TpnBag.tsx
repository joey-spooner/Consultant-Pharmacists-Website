export const bagIngredients = [
  { group: 'Macronutrients', items: ['Amino Acids', 'Carbohydrate', 'Lipid'] },
  { group: 'Electrolytes', items: ['Calcium', 'Magnesium', 'Potassium', 'Phosphate', 'Sodium'] },
  { group: 'Trace Elements', items: ['Chromium', 'Copper', 'Iodide', 'Manganese', 'Molybdenum', 'Selenium', 'Zinc'] },
  { group: 'Vitamins, fat soluble', items: ['A', 'D', 'E', 'K'] },
  { group: 'Vitamins, water soluble', items: ['Ascorbic Acid', 'Cyanocobalamin', 'Folic Acid', 'Niacin', 'Pyridoxine', 'Riboflavin', 'Thiamine'] },
] as const;

export function IngredientBlocks() {
  return (
    <div className="oc-ingredient-blocks">
      {bagIngredients.map(block => (
        <section className="oc-ingredient-block" key={block.group}>
          <h3>{block.group}</h3>
          <ul role="list">{block.items.map(item => <li key={item}>{item}</li>)}</ul>
        </section>
      ))}
    </div>
  );
}
