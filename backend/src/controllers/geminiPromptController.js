import fetch from "node-fetch";
import fs from 'fs';

export const geminiCall = async (req, res) => {
    const prompt = req.body.prompt;
  
    try {
        const apiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            {
                                text: prompt,
                            },
                        ],
                    }],
                }),
            }
        );

        const result = await apiResponse.json();
        console.log(result);
        var jsonString = result.candidates[0].content.parts[0].text;

        res.json({
            jsonString
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};


