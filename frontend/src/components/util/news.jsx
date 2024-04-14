import axios from "axios";

export const getNews = async () => {
    try {
        const response = await axios.get("https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=7447d46e964447f9b0ba9722c19e6d69");
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
};
