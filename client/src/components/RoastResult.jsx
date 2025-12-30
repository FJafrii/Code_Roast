import ReactMarkdown from 'react-markdown'; // Optional: If you want bold text etc.
// If you don't have react-markdown installed, we will just use a div below.

const RoastResult = ({ roast, loading }) => {
  return (
    <div className="flex-1 bg-white dark:bg-slate-800 p-8 rounded-lg border border-gray-200 dark:border-slate-700 shadow-xl min-h-[500px] flex flex-col transition-colors duration-300">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 uppercase tracking-wider border-b border-gray-100 dark:border-slate-700 pb-4">
        {loading ? "System Processing..." : "Diagnosis Report"}
      </h2>
      
      <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-6 border border-gray-100 dark:border-slate-700 overflow-y-auto font-mono text-sm leading-relaxed text-slate-700 dark:text-slate-300 shadow-inner">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-400 animate-pulse">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-red-500 rounded-full animate-spin"></div>
            <p>Compiling insults...</p>
          </div>
        ) : roast ? (
            // Using whitespace-pre-wrap to keep line breaks from the AI
            <div className="whitespace-pre-wrap">
                {roast}
            </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="text-center">Submit your code to receive<br/>emotional damage.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoastResult;