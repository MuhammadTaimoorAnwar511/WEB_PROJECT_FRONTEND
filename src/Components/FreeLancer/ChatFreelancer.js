import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaComment } from 'react-icons/fa';
import '../../Style/FreeLancer/Chat.css';

function ChatFreelancer({ freelancerId, freelancerName }) {
  const token = localStorage.getItem('token');
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvasExample
          key={idx}
          placement={placement}
          freelancerId={freelancerId}
          freelancerName={freelancerName}
        />
      ))}
    </>
  );
}

function OffCanvasExample({ freelancerId, freelancerName, placement }) {
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    // Fetch messages when the chat is opened
    fetchMessages();
    setShow(true);
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/client/getmessage/${freelancerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Function to send a new message
  const sendMessage = async (message) => {
    try {
      await fetch(`http://localhost:3001/api/client/sendmessage/${freelancerId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      // Fetch messages after sending a new message
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    console.log("chat use effect triggered");
    fetchMessages();
  }, [freelancerId]);

  return (
    <>
      <span
        className="chat-icon"
        onClick={handleShow}
        style={{ marginLeft: '100px', cursor: 'pointer' }}
      >
        <FaComment size={24} />
      </span>
      <Offcanvas show={show} onHide={handleClose} className="chat-container">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="offcanvas-title">
            Chatting with: {freelancerName}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas-body">
          {/* Render the list of messages */}
          <ul className="message-list">
            {messages.map((msg, index) => (
              <li key={index} className="message-item">
                <strong>{msg.senderName}:</strong> {msg.message}
              </li>
            ))}
          </ul>
          {/* Add a form to send new messages */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newMessage = e.target.message.value;
              sendMessage(newMessage);
              e.target.message.value = '';
            }}
            className="message-form"
          >
            <input
              type="text"
              name="message"
              placeholder="Type your message"
              className="message-input"
            />
            <button type="submit" className="message-submit">
              Send
            </button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvasExample;
