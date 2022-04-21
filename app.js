const { response } = require("express");
const express = require("express");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded());

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/777b997d08";

  const options = {
    method: "POST",
    auth: "sumaiya41:955440481af911e4e568fc7a7b473efc-us14",
  };

  const request = https.request(url, options, function (response) {
    console.log(response.statusCode);
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      const resposeData = JSON.parse(data);
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

//Api Key : 955440481af911e4e568fc7a7b473efc-us14

// id 777b997d08
