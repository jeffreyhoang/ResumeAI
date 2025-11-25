export async function sendResume(resume) {
    const response = await fetch("http://localhost:5000/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume)
    });

    return response.json();
}
