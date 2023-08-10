import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
async function generateImage(query, seed, size) {
  let formData = new FormData();
  let apikey = process.env.apikey;
  let base_url = process.env.base_url || "https://sdrive.app/api/v3";
  if (!apikey) {
    console.log("Please add your credentials to the .env file");
    process.exit();
  }

  return await axios
    .post(base_url + "/ai/image/generate", {
      apikey,
      query,
      seed,
	size
    })
    .catch((error) => {
      const errorInfo = {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
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
    const response = await generateImage("dog with cowboy hat");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();
