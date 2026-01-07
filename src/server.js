import { createApp } from "./app.js";
import { PORT } from "./config/env.js";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const app = createApp();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
