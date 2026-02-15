import React, { useState } from 'react';
import {
    Home,
    MessageSquare,
    BarChart2,
    Book,
    Settings,
    LogOut,
    Menu,
    Send,
    Plus,
    X,
    User,
    Mail,
    Calendar,
    Save,
    Trash2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

// Mock Data for Mood Chart
const moodData = [
    { name: 'Mon', mood: 6 },
    { name: 'Tue', mood: 7 },
    { name: 'Wed', mood: 5 },
    { name: 'Thu', mood: 8 },
    { name: 'Fri', mood: 7 },
    { name: 'Sat', mood: 9 },
    { name: 'Sun', mood: 8 },
];

const ClientDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Chat State
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { role: 'assistant', content: "Hello! I'm Aletheia. I'm here to listen. How are you feeling right now?" }
    ]);

    // Notes State
    const [showNewNote, setShowNewNote] = useState(false);
    const [tempNote, setTempNote] = useState({ title: '', content: '' });
    const [notes, setNotes] = useState([
        { id: 1, title: 'Gratitude Journal', content: 'Today I am grateful for the sunshine and the coffee I had this morning...', date: 'Oct 24, 2024' },
        { id: 2, title: 'Therapy Goals', content: '1. Practice mindfulness for 10 mins. 2. Write down 3 positive things...', date: 'Oct 20, 2024' }
    ]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = () => {
        // In a real app, clear auth tokens here
        navigate('/');
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatMessage.trim()) return;

        const newHistory = [...chatHistory, { role: 'user', content: chatMessage }];
        setChatHistory(newHistory);
        setChatMessage('');

        setTimeout(() => {
            setChatHistory(prev => [...prev, {
                role: 'assistant',
                content: "I'm listening. (Chat backend connection required for full response)"
            }]);
        }, 800);
    };

    const handleSaveNote = () => {
        if (!tempNote.title && !tempNote.content) return;

        // Add to local state (Temporary, not saved to backend as requested)
        const newNoteObj = {
            id: Date.now(),
            title: tempNote.title || 'Untitled Note',
            content: tempNote.content,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };

        setNotes([newNoteObj, ...notes]);
        setTempNote({ title: '', content: '' });
        setShowNewNote(false);
    };

    const SidebarItem = ({ icon: Icon, label, id }) => (
        <button
            onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === id
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
        >
            <Icon size={20} />
            <span>{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 flex flex-col
      `}>
                <div className="h-20 flex items-center px-6 border-b border-slate-100">
                    <span className="text-xl font-display font-bold text-primary-700 tracking-tight uppercase">Aletheia</span>
                </div>

                <div className="p-4 space-y-1 flex-grow overflow-y-auto">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4 mt-4">Menu</div>
                    <SidebarItem icon={Home} label="Overview" id="overview" />
                    <SidebarItem icon={MessageSquare} label="AI Chat" id="chat" />
                    <SidebarItem icon={BarChart2} label="Mood Tracker" id="mood" />
                    <SidebarItem icon={Book} label="Note Taking" id="notes" />

                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4 mt-8">Settings</div>
                    <SidebarItem icon={Settings} label="Profile" id="settings" />
                </div>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Header (Mobile Only) */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:hidden flex-shrink-0">
                    <span className="font-bold text-slate-900">Dashboard</span>
                    <button onClick={toggleSidebar} className="p-2 text-slate-600">
                        <Menu size={24} />
                    </button>
                </header>

                <div className="flex-1 overflow-auto p-4 md:p-8">
                    <div className="max-w-5xl mx-auto space-y-8">

                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h1 className="text-2xl font-bold text-slate-900">Hello, Member 👋</h1>
                                        <p className="text-slate-500">How are you feeling today?</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {/* Mood Card */}
                                    <Card className="p-6 md:col-span-2">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="font-bold text-slate-900">Mood History</h3>
                                            <select className="text-sm border-none bg-slate-50 rounded-md px-2 py-1 text-slate-500">
                                                <option>This Week</option>
                                            </select>
                                        </div>
                                        <div className="h-64">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={moodData}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                                    <Tooltip
                                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="mood"
                                                        stroke="#0f766e"
                                                        strokeWidth={3}
                                                        dot={{ fill: '#0f766e', strokeWidth: 2 }}
                                                        activeDot={{ r: 6 }}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Card>

                                    {/* Quick Actions */}
                                    <div className="space-y-6">
                                        <Card className="p-6 bg-gradient-to-br from-primary-500 to-primary-700 text-white border-none">
                                            <h3 className="font-bold text-lg mb-2">Talk to Aletheia</h3>
                                            <p className="text-primary-100 text-sm mb-4">Feeling overwhelmed? Let's chat about it.</p>
                                            <Button
                                                variant="ghost" /* Using ghost to avoid default primary white text styles */
                                                onClick={() => setActiveTab('chat')}
                                                className="w-full !bg-white !text-primary-700 hover:!bg-primary-50 shadow-md font-bold tracking-wide"
                                            >
                                                Start Chat
                                            </Button>
                                        </Card>

                                        <Card className="p-6">
                                            <h3 className="font-bold text-slate-900 mb-4">Quick Notes</h3>
                                            <p className="text-sm text-slate-500 mb-4">Jot down your thoughts...</p>
                                            <Button
                                                variant="outline"
                                                onClick={() => { setActiveTab('notes'); setShowNewNote(true); }}
                                                className="w-full justify-center"
                                            >
                                                Open Notebook
                                            </Button>
                                        </Card>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Chat Tab */}
                        {activeTab === 'chat' && (
                            <div className="h-[calc(100vh-8rem)] flex flex-col">
                                <div className="bg-white rounded-t-2xl border border-b-0 border-slate-200 p-4 shadow-sm flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                                        <MessageSquare className="text-primary-600" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">Aletheia</h3>
                                        <p className="text-xs text-slate-500 flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-slate-400 block"></span>
                                            Standby (Backend Required)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex-1 bg-white border-x border-slate-200 overflow-y-auto p-4 space-y-4">
                                    {chatHistory.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`
                        max-w-[80%] rounded-2xl px-5 py-3 
                        ${msg.role === 'user'
                                                    ? 'bg-primary-600 text-white rounded-br-none'
                                                    : 'bg-slate-100 text-slate-800 rounded-bl-none'}
                      `}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white rounded-b-2xl border border-t-0 border-slate-200 p-4">
                                    <form onSubmit={handleSendMessage} className="flex gap-2">
                                        <input
                                            className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            placeholder="Type your message..."
                                            value={chatMessage}
                                            onChange={(e) => setChatMessage(e.target.value)}
                                        />
                                        <Button type="submit" size="icon" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
                                            <Send size={18} />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Mood Tracker Tab */}
                        {activeTab === 'mood' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900">Mood Tracker</h2>
                                <Card className="p-8 text-center">
                                    <p className="text-slate-500">Visualizations for your mood patterns over time.</p>
                                    <div className="mt-8 h-64 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200">
                                        <span className="text-slate-400">Chart requires historical data from backend</span>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {/* Notes Tab */}
                        {activeTab === 'notes' && !showNewNote && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-slate-900">My Notes</h2>
                                    <Button size="sm" onClick={() => setShowNewNote(true)}>
                                        <Plus size={16} className="mr-2" /> New Note
                                    </Button>
                                </div>

                                {notes.length === 0 ? (
                                    <div className="text-center py-12 text-slate-500">No notes yet. Start writing!</div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {notes.map((note) => (
                                            <Card key={note.id} className="p-6 cursor-pointer hover:shadow-md transition-shadow relative group">
                                                <h3 className="font-bold text-slate-900 mb-2">{note.title}</h3>
                                                <p className="text-sm text-slate-500 mb-4">{note.date}</p>
                                                <p className="text-slate-600 line-clamp-3">{note.content}</p>
                                                <button
                                                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setNotes(notes.filter(n => n.id !== note.id));
                                                    }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* New Note Editor (Temporary State) */}
                        {activeTab === 'notes' && showNewNote && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Button variant="ghost" onClick={() => setShowNewNote(false)}>
                                        Back to Notes
                                    </Button>
                                    <Button onClick={handleSaveNote}>
                                        <Save size={16} className="mr-2" /> Save Note (Temp)
                                    </Button>
                                </div>
                                <Card className="p-6 space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        className="w-full text-2xl font-bold border-none focus:outline-none placeholder:text-slate-300"
                                        value={tempNote.title}
                                        onChange={(e) => setTempNote({ ...tempNote, title: e.target.value })}
                                        autoFocus
                                    />
                                    <textarea
                                        placeholder="Start writing..."
                                        className="w-full h-64 resize-none border-none focus:outline-none text-slate-600 placeholder:text-slate-300"
                                        value={tempNote.content}
                                        onChange={(e) => setTempNote({ ...tempNote, content: e.target.value })}
                                    />
                                </Card>
                                <p className="text-xs text-slate-400 text-center">
                                    * This note is temporary and will be cleared when you refresh the page (as requested).
                                </p>
                            </div>
                        )}

                        {/* Profile Tab */}
                        {activeTab === 'settings' && (
                            <div className="max-w-2xl mx-auto space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>
                                <Card className="p-8">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                                            <User size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900">Member</h3>
                                            <p className="text-slate-500">client@example.com</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                                            <Mail className="text-slate-400" />
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold">Email</p>
                                                <p className="text-slate-900">user@example.com</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                                            <Calendar className="text-slate-400" />
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold">Joined</p>
                                                <p className="text-slate-900">February 2026</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default ClientDashboard;
