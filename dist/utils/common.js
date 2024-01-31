"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = void 0;
require("dotenv/config");
const debugLevel = Number(process.env.DEBUG_LEVEL) || 0;
function print(message, always = false) {
    if (debugLevel > 0 || always) {
        console.log(message);
    }
}
exports.print = print;
