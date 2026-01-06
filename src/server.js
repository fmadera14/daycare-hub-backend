import "dotenv/config";
import { createApp } from "./app.js";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const app = createApp();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
