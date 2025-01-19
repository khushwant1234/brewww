import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export default async function search(word, youtube, article) {
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    const cx = process.env.GOOGLE_SEARCH_CX;

    try {
        const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${word}`);
        const result = await response.json();

        let ytLink = '';
        let ytTitle = '';
        let articleLink = '';
        let articleTitle = '';

        for (const item of result.items) {
            if(youtube == true && article == true){
                if (item.displayLink === "www.youtube.com" && !ytLink) {
                    ytLink = item.link;
                    ytTitle = item.title;
                } else if (item.displayLink !== "www.youtube.com" && !articleLink) {
                    articleLink = item.link;
                    articleTitle = item.title;
                }
                
                if (ytLink && articleLink) break; 
            }
            else if(article == true && youtube == false){
                if (item.displayLink !== "www.youtube.com" && !articleLink) {
                    articleLink = item.link;
                    articleTitle = item.title;
                }
                if (articleLink) break;
            }
            else if(youtube == true && article == false){
                if (item.displayLink === "www.youtube.com" && !ytLink) {
                    ytLink = item.link;
                    ytTitle = item.title;
                }
                if (ytLink) break;
            }
        }

        return {
            youtube: ytLink,
            youtubeTitle: ytTitle,
            article: articleLink,
            articleTitle: articleTitle
        };
    } catch (error) {
        console.error('Error making API request:', error.message);
        throw error;
    }
}

