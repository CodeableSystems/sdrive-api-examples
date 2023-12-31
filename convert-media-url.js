import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";
import mime from "mime-types";
import path from "path";
dotenv.config();
async function convertMediaURL(media_url) {
  if (!media_url) {
    console.log("Please provide url to convert");
    return;
  }

  let apikey = process.env.apikey;
  let base_url = process.env.base_url || "https://v3.sdrive.app";

  return await axios
    .post(base_url + "/media/convert", {
      apikey,
      media_url,
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
  const media_url = process.argv[2];
  try {
    const response = await convertMediaURL(media_url);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  //Sample result:
  /*
  {
  status: 'success',
  message: 'Job added successfully',
  creditsUsed: 5,
  remainingCredits: 5304,
  id: 'nvigah9p99x0zkn2ul1k83qq',
  videolink: '',
  audiolink: ''
  }:
  */
})();
