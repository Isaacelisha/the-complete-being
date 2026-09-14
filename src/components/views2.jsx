import React, { useMemo } from 'react';
import { Play, Mic, Video, Filter, ArrowRight, ArrowUpRight, Headphones } from 'lucide-react';
import { PILLARS_DATA, SafeImage, EVENTS_DATA } from '../data.jsx';
import { BrandLogo, BtnGhost, ContributorBlockFull, ContributorBlockText } from './shared.jsx';

export const HomeView = ({ activeCategory, contentList, filteredContent, navigate, openPost, selectedArchiveFilter, setSelectedArchiveFilter, dynamicStats }) => {
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
                 // For rendering dynamically imported lucide icons without failing build, this uses a span if standard import isn't mapped
                 return (
                   <button key={pillar.name} className="text-left flex flex-col group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] p-4 -m-4 rounded" onClick={() => navigate('home', pillar.name)}>
                     <div className="mb-6 text-[var(--color-gold)] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-left">
                       <span className="w-8 h-8 block bg-[var(--color-gold)]" style={{ maskImage: `url(https://unpkg.com/lucide-static@0.321.0/icons/${pillar.icon.toLowerCase()}.svg)`, maskSize: 'contain', WebkitMaskImage: `url(https://unpkg.com/lucide-static@0.321.0/icons/${pillar.icon.toLowerCase()}.svg)`, WebkitMaskSize: 'contain' }} aria-hidden="true" />
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
               <button onClick={() => navigate('events')} className="text-xs uppercase tracking-widest text-[var(--color-gold)] hover:underline focus:outline-none">View All Events →</button>
            </div>
            <div className="space-y-6">
               {EVENTS_DATA.slice(0, 2).map(ev => (
                  <div key={ev.id} className="bg-[var(--color-ivory)] p-8 border border-[var(--color-forest-10)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                     <div>
                        <div className="text-[9px] uppercase tracking-widest text-[var(--color-gold)] mb-2 font-medium">{ev.type} • {ev.date} • {ev.location}</div>
                        <h3 className="font-serif text-2xl text-[var(--color-forest)] mb-2">{ev.title}</h3>
                        <p className="text-xs text-[var(--color-charcoal-70)] font-light">{ev.desc}</p>
                     </div>
                     <BtnGhost onClick={() => navigate('events')}>RSVP / Details</BtnGhost>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ARCHIVE & SCALABLE DATE FILTERING */}
      <section className="bg-[var(--color-ivory)] py-32 md:py-48 border-t border-[var(--color-forest-10)]">
        <div className="max-w-[100rem] mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-24 max-w-[85rem] mx-auto gap-6 border-b border-[var(--color-forest-10)] pb-8">
             <div>
               <h2 className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-gold)] font-medium mb-2">Complete Library</h2>
               <h3 className="text-3xl md:text-4xl font-serif text-[var(--color-forest)]">Archive & Chronological Browse</h3>
             </div>
             
             <div className="flex items-center gap-3">
                <Filter size={16} className="text-[var(--color-gold)]" />
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-charcoal-50)]">Date Filter:</span>
                <select aria-label="Filter archive by date range" className="bg-[var(--color-ivory)] border border-[var(--color-forest-20)] px-4 py-2 text-xs uppercase tracking-widest outline-none cursor-pointer focus:border-[var(--color-gold)]" value={selectedArchiveFilter} onChange={(e) => setSelectedArchiveFilter(e.target.value)}>
                   <option value="All">All Time Archive</option>
                   <option value="Last 7 Days">Last 7 Days</option>
                   <option value="Last 30 Days">Last 30 Days</option>
                   {activeYears.map(year => <option key={`yr-${year}`} value={`Year (${year})`}>Year ({year})</option>)}
                   {activeMonths.map(month => <option key={`mo-${month}`} value={month}>{month}</option>)}
                   <option value="Custom Range">Custom Range...</option>
                </select>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 max-w-[85rem] mx-auto">
            {archivePosts.map((post) => (
              <button key={post.id} className="text-left group cursor-pointer flex flex-col h-full bg-[var(--color-ivory)] shadow-sm hover:shadow-2xl transition-shadow duration-1000 border border-[var(--color-forest-05)] hover:border-[var(--color-forest-15)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]" onClick={() => openPost(post)}>
                <div className="aspect-[4/5] overflow-hidden relative w-full">
                  <SafeImage src={post.image} alt={post.title} className="w-full h-full object-cover cinematic-img grayscale-[15%]" />
                  <div className="absolute top-4 right-4 bg-[var(--color-forest-80)] backdrop-blur text-[var(--color-ivory)] px-3 py-1 text-[9px] tracking-widest uppercase">
                     {post.type}
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col flex-grow w-full">
                  <div className="flex justify-between items-center mb-4 md:mb-6 w-full">
                     <span className="text-[9px] text-[var(--color-gold)] tracking-[0.4em] uppercase font-medium">{post.category}</span>
                     <span className="text-[9px] text-[var(--color-charcoal-40)] tracking-widest font-medium">{post.date}</span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-serif text-[var(--color-forest)] mb-6 md:mb-8 group-hover:text-[var(--color-gold)] transition-colors duration-500 leading-snug">{post.title}</h4>
                  <p className="text-[var(--color-charcoal-60)] font-light text-sm md:text-base leading-loose mb-10 md:mb-12 flex-grow line-clamp-3">{post.excerpt}</p>
                  <div className="mt-auto border-t border-[var(--color-forest-10)] pt-6 md:pt-8 flex justify-between items-center w-full">
                    <ContributorBlockText author={post.author} />
                  </div>
                </div>
              </button>
            ))}
            {archivePosts.length === 0 && (
               <p className="text-[var(--color-charcoal-50)] font-serif italic py-20 col-span-full text-center text-lg">No library documents found matching the selected date criteria.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
