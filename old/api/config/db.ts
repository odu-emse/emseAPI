import { connect } from "mongoose";
require("dotenv").config();

export const database = async () => {
	const uri = process.env.MongoURI || "";
	const options = {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	};
	try {
		const connection = await connect(uri, options);
		console.log(`🚀 Connected to Mongo DB`);
	} catch (error) {
		console.error(error);
	}
};
