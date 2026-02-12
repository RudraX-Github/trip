🎙️ AI Interviewer Pro

AI Interviewer Pro is an interactive, voice-enabled mock interview application. It analyzes your PDF resume to generate highly personalized technical and behavioral questions, conducts a realistic voice-based interview, and provides detailed, real-time feedback on your answers.

📸 Demo & Screenshots

(If you are hosting this on GitHub, you can link your images and videos here)

App Interface: https://github.com/RudraX-Github/AI_Intervewer/blob/main/front.png

Video Demonstration: Watch the Demo Video

✨ Key Features

📄 Smart Resume Parsing: Instantly extracts and processes text from uploaded PDF resumes using PyPDF2.

🧠 Personalized Question Generation: Leverages Google's Gemini 2.5 Flash API to contextually analyze your experience and generate 5 unique questions (covering technical depth, behavioral scenarios, and problem-solving).

🗣️ Conversational Voice Interaction: * Reads questions aloud to you using gTTS (Google Text-to-Speech).

Records your spoken answers directly through your microphone using SpeechRecognition.

📝 Robust Speech-to-Text: Utilizes OpenAI's Whisper (local 'small' model) for highly accurate, offline transcription of your vocal responses.

📈 Instant AI Feedback: Evaluates your transcribed answers against the initial question, providing:

A score out of 10

Key Strengths

Areas for Improvement

An Ideal Answer example

🎨 Modern Chat Interface: Features a clean, visually appealing UI with custom chat bubbles and styling built on top of Streamlit.

🛠️ Technology Stack

Frontend/Framework: Streamlit

Generative AI: Google GenAI (gemini-2.5-flash)

Speech-to-Text (ASR): OpenAI Whisper & SpeechRecognition

Text-to-Speech (TTS): gTTS

PDF Processing: PyPDF2

Audio Processing: FFmpeg

🚀 Installation & Setup

Prerequisites

Python 3.8+ installed on your system.

FFmpeg installed (Required by OpenAI Whisper for audio processing).

Windows: Download from gyan.dev or install via winget: winget install ffmpeg

macOS: brew install ffmpeg

Linux: sudo apt update && sudo apt install ffmpeg

A Google Gemini API Key. You can get one from Google AI Studio.

Step-by-Step Guide

1. Clone the repository:

git clone [https://github.com/your-username/ai-interviewer-pro.git](https://github.com/your-username/ai-interviewer-pro.git)
cd ai-interviewer-pro


2. Create and activate a virtual environment (Recommended):

python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate


3. Install the dependencies:

pip install -r requirements.txt


4. Set up your API Key:

Note: Avoid hardcoding your API key directly into the script to prevent leaks. * You can configure the app to read from an environment variable or simply paste your key into the designated sidebar input within the Streamlit UI once the app is running.

5. Run the application:

streamlit run Gen_bot.py


🎯 How to Use

Launch the App: Open the provided localhost URL in your browser after running the Streamlit command.

Provide API Key: Enter your Gemini API key in the sidebar configuration section (if prompted).

Upload Resume: Upload your most up-to-date resume in PDF format.

Generate Questions: Click the "Generate Interview Questions" button. The AI will parse your resume and formulate 5 tailored questions.

Start the Interview: * Click "Play Question" to hear the question spoken aloud.

Click "Start Recording" and speak your answer clearly into your microphone.

Get Feedback: Click "Analyze My Answer" to receive a detailed breakdown of your response, your score, and actionable tips for improvement.

Proceed: Continue to the next question until the session is complete!

📂 Project Structure

├── Gen_bot.py             # Main Streamlit application script
├── requirements.txt       # Python dependencies
├── gen_bot.log            # Automated logging file for API/App events
├── front.png              # UI Screenshot
└── README.md              # Project documentation


🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📄 License

This project is MIT licensed.
