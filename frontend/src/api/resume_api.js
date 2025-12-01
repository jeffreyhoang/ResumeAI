const API_URL = "http://localhost:5000";
// const API_URL = "https://resumeai-68o5.onrender.com";

export async function generatePDF(data) {
    const response = await fetch(`${API_URL}/api/generate_pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return response;
}

export async function generateRecommendation(data) {
    const response = await fetch(`${API_URL}/api/generate_recommendation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return response;
}
