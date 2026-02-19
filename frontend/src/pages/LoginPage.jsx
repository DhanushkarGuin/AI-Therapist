import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { User, HeartHandshake, Check } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('client');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Password Validation State
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        upper: false,
        lower: false,
        number: false,
        symbol: false
    });

    useEffect(() => {
        setPasswordCriteria({
            length: password.length >= 8,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        });
    }, [password]);

    const isPasswordValid = Object.values(passwordCriteria).every(Boolean);

    const handleLogin = (e) => {
        e.preventDefault();
        if (!isPasswordValid) return; // Prevent login if criteria not met

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);

            // Explicit redirection based on selected role
            if (role === 'therapist') {
                navigate('/therapist-dashboard');
            } else {
                navigate('/client-dashboard');
            }
        }, 1000);
    };

    const Criterion = ({ met, label }) => (
        <div className={`flex items-center gap-2 text-xs transition-colors ${met ? 'text-green-600' : 'text-slate-400'}`}>
            {met ? <Check size={12} /> : <div className="w-3 h-3 rounded-full border border-slate-300"></div>}
            <span>{label}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-display font-bold text-slate-900">
                            Welcome back
                        </h2>
                        <p className="mt-2 text-slate-600">
                            Please enter your details to sign in.
                        </p>
                    </div>

                    <Card className="p-8 bg-white shadow-xl shadow-slate-200/50">
                        {/* Role Selection */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <button
                                type="button"
                                onClick={() => setRole('client')}
                                className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition-all ${role === 'client'
                                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                                        : 'border-slate-200 hover:border-slate-300 text-slate-500'
                                    }`}
                            >
                                <User size={20} />
                                <span className="font-medium text-xs">Member</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('therapist')}
                                className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1 transition-all ${role === 'therapist'
                                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                                        : 'border-slate-200 hover:border-slate-300 text-slate-500'
                                    }`}
                            >
                                <HeartHandshake size={20} />
                                <span className="font-medium text-xs">Therapist</span>
                            </button>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <Input
                                label="Email address"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <div>
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {/* Password Criteria Indicators */}
                                <div className="mt-3 grid grid-cols-2 gap-y-1 pl-1">
                                    <Criterion met={passwordCriteria.length} label="Min 8 chars" />
                                    <Criterion met={passwordCriteria.upper} label="Uppercase" />
                                    <Criterion met={passwordCriteria.lower} label="Lowercase" />
                                    <Criterion met={passwordCriteria.number} label="Number" />
                                    <Criterion met={passwordCriteria.symbol} label="Symbol (!@#$)" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center text-slate-600 cursor-pointer">
                                    <input type="checkbox" className="mr-2 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                                    Remember me
                                </label>
                                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                                    Forgot password?
                                </a>
                            </div>

                            <Button
                                type="submit"
                                className="w-full text-lg shadow-lg shadow-primary-500/20"
                                disabled={isLoading || !isPasswordValid} // Button disabled if invalid
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </Button>
                        </form>

                        <div className="mt-8 text-center text-sm text-slate-500">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
                                Sign up for free
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
