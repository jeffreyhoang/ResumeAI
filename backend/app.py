from flask import Flask
from flask_cors import CORS

from routes.resume_routes import resume_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(resume_bp, url_prefix="/api")

    return app

app = create_app()

if __name__ == "__main__":
    app.run(port=5000, debug=True)