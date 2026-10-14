// Replaceable component: swap this file's output for a new illustration if desired.
export const bagIngredients = [
  { group: 'Macronutrients', items: ['Amino acids', 'Carbohydrate', 'Lipid'] },
  { group: 'Electrolytes', parent: 'Micronutrients', items: ['Calcium', 'Magnesium', 'Potassium', 'Phosphate', 'Sodium'] },
  { group: 'Trace elements', items: ['Chromium', 'Copper', 'Iodide', 'Manganese', 'Molybdenum', 'Selenium', 'Zinc'] },
  { group: 'Vitamins', items: [
    { group: 'Fat-soluble vitamins', items: ['A', 'D', 'E', 'K'] },
    { group: 'Water-soluble vitamins', groups: [
      { group: 'B vitamins', items: ['B1 (Thiamine)', 'B2 (Riboflavin)', 'B3 (Niacin)', 'B6 (Pyridoxine)', 'B9 (Folic acid)', 'B12 (Cyanocobalamin)'] },
      { group: 'Vitamin C', items: ['Ascorbic acid'] },
    ] },
  ] },
] as const;

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
