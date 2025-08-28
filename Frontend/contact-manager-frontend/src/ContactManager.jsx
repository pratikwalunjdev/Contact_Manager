import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, User, Mail, Phone, Trash2, Search, Database, Server, Code } from 'lucide-react';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('Connecting...');

  // Backend API URL
  const API_URL = "http://127.0.0.1:8000/api/contacts/";

  // Fetch contacts from Django API
  useEffect(() => {
    setApiStatus("Fetching...");
    axios.get(API_URL)
      .then(res => {
        setContacts(res.data);
        setApiStatus("Connected");
      })
      .catch(err => {
        console.error(err);
        setApiStatus("Error: Backend not reachable");
      });
  }, []);

  // Filter contacts by search
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  // Add contact
  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) return;
    setIsLoading(true);
    setApiStatus('Saving...');

    try {
      const res = await axios.post(API_URL, formData);
      setContacts(prev => [res.data, ...prev]);
      setFormData({ name: '', email: '', phone: '' });
      setShowForm(false);
      setApiStatus('Connected');
    } catch (err) {
      console.error(err);
      setApiStatus('Error saving contact');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete contact
  const handleDelete = async (id) => {
    setApiStatus("Deleting...");
    try {
      await axios.delete(`${API_URL}${id}/`);
      setContacts(prev => prev.filter(contact => contact.id !== id));
      setApiStatus("Connected");
    } catch (err) {
      console.error(err);
      setApiStatus("Error deleting contact");
    }
  };

  // Matrix Rain Background
  const MatrixRain = () => {
    const [drops, setDrops] = useState([]);
    useEffect(() => {
      const chars = '01';
      const newDrops = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        char: chars[Math.floor(Math.random() * chars.length)]
      }));
      setDrops(newDrops);
    }, []);
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        {drops.map(drop => (
          <div
            key={drop.id}
            className="absolute text-green-400 text-xs font-mono animate-pulse"
            style={{
              left: `${drop.x}%`,
              animationDelay: `${drop.delay}s`,
              animationDuration: '3s'
            }}
          >
            {drop.char}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-green-400 relative overflow-hidden">
      <MatrixRain />

      {/* Header */}
      <div className="relative z-10 border-b border-green-500/30 bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-black animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  Contact Manager v2.0
                </h1>
                <p className="text-gray-400 text-sm">Full-Stack CRUD Application</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                <Server className="w-4 h-4" />
                <span className="text-sm">{apiStatus}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs">
                <Code className="w-4 h-4" />
                <span>React + Django + MongoDB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Search + Add */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800/50 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all duration-300 w-full sm:w-80"
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
          >
            <Plus className="w-4 h-4" />
            <span>Add Contact</span>
          </button>
        </div>

        {/* Add Contact Form */}
        {showForm && (
          <div className="mb-8 bg-gray-800/30 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 animate-in slide-in-from-top duration-300">
            <h2 className="text-xl font-semibold mb-4 text-green-400">Add New Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="pl-10 pr-4 py-2 w-full bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="pl-10 pr-4 py-2 w-full bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="pl-10 pr-4 py-2 w-full bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div className="md:col-span-3 flex gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-white py-2 rounded-lg transition-all duration-300"
                >
                  {isLoading ? 'Saving...' : 'Save Contact'}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact List */}
        <div className="space-y-4">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No contacts found</p>
            </div>
          ) : (
            filteredContacts.map((contact, index) => (
              <div
                key={contact.id}
                className="bg-gray-800/30 border border-gray-700 hover:border-green-500/50 rounded-xl p-6 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center text-black font-semibold">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{contact.name}</div>
                        <div className="text-gray-400 text-sm">ID: {contact.id}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Phone className="w-4 h-4 text-green-400" />
                        <span>{contact.phone}</span>
                      </div>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactManager;
