from flask import Blueprint, request, jsonify, send_file
from services.pdf_service import generate_pdf
from services.gpt_service import build_prompt
from utils.format_utils import format_data
from openai import OpenAI
import json

resume_bp = Blueprint("resume", __name__)

@resume_bp.route("/generate_pdf", methods=["GET", "POST", "OPTIONS"])
def generate_pdf_route():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
    
    data = request.get_json()
    print("Before\n", json.dumps(data, indent=4))

    print()

    data = format_data(data)
    print("After\n", json.dumps(data, indent=4))

    pdf_path = generate_pdf(data)
    return send_file(
        pdf_path,
        mimetype="application/pdf",
        download_name="resume.pdf"
    )

'''ex_data = {
    "overall_feedback": "Overall strong technical depth with clear research and software-development contributions. Improve impact by tightening each bullet to emphasize outcomes, standardize date formatting, and group skills for quick scanning.",
    "experiences": [
        {
            "index": 0,
            "original_title": "Student Research Assistant",
            "comment": "Strong involvement and technical scope; consider concise, outcome-focused bullets.",
            "suggested_bullets": [
                "Developed web-based automation tools and REST APIs to control multi-camera GoPro setups using Python, OpenGoPro API, and USB/BLE/Wi\u2011Fi protocols, increasing data collection efficiency.",
                "Trained deep neural networks for 3D keypoint detection on the Human3.6M dataset with TensorFlow on NVIDIA A100 GPUs in HPC clusters, improving accuracy and generalization.",
                "Fitted Metrabs 3D keypoints to Locomujoco biomechanical models using forward kinematics and optimization to estimate joint angles and body scaling for anatomically valid poses."
            ]
        },
        {
            "index": 1,
            "original_title": "Lead Software Engineer \u2013 Project Sloka",
            "comment": "Great scope; highlight impact and partnerships succinctly.",
            "suggested_bullets": [
                "Led development of an adaptive learning and social-emotional learning platform for elementary students.",
                "Built with Next.js, Supabase, Tailwind CSS, RESTful APIs, and Gemini GPT API to deliver scalable AI-driven insights and interactive experiences.",
                "Presented Project Sloka to Cal Poly Pomona\u2019s Project Hatchery to secure faculty mentorship, funding, and partnerships with local schools."
            ]
        },
        {
            "index": 2,
            "original_title": "Title",
            "comment": "Solid research work; condense for impact and clarity.",
            "suggested_bullets": [
                "Conducted research on multi-view geometry and markerless pose estimation using calibrated cameras; automated calibration, preprocessing, keypoint detection, and 3D reconstruction.",
                "Implemented an audio-based multi-camera synchronization system using Librosa, FFmpeg, and NumPy to align multi-view recordings for accurate reconstruction.",
                "Presented research at Cal Poly Pomona's Creative Activities and Research Symposium (CARS)."
            ]
        }
    ],
    "projects": [
        {
            "index": 0,
            "comment": "Strong project scope; bullets clearly show method and performance.",
            "original_title": "HTGR Project",
            "suggested_bullets": [
                "Directed a small team to develop a time-series classification pipeline for predicting sudden car movements using multi-axis accelerometer data.",
                "Implemented and optimized SVM models with a One-vs-Rest strategy in scikit-learn, achieving over 85% accuracy.",
                "Conducted data preprocessing, feature scaling, and k-fold cross-validation to improve model generalization."
            ]
        }
    ],
    "skills": {
        "comment": "Consider grouping to improve readability and emphasize core strengths.",
        "possible_groupings": [
            {
                "group_name": "Programming Languages & Frameworks",
                "items": [
                    "Python",
                    "Java",
                    "SQL",
                    "Django",
                    "Next.js",
                    "React.js",
                    "TailwindCSS",
                    "Pytorch",
                    "Tensorflow",
                    "Keras"
                ]
            },
            {
                "group_name": "Soft Skills",
                "items": [
                    "Problem Solving",
                    "Analytical Thinking",
                    "Collaboration",
                    "Time Management",
                    "Adaptibility"
                ]
            }
        ]
    }
}'''

@resume_bp.route("/generate_recommendation", methods=["GET", "POST", "OPTIONS"])
def generate_recommendation_route():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
    
    data = request.get_json()
    data = format_data(data)

    prompt = build_prompt(data)
    
    client = OpenAI()

    print(f"{prompt}\n")

    response = client.responses.create(
        model="gpt-5-nano",
        input=prompt
    )

    # Python dict
    result = json.loads(response.output_text)
    print(json.dumps(result, indent=4))   

    # Convert python dict to json
    return jsonify(result)
