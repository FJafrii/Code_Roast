/* eslint-disable */
import { useState, useEffect } from 'react';
import SmartEditor from './SmartEditor';

const RoastForm = ({ code, setCode, handleRoast, handleFix, loading, roastMode, setRoastMode, context, setContext }) => {
  const [loadingText, setLoadingText] = useState("Analyzing...");

  useEffect(() => {
    // 👇 FIX: Moved messages INSIDE the effect so React stops complaining
    const loadingMessages = [
      "Reading your spaghetti code... 🍝",
      "Trying not to cry... 😭",
      "Calling the syntax police... 🚓",
      "Judging your variable names... 🤨"
    ];

    let interval;
    if (loading) {
      let i = 0;
      interval = setInterval(() => {
        setLoadingText(loadingMessages[i % loadingMessages.length]);
        i++;
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="flex-1 flex flex-col gap-4">
      
      {/* SLIDER SECTION */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-xl transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <label className="text-slate-500 dark:text-slate-400 font-semibold text-sm uppercase tracking-wider">
            Intensity Level
          </label>
          <span className={`text-xs font-bold px-2 py-1 rounded ${
            roastMode === 'gentle' ? 'bg-green-100 text-green-600' :
            roastMode === 'strict' ? 'bg-blue-100 text-blue-600' :
            'bg-red-100 text-red-600'
          }`}>
            {roastMode === 'gentle' ? '😇 Gentle' : 
             roastMode === 'strict' ? '👔 Professional' : 
             '💀 SAVAGE'}
          </span>
        </div>
        <input 
          type="range" min="1" max="3" step="1"
          value={roastMode === 'gentle' ? 1 : roastMode === 'strict' ? 2 : 3}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val === 1) setRoastMode('gentle');
            if (val === 2) setRoastMode('strict');
            if (val === 3) setRoastMode('savage');
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-red-500"
        />
      </div>

      {/* SMART EDITOR */}
      <SmartEditor code={code} setCode={setCode} />

      {/* CONTEXT INPUT */}
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
        <label className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1 block">
          What are you trying to do? (Optional)
        </label>
        <input 
          type="text"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g. Center a div, Sort an array, Fix the API call..."
          className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none"
        />
      </div>

      {/* BUTTON GROUP */}
      <div className="flex gap-3">
        {/* ROAST BUTTON */}
        <button
          onClick={handleRoast}
          disabled={loading || !code}
          className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all transform active:scale-95
            ${loading 
              ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed text-slate-500 dark:text-slate-400' 
              : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-lg shadow-red-900/20'
            }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{loadingText}</span> {/* 👈 This fixes the unused variable error */}
            </div>
          ) : (
            roastMode === 'savage' ? "🔥 ROAST IT" : "✨ ANALYZE"
          )}
        </button>

        {/* FIX BUTTON */}
        <button
          onClick={handleFix}
          disabled={loading || !code}
          className="px-6 py-4 rounded-lg font-bold text-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 transition-all transform active:scale-95"
        >
          🔧 FIX IT
        </button>
      </div>

    </div>
  );
};

export default RoastForm;