import { useState, useEffect } from 'react';

const RoastForm = ({ code, setCode, handleRoast, loading }) => {
  const [loadingText, setLoadingText] = useState("Analyzing...");

  // The funny loading text logic lives here now (closer to the button)
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
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-xl">
        <div className="flex justify-between items-center mb-2">
          <label className="text-slate-400 font-semibold text-sm uppercase tracking-wider">
            Input Code
          </label>
          <span className="text-xs text-slate-500">Paste your shame below</span>
        </div>
        
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Paste your questionable code here..."
          className="w-full h-96 bg-slate-900 text-slate-300 p-4 rounded-md font-mono text-sm border border-slate-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all resize-none"
          spellCheck="false"
        />
      </div>

      <button
        onClick={handleRoast}
        disabled={loading || !code}
        className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform active:scale-95
          ${loading 
            ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
            : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-lg shadow-red-900/20'
          }`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>{loadingText}</span>
          </div>
        ) : (
          "🔥 ROAST IT"
        )}
      </button>
    </div>
  );
};

export default RoastForm;