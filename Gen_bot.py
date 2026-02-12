import streamlit as st
import os
import speech_recognition as sr
from gtts import gTTS
import whisper
from google import genai
import PyPDF2
from tempfile import NamedTemporaryFile
import time
import re
import traceback
import logging
from typing import Any

# Logging setup for debugging and persistent error capture
logging.basicConfig(
    filename="gen_bot.log",
    level=logging.DEBUG,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)
import ast

# --- PAGE CONFIG ---
st.set_page_config(
    page_title="AI Interviewer Pro",
    page_icon="🎙️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- CUSTOM STYLING (Modern & Interactive) ---
st.markdown("""
<style>
    /* Main Background */
    .stApp {
        background-color: #0e1117;
        color: #fafafa;
    }
    
    /* Chat Bubbles */
    .chat-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .bot-bubble {
        background-color: #262730;
        border-left: 5px solid #ff4b4b;
        padding: 15px;
        border-radius: 10px;
        color: #ffffff;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    
    .user-bubble {
        background-color: #004d40;
        border-right: 5px solid #00bfa5;
        padding: 15px;
        border-radius: 10px;
        text-align: right;
        color: #ffffff;
        margin-left: auto;
        max-width: 80%;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    
    /* Feedback Box */
    .feedback-box {
        background-color: #1e1e1e;
        border: 1px solid #333;
        padding: 20px;
        border-radius: 15px;
        margin-top: 10px;
    }
    
    /* Buttons */
    .stButton>button {
        border-radius: 20px;
        font-weight: bold;
        transition: all 0.3s ease;
    }
    .stButton>button:hover {
        transform: scale(1.02);
    }
</style>
""", unsafe_allow_html=True)

# --- INITIALIZE SESSION STATE ---
if 'questions' not in st.session_state:
    st.session_state.questions = []
if 'current_index' not in st.session_state:
    st.session_state.current_index = 0
if 'transcription' not in st.session_state:
    st.session_state.transcription = None
if 'feedback' not in st.session_state:
    st.session_state.feedback = None
if 'resume_text' not in st.session_state:
    st.session_state.resume_text = ""
if 'api_key' not in st.session_state:
    # Set the provided key as default
    st.session_state.api_key = "AIzaSyDdMi1LqBVukvnW8Bx4eEiRltn0QYjvCS0"

# --- LOAD MODELS (Cached) ---
@st.cache_resource
def load_whisper():
    try:
        # Using 'small' model for better accuracy than 'base'
        model = whisper.load_model("small")
        return model
    except Exception as e:
        st.error(f"Error loading Whisper model: {e}. Ensure ffmpeg is installed.")
        st.stop()


# Initialize variable so static analysis and guards can reference it safely
whisper_model = None
try:
    whisper_model = load_whisper()
    st.sidebar.success("✅ Whisper model loaded")
except Exception as e:
    st.error(f"Critical Error: {e}")
    st.stop()

# --- HELPER FUNCTIONS ---

def extract_text_from_pdf(uploaded_file):
    try:
        pdf_reader = PyPDF2.PdfReader(uploaded_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        st.error(f"Error reading PDF: {e}")
        return ""

def generate_questions_from_resume(resume_text, api_key):
    """Generate 5 personalized interview questions based on resume"""
    try:
        # Validate inputs
        if not resume_text or resume_text.strip() == "":
            st.error("❌ Resume text is empty. Please upload a valid PDF resume.")
            return []

        if not api_key or api_key == "":
            st.error("❌ API Key is missing. Please enter your Google Gemini API Key in Settings.")
            return []

        st.info("🔄 Initializing API client...")
        client = genai.Client(api_key=api_key)
        st.success("✅ API client ready")

        # Initialize response variables to avoid unbound references in exception handlers
        raw_response = ""
        cleaned_text = ""

        def _extract_text_from_response(resp: Any) -> str:
            """Try multiple shapes returned by API to extract textual content."""
            try:
                if resp is None:
                    return ""
                # dict-like
                if isinstance(resp, dict):
                    for key in ("text", "output", "result"):
                        if key in resp and resp[key]:
                            return str(resp[key])
                    if resp.get("outputs"):
                        out = resp["outputs"][0]
                        if isinstance(out, dict):
                            for k in ("content", "text"):
                                if k in out and out[k]:
                                    return str(out[k])
                            return str(out)
                        else:
                            return str(out)
                    if resp.get("candidates"):
                        cand = resp["candidates"][0]
                        if isinstance(cand, dict):
                            for k in ("content", "text"):
                                if k in cand and cand[k]:
                                    return str(cand[k])
                            return str(cand)
                        else:
                            return str(cand)
                    return str(resp)

                # object-like
                for attr in ("text", "output", "result", "content", "outputs", "candidates"):
                    if hasattr(resp, attr):
                        val = getattr(resp, attr)
                        if val:
                            if isinstance(val, list):
                                first = val[0]
                                if isinstance(first, dict):
                                    for k in ("content", "text"):
                                        if k in first and first[k]:
                                            return str(first[k])
                                    return str(first)
                                else:
                                    return str(first)
                            else:
                                return str(val)

                return str(resp)
            except Exception:
                logger.exception("Error extracting text from API response")
                return str(resp)

        with st.spinner("🤖 Analyzing your resume and generating personalized questions..."):
            # Create detailed prompt for 5 questions
            prompt = f"""You are an expert technical interviewer with 15+ years of experience.

TASK: Generate exactly 5 UNIQUE, HIGHLY PERSONALIZED interview questions based on the resume provided below.

REQUIREMENTS:
- Each question MUST be different and unique (absolutely NO duplicates)
- Questions MUST reference SPECIFIC projects, technologies, companies, or skills from the resume
- Include 2 technical depth questions about specific technologies/frameworks mentioned
- Include 2 behavioral questions based on actual projects mentioned
- Include 1 problem-solving question
- Make questions progressively more challenging
- Ask about challenges faced, lessons learned, and technical decisions made

RESUME CONTENT:
{resume_text}

OUTPUT FORMAT (CRITICAL):
Return ONLY a valid Python list with exactly 5 strings. Nothing else.
Example format: ["Question 1?", "Question 2?", "Question 3?", "Question 4?", "Question 5?"]

DO NOT include:
- ```python or ``` markers
- Any markdown formatting
- Any text before or after the list
- Any explanation or commentary

START OUTPUTTING THE LIST NOW:
"""

            try:
                st.info("📡 Sending request to Gemini API...")
                try:
                    response = client.models.generate_content(
                        model="gemini-2.5-flash",
                        contents=prompt
                    )
                except Exception as api_err:
                    logger.exception("API request failed")
                    st.error(f"❌ API request failed: {api_err}")
                    st.exception(api_err)
                    return []

                # Extract a textual payload from the response flexibly
                response_text = _extract_text_from_response(response)

                if not response_text or str(response_text).strip() == "":
                    st.error("❌ API returned no text content")
                    logger.debug("Empty response_text extracted; full response: %s", repr(response))
                    if st.session_state.get('show_api_debug'):
                        st.write("Raw response object:")
                        st.write(repr(response))
                    return []

                st.success("✅ Received response from API")

                # Clean the response
                raw_response = str(response_text).strip()
                logger.debug("Raw API response: %s", raw_response[:1000])
                if st.session_state.get('show_api_debug'):
                    st.info(f"📋 Raw API Response (first 200 chars): {raw_response[:200]}")

                # Remove markdown code blocks if present
                cleaned_text = raw_response.replace("```python", "").replace("```", "").strip()

                # Try to extract list from response using safe literal_eval
                st.info("🔍 Parsing response...")
                try:
                    questions = ast.literal_eval(cleaned_text)
                except Exception:
                    # Try to find the list in the response and parse it
                    st.warning("⚠️ Direct parse failed, attempting to extract list via regex...")
                    match = re.search(r'\[.*\]', cleaned_text, re.DOTALL)
                    if match:
                        try:
                            questions = ast.literal_eval(match.group())
                        except Exception as inner_err:
                            logger.exception("Failed to parse list from API response")
                            st.error(f"❌ Failed to parse list from API response: {inner_err}")
                            if st.session_state.get('show_api_debug'):
                                st.write("Response fragment:")
                                st.write(match.group()[:1000])
                            return []
                    else:
                        logger.error("Could not find Python list in API response")
                        st.error("❌ Could not find a valid Python list in the API response")
                        if st.session_state.get('show_api_debug'):
                            st.write("Raw response snippet:")
                            st.write(raw_response[:1000])
                        return []

                # Validate questions and normalize to strings
                if not isinstance(questions, list):
                    st.error(f"❌ API returned non-list object: {type(questions)}")
                    logger.error("API returned non-list: %s", repr(questions))
                    return []

                if len(questions) == 0:
                    st.error("❌ API returned an empty list")
                    logger.warning("Empty questions list from API. cleaned_text=%s", cleaned_text[:500])
                    return []

                # Normalize entries to clean strings
                normalized = []
                for q in questions:
                    try:
                        s = str(q).strip()
                        if s:
                            normalized.append(s)
                    except Exception:
                        logger.exception("Failed to stringify question entry: %s", repr(q))

                # Check uniqueness and count
                unique_questions = []
                for q in normalized:
                    if q not in unique_questions:
                        unique_questions.append(q)

                if len(unique_questions) < 5:
                    st.warning(f"⚠️ Only {len(unique_questions)} unique questions generated, expected 5")
                    logger.info("Less than 5 unique questions: %s", unique_questions)

                if len(unique_questions) == 0:
                    st.error("❌ No valid questions could be parsed from the API response.")
                    if st.session_state.get('show_api_debug'):
                        st.write("Cleaned text:")
                        st.write(cleaned_text[:2000])
                    return []

                st.success(f"✅ Successfully parsed {len(unique_questions)} question(s) from API response")
                st.info("📚 Questions will be asked in order of difficulty")
                return unique_questions[:5]

            except SyntaxError as syntax_error:
                st.error(f"❌ Syntax Error parsing response: {syntax_error}")
                st.error(f"📋 Response was: {cleaned_text[:500]}")
                return []

            except ValueError as value_error:
                st.error(f"❌ Value Error: {value_error}")
                st.error(f"📋 Response was: {raw_response[:500]}")
                return []

            except Exception as api_error:
                error_msg = str(api_error)
                st.error(f"❌ API Error: {error_msg}")

                # Provide specific guidance based on error type
                if "API key" in error_msg or "authentication" in error_msg.lower():
                    st.error("🔑 Your API key may be invalid. Please get a new one from Google AI Studio.")
                elif "quota" in error_msg.lower():
                    st.error("💰 API quota exceeded. Please try again later or check your API usage.")
                elif "rate" in error_msg.lower():
                    st.error("⏱️ Rate limited. Please wait a moment and try again.")
                elif "permission" in error_msg.lower():
                    st.error("🔒 Permission denied. Check your API key permissions.")

                st.error(f"📋 Full Error: {repr(api_error)}")
                return []

    except Exception as e:
        st.error(f"❌ Critical Error in generate_questions_from_resume: {str(e)}")
        st.error(f"📋 Full Debug Info: {repr(e)}")
        st.error(f"Traceback: {traceback.format_exc()}")
        return []

def text_to_speech(text):
    try:
        tts = gTTS(text=text, lang='en')
        with NamedTemporaryFile(delete=False, suffix=".mp3") as fp:
            tts.save(fp.name)
            return fp.name
    except Exception as e:
        st.error(f"TTS Error: {e}")
        return None

def record_audio_local(duration=15):
    """Records audio using local microphone via SpeechRecognition with debugging"""
    try:
        r = sr.Recognizer()
        with sr.Microphone() as source:
            placeholder = st.empty()
            placeholder.info("🎧 Calibrating background noise...")

            # Adjust for ambient noise before recording
            try:
                r.adjust_for_ambient_noise(source, duration=1.0)
            except Exception as e:
                st.warning(f"Noise calibration notice: {e}")

            # Show recording status
            placeholder.warning(f"🔴 RECORDING NOW... ({duration}s)")
            progress_bar = st.progress(0)

            # Record audio for the specified duration
            try:
                audio_data = r.record(source, duration=duration)

                # Update progress
                progress_bar.progress(1.0)
                placeholder.success("✅ Recording complete! Processing audio...")

                # Save to temporary file
                with NamedTemporaryFile(delete=False, suffix=".wav") as fp:
                    fp.write(audio_data.get_wav_data())
                    temp_file = fp.name

                st.success(f"✅ Audio file saved: {temp_file}")
                return temp_file

            except sr.RequestError as e:
                st.error(f"❌ Microphone error: {e}")
                return None
            except Exception as e:
                st.error(f"❌ Recording failed: {e}")
                return None
            finally:
                placeholder.empty()

    except Exception as e:
        st.error(f"❌ Critical recording error: {e}")
        return None

def get_ai_feedback(question, answer, api_key):
    try:
        if not api_key or api_key == "":
            st.error("❌ API Key is missing. Please enter your Google Gemini API Key in Settings.")
            return None

        client = genai.Client(api_key=api_key)

        prompt = f"""
        You are a supportive but critical interview coach.

        Question: "{question}"
        Candidate Answer: "{answer}"

        Provide detailed feedback in the following Markdown format:
        **Score:** [1-10]/10

        **✅ What was good:**
        * [Be specific about strengths shown in the answer]
        * [Another strength point]

        **🚀 Areas for Improvement:**
        * [Specific area to improve with examples]
        * [Another area to work on]

        **💡 Improved Version:**
        "[A refined, more confident version of the answer that incorporates the feedback]"
        """

        try:
            model_to_use = st.session_state.get('model_name', 'gemini-2.5-flash')
            response = client.models.generate_content(
                model=model_to_use,
                contents=prompt
            )

            if response and response.text:
                return response.text
            else:
                st.error("❌ Empty response from API")
                return None

        except Exception as api_error:
            error_msg = str(api_error)
            st.error(f"❌ API Error: {error_msg}")

            # Provide specific guidance based on error type
            if "API key" in error_msg or "authentication" in error_msg.lower():
                st.error("🔑 Your API key may be invalid. Please check it in Settings.")
            elif "quota" in error_msg.lower():
                st.error("💰 API quota exceeded. Please try again later.")
            elif "rate" in error_msg.lower():
                st.error("⏱️ Rate limited. Please wait a moment and try again.")

            return None

    except Exception as e:
        st.error(f"❌ Critical Error in Feedback: {str(e)}")
        st.error(f"📋 Debug Info: {repr(e)}")
        return None

# --- SIDEBAR ---
with st.sidebar:
    # Corrected the image URL by removing markdown syntax
    st.image("https://cdn-icons-png.flaticon.com/512/4712/4712035.png", width=80)
    st.title("Settings")
    
    # API Key Management
    api_key_input = st.text_input(
        "Gemini API Key", 
        value=st.session_state.api_key, 
        type="password"
    )
    if api_key_input:
        st.session_state.api_key = api_key_input

    # Model selection for Gemini (helps when default model is not available)
    model_input = st.text_input(
        "Gemini Model Name",
        value=st.session_state.get('model_name', 'gemini-1.5-flash')
    )
    if model_input:
        st.session_state.model_name = model_input

    # Optionally show API debug info in the main UI
    show_api_debug = st.checkbox("Show API Debug Info", value=False)
    st.session_state.show_api_debug = show_api_debug

    st.markdown("---")
    st.subheader("1. Upload Resume")
    uploaded_file = st.file_uploader("Upload PDF", type=['pdf'])
    
    if uploaded_file and not st.session_state.resume_text:
        st.session_state.resume_text = extract_text_from_pdf(uploaded_file)
        st.success("Resume Parsed Successfully!")

    st.markdown("---")
    if st.button("🔄 Reset Interview", type="primary"):
        for key in ['questions', 'current_index', 'transcription', 'feedback']:
            if key in st.session_state:
                del st.session_state[key]
        st.rerun()

# --- MAIN LAYOUT ---
st.title("🎙️ AI Interview Coach")
st.markdown("#### Practice behavioral questions tailored to your resume.")

# STATE 1: INITIALIZATION
if not st.session_state.questions:
    st.info("👋 Welcome! Please upload your resume in the sidebar to begin.")
    
    col1, col2 = st.columns([2, 1])
    with col1:
        st.markdown("""
        **How it works:**
        1. **Upload Resume:** We analyze your skills and projects.
        2. **Get Questions:** AI generates custom questions for you.
        3. **Speak:** Record your answer using your microphone.
        4. **Feedback:** Get instant scoring and tips.
        """)
    
    if st.session_state.resume_text:
        if st.button("🚀 Generate Interview Questions"):
            questions = generate_questions_from_resume(st.session_state.resume_text, st.session_state.api_key)
            st.session_state.questions = questions
            st.rerun()

# STATE 2: ACTIVE INTERVIEW
else:
    # Progress Indicator
    total = len(st.session_state.questions)
    current = st.session_state.current_index + 1
    progress = st.session_state.current_index / total
    st.progress(progress)
    
    if st.session_state.current_index < total:
        current_q = st.session_state.questions[st.session_state.current_index]
        
        # 1. QUESTION SECTION
        st.markdown(f"""
        <div class="bot-bubble">
            <h3>🤖 Question {current}/{total}</h3>
            <p style="font-size: 1.2em;">{current_q}</p>
        </div>
        """, unsafe_allow_html=True)
        
        # Audio Player for Question
        audio_path = text_to_speech(current_q)
        if audio_path:
            st.audio(audio_path, format="audio/mp3")

        st.divider()

        # 2. ANSWER SECTION
        col1, col2 = st.columns(2)
        
        with col1:
            st.subheader("🎙️ Record Answer")

            # --- LANGUAGE SELECTION ---
            language_option = st.radio("Select Language", ["English", "Hindi"], horizontal=True, key="lang_select")
            lang_code = "en" if language_option == "English" else "hi"

            duration = st.slider("Recording Duration (seconds)", 10, 60, 30)

            # Add debug mode toggle
            debug_mode = st.checkbox("🔍 Enable Debug Mode", value=False, key="debug_mode")

            if st.button("Start Recording", key="rec_btn", help="Click to start microphone"):
                audio_file = record_audio_local(duration=duration)
                if audio_file:
                    with st.spinner(f"Transcribing speech in {language_option}..."):
                        try:
                            if debug_mode:
                                st.info(f"📋 Debug - Audio file: {audio_file}")
                                st.info(f"📋 Debug - Language: {lang_code}")

                            # Transcribe with better error handling
                            if 'whisper_model' not in globals() or whisper_model is None:
                                st.error("❌ Whisper model is not loaded. Cannot transcribe audio.")
                                result = {"text": ""}
                            else:
                                result = whisper_model.transcribe(
                                    audio_file,
                                    language=lang_code,
                                    fp16=False,  # Ensure compatibility
                                    verbose=debug_mode
                                )

                            transcription = result.get("text", "").strip()

                            if not transcription:
                                st.warning("⚠️ No speech detected. Please speak clearly and try again.")
                            else:
                                st.session_state.transcription = transcription
                                st.session_state.feedback = None

                                if debug_mode:
                                    st.success(f"✅ Transcribed ({len(transcription)} chars):")
                                    with st.expander("Full Transcription Details"):
                                        st.json(result)
                        except Exception as e:
                            st.error(f"❌ Transcription failed: {str(e)}")
                            if debug_mode:
                                st.error(f"📋 Debug - Full error: {repr(e)}")
                else:
                    st.error("❌ No audio file was recorded. Please check your microphone.")

        with col2:
            st.subheader("📝 Transcript")
            if st.session_state.transcription:
                st.markdown(f"""
                <div class="user-bubble">
                    {st.session_state.transcription}
                </div>
                """, unsafe_allow_html=True)
            else:
                st.info("Your answer will appear here...")

        # 3. FEEDBACK SECTION
        if st.session_state.transcription:
            if st.button("🧠 Analyze My Answer", type="primary"):
                with st.spinner("Generating expert feedback..."):
                    feedback = get_ai_feedback(
                        current_q,
                        st.session_state.transcription,
                        st.session_state.api_key
                    )
                    if feedback is not None:
                        st.session_state.feedback = feedback
                        st.success("✅ Feedback generated!")
                    else:
                        st.session_state.feedback = None
                        st.error("❌ Failed to generate feedback. Please check your API key and try again.")

            # Display feedback if available
            if st.session_state.feedback and st.session_state.feedback is not None:
                st.markdown('<div class="feedback-box">', unsafe_allow_html=True)
                st.markdown(st.session_state.feedback)
                st.markdown('</div>', unsafe_allow_html=True)

                col_next, col_retry = st.columns(2)
                with col_next:
                    if st.button("Next Question ➡️"):
                        st.session_state.current_index += 1
                        st.session_state.transcription = None
                        st.session_state.feedback = None
                        st.rerun()

                with col_retry:
                    if st.button("Re-record Answer"):
                        st.session_state.transcription = None
                        st.session_state.feedback = None
                        st.rerun()

            elif not st.session_state.feedback and st.session_state.transcription:
                st.info("💡 Click 'Analyze My Answer' to get feedback on your response")

    else:
        # END SCREEN
        st.balloons()
        st.success("🎉 Interview Session Complete!")
        st.markdown(f"""
        <div style="text-align: center; padding: 20px;">
            <h2>Great job!</h2>
            <p>You've completed {total} custom practice questions.</p>
        </div>
        """, unsafe_allow_html=True)
        
        if st.button("Start New Session"):
            st.session_state.questions = []
            st.session_state.current_index = 0
            st.rerun()