// require("dotenv").config();
// import {
// 	ExtractJwt as ExtractJWT,
// 	Strategy as JWTstrategy,
// } from "passport-jwt";
// import passport from "passport";
// import User from "../models/User";

// const opts = {
// 	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("JWT"),
// 	secretOrKey: process.env.jwtSecret,
// };

// const strategy = new JWTstrategy(opts, (payload, done) => {
// 	console.log("jwt payload: ", payload);
// 	try {
// 		User.findById(payload.id).then(user => {
// 			if (user) {
// 				// note the return removed with passport JWT - add this return for passport local
// 				console.log("user found in db in passport");
// 				return done(null, user);
// 			} else {
// 				console.log("user not found in db");
// 				return done(null, false);
// 			}
// 		});
// 	} catch (err) {
// 		console.log("try catch jwt error");
// 		done(err);
// 	}
// });

// passport.use(strategy);

// passport.serializeUser((user, done) => {
// 	console.log("serialized user: ", user.id);
// 	done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
// 	User.findById(id, function(err, user) {
// 		done(err, user);
// 	});
// });
