import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { initSocketMock } from "./scripts/socketMock";

dotenv.config();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("Conectado a MongoDB");

    const server = http.createServer(app);
    initSocketMock(server); 

    server.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
  })
  .catch((err) => console.error("Error en conexión Mongo:", err));
