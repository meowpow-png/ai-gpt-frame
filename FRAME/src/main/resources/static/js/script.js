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
const darkModeToggle = document.getElementById("darkModeToggle");
if (localStorage.getItem("darkMode") !== "disabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.checked = true;
}
darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
    }
});
