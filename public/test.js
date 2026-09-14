const totalQuestions = 18;
let currentSlide = 1;
const userSelections = {}; 

const answerLabels = ['R', 'I', 'A', 'S', 'E', 'C'];

const pack = (f, t, e, c, su, m, sk, p) => ({fields: f, tools: t, environment: e, careers: c, subjects: su, major: m, skills: sk, planB: p});

// DATABASE 120 TỔ HỢP 3 CHỮ CÁI (Đã chuẩn hóa chữ cái thứ 2 không viết hoa trong 1 cụm từ)
const resultsDatabase = {
    "RIA": pack("Physical trades, Engineering & mechanics", "Analytical models, software & diagnostic testing", "Design studios, agencies & flexible creative spaces", "Automotive design engineer, Robotics hardware researcher, Biomedical equipment specialist", "Math, Physics, Art/design", "Mech engineering, Industrial design", "CAD, spatial reasoning, hardware prototyping", "Product tester, Technical illustrator"),
    "RIC": pack("Physical trades, Engineering & mechanics", "Analytical models, software & diagnostic testing", "Highly structured offices, predictable routines & strict compliance", "Quality control inspector, CNC programmer, Civil engineering draftsman", "Math, Physics, IT", "Civil engineering, Computer science", "CNC programming, QA testing, structural math", "QA auditor, Systems technician"),
    "RIE": pack("Physical trades, Engineering & mechanics", "Analytical models, software & diagnostic testing", "Fast-paced corporate offices, competitive arenas & boardrooms", "Civil engineering manager, Tech entrepreneur, Construction project lead", "Math, Physics, Economics", "Construction mgt, Engineering", "Project bidding, site supervision, resource allocation", "Technical sales, Building inspector"),
    "RIS": pack("Physical trades, Engineering & mechanics", "Analytical models, software & diagnostic testing", "Hospitals, schools, community centers & high human contact", "Orthotist, Biomedical equipment technician, Kinesiologist", "Biology, Physics, PE", "Kinesiology, Biomedical engineering", "Biomechanics, equipment calibration, patient handling", "Ergonomics consultant, Sports equip tester"),
    "RAI": pack("Physical trades, Engineering & mechanics", "Creativity, out-of-the-box thinking & aesthetic design", "Labs, research hubs & independent tech spaces", "Architectural restorer, Prototype fabricator, Industrial designer", "Art, Math, Physics", "Architecture, Fine arts", "3D modeling, material restoration, structural analysis", "Set designer, CAD drafter"),
    "RAC": pack("Physical trades, Engineering & mechanics", "Creativity, out-of-the-box thinking & aesthetic design", "Highly structured offices, predictable routines & strict compliance", "CAD drafter, Set builder, Cartographer", "Art, IT, Geography", "GIS mapping, Drafting technology", "Spatial mapping, cartography, technical drawing", "Urban planner assistant, Topographic surveyor"),
    "RAE": pack("Physical trades, Engineering & mechanics", "Creativity, out-of-the-box thinking & aesthetic design", "Fast-paced corporate offices, competitive arenas & boardrooms", "Custom furniture owner, High-end commercial landscaper, Freelance architectural designer", "Art, Shop/vocational, Business", "Landscape architecture, Business admin", "Custom fabrication, client pitching, spatial layout", "Prop maker, Commercial staging lead"),
    "RAS": pack("Physical trades, Engineering & mechanics", "Creativity, out-of-the-box thinking & aesthetic design", "Hospitals, schools, community centers & high human contact", "Art therapist, Custom wheelchair designer, Prosthetics sculptor", "Art, Biology, Shop/vocational", "Art therapy, Prosthetics", "Sculpting, empathic communication, physical adaptation", "Orthotics tech, Adaptive toy maker"),
    "RCI": pack("Physical trades, Engineering & mechanics", "Spreadsheets, auditing, strict procedures & categorization", "Labs, research hubs & independent tech spaces", "Land surveyor, Building code inspector, Field quality auditor", "Physics, Math, Law/civics", "Land surveying, Civil engineering", "Code auditing, precise measurement, regulatory compliance", "Property assessor, Safety inspector"),
    "RCA": pack("Physical trades, Engineering & mechanics", "Spreadsheets, auditing, strict procedures & categorization", "Design studios, agencies & flexible creative spaces", "Technical illustrator, Manual creator, Architectural drafting specialist", "IT, Art, English", "Technical writing, Graphic design", "Vector illustration, manual formatting, assembly logic", "UI/UX wireframer, Patent drafter"),
    "RCE": pack("Physical trades, Engineering & mechanics", "Spreadsheets, auditing, strict procedures & categorization", "Fast-paced corporate offices, competitive arenas & boardrooms", "Logistics facility manager, Plant operations supervisor, Construction compliance director", "Math, Business, IT", "Supply chain mgt, Logistics", "Facility ops, inventory software, compliance logging", "Logistics coordinator, Fleet manager"),
    "RCS": pack("Physical trades, Engineering & mechanics", "Spreadsheets, auditing, strict procedures & categorization", "Hospitals, schools, community centers & high human contact", "Workplace safety inspector, Ergonomics evaluator, Environmental health technician", "Biology, PE, Civics", "Occupational health & safety", "Hazard spotting, protocol training, incident reporting", "EHS inspector, Wellness facility ops"),
    "REI": pack("Physical trades, Engineering & mechanics", "Persuasion, public speaking & strategic negotiation", "Labs, research hubs & independent tech spaces", "Technical sales engineer, Construction estimator / bidder, Industrial solutions specialist", "Math, Physics, Business", "Industrial engineering, Business", "B2B solution sales, cost modeling, technical specs", "Tech procurement, Industrial estimator"),
    "REA": pack("Physical trades, Engineering & mechanics", "Persuasion, public speaking & strategic negotiation", "Design studios, agencies & flexible creative spaces", "Commercial landscaper, Renovation contractor, Stage production contractor", "Business, Art, Shop/vocational", "Construction mgt, Architecture", "Subcontractor negotiation, aesthetic planning, renovation ops", "Property developer, Site manager"),
    "REC": pack("Physical trades, Engineering & mechanics", "Persuasion, public speaking & strategic negotiation", "Highly structured offices, predictable routines & strict compliance", "Construction operations manager, Fleet director, Industrial logistics director", "Math, Business, Geography", "Operations mgt, Supply chain", "Route optimization, cost control, fleet logistics", "Freight broker, Operations analyst"),
    "RES": pack("Physical trades, Engineering & mechanics", "Persuasion, public speaking & strategic negotiation", "Hospitals, schools, community centers & high human contact", "Union representative / organizer, Trades apprenticeship director, Safety program coordinator", "Civics, Business, PE", "Labor relations, Trade school", "Trade coaching, public advocacy, safety leadership", "Union representative, Voc-tech instructor"),
    "RSI": pack("Physical trades, Engineering & mechanics", "Empathy, active listening, coaching & emotional support", "Labs, research hubs & independent tech spaces", "Physical therapist, Sports medicine specialist, Orthotist / prosthetist", "Biology, Physics, PE", "Sports medicine, Physical therapy", "Movement analysis, rehab tech ops, biomechanical assessment", "Orthopedic device rep, Ergonomist"),
    "RSA": pack("Physical trades, Engineering & mechanics", "Empathy, active listening, coaching & emotional support", "Design studios, agencies & flexible creative spaces", "Special education shop teacher, Woodworking instructor, Custom stage craftsman", "Shop/vocational, PE, English", "Vocational education, Studio arts", "Workshop safety, pedagogy, metal/wood crafting", "Maker-space manager, Tech theater lead"),
    "RSC": pack("Physical trades, Engineering & mechanics", "Empathy, active listening, coaching & emotional support", "Highly structured offices, predictable routines & strict compliance", "Occupational health technician, Vocational rehabilitation aide, Physical safety educator", "Health/PE, IT, Math", "Occupational therapy assistant", "Safety instruction, equipment logging, first-aid", "Fitness tech support, Safety trainer"),
    "RSE": pack("Physical trades, Engineering & mechanics", "Empathy, active listening, coaching & emotional support", "Fast-paced corporate offices, competitive arenas & boardrooms", "Search and rescue coordinator, Fire captain, Wilderness expedition director", "PE, Earth science, Civics", "Emergency mgt, Forestry", "Wilderness navigation, crisis response, resource deployment", "Park ranger, Risk management consultant"),

    "IRA": pack("Science, tech, medicine & academia", "Tangible machinery, hand tools & physical building", "Design studios, agencies & flexible creative spaces", "Archaeologist, Materials scientist, Geological surveyor", "History, Earth sci, Physics", "Archaeology, Geology", "Field sampling, artifact cataloging, material analysis", "Environmental surveyor, GIS analyst"),
    "IRC": pack("Science, tech, medicine & academia", "Tangible machinery, hand tools & physical building", "Highly structured offices, predictable routines & strict compliance", "Environmental auditor, Geological technician, Field researcher", "Chemistry, Biology, Math", "Environmental sci, Quality control", "Lab testing, data logging, strict protocol adherence", "Water quality tech, Regulatory auditor"),
    "IRE": pack("Science, tech, medicine & academia", "Tangible machinery, hand tools & physical building", "Fast-paced corporate offices, competitive arenas & boardrooms", "Lab operations manager, Field research director, Lead archaeologist", "Chemistry, Business, Math", "Lab management, Biotech", "Grant budgeting, lab oversight, feasibility analysis", "Clinical trial lead, Science product manager"),
    "IRS": pack("Science, tech, medicine & academia", "Tangible machinery, hand tools & physical building", "Hospitals, schools, community centers & high human contact", "Veterinary surgeon, Kinesiologist, Wildlife biologist", "Biology, Chemistry, PE", "Veterinary sci, Zoology", "Animal handling, surgical assisting, diagnostics", "Wildlife conservationist, Vet pharma sales"),
    "IAR": pack("Science, tech, medicine & academia", "Creativity, out-of-the-box thinking & aesthetic design", "Workshops, outdoors, field sites & moving constantly", "Forensic photographer, GIS mapper, Medical illustrator", "Art, Biology, IT", "Medical illustration, Forensic sci", "Photogrammetry, 3D anatomy modeling, spatial rendering", "Crime scene photographer, Animation consultant"),
    "IAC": pack("Science, tech, medicine & academia", "Creativity, out-of-the-box thinking & aesthetic design", "Highly structured offices, predictable routines & strict compliance", "UX researcher, Data visualization specialist, Scientific editor", "IT, Math, Psychology", "Human-computer interaction (HCI)", "UX research, statistical modeling, data visualization", "Market researcher, Usability tester"),
    "IAE": pack("Science, tech, medicine & academia", "Creativity, out-of-the-box thinking & aesthetic design", "Fast-paced corporate offices, competitive arenas & boardrooms", "Lead software architect, Scientific author, R&D consultant", "IT, Economics, English", "Software engineering, Tech writing", "System architecture, R&D strategy, technical writing", "Tech consultant, Product owner"),
    "IAS": pack("Science, tech, medicine & academia", "Creativity, out-of-the-box thinking & aesthetic design", "Hospitals, schools, community centers & high human contact", "Anthropologist, Cognitive psychologist, Clinical social researcher", "Psychology, Sociology, Math", "Anthropology, Sociology", "Qualitative coding, statistical surveying, field interviewing", "Public policy analyst, HR analytics"),
    "ICR": pack("Science, tech, medicine & academia", "Spreadsheets, auditing, strict procedures & categorization", "Workshops, outdoors, field sites & moving constantly", "Lab quality assurance analyst, Environmental compliance specialist, Forensic science technician", "Chemistry, Law, Math", "Forensic science, Quality assurance", "Chain of custody, spectrometry, chemical analysis", "Environmental compliance, Crime lab auditor"),
    "ICA": pack("Science, tech, medicine & academia", "Spreadsheets, auditing, strict procedures & categorization", "Design studios, agencies & flexible creative spaces", "Statistician, Bioinformatics programmer, Data visualization analyst", "Math, IT, Biology", "Bioinformatics, Data science", "Algorithmic modeling, R/Python, data wrangling", "Actuary, Quantitative financial analyst"),
    "ICE": pack("Science, tech, medicine & academia", "Spreadsheets, auditing, strict procedures & categorization", "Fast-paced corporate offices, competitive arenas & boardrooms", "Actuary, Information security director, Quantitative financial analyst", "Math, IT, Economics", "Finance, Information security", "Actuarial math, risk modeling, quantitative auditing", "Financial auditor, Risk manager"),
    "ICS": pack("Science, tech, medicine & academia", "Spreadsheets, auditing, strict procedures & categorization", "Hospitals, schools, community centers & high human contact", "Public health epidemiologist, Clinical trial monitor, Medical records researcher", "Biology, Math, Health", "Public health, Epidemiology", "Disease tracking, clinical data auditing, statistical analysis", "Medical records manager, Health data analyst"),
    "IER": pack("Science, tech, medicine & academia", "Persuasion, public speaking & strategic negotiation", "Workshops, outdoors, field sites & moving constantly", "Aerospace project manager, Biotech field operations lead, Mining exploration director", "Earth sci, Physics, Business", "Mining/aerospace engineering", "Resource exploration, project logistics, feasibility math", "Clean-tech consultant, Energy analyst"),
    "IEA": pack("Science, tech, medicine & academia", "Persuasion, public speaking & strategic negotiation", "Design studios, agencies & flexible creative spaces", "R&D director, Chief technology officer (CTO), Scientific innovation director", "Biology/IT, Business, English", "Innovation mgt, Biotech", "Tech roadmapping, IP pitching, R&D portfolio strategy", "Venture capital scout, Tech marketer"),
    "IEC": pack("Science, tech, medicine & academia", "Persuasion, public speaking & strategic negotiation", "Highly structured offices, predictable routines & strict compliance", "Chief data officer, Financial quantitative analyst, Regulatory intelligence director", "IT, Math, Business/law", "Data governance, Finance", "Quantitative compliance modeling, algorithmic auditing", "Chief compliance officer, Tech auditor"),
    "IES": pack("Science, tech, medicine & academia", "Persuasion, public speaking & strategic negotiation", "Hospitals, schools, community centers & high human contact", "University dean, Think-tank director, Medical research director", "Biology, English, Civics", "Public policy, Bioethics", "Grant writing, institutional governance, policy analysis", "NGO director, Think-tank analyst"),
    "ISR": pack("Science, tech, medicine & academia", "Empathy, active listening, coaching & emotional support", "Workshops, outdoors, field sites & moving constantly", "Sports biomechanist, Neurologist, Field epidemiologist", "Physics, Biology, PE", "Biomechanics, Kinesiology", "Gait analysis, neuro-assessment, device calibration", "Sports tech R&D, Rehab equipment sales"),
    "ISA": pack("Science, tech, medicine & academia", "Empathy, active listening, coaching & emotional support", "Design studios, agencies & flexible creative spaces", "Clinical researcher, Curriculum developer, Educational psychologist", "Psychology, Math, English", "Cognitive psychology, EdTech", "Learning analytics, curriculum validation, cognitive testing", "Instructional designer, EdTech strategist"),
    "ISC": pack("Science, tech, medicine & academia", "Empathy, active listening, coaching & emotional support", "Highly structured offices, predictable routines & strict compliance", "Medical technologist, Diagnostics specialist, Public health analyst", "Chemistry, Biology, IT", "Medical technology, Clinical lab", "Assay operations, lab automation, pathology logging", "Diagnostic sales, Lab ops coordinator"),
    "ISE": pack("Science, tech, medicine & academia", "Empathy, active listening, coaching & emotional support", "Fast-paced corporate offices, competitive arenas & boardrooms", "Hospital administrator, Chief medical officer, Public health policy director", "Biology, Business, Economics", "Healthcare admin, Public health", "Systemic health analysis, resource allocation, medical governance", "Hospital admin, Health policy consultant"),

    "ARI": pack("Design, media, arts, writing & entertainment", "Tangible machinery, hand tools & physical building", "Labs, research hubs & independent tech spaces", "3D animator, Sound engineer, Special effects artist", "IT, Art, Physics", "Animation, Audio engineering", "VFX pipeline, sound synthesis, 3D asset modeling", "Game tester, VR environment builder"),
    "ARC": pack("Design, media, arts, writing & entertainment", "Tangible machinery, hand tools & physical building", "Highly structured offices, predictable routines & strict compliance", "Jeweler, Costume designer, Ceramics artist", "Art, Chemistry, History", "Fine arts, Museology", "Casting, artifact restoration, material precision", "Luxury goods appraiser, Craft manufacturer"),
    "ARE": pack("Design, media, arts, writing & entertainment", "Tangible machinery, hand tools & physical building", "Fast-paced corporate offices, competitive arenas & boardrooms", "Freelance videographer, Custom auto designer, Independent architect", "Art, Business, Media", "Cinematography, Architecture", "Spatial design, commercial video production, client pitching", "Real estate marketer, Corporate event producer"),
    "ARS": pack("Design, media, arts, writing & entertainment", "Tangible machinery, hand tools & physical building", "Hospitals, schools, community centers & high human contact", "Dance instructor, Culinary arts teacher, Theater director", "Drama, PE, English", "Theater ed, Culinary arts", "Performance directing, group instruction, creative coaching", "Arts admin, Corporate team-building coach"),
    "AIR": pack("Design, media, arts, writing & entertainment", "Analytical models, software & diagnostic testing", "Workshops, outdoors, field sites & moving constantly", "Industrial architect, Ergonomic product designer, 3D concept artist", "Art, Physics, Math", "Industrial design, Ergonomics", "CAD, ergonomic prototyping, concept sketching", "UX hardware designer, Retail space planner"),
    "AIC": pack("Design, media, arts, writing & entertainment", "Analytical models, software & diagnostic testing", "Highly structured offices, predictable routines & strict compliance", "Web developer, Digital archivist, UI/UX designer", "IT, Art, English", "Web design, Digital media", "UI/UX coding (HTML/CSS), digital asset categorization", "Content manager, Frontend developer"),
    "AIE": pack("Design, media, arts, writing & entertainment", "Analytical models, software & diagnostic testing", "Fast-paced corporate offices, competitive arenas & boardrooms", "Creative director, Advertising strategist, Brand manager", "Art, Business, Psychology", "Marketing, Brand mgt", "Creative direction, ad campaign strategy, visual branding", "Brand strategist, PR account executive"),
    "AIS": pack("Design, media, arts, writing & entertainment", "Analytical models, software & diagnostic testing", "Hospitals, schools, community centers & high human contact", "Investigative journalist, Documentary filmmaker, Science writer", "English, Civics, Media", "Journalism, Communications", "Investigative writing, documentary storytelling, media synthesis", "Corporate communications, Grant writer"),
    "ACR": pack("Design, media, arts, writing & entertainment", "Spreadsheets, auditing, strict procedures & categorization", "Workshops, outdoors, field sites & moving constantly", "Printmaker, Typographer, Calligrapher", "Art, IT, English", "Graphic design, Printmaking", "Typography formatting, pre-press setup, layout precision", "Packaging designer, Desktop publisher"),
    "ACI": pack("Design, media, arts, writing & entertainment", "Spreadsheets, auditing, strict procedures & categorization", "Labs, research hubs & independent tech spaces", "UI designer, Museum curator, Digital content archivist", "Art, History, IT", "Library sci, Museum studies", "Metadata tagging, digital asset cataloging, UI layout", "Digital archivist, UX content strategist"),
    "ACE": pack("Design, media, arts, writing & entertainment", "Spreadsheets, auditing, strict procedures & categorization", "Fast-paced corporate offices, competitive arenas & boardrooms", "Publishing editor, Broadcast manager, Media director", "English, Business, Media", "Publishing, Media mgt", "Editorial governance, broadcast ops, content curation", "Speechwriter, Corporate content strategist"),
    "ACS": pack("Design, media, arts, writing & entertainment", "Spreadsheets, auditing, strict procedures & categorization", "Hospitals, schools, community centers & high human contact", "Wedding planner, Floral arranger, Event stylist", "Art, Family sci, Business", "Event planning, Interior design", "Spatial styling, vendor coordination, client relations", "Hospitality manager, Commercial set stylist"),
    "AER": pack("Design, media, arts, writing & entertainment", "Persuasion, public speaking & strategic negotiation", "Workshops, outdoors, field sites & moving constantly", "Theatrical director, Fashion house founder, Set designer", "Drama, Business, Shop", "Arts entrepreneurship", "Set construction oversight, talent directing, fashion ops", "Trade show manager, Experiential marketer"),
    "AEI": pack("Design, media, arts, writing & entertainment", "Persuasion, public speaking & strategic negotiation", "Workshops, outdoors, field sites & moving constantly", "Marketing agency owner, Tech concept artist, R&D creative lead", "Art, IT, Business", "Digital marketing, Media", "Concept art, tech trend forecasting, creative pitching", "Metaverse asset strategist, Ad agency lead"),
    "AEC": pack("Design, media, arts, writing & entertainment", "Persuasion, public speaking & strategic negotiation", "Highly structured offices, predictable routines & strict compliance", "Film producer, Gallery director, Art auction coordinator", "Media, Math, Business", "Arts finance, Film production", "Film budgeting, art curation, auction coordination", "Art investment advisor, Licensing manager"),
    "AES": pack("Design, media, arts, writing & entertainment", "Persuasion, public speaking & strategic negotiation", "Hospitals, schools, community centers & high human contact", "Actor, Motivational speaker, Lead musician", "Drama, English, Speech", "Communications, Theater", "Charismatic delivery, public speaking, audience engagement", "Corporate coach, Brand ambassador"),
    "ASR": pack("Design, media, arts, writing & entertainment", "Empathy, active listening, coaching & emotional support", "Workshops, outdoors, field sites & moving constantly", "Drama therapist, Holistic massage therapist, Somatic movement coach", "Drama, PE, Psychology", "Drama therapy, Somatics", "Movement facilitation, active listening, body mechanics", "Wellness coach, Conflict mediator"),
    "ASI": pack("Design, media, arts, writing & entertainment", "Empathy, active listening, coaching & emotional support", "Labs, research hubs & independent tech spaces", "Sociological author, Specialized counselor, Humanities professor", "English, Psychology, Sociology", "Philosophy, Humanities", "Literary synthesis, qualitative research, cultural analysis", "Think-tank writer, Ethics consultant"),
    "ASC": pack("Design, media, arts, writing & entertainment", "Empathy, active listening, coaching & emotional support", "Highly structured offices, predictable routines & strict compliance", "Arts grant administrator, Choir director, Community arts organizer", "Art/music, Civics, Math", "Non-profit admin, Social work", "Grant writing, community organizing, event logistics", "Municipal arts coordinator, Foundation manager"),
    "ASE": pack("Design, media, arts, writing & entertainment", "Empathy, active listening, coaching & emotional support", "Fast-paced corporate offices, competitive arenas & boardrooms", "Talent agent, Arts non-profit director, Performing arts coach", "Drama, Business, Law", "Entertainment law, PR", "Talent scouting, contract negotiation, PR strategy", "HR recruiter, Artist relations rep"),

    "SRI": pack("Healthcare, education, counseling & social work", "Tangible machinery, hand tools & physical building", "Labs, research hubs & independent tech spaces", "Radiologic technologist, Dental hygienist, Physical therapy assistant", "Biology, PE, Math", "Radiography, Physical therapy", "Medical imaging, diagnostic assisting, patient handling", "Med-tech sales, Clinic ops coordinator"),
    "SRA": pack("Healthcare, education, counseling & social work", "Tangible machinery, hand tools & physical building", "Design studios, agencies & flexible creative spaces", "Yoga instructor, Physical education teacher, Wilderness therapy guide", "PE, Biology, Geography", "Outdoor recreation, Kinesiology", "Wilderness safety, fitness coaching, group facilitation", "Eco-tourism guide, Corporate wellness manager"),
    "SRC": pack("Healthcare, education, counseling & social work", "Tangible machinery, hand tools & physical building", "Highly structured offices, predictable routines & strict compliance", "Floor registered nurse, Paramedic, Surgical technologist", "Biology, Health, Math", "Nursing, Emergency medicine", "Triage assessment, surgical prep, clinical protocol", "Health QA auditor, Medical case manager"),
    "SRE": pack("Healthcare, education, counseling & social work", "Tangible machinery, hand tools & physical building", "Fast-paced corporate offices, competitive arenas & boardrooms", "Fire chief, Disaster relief coordinator, Outdoor youth program leader", "PE, Civics, Psychology", "Emergency mgt, Public safety", "Crisis leadership, fire safety protocol, youth mentoring", "Disaster prep consultant, Safety director"),
    "SIR": pack("Healthcare, education, counseling & social work", "Analytical models, software & diagnostic testing", "Workshops, outdoors, field sites & moving constantly", "Physician assistant, Dietitian, Clinical diagnostician", "Biology, Chemistry, Health", "Pre-med, Clinical nutrition", "Diagnostic assessment, nutritional planning, pathology", "Medical science liaison, Corporate health coach"),
    "SIA": pack("Healthcare, education, counseling & social work", "Analytical models, software & diagnostic testing", "Design studios, agencies & flexible creative spaces", "Psychology professor, Speech pathologist, Curriculum developer", "Psychology, English, Biology", "Special ed, Speech pathology", "Behavioral assessment, individualized teaching, speech therapy", "EdTech content designer, Corporate trainer"),
    "SIC": pack("Healthcare, education, counseling & social work", "Analytical models, software & diagnostic testing", "Highly structured offices, predictable routines & strict compliance", "Pharmacist, Medical records coordinator, Clinical trial assistant", "Chemistry, Math, IT", "Pharmacology, Health informatics", "Med records auditing, clinical trial assisting, pharmacotherapy", "Pharma sales rep, Health data coordinator"),
    "SIE": pack("Healthcare, education, counseling & social work", "Analytical models, software & diagnostic testing", "Fast-paced corporate offices, competitive arenas & boardrooms", "Public health director, Epidemiologist manager, Healthcare strategy administrator", "Health, Civics, Economics", "Public health admin, Policy", "Policy analysis, epidemiological resource mgt, stakeholder alignment", "Health NGO manager, Insurance ops analyst"),
    "SAR": pack("Healthcare, education, counseling & social work", "Creativity, out-of-the-box thinking & aesthetic design", "Workshops, outdoors, field sites & moving constantly", "Music therapist, Cosmetologist, Art teacher", "Art/music, Psychology, Biology", "Music/art therapy, Cosmetology", "Expressive arts facilitation, personal care, therapeutic coaching", "Senior living coordinator, Adaptive arts teacher"),
    "SAI": pack("Healthcare, education, counseling & social work", "Creativity, out-of-the-box thinking & aesthetic design", "Labs, research hubs & independent tech spaces", "Marriage and family therapist, Theologian, Philosophy professor", "Psychology, Philosophy, English", "Counseling, Theology", "Pastoral care, interpersonal mediation, philosophical analysis", "EAP manager, Ethics officer"),
    "SAC": pack("Healthcare, education, counseling & social work", "Creativity, out-of-the-box thinking & aesthetic design", "Highly structured offices, predictable routines & strict compliance", "Instructional designer, Special ed coordinator, Program developer", "English, IT, Psychology", "Instructional design, EdTech", "Curriculum architecture, learner assessment, accessibility styling", "Corporate learning designer, HR onboarding lead"),
    "SAE": pack("Healthcare, education, counseling & social work", "Creativity, out-of-the-box thinking & aesthetic design", "Fast-paced corporate offices, competitive arenas & boardrooms", "Non-profit founder, Public relations for charities, Community outreach advocate", "Civics, Psychology, Business", "Non-profit mgt, Sociology", "Community advocacy, grassroots organizing, fundraising", "CSR lead, PR specialist"),
    "SCR": pack("Healthcare, education, counseling & social work", "Spreadsheets, auditing, strict procedures & categorization", "Workshops, outdoors, field sites & moving constantly", "Dental assistant, Ward clerk, Physical therapy aide", "Health, IT, English", "Medical office admin", "Patient intake, scheduling, equipment sterilization, EHR entry", "Practice manager, Patient experience coord"),
    "SCI": pack("Healthcare, education, counseling & social work", "Spreadsheets, auditing, strict procedures & categorization", "Labs, research hubs & independent tech spaces", "School counselor, Financial aid officer, Academic advisor", "Math, Psychology, English", "Higher ed admin, Financial aid", "Academic counseling, financial aid planning, career assessment", "Admissions director, University recruiter"),
    "SCA": pack("Healthcare, education, counseling & social work", "Spreadsheets, auditing, strict procedures & categorization", "Design studios, agencies & flexible creative spaces", "Event coordinator (Non-profit), Librarian, Community planner", "History, Civics, IT", "Urban studies, Library sci", "Event logistics, archival systems, volunteer management", "Community events manager, Museum program coord"),
    "SCE": pack("Healthcare, education, counseling & social work", "Spreadsheets, auditing, strict procedures & categorization", "Fast-paced corporate offices, competitive arenas & boardrooms", "Human resources manager, School principal, Corporate trainer", "Psychology, Business, English", "Human resources, Education", "Corporate training, dispute resolution, talent development", "HR business partner, Exec onboarding lead"),
    "SER": pack("Healthcare, education, counseling & social work", "Persuasion, public speaking & strategic negotiation", "Workshops, outdoors, field sites & moving constantly", "Police sergeant, Disaster relief coordinator, Field operations chief", "Civics, PE, Psychology", "Criminal justice, Public safety", "Tactical ops leadership, crisis negotiation, team protection", "Private security manager, Emergency planner"),
    "SEI": pack("Healthcare, education, counseling & social work", "Persuasion, public speaking & strategic negotiation", "Labs, research hubs & independent tech spaces", "Policy analyst, Healthcare administrator, Social reform researcher", "Civics, Math, Psychology", "Public policy, Sociology", "Policy impact analysis, systemic reform, social program auditing", "Gov relations specialist, Social impact consultant"),
    "SEA": pack("Healthcare, education, counseling & social work", "Persuasion, public speaking & strategic negotiation", "Design studios, agencies & flexible creative spaces", "Life coach, Corporate trainer, Motivational speaker", "English, Speech, Business", "Communications, Exec coaching", "Leadership coaching, motivational speaking, speechwriting", "Change mgt consultant, Exec search recruiter"),
    "SEC": pack("Healthcare, education, counseling & social work", "Persuasion, public speaking & strategic negotiation", "Highly structured offices, predictable routines & strict compliance", "Social services director, Alumni relations manager, Community organizer", "Civics, Business, Math", "Social work admin, Public admin", "Donor relations, community program oversight, board reporting", "Philanthropy director, Alumni relations mgt"),

    "ERI": pack("Business, law, politics, sales & management", "Tangible machinery, hand tools & physical building", "Labs, research hubs & independent tech spaces", "Heavy machinery sales, Real estate developer, Technical sales representative", "Business, Math, Physics", "Real estate dev, Tech sales", "Commercial property sales, tech product pitching, site prospecting", "Industrial equipment broker, Procurement manager"),
    "ERA": pack("Business, law, politics, sales & management", "Tangible machinery, hand tools & physical building", "Design studios, agencies & flexible creative spaces", "Luxury contractor, Architecture firm partner, Real estate flipper", "Business, Art, Math", "Architecture, Construction mgt", "Property acquisition, high-end sales, aesthetic management", "Luxury real estate agent, Architectural sales"),
    "ERC": pack("Business, law, politics, sales & management", "Tangible machinery, hand tools & physical building", "Highly structured offices, predictable routines & strict compliance", "Supply chain director, Shipping manager, Construction manager", "Business, Math, IT", "Supply chain mgt, Logistics", "Freight ops, inventory cost control, logistics optimization", "3PL account lead, Supply chain risk consultant"),
    "ERS": pack("Business, law, politics, sales & management", "Tangible machinery, hand tools & physical building", "Hospitals, schools, community centers & high human contact", "Military officer, Parks and rec director, Sports team manager", "PE, Business, Civics", "Sports mgt, Military sci", "Athletic program directing, personnel mgt, tactical comman", "Arena ops manager, Private security logistics"),
    "EIR": pack("Business, law, politics, sales & management", "Analytical models, software & diagnostic testing", "Workshops, outdoors, field sites & moving constantly", "IT director, Manufacturing VP, Industrial engineering manager", "IT, Business, Physics", "IT mgt, Industrial engineering", "Enterprise IT sales, vendor strategy, technical ops leadership", "Industrial tech consultant, B2B software sales"),
    "EIA": pack("Business, law, politics, sales & management", "Analytical models, software & diagnostic testing", "Design studios, agencies & flexible creative spaces", "Management consultant, Venture capitalist, Strategic planner", "Business, Math, Psychology", "Finance, VC strategy", "VC scouting, business valuation, corporate innovation strategy", "M&A advisor, Corporate strategy manager"),
    "EIC": pack("Business, law, politics, sales & management", "Analytical models, software & diagnostic testing", "Highly structured offices, predictable routines & strict compliance", "Chief financial officer (CFO), Economics director, Financial strategist", "Math, Economics, Business", "Corporate finance", "Financial modeling, risk governance, quantitative reporting", "Investment banker, Chief risk officer"),
    "EIS": pack("Business, law, politics, sales & management", "Analytical models, software & diagnostic testing", "Hospitals, schools, community centers & high human contact", "NGO director, Healthcare startup founder, Educational administrator", "Civics, Business, Health", "Healthcare admin, Public policy", "Institutional fundraising, NGO leadership, policy advocacy", "Foundation director, Impact investment analyst"),
    "EAR": pack("Business, law, politics, sales & management", "Creativity, out-of-the-box thinking & aesthetic design", "Workshops, outdoors, field sites & moving constantly", "High-end real estate broker, Fashion buyer, Boutique owner", "Business, Art, Math", "Luxury merchandising, Real estate", "Retail strategy, high-ticket brokerage, client negotiation", "Luxury brand ops, Art auction manager"),
    "EAI": pack("Business, law, politics, sales & management", "Creativity, out-of-the-box thinking & aesthetic design", "Labs, research hubs & independent tech spaces", "Advertising executive, Marketing VP, Brand strategy director", "Art, Business, Psychology", "Marketing, Advertising", "Brand architecture, media campaign strategy, agency leadership", "CMO track, Digital growth consultant"),
    "EAC": pack("Business, law, politics, sales & management", "Creativity, out-of-the-box thinking & aesthetic design", "Highly structured offices, predictable routines & strict compliance", "Corporate brand manager, Production manager, Advertising director", "Media, Business, Math", "Brand mgt, Finance", "Media buying, ad campaign production, enterprise account mgt", "Commercial studio lead, Corporate comms director"),
    "EAS": pack("Business, law, politics, sales & management", "Creativity, out-of-the-box thinking & aesthetic design", "Hospitals, schools, community centers & high human contact", "Politician, Talent manager, Public relations director", "Civics, Speech, English", "Political sci, PR", "Campaign mgt, crisis comms, talent representation", "Crisis PR consultant, Government affairs director"),
    "ECR": pack("Business, law, politics, sales & management", "Spreadsheets, auditing, strict procedures & categorization", "Workshops, outdoors, field sites & moving constantly", "Facilities director, Franchise owner, Operations manager", "Business, Math, Law", "Operations mgt, Business law", "Franchise ops, facility asset mgt, operational auditing", "Commercial property manager, Retail ops director"),
    "ECI": pack("Business, law, politics, sales & management", "Spreadsheets, auditing, strict procedures & categorization", "Labs, research hubs & independent tech spaces", "Investment banker, Compliance director, Audit manager", "Math, Business, Law", "Investment banking, Accounting", "Deal structuring, regulatory compliance, financial auditing", "Risk advisory lead, CFO track"),
    "ECA": pack("Business, law, politics, sales & management", "Spreadsheets, auditing, strict procedures & categorization", "Design studios, agencies & flexible creative spaces", "Merchandising manager, Retail director, Art gallery manager", "Art, Business, Math", "Retail mgt, Gallery mgt", "Retail buying, visual inventory curation, store ops", "E-commerce ops manager, Exhibition manager"),
    "ECS": pack("Business, law, politics, sales & management", "Spreadsheets, auditing, strict procedures & categorization", "Hospitals, schools, community centers & high human contact", "VP of human resources, Hotel manager, Customer success director", "Business, Psychology, Speech", "HR, Hospitality", "Exec talent acquisition, customer success, corporate relations", "CPO track, Enterprise account director"),
    "ESR": pack("Business, law, politics, sales & management", "Empathy, active listening, coaching & emotional support", "Workshops, outdoors, field sites & moving constantly", "Sports team manager, Construction supervisor, Labor union leader", "PE, Business, Law", "Labor relations, Sports mgt", "Union bargaining, site ops leadership, sports program mgt", "Industrial labor director, Construction ops lead"),
    "ESI": pack("Business, law, politics, sales & management", "Empathy, active listening, coaching & emotional support", "Labs, research hubs & independent tech spaces", "Head of talent acquisition, Labor relations director, Organizational psychologist", "Psychology, Business, English", "Talent acquisition, Org psych", "Exec headhunting, org design, compensation negotiation", "Exec search agency partner, HR transformation lead"),
    "ESA": pack("Business, law, politics, sales & management", "Empathy, active listening, coaching & emotional support", "Design studios, agencies & flexible creative spaces", "Corporate spokesperson, PR director, Communications chief", "Speech, English, Business", "PR, Corporate comms", "Exec spokesperson delivery, crisis messaging, media relations", "CCO track, Corporate reputation manager"),
    "ESC": pack("Business, law, politics, sales & management", "Empathy, active listening, coaching & emotional support", "Highly structured offices, predictable routines & strict compliance", "City manager, Government agency director, Public administrator", "Civics, Business, Math", "Public admin, Government", "Municipal governance, public budget allocation, urban ops oversight", "Urban dev consultant, Infrastructure program director"),

    "CRI": pack("Finance, administration, logistics & IT admin", "Tangible machinery, hand tools & physical building", "Labs, research hubs & independent tech spaces", "Building inspector, Hardware QA tester, Manufacturing auditor", "Physics, Math, Shop", "Quality assurance, Applied physics", "QA testing, inspection logging, building code verification", "Compliance lead, Product safety auditor"),
    "CRA": pack("Finance, administration, logistics & IT admin", "Tangible machinery, hand tools & physical building", "Design studios, agencies & flexible creative spaces", "Patternmaker, Professional organizer, Drafting technician", "Math, Art, IT", "Drafting tech, Interior layout", "CAD blueprinting, space planning, inventory documentation", "CAD admin, Technical design librarian"),
    "CRE": pack("Finance, administration, logistics & IT admin", "Tangible machinery, hand tools & physical building", "Fast-paced corporate offices, competitive arenas & boardrooms", "Inventory manager, Dispatcher, Fleet administrator", "Math, IT, Geography", "Logistics systems, Dispatch", "Automated inventory auditing, dispatch scheduling, fleet logging", "Systems integrator, Global freight ops"),
    "CRS": pack("Finance, administration, logistics & IT admin", "Tangible machinery, hand tools & physical building", "Hospitals, schools, community centers & high human contact", "Maintenance coordinator, Hospital admin, Facility manager", "Math, Health, IT", "Facilities mgt, Healthcare admin", "Maintenance log coordination, health facility admin, supply intake", "Hospital materials manager, Commercial property coord"),
    "CIR": pack("Finance, administration, logistics & IT admin", "Analytical models, software & diagnostic testing", "Workshops, outdoors, field sites & moving constantly", "IT network administrator, Forensics technician, Database administrator", "IT, Math, Physics", "Network admin, Cybersecurity", "SQL querying, audit logging, network security protocol", "Cybersecurity auditor, IT systems admin"),
    "CIA": pack("Finance, administration, logistics & IT admin", "Analytical models, software & diagnostic testing", "Design studios, agencies & flexible creative spaces", "Business intelligence analyst, Archivist, Data systems architect", "Math, IT, Business", "Business intelligence, Data sci", "Data pipeline architecture, BI visualization, database auditing", "Data engineer, Enterprise information architect"),
    "CIE": pack("Finance, administration, logistics & IT admin", "Analytical models, software & diagnostic testing", "Fast-paced corporate offices, competitive arenas & boardrooms", "Financial auditor, Risk management specialist, Senior accounting analyst", "Math, Law, Business", "Accounting, Risk mgt", "Tax auditing, financial statement analysis, internal control review", "Corporate controller, Forensic accountant"),
    "CIS": pack("Finance, administration, logistics & IT admin", "Analytical models, software & diagnostic testing", "Hospitals, schools, community centers & high human contact", "Medical coder, Compliance officer, Health information manager", "Biology, IT, Math", "Health info mgt, Statistics", "Medical coding (ICD/CPT), EHR compliance, HIPAA protocol", "Revenue cycle manager, Clinical data lead"),
    "CAR": pack("Finance, administration, logistics & IT admin", "Creativity, out-of-the-box thinking & aesthetic design", "Workshops, outdoors, field sites & moving constantly", "Desktop publisher, Technical formatter, Printing plant coordinator", "Art, IT, English", "Publishing, Graphic arts", "Formatting standards, pre-press verification, packaging layout", "Tech publishing lead, Brand compliance coord"),
    "CAI": pack("Finance, administration, logistics & IT admin", "Creativity, out-of-the-box thinking & aesthetic design", "Labs, research hubs & independent tech spaces", "Database architect, Tax attorney, Technical writer", "IT, Law, English", "Database architecture, Tax law", "Tech system documentation, legal research, manual design", "Legal tech manager, Regulatory knowledge admin"),
    "CAE": pack("Finance, administration, logistics & IT admin", "Creativity, out-of-the-box thinking & aesthetic design", "Fast-paced corporate offices, competitive arenas & boardrooms", "Advertising account manager, Copyright examiner, Patent administrator", "Law, Business, Media", "Patent admin, Advertising ops", "IP registration, ad rights auditing, patent filing", "IP portfolio admin, Digital rights manager"),
    "CAS": pack("Finance, administration, logistics & IT admin", "Creativity, out-of-the-box thinking & aesthetic design", "Hospitals, schools, community centers & high human contact", "Court reporter, Registration coordinator, Legal secretary", "Law, English, IT", "Legal studies, Exec secretarial", "Legal transcription, court record mgt, docket scheduling", "Paralegal ops manager, Judicial administrator"),
    "CER": pack("Finance, administration, logistics & IT admin", "Persuasion, public speaking & strategic negotiation", "Workshops, outdoors, field sites & moving constantly", "Supply chain coordinator, Fleet dispatcher, Customs broker", "Geography, Math, Law", "Customs brokerage, Global trade", "Import/export verification, tariff auditing, trade compliance", "Global trade manager, Customs house broker"),
    "CEI": pack("Finance, administration, logistics & IT admin", "Persuasion, public speaking & strategic negotiation", "Labs, research hubs & independent tech spaces", "Accounting manager, Revenue auditor, Corporate treasurer", "Math, Business, Law", "Corporate treasury, Accounting", "Revenue auditing, GAAP/IFRS standards, ledger management", "Corporate treasurer, Financial audit director"),
    "CEA": pack("Finance, administration, logistics & IT admin", "Persuasion, public speaking & strategic negotiation", "Design studios, agencies & flexible creative spaces", "Editorial assistant, Media buyer, Digital asset manager", "IT, Media, English", "Digital asset mgt, Media buying", "Asset cataloging, media placement auditing, licensing verification", "DAM ops manager, Media contract compliance"),
    "CES": pack("Finance, administration, logistics & IT admin", "Persuasion, public speaking & strategic negotiation", "Hospitals, schools, community centers & high human contact", "Payroll manager, Benefits administrator, HR operations coordinator", "Math, Business, Law", "HR operations, Payroll ops", "Automated payroll, benefits compliance auditing, HRIS mgt", "Compensation director, HRIS implementation coord"),
    "CSR": pack("Finance, administration, logistics & IT admin", "Empathy, active listening, coaching & emotional support", "Workshops, outdoors, field sites & moving constantly", "Dental receptionist, Ward administrator, Clinical logistics coordinator", "Health, Math, English", "Clinical logistics, Dental office", "Patient intake systems, medical scheduling, insurance verification", "Practice manager, Patient services coord"),
    "CSI": pack("Finance, administration, logistics & IT admin", "Empathy, active listening, coaching & emotional support", "Labs, research hubs & independent tech spaces", "University registrar, Financial aid coordinator, Academic records specialist", "Math, Civics, English", "Higher ed admin, Admissions", "Transcript auditing, financial aid verification, academic archiving", "University registrar, Compliance manager"),
    "CSA": pack("Finance, administration, logistics & IT admin", "Empathy, active listening, coaching & emotional support", "Design studios, agencies & flexible creative spaces", "Corporate event coordinator, Travel agent, Conference planner", "Business, Math, Geography", "Corporate event coord, Hospitality", "Itinerary logistics, vendor contract auditing, travel expense logging", "Corporate travel lead, Trade show ops manager"),
    "CSE": pack("Finance, administration, logistics & IT admin", "Empathy, active listening, coaching & emotional support", "Fast-paced corporate offices, competitive arenas & boardrooms", "Executive assistant, Office manager, Customer service supervisor", "Business, IT, English", "Office mgt, Exec admin", "Exec calendar scheduling, CRM system auditing, support workflow", "Chief of staff, Corporate ops director")
};

const questionsData = {
    1: { question: "Question 1: Your school plans to put on a big play, and everyone has to help out.<br>What is the task you will prioritise to take part in?", answers: ["A. Building the stage and setting up the heavy structures.", "b. Ensuring the accuracy of costumes and props by looking up the historical context of the play.", "c. Painting the backdrops and getting the visual design done.", "d. Helping actors memorize lines and supporting everyone backstage.", "e. Stepping up as the director to keep track of the progress and ensure the performance runs smoothly.", "f. Tracking costs, bills, and managing the financial resources."] },
    2: { question: "Question 2: The Environmental Club is starting a new project on campus.<br>Where do you fit in?", answers: ["A. Building an aquaponics setup in the school garden and keeping it running.", "b. Take water samples from the surrounding area and test the pollution levels.", "c. Design attractive posters on social media.", "d. Organize the cleanup day and get other students to volunteer their weekend.", "e. Taking charge of raising funds by discussing with local businesses and getting them to sponsor us.", "f. Tracking member attendance using tools such as Google sheet,..."] },
    3: { question: "Question 3: You are entering a weekend tech competition with a team. What part of the project will you prefer to take charge of ?", answers: ["A. Experiment with components and assembling the physical prototype by hand.", "b. Work with extensive research to find a plant-based chemical alternative to plastic packaging.", "c. Design a creative video with special effects for the final pitch.", "d. Support the team’s mental well-being and reconcile any disagreements between members.", "e. Deliver the final pitch to the judges and answer their probing questions.", "f. Managing the financial resources of the team."] },
    4: { question: "Question 4: Your team is running the school merchandise booth for a week. What is your main role?", answers: ["A. Lift the heavy boxes and drive the campus cart to deliver packages to different departments.", "b. Analyze sales data from previous years to figure out which items generate the highest profit.", "c. Decorate the booth to draw in customers.", "d. Mentor the younger members on the team to help them build customer service skills.", "e. Take charge of the booth and ensure everything runs smoothly by tracking members and directing when necessary.", "f. Track stock levels, and log all the inventory data into the system."] },
    5: { question: "Question 5: The school newspaper has a tight deadline and needs to finish the latest issue fast. How do you help?", answers: ["A. Operate the printing press equipment and physically transport stacks across campus.", "b. Investigate a recent rumor on campus to compose a headline on what actually happened.", "c. Design the mascot and the layout of the newspaper.", "d. Conduct interviews with students to share inspiring personal stories in the issue.", "e. Working on a marketing plan to get more students to buy or read this edition.", "f. Read through every single draft to fix grammar and check the formatting."] },
    6: { question: "Question 6: It's Wellness Week at school, and you are helping out at the health stations. Which one are you running?", answers: ["A. Fix broken lockers in the gym or install new locks on the equipment storage doors.", "b. Read medical studies to produce a report on how sleep loss affects a teenager's brain.", "c. Guide students through a creative art station making relaxing handmade iteams.", "d. Set up a peer support booth where students can discuss different studying issues.", "e. Lead the promotional campaign across campus to maximize student attendance at all booths.", "f. Manage the logistics desk to track first-aid supplies and what gets handed out."] },
    7: { question: "Question 7: The annual school arts festival is coming up. How are you showing up?", answers: ["A. Wire up the amplifiers and set up stage lights.", "b. Research traditional musical instruments to include an informative display in the event guide.", "c. Perform live on stage for the opening ceremony.", "d. Use sign language to translate the performances to support hearing-impaired guests.", "e. Set up your own side-hustle booth to sell custom items.", "f. Manage ticket check-ins and record visitor payments."] },
    8: { question: "Question 8: You are setting up your project for the science fair. What does it look like?", answers: ["A. Calibrate a 3D printer to physically manufacture a complex mechanical model you designed.", "b. Mix chemicals in the lab to test exact sugar levels, or analyze telescope data to map weather shifts.", "c. Design a dynamic visual display board.", "d. Engage with visitors, explaining complex scientific concepts in an approachable way.", "e. Pitch your project to the judges.", "f. Use a calculator to run the numbers and double-check the final statistics."] },
    9: { question: "Question 9: Your school is hosting a massive sports tournament against rival schools. How do you pitch in?", answers: ["A. Mix concrete and repair the cracked pavement.", "b. Analyze opponent strategies and compile data reports for the coach.", "c. Design team banners and paint school mascots.", "d. Coach a group of middle schoolers and teach them the core skills they need for the game.", "e. Step up to defend your teammate during a rough dispute over a bad referee call.", "f. Sit at the main desk to collect entry fees and record the payments."] },
    10: { question: "Question 10: You are picking your focus area for the upcoming academic decathlon. Which subject do you find most intriguing?", answers: ["A. Robotics & mechanics", "b. Advanced science", "c. Arts or design", "d. Counseling & mentorship", "e. Economics", "f. Accounting & data systems"] },
    11: { question: "Question 11: You are helping out in the school's main administration office for the day. Which task feels least like a chore?", answers: ["A. Assemble new office furniture and organize heavy storage boxes.", "b. Study office data and propose research-backed improvements.", "c. Design colorful promotional flyers for the main bulletin board.", "d. Assist a counselor in running group icebreakers in the day-care room.", "e. Negotiate bulk supply orders with suppliers.", "f. Calculate volunteer hours and sort mail into teacher boxes."] },
    12: { question: "Question 12: The school is running a huge emergency response drill. What's your assignment?", answers: ["A. Grab a fire extinguisher and help people navigate through the halls during the mock fire drill.", "b. Analyze health data to track how a fake virus spreads through the crowd.", "c. Film the whole process and edit the footage into a documentary about school safety.", "d. Work in the first-aid tent to guide injured students through physical recovery.", "e. Take charge as incident coordinator, managing response teams and directing emergency priorities.", "f. Take headcount and log attendance to verify everyone is accounted for."] },
    13: { question: "Question 13: You are working at a formal fundraising gala for school alumni. Where are you stationed?", answers: ["A. Set up stage equipment and operate soundboard hardware.", "b. Analyze donor demographics and past contribution data.", "c. Choreograph a fast-paced dance routine during the entertainment break.", "d. Welcome guests at the front door, guide them to their tables.", "e. Run the merchandise and clothing rental tables, convincing guests to buy or rent items.", "f. Sit at the back table keeping inventory logs and balancing the cash register."] },
    14: { question: "Question 14: The school just opened a brand-new STEM lab with cool equipment. What are you working on?", answers: ["A. Test the durability of robotic parts with hand tools.", "b. Use a high-powered microscope to study plant cells.", "c. Test sound mixing and add cool musical effects.", "d. Lead peer workshops to guide beginners on how to safely use lab equipment.", "e. Directing a student tech-support service out of the lab.", "f. Catalog all equipment serial numbers and organize safety documentation."] },
    15: { question: "Question 15: When you look back at a normal week at school, which moment felt the most rewarding?", answers: ["A. Take apart the broken coffee maker in the student lounge and fix it yourself.", "b. Solve a tough logic puzzle that has been bothering you all week.", "c. Sit in the courtyard with a sketchbook drawing portraits of your friends for the yearbook.", "d. Stay after school to tutor someone struggling in math.", "e. Pitch a new student initiative to school leadership and successfully persuade them to approve it.", "f. Organize all your school notes, files, and study planners into an organized digital system."] },
    
    16: { question: "Situational question 01: Your organization just received an unexpected funding boost, and everyone has to drop their regular tasks to launch an urgent 48-hour community project. You have the freedom to choose your own role for this campaign. Looking at the available tasks below, which one would you jump on immediately?", answers: ["A. Grab the tools yourself to assemble the stage, or transport and set up heavy physical materials to the site.", "b. Step back to analyze the survey data, evaluate the project's overall feasibility, and identify the root causes of any potential risks.", "c. Take charge of the visual concepts, design all the promotional materials, and craft highly creative, aesthetically pleasing messaging.", "d. Head directly into the community to meet people, listen to their actual needs, and offer emotional support to those struggling in the area.", "e. Step up as the team leader to pitch to other sponsors, oversee the project's progress, and ensure the campaign generates maximum public impact.", "f. Sit down to review all the invoices, build detailed spreadsheets to track the budget, and make sure everything complies perfectly with the procedural rules."] },
    17: { question: "Situational question 02: Your class is assigned a major group project that requires a comprehensive final presentation. How do you prefer to contribute to the team?", answers: ["A. Setting up the equipment.", "b. Researching facts and analyzing data.", "c. Designing the slides and other visual products.", "d. Supporting team members mentally and resolving conflicts between them.", "e. Leading the group and delivering the final pitch.", "f. Managing the timeline and formatting the report."] },
    18: { question: "Situational question 03: You and your friends are planning a week-long road trip. What is your primary focus during the planning and execution of the trip?", answers: ["A. Handling luggage or repairs.", "b. Investigating routes and seeking different attractions.", "c. Taking photos of the scenery and the group of friends.", "d. Keeping morale high and looking out for everyone.", "e. Making final decisions whenever the group wants to purchase anything and negotiating prices.", "f. Tracking the group’s budget."] }
};

const miniJobData = {
    'R': { title: "Mini job probation for the Realistic group!!!!", situation: "Situation: You are a construction site supervisor. It's blistering outside, and there is dust everywhere. A giant excavator has just broken down in the middle of the worksite, leading to the delay of the entire project. The mechanic called in sick. Your boss is rushing you to update the progress.", options: [{ text: "A. Put on your hard hat, grab the toolbox, crawl under the machine, and figure out how to fix it yourself", correct: true }, { text: "b. Call an outside mechanic and accept the delay penalty.", correct: false }, { text: "c. Throw a tantrum and blame the nearby workers for breaking the machine.", correct: false }] },
    'I': { title: "Mini job probation for the Investigative group!!!!", situation: "Situation: You just spent 2 weeks coding a crucial data analysis script. When you run it, a serious bug appears on the screen. You realize the root cause lies in 10,000 lines of raw data having spelling typos, and you must review and fix them before tomorrow morning - the deadline of the report.", options: [{ text: "A. Debug every single line patiently because the feeling of solving a puzzle thrills you.", correct: true }, { text: "b. Patch it up with fake data to have a report for the boss tomorrow.", correct: false }, { text: "c. Shut the laptop and go to sleep, planning to explain to the boss tomorrow: 'The data is corrupted, I couldn't do it.'", correct: false }] },
    'A': { title: "Mini job probation for the Artistic group!!!!", situation: "Situation: You stayed up for 3 nights to design a golden-ratio-perfect logo. When you present it to the clients, they frown: 'We don't feel the premium vibe. Make the logo 3 times bigger, change it to neon pink, and insert a flying dragon for good feng shui. Turn it in again by this afternoon.'", options: [{ text: "A. Patiently explain the aesthetic principles to the client and integrating their ideas to your own to close the deal", correct: true }, { text: "b. Abandoning the project because the client does not have the same aesthetic vision as you", correct: false }, { text: "c. Revise the logo following exactly what the client says", correct: false }] },
    'S': { title: "Mini job probation for the Social group!!!!", situation: "Situation: You are a homeroom teacher. A student just hit a classmate. When you invite the parents for a meeting, instead of apologizing or explaining, they blame you for treating their child unfairly, which caused them to misbehave.", options: [{ text: "A. Keep calm and listen to their anger empathetically before solving the problem together.", correct: true }, { text: "b. Discuss with the parents to protect your dignity.", correct: false }, { text: "c. Call security to escort the parents out and stop solving the problem", correct: false }] },
    'E': { title: "Mini job probation for the Enterprising group!!!!", situation: "Situation: Your startup company is running out of funds and only has enough cash to pay 1 month of salary. This morning, your biggest partner just canceled their contract. Employees are panicking and therefore spreading rumors of bankruptcy. Everyone is looking at you, waiting for a solution.", options: [{ text: "A. Hold a company-wide meeting to reassure everyone's spirits, and then meet 5 new potential potential clients as soon as possible.", correct: true }, { text: "b. Accepting that the situation stems from the economic recession", correct: false }, { text: "c. Update your CV and start looking for a job at a safer company.", correct: false }] },
    'C': { title: "Mini job probation for the Conventional group!!!!", situation: "Situation: It's the afternoon of New Year's Eve, and everyone is going home for the holidays. You are the chief accountant who takes charge of closing the year-end books. The financial balance sheet is off by exactly $1. If you don't find it, the system won't let you close the books. You have to review thousands of receipts and invoices from the past 12 months.", options: [{ text: "A. Carefully scan through every Excel file and invoice until you find the error. If you cannot find it by 9 p.m, you will actively explain to the boss and ask them to extend the deadline a little bit.", correct: true }, { text: "b. Use $1 from your own pocket to balance the system", correct: false }, { text: "c. Go home for the holiday and save the task for the comeback from the holiday.", correct: false }] }
};

const paginationContainer = document.getElementById('pagination');
const nextBtn = document.getElementById('nextBtn');
const questionText = document.getElementById('questionText');
const quizBody = document.getElementById('quizBody');
const answersGrid = document.getElementById('answersGrid');
const mainContentArea = document.getElementById('mainContentArea');

function initPagination() {
    paginationContainer.innerHTML = '';
    // CHỈ HIỂN THỊ 15 CHẤM KHÔNG THỂ BẤM 
    for (let i = 1; i <= 15; i++) {
        const dot = document.createElement('div');
        dot.classList.add('page-dot');
        if (i === currentSlide) dot.classList.add('active');
        dot.textContent = i;
        paginationContainer.appendChild(dot);
    }
}

function initAnswerSelection() {
    const cards = answersGrid.querySelectorAll('.answer-card');
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (card.classList.contains('disabled-card')) return; 

            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            userSelections[currentSlide] = index;
        });
    });
}

// GIỮ NGUYÊN HOÀN TOÀN LOGIC CŨ CỦA BẠN ĐỂ LẤY ĐÁP ÁN (Dùng cho TH 15A, 14A 1B...)
function getTiedLabels() {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    for (let i = 1; i <= 15; i++) {
        if (userSelections[i] !== undefined) {
            scores[answerLabels[userSelections[i]]]++;
        }
    }
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    
    let tied = new Set();
    
    // Nếu có hòa ở vị trí thứ 1 và 2
    if (sorted[0][1] === sorted[1][1] && sorted[0][1] > 0) {
        sorted.filter(x => x[1] === sorted[0][1]).forEach(x => tied.add(x[0]));
    }
    // Nếu có hòa ở vị trí thứ 2 và 3
    if (sorted[1][1] === sorted[2][1] && sorted[1][1] > 0) {
        sorted.filter(x => x[1] === sorted[1][1]).forEach(x => tied.add(x[0]));
    }
    // Nếu có hòa ở vị trí thứ 3 và 4 (tranh chấp chiếc vé cuối vào Top 3)
    if (sorted[2][1] === sorted[3][1] && sorted[2][1] > 0) {
        sorted.filter(x => x[1] === sorted[2][1]).forEach(x => tied.add(x[0]));
    }
    // Trường hợp đặc biệt: Không đủ tạo bộ 3 (VD 15A hoặc 14A 1B)
    if (sorted[2][1] === 0) {
        sorted.filter(x => x[1] === 0).forEach(x => tied.add(x[0]));
    }
    
    return Array.from(tied);
}

// KIỂM TRA XEM CÓ CẦN THI ĐẤU PHỤ KHÔNG (Giữ nguyên)
function checkIfNeedsTieBreaker() {
    return getTiedLabels().length > 0;
}

function updateContent(slideNumber) {
    quizBody.style.opacity = 0;
    
    setTimeout(() => {
        const qData = questionsData[slideNumber];
        let tiedLabels = [];
        
        if (slideNumber >= 16) {
            // Lấy theo logic gốc trước
            tiedLabels = getTiedLabels(); 
            
            // TÍNH ĐIỂM ĐỂ BẮT 2 TRƯỜNG HỢP NGOẠI LỆ 
            const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
            for (let i = 1; i <= 15; i++) {
                if (userSelections[i] !== undefined) scores[answerLabels[userSelections[i]]]++;
            }
            const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
            
            let scoreGroups = [];
            let currentScore = -1;
            let currentGroup = [];
            for (let [label, score] of sorted) {
                if (score !== currentScore) {
                    if (currentGroup.length > 0) scoreGroups.push(currentGroup);
                    currentScore = score;
                    currentGroup = [label];
                } else {
                    currentGroup.push(label);
                }
            }
            if (currentGroup.length > 0) scoreGroups.push(currentGroup);

            const G1 = scoreGroups[0] || [];
            const G2 = scoreGroups[1] || [];
            
            const ans16 = userSelections[16] !== undefined ? answerLabels[userSelections[16]] : null;
            const ans17 = userSelections[17] !== undefined ? answerLabels[userSelections[17]] : null;

            // TRƯỜNG HỢP NGOẠI LỆ 1: a b lớn nhất bằng nhau và c d e nhỏ nhất bằng nhau (vd 6 6 1 1 1)
            if (G1.length === 2 && G2.length >= 2) {
                if (slideNumber === 16) tiedLabels = G1;
                else if (slideNumber === 17) tiedLabels = G2;
                // Slide 18 sẽ được xử lý ở logic gốc bên dưới
            }
            // TRƯỜNG HỢP NGOẠI LỆ 2: 3 cái lớn nhất bằng nhau (vd 3a 3b 3c 3d 3e)
            else if (G1.length >= 3) {
                if (slideNumber === 16) tiedLabels = G1;
                else if (slideNumber === 17) tiedLabels = G1.filter(x => x !== ans16);
                else if (slideNumber === 18) tiedLabels = G1.filter(x => x !== ans16 && x !== ans17);
            }

            // LOGIC CÂU 18 GỐC BẠN VIẾT (Áp dụng cho 15A, 14A 1B... và TH ngoại lệ 1)
            if (slideNumber === 18 && !(G1.length >= 3)) { // Bỏ qua nếu đã xử lý ở TH2
                if (ans16 && ans17) {
                    if (ans16 !== ans17) {
                        tiedLabels = [ans16, ans17]; 
                    } else {
                        tiedLabels = tiedLabels.filter(l => l !== ans16); 
                    }
                }
            }
        }

        if (qData) {
            questionText.innerHTML = qData.question;
            const cards = answersGrid.querySelectorAll('.answer-card');
            
            cards.forEach((card, index) => {
                card.classList.remove('active', 'disabled-card');

                if (qData.answers[index]) {
                    card.textContent = qData.answers[index];
                    card.style.display = 'block';

                    const currentLabel = answerLabels[index];
                    // Chỉ bật sáng đáp án nằm trong danh sách được duyệt
                    if (slideNumber >= 16 && !tiedLabels.includes(currentLabel)) {
                        card.classList.add('disabled-card');
                    }
                } else {
                    card.style.display = 'none';
                }
            });

            if (userSelections[slideNumber] !== undefined) {
                const selectedIndex = userSelections[slideNumber];
                if (cards[selectedIndex]) cards[selectedIndex].classList.add('active');
            }
        }

        // ĐỔI TEXT NÚT NEXT THÀNH FINISH TẠI CÂU CHỐT
        if (slideNumber === 15 || slideNumber === 18) {
            nextBtn.innerHTML = "Finish";
            nextBtn.style.backgroundColor = "#FDE8B1"; 
        } else {
            nextBtn.innerHTML = "Next &nbsp;&rarr;";
        }

        // ĐIỀU CHỈNH GIAO DIỆN (NÚT BẤM)
        const paginationWrapper = document.querySelector('.pagination-wrapper');
        const bottomControls = document.getElementById('bottomControls');
        
        if (slideNumber <= 15) {
            document.getElementById('pagination').style.display = 'flex';
            paginationWrapper.appendChild(nextBtn); 
            nextBtn.style.display = 'block';
            bottomControls.style.display = 'none';
        } else {
            // Câu 16-18: Chuyển Next/Finish xuống dưới góc phải
            document.getElementById('pagination').style.display = 'none';
            bottomControls.style.display = 'flex';
            bottomControls.appendChild(nextBtn); 
            nextBtn.style.display = 'block';
            
            if (slideNumber === 18) {
                nextBtn.style.marginLeft = 'auto'; // Ép nút sang sát phải
            }
        }
        
        quizBody.style.opacity = 1;
    }, 300);
}

function goToSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > totalQuestions) return;
    currentSlide = slideNumber;
    
    if (currentSlide <= 15) {
        const dots = document.querySelectorAll('.page-dot');
        dots.forEach((dot, idx) => {
            if (idx + 1 === currentSlide) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }
    
    updateContent(currentSlide);
}

// XỬ LÝ CHUNG BẰNG MỘT NÚT NEXT DUY NHẤT
nextBtn.addEventListener('click', () => {
    // 1. BẮT BUỘC CHỌN ĐÁP ÁN ĐỂ ĐI TIẾP
    if (userSelections[currentSlide] === undefined) {
        return;
    }

    // 2. KHI NHẤN "FINISH" Ở CÂU 15
    if (currentSlide === 15) {
        if (checkIfNeedsTieBreaker()) {
            goToSlide(16); // Có hòa (hoặc thiếu) -> Bật Bonus
        } else {
            renderFinalResult(); // Bộ 3 đã rõ ràng -> Chốt kết quả ngay
        }
        return;
    }

    // 3. KHI NHẤN "FINISH" Ở CÂU 18
    if (currentSlide === 18) {
        renderFinalResult();
        return;
    }

    // 4. CHUYỂN CÂU TIẾP THEO BÌNH THƯỜNG
    goToSlide(currentSlide + 1);
});

// TÍNH ĐIỂM VÀ TÌM MÃ HOLLAND CODE
function renderFinalResult() {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    
    // Tính 15 câu chính
    for (let i = 1; i <= 15; i++) {
        if (userSelections[i] !== undefined) scores[answerLabels[userSelections[i]]]++;
    }

    // CỘNG ĐIỂM 3 CÂU BONUS (CHUẨN HỆ SỐ MỚI)
    if (userSelections[16] !== undefined) scores[answerLabels[userSelections[16]]] += 0.3;
    if (userSelections[17] !== undefined) scores[answerLabels[userSelections[17]]] += 0.2;
    if (userSelections[18] !== undefined) scores[answerLabels[userSelections[18]]] += 0.15;

    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    
    // Tự động rút gọn lấy 3 đáp án cao nhất
    let finalCode = "";
    if (sortedScores[2][1] > 0) {
        finalCode = sortedScores[0][0] + sortedScores[1][0] + sortedScores[2][0];
    } else if (sortedScores[1][1] > 0) {
        finalCode = sortedScores[0][0] + sortedScores[1][0];
    } else {
        finalCode = sortedScores[0][0];
    }

    renderResultPage(finalCode);
}

// HIỂN THỊ KẾT QUẢ
function renderResultPage(code) {
    const info = resultsDatabase[code] || {
        fields: "Data not available", tools: "N/A", environment: "N/A", careers: "N/A", subjects: "N/A", major: "N/A", skills: "N/A", planB: "N/A"
    };

    mainContentArea.innerHTML = `
        <div class="result-wrapper">
            <h1 class="result-title-main">Your Result!</h1>
            
            <div class="result-grid-header">
                <div>Code</div>
                <div>Fields, Tools, Environments</div>
                <div>Sample Careers</div>
                <div>Highschool subjects</div>
                <div>Uni Majors/ Minors & Skills </div>
                <div>Plan B</div>
            </div>

            <div class="result-grid-body">
                <div class="res-col">
                    <div class="res-code-box">${code}</div>
                </div>
                
                <div class="res-col">
                    <div class="res-box"><span class="res-box-bold">Fields</span><br>${info.fields}</div>
                    <div class="res-box"><span class="res-box-bold">Tools</span><br>${info.tools}</div>
                    <div class="res-box"><span class="res-box-bold">Environments</span><br>${info.environment}</div>
                </div>

                <div class="res-col">
                    <div class="res-box" style="height: 100%;">${info.careers}</div>
                </div>

                <div class="res-col">
                    <div class="res-box" style="height: 100%;">${info.subjects}</div>
                </div>

                <div class="res-col">
                    <div class="res-box"><span class="res-box-bold">Uni Major</span><br>${info.major}</div>
                    <div class="res-box"><span class="res-box-bold">Skills</span><br>${info.skills}</div>
                </div>

                <div class="res-col">
                    <div class="res-box" style="height: 100%;">${info.planB}</div>
                </div>
            </div>

            <div class="res-nav-buttons">
                <a href="/home" class="home-btn">&larr;&nbsp;Home</a>
                <a href="#" class="home-btn" onclick="startMiniJob('${code[0]}'); return false;">Start mini job probation now!!&nbsp;&rarr;</a>
            </div>
        </div>
    `;

    document.querySelector('.navbar .nav-btn').textContent = "Take the test again!!";
    document.querySelector('.navbar .nav-btn').setAttribute('href', '/test');
    document.querySelector('.quiz-header').style.display = 'none';
    
    if(document.getElementById('bottomControls')) document.getElementById('bottomControls').style.display = 'none';
}

// HIỂN THỊ MINI JOB
function startMiniJob(primaryGroup) {
    const data = miniJobData[primaryGroup];
    if (!data) return;

    let optionsHtml = '';
    data.options.forEach((opt) => {
        optionsHtml += `<div class="mj-answer-card" onclick="handleMiniJobAnswer(${opt.correct})">${opt.text}</div>`;
    });

    mainContentArea.innerHTML = `
        <div class="mini-job-container">
            <div class="mj-header-row">
                <a href="/home" class="home-btn">&larr;&nbsp;Home</a>
                <div class="mj-title-pill">${data.title}</div>
            </div>
            <div class="mj-situation">${data.situation}</div>
            <div class="mj-prompt-pill">What would you do in that case? Choose 1 out of 3 options below!!!</div>
            <div class="mj-answers">
                ${optionsHtml}
            </div>
        </div>
    `;
}

// KẾT QUẢ MINI JOB
function handleMiniJobAnswer(isCorrect) {
    if (isCorrect) {
        mainContentArea.innerHTML = `
            <div class="mini-job-container">
                <div class="mj-header-row">
                    <a href="/home" class="home-btn">&larr;&nbsp;Home</a>
                </div>
                <div class="mj-result-box mj-success">
                    Excellent, the boss has just decided to give you a pay raise!<br>You have handled the situation perfectly.
                </div>
            </div>
        `;
    } else {
        mainContentArea.innerHTML = `
            <div class="mini-job-container">
                <div class="mj-header-row">
                    <a href="/home" class="home-btn">&larr;&nbsp;Home</a>
                </div>
                <div class="mj-result-box mj-fail">
                    You shouldn't choose this approach! This way of tackling<br>the problem will make your boss think that you're not<br>responsible at work and not passionate about your job!
                </div>
            </div>
        `;
    }
}

// Khởi tạo
initPagination();
initAnswerSelection();
updateContent(1);