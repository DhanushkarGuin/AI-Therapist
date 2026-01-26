import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <span className="text-xl">🌿</span>
                            <span className="text-xl font-bold text-slate-900">AI Therapist</span>
                        </Link>
                        <p className="text-slate-500 max-w-sm">
                            Your compassionate AI companion for mental wellness. Available 24/7 to listen, guide, and support you on your journey.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-slate-500 hover:text-primary-600">Features</Link></li>
                            <li><Link to="#" className="text-slate-500 hover:text-primary-600">Pricing</Link></li>
                            <li><Link to="#" className="text-slate-500 hover:text-primary-600">For Therapists</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-slate-500 hover:text-primary-600">About Us</Link></li>
                            <li><Link to="#" className="text-slate-500 hover:text-primary-600">Contact</Link></li>
                            <li><Link to="#" className="text-slate-500 hover:text-primary-600">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        © {new Date().getFullYear()} AI Therapist. All rights reserved.
                    </p>
                    <p className="text-slate-400 text-sm">
                        Example Project - Not a real medical service.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
