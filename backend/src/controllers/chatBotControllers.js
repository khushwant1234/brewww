import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';
import axios from 'axios';
import PDFMerger from 'pdf-merger-js';
dotenv.config();

export const chatBot = async (req, res) => {
    try{
    const links = req.body.links;
    const question = req.body.question;
    const merger = new PDFMerger();

    for (const link of links) {
        const response = await axios.get(link, { responseType: 'arraybuffer' });
        const filePath = `/tmp/${Date.now()}.pdf`;
        fs.writeFileSync(filePath, response.data);
        await merger.add(filePath);
        fs.unlinkSync(filePath);
    }

    const mergedPdfPath = '/tmp/merged.pdf';
    await merger.save(mergedPdfPath);
    const pdfBuffer = fs.readFileSync("/tmp/merged.pdf");
    const base64Pdf = pdfBuffer.toString('base64');
    console.log(links);
    const prompt = `Answer the following question from the given pdf context: ${question}`;
    
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
    var answer = result.candidates[0].content.parts[0].text;

    return res.status(200).json(
        {
            answer,
        }
    );
    
    } catch (error) {
        console.error('Error making API request:', error.message);
        throw error;
    }
}

