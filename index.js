const express = require("express");
const app = express();
const Instagram = require("./instagram-web-api/index");
const FileCookieStore = require("tough-cookie-filestore2");

require("dotenv").config();

const port = process.env.PORT || 4000;

const cookieStore = new FileCookieStore("./cookies.json");

const client = new Instagram(
  {
    username: process.env.INSTAGRAM_USERNAME,
    password: process.env.INSTAGRAM_PASSWORD,
    cookieStore,
  }
);

app.get("/login", (req, res) => {
  (async () => {
    try {
      console.log("Logging in...");
      await client.login();
      console.log("Login successful!");
      res.send("Login successful!");
    } catch (err) {
      console.log("Login failed!");
      res.send("Login failed!");
    }
  })();
});


app.get("/profile/:userName", (req, res) => {
  const user_name = req.params.userName;
  (async () => {
    const instagram_user = await client.getUser({ username: user_name })
    console.log(instagram_user)
    res.json(instagram_user.data.user);

  })();
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}...`);
});
