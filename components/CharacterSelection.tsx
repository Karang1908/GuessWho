import React from 'react';
import { Category, Character, Subcategory } from '../types';
import { ArrowLeft, User, HelpCircle } from 'lucide-react';

interface CharacterSelectionProps {
  category: Category;
  subcategory?: Subcategory;
  onSelectCharacter: (character: Character) => void;
  onBack: () => void;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({ category, subcategory, onSelectCharacter, onBack }) => {
  const characters = subcategory ? subcategory.characters : (category.characters || []);

  return (
    <div className="flex flex-col min-h-screen p-8 animate-slide-up max-w-5xl mx-auto">
      <div className="flex items-center mb-12 border-b border-neutral-900 pb-6">
        <button
          onClick={onBack}
          className="p-3 mr-6 rounded-full border border-neutral-800 hover:border-white hover:bg-white hover:text-black text-white transition-all duration-300"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-light tracking-widest uppercase text-white">Target Selection</h2>
          <p className="text-neutral-500 text-xs tracking-[0.2em] mt-2 uppercase">
            Universe: {category.name} {subcategory && `> ${subcategory.name}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {characters.map((char, index) => (
          <button
            key={char.id}
            onClick={() => onSelectCharacter(char)}
            className="group relative aspect-[3/4] flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl hover:border-white/40 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(255,255,255,0.1),inset_0_0_20px_rgba(255,255,255,0.05)] overflow-hidden hover:scale-[1.03] active:scale-[0.98] glass-noise"
          >
            {/* Liquid Glass Shine Effect */}
            <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/10 to-transparent group-hover:animate-[shine_3s_infinite] pointer-events-none"></div>

            {/* Number background */}
            <span className="text-8xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-700 absolute top-0 right-0 leading-none -mt-4 -mr-4 select-none">
              {index + 1}
            </span>

            <div className="relative z-10 flex flex-col items-center transition-all duration-500 group-hover:-translate-y-4">
              <div className="p-6 bg-white/10 border border-white/20 rounded-full mb-6 group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-500 shadow-[inset_0_0_15px_rgba(255,255,255,0.2)]">
                <User className="w-10 h-10" />
              </div>
              <span className="text-xl font-black text-white tracking-tighter uppercase group-hover:tracking-widest transition-all duration-500 drop-shadow-md">UNKNOWN</span>
              <div className="w-8 h-1.5 bg-white/20 mt-3 rounded-full group-hover:w-16 group-hover:bg-white transition-all duration-500 shadow-inner"></div>
            </div>

            <div className="absolute bottom-0 w-full p-4 bg-white text-black text-[10px] font-black tracking-[0.3em] uppercase transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center gap-2 shadow-2xl">
              <HelpCircle className="w-3 h-3" />
              INITIATE
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelection;