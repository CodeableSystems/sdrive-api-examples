import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv";
import mime from "mime-types";
import path from "path";
dotenv.config();
async function uploadFile(fileStream, filename) {
  let formData = new FormData();
  let username = process.env.username;
  let apikey = process.env.apikey;
  let mimetype = mime.lookup(path.extname(filename));
  formData.append("fileupload", fileStream, {
    filename: filename,
    contentType: mimetype,
  });
  formData.append("username", username);
  formData.append("apikey", apikey);
  //optional, set this to "true" if you want the files to be uploaded to your personal account instead of an immutable storage account
  //formData.append("use_personal", "true");

  return await axios
    .post("https://sdrive.app/api/v3/upload", formData, {
      headers: formData.getHeaders(), // Set headers from formData
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
  const inputPath = process.argv[2];
  const filename = inputPath.split("/").pop();
  const fileStream = fs.createReadStream(inputPath);
  try {
    const response = await uploadFile(fileStream, inputPath);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();
