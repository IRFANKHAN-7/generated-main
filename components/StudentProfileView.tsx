import React from 'react';
import { SAMPLE_INPUT_REELS } from '../data/reelsData';
import { PieChart, Brain, Flame, ShieldCheck, Award, Zap, BookOpen, Clock, Sparkles } from 'lucide-react';

export const StudentProfileView: React.FC = () => {
  const interestCategories = [
    { label: 'Software Engineering & JVM', percent: 35, color: 'bg-amber-500' },
    { label: 'Data Structures & Algorithms', percent: 25, color: 'bg-blue-500' },
    { label: 'High Level Design & Architecture', percent: 20, color: 'bg-indigo-500' },
    { label: 'Computer Hardware & Compilation', percent: 12, color: 'bg-emerald-500' },
    { label: 'Cybersecurity & Web Exploits', percent: 8, color: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Profile Card */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/20">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">Student Scroll Persona Profile</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold">
                Software Engineering Track
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Inferred from watch duration, replay behavior, humor context, and conceptual interaction history.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-center">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 min-w-[100px]">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Scroll Utility</span>
            <span className="text-lg font-extrabold text-emerald-400">84%</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 min-w-[100px]">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Hype Filtered</span>
            <span className="text-lg font-extrabold text-indigo-400">100%</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Interest Distribution */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-indigo-400" /> Inferred Educational Interest Distribution
          </h3>

          <div className="space-y-3">
            {interestCategories.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>{cat.label}</span>
                  <span className="font-mono text-slate-400">{cat.percent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} transition-all duration-1000`} style={{ width: `${cat.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Behavioral Metrics */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Anti-Hype & Quality Sentinel
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block text-sm">Hype Content Rejection</strong>
                <p className="text-slate-400 leading-relaxed mt-0.5">
                  Automatically discards low-substance clickbait ("10 AI tools to replace coding") in favor of actionable computer science fundamentals.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <Award className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block text-sm">Contextual Intent Elevation</strong>
                <p className="text-slate-400 leading-relaxed mt-0.5">
                  Turns entertainment scrolling (Java NPE memes & interview jokes) into structured educational recommendations (HashMap bucket indexing & JVM stack/heap).
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
