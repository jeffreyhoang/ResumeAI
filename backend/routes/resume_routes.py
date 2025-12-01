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
