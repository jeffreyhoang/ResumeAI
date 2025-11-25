from flask import Blueprint, request, jsonify, send_file
from services.pdf_service import generate_pdf
import json

resume_bp = Blueprint("resume", __name__)

@resume_bp.route("/generate", methods=["POST", "OPTIONS"])
def generate():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
    
    data = request.get_json()
    print("Received resume data: ", data)

    pdf_path = generate_pdf(data)

    return send_file(pdf_path, as_attachments=True, download_name="resume.pdf")

@resume_bp.route("/test", methods=["POST", "OPTIONS"])
def test():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
    
    data = request.get_json()
    print("Received resume data (pretty): ")
    print(json.dumps(data, indent=4))

    return data