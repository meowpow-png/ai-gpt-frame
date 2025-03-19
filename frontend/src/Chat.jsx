import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-xl">Chat App</h1>

      <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="h-64 overflow-y-auto space-y-2 p-2 border border-gray-700 rounded-lg">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded ${msg.sender === "user" ? "bg-blue-500 text-white text-right" : "bg-gray-600 text-left"}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
