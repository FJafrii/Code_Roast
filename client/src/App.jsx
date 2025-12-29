import { useState } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'; // <--- NEW IMPORT
import RoastForm from './components/RoastForm';
import RoastDisplay from './components/RoastDisplay';
import ThemeToggle from './components/ThemeToggle'; // <--- NEW IMPORT

function App() {
  const [code, setCode] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [roastMode, setRoastMode] = useState("savage");

  const handleRoast = async () => {
    if (!code) return;
    setLoading(true);
    setRoast("");
    
    try {
      // 👇 UPDATED: Sending both 'code' AND 'mode' to the server
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

  return (
    // UPDATED: Added transition-colors and dark/light backgrounds
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-white p-8 font-sans selection:bg-red-500/30">
      
      {/* Required for the toasts to show up */}
      <Toaster position="top-center" />

      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
              CODE ROASTER
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg mt-2">
              AI-powered humiliation for your spaghetti code 🍝
            </p>
          </div>
          
          <ThemeToggle /> {/* <--- The Button */}
        </header>

        <main className="flex flex-col md:flex-row gap-8">
          <RoastForm 
  code={code} 
  setCode={setCode} 
  handleRoast={handleRoast} 
  loading={loading}
  // 👇 YOU ARE PROBABLY MISSING THESE TWO LINES 👇
  roastMode={roastMode}
  setRoastMode={setRoastMode} 
/>
          <RoastDisplay 
            roast={roast} 
          />
        </main>

      </div>
    </div>
  );
}

export default App;