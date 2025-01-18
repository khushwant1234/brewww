import fetch from "node-fetch";
import fs from 'fs';
import search from '../controllers/searchControllers.js';  // Add import

export const test = async (req, res) => {
    try {
        const pdfBuffer = fs.readFileSync("/Users/rohitjg/Desktop/Lecture02.pdf");
        const base64Pdf = pdfBuffer.toString('base64');
        
        const prompt = "Give me a json output that i can use json.parse to get the json which should have schema {title: [topic1, topic2, topic3, topic4, topic5] 5 main importatn topic from the pdf without any markdown";

        const apiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,
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
        var jsonString = result.candidates[0].content.parts[0].text;
        console.log(result.candidates[0].content.parts[0].text); 
        if (jsonString[0] !== '{' || jsonString[jsonString.length-1] !== '}') {
            jsonString = jsonString.substring(jsonString.indexOf('{'), jsonString.lastIndexOf('}') + 1);
        }
        
        const jsonResult = JSON.parse(jsonString);
        var toSearch = jsonResult.title;
        
        let youtubeLinks = [];
        let articleLinks = [];

        // Search for each topic
        for (let i = 0; i < toSearch.length; i++) {
            try {
                const searchResult = await search(toSearch[i], true, true);
                if (searchResult.youtube) youtubeLinks.push(searchResult.youtube);
                if (searchResult.article) articleLinks.push(searchResult.article);
            } catch (searchError) {
                console.error(`Error searching for ${toSearch[i]}:`, searchError);
            }
        }

        res.json({
            topics: jsonResult.title,
            youtubeLinks,
            articleLinks
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};


