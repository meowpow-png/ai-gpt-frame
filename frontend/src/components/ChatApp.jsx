import { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      setMessages([...newMessages, { sender: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error sending message", error);
      setMessages([...newMessages, { sender: "bot", text: "Error: Unable to connect to server." }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-2xl h-[1000vh] flex flex-col bg-gray-800 shadow-lg rounded-lg p-4">
        <div className="flex-grow overflow-y-auto p-4 bg-gray-700 rounded-lg space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className={`max-w-[75%] p-3 rounded-lg ${msg.sender === "user" ? "ml-auto bg-blue-500" : "bg-gray-600"}`}>
              {msg.text}
            </div>
          ))}
          {loading && <p className="text-gray-400">Bot is typing...</p>}
          <div ref={chatEndRef}></div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
            placeholder="Type a message"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
