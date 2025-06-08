const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const data = JSON.parse(event.body);
        const { header, headerContent, vision, mission, qualityPolicy } = data;

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${header}</title>
            <link rel="stylesheet" href="/styles/style.css">
        </head>
        <body>
            <header>
                <h1>${header}</h1>
                <div>${headerContent}</div>
            </header>
            <div class="flex-container">
                <div>
                    <h2>Vision</h2>
                    <p>${vision}</p>
                </div>
                <div>
                    <h2>Mission</h2>
                    <p>${mission}</p>
                </div>
                <div>
                    <h2>Quality Policy</h2>
                    <p>${qualityPolicy}</p>
                </div>
            </div>
        </body>
        </html>
        `;

        const filePath = path.join(__dirname, "../../public/colleges", `${header.replace(/\s+/g, "_")}.html`);
        fs.writeFileSync(filePath, htmlContent);

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
    }
};
