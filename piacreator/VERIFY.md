# PIA Draft Creator: legal and regulatory claims to verify

Everything here is a claim the tool makes or implies. I did not check any of it against the law or NPC text. The repo contains no copy of RA 10173, its IRR, or the NPC Advisory, so there was nothing in the repo to confirm against.

The tool cites only these sources by name: RA 10173 (Data Privacy Act), Sec. 12, Sec. 13, the IRR (disclaimer only), NPC issuances (disclaimer only), NPC Advisory No. 2017-03, the Local Government Code, and the National Archives of the Philippines (NAP) records disposition schedule. It cites no other section numbers, deadlines, retention periods or fees.

Source column: **You** = wording from your build prompt. **Me** = wording I wrote, so it needs the closest look.

## A. Named sources

| # | Claim in the tool | Where it appears | Source | What to check |
|---|---|---|---|---|
| A1 | The draft is based on NPC Advisory No. 2017-03. | Footer disclaimer, Word and Markdown output | You | Advisory number and that it is the right basis for a PIA. |
| A2 | The NPC is updating its PIA guidance through a draft circular, so the template may change. | Same disclaimer | You | Search found an NPC public-consultation draft, "NPC Circular No. 2026 - __" (updated PIA guidelines), on privacy.gov.ph. I did not read the full draft. Confirm its status before publication. |
| A3 | RA 10173 Sec. 12 covers the criteria for processing personal information. | Section 6 label, "Candidate lawful basis for personal information (RA 10173 Sec. 12)" | You | Section number and subject. |
| A4 | RA 10173 Sec. 13 covers sensitive personal information and has its own conditions. | Section 6 label and hint | You (number), Me ("has its own conditions") | Section number, and that the "own conditions" wording is fair. |
| A5 | "Special treatment may apply under the Data Privacy Act. Refer to the Legal Office / DPO." | Shown when the process involves law enforcement, investigation or regulatory functions. Also the register note | You | That the sentence is accurate as worded. The tool applies no exemption. |
| A6 | The disclaimer says the draft does not certify compliance with RA 10173, its IRR, or NPC issuances. | Footer disclaimer | You | Wording only. |

## B. Lawful basis options (Section 6)

| # | Claim | Source | What to check |
|---|---|---|---|
| B1 | Sec. 12 list offered: performance of a public function or mandate under law; legal obligation; consent where used; another basis. | You | Against Sec. 12. Sec. 12(c) covers legal obligation and 12(e) mentions functions of public authority, but "performance of a public function or mandate under law" is your wording, not the statute's. |
| B2 | Sec. 13 list is now separate: consent specific to the purpose; processing provided for by existing laws and regulations that guarantee protection; protecting life and health when the person cannot consent; medical treatment; legal claims or court proceedings, or when provided to government or a public authority; another case. | Me, paraphrased from Sec. 13(a), (b), (c), (e), (f) as read on lawphil.net | Paraphrase against the full text. I left out Sec. 13(d) (lawful and noncommercial objectives of public organizations and their associations) because it does not fit a government office. Confirm that omission. |

## C. Definitions and examples

| # | Claim | Where | Source | What to check |
|---|---|---|---|---|
| C1 | Sensitive personal information includes health, age, civil status, education, government-issued ID numbers and records of offenses. | Threshold question 1 hint, Section 4 hint | Me | Against the definition in RA 10173. |
| C2 | Civil Registry preset lists age and civil status, parentage or legitimacy of a child, cause of death and other health information, and government ID numbers as sensitive. | Preset default text | Me | Each item against the definition. The default says "Confirm the exact list with your DPO." |
| C3 | Social Welfare preset lists age and civil status, health and disability, information about minors, abuse or family crisis in case notes, and government ID numbers as sensitive. | Preset default text | Me | Same. Minors and case notes may not be "sensitive" under the definition. They may just be high-risk. |
| C4 | HR and Payroll preset lists tax, social security, health insurance and housing fund numbers, age, civil status, health information, education records, and administrative or disciplinary case records as sensitive. | Preset default text | Me | Same. |
| C5 | Privileged information means information covered by privileged communication under law. | Section 4 hint | Me | Against the definition. |

## D. Mandate hints by office type (Screen 1 and Section 3 hint)

| # | Claim | Source | What to check |
|---|---|---|---|
| D1 | For provincial, city, municipal and barangay offices, the mandate usually comes from the Local Government Code and local ordinances. | You (city example), Me (province, municipality, barangay variants) | That the Local Government Code is the right pointer for all four. |
| D2 | For national agencies and GOCCs, the mandate comes from the agency charter or enabling law. | You | Fine as a hint, confirm wording. |
| D3 | For state universities and colleges, the mandate comes from the institution's charter or enabling law. | Me | Check. |
| D4 | The presets pre-fill no specific law for any process. The mandate field starts blank. | Me | Confirm you want it this way. |

## E. Retention and disposal (Section 5)

| # | Claim | Source | What to check |
|---|---|---|---|
| E1 | A NAP records disposition schedule governs how long these records are kept and when they may be disposed of. | You | That the NAP is the right authority for every office type in the list, including GOCCs and SUCs. |
| E2 | Default text: "Records are kept only for the period set in the applicable records disposition schedule, and disposed of only as that schedule allows." | Me | Wording. The tool hard-codes no retention period. |
| E3 | Risk and control text tell the office to ask the records officer to identify the applicable NAP schedule. | Me | That "records officer" is the right role name. |

## F. Data subject rights (Section 7)

| # | Claim | Source | What to check |
|---|---|---|---|
| F1 | People may ask for access, correction, and erasure or blocking, and may complain. | You (list of four) | That these match the rights in RA 10173. |
| F2 | Default text: the reply to a complaint tells the person they may bring the complaint to the National Privacy Commission. | Me | That this is accurate for complaints against government offices. |
| F3 | Default text: erasure requests go to the DPO and Legal Office "because some records must be kept under law or records rules." | Me | Wording. |
| F4 | Default text says requests and replies are logged and identity is checked. | Me | Practice, not law. Edit if your offices differ. |

## G. Principles, sharing and notice (risk rules)

| # | Claim | Source | What to check |
|---|---|---|---|
| G1 | The three principle checks are transparency, legitimate purpose and proportionality. | You | Names match the Act. |
| G2 | A privacy notice should be given when data is collected. | Me (risk text) | Whether the law frames it that way. |
| G3 | Sharing personal data with another agency or contractor should be backed by a data sharing agreement or contract terms. | You (flag), Me (control wording) | Whether a data sharing agreement is required in every case. |
| G4 | Automated decisions should have human review, and people should be told how to ask for review. | Me | This is a good-practice control, not a cited legal duty. Confirm. |
| G5 | Monitoring (CCTV) needs visible notices, limited viewing and a retention period. | Me | Same. |

## H. Preset process descriptions (not citations, but they assert how offices work)

| # | Claim | Check |
|---|---|---|
| H1 | Civil Registry default: hospitals, clinics and midwives report births and deaths. Courts and agencies send decrees or orders. Reports and copies go to other offices "as the law requires." | Whether that matches how your target offices work. No agency is named. |
| H2 | HR default: payroll and benefit details go to the bank, benefit agencies and oversight bodies "as required." | Same. |
| H4 | Business Permits, Scholarships and Health Services presets (added after review) describe typical processes in the same way, including routing to clearance offices, schools, hospitals, insurers and health authorities. | Same. Health lists diagnoses, test results, immunization and disease program records as sensitive health information. |
| H3 | Social Welfare default: case information may be shared with partner agencies, hospitals, schools or barangay officials. | Same. |

## I. Not legal claims, but your call

| # | Item | Note |
|---|---|---|
| I1 | The threshold rule: any Yes answer means a full PIA, all No means a short record. | My rule of thumb. The tool says so on screen and in the output. The six questions are from your prompt. Check them against the Advisory. |
| I2 | Risk scoring: score = likelihood x impact. Bands: Low 1 to 4, Medium 5 to 9, High 10 to 16, Critical 20 to 25. | My own bands, not from the NPC. |
| I3 | Default likelihood and impact for each of the 22 rules. | My own suggestions. Rules are in the `RULES` table in `index.html`. |
| I4 | Short record contents: identity, description, inventory, lawful basis, sign-off. | My choice. |
| I5 | A "Not sure" answer starts with likelihood 2 instead of the rule default and is labeled "Verify first". | My choice. |
| I6 | Next review date is pre-filled one year after today and flagged as a suggested default. | My choice. I searched NPC material and did not find an annual review interval in Advisory No. 2017-03 (the snippets show a review process but no fixed interval). Please check the full advisory before telling users it is required. The tool says it is a suggestion, not an NPC deadline. |
| I7 | The 3 x 3 versus 5 x 5 note: 1 to 2 is low, 3 is medium, 4 to 5 is high. | My rough mapping, not from your training material. |
