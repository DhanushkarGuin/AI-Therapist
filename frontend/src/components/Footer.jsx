import { Link } from 'react-router-dom';
import { Heart, Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex flex-col gap-1 mb-4">
                            <span className="text-lg font-display font-bold text-white tracking-tight uppercase">
                                ALETHEIA - AI POWERED THERAPIST
                            </span>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Professional mental wellness support, accessible anywhere. Your journey to a balanced life starts here.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-primary-400 transition-colors">How it Works</Link></li>
                            <li><Link to="/reviews" className="hover:text-primary-400 transition-colors">Reviews</Link></li>
                            <li><Link to="/safety" className="hover:text-primary-400 transition-colors">Safety & Security</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-primary-400 transition-colors">Careers</Link></li>
                            <li><Link to="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/faq" className="hover:text-primary-400 transition-colors">FAQ</Link></li>
                            <li><Link to="/crisis" className="hover:text-primary-400 transition-colors">Crisis Support</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                    <p className="flex items-center justify-center gap-1">
                        Made with <Heart size={12} className="text-red-500 fill-red-500" /> for a better mind.
                    </p>
                    <p className="mt-2">
                        &copy; {new Date().getFullYear()} Aletheia. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
