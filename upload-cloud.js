import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv";
import mime from "mime-types";
import path from "path";
dotenv.config();
async function uploadFile(fileStream, filename) {
  let formData = new FormData();
  let apikey = process.env.apikey;
  let base_url = process.env.base_url || "https://sdrive.app/api/v3";
  if (!apikey) {
    console.log("Please add your credentials to the .env file");
    process.exit();
  }

  let mimetype = mime.lookup(path.extname(filename));
  formData.append("fileupload", fileStream, {
    filename: filename,
    contentType: mimetype,
  });
  formData.append("apikey", apikey);

  return await axios
    .post(base_url + "/cloud/upload", formData, {
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
 if(!process.argv[2]){
  console.log("supply filename to upload");
	return;
 }
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
