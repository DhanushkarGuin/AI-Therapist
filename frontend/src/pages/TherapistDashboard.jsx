import React, { useState } from 'react';
import {
    Users,
    Calendar,
    Settings,
    LogOut,
    Menu,
    Bell,
    Search,
    CheckCircle,
    XCircle,
    Clock,
    Shield,
    BellRing
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const TherapistDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('clients');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Settings State
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: false
    });

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = () => {
        navigate('/');
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
                    <span className="text-xl font-display font-bold text-primary-700 tracking-tight uppercase">ALETHEIA</span>
                    <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Pro</span>
                </div>

                <div className="p-4 space-y-1 flex-grow overflow-y-auto">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4 mt-4">Practice</div>
                    <SidebarItem icon={Users} label="My Clients" id="clients" />
                    <SidebarItem icon={Calendar} label="Appointments" id="appointments" />

                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4 mt-8">Account</div>
                    <SidebarItem icon={Settings} label="Settings" id="settings" />
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
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} className="p-2 text-slate-600 md:hidden">
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl font-bold text-slate-900 hidden md:block">
                            {activeTab === 'clients' ? 'Client Management' : activeTab === 'appointments' ? 'Appointments' : 'Settings'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-slate-600 relative">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                            DR
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-4 md:p-8">
                    <div className="max-w-6xl mx-auto space-y-8">

                        {/* Stats Overview */}
                        {activeTab !== 'settings' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="p-6 flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Active Clients</p>
                                        <p className="text-2xl font-bold text-slate-900">24</p>
                                    </div>
                                </Card>
                                <Card className="p-6 flex items-center gap-4">
                                    <div className="p-3 bg-green-100 rounded-full text-green-600">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Upcoming Sessions</p>
                                        <p className="text-2xl font-bold text-slate-900">8</p>
                                    </div>
                                </Card>
                                <Card className="p-6 flex items-center gap-4">
                                    <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Pending Requests</p>
                                        <p className="text-2xl font-bold text-slate-900">3</p>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {/* Clients Tab */}
                        {activeTab === 'clients' && (
                            <Card className="overflow-hidden">
                                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <h2 className="text-lg font-bold text-slate-900">Recent Clients</h2>
                                    <div className="relative w-full sm:w-64">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Search clients..."
                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 text-slate-500 text-sm">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Name</th>
                                                <th className="px-6 py-4 font-medium">Status</th>
                                                <th className="px-6 py-4 font-medium">Last Session</th>
                                                <th className="px-6 py-4 font-medium">Next Session</th>
                                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {[
                                                { name: "Sarah Miller", status: "Active", last: "2 days ago", next: "Tomorrow, 10:00 AM" },
                                                { name: "James Wilson", status: "Active", last: "1 week ago", next: "Fri, 2:00 PM" },
                                                { name: "Emily Davis", status: "Break", last: "3 weeks ago", next: "Not scheduled" },
                                                { name: "Michael Brown", status: "New", last: "Never", next: "Mon, 11:30 AM" },
                                            ].map((client, i) => (
                                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-slate-900">{client.name}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${client.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                                client.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                                                    'bg-slate-100 text-slate-700'
                                                            }`}>
                                                            {client.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-500">{client.last}</td>
                                                    <td className="px-6 py-4 text-slate-500">{client.next}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <Button variant="ghost" size="sm">View Profile</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        )}

                        {/* Appointments Tab */}
                        {activeTab === 'appointments' && (
                            <div className="space-y-4">
                                <h2 className="font-bold text-slate-900">Pending Requests</h2>
                                {[
                                    { name: "Alice Johnson", time: "Mon, Sep 12 • 10:00 AM - 11:00 AM", type: "Initial Consultation" },
                                    { name: "Robert Smith", time: "Tue, Sep 13 • 2:00 PM - 3:00 PM", type: "Follow-up" }
                                ].map((req, i) => (
                                    <Card key={i} className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 font-bold">
                                                {req.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">{req.name}</h3>
                                                <p className="text-sm text-slate-500">{req.time}</p>
                                                <p className="text-xs text-primary-600 font-medium mt-1">{req.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"><XCircle /></button>
                                            <button className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors"><CheckCircle /></button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === 'settings' && (
                            <div className="max-w-2xl mx-auto space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900">Practice Settings</h2>

                                <Card className="p-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                                            <Settings size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">General</h3>
                                            <p className="text-sm text-slate-500">Manage your account and preferences.</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <Input label="Practice Name" placeholder="Dr. Smith Therapy" defaultValue="Dr. Smith Therapy" />
                                        <Input label="Email" placeholder="dr.smith@example.com" defaultValue="dr.smith@example.com" />
                                        <div className="pt-2">
                                            <Button>Save Changes</Button>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                            <BellRing size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">Notifications</h3>
                                            <p className="text-sm text-slate-500">Choose how you want to be updated.</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer">
                                            <span className="text-slate-700">Email Notifications</span>
                                            <input type="checkbox" checked={notifications.email} onChange={() => setNotifications({ ...notifications, email: !notifications.email })} className="w-5 h-5 text-primary-600 rounded" />
                                        </label>
                                        <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer">
                                            <span className="text-slate-700">Push Notifications</span>
                                            <input type="checkbox" checked={notifications.push} onChange={() => setNotifications({ ...notifications, push: !notifications.push })} className="w-5 h-5 text-primary-600 rounded" />
                                        </label>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                            <Shield size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">Security</h3>
                                            <p className="text-sm text-slate-500">Protect your account.</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full">Change Password</Button>
                                </Card>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default TherapistDashboard;
