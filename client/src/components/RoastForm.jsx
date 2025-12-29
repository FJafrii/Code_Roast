import { useState, useEffect } from 'react';

// Accept roastMode and setRoastMode props from App.jsx (we will add them next)

const RoastForm = ({ code, setCode, handleRoast, loading, roastMode, setRoastMode }) => {
  const [loadingText, setLoadingText] = useState("Analyzing...");

  const loadingMessages = [
    "Reading your spaghetti code... 🍝",
    "Trying not to cry... 😭",
    "Calling the syntax police... 🚓",
    "Consulting StackOverflow... 🧠",
    "Judging your variable names... 🤨"
  ];

  useEffect(() => {
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
      
      {/* --- NEW SLIDER SECTION --- */}
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
          type="range" 
          min="1" 
          max="3" 
          step="1"
          value={roastMode === 'gentle' ? 1 : roastMode === 'strict' ? 2 : 3}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val === 1) setRoastMode('gentle');
            if (val === 2) setRoastMode('strict');
            if (val === 3) setRoastMode('savage');
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-red-500"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
          <span>Constructive</span>
          <span>Strict</span>
          <span>Career Ending</span>
        </div>
      </div>
      {/* ------------------------- */}

      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-xl transition-colors duration-300">
        <div className="flex justify-between items-center mb-2">
          <label className="text-slate-500 dark:text-slate-400 font-semibold text-sm uppercase tracking-wider">
            Input Code
          </label>
          <span className="text-xs text-slate-400 dark:text-slate-500">Paste your shame below</span>
        </div>
        
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Paste your questionable code here..."
          className="w-full h-96 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-300 p-4 rounded-md font-mono text-sm border border-gray-200 dark:border-slate-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all resize-none"
          spellCheck="false"
        />
      </div>

      <button
        onClick={handleRoast}
        disabled={loading || !code}
        className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform active:scale-95
          ${loading 
            ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed text-slate-500 dark:text-slate-400' 
            : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-lg shadow-red-900/20'
          }`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>{loadingText}</span>
          </div>
        ) : (
          roastMode === 'savage' ? "🔥 ROAST IT" : "✨ ANALYZE IT"
        )}
      </button>
    </div>
  );
};

export default RoastForm;