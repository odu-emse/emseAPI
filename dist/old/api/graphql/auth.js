"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv/config");
var createAccessToken = function (user) {
    return jsonwebtoken_1.sign({ userId: user.id }, process.env.jwtSecret, {
        expiresIn: "15m",
    });
};
exports.createAccessToken = createAccessToken;
var createRefreshToken = function (user) {
    return jsonwebtoken_1.sign({ userId: user.id }, process.env.jwtSecret, {
        expiresIn: "7d",
    });
};
exports.createRefreshToken = createRefreshToken;
