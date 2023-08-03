import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
async function uploadFile(fileStream, filename) {
  let formData = new FormData();
  let username = process.env.username;
  let apikey = process.env.apikey;

  formData.append("fileupload", fileStream, {
    filename: filename,
    contentType: "image/png",
  });
  formData.append("username", username);
  formData.append("apikey", apikey);
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
  const inputPath = "hello.png";
  const filename = inputPath.split("/").pop();
  const fileStream = fs.createReadStream(inputPath);
  try {
    const response = await uploadFile(fileStream, inputPath);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();
