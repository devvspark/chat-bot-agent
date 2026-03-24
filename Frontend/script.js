async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userMessage = input.value;

  // prevent empty message
  if (userMessage.trim() === "") return;

  // 👉 User message
  const userDiv = document.createElement("div");
  userDiv.classList.add("user-message");
  userDiv.innerText = userMessage;
  chatBox.appendChild(userDiv);

  input.value = "";

  try {
    // 👉 Call backend API
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: userMessage
      })
    });

    const data = await res.json();

    // 👉 Bot message
    const botDiv = document.createElement("div");
    botDiv.classList.add("bot-message");
    botDiv.innerHTML = marked.parse(data.reply);
    chatBox.appendChild(botDiv);

  } catch (error) {
    console.error(error);

    const errorDiv = document.createElement("div");
    errorDiv.classList.add("bot-message");
    errorDiv.innerText = "Error: unable to reach server";
    chatBox.appendChild(errorDiv);
  }
}