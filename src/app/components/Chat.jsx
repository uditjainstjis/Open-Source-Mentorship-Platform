"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket = io(); // Connect to same origin, or pass server URL

    socket.on("chatMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("chatMessage", message);
    setMessage("");
  };

  return (
    <div>
      <div style={{ minHeight: "200px", border: "1px solid black", marginBottom: "10px", padding: "5px" }}>
        {chat.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
