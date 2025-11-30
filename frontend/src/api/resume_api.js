export async function generatePDF(data) {
    const response = await fetch("http://localhost:5000/api/generate_pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return response;
}

export async function generateRecommendation(data) {
    const response = await fetch("http://localhost:5000/api/generate_recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return response;
}
