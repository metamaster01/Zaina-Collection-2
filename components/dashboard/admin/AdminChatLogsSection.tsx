
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

interface ChatMessage {
    id: string;
    sender: 'user' | 'admin';
    text: string;
    timestamp: string;
}

interface ChatSession {
    id: string;
    user: { name: string; };
    messages: { text: string }[]; // For preview
}

const AdminChatLogsSection: React.FC = () => {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const fetchSessions = async () => {
        try {
            const token = localStorage.getItem('zaina-authToken');
            const response = await axios.get(`${API_BASE_URL}/admin/chats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSessions(response.data);
            if (response.data.length > 0 && !selectedSession) {
                handleSelectSession(response.data[0]);
            }
        } catch (error) {
            console.error("Failed to fetch chat sessions:", error);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSelectSession = async (session: ChatSession) => {
        setSelectedSession(session);
        setIsLoading(true);
        try {
            const token = localStorage.getItem('zaina-authToken');
            const response = await axios.get(`${API_BASE_URL}/admin/chats/${session.id}/messages`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedSession) return;

        const optimisticMessage: ChatMessage = {
            id: `temp_${Date.now()}`,
            sender: 'admin',
            text: newMessage,
            timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, optimisticMessage]);
        setNewMessage('');

        try {
            const token = localStorage.getItem('zaina-authToken');
            await axios.post(`${API_BASE_URL}/admin/chats/${selectedSession.id}/messages`, 
                { text: newMessage },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Re-fetch to get the real message ID and confirm
            handleSelectSession(selectedSession); 
            fetchSessions(); // To update the preview
        } catch (error) {
            console.error("Failed to send message:", error);
            // Revert optimistic update on failure
            setMessages(prev => prev.filter(m => m.id !== optimisticMessage.id));
        }
    };

    return (
    <div className="bg-admin-light-card dark:bg-admin-dark-card p-4 rounded-2xl shadow-lg h-[80vh] flex">
        {/* Chat List */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold p-4">Chat Sessions</h2>
            <div className="overflow-y-auto">
                {sessions.map(chat => (
                    <button key={chat.id} onClick={() => handleSelectSession(chat)} className={`w-full text-left p-4 border-l-4 ${selectedSession?.id === chat.id ? 'border-admin-accent bg-gray-100 dark:bg-gray-800/50' : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/30'}`}>
                        <p className="font-semibold">{chat.user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{chat.messages[0]?.text || 'No messages yet.'}</p>
                    </button>
                ))}
            </div>
        </div>
        
        {/* Transcript View */}
        <div className="w-2/3 flex flex-col">
            {selectedSession ? (
                <>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold">{selectedSession.user.name}</h3>
                </div>
                <div className="flex-grow p-4 space-y-3 overflow-y-auto bg-gray-50 dark:bg-gray-800/30">
                    {isLoading ? <p>Loading messages...</p> : messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-lg max-w-xs text-sm ${msg.sender === 'admin' ? 'bg-admin-accent text-white' : 'bg-gray-200 dark:bg-gray-600 text-black dark:text-white'}`}>
                               {msg.text}
                               <div className="text-right text-[10px] opacity-70 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSendMessage}>
                        <input 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="w-full p-2 border rounded-md dark:bg-admin-dark" 
                            placeholder="Type your reply..."
                        />
                    </form>
                </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Select a chat to view logs.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default AdminChatLogsSection;