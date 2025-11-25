from weasyprint import HTML, CSS
from flask import render_template
import os
import uuid

example_data = {
    "personalInfo": {
        "name": "Jeffrey Hoang",
        "location": "",
        "email": "",
        "phone": ""
    },
    "introduction": {
        "isAdded": "",
        "text": "",
    },
    "links": [
        "linkedin.com/in/jeffrey-hoang-095664260", 
        "github.com/jeffreyhoang",
        "jeffrey-hoang-portfolio.vercel.app"
    ],
    "education": [
        {
            "name": "University of Southern California",
            "degree": "Master of Science",
            "major": "Computer Science",
            "gpa": 3.1,
            "from": "Aug 2025",
            "to": "May 2027",
            "coursework": ["Artificial Intelligence", "Machine Learning"],
            "awards": ["President's List", "Dean's List"]
        }
    ],
    "experiences": [
        {
            "title": "Student Research Assistant",
            "company": "Computational Intelligence Lab",
            "location": "Department of Computer Science at Cal Poly Pomona",
            "supervisorName": "",
            "supervisorTitle": "",
            "supervisorDegree": "",
            "isCurrent": True,
            "from": "2025-01",
            "to": "",
            "description": [
                "Developed web-based automation tools and REST APIs to control multi-camera GoPro setups using Python, OpenGoPro API, and USB/BLE/Wi-Fi protocols, increasing data collection efficiency.",
                "Trained deep neural networks for 3D keypoint detection on the Human3.6M dataset using TensorFlow on NVIDIA A100 GPUs across high-performance computing (HPC) clusters, incorporating batch normalization, ReLU activation, dropout, and linear layers to improve accuracy and generalization.",
                "Developed a physics-based pipeline fitting Metrabs 3D keypoint predictions to biomechanical Locomujoco models, applying forward kinematics and optimization to estimate joint angles and body scaling parameters for anatomically consistent and physically accurate 3D human pose alignments."
            ]
        },
        {
            "title": "Lead Software Engineer",
            "company": "Sloka",
            "location": "Pomona, CA",
            "supervisor": {
                "name": "Dr. Fatemah Jamshidi",
                "degree": "Ph.D.",
                "title": "Assistant Professor",
            },
            "start_date": "April 2024",
            "end_date": "June 2025",
            "description": [
                "Develop an adaptive learning and social-emotional learning platform for elementary school students.",
                "Built with Next.js, Supabase, Tailwind CSS, RESTful APIs, and the Gemini GPT API to deliver scalable AI-driven insights and interactive user experiences.",
                "Present Project Sloka to Cal Poly Pomona’s Project Hatchery to secure faculty mentorship, acquire research funding, and build partnerships with local schools in Pomona and Chino Hills."
            ]
        }
    ],
    "publications": [
        {
            "title": "3D Finite Element Analysis of No-Insulation Coils",
            "date": "April 2024",
            "authors": ["Jeffrey Hoang", "Akshat Bist", "John Wang"],
            "doi": "10.1109/TASC.2023.3340648",
        }
    ],
    "projects": [
        {
            "title": "Machine Learning - HTGR Project",
            "organization": "",
            "location": "",
            "isCurrent": "",
            "from": "July 2024",
            "to": "Dec 2024",
            "description": [
                "Directed a small team in developing a time-series classification pipeline for predicting sudden car movements using multi-axis accelerometer data.",
                "Implemented and optimized Support Vector Machine (SVM) models with a One-vs-Rest strategy in scikit-learn, achieving over 85% classification accuracy.",
                "Performed data preprocessing, feature scaling, and k-fold cross-validation to improve model generalization."
            ]
        }
    ],
    "skills": [
        {
            "title": "Technologies",
            "skills_list": ["Python", "Java", "Javascript", "CSS", "HTML"]
        },
        {
            "title": "Soft Skills",
            "skills_list": ["Communication", "Teamwork"]
        }
    ]
}

def generate_pdf(data):
    html = render_template("resume.html", data=data)

    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    pdf_dir = os.path.join(base_path, "generated_pdfs")

    os.makedirs(pdf_dir, exist_ok=True)

    filename = f"{uuid.uuid4()}.pdf"
    pdf_path = os.path.join(pdf_dir, filename)

    HTML(string=html, base_url=base_path).write_pdf(
        pdf_path,
        stylesheets=[CSS(os.path.join(base_path, "static/styles.css"))]
    )

    return pdf_path
