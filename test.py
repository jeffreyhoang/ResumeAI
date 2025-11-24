from flask import Flask, render_template, make_response
from weasyprint import HTML, CSS
import os

app = Flask(__name__)

data = {
    "name": "Jeffrey Hoang",
    "location": "Sacramento, CA",
    "email": "hoangjeffrey04@gmail.com",
    "phone_number": "(916) 627-5487",
    "links": [
        "linkedin.com/in/jeffrey-hoang-095664260", 
        "github.com/jeffreyhoang",
        "jeffrey-hoang-portfolio.vercel.app"
    ],
    "introduction": "Motivated and detail-oriented professional with strong analytical, problem-solving, and communication skills. Experienced incollaborating across teams, learning new technologies quickly, and delivering high-quality work in fast-paced environments. Adept abalancing technical execution with creativity while contributing positively to team goals and organizational growth. Always eager to take on new challenges and expand skill sets.",
    "education": [
        {
            "name": "University of Southern California",
            "degree": "Master of Science",
            "major": "Computer Science",
            "gpa": 3.1,
            "start_date": "Aug 2025",
            "end_date": "May 2027",
            "coursework": ["Artificial Intelligence", "Machine Learning"],
            "awards": ["President's List", "Dean's List"]
        }
    ],
    "experiences": [
        {
            "title": "Student Research Assistant",
            "company": "Computational Intelligence Lab",
            "location": "Department of Computer Science at Cal Poly Pomona",
            "supervisor": {
                "name": "Dr. Hao Ji",
                "degree": "Ph.D.",
                "title": "Associate Professor"
            },
            "start_date": "Aug 2024",
            "end_date": "Current",
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
            "association": {
                "name": "Software Engineering Assocation",
                "location": "Cal Poly Pomona"
            },
            "start_date": "July 2024",
            "end_date": "Dec 2024",
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

@app.route("/")
def preview():
    # Just render the HTML for browser preview
    return render_template("resume.html", data=data)

@app.route("/pdf")
def pdf():
    # Render the same template to an HTML string
    html = render_template("resume.html", data=data)

    # Base path for resolving relative paths (like static/)
    base_path = os.path.dirname(os.path.abspath(__file__))

    # Generate PDF bytes
    pdf_bytes = HTML(string=html, base_url=base_path).write_pdf(
        stylesheets=[CSS(os.path.join(base_path, "static", "styles.css"))]
    )

    # Send as a real PDF response
    response = make_response(pdf_bytes)
    response.headers["Content-Type"] = "application/pdf"
    response.headers["Content-Disposition"] = "inline; filename=resume.pdf"
    return response

if __name__ == "__main__":
    app.run(debug=True)
