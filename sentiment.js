import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
async function sentiment(text) {
  let username = process.env.username;
  let apikey = process.env.apikey;
  let base_url = process.env.base_url || "https://sdrive.app/api/v3";
  return await axios
    .post(base_url + "/ai/text/sentiment", {
      username,
      apikey,
      text,
    })
    .catch((error) => {
      const errorInfo = {
        data: error.message,
      };
      throw Error(JSON.stringify(errorInfo));
    })
    .then((response) => {
      return response.data;
    });
}

// Example usage
(async () => {
  try {
    let text = `The Viking Age, spanning from the late 8th century to the early 11th century, marked an era of bold seafaring expeditions and widespread Scandinavian expansion. Norwegian Vikings, known for their fierce warrior skills and impressive navigational prowess, set sail from their homeland to raid, trade, and explore distant lands across Europe, the British Isles, and even as far as North America. Their iconic longships allowed them to venture deep into inland rivers and coastal regions, leaving a lasting impact on the regions they encountered. Despite their reputation for raiding, Vikings also played a significant role in trade, cultural exchange, and the establishment of settlements, particularly in areas such as Iceland and Greenland. The legacy of the Norwegian Vikings continues to captivate the world, shaping the perception of these seafaring adventurers as daring explorers and influential agents of change in medieval history.`;
    const response = await sentiment(text);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();
