"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Sentry = __importStar(require("@sentry/node"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use((0, cookie_parser_1.default)());
    await app.listen(process.env.PORT || "", () => console.log(`🕵️‍♂️ Listening on port ${process.env.PORT}...`));
    Sentry.init({
        dsn: "https://d7d1b5e63fd145218bf3971031bae0cd@o1009779.ingest.sentry.io/5974128",
        tracesSampleRate: 1.0,
    });
    const transaction = Sentry.startTransaction({
        op: "test",
        name: "My First Test Transaction",
    });
    setTimeout(() => {
        try {
            console.log("sentry.io works.");
        }
        catch (e) {
            Sentry.captureException(e);
        }
        finally {
            transaction.finish();
        }
    }, 99);
}
bootstrap();
//# sourceMappingURL=main.js.map