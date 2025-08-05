

import React, { useState } from 'react';
import { SupportTicket, ZainaColor } from '../../../types';
import InputField from '../../shared/InputField';
import MessageSquareIcon from '../../icons/MessageSquareIcon';

interface UserSupportSectionProps {
  tickets: SupportTicket[];
  onSaveTicket: (ticket: SupportTicket) => void;
  userId: string;
}

const UserSupportSection: React.FC<UserSupportSectionProps> = ({ tickets, onSaveTicket, userId }) => {
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [viewingTicket, setViewingTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleCreateTicket = () => {
    if (!newTicketSubject || !newTicketMessage) {
        alert("Subject and message are required.");
        return;
    }
    const newTicket: SupportTicket = {
      id: `ticket_${Date.now()}`,
      userId: userId,
      subject: newTicketSubject,
      status: 'Open',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      messages: [{ sender: 'user', text: newTicketMessage, timestamp: new Date().toISOString() }],
    };
    onSaveTicket(newTicket);
    setIsCreatingTicket(false);
    setNewTicketSubject('');
    setNewTicketMessage('');
    alert('Support ticket created!');
  };

  const handleSendReply = () => {
    if (!replyText || !viewingTicket) return;
    const updatedTicket: SupportTicket = {
      ...viewingTicket,
      messages: [...viewingTicket.messages, { sender: 'user', text: replyText, timestamp: new Date().toISOString() }],
      lastUpdated: new Date().toISOString(),
    };
    onSaveTicket(updatedTicket);
    setViewingTicket(updatedTicket);
    setReplyText('');
  };
  
  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-zaina-primary';
      case 'In Progress': return 'bg-yellow-100 text-yellow-700';
      case 'Resolved':
      case 'Closed': return 'bg-green-100 text-green-700';
      default: return 'bg-zaina-cool-gray-light text-zaina-deep-navy';
    }
  };

  if (viewingTicket) {
    return (
        <div>
            <button onClick={() => setViewingTicket(null)} className="mb-4 text-zaina-primary hover:underline text-sm">&larr; Back to Tickets</button>
            <h2 className="text-xl font-semibold font-heading-playfair text-zaina-deep-navy mb-2">{viewingTicket.subject}</h2>
            <p className="text-sm text-zaina-slate-gray mb-1">Status: <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(viewingTicket.status)}`}>{viewingTicket.status}</span></p>
            <p className="text-xs text-zaina-slate-gray mb-4">Created: {new Date(viewingTicket.createdAt).toLocaleString()}</p>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2 border p-3 rounded-md bg-zaina-neutral-light">
                {viewingTicket.messages.map((msg, index) => (
                    <div key={index} className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-zaina-sky-blue-light ml-auto' : 'bg-zaina-cool-gray-light mr-auto'} max-w-[80%]`}>
                        <p className="text-sm text-zaina-deep-navy">{msg.text}</p>
                        <p className="text-xs text-zaina-slate-gray mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={3}
                    placeholder="Type your reply..."
                    className="w-full p-2 border rounded-md"
                />
                <button onClick={handleSendReply} className="mt-2 bg-zaina-primary text-zaina-white px-4 py-2 rounded-md">Send Reply</button>
            </div>
        </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold font-heading-playfair text-zaina-deep-navy">Support Tickets</h2>
        {!isCreatingTicket && (
            <button
            onClick={() => setIsCreatingTicket(true)}
            className="bg-zaina-primary text-zaina-white font-medium py-2 px-4 rounded-md hover:bg-zaina-secondary-blue text-sm transition-colors"
            >
            Create New Ticket
            </button>
        )}
      </div>

      {isCreatingTicket && (
        <div className="mb-8 p-6 bg-zaina-sky-blue-light/50 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-zaina-deep-navy mb-4">Create New Support Ticket</h3>
          <div className="space-y-4">
            <InputField label="Subject" name="subject" value={newTicketSubject} onChange={(e) => setNewTicketSubject(e.target.value)} required />
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zaina-deep-navy mb-1">Message</label>
              <textarea
                id="message" name="message" value={newTicketMessage} onChange={(e) => setNewTicketMessage(e.target.value)} rows={4}
                className="w-full px-3 py-2 border border-zaina-cool-gray-dark rounded-md shadow-sm focus:ring-zaina-primary focus:border-zaina-primary text-sm"
                required
              ></textarea>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={handleCreateTicket} className="bg-zaina-primary text-zaina-white font-semibold py-2 px-5 rounded-md hover:bg-zaina-secondary-blue">Submit Ticket</button>
            <button onClick={() => setIsCreatingTicket(false)} className="bg-zaina-cool-gray-medium text-zaina-deep-navy font-semibold py-2 px-5 rounded-md hover:bg-zaina-cool-gray-dark">Cancel</button>
          </div>
        </div>
      )}

      {tickets.length === 0 && !isCreatingTicket && (
        <p className="text-zaina-slate-gray">You have no support tickets.</p>
      )}

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-zaina-white p-4 rounded-lg shadow-md border border-zaina-cool-gray-medium hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-zaina-deep-navy hover:text-zaina-primary cursor-pointer" onClick={() => setViewingTicket(ticket)}>{ticket.subject}</h3>
                <p className="text-xs text-zaina-slate-gray">Ticket ID: #{ticket.id.slice(-6).toUpperCase()} | Last Updated: {new Date(ticket.lastUpdated).toLocaleDateString()}</p>
              </div>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSupportSection;