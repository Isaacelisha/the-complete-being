import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronLeft, Sliders, Share2, Bookmark, BookmarkCheck, Headphones, Square, Play, Eye, X, ArrowRight
} from 'lucide-react';
import { SafeImage } from '../data.jsx';
import { BtnPrimary, BtnGhost, ContributorBlockFull } from './shared.jsx';

export const SinglePostView = ({ 
  activePost, navigate, openPost, readingProgress, toggleSaveArticle, savedArticles, 
  toggleAudioNarration, isPlayingAudio, setHighlights, showToast, contentList 
}) => {
  const [readingMode, setReadingMode] = useState('normal'); 
  const [activeCitation, setActiveCitation] = useState(null);
  const [shareModalPost, setShareModalPost] = useState(null);

  useEffect(() => {
    document.body.className = `theme-${readingMode}`;
    return () => { document.body.className = 'theme-normal'; };
  }, [readingMode]);

  // HOOKS ARE UNCONDITIONAL. Place memo before early return.
  const aiRecommendations = useMemo(() => {
    if (!activePost) return [];
    return contentList
      .filter(p => p.id !== activePost.id)
      .map(p => {
        let score = 0;
        if (p.category === activePost.category) score += 5;
        if (p.author?.name === activePost.author?.name) score += 3;
        if (savedArticles.some(s => s.category === p.category)) score += 2;
        if (p.trending) score += 1;
        return { post: p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.post);
  }, [activePost, contentList, savedArticles]);

  if (!activePost) return null; // Safe early return after hook execution

  const isSaved = savedArticles.some(p => p.id === activePost.id);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (text.length > 3) {
      setHighlights(prev => [...prev, { text, title: activePost.title }]);
      showToast('Highlight saved to your dashboard notes.');
      selection.removeAllRanges();
    }
  };

  let fontSizeClass = "text-lg md:text-xl";
  if (readingMode === 'large') fontSizeClass = "text-xl md:text-2xl";

  return (
    <article className="min-h-screen pb-32 md:pb-48 relative transition-colors duration-500 bg-[var(--theme-bg)] text-[var(--theme-text)]" onMouseUp={handleTextSelection}>
      <div className="fixed top-0 left-0 h-1 bg-[var(--theme-accent)] z-50 transition-all duration-150" style={{ width: `${readingProgress}%` }} aria-hidden="true" />

      <div className="sticky top-0 z-40 bg-[var(--theme-bg)] text-[var(--theme-text)] px-6 py-4 flex items-center justify-between border-b border-[var(--theme-border)] shadow-sm transition-colors duration-500">
        <button onClick={() => navigate('home')} className="flex items-center gap-2 text-[var(--theme-accent)] uppercase tracking-widest text-xs hover:opacity-80 transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]">
          <ChevronLeft size={16}/> Library
        </button>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--theme-border)]">
             <Sliders size={14} className="text-[var(--theme-accent)]" />
             <select aria-label="Reading mode settings" className="bg-transparent outline-none text-[var(--theme-text)] text-xs uppercase tracking-widest cursor-pointer focus:outline-none" value={readingMode} onChange={(e) => setReadingMode(e.target.value)}>
               <option value="normal" className="bg-[var(--theme-block)]">Normal</option>
               <option value="focus" className="bg-[var(--theme-block)]">Focus</option>
               <option value="dark" className="bg-[var(--theme-block)]">Dark</option>
               <option value="large" className="bg-[var(--theme-block)]">Large</option>
               <option value="highcontrast" className="bg-[var(--theme-block)]">Contrast</option>
             </select>
           </div>
           <button onClick={() => setShareModalPost(activePost)} className="text-[var(--theme-accent)] hover:opacity-80 p-2 rounded border border-[var(--theme-border)] focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]" aria-label="Share Article"><Share2 size={16} /></button>
           <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSaveArticle(activePost); }} aria-label={isSaved ? "Remove saved article" : "Save article"} className="text-[var(--theme-accent)] hover:opacity-80 flex items-center gap-1.5 text-xs uppercase tracking-widest px-3 py-1.5 rounded border border-[var(--theme-border)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]">
             {isSaved ? <BookmarkCheck size={16} className="text-[var(--theme-accent)]" /> : <Bookmark size={16} />} 
             <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
           </button>
        </div>
      </div>

      <div className="w-full bg-[var(--color-forest)] text-[var(--color-ivory)] py-24 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <SafeImage src={activePost.image} alt={activePost.title} className="w-full h-full object-cover grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-forest-60)] via-[var(--color-forest-90)] to-[var(--color-forest)]"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-4 mb-6 text-[10px] text-[var(--color-gold)] tracking-[0.4em] uppercase font-medium">
            {activePost.category} <span>•</span> {activePost.readTime}
            {activePost.difficulty && <><span>•</span><span className="bg-[var(--color-gold-20)] text-[var(--color-gold)] px-2.5 py-0.5">{activePost.difficulty}</span></>}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--color-ivory)] leading-[1.15] mb-12">
            {activePost.title}
          </h1>
          
          <div className="border-t border-[var(--color-ivory-15)] pt-8">
            <ContributorBlockFull author={activePost.author} theme="dark" isConversation={activePost.type==='conversation'} />
          </div>
        </div>
      </div>

      <div className="max-w-[85rem] mx-auto px-6 md:px-8 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-3 hidden lg:block" role="region" aria-label="Table of Contents">
           <div className="sticky top-32 bg-[var(--theme-block)] backdrop-blur p-6 border border-[var(--theme-border)] transition-colors duration-500">
              <h4 className="text-[10px] tracking-[0.4em] uppercase text-[var(--theme-accent)] font-medium mb-4">On This Page</h4>
              <ul className="space-y-3 text-xs font-light text-[var(--theme-text)] opacity-80">
                 <li><a href="#intro" className="hover:text-[var(--theme-accent)] flex items-center gap-2 focus:outline-none"><ArrowRight size={10} aria-hidden="true"/> Introduction</a></li>
                 <li><a href="#framework" className="hover:text-[var(--theme-accent)] flex items-center gap-2 focus:outline-none"><ArrowRight size={10} aria-hidden="true"/> Core Reading</a></li>
                 <li><a href="#sources" className="hover:text-[var(--theme-accent)] flex items-center gap-2 focus:outline-none"><ArrowRight size={10} aria-hidden="true"/> References</a></li>
              </ul>

              <div className="mt-8 pt-6 border-t border-[var(--theme-border)]">
                 <button onClick={() => toggleAudioNarration(activePost)} className="w-full bg-[var(--theme-text)] text-[var(--theme-bg)] py-3 text-[9px] tracking-widest uppercase flex items-center justify-center gap-2 hover:opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]">
                    <Headphones size={14} aria-hidden="true" /> {isPlayingAudio ? 'Stop Audio' : 'Listen Aloud'}
                 </button>
              </div>
           </div>
        </div>

        <div className="lg:col-span-9 max-w-3xl">
          <div id="intro" className="mb-16 md:mb-24 p-8 md:p-16 bg-[var(--theme-block)] border border-[var(--theme-border)] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 transition-colors duration-500">
            <div className="text-center md:text-left">
              <span className="text-[var(--theme-accent)] text-[10px] tracking-[0.5em] uppercase font-medium mb-4 md:mb-6 block">Audio Narration Available</span>
              <span className="font-serif text-3xl md:text-4xl text-[var(--theme-text)]">{activePost.title}</span>
            </div>
            <BtnGhost onClick={() => toggleAudioNarration(activePost)} aria-label="Toggle Audio Narration" className="border-[var(--theme-accent)] text-[var(--theme-accent)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-bg)] w-full md:w-auto flex items-center justify-center gap-4">
              {isPlayingAudio ? <Square size={18} fill="currentColor" aria-hidden="true" /> : <Play size={18} fill="currentColor" aria-hidden="true" />} 
              {isPlayingAudio ? 'Stop Speech' : 'Play Narration'}
            </BtnGhost>
          </div>

          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-16 border-l-[3px] border-[var(--theme-accent)] pl-6 text-[var(--theme-text)] opacity-90 transition-colors duration-500">
            "{activePost.excerpt}"
          </p>
          
          <div id="framework" className={`whitespace-pre-wrap font-light leading-[2.2] text-[var(--theme-text)] transition-colors duration-500 ${fontSizeClass}`}>
            {activePost.content}
          </div>

          {activePost.author && (
            <div className="mt-24 p-8 bg-[var(--theme-block)] border border-[var(--theme-border)] flex flex-col sm:flex-row items-center gap-6 transition-colors duration-500">
               <SafeImage src={activePost.author.avatar} alt={activePost.author.name} className="w-16 h-16 rounded-full object-cover grayscale border border-[var(--theme-border)]" />
               <div>
                  <h5 className="font-serif text-xl text-[var(--theme-text)] mb-1">{activePost.author.name}</h5>
                  <p className="text-xs text-[var(--theme-accent)] tracking-widest uppercase mb-3 font-medium">{activePost.author.role}</p>
                  <p className="text-sm text-[var(--theme-text)] opacity-80 font-light leading-relaxed">{activePost.author.bio}</p>
               </div>
            </div>
          )}
          
          {activePost.sources && activePost.sources.length > 0 && (
             <div id="sources" className="mt-16 pt-10 border-t border-[var(--theme-border)] transition-colors duration-500">
                <h6 className="text-[10px] tracking-[0.3em] uppercase text-[var(--theme-text)] opacity-60 font-medium mb-6">References & Academic Sources</h6>
                <ul className="space-y-3 text-xs font-light text-[var(--theme-text)]">
                   {activePost.sources.map((src, i) => (
                      <li key={i} className="flex items-center justify-between bg-[var(--theme-block)] p-3 border border-[var(--theme-border)]">
                         <span>{typeof src === 'string' ? src : src.text}</span>
                         <button aria-label="View citation" onClick={() => setActiveCitation(typeof src === 'object' ? src : {book: activePost.title, author: activePost.author?.name || 'Fellow', publisher: 'T_CB Press', year: '2026', text: src})} className="text-[var(--theme-accent)] uppercase tracking-widest text-[9px] font-medium hover:underline flex items-center gap-1 focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)]">
                            [cite] <Eye size={12} aria-hidden="true"/>
                         </button>
                      </li>
                   ))}
                </ul>
             </div>
          )}
          
          <div className="flex justify-center items-center gap-3 my-24 opacity-40 text-[var(--theme-text)]" role="separator">
             <div className="w-16 h-[1px] bg-current"></div>
             <div className="w-2 h-2 rotate-45 border border-current"></div>
             <div className="w-16 h-[1px] bg-current"></div>
          </div>

          <div className="mt-20 pt-16 border-t border-[var(--theme-border)] transition-colors duration-500">
             <h4 className="text-[10px] tracking-[0.4em] uppercase text-[var(--theme-accent)] font-medium mb-2 text-center">AI Intelligent Match</h4>
             <h5 className="text-2xl font-serif text-center text-[var(--theme-text)] mb-8">Recommended Reading</h5>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {aiRecommendations.map(rec => (
                   <button key={rec.id} className="text-left bg-[var(--theme-block)] p-6 shadow-sm border border-[var(--theme-border)] hover:border-[var(--theme-accent)] transition-colors cursor-pointer group flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]" onClick={() => openPost(rec)}>
                      <div>
                         <span className="text-[8px] text-[var(--theme-accent)] tracking-widest uppercase block mb-2 font-medium">{rec.category}</span>
                         <h6 className="font-serif text-lg text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] transition-colors mb-3 leading-snug">{rec.title}</h6>
                         <p className="text-xs text-[var(--theme-text)] opacity-70 font-light line-clamp-2 mb-4">{rec.excerpt}</p>
                      </div>
                      <span className="text-[9px] uppercase tracking-widest text-[var(--theme-text)] opacity-50 font-medium">Read Article →</span>
                   </button>
                ))}
             </div>
          </div>
        </div>
      </div>

      {activeCitation && (
        <div role="dialog" aria-modal="true" aria-label="Academic Citation Record" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
           <div className="bg-[var(--color-ivory)] text-[var(--color-charcoal)] max-w-lg w-full p-8 shadow-2xl relative border border-[var(--color-gold)]">
              <button aria-label="Close Citation" onClick={() => setActiveCitation(null)} className="absolute top-6 right-6 text-[var(--color-charcoal)] hover:text-[var(--color-gold)] focus:outline-none"><X size={20}/></button>
              <span className="text-[9px] text-[var(--color-gold)] uppercase tracking-widest block mb-2 font-medium">Academic Citation Record</span>
              <h3 className="font-serif text-2xl text-[var(--color-forest)] mb-6">{activeCitation.book}</h3>
              <div className="space-y-4 text-sm font-light mb-8">
                 <p><strong>Author:</strong> {activeCitation.author}</p>
                 <p><strong>Publisher:</strong> {activeCitation.publisher}</p>
                 <p><strong>Year of Publication:</strong> {activeCitation.year}</p>
                 <p className="p-4 bg-white border border-[var(--color-charcoal-10)] text-xs font-mono">{activeCitation.text}</p>
              </div>
              <BtnPrimary onClick={() => setActiveCitation(null)} className="w-full">
                 Close Reference
              </BtnPrimary>
           </div>
        </div>
      )}

      {shareModalPost && (
        <div role="dialog" aria-modal="true" aria-label="Social Preview Card" className="fixed inset-0 z-50 bg-[var(--color-forest-90)] backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
           <div className="bg-[var(--color-forest)] text-[var(--color-ivory)] max-w-xl w-full p-8 md:p-12 shadow-2xl relative border border-[var(--color-gold-40)]">
              <button aria-label="Close Share Card" onClick={() => setShareModalPost(null)} className="absolute top-6 right-6 text-[var(--color-ivory)] hover:text-[var(--color-gold)] focus:outline-none"><X size={22}/></button>
              <div className="text-center mb-6">
                 <span className="text-[9px] tracking-[0.4em] uppercase text-[var(--color-gold)] block mb-2 font-medium">Social Preview Generator</span>
                 <h3 className="font-serif text-xl">The Complete Being Institute</h3>
              </div>
              <div className="bg-[var(--color-forest-50)] p-6 border border-[var(--color-ivory-10)] mb-8 rounded shadow-sm">
                 <SafeImage src={shareModalPost.image} alt={shareModalPost.title} className="w-full h-40 object-cover mb-4 grayscale-[20%]" />
                 <span className="text-[8px] text-[var(--color-gold)] uppercase tracking-widest block mb-1 font-medium">{shareModalPost.category}</span>
                 <h4 className="font-serif text-2xl mb-3 text-[var(--color-ivory)]">{shareModalPost.title}</h4>
                 <p className="text-xs text-[var(--color-ivory-60)] font-light line-clamp-2">{shareModalPost.excerpt}</p>
              </div>
              <BtnPrimary onClick={() => {
                 navigator.clipboard?.writeText(window.location.href);
                 showToast('Copied article link to clipboard.');
                 setShareModalPost(null);
              }} className="w-full bg-[var(--color-gold)] text-[var(--color-forest)] hover:bg-[var(--color-ivory)] hover:text-[var(--color-forest)] font-bold">
                 Copy Social Link & Share Card
              </BtnPrimary>
           </div>
        </div>
      )}
    </article>
  );
};
