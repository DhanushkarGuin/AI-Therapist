import React from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

const Navbar = () => {
    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-xl">🌿</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                            AI Therapist
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                            Home
                        </Link>
                        <Link to="/about" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                            About
                        </Link>
                        <Link to="/contact" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                            Contact
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="ghost" className="hidden md:inline-flex px-4 py-2">
                                Log In
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="primary" className="px-5 py-2">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
