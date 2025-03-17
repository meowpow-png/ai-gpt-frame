import { useEffect, useState } from "react";
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

  return <div>{message}</div>;
}

export default App;
