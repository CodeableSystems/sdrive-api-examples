import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
async function generateImage(prompt) {
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
      prompt,
      restoreFaces: false,
      seed: 1410159294,
      subseed: 1128386118,
      cfgScale: 7,

      steps: 50,
      negativePrompt: "hands,fingers",
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
    const response = await generateImage(
      "jazz cats playing poker, cartoon, paws"
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();
