import axios from 'axios';

const API_URL = 'https://dummyapi.online/api/blogposts';

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error; // Rethrow error to handle it where this function is called
  }
};