import { Server } from "socket.io";


 //Simulación Websocket PENDIENTE TERMINAR
 
 
export function initSocketMock(server: any) {
  const io = new Server(server, { cors: { origin: "*" } });

  setInterval(() => {
    const estados = ["PENDIENTE", "PREPARANDO", "EN_TRANSITO", "ENTREGADO"];
    const evento = {
      orderId: "ORD-" + Math.floor(Math.random() * 90000 + 10000),
      status: estados[Math.floor(Math.random() * estados.length)],
      timestamp: new Date().toISOString(),
    };
    io.emit("trackingUpdate", evento);
    console.log("Evento mock:", evento);
  }, 5000);

  return io;
}
