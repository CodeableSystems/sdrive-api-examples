import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
async function account_balance(publicKey) {
  let apikey = process.env.apikey;
  if (!apikey) {
    console.log("Please add your credentials to the .env file");
    process.exit();
  }

  let base_url = process.env.base_url || "https://sdrive.app/api/v3";
  return await axios
    .post(base_url + "/solana/account/balance", {
      apikey,
      publicKey,
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
    let publicKey = process.argv[2];
    if (!publicKey) {
      console.log("please supply a public key");
      return;
    }
    const response = await account_balance(publicKey);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();
