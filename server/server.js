import express from "express";
import path from "path";
import passport from "passport";
import Cors from "cors";
import { database } from "./config/db";

require("./config/passport");

const app = express();

//Middleware
app.use(Cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

//Router imports
import course from "./routes/api/course";
import modules from "./routes/api/modules";
import users from "./routes/api/users";

//Database configuration
database();

//Routes
app.use("/api/modules", modules);
app.use("/api/course", course);
app.use("/api/users", users);

//Serve static assets if in prod
if (process.env.NODE_ENV === "production") {
  //set static dir
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
