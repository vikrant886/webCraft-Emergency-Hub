import axios from "axios";

export const getNews = async () => {
    try {
        const response = await axios.get("https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=8d6eb5d2e1144701b4aab610f58b5651");
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
};
