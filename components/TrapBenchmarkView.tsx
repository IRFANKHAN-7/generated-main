import React, { useState } from 'react';
import { RecommendationEngine, TrapComparisonResult } from '../services/recommendationEngine';
import { RecommendationCard } from './RecommendationCard';
import { SAMPLE_INPUT_REELS } from '../data/reelsData';
import { AlertOctagon, CheckCircle2, XCircle, ArrowRight, Zap, Target, ShieldAlert, Cpu } from 'lucide-react';

export const TrapBenchmarkView: React.FC = () => {
  const [benchmarkResult, setBenchmarkResult] = useState<TrapComparisonResult>(
    RecommendationEngine.runBuiltInTrapBenchmark()
  );

  const trapReels = SAMPLE_INPUT_REELS.filter(r => r.isTrapReel);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-8 shadow-2xl">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <AlertOctagon className="w-4 h-4" /> Built-In Trap Test Suite
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Naive Keyword Matcher vs Contextual AI Agent
          </h2>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            Test scenario: A student watches a <strong>Java NullPointerException meme</strong>, a <strong>FAANG software engineer lifestyle v-log</strong>, a <strong>binary tree inversion interview joke</strong>, and a <strong>laptop CPU compilation benchmark</strong>.
          </p>
        </div>
      </div>

      {/* Trap Inputs Reel Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-400" /> Student Watch History (4 Trap Reels)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trapReels.map((reel, idx) => (
            <div
              key={reel.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5 relative overflow-hidden"
            >
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-400 uppercase">
                <span>Trap Reel #{idx + 1}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{reel.categoryTag}</span>
              </div>
              <h4 className="text-xs font-bold text-white line-clamp-2">{reel.title}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 font-mono">"{reel.transcript}"</p>
              <div className="pt-2 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800 font-semibold">
                <span>Watch: {reel.defaultMetrics.watchTimePercent}%</span>
                <span>Liked: {reel.defaultMetrics.liked ? 'Yes' : 'No'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Shallow Recommendation Card (Fails) */}
        <div className="rounded-3xl bg-slate-950 border border-rose-900/50 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-rose-900/40">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <XCircle className="w-6 h-6 shrink-0" />
              <div>
                <h3 className="text-base text-white">Shallow Keyword Recommendation</h3>
                <span className="text-xs text-rose-400/80 font-normal">Naively matches literal strings</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold">
              TRAP FAILED ❌
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">INTEREST DETECTED</span>
              <p className="font-semibold text-slate-200">{benchmarkResult.shallowRecommendation.interestDetected}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40">
              <span className="text-[10px] text-rose-400 uppercase font-bold block mb-1">RECOMMENDED TECH REEL</span>
              <p className="font-extrabold text-base text-rose-200">{benchmarkResult.shallowRecommendation.recommendedTechReel}</p>
              <p className="text-[11px] text-rose-300/80 mt-1">{benchmarkResult.shallowRecommendation.whyThisRecommendation}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block text-rose-400">FLAW ANALYSIS</span>
              <p className="text-slate-300 leading-relaxed">{benchmarkResult.shallowRecommendation.flawReasoning}</p>
            </div>
          </div>
        </div>

        {/* Strong SmartScroll AI Agent Card (Succeeds) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Strong AI Recommendation Agent Output
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              TRAP PASSED ✅
            </span>
          </div>

          <RecommendationCard data={benchmarkResult.strongAgentRecommendation} />
        </div>

      </div>

      {/* Explanation Banner */}
      <div className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-4">
        <Cpu className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">How SmartScroll AI Agent Avoided The Built-In Trap</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {benchmarkResult.trapExplanation}
          </p>
        </div>
      </div>
    </div>
  );
};
