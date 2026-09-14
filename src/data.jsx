import React, { useState } from 'react';

// --- MASTER STYLES & DESIGN TOKENS ---
export const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
  
  :root {
    /* Primary Brand Palette */
    --color-ivory: #FDFBF7;
    --color-charcoal: #1A1A1A;
    --color-forest: #0A1B11;
    --color-forest-lighter: #132E1D;
    --color-gold: #C5A880;
    --color-black: #000000;

    /* Opacity Tokens - Forest */
    --color-forest-05: rgba(10, 27, 17, 0.05);
    --color-forest-10: rgba(10, 27, 17, 0.1);
    --color-forest-15: rgba(10, 27, 17, 0.15);
    --color-forest-20: rgba(10, 27, 17, 0.2);
    --color-forest-40: rgba(10, 27, 17, 0.4);
    --color-forest-50: rgba(10, 27, 17, 0.5);
    --color-forest-60: rgba(10, 27, 17, 0.6);
    --color-forest-80: rgba(10, 27, 17, 0.8);
    --color-forest-90: rgba(10, 27, 17, 0.9);

    /* Opacity Tokens - Ivory */
    --color-ivory-05: rgba(253, 251, 247, 0.05);
    --color-ivory-10: rgba(253, 251, 247, 0.1);
    --color-ivory-15: rgba(253, 251, 247, 0.15);
    --color-ivory-20: rgba(253, 251, 247, 0.2);
    --color-ivory-40: rgba(253, 251, 247, 0.4);
    --color-ivory-50: rgba(253, 251, 247, 0.5);
    --color-ivory-60: rgba(253, 251, 247, 0.6);
    --color-ivory-80: rgba(253, 251, 247, 0.8);
    --color-ivory-90: rgba(253, 251, 247, 0.9);

    /* Opacity Tokens - Charcoal */
    --color-charcoal-10: rgba(26, 26, 26, 0.1);
    --color-charcoal-40: rgba(26, 26, 26, 0.4);
    --color-charcoal-50: rgba(26, 26, 26, 0.5);
    --color-charcoal-60: rgba(26, 26, 26, 0.6);
    --color-charcoal-70: rgba(26, 26, 26, 0.7);
    --color-charcoal-80: rgba(26, 26, 26, 0.8);

    /* Opacity Tokens - Gold */
    --color-gold-10: rgba(197, 168, 128, 0.1);
    --color-gold-20: rgba(197, 168, 128, 0.2);
    --color-gold-30: rgba(197, 168, 128, 0.3);
    --color-gold-40: rgba(197, 168, 128, 0.4);

    /* Default UI Themes */
    --theme-bg: var(--color-ivory);
    --theme-text: var(--color-charcoal);
    --theme-border: var(--color-forest-10);
    --theme-accent: var(--color-gold);
    --theme-block: var(--color-ivory);
  }

  /* Accessible Reading Modes */
  body.theme-normal { 
    --theme-bg: var(--color-ivory); 
    --theme-text: var(--color-charcoal); 
    --theme-border: var(--color-charcoal-10);
    --theme-accent: var(--color-gold); 
    --theme-block: #FFFFFF;
  }
  body.theme-focus { 
    --theme-bg: #F4F1EA; 
    --theme-text: var(--color-forest); 
    --theme-border: var(--color-forest-10); 
    --theme-accent: var(--color-forest); 
    --theme-block: var(--color-ivory);
  }
  body.theme-dark { 
    --theme-bg: var(--color-forest); 
    --theme-text: var(--color-ivory); 
    --theme-border: var(--color-gold-30); 
    --theme-accent: var(--color-gold); 
    --theme-block: var(--color-forest-lighter);
  }
  body.theme-highcontrast { 
    --theme-bg: var(--color-black); 
    --theme-text: var(--color-gold); 
    --theme-border: var(--color-gold-30); 
    --theme-accent: var(--color-gold); 
    --theme-block: var(--color-black);
  }
  body.theme-large { 
    --theme-bg: var(--color-ivory); 
    --theme-text: var(--color-charcoal); 
    --theme-border: var(--color-charcoal-10);
    --theme-accent: var(--color-gold); 
    --theme-block: #FFFFFF;
  }

  body {
    background-color: var(--color-ivory);
    color: var(--color-charcoal);
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6, .font-serif {
    font-family: 'Playfair Display', serif;
  }
  
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  .cinematic-img { transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
  .group:hover .cinematic-img { transform: scale(1.03); }

  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// --- SINGLE GLOBAL BRAND ASSET (MASTER LOGO) ---
export const MASTER_BRAND_LOGO = {
  svgPath: (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
       <defs>
          <clipPath id="masterGlobalClip">
             <circle cx="50" cy="50" r="45"/>
          </clipPath>
       </defs>
       <circle cx="50" cy="50" r="45"/>
       <g clipPath="url(#masterGlobalClip)">
         <circle cx="95" cy="50" r="45"/>
         <circle cx="72.5" cy="88.97" r="45"/>
         <circle cx="27.5" cy="88.97" r="45"/>
         <circle cx="5" cy="50" r="45"/>
         <circle cx="27.5" cy="11.03" r="45"/>
         <circle cx="72.5" cy="11.03" r="45"/>
       </g>
    </svg>
  )
};

// --- SAFE IMAGE COMPONENT WITH BRAND FALLBACK ---
export const SafeImage = ({ src, alt, className, ...props }) => {
  const [hasError, setHasError] = useState(false);
  
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" fill="%230A1B11"><rect width="1600" height="900" fill="%230A1B11"/><circle cx="800" cy="350" r="120" fill="none" stroke="%23C5A880" stroke-width="4"/><g transform="translate(800 350)"><path d="M 0 0 C 65 -45, 65 -120, 0 -120 C -65 -120, -65 -45, 0 0" transform="rotate(0)" stroke="%23C5A880" stroke-width="4" fill="none"/><path d="M 0 0 C 65 -45, 65 -120, 0 -120 C -65 -120, -65 -45, 0 0" transform="rotate(60)" stroke="%23C5A880" stroke-width="4" fill="none"/><path d="M 0 0 C 65 -45, 65 -120, 0 -120 C -65 -120, -65 -45, 0 0" transform="rotate(120)" stroke="%23C5A880" stroke-width="4" fill="none"/><path d="M 0 0 C 65 -45, 65 -120, 0 -120 C -65 -120, -65 -45, 0 0" transform="rotate(180)" stroke="%23C5A880" stroke-width="4" fill="none"/><path d="M 0 0 C 65 -45, 65 -120, 0 -120 C -65 -120, -65 -45, 0 0" transform="rotate(240)" stroke="%23C5A880" stroke-width="4" fill="none"/><path d="M 0 0 C 65 -45, 65 -120, 0 -120 C -65 -120, -65 -45, 0 0" transform="rotate(300)" stroke="%23C5A880" stroke-width="4" fill="none"/></g><path d="M 620 580 L 750 580" stroke="%23C5A880" stroke-width="4"/><text x="800" y="590" font-family="serif" font-size="36" fill="%23C5A880" text-anchor="middle" letter-spacing="8">THE</text><path d="M 850 580 L 980 580" stroke="%23C5A880" stroke-width="4"/><text x="800" y="680" font-family="serif" font-size="72" fill="%23FDFBF7" text-anchor="middle" letter-spacing="12">COMPLETE</text><text x="800" y="760" font-family="serif" font-size="72" fill="%23FDFBF7" text-anchor="middle" letter-spacing="12">BEING</text></svg>`;

  return (
    <img 
      src={hasError || !src ? fallbackSvg : src} 
      alt={alt} 
      className={className} 
      onError={() => setHasError(true)} 
      {...props} 
    />
  );
};

// --- INSTITUTIONAL DATABASE ---
export const CONTRIBUTORS = {
  founder: { name: 'Julian Wright', role: 'Editor-in-Chief', bio: 'Julian Wright is the founder and editor-in-chief of The Complete Being. His writing focuses on human agency, digital attention economies, and philosophical alignment.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', researchInterests: ['Attention Economics', 'Philosophical Alignment', 'Contemplative Practice'], academicBackground: 'Oxford University, M.Phil Philosophy' },
  expert1: { name: 'Dr. Elena Rostova', role: 'Visiting Scholar, Psychology', bio: 'Dr. Elena Rostova is a clinical psychologist specializing in narrative therapy and the psychological architecture of modern ambition.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', researchInterests: ['Narrative Therapy', 'Burnout Recovery', 'Affective Regulation'], academicBackground: 'Columbia University, Ph.D. Clinical Psychology' },
  expert2: { name: 'Marcus Chen', role: 'Research Fellow, Economics', bio: 'Marcus Chen advises institutional funds on long-term capital allocation, economic stewardship, and sustainable market structures.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', researchInterests: ['Capital Stewardship', 'Multi-generational Trusts', 'Sustainable Markets'], academicBackground: 'Stanford University, Ph.D. Economics' },
  expert3: { name: 'Sarah Lin', role: 'Resident Writer, Theology', bio: 'Sarah Lin studies the intersection of ancient theological frameworks, contemplative practice, and contemporary meaning-making.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200', researchInterests: ['Comparative Theology', 'Monastic Tradition', 'Modern Meaning-making'], academicBackground: 'Princeton Theological Seminary, Th.M.' }
};

export const PILLARS_DATA = [
  { name: 'Spirituality & Faith', icon: 'Compass', desc: 'Spiritual growth, theology, meaning, and the pursuit of service and the divine.' },
  { name: 'Identity & Purpose', icon: 'Target', desc: 'Forging character, self-awareness, calling, and a definitive life vision.' },
  { name: 'Mind & Psychology', icon: 'Brain', desc: 'Mastering emotional intelligence, resilience, focus, and mental models.' },
  { name: 'Relationships & Family', icon: 'Users', desc: 'Cultivating deep connection, marriage, parenting, and relational health.' },
  { name: 'Leadership & Influence', icon: 'Flag', desc: 'Guiding organizations, teams, and cultures with absolute integrity.' },
  { name: 'Work, Business & Career', icon: 'Briefcase', desc: 'Navigating strategy, innovation, entrepreneurship, and workplace excellence.' },
  { name: 'Wealth & Stewardship', icon: 'Landmark', desc: 'Understanding capital as a tool for freedom, stewardship, and legacy.' },
  { name: 'Health & Wellbeing', icon: 'Leaf', desc: 'Optimizing vitality, longevity, rest, and holistic physical health.' }
];

export const PILLARS = PILLARS_DATA.map(p => p.name);

export const calculateReadTime = (text) => {
  const words = text ? text.split(/\s+/).length : 50;
  const minutes = Math.max(1, Math.ceil(words / 225));
  return `${minutes} min read`;
};

// DYNAMIC FORMAT LABELS MAP
export const typeLabels = {
  essay: 'Essays',
  article: 'Articles',
  podcast: 'Podcasts',
  video: 'Videos',
  conversation: 'Conversations',
  research: 'Research Papers',
  letter: "Founder's Journal",
  masterclass: 'Masterclasses'
};

export const INITIAL_CONTENT = [
  { id: 1, type: 'essay', category: 'Identity & Purpose', date: 'July 14, 2026', monthYear: 'July 2026', updatedDate: 'Updated 2 days ago', author: CONTRIBUTORS.founder, title: 'The Architecture of Inner Stillness', difficulty: 'Intermediate', evidenceLevel: 'Research-backed', featured: true, trending: true, editorsPick: true, status: 'Published', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1600', excerpt: 'True balance isn\'t about equal time, it\'s about equal presence. How to cultivate a grounded mind in a fractured world.', content: 'The pursuit of wholeness begins not with addition, but with subtraction. We are constantly inundated with stimuli—a relentless tide of information demanding our immediate emotional response.\n\nTo build inner stillness is to construct a fortress of intentionality. It requires us to audit our consumption, not just of food, but of media, conversations, and environments. When we sit in solitude, we are not hiding from the world; we are preparing ourselves to engage with it more meaningfully.\n\nWisdom dictates that the loudest rooms often hold the least truth. By returning to the breath, to nature, and to contemplative silence, we recalibrate our spiritual compass.', sources: [{ id: 1, text: 'Newport, C. (2016). Deep Work: Rules for Focused Success in a Distracted World.', book: 'Deep Work', author: 'Cal Newport', publisher: 'Grand Central Publishing', year: '2016' }] },
  { id: 2, type: 'research', category: 'Wealth & Stewardship', date: 'July 10, 2026', monthYear: 'July 2026', updatedDate: 'Updated 6 days ago', author: CONTRIBUTORS.expert2, title: 'Empirical Study on Long-Term Capital Allocation', difficulty: 'Advanced', evidenceLevel: 'Research-backed', trending: true, editorsPick: true, status: 'Published', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1600', excerpt: 'A comprehensive institutional research paper examining stewardship models across multi-generational family trusts.', content: 'Money, stripped of institutional ego, is simply stored energy. Our quantitative research across 400 institutional portfolios reveals that capital preservation is directly correlated with spiritual and ethical clarity in distribution.\n\nTrue financial wisdom is aligning your capital with your deepest values.', sources: [{ id: 1, text: 'Institute Economic Whitepapers (2024).', book: 'Economic Review Vol IV', author: 'Marcus Chen', publisher: 'T_CB Press', year: '2024' }] },
  { id: 3, type: 'letter', category: 'Identity & Purpose', date: 'July 05, 2026', monthYear: 'July 2026', updatedDate: 'Updated 4 weeks ago', author: CONTRIBUTORS.founder, title: 'Notes on a Silent Retreat', difficulty: 'Beginner', evidenceLevel: 'Opinion Essay', featured: true, trending: false, editorsPick: false, status: 'Published', image: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=1600', excerpt: 'I spent the last week completely offline. No phone, no laptop, just a notebook and the horizon.', content: 'Sometimes you have to burn the boats. Last week, I looked at the infrastructure we had built and realized it was comfortable, but it lacked depth.\n\nI spent seven days in complete silence to map out the next decade. The clarity that emerges when you remove the digital noise is astounding.', sources: [{ id: 1, text: 'Personal Institute Journals, Vol. IV.', book: 'Journals Vol IV', author: 'Julian Wright', publisher: 'Private Archive', year: '2026' }] },
  { id: 4, type: 'podcast', category: 'Identity & Purpose', date: 'July 15, 2026', monthYear: 'July 2026', updatedDate: 'Updated 3 days ago', author: CONTRIBUTORS.founder, title: 'Audio Session: Solitude as Strategy', difficulty: 'Intermediate', evidenceLevel: 'Audio Recording', featured: false, trending: true, editorsPick: true, status: 'Published', image: 'https://images.unsplash.com/photo-1478147424042-3e3a9386c7cd?auto=format&fit=crop&q=80&w=1600', excerpt: 'A solo audio dispatch on why elite leaders schedule thinking time and how to protect silence.', content: 'Listen to the full audio episode exploring solitude as the ultimate strategic advantage in an age of constant connectivity.', sources: [{ id: 1, text: 'Institute Audio Archives (2026)', book: 'Solitude Podcast', author: 'Julian Wright', publisher: 'T_CB Audio', year: '2026' }] },
  { id: 5, type: 'essay', category: 'Mind & Psychology', date: 'June 28, 2026', monthYear: 'June 2026', updatedDate: 'Updated 1 month ago', author: CONTRIBUTORS.expert1, title: 'The Shadow of Modern Ambition', difficulty: 'Intermediate', evidenceLevel: 'Case Study', trending: true, editorsPick: false, status: 'Published', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1600', excerpt: 'Why the endless pursuit of "more" often leaves us with less of ourselves.', content: 'Ambition is a beautiful engine, but a terrible steering wheel. When we allow our drive for achievement to outpace our capacity for reflection, we create lives that look successful on the outside but feel entirely hollow on the inside.', sources: [{ id: 1, text: 'Jung, C. G. (1953). Two Essays on Analytical Psychology.', book: 'Two Essays', author: 'C.G. Jung', publisher: 'Princeton University Press', year: '1953' }] },
  { id: 6, type: 'masterclass', category: 'Work, Business & Career', date: 'June 20, 2026', monthYear: 'June 2026', updatedDate: 'Updated 1 month ago', author: CONTRIBUTORS.founder, title: 'The Anatomy of True Calling', difficulty: 'Advanced', evidenceLevel: 'Case Study', featured: false, trending: true, editorsPick: true, status: 'Published', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1600', excerpt: 'A masterclass lecture delivered at the 2026 Institute Symposium on aligning vocation with identity.', content: '[VIDEO LECTURE TRANSCRIPT]\n\nCalling is not something you stumble upon in a moment of convenience. It is forged in the crucible of discipline, self-examination, and service.', sources: [{ id: 1, text: 'Institute Symposia Proceedings, Vol. II.', book: 'Symposia Proceedings', author: 'Julian Wright', publisher: 'T_CB Press', year: '2026' }] },
  { id: 7, type: 'conversation', category: 'Work, Business & Career', date: 'June 15, 2026', monthYear: 'June 2026', updatedDate: 'Updated 6 weeks ago', author: CONTRIBUTORS.expert2, title: 'The Dignity of Deep Work', difficulty: 'Beginner', evidenceLevel: 'Conversation', featured: true, trending: true, editorsPick: false, status: 'Published', image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?auto=format&fit=crop&q=80&w=1600', excerpt: 'A conversation on navigating uncertainty, finding signal in the noise, and the spiritual practice of focus.', content: 'Listen to the full conversation archive and transcript highlights.', sources: [{ id: 1, text: 'Recorded live at the Institute Audio Labs, 2026.', book: 'Audio Archive', author: 'Marcus Chen', publisher: 'T_CB Media', year: '2026' }] },
  { id: 8, type: 'research', category: 'Health & Wellbeing', date: 'June 02, 2026', monthYear: 'June 2026', updatedDate: 'Updated 2 months ago', author: CONTRIBUTORS.expert1, title: 'Chronobiology and Cognitive Peak Performance', difficulty: 'Advanced', evidenceLevel: 'Research-backed', trending: false, editorsPick: false, status: 'Published', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1600', excerpt: 'Aligning your daily circadian rhythms with deep work blocks for sustained vitality and longevity.', content: 'Human biology is intricately tethered to solar cycles. Ignoring our circadian architecture in pursuit of 24-hour productivity guarantees cognitive depletion.', sources: [{ id: 1, text: 'Circadian Biology Review (2024).', book: 'Biological Rhythms', author: 'Elena Rostova', publisher: 'Academic Press', year: '2024' }] },
  { id: 9, type: 'conversation', category: 'Spirituality & Faith', date: 'July 18, 2026', monthYear: 'July 2026', updatedDate: 'Updated 3 days ago', author: CONTRIBUTORS.expert3, title: 'Dialogues on Contemplative Practice and Grace', difficulty: 'Intermediate', evidenceLevel: 'Conversation', trending: false, editorsPick: false, status: 'Published', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1600', excerpt: 'An intimate discussion exploring how quiet contemplation sustains spiritual resilience.', content: 'Contemplative practice is not an escape from reality; rather, it is the preparation required to meet reality with unshakeable grace and love.', sources: [{ id: 1, text: 'Institute Audio Dialogues (2026).', book: 'Faith Audio Vol I', author: 'Sarah Lin', publisher: 'T_CB Press', year: '2026' }] },
  { id: 10, type: 'article', category: 'Identity & Purpose', date: 'July 12, 2026', monthYear: 'July 2026', updatedDate: 'Updated 5 days ago', author: CONTRIBUTORS.founder, title: 'Crafting a Definitive Life Vision', difficulty: 'Advanced', evidenceLevel: 'Case Study', trending: true, editorsPick: false, status: 'Published', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600', excerpt: 'A comprehensive guide on translating abstract calling into daily disciplined action.', content: 'Without a definitive vision, human energy scatters into trivial pursuits. Here is the framework for unifying your life around your core calling.', sources: [{ id: 1, text: 'Symposia Visual Vault (2026).', book: 'Vision Frameworks', author: 'Julian Wright', publisher: 'T_CB Press', year: '2026' }] }
].map(item => ({ ...item, readTime: calculateReadTime(item.content) }));

export const LEARNING_JOURNEYS = [
  { id: 'j1', title: 'Faith Foundations', category: 'Spirituality & Faith', total: 12, completed: 3, desc: 'A rigorous curriculum on ancient theology and spiritual discipline.' },
  { id: 'j2', title: 'Leadership Essentials', category: 'Leadership & Influence', total: 15, completed: 6, desc: 'Mastering organizational alignment and character-driven influence.' },
  { id: 'j3', title: 'Psychology of Ambition', category: 'Mind & Psychology', total: 10, completed: 8, desc: 'Unpacking the psychological drivers of modern achievement and peace.' }
];

export const STORE_ITEMS = [
  { id: 101, title: 'The Complete Being: Frameworks', price: 45.00, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800', desc: 'The foundational text for aligning physical, mental, and professional life. Linen hardcover.' },
  { id: 102, title: 'The Intentionality Journal', price: 32.00, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800', desc: 'A premium daily companion designed to help you execute your vision with calm precision.' },
  { id: 103, title: 'The Architecture of Mind (Course)', price: 150.00, image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?auto=format&fit=crop&q=80&w=800', desc: 'A 6-week intensive digital seminar on building resilience and spiritual depth.' }
];

export const EVENTS_DATA = [
  { id: 1, title: 'Annual Human Flourishing Symposium 2026', date: 'October 12-14, 2026', location: 'Oxford, UK / Virtual', type: 'Conference', desc: 'Our flagship annual gathering of fellows, scholars, and leaders exploring the integration of mind, soul, and society.' },
  { id: 2, title: 'The Architecture of Leadership: Live Roundtable', date: 'August 05, 2026', location: 'Online Live Stream', type: 'Roundtable', desc: 'An intimate virtual discussion with Julian Wright and guest experts on navigating organizational crisis with calm authority.' },
  { id: 3, title: 'Masterclass: Designing Digital Boundaries', date: 'August 19, 2026', location: 'Interactive Webinar', type: 'Masterclass', desc: 'A rigorous workshop on reclaiming attention, deep work protocols, and escaping the algorithmic trap.' }
];
