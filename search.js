import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
async function search(query, page) {
  let formData = new FormData();
  let apikey = process.env.apikey;
  let base_url = process.env.base_url || "https://sdrive.app/api/v3";
  if (!apikey) {
    console.log("Please add your credentials to the .env file");
    process.exit();
  }

  return await axios
    .post(base_url + "/search/files", {
      apikey,
      query,
      page,
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
    const response = await search("*mp4", 1);
    console.log(response);
    console.log(response.message.files);
  } catch (error) {
    console.error(error);
  }
})();
