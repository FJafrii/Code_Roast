from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Initialize Groq Client
client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)


# Update the data model to accept a 'mode'
class CodeRequest(BaseModel):
    code: str
    mode: str = "savage"  # Default to savage if not specified


@app.get("/")
def read_root():
    return {"message": "🔥 AI Roaster Engine is Online"}


@app.post("/analyze")
def analyze_code(request: CodeRequest):
    try:
        # 1. Select the Personality based on the Slider
        system_prompt = ""

        if request.mode == "gentle":
            # "The Helpful Mentor"
            system_prompt = """
            You are a kind, patient, and encouraging Senior Engineer mentor. 
            The user is learning. Explain their mistakes gently and use emojis. 
            Focus on how they can improve without making them feel bad.
            Structure: 
            1. 🌟 What you did well
            2. 🔧 Things to improve (explain simply)
            3. 💡 The Fix (code snippet)
            """

        elif request.mode == "strict":
            # "The Professional Boss"
            system_prompt = """
            You are a strict, no-nonsense Tech Lead. 
            Conduct a professional Code Review. Be direct, factual, and concise. 
            Do not make jokes, do not be mean, but do not sugarcoat errors.
            Focus on performance, security, and clean code standards.
            Structure:
            1. 📊 Code Review Summary
            2. ⚠️ Critical Issues
            3. ✅ Recommended Refactor
            """

        else:
            # "The Savage Roaster" (Default)
            system_prompt = """
            You are a savage, cynical, Senior Staff Engineer at a FAANG company. 
            You have rejected thousands of pull requests and you have zero patience for bad code.
            Roast the user. Make fun of their variable names. Be creative and mean.
            Structure:
            1. 💀 The Verdict (Brutal summary)
            2. 🔍 The Nitpicks (Roast specific lines)
            3. 💡 The Fix (Show them how a real dev writes it)
            4. 📉 Seniority Rating: x/10
            """

        # 2. Call the AI with the selected personality
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {
                    "role": "user",
                    "content": request.code,
                },
            ],
            model="llama-3.3-70b-versatile",
        )

        return {"roast": chat_completion.choices[0].message.content}

    except Exception as e:
        print("\n\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        print(f"❌ CRASH REPORT: {str(e)}")
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n")
        raise HTTPException(status_code=500, detail=str(e))
