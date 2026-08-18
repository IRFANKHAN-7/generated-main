import React, { useState } from 'react';
import { RequiredOutputSchema } from '../services/recommendationEngine';
import { Sparkles, CheckCircle2, ShieldCheck, Copy, Check, ChevronRight, Zap, Target, BookOpen } from 'lucide-react';

interface Props {
  data: RequiredOutputSchema;
  compact?: boolean;
}

export const RecommendationCard: React.FC<Props> = ({ data, compact = false }) => {
  const [copied, setCopied] = useState(false);

  const categoryColorMap: Record<string, string> = {
    AI: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    DSA: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    Java: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    HLD: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    Cybersecurity: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    Cloud: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    Hardware: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    Career: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    Other: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
  };

  const confidenceColorMap: Record<string, string> = {
    High: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    Low: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  };

  const difficultyColorMap: Record<string, string> = {
    Beginner: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    Intermediate: 'bg-amber-950 text-amber-300 border-amber-800',
    Advanced: 'bg-rose-950 text-rose-300 border-rose-800',
  };

  const formattedText = `
CURRENT REEL: ${data.currentReel}
INTEREST DETECTED: ${data.interestDetected}
WHY: ${data.whyInterestDetected}
RECOMMENDED TECH REEL: ${data.recommendedTechReel}
CATEGORY: ${data.category}
WHY THIS RECOMMENDATION: ${data.whyThisRecommendation}
DIFFICULTY: ${data.difficulty}
CONFIDENCE: ${data.confidence}
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-2xl bg-slate-900/90 border border-slate-700/60 p-6 shadow-2xl backdrop-blur-md transition-all hover:border-indigo-500/40">
      {/* Header Badge & Action */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-md">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">SmartScroll AI Agent Recommendation</h3>
            <p className="text-xs text-slate-400">Context-Aware Student Inference Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" /> Anti-Hype Verified
          </span>
          <button
            onClick={handleCopy}
            title="Copy Output Format"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 hover:bg-slate-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Output'}
          </button>
        </div>
      </div>

      {/* Structured Fields Grid */}
      <div className="mt-5 space-y-4">
        {/* CURRENT REEL */}
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block mb-1">
            CURRENT REEL
          </span>
          <p className="text-sm font-semibold text-slate-200">{data.currentReel}</p>
        </div>

        {/* INTEREST DETECTED & WHY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-900/50">
            <span className="text-[11px] font-bold text-indigo-300 tracking-wider uppercase block mb-1 flex items-center gap-1">
              <Target className="w-3.5 h-3.5" /> INTEREST DETECTED
            </span>
            <p className="text-sm font-bold text-white">{data.interestDetected}</p>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block mb-1">
              WHY (EVIDENCE)
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{data.whyInterestDetected}</p>
          </div>
        </div>

        {/* RECOMMENDED TECH REEL & CATEGORY */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-950/60 p-4 rounded-xl border border-indigo-500/30 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-indigo-400 tracking-wider uppercase flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> RECOMMENDED TECH REEL
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${categoryColorMap[data.category] || categoryColorMap['Other']}`}>
                CATEGORY: {data.category}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${difficultyColorMap[data.difficulty]}`}>
                {data.difficulty}
              </span>
            </div>
          </div>
          <p className="text-base font-extrabold text-white leading-snug">{data.recommendedTechReel}</p>

          {data.recommendedObject?.codeSnippet && (
            <div className="mt-3 p-2.5 rounded-lg bg-slate-950 text-indigo-200 text-xs font-mono border border-indigo-900/60 overflow-x-auto">
              <code>{data.recommendedObject.codeSnippet}</code>
            </div>
          )}
        </div>

        {/* WHY THIS RECOMMENDATION */}
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block mb-1">
            WHY THIS RECOMMENDATION
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">{data.whyThisRecommendation}</p>
        </div>

        {/* METADATA BAR (DIFFICULTY & CONFIDENCE) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <span className="text-slate-400">
              DIFFICULTY: <strong className="text-slate-200">{data.difficulty}</strong>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 flex items-center gap-1">
              CONFIDENCE:{' '}
              <strong className={`px-2 py-0.5 rounded-md border text-xs ${confidenceColorMap[data.confidence]}`}>
                {data.confidence}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Zap className="w-3.5 h-3.5 text-indigo-400" /> Topic & Context Reasoning Active
          </div>
        </div>
      </div>
    </div>
  );
};
