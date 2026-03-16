import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendChatMessage } from '../redux/actions/adminActions';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const dispatch = useDispatch();
    const { chatMessages, loading } = useSelector((state) => state.admin);
    const { userInfo } = useSelector((state) => state.user);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            dispatch(sendChatMessage(inputMessage));
            setInputMessage('');
        }
    };

    if (!userInfo) {
        return null;
    }

    return (
        <div className="chatbot-widget">
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h3>AI Assistant</h3>
                        <button
                            className="close-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>
                    <div className="chatbot-messages">
                        {chatMessages.length === 0 ? (
                            <div className="welcome-message">
                                <p>How can I help you today?</p>
                                <p style={{ fontSize: '0.85em', marginTop: '10px' }}>
                                    Ask me about fencing & deck services, pricing, or how to become a seller!
                                </p>
                            </div>
                        ) : (
                            chatMessages.map((msg, idx) => (
                                <div key={idx}>
                                    <div className="message user-message">
                                        <p>{msg.user}</p>
                                    </div>
                                    <div className="message bot-message">
                                        <p>{msg.bot}</p>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="chatbot-form">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message..."
                            disabled={loading}
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? '...' : 'Send'}
                        </button>
                    </form>
                </div>
            )}
            <button
                className="chatbot-button"
                onClick={() => setIsOpen(!isOpen)}
                title="Open AI Assistant"
            >
                💬
            </button>
        </div>
    );
};

export default Chatbot;
