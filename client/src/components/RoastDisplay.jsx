import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const RoastDisplay = ({ roast }) => {
  return (
    // 1. Main Container (Adapts to Light/Dark)
    <div className="flex-1 bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700 shadow-xl h-[30rem] overflow-auto custom-scrollbar relative transition-colors duration-300">
      
      {/* 2. Sticky Header (Adapts to Light/Dark) */}
      <div className="sticky top-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm pb-4 border-b border-gray-100 dark:border-slate-700 mb-4 z-10 flex justify-between items-center">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
          The Verdict
        </h2>
        {roast && (
          <span className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-1 rounded border border-red-500/20 font-medium">
            Savage Mode: ON
          </span>
        )}
      </div>

      {roast ? (
        // 3. Markdown Content (Uses 'prose' for light mode, 'dark:prose-invert' for dark mode)
        <div className="prose prose-slate dark:prose-invert max-w-none prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-headings:text-slate-900 dark:prose-headings:text-red-200 prose-strong:text-red-600 dark:prose-strong:text-red-400">
          <Markdown
            components={{
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={atomDark} // Code blocks stay dark (looks better)
                    customStyle={{
                      background: '#0f172a', 
                      border: '1px solid #1e293b',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      margin: '1.5rem 0'
                    }}
                  />
                ) : (
                  <code {...rest} className="bg-slate-100 dark:bg-slate-900 text-red-600 dark:text-orange-300 px-1 py-0.5 rounded font-mono text-sm border border-slate-200 dark:border-slate-700">
                    {children}
                  </code>
                );
              }
            }}
          >
            {roast}
          </Markdown>
        </div>
      ) : (
        // 4. Empty State
        <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 opacity-80">
          <span className="text-6xl mb-4 grayscale">💀</span>
          <p className="text-lg font-medium text-slate-500 dark:text-slate-500">No victims found yet.</p>
          <p className="text-sm">Paste some code to start the fire.</p>
        </div>
      )}
    </div>
  );
};

export default RoastDisplay;