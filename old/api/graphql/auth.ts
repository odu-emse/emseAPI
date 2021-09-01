import { sign } from "jsonwebtoken";
import { User } from "./../models/User";
import "dotenv/config";

export const createAccessToken = (user: User) => {
	return sign({ userId: user.id }, process.env.jwtSecret!, {
		expiresIn: "15m",
	});
};
export const createRefreshToken = (user: User) => {
	return sign({ userId: user.id }, process.env.jwtSecret!, {
		expiresIn: "7d",
	});
};
