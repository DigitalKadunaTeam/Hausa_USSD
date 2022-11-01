const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || "8080";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny"));

app.post("/", (req, res) => {
  // Read the variables sent via POST from our API

  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  console.log(sessionId, serviceCode, phoneNumber, text);
  let response = "";

  if (text == "") {
    // This is the first request. Note how we start the response with CON
    response = `CON Me aka zo dubawa?
    1. bayanin akaunt
    2. nambar waya ta
    3. sanya katin waya
    4. siyan data`;
  } else if (text == "1") {
    // Business logic for first level response
    response = `CON 
    1. nambar akaunt`;
  } else if (text == "2") {
    // Business logic for first level response
    // This is a terminal request. Note how we start the response with END
    response = `END namabar wayar ka/ki ita ce: ${phoneNumber}`;
  } else if (text == "1*1") {
    // This is a second level response where the user selected 1 in the first instance
    const accountNumber = "ACC100101";
    // This is a terminal request. Note how we start the response with END
    response = `END nambar akaunt: ${accountNumber}`;
  } else if (text == "3") {
    response = `CON Wa zaka/ki sai wa data?
    1. Kai na
    2. wani`;
  } else if (text == "4") {
    response = `CON Wa zaka/ki sai wa data?
    1. Kai na
    2. wani`;
  }

  // Send the response back to the API
  res.set("Content-Type: text/plain");
  res.send(response);
});

app.listen(port, () => {
  console.log("Running");
});
