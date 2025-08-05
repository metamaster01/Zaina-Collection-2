

import React, { useState } from 'react';
import { SupportTicket } from '../../../types';
import InputField from '../../shared/InputField';
import Modal from '../../shared/Modal';

interface AdminSupportTicketsSectionProps {
  initialTickets: SupportTicket[];
  onSaveTicket: (ticket: SupportTicket) => void;
}

const AdminSupportTicketsSection: React.FC<AdminSupportTicketsSectionProps> = ({ initialTickets, onSaveTicket }) => {
    const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
    const [viewingTicket, setViewingTicket] = useState<SupportTicket | null>(null);
    const [replyText, setReplyText] = useState('');
    const [filter, setFilter] = useState<'All' | 'Open' | 'In Progress' | 'Resolved' | 'Closed'>('All');
    
    React.useEffect(() => {
        setTickets(initialTickets);
    }, [initialTickets]);

    const filteredTickets = tickets.filter(t => {
        if (filter === 'All') return true;
        return t.status === filter;
    });

    const handleSendReply = () => {
        if (!replyText || !viewingTicket) return;
        
        const updatedTicket: SupportTicket = {
            ...viewingTicket,
            messages: [
                ...viewingTicket.messages,
                { sender: 'admin', text: replyText, timestamp: new Date().toISOString() }
            ],
            lastUpdated: new Date().toISOString(),
        };
        onSaveTicket(updatedTicket);
        setViewingTicket(updatedTicket); // Update modal view optimistically
        setReplyText('');
    };

    const handleChangeStatus = (newStatus: SupportTicket['status']) => {
        if (!viewingTicket) return;
        const updatedTicket = { ...viewingTicket, status: newStatus, lastUpdated: new Date().toISOString() };
        onSaveTicket(updatedTicket);
        setViewingTicket(updatedTicket);
    }
    
    return (
        <div className="bg-admin-light-card dark:bg-admin-dark-card p-6 md:p-8 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold text-admin-light-text dark:text-admin-dark-text">Support Tickets</h1>
            <p className="mt-2 text-admin-light-text-secondary dark:text-admin-dark-text-secondary mb-6">
                Respond to and manage customer queries.
            </p>
            
            <div className="mb-4">
                {(['All', 'Open', 'In Progress', 'Resolved', 'Closed'] as const).map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 text-sm rounded-md mr-2 ${filter === f ? 'bg-admin-accent text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>{f}</button>
                ))}
            </div>

             <div className="overflow-x-auto border rounded-lg">
                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-admin-dark-card divide-y divide-gray-200 dark:divide-gray-700">
                       {filteredTickets.map(ticket => (
                           <tr key={ticket.id}>
                               <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">#{ticket.id.slice(-6)}</td>
                               <td className="px-4 py-3 whitespace-nowrap text-sm">{ticket.subject}</td>
                               <td className="px-4 py-3 whitespace-nowrap text-sm">{ticket.status}</td>
                               <td className="px-4 py-3 whitespace-nowrap text-sm">{new Date(ticket.lastUpdated).toLocaleDateString()}</td>
                               <td className="px-4 py-3 whitespace-nowrap text-sm">
                                   <button onClick={() => setViewingTicket(ticket)} className="text-admin-accent hover:underline">View</button>
                               </td>
                           </tr>
                       ))}
                    </tbody>
                 </table>
            </div>

            <Modal isOpen={!!viewingTicket} onClose={() => setViewingTicket(null)} title={`Ticket #${viewingTicket?.id.slice(-6)}`}>
                <div>
                    <h3 className="font-semibold">{viewingTicket?.subject}</h3>
                    <div className="mt-2">
                        <label className="text-xs font-medium">Status: </label>
                        <select 
                            value={viewingTicket?.status}
                            onChange={(e) => handleChangeStatus(e.target.value as SupportTicket['status'])}
                            className="text-xs p-1 rounded border-gray-300 dark:bg-admin-dark-card"
                        >
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                            <option>Closed</option>
                        </select>
                    </div>

                    <div className="mt-4 max-h-60 overflow-y-auto space-y-3 p-2 bg-gray-100 dark:bg-gray-800 rounded">
                        {viewingTicket?.messages.map((msg, i) => (
                            <div key={i} className={`p-2 rounded-lg text-sm ${msg.sender === 'admin' ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-green-100 dark:bg-green-900/50'}`}>
                                <p className="font-semibold capitalize text-xs">{msg.sender}</p>
                                <p>{msg.text}</p>
                                <p className="text-right text-[10px] text-gray-500">{new Date(msg.timestamp).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <textarea value={replyText} onChange={e => setReplyText(e.target.value)} rows={3} placeholder="Type your reply..." className="w-full text-sm p-2 border rounded-md dark:bg-admin-dark" />
                        <button onClick={handleSendReply} className="mt-2 bg-admin-accent text-white font-semibold py-2 px-4 rounded-lg">Send Reply</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminSupportTicketsSection;