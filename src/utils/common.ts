import 'dotenv/config'
const debugLevel = Number(process.env.DEBUG_LEVEL) || 0;

export function print(message: string, always = false) {
  if (debugLevel > 0 || always) {
    console.log(message);
  }
}