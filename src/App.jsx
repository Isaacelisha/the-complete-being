import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Menu, X, Play, ChevronLeft, ArrowRight, 
  Headphones, ArrowUpRight, Compass, Target, Brain, Users, Flag, Briefcase, Landmark, Leaf,
  CheckCircle2, Clock, Bookmark, BookmarkCheck, Share2, Award, Flame, Download, Eye, Square,
  Sliders, Filter, Mic, Video
} from 'lucide-react';

// --- MASTER STYLES & DESIGN TOKENS ---
const fontStyles = `
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
const MASTER_BRAND_LOGO = {
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
const SafeImage = ({ src, alt, className, ...props }) => {
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
const CONTRIBUTORS = {
  founder: { name: 'Julian Wright', role: 'Editor-in-Chief', bio: 'Julian Wright is the founder and editor-in-chief of The Complete Being. His writing focuses on human agency, digital attention economies, and philosophical alignment.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', researchInterests: ['Attention Economics', 'Philosophical Alignment', 'Contemplative Practice'], academicBackground: 'Oxford University, M.Phil Philosophy' },
  expert1: { name: 'Dr. Elena Rostova', role: 'Visiting Scholar, Psychology', bio: 'Dr. Elena Rostova is a clinical psychologist specializing in narrative therapy and the psychological architecture of modern ambition.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', researchInterests: ['Narrative Therapy', 'Burnout Recovery', 'Affective Regulation'], academicBackground: 'Columbia University, Ph.D. Clinical Psychology' },
  expert2: { name: 'Marcus Chen', role: 'Research Fellow, Economics', bio: 'Marcus Chen advises institutional funds on long-term capital allocation, economic stewardship, and sustainable market structures.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', researchInterests: ['Capital Stewardship', 'Multi-generational Trusts', 'Sustainable Markets'], academicBackground: 'Stanford University, Ph.D. Economics' },
  expert3: { name: 'Sarah Lin', role: 'Resident Writer, Theology', bio: 'Sarah Lin studies the intersection of ancient theological frameworks, contemplative practice, and contemporary meaning-making.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200', researchInterests: ['Comparative Theology', 'Monastic Tradition', 'Modern Meaning-making'], academicBackground: 'Princeton Theological Seminary, Th.M.' }
};

const PILLARS_DATA = [
  { name: 'Spirituality & Faith', icon: Compass, desc: 'Spiritual growth, theology, meaning, and the pursuit of service and the divine.' },
  { name: 'Identity & Purpose', icon: Target, desc: 'Forging character, self-awareness, calling, and a definitive life vision.' },
  { name: 'Mind & Psychology', icon: Brain, desc: 'Mastering emotional intelligence, resilience, focus, and mental models.' },
  { name: 'Relationships & Family', icon: Users, desc: 'Cultivating deep connection, marriage, parenting, and relational health.' },
  { name: 'Leadership & Influence', icon: Flag, desc: 'Guiding organizations, teams, and cultures with absolute integrity.' },
  { name: 'Work, Business & Career', icon: Briefcase, desc: 'Navigating strategy, innovation, entrepreneurship, and workplace excellence.' },
  { name: 'Wealth & Stewardship', icon: Landmark, desc: 'Understanding capital as a tool for freedom, stewardship, and legacy.' },
  { name: 'Health & Wellbeing', icon: Leaf, desc: 'Optimizing vitality, longevity, rest, and holistic physical health.' }
];
const PILLARS = PILLARS_DATA.map(p => p.name);

const calculateReadTime = (text) => {
  const words = text ? text.split(/\s+/).length : 50;
  const minutes = Math.max(1, Math.ceil(words / 225));
  return `${minutes} min read`;
};

// DYNAMIC FORMAT LABELS MAP
const typeLabels = {
  essay: 'Essays',
  article: 'Articles',
  podcast: 'Podcasts',
  video: 'Videos',
  conversation: 'Conversations',
  research: 'Research Papers',
  letter: "Founder's Journal",
  masterclass: 'Masterclasses'
};

const INITIAL_CONTENT = [
  { id: 1, type: 'essay', category: 'Identity & Purpose', date: 'July 14, 2026', monthYear: 'July 2026', updatedDate: 'Updated 2 days ago', author: CONTRIBUTORS.founder, title: 'The Architecture of Inner Stillness', difficulty: 'Intermediate', evidenceLevel: 'Research-backed', featured: true, trending: true, editorsPick: true, status: 'Published', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1600', excerpt: 'True balance isn\'t about equal time, it\'s about equal presence. How to cultivate a grounded mind in a fractured world.', content: 'The pursuit of wholeness begins not with addition, but with subtraction. We are constantly inundated with stimuli—a relentless tide of information demanding our immediate emotional response.\n\nTo build inner stillness is to construct a fortress of intentionality. It requires us to audit our consumption, not just of food, but of media, conversations, and environments. When we sit in solitude, we are not hiding from the world; we are preparing ourselves to engage with it more meaningfully.\n\nWisdom dictates that the loudest rooms often hold the least truth. By returning to the breath, to nature, and to contemplative silence, we recalibrate our spiritual compass.', sources: [{ id: 1, text: 'Newport, C. (2016). Deep Work: Rules for Focused Success in a Distracted World.', book: 'Deep Work', author: 'Cal Newport', publisher: 'Grand Central Publishing', year: '2016' }] },
  { id: 2, type: 'research', category: 'Wealth & Stewardship', date: 'July 10, 2026', monthYear: 'July 2026', updatedDate: 'Updated 6 days ago', author: CONTRIBUTORS.expert2, title: 'Empirical Study on Long-Term Capital Allocation', difficulty: 'Advanced', evidenceLevel: 'Research-backed', trending: true, editorsPick: true, status: 'Published', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1600', excerpt: 'A comprehensive institutional research paper examining stewardship models across multi-generational family trusts.', content: 'Money, stripped of its emotional baggage, is simply stored energy. Our quantitative research across 400 institutional portfolios reveals that capital preservation is directly correlated with spiritual and ethical clarity in distribution.\n\nTrue financial wisdom is aligning your capital with your deepest values.', sources: [{ id: 1, text: 'Institute Economic Whitepapers (2024).', book: 'Economic Review Vol IV', author: 'Marcus Chen', publisher: 'T_CB Press', year: '2024' }] },
  { id: 3, type: 'letter', category: 'Identity & Purpose', date: 'July 05, 2026', monthYear: 'July 2026', updatedDate: 'Updated 4 weeks ago', author: CONTRIBUTORS.founder, title: 'Notes on a Silent Retreat', difficulty: 'Beginner', evidenceLevel: 'Opinion Essay', featured: true, trending: false, editorsPick: false, status: 'Published', image: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=1600', excerpt: 'I spent the last week completely offline. No phone, no laptop, just a notebook and the horizon.', content: 'Sometimes you have to burn the boats. Last week, I looked at the infrastructure we had built and realized it was comfortable, but it lacked depth.\n\nI spent seven days in complete silence to map out the next decade. The clarity that emerges when you remove the digital noise is astounding.', sources: [{ id: 1, text: 'Personal Institute Journals, Vol. IV.', book: 'Journals Vol IV', author: 'Julian Wright', publisher: 'Private Archive', year: '2026' }] },
  { id: 4, type: 'podcast', category: 'Identity & Purpose', date: 'July 15, 2026', monthYear: 'July 2026', updatedDate: 'Updated 3 days ago', author: CONTRIBUTORS.founder, title: 'Audio Session: Solitude as Strategy', difficulty: 'Intermediate', evidenceLevel: 'Audio Recording', featured: false, trending: true, editorsPick: true, status: 'Published', image: 'https://images.unsplash.com/photo-1478147424042-3e3a9386c7cd?auto=format&fit=crop&q=80&w=1600', excerpt: 'A solo audio dispatch on why elite leaders schedule thinking time and how to protect silence.', content: 'Listen to the full audio episode exploring solitude as the ultimate strategic advantage in an age of constant connectivity.', sources: [{ id: 1, text: 'Institute Audio Archives (2026)', book: 'Solitude Podcast', author: 'Julian Wright', publisher: 'T_CB Audio', year: '2026' }] },
  { id: 5, type: 'essay', category: 'Mind & Psychology', date: 'June 28, 2026', monthYear: 'June 2026', updatedDate: 'Updated 1 month ago', author: CONTRIBUTORS.expert1, title: 'The Shadow of Modern Ambition', difficulty: 'Intermediate', evidenceLevel: 'Case Study', trending: true, editorsPick: false, status: 'Published', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1600', excerpt: 'Why the endless pursuit of "more" often leaves us with less of ourselves.', content: 'Ambition is a beautiful engine, but a terrible steering wheel. When we allow our drive for achievement to outpace our capacity for reflection, we create lives that look successful on the outside but feel entirely hollow on the inside.', sources: [{ id: 1, text: 'Jung, C. G. (1953). Two Essays on Analytical Psychology.', book: 'Two Essays', author: 'C.G. Jung', publisher: 'Princeton University Press', year: '1953' }] },
  { id: 6, type: 'masterclass', category: 'Work, Business & Career', date: 'June 20, 2026', monthYear: 'June 2026', updatedDate: 'Updated 1 month ago', author: CONTRIBUTORS.founder, title: 'The Anatomy of True Calling', difficulty: 'Advanced', evidenceLevel: 'Case Study', featured: false, trending: true, editorsPick: true, status: 'Published', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1600', excerpt: 'A masterclass lecture delivered at the 2026 Institute Symposium on aligning vocation with identity.', content: '[VIDEO LECTURE TRANSCRIPT]\n\nCalling is not something you stumble upon in a moment of convenience. It is forged in the crucible of discipline, self-examination, and service.', sources: [{ id: 1, text: 'Institute Symposia Proceedings, Vol. II.', book: 'Symposia Proceedings', author: 'Julian Wright', publisher: 'T_CB Press', year: '2026' }] },
  { id: 7, type: 'conversation', category: 'Work, Business & Career', date: 'June 15, 2026', monthYear: 'June 2026', updatedDate: 'Updated 6 weeks ago', author: CONTRIBUTORS.expert2, title: 'The Dignity of Deep Work', difficulty: 'Beginner', evidenceLevel: 'Conversation', featured: true, trending: true, editorsPick: false, status: 'Published', image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?auto=format&fit=crop&q=80&w=1600', excerpt: 'A conversation on navigating uncertainty, finding signal in the noise, and the spiritual practice of focus.', content: 'Listen to the full conversation archive and transcript highlights.', sources: [{ id: 1, text: 'Recorded live at the Institute Audio Labs, 2026.', book: 'Audio Archive', author: 'Marcus Chen', publisher: 'T_CB Media', year: '2026' }] },
  { id: 8, type: 'research', category: 'Health & Wellbeing', date: 'June 02, 2026', monthYear: 'June 2026', updatedDate: 'Updated 2 months ago', author: CONTRIBUTORS.expert1, title: 'Chronobiology and Cognitive Peak Performance', difficulty: 'Advanced', evidenceLevel: 'Research-backed', trending: false, editorsPick: false, status: 'Published', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1600', excerpt: 'Aligning your daily circadian rhythms with deep work blocks for sustained vitality and longevity.', content: 'Human biology is intricately tethered to solar cycles. Ignoring our circadian architecture in pursuit of 24-hour productivity guarantees cognitive depletion.', sources: [{ id: 1, text: 'Circadian Biology Review (2024).', book: 'Biological Rhythms', author: 'Elena Rostova', publisher: 'Academic Press', year: '2024' }] },
  { id: 9, type: 'conversation', category: 'Spirituality & Faith', date: 'July 18, 2026', monthYear: 'July 2026', updatedDate: 'Updated 3 days ago', author: CONTRIBUTORS.expert3, title: 'Dialogues on Contemplative Practice and Grace', difficulty: 'Intermediate', evidenceLevel: 'Conversation', trending: false, editorsPick: false, status: 'Published', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1600', excerpt: 'An intimate discussion exploring how quiet contemplation sustains spiritual resilience.', content: 'Contemplative practice is not an escape from reality; rather, it is the preparation required to meet reality with unshakeable grace and love.', sources: [{ id: 1, text: 'Institute Audio Dialogues (2026).', book: 'Faith Audio Vol I', author: 'Sarah Lin', publisher: 'T_CB Press', year: '2026' }] },
  { id: 10, type: 'article', category: 'Identity & Purpose', date: 'July 12, 2026', monthYear: 'July 2026', updatedDate: 'Updated 5 days ago', author: CONTRIBUTORS.founder, title: 'Crafting a Definitive Life Vision', difficulty: 'Advanced', evidenceLevel: 'Case Study', trending: true, editorsPick: false, status: 'Published', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600', excerpt: 'A comprehensive guide on translating abstract calling into daily disciplined action.', content: 'Without a definitive vision, human energy scatters into trivial pursuits. Here is the framework for unifying your life around your core calling.', sources: [{ id: 1, text: 'Symposia Visual Vault (2026).', book: 'Vision Frameworks', author: 'Julian Wright', publisher: 'T_CB Press', year: '2026' }] }
].map(item => ({ ...item, readTime: calculateReadTime(item.content) }));

const LEARNING_JOURNEYS = [
  { id: 'j1', title: 'Faith Foundations', category: 'Spirituality & Faith', total: 12, completed: 3, desc: 'A rigorous curriculum on ancient theology and spiritual discipline.' },
  { id: 'j2', title: 'Leadership Essentials', category: 'Leadership & Influence', total: 15, completed: 6, desc: 'Mastering organizational alignment and character-driven influence.' },
  { id: 'j3', title: 'Psychology of Ambition', category: 'Mind & Psychology', total: 10, completed: 8, desc: 'Unpacking the psychological drivers of modern achievement and peace.' }
];

const STORE_ITEMS = [
  { id: 101, title: 'The Complete Being: Frameworks', price: 45.00, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800', desc: 'The foundational text for aligning physical, mental, and professional life. Linen hardcover.' },
  { id: 102, title: 'The Intentionality Journal', price: 32.00, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800', desc: 'A premium daily companion designed to help you execute your vision with calm precision.' },
  { id: 103, title: 'The Architecture of Mind (Course)', price: 150.00, image: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?auto=format&fit=crop&q=80&w=800', desc: 'A 6-week intensive digital seminar on building resilience and spiritual depth.' }
];

const EVENTS_DATA = [
  { id: 1, title: 'Annual Human Flourishing Symposium 2026', date: 'October 12-14, 2026', location: 'Oxford, UK / Virtual', type: 'Conference', desc: 'Our flagship annual gathering of fellows, scholars, and leaders exploring the integration of mind, soul, and society.' },
  { id: 2, title: 'The Architecture of Leadership: Live Roundtable', date: 'August 05, 2026', location: 'Online Live Stream', type: 'Roundtable', desc: 'An intimate virtual discussion with Julian Wright and guest experts on navigating organizational crisis with calm authority.' },
  { id: 3, title: 'Masterclass: Designing Digital Boundaries', date: 'August 19, 2026', location: 'Interactive Webinar', type: 'Masterclass', desc: 'A rigorous workshop on reclaiming attention, deep work protocols, and escaping the algorithmic trap.' }
];

// --- EXTRACTED UI COMPONENTS ---

const BtnPrimary = ({ children, onClick, className = '', type = 'button', ...props }) => (
  <button 
    type={type}
    onClick={onClick} 
    className={`bg-[var(--color-forest)] text-[var(--color-ivory)] px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[var(--color-gold)] hover:text-[var(--color-forest)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2 transition-colors duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const BtnGhost = ({ children, onClick, className = '', type = 'button', ...props }) => (
  <button 
    type={type}
    onClick={onClick} 
    className={`border border-[var(--color-forest)] text-[var(--color-forest)] px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[var(--color-forest)] hover:text-[var(--color-ivory)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2 transition-colors duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const BrandLogo = ({ theme = 'dark', className = '' }) => {
  const isDark = theme === 'dark';
  const textColorClass = isDark ? 'text-[var(--color-forest)]' : 'text-[var(--color-ivory)]';
  const goldColorClass = 'text-[var(--color-gold)]';

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`w-16 h-16 md:w-24 md:h-24 mb-6 ${goldColorClass}`}>
        {MASTER_BRAND_LOGO.svgPath}
      </div>
      
      <div className={`flex items-center justify-center gap-4 mb-3 ${goldColorClass}`}>
        <div className="w-10 h-[1px] bg-current"></div>
        <div className="text-[10px] md:text-[11px] tracking-[0.4em] font-serif uppercase mt-1">THE</div>
        <div className="w-10 h-[1px] bg-current"></div>
      </div>
      
      <div className={`text-4xl md:text-5xl font-serif leading-tight tracking-[0.15em] ${textColorClass} text-center uppercase`}>
        COMPLETE<br />BEING
      </div>
      
      <div className={`flex items-center justify-center gap-4 mt-6 ${goldColorClass}`}>
        <div className="w-12 h-[1px] bg-current"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
        <div className="w-12 h-[1px] bg-current"></div>
      </div>
    </div>
  );
};

const ContributorBlockFull = ({ author, theme = 'dark', isConversation = false, className = '' }) => {
  if (!author) return null;
  const isDark = theme === 'dark';
  return (
    <div className={`flex items-center gap-4 md:gap-5 ${className}`}>
      <SafeImage src={author.avatar} alt={author.name} className={`w-12 h-12 md:w-14 md:h-14 rounded-full object-cover grayscale opacity-95 border ${isDark ? 'border-[var(--color-ivory-30)]' : 'border-[var(--color-forest-20)]'}`} />
      <div>
        <div className={`text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-[var(--color-gold)] mb-1.5 font-medium`}>
          {isConversation ? 'In Conversation With' : author.role}
        </div>
        <div className={`text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium ${isDark ? 'text-[var(--color-ivory)]' : 'text-[var(--color-forest)]'}`}>
          {author.name}
        </div>
      </div>
    </div>
  );
};

const ContributorBlockText = ({ author }) => {
  if (!author) return null;
  return (
    <span className="text-[9px] tracking-[0.3em] uppercase text-[var(--color-forest-50)] font-medium" aria-label={`Contributor: ${author.name}`}>
      CONTRIBUTOR: {author.name}
    </span>
  );
};

const Navbar = ({ isDarkSection, navigate, setIsSearchOpen, setIsAccountOpen, setIsMenuOpen, savedArticlesCount }) => {
  const textClass = isDarkSection ? 'text-[var(--color-ivory)]' : 'text-[var(--color-forest)]';
  const bgClass = isDarkSection ? 'bg-transparent py-6 md:py-10 border-b border-transparent' : 'bg-[var(--color-ivory-90)] backdrop-blur-xl border-b border-[var(--color-forest-05)] py-4 shadow-sm';

  const navItems = ['Institute', 'Library', 'Pillars', 'Conversations', "Founder's Journal", 'Events', 'Contributors', 'Press', 'CMS Admin'];
  const views = ['about', 'home', 'home', 'home', 'journal', 'events', 'contributors', 'store', 'admin'];
  const cats = ['All', 'All', 'All', 'conversation', 'All', 'All', 'All', 'All', 'All'];

  return (
    <header role="banner" className={`fixed top-0 w-full z-45 transition-all duration-700 ${bgClass}`}>
      <div className="max-w-[100rem] mx-auto px-6 md:px-16 flex items-center justify-between">
        <button className="flex items-center cursor-pointer focus:outline-none" onClick={() => navigate('home')} aria-label="Navigate to Home">
          {isDarkSection ? (
             <div className="flex items-center gap-3 md:gap-5 opacity-0 pointer-events-none transition-opacity duration-700">
               <div className="w-6 h-6 text-[var(--color-gold)]">{MASTER_BRAND_LOGO.svgPath}</div>
               <span className="font-serif text-xs md:text-sm tracking-[0.2em] uppercase text-[var(--color-ivory)] hidden md:block">The Complete Being</span>
             </div>
          ) : (
             <div className="flex items-center gap-3 md:gap-5 opacity-100 transition-opacity duration-700">
               <div className="w-6 h-6 text-[var(--color-gold)]">{MASTER_BRAND_LOGO.svgPath}</div>
               <span className="font-serif text-xs md:text-sm tracking-[0.2em] uppercase text-[var(--color-forest)] hidden md:block">The Complete Being</span>
             </div>
          )}
        </button>
        <nav role="navigation" aria-label="Main Navigation" className={`hidden lg:flex items-center gap-10 text-[10px] tracking-[0.3em] uppercase font-medium ${textClass} transition-colors duration-700`}>
          {navItems.map((item, i) => {
            return (
              <button key={item} onClick={() => { if(item==='Pillars') {navigate('home'); setTimeout(()=>document.getElementById('pillars')?.scrollIntoView(),100);} else navigate(views[i], cats[i]); }} 
                className={`hover:text-[var(--color-gold)] transition-colors duration-500 focus:outline-none focus:text-[var(--color-gold)] ${item==='CMS Admin' ? 'text-[var(--color-gold)] font-bold' : ''}`}>
                {item}
              </button>
            )
          })}
        </nav>
        <div className={`flex items-center gap-6 md:gap-8 ${textClass} transition-colors duration-700`}>
          <button aria-label="Search" onClick={() => setIsSearchOpen(true)} className="hover:text-[var(--color-gold)] transition-colors duration-500 flex items-center gap-2 focus:outline-none"><Search size={18} strokeWidth={1} /><span className="text-[10px] uppercase tracking-widest hidden sm:inline">Search</span></button>
          <button aria-label="Personal Dashboard" onClick={() => setIsAccountOpen(true)} className="hover:text-[var(--color-gold)] transition-colors duration-500 relative flex items-center gap-2 focus:outline-none">
             <Bookmark size={18} strokeWidth={1} />
             <span className="text-[10px] uppercase tracking-widest hidden sm:inline">Dashboard</span>
             {savedArticlesCount > 0 && <span className="absolute -top-1 -right-2 bg-[var(--color-gold)] text-[var(--color-forest)] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold" aria-label={`${savedArticlesCount} saved articles`}>{savedArticlesCount}</span>}
          </button>
          <button aria-label="Open Menu" onClick={() => setIsMenuOpen(true)} className="hover:text-[var(--color-gold)] transition-colors duration-500 lg:hidden focus:outline-none"><Menu size={24} strokeWidth={1} /></button>
        </div>
      </div>
    </header>
  );
};

const SearchOverlay = ({ isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, filteredContent, openPost }) => {
  if (!isSearchOpen) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Search Library" className="fixed inset-0 z-50 bg-[var(--color-ivory)] animate-in fade-in duration-500 flex flex-col overflow-y-auto">
      <div className="flex justify-between items-center p-6 md:p-12 shrink-0">
        <div className="text-[10px] tracking-[0.4em] uppercase font-medium text-[var(--color-gold)]">Natural Language Semantic Search</div>
        <button aria-label="Close Search" onClick={() => setIsSearchOpen(false)} className="text-[var(--color-charcoal)] hover:text-[var(--color-gold)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"><X size={36} strokeWidth={1} /></button>
      </div>
      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 flex-1 flex flex-col pb-20">
        <input type="text" placeholder="Try asking: 'I'm struggling with purpose' or 'burnout'..." className="w-full text-2xl md:text-5xl font-serif text-[var(--color-forest)] placeholder-[var(--color-forest-20)] border-b border-[var(--color-forest-10)] focus:border-[var(--color-gold)] outline-none bg-transparent pb-6 md:pb-8 mb-8 transition-colors" autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        
        <div className="mb-8 shrink-0">
          <span className="text-[9px] tracking-[0.3em] uppercase text-[var(--color-forest-40)] block mb-4 font-medium">Trending Semantic Queries</span>
          <div className="flex flex-wrap gap-3">
            {['I am struggling with purpose', 'burnout recovery', 'Capital Allocation', 'Deep Work', 'Faith Foundations', 'Marriage Covenant'].map(term => (
              <button key={term} onClick={() => setSearchQuery(term)} className="bg-[var(--color-ivory)] border border-[var(--color-forest-10)] px-4 py-2 text-xs text-[var(--color-forest)] hover:border-[var(--color-gold)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]">
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {filteredContent.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[var(--color-forest-40)] text-2xl font-serif italic mb-2">We searched every shelf in our library.</p>
              <p className="text-xs tracking-widest uppercase text-[var(--color-gold)]">No documents matched "{searchQuery}".</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredContent.map(post => (
              <button key={post.id} className="text-left w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2 group flex items-start gap-6 bg-[var(--color-ivory)] p-4 border border-[var(--color-forest-05)] hover:border-[var(--color-forest-15)] transition-colors" onClick={() => { openPost(post); setIsSearchOpen(false); }}>
                <SafeImage src={post.image} alt={post.title} className="w-20 h-20 object-cover grayscale-[30%] opacity-80 group-hover:opacity-100 transition-opacity" />
                <div>
                  <span className="text-[9px] text-[var(--color-gold)] tracking-[0.3em] mb-1 block uppercase font-medium">{post.category}</span>
                  <h3 className="text-lg font-serif text-[var(--color-forest)] group-hover:text-[var(--color-gold)] transition-colors leading-snug mb-2">{post.title}</h3>
                  <ContributorBlockText author={post.author} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AccountDrawer = ({ 
  isAccountOpen, setIsAccountOpen, userProgress, savedArticles, highlights, 
  isLoggedIn, setIsLoggedIn, userEmail, setUserEmail, openPost, toggleSaveArticle, showToast 
}) => {
  if (!isAccountOpen) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Personal Learning Dashboard" className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-300">
      <div className="bg-[var(--color-ivory)] w-full max-w-lg h-full shadow-2xl p-6 md:p-8 flex flex-col overflow-y-auto">
         <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--color-forest-10)]">
            <h3 className="font-serif text-xl md:text-2xl text-[var(--color-forest)]">Learning Dashboard</h3>
            <button aria-label="Close Dashboard" onClick={() => setIsAccountOpen(false)} className="text-[var(--color-charcoal)] hover:text-[var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"><X size={24} /></button>
         </div>
         
         <div className="grid grid-cols-3 gap-3 mb-6 bg-[var(--color-forest-05)] p-4 text-center">
           <div>
             <div className="flex items-center justify-center gap-1 text-[var(--color-gold)] mb-1"><Flame size={16} aria-hidden="true" /> <span className="font-serif text-lg font-bold text-[var(--color-forest)]">{userProgress.streak} Days</span></div>
             <span className="text-[8px] tracking-widest uppercase text-[var(--color-forest-60)] font-medium">Activity Streak (Local)</span>
           </div>
           <div>
             <div className="flex items-center justify-center gap-1 text-[var(--color-gold)] mb-1"><Award size={16} aria-hidden="true" /> <span className="font-serif text-lg font-bold text-[var(--color-forest)]">{userProgress.completedCount}</span></div>
             <span className="text-[8px] tracking-widest uppercase text-[var(--color-forest-60)] font-medium">Completed Reads (Local)</span>
           </div>
           <div>
             <div className="flex items-center justify-center gap-1 text-[var(--color-gold)] mb-1"><Clock size={16} aria-hidden="true" /> <span className="font-serif text-lg font-bold text-[var(--color-forest)]">{userProgress.hoursSpent}h</span></div>
             <span className="text-[8px] tracking-widest uppercase text-[var(--color-forest-60)] font-medium">Active Session (Local)</span>
           </div>
         </div>

         <div className="mb-6">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold)] font-medium mb-3">Interactive Learning Journeys</h4>
            <div className="space-y-3">
              {LEARNING_JOURNEYS.map(j => {
                const percent = Math.round((j.completed / j.total) * 100);
                return (
                  <div key={j.id} className="bg-[var(--color-ivory)] p-4 border border-[var(--color-forest-10)]">
                     <div className="flex justify-between text-xs mb-1">
                       <span className="font-serif font-medium text-[var(--color-forest)]">{j.title}</span>
                       <span className="text-[var(--color-gold)] font-medium">{j.completed} / {j.total} completed</span>
                     </div>
                     <p className="text-[10px] text-[var(--color-charcoal-70)] mb-2">{j.desc}</p>
                     <div className="w-full bg-[var(--color-forest-10)] h-1.5" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
                        <div className="bg-[var(--color-gold)] h-1.5" style={{ width: `${percent}%` }}></div>
                     </div>
                  </div>
                );
              })}
            </div>
         </div>

         <div className="mb-6">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold)] font-medium mb-3">Saved Documents ({savedArticles.length})</h4>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {savedArticles.length === 0 ? (
                <p className="text-xs text-[var(--color-charcoal-50)] font-light italic text-center py-3">Your reading list is empty.</p>
              ) : (
                savedArticles.map(art => (
                   <button key={art.id} className="w-full text-left bg-[var(--color-ivory)] p-2.5 shadow-sm border border-[var(--color-forest-05)] flex justify-between items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]" onClick={() => { openPost(art); setIsAccountOpen(false); }}>
                      <div>
                         <span className="text-[8px] text-[var(--color-gold)] tracking-widest uppercase block mb-0.5">{art.category}</span>
                         <h4 className="font-serif text-xs text-[var(--color-forest)] group-hover:text-[var(--color-gold)] transition-colors leading-tight">{art.title}</h4>
                      </div>
                      <div aria-label="Remove from Saved" onClick={(e) => { e.stopPropagation(); toggleSaveArticle(art); }} className="text-[var(--color-gold)] hover:text-red-600 transition-colors cursor-pointer"><BookmarkCheck size={16} /></div>
                   </button>
                ))
              )}
            </div>
         </div>

         <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
               <h4 className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold)] font-medium">Saved Highlights ({highlights.length})</h4>
               {highlights.length > 0 && (
                 <button onClick={() => {
                   const text = highlights.map(h => `"${h.text}" — (${h.title})`).join('\n\n');
                   const blob = new Blob([text], { type: 'text/plain' });
                   const url = URL.createObjectURL(blob);
                   const a = document.createElement('a'); a.href = url; a.download = 'My-Complete-Being-Highlights.txt'; a.click();
                   showToast('Exported highlights successfully.');
                 }} className="text-[9px] uppercase tracking-widest text-[var(--color-forest)] flex items-center gap-1 hover:text-[var(--color-gold)] focus:outline-none"><Download size={12} /> Export Notes</button>
               )}
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
               {highlights.length === 0 ? (
                 <p className="text-xs text-[var(--color-charcoal-50)] font-light italic text-center py-3">Select text in any article to highlight.</p>
               ) : (
                 highlights.map((h, i) => (
                    <div key={i} className="bg-[var(--color-ivory)] p-2.5 border-l-2 border-[var(--color-gold)] text-xs font-serif italic text-[var(--color-charcoal)] border-t border-r border-b border-[var(--color-forest-05)]">
                       "{h.text}"
                       <span className="block text-[8px] not-italic tracking-widest text-[var(--color-forest-50)] mt-1 font-sans">— {h.title}</span>
                    </div>
                 ))
               )}
            </div>
         </div>

         <div className="mt-auto pt-4 border-t border-[var(--color-forest-15)]">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-forest-50)] block mb-2 font-medium">Member Session</span>
            {isLoggedIn ? (
              <div className="space-y-2">
                <p className="text-xs text-[var(--color-charcoal)]">Signed in as <strong className="text-[var(--color-forest)]">{userEmail}</strong></p>
                <button onClick={() => { setIsLoggedIn(false); setUserEmail(''); showToast('Signed out successfully.'); }} className="border border-red-800/30 text-red-800 text-xs w-full py-2 uppercase tracking-wider hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-800 transition-colors">
                  Sign Out
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!userEmail) return;
                setIsLoggedIn(true);
                showToast(`Welcome back, ${userEmail}`);
              }} className="space-y-3">
                <input 
                  type="email" 
                  aria-label="Email address"
                  placeholder="Enter your email" 
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-[var(--color-ivory)] border border-[var(--color-forest-20)] p-3 text-xs outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                  required 
                />
                <BtnPrimary type="submit" className="w-full">Sign In / Register</BtnPrimary>
              </form>
            )}
         </div>
      </div>
    </div>
  );
};

const MenuOverlay = ({ isMenuOpen, setIsMenuOpen, navigate }) => {
  if (!isMenuOpen) return null;
  const navLinks = [
    { name: 'The Institute', view: 'about', category: 'All' },
    { name: 'The Library', view: 'home', category: 'All' },
    { name: 'Conversations', view: 'home', category: 'conversation' },
    { name: "Founder's Journal", view: 'journal', category: 'All' },
    { name: 'Events & Conferences', view: 'events', category: 'All' },
    { name: 'Contributors', view: 'contributors', category: 'All' },
    { name: 'Institute Press', view: 'store', category: 'All' }
  ];
  return (
    <div role="dialog" aria-modal="true" aria-label="Main Navigation Menu" className="fixed inset-0 z-50 bg-[var(--color-forest)] animate-in fade-in duration-500 flex flex-col overflow-y-auto">
      <div className="flex justify-between items-start p-6 md:p-16 shrink-0">
        <BrandLogo theme="light" className="scale-75 origin-top-left" />
        <button aria-label="Close Menu" onClick={() => setIsMenuOpen(false)} className="text-[var(--color-ivory)] hover:text-[var(--color-gold)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"><X size={36} strokeWidth={1} /></button>
      </div>
      <div className="flex-1 flex flex-col lg:flex-row max-w-[100rem] w-full mx-auto px-6 md:px-16 pb-32 pt-10 gap-16 md:gap-32">
        <div className="flex-1">
          <h4 className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium mb-10 md:mb-16">Directory</h4>
          <div className="flex flex-col space-y-8 md:space-y-10 items-start">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => navigate(link.view, link.category)} className="text-4xl md:text-6xl font-serif text-[var(--color-ivory-90)] hover:text-[var(--color-gold)] transition-colors duration-500 text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] rounded">{link.name}</button>
            ))}
          </div>
        </div>
        <div className="flex-1 lg:border-l lg:border-[var(--color-ivory-10)] lg:pl-32">
          <h4 className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium mb-10 md:mb-16">The 8 Pillars</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 md:gap-y-12 gap-x-12">
            {PILLARS.map((pillar) => (
              <button key={pillar} onClick={() => navigate('home', pillar)} className="text-base md:text-xl font-serif text-[var(--color-ivory-60)] hover:text-[var(--color-gold)] transition-colors duration-500 text-left flex items-center gap-4 group focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] rounded p-1 -ml-1">
                <ArrowRight size={14} className="opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-500 text-[var(--color-gold)]" aria-hidden="true" />
                {pillar}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ navigate, showToast }) => (
  <footer role="contentinfo" className="dark-section bg-[var(--color-forest)] text-[var(--color-ivory)] pt-32 md:pt-48 pb-20 mt-32 md:mt-48 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] md:w-[1000px] h-[500px] md:h-[1000px] bg-[var(--color-ivory-05)] rounded-full blur-[100px] md:blur-[200px] pointer-events-none" aria-hidden="true"></div>
    <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent" aria-hidden="true"></div>
    
    <div className="max-w-[100rem] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 relative z-10">
      <div className="lg:col-span-4 flex flex-col">
        <BrandLogo theme="light" className="mb-12 scale-90 origin-left" />
        <p className="text-[var(--color-ivory-60)] text-sm leading-loose mb-16 max-w-sm font-light">A modern institute for human flourishing. Cultivating wholeness, clarity, and transformation through intentional architecture of the mind.</p>
        <div className="mt-auto text-[9px] text-[var(--color-gold)] opacity-50 tracking-[0.3em] uppercase">© {new Date().getFullYear()} The Complete Being Institute.</div>
      </div>
      <div className="lg:col-span-3 lg:col-start-6 pt-6">
        <h3 className="text-[10px] tracking-[0.4em] text-[var(--color-gold)] uppercase mb-8 md:mb-12 font-medium">Directory</h3>
        <ul className="space-y-4 md:space-y-6 text-xs tracking-[0.1em] font-light text-[var(--color-ivory-80)] uppercase">
          <li><button onClick={() => navigate('about')} className="hover:text-[var(--color-gold)] transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]">The Institute</button></li>
          <li><button onClick={() => navigate('home')} className="hover:text-[var(--color-gold)] transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]">The Library</button></li>
          <li><button onClick={() => navigate('journal')} className="hover:text-[var(--color-gold)] transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]">Founder's Journal</button></li>
          <li><button onClick={() => navigate('events')} className="hover:text-[var(--color-gold)] transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]">Events & Conferences</button></li>
          <li><button onClick={() => navigate('contributors')} className="hover:text-[var(--color-gold)] transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]">Fellows & Contributors</button></li>
          <li><button onClick={() => navigate('store')} className="hover:text-[var(--color-gold)] transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]">Institute Press</button></li>
          <li><button onClick={() => navigate('legal')} className="hover:text-[var(--color-gold)] transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]">Legal & Policies</button></li>
        </ul>
      </div>
      <div className="lg:col-span-4 pt-6 flex flex-col">
        <h3 className="text-[10px] tracking-[0.4em] text-[var(--color-gold)] uppercase mb-8 md:mb-12 font-medium">Letters of Intent</h3>
        <p className="text-sm text-[var(--color-ivory-60)] mb-10 md:mb-12 font-light leading-loose">Join a global community receiving weekly insights on human flourishing and profound strategy.</p>
        <form onSubmit={(e) => { e.preventDefault(); showToast("Successfully subscribed to Letters of Intent."); }} className="flex flex-col gap-8 md:gap-10">
          <input aria-label="Email Address for newsletter" type="email" placeholder="Email Address" className="bg-transparent border-b border-[var(--color-ivory-20)] text-[var(--color-ivory)] placeholder-[var(--color-ivory-40)] outline-none pb-4 text-xs tracking-widest focus:border-[var(--color-gold)] transition-colors w-full" required />
          <button type="submit" className="text-[var(--color-gold)] text-[10px] tracking-[0.3em] uppercase font-medium hover:text-[var(--color-ivory)] transition-colors flex items-center gap-3 w-fit pb-2 border-b border-[var(--color-gold-30)] hover:border-[var(--color-ivory)] focus:outline-none focus:border-[var(--color-gold)]">
            Subscribe <ArrowRight size={14} aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  </footer>
);

// --- TOP-LEVEL SUBVIEWS ---

// Dedicated Founder's Journal Series Archive View
const FoundersJournalView = ({ contentList, openPost }) => {
  const [segment, setSegment] = useState('all');

  // Filter for all content authored by the Founder or implicitly typed as a journal letter
  const journalPosts = useMemo(() => {
    return contentList.filter(c => c.type === 'letter' || c.author?.name === CONTRIBUTORS.founder.name);
  }, [contentList]);

  const displayedPosts = useMemo(() => {
    if (segment === 'all') return journalPosts;
    return journalPosts.filter(i => i.type === segment);
  }, [segment, journalPosts]);

  const featuredPost = displayedPosts[0] || null;

  const availableTypes = useMemo(() => {
    const types = new Set(journalPosts.map(p => p.type));
    return Array.from(types).sort();
  }, [journalPosts]);

  return (
    <div className="animate-in fade-in duration-1000 min-h-screen py-32 md:py-48 max-w-[100rem] mx-auto px-6 md:px-16">
       <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium block mb-6">Editorial Series</span>
          <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-forest)] mb-8">Founder's Journal</h1>
          <p className="text-[var(--color-charcoal-70)] font-light text-lg md:text-2xl leading-relaxed">
            Reflections, strategy, and notes on navigating the modern era from the Editor-in-Chief.
          </p>
       </div>

       {/* Scalable, dynamically generated filter bar */}
       <div className="flex justify-center gap-6 md:gap-10 overflow-x-auto hide-scrollbar border-b border-[var(--color-forest-10)] pb-6 mb-20">
          <button 
             onClick={() => setSegment('all')} 
             className={`text-[10px] tracking-[0.3em] uppercase font-medium pb-4 border-b transition-colors duration-300 capitalize focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)] ${segment === 'all' ? 'border-[var(--color-gold)] text-[var(--color-forest)]' : 'border-transparent text-[var(--color-forest-40)] hover:text-[var(--color-forest)]'}`}
          >
             All Entries ({journalPosts.length})
          </button>
          {availableTypes.map(type => {
             const count = journalPosts.filter(i => i.type === type).length;
             return (
               <button 
                 key={type} 
                 onClick={() => setSegment(type)} 
                 className={`text-[10px] tracking-[0.3em] uppercase font-medium pb-4 border-b transition-colors duration-300 capitalize focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)] ${segment === type ? 'border-[var(--color-gold)] text-[var(--color-forest)]' : 'border-transparent text-[var(--color-forest-40)] hover:text-[var(--color-forest)]'}`}
               >
                 {typeLabels[type] || `${type}s`} ({count})
               </button>
             );
          })}
       </div>

       {segment === 'all' && featuredPost && (
          <button className="text-left w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center bg-[var(--color-ivory)] p-8 md:p-16 shadow-sm border border-[var(--color-forest-05)] hover:border-[var(--color-forest-15)] mb-24 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] transition-colors" onClick={() => openPost(featuredPost)}>
             <div className="lg:col-span-7 aspect-[16/9] overflow-hidden relative w-full">
                <SafeImage src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover cinematic-img grayscale-[10%]" />
             </div>
             <div className="lg:col-span-5 flex flex-col justify-center w-full">
                <span className="text-[9px] text-[var(--color-gold)] tracking-[0.3em] uppercase font-medium mb-4 block">Latest Entry</span>
                <h3 className="text-3xl md:text-4xl font-serif text-[var(--color-forest)] mb-6 group-hover:text-[var(--color-gold)] transition-colors leading-tight">{featuredPost.title}</h3>
                <p className="text-[var(--color-charcoal-60)] font-light leading-relaxed mb-8">{featuredPost.excerpt}</p>
                <ContributorBlockText author={featuredPost.author} />
             </div>
          </button>
       )}

       <div className="mb-24">
          <h3 className="text-2xl font-serif text-[var(--color-forest)] mb-12 border-b border-[var(--color-forest-10)] pb-4">
             {segment === 'all' ? `Complete Collection (${displayedPosts.length})` : `${typeLabels[segment] || `${segment}s`} Archive (${displayedPosts.length})`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
             {displayedPosts.map(post => (
                <button key={post.id} className="text-left w-full bg-[var(--color-ivory)] p-8 shadow-sm border border-[var(--color-forest-05)] hover:border-[var(--color-forest-15)] flex flex-col group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] transition-colors" onClick={() => openPost(post)}>
                   <div className="aspect-video overflow-hidden relative mb-6 w-full">
                      <SafeImage src={post.image} alt={post.title} className="w-full h-full object-cover cinematic-img grayscale-[10%]" />
                      <div className="absolute top-4 right-4 bg-[var(--color-forest-80)] backdrop-blur text-[var(--color-ivory)] px-3 py-1 text-[9px] tracking-widest uppercase">
                         {post.type}
                      </div>
                   </div>
                   <span className="text-[9px] text-[var(--color-gold)] tracking-widest uppercase mb-3 block font-medium">{post.category} • {post.date}</span>
                   <h4 className="text-2xl font-serif text-[var(--color-forest)] mb-4 group-hover:text-[var(--color-gold)] transition-colors leading-snug">{post.title}</h4>
                   <p className="text-[var(--color-charcoal-60)] font-light text-sm line-clamp-3 mb-6 flex-grow">{post.excerpt}</p>
                   <div className="mt-auto border-t border-[var(--color-forest-10)] pt-4 w-full"><ContributorBlockText author={post.author} /></div>
                </button>
             ))}
             {displayedPosts.length === 0 && (
                <p className="text-[var(--color-charcoal-50)] font-serif italic py-12 col-span-full text-center">No documents currently archived under this specific format.</p>
             )}
          </div>
       </div>
    </div>
  );
};

const InstituteView = () => (
  <div className="animate-in fade-in duration-1000 min-h-screen py-32 md:py-48 max-w-[85rem] mx-auto px-6 md:px-16">
    <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium block mb-6">About The Institute</span>
    <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-forest)] mb-12">The Architecture of Wholeness</h1>
    <div className="prose prose-lg font-light text-lg text-[var(--color-charcoal-80)] leading-relaxed space-y-8 mb-20">
      <p>The Complete Being Institute is a research center and publication dedicated to the rigorous exploration of human agency, spiritual depth, intellectual rigor, and sustainable flourishing in the modern era.</p>
    </div>
  </div>
);

const StoreView = ({ showToast }) => (
  <div className="animate-in fade-in duration-1000 min-h-screen py-32 md:py-48 max-w-[100rem] mx-auto px-6 md:px-16">
    <div className="text-center max-w-3xl mx-auto mb-20">
      <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium block mb-6">Institute Press</span>
      <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-forest)] mb-6">Curated Editions & Journals</h1>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[85rem] mx-auto">
      {STORE_ITEMS.map(item => (
        <div key={item.id} className="bg-[var(--color-ivory)] p-6 shadow-sm border border-[var(--color-forest-05)] flex flex-col">
          <SafeImage src={item.image} alt={item.title} className="w-full h-80 object-cover mb-6 grayscale-[10%]" />
          <h3 className="font-serif text-2xl text-[var(--color-forest)] mb-2">{item.title}</h3>
          <p className="text-xs text-[var(--color-gold)] tracking-widest font-bold mb-4">${item.price.toFixed(2)} USD</p>
          <p className="text-sm text-[var(--color-charcoal-60)] font-light mb-8 flex-grow">{item.desc}</p>
          <BtnPrimary onClick={() => showToast(`Added "${item.title}" to cart.`)} className="w-full">
            Acquire Edition
          </BtnPrimary>
        </div>
      ))}
    </div>
  </div>
);

const EventsView = ({ showToast }) => (
  <div className="animate-in fade-in duration-1000 min-h-screen py-32 md:py-48 max-w-[85rem] mx-auto px-6 md:px-16">
    <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium block mb-6">Gatherings & Symposia</span>
    <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-forest)] mb-16">Events & Live Sessions</h1>
    <div className="space-y-12">
      {EVENTS_DATA.map(ev => (
        <div key={ev.id} className="bg-[var(--color-ivory)] p-8 md:p-12 border border-[var(--color-forest-10)] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-sm">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest text-[var(--color-gold)] mb-3 font-medium">
              <span>{ev.type}</span> • <span>{ev.date}</span> • <span>{ev.location}</span>
            </div>
            <h3 className="font-serif text-3xl text-[var(--color-forest)] mb-4">{ev.title}</h3>
            <p className="text-sm font-light text-[var(--color-charcoal-70)] leading-relaxed">{ev.desc}</p>
          </div>
          <BtnGhost onClick={() => showToast(`Registered for ${ev.title}`)}>
            Register / RSVP
          </BtnGhost>
        </div>
      ))}
    </div>
  </div>
);

const ContributorsView = () => (
  <div className="animate-in fade-in duration-1000 min-h-screen py-32 md:py-48 max-w-[85rem] mx-auto px-6 md:px-16">
    <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium block mb-6">Faculty & Fellows</span>
    <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-forest)] mb-16">The Minds Behind the Work</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
      {Object.values(CONTRIBUTORS).map((c, i) => (
        <div key={i} className="bg-[var(--color-ivory)] p-8 border border-[var(--color-forest-05)] flex gap-8 items-start shadow-sm">
          <SafeImage src={c.avatar} alt={c.name} className="w-24 h-24 rounded-full object-cover grayscale shrink-0 border border-[var(--color-forest-10)]" />
          <div>
            <span className="text-[9px] tracking-widest uppercase text-[var(--color-gold)] block mb-1 font-medium">{c.role}</span>
            <h3 className="font-serif text-2xl text-[var(--color-forest)] mb-3">{c.name}</h3>
            <p className="text-xs text-[var(--color-charcoal-70)] font-light leading-relaxed mb-4">{c.bio}</p>
            <div className="text-[10px] font-mono text-[var(--color-forest-50)]">{c.academicBackground}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LegalView = () => (
  <div className="animate-in fade-in duration-1000 min-h-screen py-32 md:py-48 max-w-4xl mx-auto px-6 md:px-16">
    <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium block mb-6">Policies & Governance</span>
    <h1 className="text-4xl md:text-6xl font-serif text-[var(--color-forest)] mb-12">Legal & Privacy Charter</h1>
    <div className="prose font-light text-sm md:text-base text-[var(--color-charcoal-80)] leading-relaxed space-y-6">
      <p>The Complete Being Institute adheres to strict ethical standards in digital privacy, data collection, and scholarly integrity.</p>
    </div>
  </div>
);

const AdminDashboardView = ({ contentList, setContentList, showToast, navigate }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Identity & Purpose');
  const [newType, setNewType] = useState('essay');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newTitle || !newExcerpt) {
      showToast('Please fill in all required fields.');
      return;
    }
    const fullText = newContent || newExcerpt;
    const newItem = {
      id: Date.now(),
      type: newType,
      category: newCategory,
      date: 'August 03, 2026',
      monthYear: 'August 2026',
      updatedDate: 'Just now',
      author: CONTRIBUTORS.founder,
      title: newTitle,
      readTime: calculateReadTime(fullText),
      difficulty: 'Intermediate',
      evidenceLevel: 'Research-backed',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1600',
      excerpt: newExcerpt,
      content: fullText,
      sources: [{ id: 1, text: 'Authoritative Institute Archives', book: newTitle, author: 'Julian Wright', publisher: 'T_CB Press', year: '2026' }]
    };
    setContentList([newItem, ...contentList]);
    setNewTitle(''); setNewExcerpt(''); setNewContent('');
    showToast('Successfully published new document to library.');
    navigate('home');
  };

  return (
    <div className="animate-in fade-in duration-1000 min-h-screen py-32 md:py-48 max-w-4xl mx-auto px-6 md:px-16">
      <div className="flex justify-between items-center mb-12">
        <div>
          <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium block mb-2">Editorial CMS</span>
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-forest)]">Publish New Document</h1>
        </div>
        <button onClick={() => navigate('home')} className="text-xs uppercase tracking-widest text-[var(--color-gold)] hover:underline focus:outline-none">← Return to Library</button>
      </div>

      <form onSubmit={handlePublish} className="bg-[var(--color-ivory)] p-8 md:p-12 border border-[var(--color-forest-10)] space-y-6 shadow-sm">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[var(--color-forest-60)] mb-2 font-medium">Document Title</label>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g., The Discipline of Solitude" className="w-full bg-[var(--color-ivory)] border border-[var(--color-forest-20)] p-3 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]" required />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[var(--color-forest-60)] mb-2 font-medium">Master Pillar Category</label>
            <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full bg-[var(--color-ivory)] border border-[var(--color-forest-20)] p-3 text-sm outline-none cursor-pointer focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]">
              {PILLARS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[var(--color-forest-60)] mb-2 font-medium">Content Format Type</label>
            <select value={newType} onChange={(e) => setNewType(e.target.value)} className="w-full bg-[var(--color-ivory)] border border-[var(--color-forest-20)] p-3 text-sm outline-none cursor-pointer focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]">
              {Object.keys(typeLabels).map(k => <option key={k} value={k}>{typeLabels[k]}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[var(--color-forest-60)] mb-2 font-medium">Excerpt / Summary</label>
          <textarea value={newExcerpt} onChange={(e) => setNewExcerpt(e.target.value)} rows={3} placeholder="Brief summary displayed on library cards..." className="w-full bg-[var(--color-ivory)] border border-[var(--color-forest-20)] p-3 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]" required />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[var(--color-forest-60)] mb-2 font-medium">Full Article Text / Transcript</label>
          <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} rows={8} placeholder="Complete content or transcript..." className="w-full bg-[var(--color-ivory)] border border-[var(--color-forest-20)] p-3 text-sm outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]" />
        </div>

        <BtnPrimary type="submit" className="w-full">
          Publish to Live Library
        </BtnPrimary>
      </form>
    </div>
  );
};

const GlobalArchiveView = ({ contentList, openPost }) => {
  const [segment, setSegment] = useState('all');

  const displayedPosts = useMemo(() => {
    if (segment === 'all') return contentList;
    return contentList.filter(i => i.type === segment);
  }, [segment, contentList]);

  const featuredPost = displayedPosts[0] || null;

  // Fully dynamic filter extraction based on content
  const availableTypes = useMemo(() => {
    const types = new Set(contentList.map(p => p.type));
    return Array.from(types).sort();
  }, [contentList]);

  return (
    <div className="animate-in fade-in duration-1000 min-h-screen py-32 md:py-48 max-w-[100rem] mx-auto px-6 md:px-16">
       <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium block mb-6">Global Media Archive</span>
          <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-forest)] mb-8">Conversations & Content</h1>
          <p className="text-[var(--color-charcoal-70)] font-light text-lg md:text-2xl leading-relaxed">
            Explore all recorded institutional dialogues, expert roundtables, foundational essays, and comprehensive research papers spanning the entirety of The Complete Being.
          </p>
       </div>

       {/* Scalable, dynamically generated filter bar */}
       <div className="flex justify-center gap-6 md:gap-10 overflow-x-auto hide-scrollbar border-b border-[var(--color-forest-10)] pb-6 mb-20">
          <button 
             onClick={() => setSegment('all')} 
             className={`text-[10px] tracking-[0.3em] uppercase font-medium pb-4 border-b transition-colors duration-300 capitalize focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)] ${segment === 'all' ? 'border-[var(--color-gold)] text-[var(--color-forest)]' : 'border-transparent text-[var(--color-forest-40)] hover:text-[var(--color-forest)]'}`}
          >
             All Content ({contentList.length})
          </button>
          {availableTypes.map(type => {
             const count = contentList.filter(i => i.type === type).length;
             return (
               <button 
                 key={type} 
                 onClick={() => setSegment(type)} 
                 className={`text-[10px] tracking-[0.3em] uppercase font-medium pb-4 border-b transition-colors duration-300 capitalize focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)] ${segment === type ? 'border-[var(--color-gold)] text-[var(--color-forest)]' : 'border-transparent text-[var(--color-forest-40)] hover:text-[var(--color-forest)]'}`}
               >
                 {typeLabels[type] || `${type}s`} ({count})
               </button>
             );
          })}
       </div>

       {segment === 'all' && featuredPost && (
          <button className="text-left w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center bg-[var(--color-ivory)] p-8 md:p-16 shadow-sm border border-[var(--color-forest-05)] hover:border-[var(--color-forest-15)] mb-24 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] transition-colors" onClick={() => openPost(featuredPost)}>
             <div className="lg:col-span-7 aspect-[16/9] overflow-hidden relative w-full">
                <SafeImage src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover cinematic-img grayscale-[10%]" />
             </div>
             <div className="lg:col-span-5 flex flex-col justify-center w-full">
                <span className="text-[9px] text-[var(--color-gold)] tracking-[0.3em] uppercase font-medium mb-4 block">Latest Release</span>
                <h3 className="text-3xl md:text-4xl font-serif text-[var(--color-forest)] mb-6 group-hover:text-[var(--color-gold)] transition-colors leading-tight">{featuredPost.title}</h3>
                <p className="text-[var(--color-charcoal-60)] font-light leading-relaxed mb-8">{featuredPost.excerpt}</p>
                <ContributorBlockText author={featuredPost.author} />
             </div>
          </button>
       )}

       <div className="mb-24">
          <h3 className="text-2xl font-serif text-[var(--color-forest)] mb-12 border-b border-[var(--color-forest-10)] pb-4">Publications & Media ({displayedPosts.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
             {displayedPosts.map(post => (
                <button key={post.id} className="text-left w-full bg-[var(--color-ivory)] p-8 shadow-sm border border-[var(--color-forest-05)] hover:border-[var(--color-forest-15)] flex flex-col group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] transition-colors" onClick={() => openPost(post)}>
                   <div className="aspect-video overflow-hidden relative mb-6 w-full">
                      <SafeImage src={post.image} alt={post.title} className="w-full h-full object-cover cinematic-img grayscale-[10%]" />
                      <div className="absolute top-4 right-4 bg-[var(--color-forest-80)] backdrop-blur text-[var(--color-ivory)] px-3 py-1 text-[9px] tracking-widest uppercase">
                         {post.type}
                      </div>
                   </div>
                   <span className="text-[9px] text-[var(--color-gold)] tracking-widest uppercase mb-3 block font-medium">{post.category} • {post.date}</span>
                   <h4 className="text-2xl font-serif text-[var(--color-forest)] mb-4 group-hover:text-[var(--color-gold)] transition-colors leading-snug">{post.title}</h4>
                   <p className="text-[var(--color-charcoal-60)] font-light text-sm line-clamp-3 mb-6 flex-grow">{post.excerpt}</p>
                   <div className="mt-auto border-t border-[var(--color-forest-10)] pt-4 w-full"><ContributorBlockText author={post.author} /></div>
                </button>
             ))}
             {displayedPosts.length === 0 && (
                <p className="text-[var(--color-charcoal-50)] font-serif italic py-12 col-span-full text-center">No documents currently archived under this specific filter.</p>
             )}
          </div>
       </div>
    </div>
  );
};

// --- DYNAMIC SCALABLE PILLAR HUB VIEW ---
const PillarHubView = ({ pillarName, contentList, openPost }) => {
  const [pillarSegment, setPillarSegment] = useState('all');

  const pillarData = PILLARS_DATA.find(p => p.name === pillarName) || PILLARS_DATA[0];
  const pillarPosts = useMemo(() => contentList.filter(c => c.category === pillarName), [contentList, pillarName]);
  const featuredPillarPost = pillarPosts[0] || null;

  // Fully dynamic filter extraction based on actual content in this pillar
  const availableTypes = useMemo(() => {
    const types = new Set(pillarPosts.map(p => p.type));
    return Array.from(types).sort();
  }, [pillarPosts]);

  const displayedPosts = useMemo(() => {
    if (pillarSegment === 'all') return pillarPosts;
    return pillarPosts.filter(i => i.type === pillarSegment);
  }, [pillarSegment, pillarPosts]);

  return (
    <div className="animate-in fade-in duration-1000 min-h-screen py-32 md:py-48 max-w-[100rem] mx-auto px-6 md:px-16">
       <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium block mb-6">Master Pillar</span>
          <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-forest)] mb-8">{pillarName}</h1>
          <p className="text-[var(--color-charcoal-70)] font-light text-lg md:text-2xl leading-relaxed">{pillarData.desc}</p>
       </div>

       {/* Extensible Filter Bar for Hub Content Types */}
       <div className="flex justify-center gap-6 md:gap-10 overflow-x-auto hide-scrollbar border-b border-[var(--color-forest-10)] pb-6 mb-20">
          <button 
            onClick={() => setPillarSegment('all')} 
            className={`text-[10px] tracking-[0.3em] uppercase font-medium pb-4 border-b transition-colors duration-300 capitalize focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)] ${pillarSegment === 'all' ? 'border-[var(--color-gold)] text-[var(--color-forest)]' : 'border-transparent text-[var(--color-forest-40)] hover:text-[var(--color-forest)]'}`}
          >
            All Hub Content ({pillarPosts.length})
          </button>
          {availableTypes.map(type => {
             const count = pillarPosts.filter(i => i.type === type).length;
             return (
               <button 
                 key={type} 
                 onClick={() => setPillarSegment(type)} 
                 className={`text-[10px] tracking-[0.3em] uppercase font-medium pb-4 border-b transition-colors duration-300 capitalize focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)] ${pillarSegment === type ? 'border-[var(--color-gold)] text-[var(--color-forest)]' : 'border-transparent text-[var(--color-forest-40)] hover:text-[var(--color-forest)]'}`}
               >
                 {typeLabels[type] || `${type}s`} ({count})
               </button>
             );
          })}
       </div>

       {/* Separate Featured Presentation */}
       {pillarSegment === 'all' && featuredPillarPost && (
          <button className="text-left w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center bg-[var(--color-ivory)] p-8 md:p-16 shadow-sm border border-[var(--color-forest-05)] hover:border-[var(--color-forest-15)] mb-24 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] transition-colors" onClick={() => openPost(featuredPillarPost)}>
             <div className="lg:col-span-7 aspect-[16/9] overflow-hidden relative w-full">
                <SafeImage src={featuredPillarPost.image} alt={featuredPillarPost.title} className="w-full h-full object-cover cinematic-img grayscale-[10%]" />
             </div>
             <div className="lg:col-span-5 flex flex-col justify-center w-full">
                <span className="text-[9px] text-[var(--color-gold)] tracking-[0.3em] uppercase font-medium mb-4 block">Featured in {pillarName}</span>
                <h3 className="text-3xl md:text-4xl font-serif text-[var(--color-forest)] mb-6 group-hover:text-[var(--color-gold)] transition-colors leading-tight">{featuredPillarPost.title}</h3>
                <p className="text-[var(--color-charcoal-60)] font-light leading-relaxed mb-8">{featuredPillarPost.excerpt}</p>
                <ContributorBlockText author={featuredPillarPost.author} />
             </div>
          </button>
       )}

       {/* Complete Dynamic Content Collection */}
       <div className="mb-24">
          <h3 className="text-2xl font-serif text-[var(--color-forest)] mb-12 border-b border-[var(--color-forest-10)] pb-4">
             {pillarSegment === 'all' ? `Complete Collection (${displayedPosts.length})` : `${typeLabels[pillarSegment] || `${pillarSegment}s`} Archive (${displayedPosts.length})`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
             {displayedPosts.map(post => (
                <button key={post.id} className="text-left w-full bg-[var(--color-ivory)] p-8 shadow-sm border border-[var(--color-forest-05)] hover:border-[var(--color-forest-15)] flex flex-col group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] transition-colors" onClick={() => openPost(post)}>
                   <div className="aspect-video overflow-hidden relative mb-6 w-full">
                      <SafeImage src={post.image} alt={post.title} className="w-full h-full object-cover cinematic-img grayscale-[10%]" />
                      <div className="absolute top-4 right-4 bg-[var(--color-forest-80)] backdrop-blur text-[var(--color-ivory)] px-3 py-1 text-[9px] tracking-widest uppercase">
                         {post.type}
                      </div>
                   </div>
                   <span className="text-[9px] text-[var(--color-gold)] tracking-widest uppercase mb-3 block font-medium">{post.date}</span>
                   <h4 className="text-2xl font-serif text-[var(--color-forest)] mb-4 group-hover:text-[var(--color-gold)] transition-colors leading-snug">{post.title}</h4>
                   <p className="text-[var(--color-charcoal-60)] font-light text-sm line-clamp-3 mb-6 flex-grow">{post.excerpt}</p>
                   <div className="mt-auto border-t border-[var(--color-forest-10)] pt-4 w-full"><ContributorBlockText author={post.author} /></div>
                </button>
             ))}
             {displayedPosts.length === 0 && (
                <p className="text-[var(--color-charcoal-50)] font-serif italic py-12 col-span-full text-center">No documents currently archived under this specific format.</p>
             )}
          </div>
       </div>
    </div>
  );
};

const HomeView = ({ activeCategory, contentList, filteredContent, navigate, openPost, selectedArchiveFilter, setSelectedArchiveFilter, dynamicStats }) => {
  // --- DYNAMIC HOMEPAGE INTELLIGENCE ---
  const featuredEssay = useMemo(() => contentList.find(c => c.type === 'essay') || contentList[0], [contentList]);
  const latestConversation = useMemo(() => contentList.find(c => c.type === 'conversation') || contentList[1], [contentList]);
  const trendingPosts = useMemo(() => contentList.filter(c => c.trending), [contentList]);
  const editorsPicks = useMemo(() => contentList.filter(c => c.editorsPick), [contentList]);
  const recentPodcasts = useMemo(() => contentList.filter(c => c.type === 'podcast').slice(0, 3), [contentList]);
  const recentVideos = useMemo(() => contentList.filter(c => c.type === 'video' || c.type === 'masterclass').slice(0, 3), [contentList]);
  const archivePosts = filteredContent;

  // Extract unique active dynamic parameters
  const activeMonths = useMemo(() => Array.from(new Set(contentList.map(c => c.monthYear))), [contentList]);
  const activeYears = useMemo(() => {
    return Array.from(new Set(contentList.map(c => {
      const parts = c.date.split(', ');
      return parts[1] ? parts[1].trim() : new Date().getFullYear().toString();
    }))).sort().reverse();
  }, [contentList]);

  return (
    <div className="animate-in fade-in duration-1000">
      <section id="hero-section" className="dark-section relative w-full h-[100svh] min-h-[850px] flex items-center justify-center overflow-hidden bg-[var(--color-forest)]">
        {/* Solid green base is naturally enforced. Removed SafeImage entirely for solid premium presentation. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)] via-transparent to-[var(--color-forest-20)]"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center flex flex-col items-center pb-20 pt-24">
          <BrandLogo theme="light" className="mb-16 md:mb-24 scale-100 md:scale-[1.2]" />
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-[var(--color-ivory)] leading-[1.1] mb-8 md:mb-12 max-w-4xl font-normal drop-shadow-2xl px-4">
            Timeless wisdom for becoming the complete human being.
          </h1>
          <p className="text-[var(--color-ivory-60)] font-light text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-16 md:mb-20 leading-loose px-4">
             The Complete Being is a modern library of ideas, practical insight, and trusted voices helping people grow in faith, character, relationships, leadership, work, wealth, health, and every dimension of life.
          </p>
          <BtnGhost onClick={() => document.getElementById('pillars')?.scrollIntoView()} className="border-[var(--color-gold-40)] text-[var(--color-gold)] hover:bg-[var(--color-gold-10)] hover:text-[var(--color-gold)]">
            Enter The Library
          </BtnGhost>
        </div>
      </section>

      <section className="dark-section bg-[var(--color-forest)] text-[var(--color-ivory)] border-t border-[var(--color-ivory-10)] py-12 shadow-sm relative z-20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center">
          <div>
            <div className="font-serif text-3xl md:text-4xl text-[var(--color-gold)] mb-1">{dynamicStats.essaysCount}</div>
            <div className="text-[9px] tracking-widest uppercase text-[var(--color-ivory-50)] font-medium">Essays & Articles</div>
          </div>
          <div>
            <div className="font-serif text-3xl md:text-4xl text-[var(--color-gold)] mb-1">{dynamicStats.researchCount}</div>
            <div className="text-[9px] tracking-widest uppercase text-[var(--color-ivory-50)] font-medium">Research Papers</div>
          </div>
          <div>
            <div className="font-serif text-3xl md:text-4xl text-[var(--color-gold)] mb-1">{dynamicStats.conversationsCount}</div>
            <div className="text-[9px] tracking-widest uppercase text-[var(--color-ivory-50)] font-medium">Conversations</div>
          </div>
          <div>
            <div className="font-serif text-3xl md:text-4xl text-[var(--color-gold)] mb-1">{dynamicStats.podcastCount}</div>
            <div className="text-[9px] tracking-widest uppercase text-[var(--color-ivory-50)] font-medium">Podcasts</div>
          </div>
          <div>
            <div className="font-serif text-3xl md:text-4xl text-[var(--color-gold)] mb-1">{dynamicStats.masterclassCount}</div>
            <div className="text-[9px] tracking-widest uppercase text-[var(--color-ivory-50)] font-medium">Masterclasses</div>
          </div>
          <div>
            <div className="font-serif text-3xl md:text-4xl text-[var(--color-gold)] mb-1">{PILLARS_DATA.length}</div>
            <div className="text-[9px] tracking-widest uppercase text-[var(--color-ivory-50)] font-medium">Master Pillars</div>
          </div>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section className="py-20 max-w-[100rem] mx-auto px-6 md:px-16 bg-[var(--color-ivory)] border-b border-[var(--color-forest-05)]">
         <div className="flex justify-between items-center mb-12 max-w-[85rem] mx-auto">
            <div>
               <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-gold)] font-medium block mb-2">Real-Time Data</span>
               <h2 className="text-3xl font-serif text-[var(--color-forest)]">Trending This Week</h2>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[85rem] mx-auto">
            {trendingPosts.slice(0, 3).map(p => (
               <button key={p.id} className="text-left bg-[var(--color-ivory)] p-6 shadow-sm border border-[var(--color-forest-05)] hover:border-[var(--color-forest-15)] transition-colors cursor-pointer group flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]" onClick={() => openPost(p)}>
                  <div>
                     <span className="text-[8px] text-[var(--color-gold)] tracking-widest uppercase block mb-2 font-medium">{p.category}</span>
                     <h3 className="font-serif text-xl text-[var(--color-forest)] group-hover:text-[var(--color-gold)] transition-colors mb-3 leading-snug">{p.title}</h3>
                     <p className="text-xs text-[var(--color-charcoal-60)] font-light line-clamp-2 mb-4">{p.excerpt}</p>
                  </div>
                  <div className="pt-4 border-t border-[var(--color-forest-10)] flex justify-between items-center text-[9px] uppercase tracking-widest text-[var(--color-charcoal-50)] w-full">
                     <span>{p.readTime}</span>
                     <span className="text-[var(--color-gold)] font-medium">Trending →</span>
                  </div>
               </button>
            ))}
         </div>
      </section>

      <div id="pillars">
         <section className="py-24 md:py-32 max-w-[100rem] mx-auto px-6 md:px-16 border-b border-[var(--color-forest-05)] bg-[var(--color-ivory)]">
            <div className="text-center mb-20 md:mb-24">
               <h2 className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium mb-6">Our Framework</h2>
               <h3 className="text-3xl md:text-5xl font-serif text-[var(--color-forest)]">The Complete Being Framework</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 max-w-[85rem] mx-auto">
               {PILLARS_DATA.map((pillar) => {
                 const Icon = pillar.icon;
                 return (
                   <button key={pillar.name} className="text-left flex flex-col group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] p-4 -m-4 rounded" onClick={() => navigate('home', pillar.name)}>
                     <div className="mb-6 text-[var(--color-gold)] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-left">
                       <Icon size={32} strokeWidth={1} aria-hidden="true" />
                     </div>
                     <h4 className="text-xl md:text-2xl font-serif text-[var(--color-forest)] mb-4 group-hover:text-[var(--color-gold)] transition-colors">{pillar.name}</h4>
                     <p className="text-[var(--color-charcoal-60)] font-light text-sm leading-relaxed">{pillar.desc}</p>
                   </button>
                 );
               })}
            </div>
         </section>
      </div>

      {featuredEssay && (
        <section className="py-32 md:py-48 max-w-[100rem] mx-auto px-6 md:px-16 bg-[var(--color-ivory)]">
          <div className="flex items-center gap-6 md:gap-10 mb-24 md:mb-40 justify-center">
             <div className="w-16 md:w-24 h-[1px] bg-[var(--color-gold)] opacity-50" aria-hidden="true"></div>
             <h2 className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-forest)] font-medium">Featured Editorial</h2>
             <div className="w-16 md:w-24 h-[1px] bg-[var(--color-gold)] opacity-50" aria-hidden="true"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center max-w-[85rem] mx-auto">
            <button className="lg:col-span-7 relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]" onClick={() => openPost(featuredEssay)} aria-label={`Read featured essay: ${featuredEssay.title}`}>
              <div className="aspect-[4/3] overflow-hidden relative">
                <SafeImage src={featuredEssay.image} alt={featuredEssay.title} className="w-full h-full object-cover cinematic-img grayscale-[10%]" />
                <div className="absolute inset-0 bg-[var(--color-forest-05)] group-hover:bg-transparent transition-colors duration-1000"></div>
              </div>
            </button>
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-[10px] text-[var(--color-gold)] tracking-[0.4em] mb-6 md:mb-8 block uppercase font-medium">{featuredEssay.category}</span>
              <button onClick={() => openPost(featuredEssay)} className="text-left focus:outline-none focus:text-[var(--color-gold)]">
                 <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--color-forest)] leading-tight mb-8 md:mb-10 hover:text-[var(--color-gold)] transition-colors duration-500">{featuredEssay.title}</h3>
              </button>
              <p className="text-[var(--color-charcoal-60)] font-light leading-loose mb-10 md:mb-14 text-base md:text-lg max-w-md">{featuredEssay.excerpt}</p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 border-t border-[var(--color-forest-10)] pt-8 md:pt-10">
                 <ContributorBlockFull author={featuredEssay.author} theme="light" />
                 <button onClick={() => openPost(featuredEssay)} className="text-[10px] tracking-[0.3em] text-[var(--color-forest)] uppercase font-medium hover:text-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)] transition-colors duration-500 flex items-center gap-4">
                   Read Essay <ArrowRight size={14} aria-hidden="true" />
                 </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {latestConversation && (
        <section className="dark-section py-32 md:py-48 bg-[var(--color-forest)] text-[var(--color-ivory)] relative overflow-hidden">
          <div className="max-w-[100rem] mx-auto px-6 md:px-16 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32 max-w-[85rem] mx-auto border-b border-[var(--color-ivory-10)] pb-8 gap-6">
              <div>
                <h2 className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium mb-4 md:mb-6">Visual & Audio</h2>
                <h3 className="text-4xl md:text-5xl font-serif text-[var(--color-ivory)] font-light">Latest Conversation</h3>
              </div>
              <button onClick={() => navigate('home', 'conversation')} className="text-[10px] tracking-[0.3em] text-[var(--color-gold)] hover:text-[var(--color-ivory)] uppercase font-medium transition-colors flex items-center gap-3 w-fit focus:outline-none focus:border-[var(--color-gold)]">
                Explore All Content <ArrowUpRight size={14} aria-hidden="true"/>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 max-w-[85rem] mx-auto items-center">
              <button className="lg:col-span-7 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]" onClick={() => openPost(latestConversation)} aria-label={`Play conversation: ${latestConversation.title}`}>
                <div className="w-full aspect-video overflow-hidden relative bg-[var(--color-forest)] border border-[var(--color-ivory-10)]">
                  <SafeImage src={latestConversation.image} alt={latestConversation.title} className="w-full h-full object-cover cinematic-img opacity-60 grayscale-[20%]" />
                  <div className="absolute inset-0 bg-[var(--color-forest-40)] group-hover:bg-[var(--color-forest-20)] transition-colors duration-1000"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-[var(--color-ivory-05)] backdrop-blur-lg rounded-full flex items-center justify-center text-[var(--color-ivory)] border border-[var(--color-ivory-20)] group-hover:scale-110 transition-transform duration-700 shadow-2xl pl-1">
                      <Play size={32} strokeWidth={1} aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </button>
              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="text-[9px] text-[var(--color-gold)] tracking-[0.4em] mb-4 md:mb-6 block uppercase font-medium">{latestConversation.category}</span>
                <button onClick={() => openPost(latestConversation)} className="text-left focus:outline-none focus:text-[var(--color-gold)]">
                   <h4 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--color-ivory)] mb-6 md:mb-8 hover:text-[var(--color-gold)] transition-colors duration-500 leading-snug">{latestConversation.title}</h4>
                </button>
                <p className="text-[var(--color-ivory-50)] font-light text-base md:text-lg leading-loose mb-10 md:mb-12">{latestConversation.excerpt}</p>
                <div className="border-t border-[var(--color-ivory-10)] pt-8">
                   <ContributorBlockFull author={latestConversation.author} theme="dark" isConversation={true} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DYNAMIC EDITOR'S PICKS */}
      {editorsPicks.length > 0 && (
        <section className="py-32 md:py-48 max-w-[100rem] mx-auto px-6 md:px-16 bg-[var(--color-ivory)]">
           <div className="max-w-[85rem] mx-auto">
              <div className="flex justify-between items-center mb-16 border-b border-[var(--color-forest-10)] pb-6">
                 <div>
                    <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-gold)] font-medium block mb-2">Curated Selection</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-forest)]">Editor's Picks & Founder's Journal</h2>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {editorsPicks.slice(0, 2).map(post => (
                    <button key={post.id} className="text-left bg-[var(--color-ivory)] p-8 border border-[var(--color-forest-05)] shadow-sm group cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] transition-all" onClick={() => openPost(post)}>
                       <div>
                          <span className="text-[9px] text-[var(--color-gold)] tracking-widest uppercase block mb-3 font-medium">{post.category}</span>
                          <h3 className="font-serif text-2xl md:text-3xl text-[var(--color-forest)] group-hover:text-[var(--color-gold)] transition-colors mb-4 leading-snug">{post.title}</h3>
                          <p className="text-sm text-[var(--color-charcoal-60)] font-light leading-relaxed mb-6">{post.excerpt}</p>
                       </div>
                       <div className="pt-6 border-t border-[var(--color-forest-10)] flex items-center justify-between text-[9px] uppercase tracking-widest w-full">
                          <ContributorBlockText author={post.author} />
                          <span className="text-[var(--color-gold)] font-medium">Read Article →</span>
                       </div>
                    </button>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* RECENT PODCASTS */}
      {recentPodcasts.length > 0 && (
        <section className="py-32 md:py-48 bg-[var(--color-forest-05)] border-y border-[var(--color-forest-10)]">
           <div className="max-w-[100rem] mx-auto px-6 md:px-16 max-w-[85rem]">
              <div className="flex justify-between items-center mb-16">
                 <div>
                    <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-gold)] font-medium block mb-2">Audio Broadcasts</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-forest)]">Recent Podcasts</h2>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {recentPodcasts.map(item => (
                    <button key={item.id} className="text-left bg-[var(--color-ivory)] p-6 shadow-sm border border-[var(--color-forest-05)] group cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]" onClick={() => openPost(item)}>
                       <div className="aspect-video overflow-hidden relative mb-4 w-full">
                          <SafeImage src={item.image} alt={item.title} className="w-full h-full object-cover cinematic-img" />
                          <div className="absolute top-3 right-3 bg-[var(--color-forest)] text-[var(--color-ivory)] px-2.5 py-1 text-[8px] uppercase tracking-widest flex items-center gap-1">
                             <Mic size={10} /> Podcast
                          </div>
                       </div>
                       <span className="text-[8px] text-[var(--color-gold)] tracking-widest uppercase block mb-2 font-medium">{item.category}</span>
                       <h4 className="font-serif text-lg text-[var(--color-forest)] group-hover:text-[var(--color-gold)] transition-colors mb-3 leading-snug">{item.title}</h4>
                       <p className="text-xs text-[var(--color-charcoal-60)] font-light line-clamp-2 mb-4">{item.excerpt}</p>
                       <span className="text-[9px] uppercase tracking-widest text-[var(--color-forest-50)] font-medium flex items-center gap-1"><Headphones size={12}/> Listen Episode →</span>
                    </button>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* RECENT VIDEOS */}
      {recentVideos.length > 0 && (
        <section className="py-32 md:py-48 max-w-[100rem] mx-auto px-6 md:px-16 bg-[var(--color-ivory)]">
           <div className="max-w-[85rem] mx-auto">
              <div className="flex justify-between items-center mb-16 border-b border-[var(--color-forest-10)] pb-6">
                 <div>
                    <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-gold)] font-medium block mb-2">Visual Vault</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-forest)]">Masterclasses & Video</h2>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {recentVideos.map(item => (
                    <button key={item.id} className="text-left bg-[var(--color-ivory)] p-6 shadow-sm border border-[var(--color-forest-05)] group cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]" onClick={() => openPost(item)}>
                       <div className="aspect-video overflow-hidden relative mb-4 w-full">
                          <SafeImage src={item.image} alt={item.title} className="w-full h-full object-cover cinematic-img" />
                          <div className="absolute top-3 right-3 bg-[var(--color-forest)] text-[var(--color-ivory)] px-2.5 py-1 text-[8px] uppercase tracking-widest flex items-center gap-1">
                             <Video size={10} /> Video
                          </div>
                       </div>
                       <span className="text-[8px] text-[var(--color-gold)] tracking-widest uppercase block mb-2 font-medium">{item.category}</span>
                       <h4 className="font-serif text-lg text-[var(--color-forest)] group-hover:text-[var(--color-gold)] transition-colors mb-3 leading-snug">{item.title}</h4>
                       <p className="text-xs text-[var(--color-charcoal-60)] font-light line-clamp-2 mb-4">{item.excerpt}</p>
                       <span className="text-[9px] uppercase tracking-widest text-[var(--color-forest-50)] font-medium">Watch Masterclass →</span>
                    </button>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* UPCOMING EVENTS */}
      <section className="py-32 md:py-48 max-w-[100rem] mx-auto px-6 md:px-16 bg-[var(--color-ivory)]">
         <div className="max-w-[85rem] mx-auto">
            <div className="flex justify-between items-center mb-16 border-b border-[var(--color-forest-10)] pb-6">
               <div>
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-gold)] font-medium block mb-2">Live Gatherings</span>
                  <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-forest)]">Upcoming Symposia & Roundtables</h2>
               </div>
               
