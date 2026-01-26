import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const SignupPage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('client');
    const [passwordError, setPasswordError] = useState('');

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const password = e.target.password.value;

        if (!validatePassword(password)) {
            setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)');
            return;
        }

        setPasswordError('');

        // Mock Navigation
        if (role === 'client') {
            navigate('/client-dashboard');
        } else {
            navigate('/therapist-dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                            <span className="text-2xl">🌿</span>
                        </div>
                    </Link>
                    <h2 className="text-3xl font-bold text-slate-900">Create account</h2>
                    <p className="mt-2 text-slate-600">
                        Start your mental health journey today
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Role Selection */}
                    <div className="grid grid-cols-2 gap-4 p-1 bg-slate-100 rounded-xl">
                        <button
                            type="button"
                            onClick={() => setRole('client')}
                            className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${role === 'client'
                                ? 'bg-white text-primary-700 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Client
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('therapist')}
                            className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${role === 'therapist'
                                ? 'bg-white text-primary-700 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Therapist
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="block w-full px-4 py-3 rounded-lg border border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                placeholder="Enter your name"
                            />
                        </div>

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
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className={`block w-full px-4 py-3 rounded-lg border ${passwordError ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-primary-500'} placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                                placeholder="Create a strong password"
                            />
                            {passwordError && (
                                <p className="mt-2 text-sm text-red-600">
                                    {passwordError}
                                </p>
                            )}
                            <p className="mt-2 text-xs text-slate-500">
                                Must contain: Upper, Lower, Number, Special (!@#$%^&*)
                            </p>
                        </div>
                    </div>

                    <Button type="submit" variant="primary" className="w-full justify-center h-12 text-lg">
                        Create Account
                    </Button>

                    <div className="text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
