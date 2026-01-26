import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const ClientDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const SidebarItem = ({ id, icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === id
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
        >
            <span className="text-xl">{icon}</span>
            <span>{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-6 fixed h-full">
                <div className="flex items-center gap-2 mb-10 text-primary-600">
                    <span className="text-2xl">🌱</span>
                    <span className="text-xl font-bold">AI Therapist</span>
                </div>

                <nav className="space-y-2 flex-grow">
                    <SidebarItem id="overview" icon="📊" label="Overview" />
                    <SidebarItem id="chat" icon="💬" label="AI Therapy Chat" />
                    <SidebarItem id="journal" icon="📓" label="My Journal" />
                    <SidebarItem id="suggestions" icon="💡" label="Wellness Tips" />
                </nav>

                <div className="pt-6 border-t border-slate-100">
                    <SidebarItem id="profile" icon="👤" label="Profile" />
                    <SidebarItem id="logout" icon="🚪" label="Log Out" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Good Morning, Client</h1>
                        <p className="text-slate-500">Here's your wellness summary for today.</p>
                    </div>
                    <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
                        C
                    </div>
                </header>

                {/* Dynamic Content Area */}
                <div className="max-w-5xl">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Welcome Card */}
                            <div className="col-span-1 md:col-span-3 bg-gradient-to-r from-primary-500 to-teal-500 rounded-2xl p-8 text-white shadow-lg">
                                <h2 className="text-3xl font-bold mb-2">Ready to talk?</h2>
                                <p className="mb-6 opacity-90">Your AI companion is ready for a session whenever you are.</p>
                                <Button
                                    className="bg-slate-900 text-white hover:bg-slate-800 border-none px-6 py-3 font-semibold shadow-md"
                                    onClick={() => setActiveTab('chat')}
                                >
                                    Start New Session
                                </Button>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="text-4xl mb-2">🔥</div>
                                <h3 className="font-semibold text-slate-900">Streak</h3>
                                <p className="text-2xl font-bold text-slate-700">3 Days</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="text-4xl mb-2">😊</div>
                                <h3 className="font-semibold text-slate-900">Mood</h3>
                                <p className="text-lg font-medium text-green-600">Improving</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="text-4xl mb-2">📓</div>
                                <h3 className="font-semibold text-slate-900">Journal</h3>
                                <p className="text-lg font-medium text-slate-600">5 Entries</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'chat' && (
                        <div className="bg-white rounded-2xl border border-slate-200 h-[600px] flex flex-col shadow-sm relative overflow-hidden">
                            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                                <span className="font-semibold text-slate-700">AI Therapist Session</span>
                                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Online</span>
                            </div>
                            <div className="flex-1 p-6 overflow-y-auto space-y-4">
                                <div className="flex justify-start">
                                    <div className="bg-slate-100 text-slate-800 p-3 rounded-2xl rounded-tl-none max-w-md">
                                        Hello! How are you feeling today?
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 border-t border-slate-100 bg-white">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                    <Button variant="primary">Send</Button>
                                </div>
                            </div>

                            {/* Placeholder Overlay */}
                            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
                                <div className="bg-white p-6 rounded-xl shadow-xl text-center border border-slate-200">
                                    <h3 className="font-bold text-slate-800 mb-2">Chat Feature Integration</h3>
                                    <p className="text-slate-500 mb-4 text-sm">Backend connection required for live chat.</p>
                                    <Button variant="outline" size="sm">Connect Backend</Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'journal' && (
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
                            <div className="text-6xl mb-4">📓</div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Journal</h2>
                            <p className="text-slate-500 mb-6">Record your thoughts and track your emotional journey.</p>
                            <p className="text-sm text-slate-400 bg-slate-50 py-2 rounded-lg">Feature Module: `backend/note-taking/`</p>
                        </div>
                    )}

                    {activeTab === 'suggestions' && (
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
                            <div className="text-6xl mb-4">💡</div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Wellness Suggestions</h2>
                            <p className="text-slate-500 mb-6">Personalized tips based on your recent sessions.</p>
                            <p className="text-sm text-slate-400 bg-slate-50 py-2 rounded-lg">Feature Module: `backend/suggestion-bot/`</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ClientDashboard;
