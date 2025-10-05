import { Server } from "socket.io";

let io;

export const GET = async (req) => {
  if (!io) {
    const server = new Server({
      cors: {
        origin: "*", // Change this in production
      },
    });

    server.on("connection", (socket) => {
      console.log("New client connected", socket.id);

      // Listen for chat messages
      socket.on("chatMessage", (msg) => {
        console.log("Message received: ", msg);
        // Broadcast to all clients
        server.emit("chatMessage", msg);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
      });
    });

    io = server;
  }

  return new Response("Socket server running");
};
