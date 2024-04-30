<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Chat App</title>
    <style>
        #messages {
            height: 300px;
            overflow-y: scroll;
        }
    </style>
</head>
<body>
    <h1>Simple Chat App</h1>
    <div id="messages"></div>
    <input type="text" id="messageInput" placeholder="Type a message...">
    <button onclick="sendMessage()">Send</button>

    <script>
        const serverUrl = 'ws://localhost:3000'; // WebSocket server URL

        const messagesElement = document.getElementById('messages');
        const messageInput = document.getElementById('messageInput');
        let socket;

        function init() {
            socket = new WebSocket(serverUrl);

            socket.onopen = () => {
                console.log('Connected to server');
            };

            socket.onmessage = (event) => {
                const message = event.data;
                displayMessage(message);
            };

            socket.onclose = () => {
                console.log('Connection closed');
            };

            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        }

        function displayMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            messagesElement.appendChild(messageElement);
            messagesElement.scrollTop = messagesElement.scrollHeight; // Scroll to bottom
        }

        function sendMessage() {
            const message = messageInput.value.trim();
            if (message !== '') {
                socket.send(message);
                messageInput.value = '';
            }
        }

        init();
    </script>
</body>
</html>
