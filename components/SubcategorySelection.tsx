import React from 'react';
import { Category, Subcategory } from '../types';
import { ArrowLeft, Layers } from 'lucide-react';

interface SubcategorySelectionProps {
    category: Category;
    path: Subcategory[];
    onSelectSubcategory: (subcategory: Subcategory) => void;
    onBack: () => void;
}

const SubcategorySelection: React.FC<SubcategorySelectionProps> = ({ category, path, onSelectSubcategory, onBack }) => {
    // Determine the current list of subcategories based on the path
    const currentParent = path.length > 0 ? path[path.length - 1] : category;
    const subcategories = currentParent.subcategories || [];

    return (
        <div className="flex flex-col min-h-screen p-8 animate-slide-up max-w-6xl mx-auto">
            <div className="flex items-center mb-12 border-b border-neutral-900 pb-6">
                <button
                    onClick={onBack}
                    className="p-3 mr-6 rounded-full border border-neutral-800 hover:border-white hover:bg-white hover:text-black text-white transition-all duration-300"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-3xl font-light tracking-widest uppercase text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                        {path.length > 0 ? currentParent.name : 'Select Genre'}
                    </h2>
                    <p className="text-neutral-500 text-xs tracking-[0.2em] mt-2 uppercase">
                        Universe: {category.name} {path.length > 0 && `> ${path.slice(0, -1).map(p => p.name).join(' > ')}`}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subcategories.map((sub) => (
                    <button
                        key={sub.id}
                        onClick={() => onSelectSubcategory(sub)}
                        className="group relative flex flex-col items-start justify-between p-8 bg-white/10 backdrop-blur-lg border border-white/30 rounded-3xl hover:border-white/40 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(255,255,255,0.1),inset_0_0_20px_rgba(255,255,255,0.05)] h-64 overflow-hidden hover:scale-[1.03] active:scale-[0.98] glass-noise"
                    >
                        {/* Liquid Glass Shine Effect */}
                        <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/10 to-transparent group-hover:animate-[shine_3s_infinite] pointer-events-none"></div>

                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="p-4 bg-white/10 border border-white/20 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 rounded-2xl shadow-[inset_0_0_15px_rgba(255,255,255,0.1)]">
                            <Layers className="w-6 h-6" />
                        </div>

                        <div className="relative z-10 text-left">
                            <span className="block text-4xl font-black text-white group-hover:translate-x-1 transition-transform duration-500 origin-left tracking-tighter drop-shadow-sm">
                                {sub.name}
                            </span>
                            <div className="w-12 h-1.5 bg-white/20 group-hover:w-20 group-hover:bg-white mt-4 transition-all duration-500 rounded-full shadow-inner"></div>
                            <span className="block text-xs text-neutral-400 mt-3 uppercase tracking-[0.2em] group-hover:text-white/80 transition-colors duration-500">
                                {sub.subcategories ? `${sub.subcategories.length} Options` : `${sub.characters?.length || 0} Targets`}
                            </span>
                        </div>

                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                            <span className="text-[10px] font-black bg-white text-black px-3 py-1.5 rounded-full tracking-tighter shadow-2xl">SELECT</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SubcategorySelection;
