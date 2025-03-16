// Send a message
async function sendMessage() {
    const messageInput = document.getElementById("message");
    const chatContainer = document.getElementById("chat-container");
    const sendButton = document.getElementById("send-btn");

    const userMessage = messageInput.value.trim();
    if (userMessage === "") return;

    sendButton.disabled = true;

    chatContainer.innerHTML += `<div class="message user">${userMessage}</div>`;
    messageInput.value = "";
    chatContainer.scrollTop = chatContainer.scrollHeight;

    chatContainer.innerHTML += `<div class="message bot" id="loading">Thinking...</div>`;

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        document.getElementById("loading").remove();

        chatContainer.innerHTML += `<div class="message bot">${data.response}</div>`;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    } catch (error) {
        document.getElementById("loading").innerText = "Error: Unable to fetch response.";
    }

    sendButton.disabled = false;
}

// Dark mode handling
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const root = document.documentElement; // Access :root

    function enableDarkMode() {
        root.style.setProperty("--bg-color", "#121212");
        root.style.setProperty("--text-color", "#f4f4f4");
        root.style.setProperty("--chat-bg", "#1e1e1e");
        root.style.setProperty("--user-bg", "#007bff");
        root.style.setProperty("--bot-bg", "#333");
        root.style.setProperty("--input-bg", "#222");
        localStorage.setItem("darkMode", "enabled");
    }

    function disableDarkMode() {
        root.style.setProperty("--bg-color", "#ffffff");
        root.style.setProperty("--text-color", "#000000");
        root.style.setProperty("--chat-bg", "#f4f4f4");
        root.style.setProperty("--user-bg", "#007bff");
        root.style.setProperty("--bot-bg", "#ddd");
        root.style.setProperty("--input-bg", "#eee");
        localStorage.setItem("darkMode", "disabled");
    }

    // Make dark mode the default
    const storedMode = localStorage.getItem("darkMode");

    if (storedMode === "enabled" || storedMode === null) { // Default to dark mode
        enableDarkMode();
        darkModeToggle.checked = true;
    } else {
        disableDarkMode();
        darkModeToggle.checked = false;
    }

    // Toggle mode on change
    darkModeToggle.addEventListener("change", () => {
        if (darkModeToggle.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });
});

