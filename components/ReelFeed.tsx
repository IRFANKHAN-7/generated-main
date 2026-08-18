import React, { useState, useEffect } from 'react';
import { Reel, SAMPLE_INPUT_REELS } from '../data/reelsData';
import { RecommendationEngine, RequiredOutputSchema } from '../services/recommendationEngine';
import { Heart, Bookmark, Repeat, Play, Pause, ChevronUp, ChevronDown, Sparkles, FileText, CheckCircle, AlertTriangle, Layers } from 'lucide-react';

interface Props {
  onRecommendationGenerated: (rec: RequiredOutputSchema) => void;
}

export const ReelFeed: React.FC<Props> = ({ onRecommendationGenerated }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentReel = SAMPLE_INPUT_REELS[currentIndex];
  const [metrics, setMetrics] = useState(currentReel.defaultMetrics);

  useEffect(() => {
    setMetrics(SAMPLE_INPUT_REELS[currentIndex].defaultMetrics);
  }, [currentIndex]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await RecommendationEngine.analyzeReelInteraction(currentReel, metrics);
      onRecommendationGenerated(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % SAMPLE_INPUT_REELS.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + SAMPLE_INPUT_REELS.length) % SAMPLE_INPUT_REELS.length);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 items-center justify-center">
      {/* Mobile Simulator Container */}
      <div className="relative w-full max-w-[360px] h-[640px] bg-black rounded-[36px] p-3 shadow-2xl border-4 border-slate-800 flex flex-col justify-between overflow-hidden select-none">
        
        {/* Dynamic Gradient Background Visualizer */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentReel.thumbnailGradient} opacity-75 transition-all duration-700 flex flex-col justify-center items-center`}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          
          {/* Animated Graphic Centerpiece */}
          <div className="relative z-10 flex flex-col items-center gap-3 p-6 text-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition transform active:scale-95 shadow-xl"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
            </button>

            {currentReel.isTrapReel && (
              <span className="px-3 py-1 rounded-full bg-amber-500/90 text-black font-extrabold text-xs tracking-wide shadow-md uppercase">
                Built-In Trap Scenario Reel
              </span>
            )}

            {currentReel.isHypeContent && (
              <span className="px-3 py-1 rounded-full bg-rose-500/90 text-white font-extrabold text-xs tracking-wide shadow-md uppercase flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Hype / Clickbait Content
              </span>
            )}
          </div>
        </div>

        {/* Top Header Bar */}
        <div className="relative z-20 flex items-center justify-between p-3 text-white">
          <span className="text-xs font-bold tracking-widest text-slate-200 uppercase bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
            Reel {currentIndex + 1} of {SAMPLE_INPUT_REELS.length}
          </span>

          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className={`p-2 rounded-full border backdrop-blur-sm transition ${showTranscript ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-black/40 border-white/20 text-slate-300'}`}
            title="Toggle Transcript"
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>

        {/* Transcript Overlay */}
        {showTranscript && (
          <div className="relative z-30 m-2 p-3 rounded-2xl bg-black/90 border border-slate-700 text-slate-200 text-xs leading-relaxed backdrop-blur-md animate-fade-in">
            <span className="font-bold text-indigo-400 block mb-1">Reel Audio Transcript:</span>
            "{currentReel.transcript}"
          </div>
        )}

        {/* Right Floating Actions (Likes, Save, Replay) */}
        <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center gap-4">
          <button
            onClick={() => setMetrics({ ...metrics, liked: !metrics.liked })}
            className={`p-3 rounded-full backdrop-blur-md border transition transform active:scale-90 ${metrics.liked ? 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-600/40' : 'bg-black/40 border-white/20 text-white'}`}
          >
            <Heart className={`w-5 h-5 ${metrics.liked ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={() => setMetrics({ ...metrics, saved: !metrics.saved })}
            className={`p-3 rounded-full backdrop-blur-md border transition transform active:scale-90 ${metrics.saved ? 'bg-amber-500 border-amber-300 text-black shadow-lg shadow-amber-500/40' : 'bg-black/40 border-white/20 text-white'}`}
          >
            <Bookmark className={`w-5 h-5 ${metrics.saved ? 'fill-black' : ''}`} />
          </button>

          <button
            onClick={() => setMetrics({ ...metrics, replayed: !metrics.replayed })}
            className={`p-3 rounded-full backdrop-blur-md border transition transform active:scale-90 ${metrics.replayed ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/40' : 'bg-black/40 border-white/20 text-white'}`}
          >
            <Repeat className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Details & Watch Completion Slider */}
        <div className="relative z-20 p-3 space-y-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent rounded-b-[28px]">
          <div>
            <span className="text-xs font-bold text-indigo-400">{currentReel.creator}</span>
            <h4 className="text-sm font-bold text-white line-clamp-2 mt-0.5">{currentReel.title}</h4>
            <div className="flex flex-wrap gap-1 mt-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                #{currentReel.categoryTag}
              </span>
              {currentReel.keywords.slice(0, 2).map((kw, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900/80 text-slate-400 border border-slate-800">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Watch Time % Slider */}
          <div className="space-y-1 bg-black/40 p-2.5 rounded-xl border border-white/10">
            <div className="flex justify-between text-[11px] font-semibold text-slate-300">
              <span>Watch Completion</span>
              <span className="text-indigo-400 font-mono">{metrics.watchTimePercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={metrics.watchTimePercent}
              onChange={e => setMetrics({ ...metrics, watchTimePercent: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Analyze Interaction Button */}
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs tracking-wider uppercase shadow-lg hover:shadow-indigo-500/25 transition transform active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {isAnalyzing ? 'Inferring Interest...' : 'Analyze & Recommend Tech Reel'}
          </button>
        </div>
      </div>

      {/* Control Panel & Quick Presets */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" /> Student Reel Feed Controls
          </h4>
          <p className="text-xs text-slate-400">
            Select a sample reel or simulate real-time student scrolling to test how SmartScroll AI infers intent.
          </p>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 flex items-center justify-center gap-1"
            >
              <ChevronUp className="w-4 h-4" /> Previous Reel
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 flex items-center justify-center gap-1"
            >
              Next Reel <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <hr className="border-slate-800" />

          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Built-In Trap Quick Presets
          </span>

          <div className="space-y-2">
            {SAMPLE_INPUT_REELS.filter(r => r.isTrapReel).map(reel => (
              <button
                key={reel.id}
                onClick={() => {
                  const idx = SAMPLE_INPUT_REELS.findIndex(r => r.id === reel.id);
                  if (idx !== -1) setCurrentIndex(idx);
                }}
                className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-start gap-2.5 ${currentReel.id === reel.id ? 'bg-indigo-950/80 border-indigo-500 text-white font-semibold' : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'}`}
              >
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-1 shrink-0" />
                <div className="line-clamp-1">{reel.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
