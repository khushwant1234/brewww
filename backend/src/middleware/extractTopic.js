import fetch from "node-fetch";
import fs from 'fs';
import search from '../controllers/searchControllers.js';  // Add import

export const getYt = async (req, res) => {
    const pdfLink = req.body.pdfLink;
    const response = await fetch(pdfLink);
    const pdfBuffer = await response.arrayBuffer();
    fs.writeFileSync("/tmp/context.pdf", Buffer.from(pdfBuffer));

    try {
        const pdfBuffer = fs.readFileSync("/tmp/context.pdf");
        const base64Pdf = pdfBuffer.toString('base64');
        
        const prompt = 'Give me a json output that i can use json.parse to get the json which should have schema {topic: "experinment name"} name of the lab experinment from the pdf without any markdown';

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
                                inline_data: {
                                    mime_type: "application/pdf",
                                    data: base64Pdf,
                                },
                            },
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
        console.log(result.candidates[0].content.parts[0].text); 
        if (jsonString[0] !== '{' || jsonString[jsonString.length-1] !== '}') {
            jsonString = jsonString.substring(jsonString.indexOf('{'), jsonString.lastIndexOf('}') + 1);
        }

        const jsonResult = JSON.parse(jsonString);
        var toSearch = jsonResult.topic + " Youtube Video Lab Experinment";
        console.log(toSearch);
        

        // Search for each topic
        const searchResult = await search(toSearch, req.body.youtube, req.body.article);

        

        res.json({
            searchResult,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};