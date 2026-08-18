import React, { useState } from 'react';
import { CURATED_TECH_RECOMMENDATIONS, TechRecommendation } from '../data/reelsData';
import { BookOpen, Code, Clock, ShieldCheck, CheckCircle, Tag, Filter } from 'lucide-react';

export const TechLibraryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'DSA', 'HLD', 'Java', 'Hardware', 'AI', 'Cybersecurity', 'Cloud', 'Career'];

  const filtered = selectedCategory === 'ALL'
    ? CURATED_TECH_RECOMMENDATIONS
    : CURATED_TECH_RECOMMENDATIONS.filter(r => r.category === selectedCategory);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" /> Curated Educational Tech Reels Library
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            High-value, hype-free micro-lessons engineered for computer science & tech career progression.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${selectedCategory === cat ? 'bg-indigo-600 border-indigo-400 text-white shadow-md' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(item => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {item.category}
                </span>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {item.estimatedMinutes} min micro-lesson
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-medium">
                    {item.difficulty}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>
            </div>

            {item.codeSnippet && (
              <div className="p-2.5 rounded-xl bg-slate-950 text-indigo-200 text-xs font-mono border border-slate-800 overflow-x-auto">
                <code>{item.codeSnippet}</code>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-emerald-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Hype-Free Verified
              </span>
              <span>Why: {item.whyItMatters.slice(0, 55)}...</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
