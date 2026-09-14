import React from 'react';
import {
  Search, Menu, X, ArrowRight, Bookmark, BookmarkCheck, Flame, Award, Clock, Download
} from 'lucide-react';
import { MASTER_BRAND_LOGO, SafeImage, LEARNING_JOURNEYS, PILLARS } from '../data.jsx';

// --- EXTRACTED UI COMPONENTS ---

export const BtnPrimary = ({ children, onClick, className = '', type = 'button', ...props }) => (
  <button 
    type={type}
    onClick={onClick} 
    className={`bg-[var(--color-forest)] text-[var(--color-ivory)] px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[var(--color-gold)] hover:text-[var(--color-forest)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2 transition-colors duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const BtnGhost = ({ children, onClick, className = '', type = 'button', ...props }) => (
  <button 
    type={type}
    onClick={onClick} 
    className={`border border-[var(--color-forest)] text-[var(--color-forest)] px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[var(--color-forest)] hover:text-[var(--color-ivory)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2 transition-colors duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const BrandLogo = ({ theme = 'dark', className = '' }) => {
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

export const ContributorBlockFull = ({ author, theme = 'dark', isConversation = false, className = '' }) => {
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

export const ContributorBlockText = ({ author }) => {
  if (!author) return null;
  return (
    <span className="text-[9px] tracking-[0.3em] uppercase text-[var(--color-forest-50)] font-medium" aria-label={`Contributor: ${author.name}`}>
      CONTRIBUTOR: {author.name}
    </span>
  );
};

export const Navbar = ({ isDarkSection, navigate, setIsSearchOpen, setIsAccountOpen, setIsMenuOpen, savedArticlesCount }) => {
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

export const SearchOverlay = ({ isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, filteredContent, openPost }) => {
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

export const AccountDrawer = ({ 
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

export const MenuOverlay = ({ isMenuOpen, setIsMenuOpen, navigate }) => {
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

export const Footer = ({ navigate, showToast }) => (
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
