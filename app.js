require("dotenv").config();
const cookie = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();
const connectDB = require("./db/connect");
const mainRouter = require("./router/app-router");

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cookie());
app.use(
  session({
    secret: "meta pirate",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 120000000,
    },
    store,
  })
);
app.use(express.json());
app.use(express.static("public"));

app.use(mainRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
