import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const RoastDisplay = ({ roast }) => {
  return (
    <div className="flex-1 bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-xl h-[30rem] overflow-auto custom-scrollbar relative">
      <div className="sticky top-0 bg-slate-800/95 backdrop-blur-sm pb-4 border-b border-slate-700 mb-4 z-10 flex justify-between items-center">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
          The Verdict
        </h2>
        {roast && (
          <span className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20">
            Savage Mode: ON
          </span>
        )}
      </div>

      {roast ? (
        <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-red-200 prose-strong:text-red-400 max-w-none">
          <Markdown
            components={{
              code(props) {
                const { children, className,  ...rest } = props;
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={atomDark}
                    customStyle={{
                      background: '#0f172a', // Matches slate-900
                      border: '1px solid #1e293b',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem'
                    }}
                  />
                ) : (
                  <code {...rest} className="bg-slate-900 text-orange-300 px-1 py-0.5 rounded">
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
        <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-60">
          <span className="text-6xl mb-4 grayscale">💀</span>
          <p className="text-lg font-medium">No victims found yet.</p>
          <p className="text-sm">Paste some code to start the fire.</p>
        </div>
      )}
    </div>
  );
};

export default RoastDisplay;