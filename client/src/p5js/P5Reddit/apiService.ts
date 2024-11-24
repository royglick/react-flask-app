// apiService.js
import axios from "axios";

const REDDIT_BASE_URL = "https://www.reddit.com/"; // Replace with your API base URL

const apiService = axios.create({
  baseURL: REDDIT_BASE_URL,
});

export const fetchRedditPopularSubreddits = async () => {
  try {
    const response = await apiService.get("/subreddits/popular.json");
    return response.data.data.children;
  } catch (error) {
    throw error;
  }
};
