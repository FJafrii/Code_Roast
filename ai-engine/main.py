import os
from fastapi import FastAPI
from pydantic import BaseModel
from langchain_groq import ChatGroq
from dotenv import load_dotenv

# 1. Load the .env file
# This searches for a file named ".env" and loads variables into the system
load_dotenv()

# 2. Setup the AI Model
groq_api_key = os.getenv("GROQ_API_KEY")

# Safety Check
if not groq_api_key:
    raise ValueError("❌ API Key missing! Make sure you created the .env file.")

llm = ChatGroq(
    temperature=0.8,
    model_name="llama-3.3-70b-versatile",  # <--- The updated, working model
    api_key=groq_api_key,
)

app = FastAPI()


class CodeRequest(BaseModel):
    code: str


@app.get("/")
def home():
    return {"message": "🔥 AI Roaster Engine is Online"}


@app.post("/analyze")
def analyze_code(request: CodeRequest):
    try:
        print("Roasting code...")  # Log to terminal so you see it working
        prompt = f"""
        You are a grumpy, sarcastic, 10x Senior Engineer. 
        Analyze this code:
        {request.code}
        
        Task:
        1. Roast it humorously.
        2. Give 1 serious fix.
        3. Rate it x/10.
        
        Keep it punchy.
        """

        response = llm.invoke(prompt)
        return {"roast": response.content}

    except Exception as e:
        return {"roast": f"Error: {str(e)}"}
