from flask import Blueprint, request, jsonify, send_file
from services.pdf_service import generate_pdf
from utils.format_utils import format_data
import json

resume_bp = Blueprint("resume", __name__)

@resume_bp.route("/generate", methods=["GET", "POST", "OPTIONS"])
def test():
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
