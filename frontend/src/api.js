import axios from "axios";

const API_URL = "http://localhost:8080/api/chat";

export async function sendMessageToAPI(userMessage) {
  try {
    const response = await axios.post(API_URL, { message: userMessage }, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data.response; // Extract bot's reply from API response
  } catch (error) {
    console.error("Error sending message:", error);
    return "Sorry, something went wrong.";
  }
}
