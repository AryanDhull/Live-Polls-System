import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useUser } from '../../context/userContext';

const socket = io("https://live-polls-system-backend.onrender.com");

function ChatPopup() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { userType } = useUser(); // Get userType from context

  useEffect(() => {
    console.log('ChatPopup: Mounted and setting up socket listeners');

    socket.on('receiveMessage', (newMessage) => {
      console.log('ChatPopup: Received new message', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      console.log('ChatPopup: Unmounting and cleaning up socket listeners');
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') return;
    const newMessage = { text: message, sender: userType };
    console.log('ChatPopup: Sending message', newMessage);
    socket.emit('sendMessage', newMessage);
    setMessage('');
  };

  return (
    <div className={`chat-popup ${isOpen ? 'open' : ''}`}>
      <button onClick={() => setIsOpen(!isOpen)} className=" mt- 3 border-2 bg-yellow-100 border-slate-700 p-2 rounded hover:bg-yellow-200 ">
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {isOpen && (
        <div className="chat-popup-content">
          <div className="chat-popup-messages">
            {messages.map((msg, index) => (
              <div key={index} className="chat-popup-message">
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="ml -2 border-2 bg-lime-100 border-slate-700 rounded p-1"
          />
          <button onClick={sendMessage} className="ml-2 border-2 bg-yellow border-slate-700 rounded p-1">Send</button>
        </div>
      )}
    </div>
  );
}

export default ChatPopup;
