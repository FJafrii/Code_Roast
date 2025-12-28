import { useState } from 'react';
import axios from 'axios';
import RoastForm from './components/RoastForm';
import RoastDisplay from './components/RoastDisplay';

function App() {
  const [code, setCode] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoast = async () => {
    if (!code) return;
    
    setLoading(true);
    setRoast(""); // Clear previous roast while loading
    
    try {
      // Note: We use the full URL if we haven't set up a proxy, 
      // but for local dev, localhost:3000 is fine.
      // Once deployed, this URL will change to your Render backend!
      const response = await axios.post('http://localhost:3000/roast', { code });
      setRoast(response.data.roast);
    } catch (error) {
      console.error(error);
      setRoast("Error: The AI refused to look at this code. (Check if backend is running)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans selection:bg-red-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center space-y-2 mb-12">
          <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
            CODE ROASTER
          </h1>
          <p className="text-slate-400 text-lg">
            AI-powered humiliation for your spaghetti code 🍝
          </p>
        </header>

        {/* Main Content Grid */}
        <main className="flex flex-col md:flex-row gap-8">
          <RoastForm 
            code={code} 
            setCode={setCode} 
            handleRoast={handleRoast} 
            loading={loading} 
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