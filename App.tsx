import React, { useState, useEffect, useRef } from 'react';
import LandingScreen from './components/LandingScreen';
import CategorySelection from './components/CategorySelection';
import SubcategorySelection from '@/components/SubcategorySelection';
import CharacterSelection from './components/CharacterSelection';
import ChatInterface from './components/ChatInterface';
import { ViewState, Category, Character, Subcategory } from './types';
import { BACKGROUND_CONFIG } from './backgroundConfig';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('LANDING');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [subcategoryPath, setSubcategoryPath] = useState<Subcategory[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // Background fade-to-black transition state
  const [displayedBg, setDisplayedBg] = useState<string | null>(null);
  const [bgOpacity, setBgOpacity] = useState(0);
  const isFirstRender = useRef(true);

  // Background Logic
  const getCurrentBackground = () => {
    // If on landing or transitioning, use special landing background
    if ((view === 'LANDING' || view === 'TRANSITION_LOADING') && BACKGROUND_CONFIG['landing']) {
      return BACKGROUND_CONFIG['landing'];
    }

    // Use specific background for category selection screen
    if (view === 'CATEGORY_SELECT' && BACKGROUND_CONFIG['category_select']) {
      return BACKGROUND_CONFIG['category_select'];
    }

    // Check most specific selection first (subcategory)
    if (subcategoryPath.length > 0) {
      const activeSub = subcategoryPath[subcategoryPath.length - 1];
      if (BACKGROUND_CONFIG[activeSub.id]) return BACKGROUND_CONFIG[activeSub.id];
    }
    // Then check category
    if (selectedCategory && BACKGROUND_CONFIG[selectedCategory.id]) {
      return BACKGROUND_CONFIG[selectedCategory.id];
    }
    return null;
  };

  const currentBackground = getCurrentBackground();

  // Fade-to-black transition effect
  useEffect(() => {
    if (isFirstRender.current) {
      // On first render, just set the background immediately
      setDisplayedBg(currentBackground);
      setBgOpacity(1);
      isFirstRender.current = false;
      return;
    }

    if (currentBackground === displayedBg) return;

    // Phase 1: Fade out to black
    setBgOpacity(0);

    // Phase 2: After fade-out completes, swap image and fade in
    const timer = setTimeout(() => {
      setDisplayedBg(currentBackground);
      // Small delay to ensure the new image element is rendered before fading in
      requestAnimationFrame(() => {
        setBgOpacity(1);
      });
    }, 250); // 250ms fade-out duration

    return () => clearTimeout(timer);
  }, [currentBackground]);

  // Navigation Handlers
  const startGame = () => {
    setView('TRANSITION_LOADING');
    setTimeout(() => {
      setView('CATEGORY_SELECT');
    }, 250);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setSubcategoryPath([]);
    if (category.subcategories && category.subcategories.length > 0) {
      setView('SUBCATEGORY_SELECT');
    } else {
      setView('CHARACTER_SELECT');
    }
  };

  const handleSubcategorySelect = (subcategory: Subcategory) => {
    const newPath = [...subcategoryPath, subcategory];
    setSubcategoryPath(newPath);

    if (subcategory.subcategories && subcategory.subcategories.length > 0) {
      // Stay in subcategory selection if there are more nested levels
      setView('SUBCATEGORY_SELECT');
    } else {
      // Otherwise move to character selection
      setView('CHARACTER_SELECT');
    }
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setView('GAME_SESSION');
  };

  const handleBackToLanding = () => {
    setView('LANDING');
    setSelectedCategory(null);
    setSubcategoryPath([]);
    setSelectedCharacter(null);
  };

  const handleBackToCategories = () => {
    setView('CATEGORY_SELECT');
    setSelectedCategory(null);
    setSubcategoryPath([]);
    setSelectedCharacter(null);
  };

  const handleBackToSubcategories = () => {
    if (subcategoryPath.length > 0) {
      const newPath = subcategoryPath.slice(0, -1);
      setSubcategoryPath(newPath);
      setView('SUBCATEGORY_SELECT');
    } else {
      handleBackToCategories();
    }
  };

  const handleBackToCharacters = () => {
    setView('CHARACTER_SELECT');
    setSelectedCharacter(null);
  };

  const handleNewGame = () => {
    setView('LANDING');
    setSelectedCategory(null);
    setSubcategoryPath([]);
    setSelectedCharacter(null);
  };

  // Render Logic
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black relative overflow-hidden">

      {/* Global Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base Black Background */}
        <div className="absolute inset-0 bg-black"></div>

        {/* Dynamic Image Overlay — Fade-to-black transition */}
        {displayedBg && (
          <div
            className="absolute inset-0 bg-cover bg-center scale-110 transition-opacity duration-[250ms]"
            style={{
              backgroundImage: `url(${displayedBg})`,
              opacity: bgOpacity * (view === 'LANDING' ? 0.4 : 0.3),
              transitionTimingFunction: 'cubic-bezier(0.45, 0, 0.55, 1)',
            }}
          />
        )}

        {/* Constant Dark Overlay for consistent dimming */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80"></div>

        {/* Vignette Effect */}
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,1)]"></div>
      </div>

      <div className="relative z-10 w-full">
        {view === 'LANDING' && (
          <LandingScreen onStart={startGame} />
        )}

        {view === 'TRANSITION_LOADING' && (
          <div className="flex flex-col items-center justify-center min-h-screen p-4 animate-fade-in">
            <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5 relative glass-noise">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full animate-shine"></div>
              <div className="h-full bg-white/60 rounded-full transition-all duration-[250ms] ease-out w-full origin-left animate-[scaleX_0.25s_ease-out]"></div>
            </div>
          </div>
        )}


        {view === 'CATEGORY_SELECT' && (
          <CategorySelection
            onSelectCategory={handleCategorySelect}
            onBack={handleBackToLanding}
          />
        )}

        {view === 'SUBCATEGORY_SELECT' && selectedCategory && (
          <SubcategorySelection
            category={selectedCategory}
            path={subcategoryPath}
            onSelectSubcategory={handleSubcategorySelect}
            onBack={handleBackToSubcategories}
          />
        )}

        {view === 'CHARACTER_SELECT' && (selectedCategory || subcategoryPath.length > 0) && (
          <CharacterSelection
            category={selectedCategory!}
            subcategory={subcategoryPath[subcategoryPath.length - 1]}
            onSelectCharacter={handleCharacterSelect}
            onBack={handleBackToSubcategories}
          />
        )}

        {view === 'GAME_SESSION' && selectedCharacter && (
          <ChatInterface
            character={selectedCharacter}
            onBack={handleBackToCharacters}
            onNewGame={handleNewGame}
          />
        )}
      </div>
    </div>
  );
};

export default App;