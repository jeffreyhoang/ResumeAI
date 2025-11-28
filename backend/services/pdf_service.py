from weasyprint import HTML, CSS
from flask import render_template
import os
import uuid

def generate_pdf(data):
    size = int(data["size"])
    css_filename = f"styles{size}.css"

    html = render_template("resume.html", data=data)

    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    pdf_dir = os.path.join(base_path, "generated_pdfs")
    os.makedirs(pdf_dir, exist_ok=True)

    filename = f"{uuid.uuid4()}.pdf"
    pdf_path = os.path.join(pdf_dir, filename)

    HTML(string=html, base_url=base_path).write_pdf(
        pdf_path,
        stylesheets=[CSS(os.path.join(base_path, "static", css_filename))]
    )

    return pdf_path
