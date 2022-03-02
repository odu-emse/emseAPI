"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(cookie_parser_1.default());
    await app.listen(process.env.PORT || "", () => console.log(`🕵️‍♂️ Listening on port ${process.env.PORT}...`));
}
bootstrap();
//# sourceMappingURL=main.js.map