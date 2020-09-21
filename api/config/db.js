import mongoose from 'mongoose'
require("dotenv").config();

export const database = () => {
    let url = process.env.MongoURI;
    const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
    };
    mongoose
    .connect(url, options)
    .then(() => {
        console.log("Connected to db... ");
    })
    .catch(err => {
        console.error(err);
    });
}

