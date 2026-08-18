import React, { useState } from 'react';
import { ReelFeed } from './components/ReelFeed';
import { RecommendationCard } from './components/RecommendationCard';
import { TrapBenchmarkView } from './components/TrapBenchmarkView';
import { StudentProfileView } from './components/StudentProfileView';
import { TechLibraryView } from './components/TechLibraryView';
import { RecommendationEngine, RequiredOutputSchema } from './services/recommendationEngine';
import { SAMPLE_INPUT_REELS } from './data/reelsData';
import { Sparkles, Layers, AlertOctagon, Brain, BookOpen, ShieldCheck, Github, Zap } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'trap' | 'profile' | 'library'>('feed');

  // Initial recommendation state loaded with the first trap reel to immediately demonstrate schema
  const [currentRecommendation, setCurrentRecommendation] = useState<RequiredOutputSchema>({
    currentReel: `${SAMPLE_INPUT_REELS[0].title} (${SAMPLE_INPUT_REELS[0].creator})`,
    interestDetected: 'Software Engineering Craftsmanship & Runtime Debugging',
    whyInterestDetected: 'Replay behavior on Java NullPointerException meme reveals familiarity with stack traces, object reference pitfalls, and production crash pressure.',
    recommendedTechReel: 'JVM Memory Internals: Stack vs Heap, Metaspace, and Garbage Collector Mark-Sweep',
    category: 'Java',
    whyThisRecommendation: 'Elevates Java crash meme into real JVM memory architecture, preventing recurring runtime NPEs and building true systems insight.',
    difficulty: 'Intermediate',
    confidence: 'High',
    antiHypePassed: true,
    recommendedObject: {
      id: 'rec-java-jvm-memory',
      title: 'JVM Memory Internals: Stack vs Heap, Metaspace, and Garbage Collector Mark-Sweep',
      category: 'Java',
      difficulty: 'Intermediate',
      summary: 'Deep dive into why NullPointerExceptions happen and GC pause optimizations.',
      whyItMatters: 'Transforms Java bug memes into true systems insight.',
      prerequisites: ['Basic Java syntax'],
      isHypeFree: true,
      estimatedMinutes: 3,
      thumbnailGradient: 'from-amber-600 to-orange-800',
      codeSnippet: `// Stack frame stores primitives & references -> Heap stores actual Object data`
    }
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white tracking-tight">SmartScroll<span className="text-indigo-400">.AI</span></h1>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase">
                Recommendation Agent
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Contextual Interest Inference Engine for Student Reels</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <nav className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${activeTab === 'feed' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Layers className="w-4 h-4" /> Live Feed
          </button>
          <button
            onClick={() => setActiveTab('trap')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${activeTab === 'trap' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <AlertOctagon className="w-4 h-4 text-amber-400" /> Trap Benchmark
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Brain className="w-4 h-4" /> Interest Radar
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition ${activeTab === 'library' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <BookOpen className="w-4 h-4" /> Tech Library
          </button>
        </nav>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Reel Feed Simulator (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <ReelFeed onRecommendationGenerated={setCurrentRecommendation} />
            </div>

            {/* Recommendation Output Card (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-indigo-400" /> Active Output Schema View
                </span>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" /> Direct Match Engine
                </span>
              </div>

              <RecommendationCard data={currentRecommendation} />
            </div>
          </div>
        )}

        {activeTab === 'trap' && <TrapBenchmarkView />}
        {activeTab === 'profile' && <StudentProfileView />}
        {activeTab === 'library' && <TechLibraryView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 px-6 py-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>SmartScroll.AI — Intelligent Student Reel Recommendation Agent</p>
        <p className="flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Context-Aware • Anti-Hype • Built-In Trap Validated
        </p>
      </footer>
    </div>
  );
};

export default App;
