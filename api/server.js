import express from "express";import path from "path";
import passport from "passport";
import { database } from "./config/db";

require("./config/passport");

const app = express();

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

//Router imports
import course from "./routes/course";
import modules from "./routes/modules";
import users from "./routes/users";
import search from "./routes/search";
import pos from './routes/planOfStudy'

//Database configuration
database();

//Routes
app.use("/api/modules", modules);
app.use("/api/course", course);
app.use("/api/users", users);
app.use("/api/search", search);
app.use("/api/plan", pos);


const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
