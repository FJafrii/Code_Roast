import { useState } from 'react'
import axios from 'axios' // You need to install this in client first!

function App() {
  const [code, setCode] = useState(`function sum(a, b) {\n  return a + b;\n}`);
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoast = async () => {
    setLoading(true);
    setRoast(""); // Clear previous roast
    try {
      // Connect to our Node Backend
      const response = await axios.post('http://localhost:3000/roast', { code });
      setRoast(response.data.roast);
    } catch (error) {
      console.error(error);
      setRoast("Error: Could not connect to the roasting server.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-10 px-4 bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-4 text-red-500">🔥 Code Roaster</h1>
      
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-5xl h-[70vh]">
        
        {/* Left: Input */}
        <div className="flex-1 flex flex-col border border-slate-700 rounded-lg p-4 bg-slate-800">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-slate-900 text-green-400 font-mono p-4 rounded outline-none resize-none"
          />
          <button 
            onClick={handleRoast}
            disabled={loading}
            className={`mt-4 font-bold py-2 rounded transition ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
          >
            {loading ? "Judging..." : "🔥 Roast This Code"}
          </button>
        </div>

        {/* Right: Output */}
        <div className="flex-1 border border-slate-700 rounded-lg p-4 bg-slate-800 overflow-auto">
           {roast ? (
             <p className="text-red-300 font-mono whitespace-pre-wrap">{roast}</p>
           ) : (
             <p className="text-slate-400 italic">AI Feedback will appear here...</p>
           )}
        </div>

      </div>
    </div>
  )
}

export default App