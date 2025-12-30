import { useMemo } from 'react'; // 👈 We use useMemo, NOT useState/useEffect
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css'; 
import hljs from 'highlight.js';

// Helper function stays OUTSIDE
const detectLanguage = (input) => {
  if (!input || !input.trim()) return "Plain Text";
  
  if (input.includes("def ") || input.includes("import ") || input.includes("print(") || input.includes(":")) {
      if (!input.includes("function") && !input.includes("const") && !input.includes("var")) {
           return "Python 🐍";
      }
  }
  if (input.includes("const ") || input.includes("let ") || input.includes("function") || input.includes("=>") || input.includes("console.log")) {
      return "JavaScript ⚡";
  }

  const result = hljs.highlightAuto(input);
  return result.language ? result.language.toUpperCase() : "Unknown";
};

const SmartEditor = ({ code, setCode }) => {
  
  // 👇 THE FIX: Instant calculation. No crashing.
  const detectedLang = useMemo(() => detectLanguage(code), [code]);

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-xl transition-colors duration-300 flex flex-col h-96">
      <div className="flex justify-between items-center mb-2">
        <label className="text-slate-500 dark:text-slate-400 font-semibold text-sm uppercase tracking-wider">
          Input Code
        </label>
        
        <div className="flex items-center gap-3">
            <span className={`text-xs font-mono font-bold px-2 py-1 rounded transition-all duration-300 ${
                detectedLang.includes("Python") ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300" :
                detectedLang.includes("JavaScript") ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" :
                "bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-slate-400"
            }`}>
              {detectedLang.includes("Python") ? "Python 🐍 (True is 1)" :
               detectedLang.includes("JavaScript") ? "JS ⚡ ([object Object])" :
               "Unknown 💀 (RTFM)"}
            </span>

          {code && (
            <button 
              onClick={() => setCode('')}
              className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 border border-gray-200 dark:border-slate-700 rounded-md overflow-hidden bg-gray-50 dark:bg-[#2d2d2d] focus-within:ring-1 focus-within:ring-red-500 transition-all">
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => {
              if (detectedLang.includes("Python")) {
                  return highlight(code, languages.python);
              } else {
                  return highlight(code, languages.js);
              }
          }}
          padding={15}
          className="font-mono text-sm"
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: 'transparent', 
            minHeight: '100%',
          }}
          textareaClassName="focus:outline-none"
          placeholder="// RTFM. Paste your code here."
        />
      </div>
    </div>
  );
};

export default SmartEditor;