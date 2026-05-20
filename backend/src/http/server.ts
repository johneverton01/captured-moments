import "dotenv/config";
import { app } from "./app.js";

try {
  await app.listen({ port: Number(process.env.PORT)}).then(() => {
    console.log('HTTP server running 🚀')
  })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}