import { useEffect, useState } from "react";
import ChatApp from "./components/ChatApp";
import api from "./api"; // Axios instance

function App() {
  const [message, setMessage] = useState("Loading...");

   useEffect(() => {
     api.get("/test")
       .then(response => setMessage(response.data))
       .catch(error => {
         console.error("API error:", error);
         setMessage("Error fetching data");
       });
   }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <ChatApp />
    </div>
  );
}

export default App;
