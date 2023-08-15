const API_KEY = 'app-rUFZONvPMZWBFqD8nDaRhLXt';
const API_ENDPOINT = 'https://api.dify.dev/v1/chat-messages';
let conversation_id = null; // to store the conversation ID

function sendMessage() {
    const inputElem = document.getElementById('userInput');
    const message = inputElem.value;

    if (message.trim() === '') return;

    const chatOutputElem = document.getElementById('chatOutput');
    chatOutputElem.innerHTML += `<div class="user-message">${message}</div>`;

    const payload = {
        inputs: {},
        query: message,
        response_mode: "streaming",
        user: "abc-123" // This can be a unique identifier for your users
    };

    if (conversation_id) {
        payload.conversation_id = conversation_id;
    }

    fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.conversation_id) {
            conversation_id = data.conversation_id; // save the conversation ID for subsequent messages
        }
        chatOutputElem.innerHTML += `<div class="bot-message">${data.message.text}</div>`; // assuming the text message is in data.message.text
    })
    .catch(error => {
        console.error('Error:', error);
        chatOutputElem.innerHTML += `<div class="error-message">Error sending message.</div>`;
    });

    inputElem.value = '';
}
