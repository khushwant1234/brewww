import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export const youtubeLab = async (req, res) => {
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    const cx = process.env.GOOGLE_SEARCH_CX;
    const query = req.body.query;
    try {
        const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`);
        const result = await response.json();

        let ytLink = '';

        for (const item of result.items) {
                if (item.displayLink === "www.youtube.com" && !ytLink) {
                    ytLink = item.link;
                }
                if (ytLink) break;
            }
            res.json({
                youtubeLink: ytLink,
            });
         
        }

    catch (error) {
        console.error('Error making API request:', error.message);
        throw error;
    }
}

