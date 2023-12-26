const axios = require("axios");
const cheerio = require("cheerio");
const { exec } = require("child_process");

async function showUfcPicture(ufcNumber) {
  try {
    const eventUrl = `https://www.ufc.com/event/ufc-${ufcNumber}`;
    const response = await axios.get(eventUrl);

    if (response.status === 200) {
      const $ = cheerio.load(response.data);

      const pictureUrl = $("picture source").attr("srcset").split(" ")[0];

      if (pictureUrl) {
        exec(`open -a IINA ${pictureUrl}`);
        console.log(`Opening picture for UFC ${ufcNumber} in IINA`);
      } else {
        console.error(`Error: Picture not found for UFC ${ufcNumber}`);
      }
    } else {
      console.error(
        `Error: Unable to fetch details. Status Code: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

const ufcNumber = process.argv[2];

if (ufcNumber) {
  showUfcPicture(ufcNumber);
} else {
  console.error("Error: Please provide a UFC number as an argument.");
}
