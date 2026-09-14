import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowRight, ArrowUpRight, Play, Mic, Video, Filter, Sliders, ChevronLeft,
  Share2, Bookmark, BookmarkCheck, Headphones, Square, Eye, X, CheckCircle2
} from 'lucide-react';
import {
  CONTRIBUTORS, PILLARS, PILLARS_DATA, typeLabels, calculateReadTime,
  STORE_ITEMS, EVENTS_DATA, SafeImage
} from '../data.jsx';
import { BtnPrimary, BtnGhost, ContributorBlockFull, ContributorBlockText } from './shared.jsx';


// --- TOP-LEVEL SUBVIEWS ---

// Dedicated Founder's Journal Series Archive View
export const FoundersJournalView = ({ contentList, openPost }) => {
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

export const InstituteView = () => (
  <div className="animate-in fade-in duration-1000 min-h-screen py-32 md:py-48 max-w-[85rem] mx-auto px-6 md:px-16">
    <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium block mb-6">About The Institute</span>
    <h1 className="text-5xl md:text-7xl font-serif text-[var(--color-forest)] mb-12">The Architecture of Wholeness</h1>
    <div className="prose prose-lg font-light text-lg text-[var(--color-charcoal-80)] leading-relaxed space-y-8 mb-20">
      <p>The Complete Being Institute is a research center and publication dedicated to the rigorous exploration of human agency, spiritual depth, intellectual rigor, and sustainable flourishing in the modern era.</p>
    </div>
  </div>
);

export const StoreView = ({ showToast }) => (
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

export const EventsView = ({ showToast }) => (
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

export const ContributorsView = () => (
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

export const LegalView = () => (
  <div className="animate-in fade-in duration-1000 min-h-screen py-32 md:py-48 max-w-4xl mx-auto px-6 md:px-16">
    <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium block mb-6">Policies & Governance</span>
    <h1 className="text-4xl md:text-6xl font-serif text-[var(--color-forest)] mb-12">Legal & Privacy Charter</h1>
    <div className="prose font-light text-sm md:text-base text-[var(--color-charcoal-80)] leading-relaxed space-y-6">
      <p>The Complete Being Institute adheres to strict ethical standards in digital privacy, data collection, and scholarly integrity.</p>
    </div>
  </div>
);

export const AdminDashboardView = ({ contentList, setContentList, showToast, navigate }) => {
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

export const GlobalArchiveView = ({ contentList, openPost }) => {
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
export const PillarHubView = ({ pillarName, contentList, openPost }) => {
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
