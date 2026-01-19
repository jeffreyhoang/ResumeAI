
from weasyprint import HTML, CSS
from flask import render_template
import os
from io import BytesIO

def generate_pdf(data):
    size = int(data["size"])
    css_filename = f"styles{size}.css"

    html = render_template("resume.html", data=data)

    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    css_path = os.path.join(base_path, "static", css_filename)

    # Generate PDF bytes (not PDF file)
    pdf_bytes = HTML(
        string=html,
        base_url=base_path
    ).write_pdf(
        stylesheets=[CSS(css_path)]
    )

    pdf_io = BytesIO(pdf_bytes)
    pdf_io.seek(0)

    return pdf_io