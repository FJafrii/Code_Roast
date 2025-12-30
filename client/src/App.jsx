import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RoastForm from './components/RoastForm';

// --- INTERNAL COMPONENTS ---

// 👇 NEW: The Toast Notification Component
const Toast = ({ message, show }) => {
  if (!show) return null;
  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-6 py-3 rounded-full shadow-2xl z-50 font-bold transition-all duration-300 animate-bounce border border-slate-700 dark:border-slate-200">
      {message}
    </div>
  );
};

const Header = ({ darkMode, setDarkMode }) => (
  <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 py-4 px-6 sticky top-0 z-10 transition-colors duration-300">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-tr from-red-600 to-orange-500 p-2 rounded-lg shadow-lg shadow-red-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-slate-800 dark:text-white">
          CODE<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">ROASTER</span>
        </h1>
      </div>
      
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-xl"
        title="Toggle Theme"
      >
        {darkMode ? '🌞' : '🌙'}
      </button>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-6 mt-auto transition-colors duration-300">
    <div className="container mx-auto px-4 text-center">
      <p className="text-slate-500 dark:text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} CodeRoaster AI. No developers were harmed in the making of this app.
      </p>
    </div>
  </footer>
);

const RoastResult = ({ roast, loading }) => (
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
          <div className="whitespace-pre-wrap">{roast}</div>
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

// --- MAIN APP COMPONENT ---

function App() {
  const [code, setCode] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [roastMode, setRoastMode] = useState("savage");
  const [context, setContext] = useState(""); 
  
  // Theme State
  const [darkMode, setDarkMode] = useState(true);
  
  // Toast State
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // Ref to track first render (so we don't show toast on page load)
  const isFirstRun = useRef(true);

  // 👇 THEME & TOAST LOGIC
  useEffect(() => {
    // 1. Apply the class
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 2. Trigger Toast (Skip first run)
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return; 
    }

    if (darkMode) {
      setToastMessage("Good choice. Real coders use Dark Mode 🌑");
    } else {
      setToastMessage("MY EYES! IT BURNS! Are you even a Coder 🔥");
    }
    
    setShowToast(true);
    
    // 3. Hide Toast after 2 seconds
    const timer = setTimeout(() => setShowToast(false), 2000);
    return () => clearTimeout(timer);

  }, [darkMode]);

  const handleRoast = async () => {
    if (!code) return;
    setLoading(true);
    setRoast("");
    
    try {
      const response = await axios.post('http://localhost:3000/roast', { 
        code: code,
        mode: roastMode
      });
      setRoast(response.data.roast);
    } catch (error) {
      console.error(error);
      setRoast("Error: The AI refused to look at this code. (Check if backend is running)");
    } finally {
      setLoading(false);
    }
  };

  const handleFix = async () => {
    if (!code) return;
    setLoading(true);
    setRoast(""); 
    
    try {
      const response = await axios.post('http://localhost:3000/roast/fix', { 
        code, 
        context 
      });
      setRoast(response.data.fix);
    } catch (error) {
      console.error(error);
      setRoast("Error: I couldn't fix this mess. (Check backend connection)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300 text-slate-900 dark:text-slate-100">
      
      {/* The Toast Notification */}
      <Toast message={toastMessage} show={showToast} />
      
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <RoastForm 
          code={code} 
          setCode={setCode} 
          handleRoast={handleRoast}
          handleFix={handleFix}
          loading={loading}
          roastMode={roastMode}
          setRoastMode={setRoastMode}
          context={context}
          setContext={setContext}
        />

        <RoastResult 
          roast={roast} 
          loading={loading} 
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;