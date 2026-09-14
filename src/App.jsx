import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { fontStyles, INITIAL_CONTENT } from './data.jsx';
import { Navbar, SearchOverlay, AccountDrawer, MenuOverlay, Footer } from './components/shared.jsx';
import {
  GlobalArchiveView, PillarHubView, FoundersJournalView,
  StoreView, InstituteView, EventsView, LegalView, ContributorsView, AdminDashboardView
} from './components/views.jsx';
import { HomeView } from './components/views2.jsx';
import { SinglePostView } from './components/views3.jsx';
import { ErrorBoundary } from './components/errorboundary.jsx';

// --- MAIN APPLICATION ---
export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePost, setActivePost] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkSection, setIsDarkSection] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  // User State & Dashboard
  const [savedArticles, setSavedArticles] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [userProgress, setUserProgress] = useState({ streak: 1, completedCount: 0, hoursSpent: 0.0 });
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeSessionMinutes, setActiveSessionMinutes] = useState(0);

  // Advanced Reading Settings & Scalable Date Filter
  const [selectedArchiveFilter, setSelectedArchiveFilter] = useState('All');
  const [readingPositions, setReadingPositions] = useState({});
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const [contentList, setContentList] = useState(INITIAL_CONTENT);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSessionMinutes(prev => prev + 1);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setUserProgress(prev => ({ ...prev, hoursSpent: Number((activeSessionMinutes / 60).toFixed(1)) }));
    }
  }, [activeSessionMinutes, isLoggedIn]);

  const dynamicStats = useMemo(() => {
    return {
      essaysCount: contentList.filter(c => c.type === 'essay' || c.type === 'article').length,
      researchCount: contentList.filter(c => c.type === 'research').length,
      conversationsCount: contentList.filter(c => c.type === 'conversation').length,
      masterclassCount: contentList.filter(c => c.type === 'masterclass').length,
      videoCount: contentList.filter(c => c.type === 'video').length,
      podcastCount: contentList.filter(c => c.type === 'podcast').length
    };
  }, [contentList]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const headerOffset = 60; 
      
      const darkSections = document.querySelectorAll('.dark-section');
      let overDark = false;
      
      darkSections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= headerOffset && rect.bottom >= headerOffset) {
          overDark = true;
        }
      });
      setIsDarkSection(overDark);

      if (currentView === 'post' && activePost) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (scrollPos / totalHeight) * 100 : 0;
        setReadingProgress(progress);
        setReadingPositions(prev => ({ ...prev, [activePost.id]: scrollPos }));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView, activePost, activeCategory]);

  useEffect(() => {
    if (currentView !== 'post' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [currentView]);

  const toggleAudioNarration = (post) => {
    if (!('speechSynthesis' in window)) {
      showToast('Speech synthesis is not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      showToast('Audio narration stopped.');
    } else {
      const textToSpeak = `${post.title}. By ${post.author?.name || 'Institute Fellow'}. ${post.excerpt}. ${post.content}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
      showToast('Now playing audio narration...');
    }
  };

  const navigate = (view, category = 'All') => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlayingAudio(false);
    setCurrentView(view); setActiveCategory(category); setActivePost(null);
    setIsMenuOpen(false); setIsSearchOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPost = (post) => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlayingAudio(false);
    setActivePost(post); 
    setCurrentView('post'); 
    setIsMenuOpen(false); 
    setIsSearchOpen(false);
    
    if (isLoggedIn) {
       setUserProgress(prev => ({ ...prev, completedCount: prev.completedCount + 1 }));
    }
    
    setTimeout(() => {
      const savedPos = readingPositions[post.id];
      if (savedPos) {
        window.scrollTo({ top: savedPos, behavior: 'smooth' });
        showToast('Resumed from previous reading position.');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const toggleSaveArticle = (post) => {
    if (!post) return;
    if (savedArticles.some(p => p.id === post.id)) {
      setSavedArticles(prev => prev.filter(p => p.id !== post.id));
      showToast('Removed from reading list.');
    } else {
      setSavedArticles(prev => [...prev, post]);
      showToast('Saved to your reading list.');
    }
  };

  const filteredContent = useMemo(() => {
    let content = contentList;
    if (activeCategory !== 'All' && activeCategory !== 'conversation') {
      content = content.filter(item => item.category === activeCategory);
    }
    
    if (selectedArchiveFilter !== 'All') {
      const now = new Date();
      content = content.filter(item => {
        if (selectedArchiveFilter.startsWith('Year')) {
          const year = selectedArchiveFilter.match(/\(([^)]+)\)/)[1];
          return item.date.includes(year);
        }
        
        const itemDate = new Date(item.date);
        const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
        if (selectedArchiveFilter === 'Last 7 Days') return diffDays <= 7;
        if (selectedArchiveFilter === 'Last 30 Days') return diffDays <= 30;
        
        return item.monthYear === selectedArchiveFilter;
      });
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      content = content.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.excerpt.toLowerCase().includes(q) || 
        item.category.toLowerCase().includes(q) ||
        item.author?.name.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
      );
    }
    return content;
  }, [activeCategory, searchQuery, selectedArchiveFilter, contentList]);


  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col font-sans selection:bg-[var(--color-gold)] selection:text-[var(--color-forest)]">
        
        <style dangerouslySetInnerHTML={{ __html: fontStyles }} />

        <Navbar 
           isDarkSection={isDarkSection} navigate={navigate} setIsSearchOpen={setIsSearchOpen} 
           setIsAccountOpen={setIsAccountOpen} setIsMenuOpen={setIsMenuOpen} 
           savedArticlesCount={savedArticles.length} 
        />
        
        <SearchOverlay 
           isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} 
           searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
           filteredContent={filteredContent} openPost={openPost} 
        />
        
        <MenuOverlay 
           isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigate={navigate} 
        />
        
        <AccountDrawer 
           isAccountOpen={isAccountOpen} setIsAccountOpen={setIsAccountOpen} userProgress={userProgress}
           savedArticles={savedArticles} highlights={highlights} isLoggedIn={isLoggedIn}
           setIsLoggedIn={setIsLoggedIn} userEmail={userEmail} setUserEmail={setUserEmail}
           openPost={openPost} toggleSaveArticle={toggleSaveArticle} showToast={showToast}
        />
        
        {toastMessage && (
           <div role="status" aria-live="polite" className="fixed bottom-8 right-8 z-50 bg-[var(--color-forest)] text-[var(--color-ivory)] px-6 py-4 shadow-2xl border border-[var(--color-gold-30)] animate-in slide-in-from-bottom-5 duration-300 flex items-center gap-3">
              <CheckCircle2 size={16} className="text-[var(--color-gold)]" aria-hidden="true" />
              <span className="text-xs tracking-widest uppercase font-medium">{toastMessage}</span>
            </div>
        )}

        <main className="flex-grow" role="main">
          {currentView === 'home' && activeCategory === 'All' && (
             <HomeView 
                activeCategory={activeCategory} contentList={contentList} filteredContent={filteredContent}
                navigate={navigate} openPost={openPost} selectedArchiveFilter={selectedArchiveFilter}
                setSelectedArchiveFilter={setSelectedArchiveFilter} dynamicStats={dynamicStats}
             />
          )}
          {currentView === 'home' && activeCategory === 'conversation' && (
             <GlobalArchiveView contentList={contentList} openPost={openPost} />
          )}
          {currentView === 'home' && activeCategory !== 'All' && activeCategory !== 'conversation' && (
             <PillarHubView pillarName={activeCategory} contentList={contentList} openPost={openPost} />
          )}
          
          {/* Explicit Founders Journal Route Mapping */}
          {currentView === 'journal' && (
             <FoundersJournalView contentList={contentList} openPost={openPost} />
          )}
          
          {currentView === 'post' && (
             <SinglePostView 
                activePost={activePost} navigate={navigate} openPost={openPost} readingProgress={readingProgress}
                toggleSaveArticle={toggleSaveArticle} savedArticles={savedArticles} 
                toggleAudioNarration={toggleAudioNarration} isPlayingAudio={isPlayingAudio} 
                setHighlights={setHighlights} showToast={showToast} contentList={contentList}
             />
          )}
          {currentView === 'store' && <StoreView showToast={showToast} />}
          {currentView === 'about' && <InstituteView />}
          {currentView === 'events' && <EventsView showToast={showToast} />}
          {currentView === 'legal' && <LegalView />}
          {currentView === 'contributors' && <ContributorsView />}
          {currentView === 'admin' && (
             <AdminDashboardView 
                contentList={contentList} setContentList={setContentList} 
                showToast={showToast} navigate={navigate} 
             />
          )}
        </main>
        
        <Footer navigate={navigate} showToast={showToast} />
      </div>
    </ErrorBoundary>
  );
}
