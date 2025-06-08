document.getElementById("college-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        header: document.getElementById("header").value,
        headerContent: document.getElementById("headerContent").value,
        vision: document.getElementById("vision").value,
        mission: document.getElementById("mission").value,
        qualityPolicy: document.getElementById("qualityPolicy").value,
    };

    const response = await fetch("/.netlify/functions/createCollege", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
        alert("College page created successfully!");
        window.location.reload();
    } else {
        alert("Error creating college page: " + result.error);
    }
});
