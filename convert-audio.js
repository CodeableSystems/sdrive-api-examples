import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv";
import mime from "mime-types";
import path from "path";
dotenv.config();
async function convertAudio(media_url, callback_url, callback_method) {
  if (!callback_url) {
    console.log("Please provide callback url");
    return;
  }
  if (!callback_method) {
    console.log("Please provide callback method");
    return;
  }
  if (!media_url) {
    console.log("Please provide url to convert");
    return;
  }

  let apikey = process.env.apikey;
  let base_url = process.env.base_url || "https://v3.sdrive.app";

  return await axios
    .post(base_url + "/audio/convert", {
      apikey,
      callback_url,
      callback_method,
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
  const callback_url = "https://jobs.sdrive.app/callback"; // switch out with your own callback URL
  const callback_method = "POST"; // GET or POST
  try {
    const response = await convertAudio(
      media_url,
      callback_url,
      callback_method
    );
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
  permalink: 'https://shdw-drive.genesysgo.net/GYSM8Nk9kw7rYz5NbRht8Mh9K3KKRKJ86sThxVzyF4n1/nvigah9p99x0zkn2ul1k83qq.webm'
  }
  */
})();
