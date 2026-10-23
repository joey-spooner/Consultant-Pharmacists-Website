export const preface = [
  'A comprehensive, evidence-based reference for healthcare professionals involved in the administration of parenteral nutrition, especially in hospital and home settings. Covers formulation, monitoring, and administration of micronutrients (electrolytes, trace elements, vitamins) in Total Parenteral Nutrition.',
  'Structured in four chapter groups: Review chapters (PN overview, pediatric PN, home PN), Electrolytes (Ch. 5–11), Trace Elements (Ch. 12–20), and Vitamins (Ch. 21–33), plus Special Topics (Carnitine) and Appendices (customizable TPN handbooks, teaching materials). Designed for pharmacists, physicians, dietitians, nurses, and clinical support teams.',
];

export const contents: { group: string; chapters: [number, string][] }[] = [
  { group: 'Review chapters', chapters: [[1, 'Parenteral micronutrition'], [2, 'Parenteral macronutrition'], [3, 'Pediatric parenteral micronutrition'], [4, 'Pediatric parenteral macronutrition']] },
  { group: 'Electrolytes', chapters: [[5, 'Calcium'], [6, 'Magnesium'], [7, 'Phosphate'], [8, 'Bicarbonate and precursors'], [9, 'Chloride'], [10, 'Potassium'], [11, 'Sodium']] },
  { group: 'Trace elements', chapters: [[12, 'Iron'], [13, 'Zinc'], [14, 'Copper'], [15, 'Chromium'], [16, 'Manganese'], [17, 'Fluoride'], [18, 'Iodide'], [19, 'Molybdenum'], [20, 'Selenium']] },
  { group: 'Vitamins', chapters: [[21, 'Vitamin A'], [22, 'Vitamin D'], [23, 'Vitamin E'], [24, 'Vitamin K'], [25, 'Thiamin (B1)'], [26, 'Riboflavin (B2)'], [27, 'Niacin (B3)'], [28, 'Ascorbic acid (vitamin C)'], [29, 'Pantothenic acid (B5)'], [30, 'Pyridoxin (B6)'], [31, 'Cyanocobalamin (B12)'], [32, 'Biotin'], [33, 'Folic acid']] },
  { group: 'Other', chapters: [[34, 'Carnitine'], [35, 'Home parenteral nutrition']] },
];

export const chapterFormat: { head: string; items: string[] }[] = [
  { head: 'I. Product information', items: ['Introduction', 'Chemistry', 'Dosage forms, concentrations, manufacturers', 'Uses and functions'] },
  { head: 'II. Professional implications', items: ['Preparation, compounding, analysis, synthesis', 'Antagonists, inhibitors, potentiators, synergistic agents', 'Contraindications, precautions, warnings', 'Pharmacokinetics and disposition'] },
  { head: 'III. Patient considerations', items: ['Administration', 'Adverse reactions', 'Monitoring', 'Expiration', 'Storage', 'Requirements and deficiencies', 'Dose (treatment and toxicity)', 'Other implications'] },
  { head: 'IV. References', items: [] },
  { head: 'V. Self assessment', items: [] },
];

export const painPoints = [
  { pain: 'Will this calcium and phosphate mix precipitate?', answer: 'The calcium and phosphate chapters each cover chemistry, dosage forms and concentrations, and preparation and compounding, with the antagonists and contraindications that matter at the bench.' },
  { pain: 'Trace element deficiencies and toxicities show up subtly, and they are easy to miss.', answer: 'Nine trace element chapters, each with monitoring, requirements and deficiencies, and dose for treatment and toxicity in the same place.' },
  { pain: 'I need the answer now, and I do not have time to read a chapter.', answer: 'Every chapter follows one format, so you go straight to the subsection you need, and the PDF is searchable.' },
  { pain: 'I have infants, elderly, renal and liver patients, and one formula does not fit them all.', answer: 'Pediatric micronutrition and macronutrition chapters, a home parenteral nutrition chapter, and patient considerations in every micronutrient chapter.' },
];

export const quotes = [
  { text: '“Widely acclaimed and accepted as the ‘Gold Standard’ of parenteral micronutrition.”', name: 'Dr. Stanley J. Dudrick, M.D., F.A.C.S.', role: 'Pioneer of total parenteral nutrition (1968), Clinical Professor of Surgery, Yale University School of Medicine' },
  { text: '“This is a very useful and well written book that should find a place in the library of clinical nutritionists.”', name: "Khursheed N. Jeejeebhoy, M.B.B.S., Ph.D., FRCP, St. Michael's Hospital, Toronto", role: 'From the Foreword to an earlier edition' },
];

export const services = ['Medico-legal', 'General consultation', 'Medical/Pharmacy Writing', 'Webinars', 'Classroom pricing', 'Other'];
