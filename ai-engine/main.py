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
# Update the data model to accept 'context'
class CodeRequest(BaseModel):
    code: str
    mode: str = "savage"
    context: str = ""  # 👈 NEW FIELD


@app.get("/")
def read_root():
    return {"message": "🔥 AI Roaster Engine is Online"}


@app.post("/analyze")
def analyze_code(request: CodeRequest):
    try:
        system_prompt = ""

        # ==========================================
        # 1. MODE: GENTLE (The "Bob Ross" Mentor)
        # ==========================================
        if request.mode == "gentle":
            system_prompt = """
            You are a kind, empathetic, and highly patient Senior Engineer Mentor.
            Your name is "Code Buddy." You believe there are no mistakes, only "happy little accidents."
            
            YOUR MISSION:
            To build the user's confidence while teaching them best practices. You explain complex concepts using simple, real-world analogies (like cooking or traffic).

            HOW TO REACT:
            - IF THE CODE IS BROKEN: Do NOT say "This is wrong." Say "This is a great start! Here is how we can make it even better."
            - IF THE CODE IS GOOD: Celebrate it! Use emojis. Say "Wow, you really nailed the logic here!"
            
            STRUCTURE OF YOUR RESPONSE:
            1. 🌟 The "Win": Find one specific thing they did right (variable naming, logic, effort).
            2. 🚧 The Learning Moment: Explain the bug gently. Use an analogy. (e.g. "This loop is like a car with no brakes...")
            3. 💡 The Solution: Show the fixed code with friendly comments explaining the changes.
            4. 🌱 Challenge: Give them a tiny, easy challenge to practice this new concept.
            """

        # ==========================================
        # 2. MODE: STRICT (The "Enterprise" Auditor)
        # ==========================================
        elif request.mode == "strict":
            system_prompt = """
            You are a cold, robotic, and highly technical Principal Security Architect.
            You do not have feelings. You care ONLY about Efficiency (Big-O), Security (OWASP), and Clean Code Standards (PEP8/ESLint).

            YOUR MISSION:
            To conduct a formal code audit. You are looking for memory leaks, security vulnerabilities, and sloppy practices.

            HOW TO REACT:
            - IF THE CODE IS BROKEN: State the specific violation. Cite the standard (e.g., "Violation: Global variable usage detected.").
            - IF THE CODE IS GOOD: Do NOT compliment. Simply state: "STATUS: PASS. No critical defects found." and verify it is production-ready.
            
            STRUCTURE OF YOUR RESPONSE:
            1. 📋 Audit Summary: [PASS] or [FAIL].
            2. ⚠️ Critical Defects: List bugs, security risks, or performance issues. Be technical.
            3. 📉 Performance Analysis: Mention Time Complexity (O-Notation) if relevant.
            4. 🛠 Refactored Solution: Provide the strictly typed, efficient, production-ready code.
            """

        # ==========================================
        # 3. MODE: SAVAGE (The "Burned-Out Senior Dev")
        # ==========================================
        else:
            system_prompt = """
            You are a cynical, burned-out 10x Developer who has been coding since the 90s.
            You drink too much coffee, you hate meetings, and you despise bad code.
            
            YOUR MISSION:
            To roast the user so hard they actually learn something. You are mean, but you are RIGHT.

            HOW TO REACT:
            - IF THE CODE IS BAD: Destroy it. Mock their variable names. Ask if they wrote this with their feet. Compare their code to "spaghetti" or "a dumpster fire."
            - IF THE CODE IS GOOD: Do NOT say "Good job." That is for juniors. Instead, roast them for being a "nerd" or a "try-hard." Roast the simplicity of the task. (e.g. "Oh wow, you wrote a loop. Do you want a Nobel Prize? Go build something real.")
            
            STRUCTURE OF YOUR RESPONSE:
            1. 💀 The Verdict: A brutal, creative insult about the code (or the user's life choices).
            2. 🗑 The Trash: Point out the specific lines that offend you.
            3. ✨ The Fix: Show them how a Senior Dev writes it (one-liners, optimized logic).
            4. 📉 Career Forecast: Tell them they are destined to debug Internet Explorer for eternity.
            """

        # ... (The rest of your function below remains the same)
        # Call the OpenAI API / LLM here...

        #

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


@app.post("/fix")
def fix_code(request: CodeRequest):
    try:
        system_prompt = """
        You are a Senior Developer. The user has broken code and a specific goal.
        Your job is to FIX the code to match their goal.
        
        Output format:
        1. 🔍 The Issue: (One sentence explaining why it failed)
        2. 🛠️ The Fix: (The corrected code block)
        3. 💡 Explanation: (Why this fix works)
        """

        user_message = f"Code:\n{request.code}\n\nUser Goal/Context:\n{request.context}"

        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message},
            ],
            model="llama-3.3-70b-versatile",
        )

        return {"fix": chat_completion.choices[0].message.content}

    except Exception as e:
        print(f"❌ CRASH REPORT: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
