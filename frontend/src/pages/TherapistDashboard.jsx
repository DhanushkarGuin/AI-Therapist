import React, { useState } from 'react';
import Button from '../components/ui/Button';

const TherapistDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const SidebarItem = ({ id, icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === id
                    ? 'bg-teal-50 text-teal-700 font-medium'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
        >
            <span className="text-xl">{icon}</span>
            <span>{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar - Distinct Color for Therapist Mode */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-6 fixed h-full">
                <div className="flex items-center gap-2 mb-10 text-teal-600">
                    <span className="text-2xl">🩺</span>
                    <span className="text-xl font-bold">Therapist Portal</span>
                </div>

                <nav className="space-y-2 flex-grow">
                    <SidebarItem id="overview" icon="📊" label="Dashboard" />
                    <SidebarItem id="patients" icon="👥" label="My Patients" />
                    <SidebarItem id="appointments" icon="📅" label="Appointments" />
                    <SidebarItem id="notes" icon="📝" label="Clinical Notes" />
                </nav>

                <div className="pt-6 border-t border-slate-100">
                    <SidebarItem id="profile" icon="👤" label="Dr. Smith" />
                    <SidebarItem id="logout" icon="🚪" label="Log Out" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Welcome, Dr. Smith</h1>
                        <p className="text-slate-500">You have 3 upcoming appointments today.</p>
                    </div>
                    <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                        DR
                    </div>
                </header>

                {/* Dynamic Content Area */}
                <div className="max-w-6xl">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Quick Stats */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="font-semibold text-slate-500 text-sm mb-1">Active Patients</h3>
                                <p className="text-3xl font-bold text-slate-900">24</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="font-semibold text-slate-500 text-sm mb-1">Pending Requests</h3>
                                <p className="text-3xl font-bold text-slate-900">2</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="font-semibold text-slate-500 text-sm mb-1">Hours This Week</h3>
                                <p className="text-3xl font-bold text-slate-900">18</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="font-semibold text-slate-500 text-sm mb-1">Next Session</h3>
                                <p className="text-xl font-bold text-teal-600">2:00 PM</p>
                            </div>

                            {/* Recent Activity / List */}
                            <div className="col-span-1 md:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                    <h3 className="font-bold text-slate-800">Upcoming Appointments</h3>
                                    <Button variant="ghost" className="text-sm">View All</Button>
                                </div>
                                <div className="p-0">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-center justify-between px-6 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0"></div>
                                                <div>
                                                    <p className="font-medium text-slate-900">Patient Name {item}</p>
                                                    <p className="text-sm text-slate-500">Video Consultation • 45 min</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-slate-600">2:00 PM</span>
                                                <Button variant="outline" className="py-1 px-3 text-sm h-auto">Join</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'patients' && (
                        <div className="bg-white rounded-2xl border border-slate-200 p-12 shadow-sm text-center">
                            <div className="text-6xl mb-4">👥</div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Patient Records</h2>
                            <p className="text-slate-500 mb-6">Manage patient history, intake forms, and progress.</p>
                            <Button variant="primary">Add New Patient</Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default TherapistDashboard;
