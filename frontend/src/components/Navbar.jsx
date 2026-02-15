import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Button from './ui/Button';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isDashboard = location.pathname.includes('dashboard');

    if (isDashboard) return null;

    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="text-lg md:text-xl font-display font-bold text-primary-700 tracking-tight uppercase">
                                ALETHEIA - AI POWERED THERAPIST
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link to="/" className="text-slate-600 hover:text-primary-600 px-3 py-2 rounded-md font-medium transition-colors">Home</Link>
                            <Link to="/about" className="text-slate-600 hover:text-primary-600 px-3 py-2 rounded-md font-medium transition-colors">About Us</Link>
                            <a href="/#faq" className="text-slate-600 hover:text-primary-600 px-3 py-2 rounded-md font-medium transition-colors">FAQ</a>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="ghost" size="sm">Log in</Button>
                        </Link>
                        <Link to="/signup">
                            <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white shadow-sm">Get Started</Button>
                        </Link>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t border-slate-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50">Home</Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50">About Us</Link>
                        <a href="/#faq" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50">FAQ</a>
                    </div>
                    <div className="pt-4 pb-4 border-t border-slate-100">
                        <div className="flex items-center px-5 gap-4">
                            <Link to="/login" className="w-full"><Button variant="outline" className="w-full justify-center">Log in</Button></Link>
                            <Link to="/signup" className="w-full"><Button className="w-full justify-center">Get Started</Button></Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
