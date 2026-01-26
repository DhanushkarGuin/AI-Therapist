import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                            <span className="text-2xl">🌿</span>
                        </div>
                    </Link>
                    <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
                    <p className="mt-2 text-slate-600">
                        Sign in to continue your wellness journey
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    // MOCK LOGIN LOGIC
                    // For demo: default to client dashboard
                    navigate('/client-dashboard');
                }}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full px-4 py-3 rounded-lg border border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <Link to="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full px-4 py-3 rounded-lg border border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <Button type="submit" variant="primary" className="w-full justify-center h-12 text-lg">
                        Sign in
                    </Button>

                    <div className="text-center text-sm text-slate-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
                            Sign up for free
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
