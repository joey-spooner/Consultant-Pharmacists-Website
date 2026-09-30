export type WebinarDivision = {
  title: string;
  categories: { title: string; topics: string[] }[];
};

const topics = (entries: string): string[] =>
  entries.trim().split("\n").map((topic) => topic.trim());

export const webinarDivisions: WebinarDivision[] = [
  {
    title: "Foundations of Clinical Nutrition",
    categories: [
      {
        title: "Core Clinical Nutrition & Nutrition Support",
        topics: topics(`
          Back to the Basics in Nutritional Therapy
          Basics – Clinical Nutrition
          Clinical Nutrition – Basic Science
          Clinical Nutrition – Macrosubstrates
          Clinical Nutrition – Microsubstrates
          Clinical Nutrition – Perles
          Clinical Nutrition – UPDATE
          Clinical Nutrition
          Clinical Nutrition Therapeutics
          Clinical Nutrition Updates
          Current Perspectives in Clinical Nutrition Support
          Pragmatic Clinical Nutrition
          Provocative Nutrition Matters
          Primary Therapeutics of Parenteral/Enteral Nutrition
          Nutrition – Enteral and Parenteral
          Nutrition and Disease Etiology
          Nutrition in the Hospital and the Community
          Nutrition in Various Disease States
          Nutrition in the Special Diseased Patient
          Nutritional Assessment
          Nutritional Assessment Tools for the General Practitioner
          Nutritional Support Team Dynamics
        `),
      },
      {
        title: "Calorimetry / Metabolic Measurement",
        topics: topics(`
          Calorimetry
          Fick/Weir Equations & Parenteral Nurition
          Indirect Calorimetry
          Nutrition and Calorimetry Research
          Oxygen Consumption and Nutrition
          The Use of Indirect Calorimetry as a Prognosticator in the MICU
        `),
      },
      {
        title: "Specific Nutrients / Metabolic Topics",
        topics: topics(`
          Anabolic Steroids and Protein Metabolism
          Insulin
          Iron and Sepsis
          Liquid Protein Diets
          Pharmacological Enhancement of Food Intake
          Prealbumin as a Nutrition Marker
          Selenium
          Selenium – Clinical Perspectives
          Selenium and the Bone Marrow Transplant Patient
          Thiamine Deficiency and Death
          Transthyretin
          Use of Rapid Turnover Proteins
          Vitamins and Trace Minerals
        `),
      },
      {
        title: "Food / Diet / General Nutrition",
        topics: topics(`
          Food Allergies
          Food Feud
          Liquid Protein Diets
          Overeating
          What’s for Dinner in the ICU?
        `),
      },
    ],
  },
  {
    title: "Parenteral Nutrition / TPN",
    categories: [
      {
        title: "Parenteral Nutrition / TPN — General",
        topics: topics(`
          Assessment of the TPN Patient
          How to make a TPN solution – from A to Z
          Issues in TPN
          Metabolic Considerations in Parenteral Nutrition Therapy
          Metabolic Potpourri – TPN Therapy
          Monitoring TPN Therapy
          Parenteral Nurition Overview
          Parenteral Nutritional Therapy Monitoring
          Parenteral Therapy Overview
          Pragmatic Application of Principles – Total Parenteral Nutrition
          Pragmatics of TPN Therapy
          The Physiology of Total Parenteral Nutrition
          The State of the Art – TPEN
          The Where, When And How of TPN
          Total Nutrient Admixtures
          Total Parenteral Nutrition Overview
          Total Parenteral Nutrition
          Total Parenteral Nutrition Therapy
          Total Parenteral Nutrition Update
          TPEN Therapeutics
          TPN 101
          TPN Implications
          TPN Review
          TPN Therapy
          TPN-What’s New?
          TPN – Where do we go from here?
          What Healthcare Place for TPN?
        `),
      },
      {
        title: "TPN Formulation, Compounding & Compatibility",
        topics: topics(`
          Clinical Pharmacy Implications – TPN Tx
          How to make a TPN solution – from A to Z
          Pharmacy Implications of Parenteral Nutrition Therapy
          Pharmacy Implications:TPN Therapy
          Point/Counterpoint-Standard vs Patient-specific TPN Formulas
          TPN Compounding
          TPN Formulations and Compatibilities
          What Should the Pharmacy Technician Know about TPN Compounding?
        `),
      },
      {
        title: "Lipids / Intravenous Fat / Oxidation",
        topics: topics(`
          Clinical Pharmacy Implications – Intravenous Fat Emulsions
          Immunologic Implications of Parenteral lipid
          Intravenous Fat and the Practicing Surgeon
          Intravenous lipids and Surgery
          Lipid and Immunity
          Lipids – Contemporary Issues
          Parenteral Lipid and Immunity
          Peroxidation and IV Lipids
          What the Pharmacist Should Know about Intravenous Lipids
          Antioxidants
          Antioxidants in Nutrition
          Antioxidants/Proxidants
          Review: Antioxidants
        `),
      },
    ],
  },
  {
    title: "Parenteral Micronutrients & Trace Elements",
    categories: [
      {
        title: "Parenteral Micronutrients / Trace Elements / Vitamins",
        topics: topics(`
          Basic Science and Total Parenteral Micronutrition
          Controversies in Micronutrition
          Current Perspectives in Parenteral Micronutrition
          Everything That You Always Wanted to Know About Trace Elements
          Macrosubstrate and Micronutrient Potpourri
          Micronutrient Dogma
          Micronutrient Management
          Micronutrient Perles for the Nurse
          Micronutrient Potpourri
          Micronutrient Roundtable
          Micronutrient Therapeutics
          Micronutrient Therapy
          Micronutrient Therapy in the Cancer Patient
          Micronutrient Therapy Review
          Micronutrient Therapy: Parts 1 and 2
          Micronutrient Trace Element Therapy
          Micronutrients – Electrolytes
          Micronutrients – Focus on Trace Elements
          Micronutrients and Crohn’s Disease
          Micronutrients Vitamins
          Micronutrition : A New Concept in Nutritional Management
          Parenteral Micronutrient Therapy Highlights
          Parenteral Micronutrients
          Parenteral Multivitamin Update
          Selenium
          Selenium – Clinical Perspectives
          Selenium and the Bone Marrow Transplant Patient
          Trace Element Perles
          Trace Element Saavy
          Trace Element Therapeutics
          Trace Elements – Pragmatic Sagacity
          Trace Elements – Where are we today?
          Trace Elements in Health and Disease
          Trace Elements Physiology
          Vitamins and Trace Minerals
        `),
      },
    ],
  },
  {
    title: "Electrolytes, Acid–Base & Metabolism",
    categories: [
      {
        title: "Electrolytes, Acid–Base & Fluid Therapy",
        topics: topics(`
          Acid-Base Implications in Nutritional Support
          Acid-Base Therapeutics as it Applies to the Nutrition Patient
          Acid/Base Considerations in Parenteral/Enteral Therapy
          Acid/Base Therapy
          Electrolyte and Acid/Base Balance in Nutrition Support
          Electrolyte and Trace Elements in the Hospital and Home Patient
          Electrolyte Considerations
          Fluid and Electrolyte Therapy
          Osmolality and pH Review
          Refeeding Syndrome
        `),
      },
    ],
  },
  {
    title: "Enteral Nutrition",
    categories: [
      {
        title: "Enteral Nutrition",
        topics: topics(`
          A Critical Look at Disease Specific Enteral Products
          Enteral Feeding Implications
          Enteral Nutrition
          Enteral Nutrition and Pharmacy Interactions
          Enteral Nutrition: Pharmacy Implications
          Enteral/Parenteral Nutrition Therapy
          Medications and Enteral Nutrition
          Nutrition – Enteral and Parenteral
          Primary Therapeutics of Parenteral/Enteral Nutrition
          Total Parenteral and Enteral Nutrition Course
          Total Parenteral and Enteral Nutrition Teams
          Total Parenteral/Enteral Nutrition for the Graduate Nurse
          Role of the Pharmacist in Total Parenteral and Enteral Nutrition
        `),
      },
    ],
  },
  {
    title: "Nutrition by Disease State",
    categories: [
      {
        title: "TPN by Disease / Patient Population",
        topics: topics(`
          Nutrition and the Renal Failure Patient
          Parenteral Nutrition and the Renal Patient
          Pragmatic Monitoring Parameters for the Renal Patient
          Renal Therapeutics
          The Renal Patient and Medications
          TPN and the Renal Patient
          TPN Case Presentation – the Renally Insufficient Patient
          Anemia and the Cancer Patient
          Cancer and Nutrition
          Cancer and Parenteral Nutrition
          Cancer Chemotherapy
          Clinical Pharmacy Extensions to the Hematology/Oncology Clinic
          Micronutrient Therapy in the Cancer Patient
          Nutrition and the Cancer Patient
          Nutrition Support in the Oncology Patient
          Nutritional Insights Concerning Cancer Patients
          Nutritional Support in the Oncology Patient
          Oncology Medication Kinetics
          Role of the Pharmacist in Oncology Clinic
          Clinical Nutrition and the Critically Ill
          ICU Nutrition
          Nutrition and the Critically Ill
          Nutrition in the Intensive Care Unit
          Nutrition Perles for the Critically Ill Pulmonary Patient
          Parenteral Nutrition and the Intensive Care Patient
          TPN Monitoring for the ICU Nurse
          TPN Pearls for the ICU Patient
          TPN Therapy for the Practicing CCM Physician
          What’s for Dinner in the ICU?
          Geriatric Implications – Clinical Nutrition
          Geriatric Roundtable – Medication Nutrient Implications
          Laboratory Testing and the Geriatric Patient
          Laboratory Texts and the Geriatric Patient
          Medication/Nutrient Interaction in the Elderly
          Nutritional Assessment of the Critically-Ill Geriatric Patient
          Parenteral Nutrition and the Critically-ill Geriatric
          Physical Assessment/Geriatrics
          Cholestasis and Total Parenteral Nutrition: Neonatal vs. Adult
          Clinical Implications of Pediatric Total Parenteral Nutrition
          Parenteral Nutrition for Pediatrics
          Pediatric Parenteral Nutrition
          TPN in the Pediatric Patient
          AIDS and Clinical Nutrition Support
          AIDS and Nutrition
          Nutrition Support in the AIDS Patient
          Nutritional Support and the AIDS Patient
          Clinical Nutrition and the Pulmonologist
          Nutrition and Pulmonary Services?
          Pulmonary Patient and Nutrition
          Nutrition Perles for the Critically Ill Pulmonary Patient
          Clinical Nutrition for the Surgical Resident
          Clinical Nutrition Support and Surgical Outcomes
          Intravenous Fat and the Practicing Surgeon
          Intravenous lipids and Surgery
          Nutrition Assessment in the Traumatized Patient
          Nutrition Therapy and the Burn Patient
          Total Parenteral Nutrition for the Surgical Patient
          Total Parenteral Nutrition and the OB-GYN Surgeon
          GI-TPN update
          Gastroenterology Recent Briefs
          Gastroenterology Review
          Gastrointestinal Medications and the Dietitian
          TPN for the Practicing Gastroenterologist
          What I can do for the Burning Gut?
          Clinical Nutritionand Liver Disease
          Cholestasis and Total Parenteral Nutrition: Neonatal vs. Adult
          Nutrition and Wound Healing
          Wound Care and Nutrition
          Nutritional Monitoring for Patients Undergoing Kidney Transplantation
          Total Parenteral Nutrition and the BMTU Patient
          Selenium and the Bone Marrow Transplant Patient
        `),
      },
      {
        title: "Gastroesophageal Reflux Disease (GERD)",
        topics: topics(`
          An Effective Therapeutic Option for GERD
          Gastroesophageal Reflux Disease Therapy Update
          GERD for the Practicing Pharmacist
          GERD for the Practicing Physician
          GERD Issues for the Critical Care Nurse
          GERD Pharmacology & Therapeutics
          GERD Review
          GERD Therapeutics
        `),
      },
      {
        title: "Cardiovascular / Hypertension / Emergency Medicine",
        topics: topics(`
          Cardiopulmonary Medications
          Cardiovascular Medications
          Cardiovascular Pharmacology for the Emergency Medical Technician
          Cardiopulmonary Resuscitation Course
          High Blood Pressure Measurement Methodologies
          High Blood Pressure Screening
          Hypertension Screening Techniques
          Mean Arterial Blood Pressure Screening
          Patient Education and High Blood Pressure Screening
          Crash Cart Medications
          Emergency Medications
          Emergency Meds and the Critical Care Nurse
          Theophylline Dosing
        `),
      },
      {
        title: "Infectious Disease / Antimicrobials",
        topics: topics(`
          Antivirals/Macrolides
          Fungal Infections
          Iron and Sepsis
          Clinical Nutrition and Systemic Inflammatory Response Syndrome/Sepsis
          Tuberculosis Antibiotic Therapy
          Tuberculosis Therapy
          Rubella Vaccine Therapy
        `),
      },
      {
        title: "Oncology / Chemotherapy Pharmacology",
        topics: topics(`
          Anemia and the Cancer Patient
          Cancer Chemotherapy
          Clinical Pharmacy Extensions to the Hematology/Oncology Clinic
          Chemotherapy and Clinical Pharmacy
          Oncology Medication Kinetics
          Role of the Pharmacist in Oncology Clinic
          Home Parenteral Therapy and Home Chemotherapy
        `),
      },
      {
        title: "Special Clinical Topics",
        topics: topics(`
          AIDS and Clinical Nutrition Support
          Anemia and the Cancer Patient
          Dysregulated? / inflammatory nutrition topics
          Nutrition and Wound Healing
          Refeeding Syndrome
          Oxygen Consumption and Nutrition
          Thiamine Deficiency and Death
          What I can do for the Burning Gut?
        `),
      },
    ],
  },
  {
    title: "Medication–Nutrient & Drug Interactions",
    categories: [
      {
        title: "Medication–Nutrient Interactions",
        topics: topics(`
          Drug/Nutrient Interactions
          Enteral Nutrition and Pharmacy Interactions
          Geriatric Roundtable – Medication Nutrient Implications
          Laboratory Implications: Herbals, Nutrients and Medication Interactions
          Medication/Nutrient Interaction in the Elderly
          Medication/Nutrient Interactions
          Medication/Nutrient-Focused Physical Assessment
          Medications and Enteral Nutrition
          Medicinal-Nutrient Interactions
          Nutrient/Medication Interactions
          Nutrient/Medication Relationships
          Nutrition and Medication Interactions
          Pharmacy-Nutrient Interaction
          Pharmacy/Nutrient Implications
          Phenothiazines – Nutritional Implications
          Sedative/Hypnotics – Nutritional Implications
          TPN and Medication Interactions
          Tricyclics – Nutritional Implications
          Tricyclics/Phenothiazines Pharmacology and Therapeutics
        `),
      },
      {
        title: "Herbals / Complementary & Alternative Medicine",
        topics: topics(`
          Exploring Complementary Therapy
          Herbals
          Herbals and Hypertriglyceridemia
          Herbals and Nutrition Implications
          Immune Implications and Herbals
          Laboratory Implications: Herbals, Nutrients and Medication Interactions
          Alternative Therapies for the Diabetic
          Laetrile
          Megavitamin Therapy
        `),
      },
    ],
  },
  {
    title: "Clinical Pharmacy & Pharmacotherapy",
    categories: [
      {
        title: "Pharmacology / Clinical Pharmacy",
        topics: topics(`
          Clinical Pharmacist’s Role in Total Parenteral Nutrition
          Clinical Pharmacy and Physical Therapy
          Clinical Pharmacy Extensions to the Hematology/Oncology Clinic
          Clinical Pharmacy Implications – Intravenous Fat Emulsions
          Clinical Pharmacy Implications – TPN Tx
          Clinical Pharmacy Intravenous Medication Implications
          Clinical Pharmacy Services in a (Community) Hospital
          Clinical Pharmacy Services in a Teaching (Tertiary) Hospital
          Clinical Pharmacy
          Investigational Medications and the Clinical Pharmacist
          Investigational Medications
          Pharmacist Role in TPEN Therapy
          Pharmacist Role in TPN Therapy
          Pharmacists Role as a Member of the TPEN Team
          Pharmacological Enhancement of Food Intake
          Pharmacy Department Operations
          Pharmacy Implications of Parenteral Nutrition Therapy
          Pharmacy Implications:TPN Therapy
          Pharmacy Role in the Study of Dichloroacetate
          Role of the Clinical Pharmacist in IV Therapy
          Role of the Pharmacist in Total Parenteral and Enteral Nutrition
          Role of the TPEN Pharmacist
          The Hospital Pharmacist
          The Pharmacist’s Role in the Oral Surgery Pain Clinic
          The Physician and Clinical Nutrition
          The Role of the Clinical Pharmacist in Investigational Medications
          TPN for the Practicing Pharmacist
          Total Parenteral Nutrition for the Pharmacist
        `),
      },
      {
        title: "IV Therapy / Injectable Medications",
        topics: topics(`
          Blood Components and IV Therapy Interactions
          Endotoxin and Filtration
          Intravenous Products – Do’s and Don’ts
          Intravenous Therapy
          IV Therapy
          IV Therapy Administration Perles
          Role of the Clinical Pharmacist in IV Therapy
          Pharmaceutical Knowledge in Parenteral Therapy
          Parenteral Therapy Overview
          Parenteral Therapy for the Home Care Pharmacist
        `),
      },
    ],
  },
  {
    title: "Laboratory Monitoring, Assessment & Clinical Evaluation",
    categories: [
      {
        title: "Nutrition Assessment & Laboratory Monitoring",
        topics: topics(`
          Evaluation/Utilization of Lab Tests
          Interpretation of Laboratory Tests
          Laboratory Implications: Herbals, Nutrients and Medication Interactions
          Laboratory Monitoring and the Home Nutrition Patient
          Laboratory Testing and the Geriatric Patient
          Laboratory Tests and Medications
          Laboratory Texts and the Geriatric Patient
          Medication/Nutrient-Focused Physical Assessment
          Nutritional Assessment
          Nutritional Assessment Tools for the General Practitioner
          Nutritional Assessment Tools Needed to Avoid Medico-legal Entrapments
          Nutritional Assessment of the Critically-Ill Geriatric Patient
          Prealbumin as a Nutrition Marker
          The Nutrition Patient and Laboratory Parameters
          The Virtues of Prealbumin
          Tools:Nutrition Assessment
          Use of Rapid Turnover Proteins
        `),
      },
    ],
  },
  {
    title: "Home Care, Administration, Education & Professional Practice",
    categories: [
      {
        title: "Home Care / Ambulatory / Home TPN",
        topics: topics(`
          Ambulatory Care and Parenteral Therapy
          Ambulatory Home Care Services
          Ambulatory Nutrition Patient and Ancillary Services
          Clinical Software Applications for Home Health Care Services
          Home Infusion Roundtable
          Home Parenteral Therapy
          Home Parenteral Therapy and Home Chemotherapy
          Home Therapy/Cost Containment – Why we’re here
          Home TPEN Therapy
          Home TPN
          Home TPN Perles-Pharmacist Role
          Laboratory Monitoring and the Home Nutrition Patient
          Nutritional Support Monitoring for the Home Patient
          Parenteral Therapy for the Home Care Pharmacist
        `),
      },
      {
        title: "Physical Therapy / Interdisciplinary Practice",
        topics: topics(`
          Clinical Nutrition and Physical Therapy
          Clinical Pharmacy and Physical Therapy
          Physical Therapy and Pharmacy
          Physical Therapy/Pharmacy Interactions
          Nutrition and Pulmonary Services?
          Nutritional Support Team Dynamics
        `),
      },
      {
        title: "Nursing / Allied Health / Professional Education",
        topics: topics(`
          Clinical Nutrition for Medical Housestaff
          Clinical Nutrition for the Nurse Practioner
          Clinical Nutrition for the Surgical Resident
          Micronutrient Perles for the Nurse
          Nursing Obligations of Total Parenteral Nutrition
          Parenteral Therapy for the Home Care Pharmacist
          Pharmacist Role as a Member of the TPEN Team
          Practical TPN Therapy Insights for Supportive Personnel
          Preprofessional Student Lecture
          Total Parenteral Nutrition – Nursing Implications
          Total Parenteral Nutrition and the RN
          TPN Monitoring for the ICU Nurse
          What Should the Pharmacy Technician Know about TPN Compounding?
        `),
      },
      {
        title: "Computer Science / Clinical Software / Technology",
        topics: topics(`
          Computer Science and Clinical Nutrition
          Computers and Clinical Nutrition
          Computers- Applications for Nutritional Support Pharmacists
          Clinical Software Applications for Home Health Care Services
        `),
      },
      {
        title: "Administration / Leadership / Healthcare Systems",
        topics: topics(`
          American Society of Nutritional Support Services
          Cost Effectiveness in Nutrition Therapy
          Credentialing Institutional Personnel – Clinical Nutrition
          JCAHO and Clinical Nutrition
          Leadership Obligations
          Long Range Planning
          Pharmacy Department Operations
          Role of the Pharmacist in Diaster Planning
          Thailand Intravenous Symposiums
          Training of Hospital Managers
          USSR Healthcare
        `),
      },
    ],
  },
];