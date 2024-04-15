import axios from "axios";

export const getNews = async () => {
    try {
        const response = await axios.get("https://newsapi.in/newsapi/news.php?key=3rlbN4wMDHLonkpSI2ZgnKrCI0WDC0&category=hindi_state");
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
};
