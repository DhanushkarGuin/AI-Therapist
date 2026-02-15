import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { User, HeartHandshake, Check, X } from 'lucide-react';

const SignupPage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('client');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        upper: false,
        lower: false,
        number: false,
        symbol: false
    });

    useEffect(() => {
        const pwd = formData.password;
        setPasswordCriteria({
            length: pwd.length >= 8,
            upper: /[A-Z]/.test(pwd),
            lower: /[a-z]/.test(pwd),
            number: /[0-9]/.test(pwd),
            symbol: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
        });
    }, [formData.password]);

    const isPasswordValid = Object.values(passwordCriteria).every(Boolean);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (!isPasswordValid) return;
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setIsLoading(true);

        // Simulate API call and redirect directly to dashboard
        setTimeout(() => {
            setIsLoading(false);
            // Direct redirection based on role
            if (role === 'therapist') {
                navigate('/therapist-dashboard');
            } else {
                navigate('/client-dashboard');
            }
        }, 1500);
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

            <div className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 mt-16">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-display font-bold text-slate-900">
                            Create an account
                        </h2>
                        <p className="mt-2 text-slate-600">
                            Start your journey with Aletheia.
                        </p>
                    </div>

                    <Card className="p-8 bg-white shadow-xl shadow-slate-200/50">
                        {/* Role Selection */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <button
                                type="button"
                                onClick={() => setRole('client')}
                                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${role === 'client'
                                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                                        : 'border-slate-200 hover:border-slate-300 text-slate-500'
                                    }`}
                            >
                                <User size={24} />
                                <span className="font-medium text-sm">I'm a Member</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('therapist')}
                                className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${role === 'therapist'
                                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                                        : 'border-slate-200 hover:border-slate-300 text-slate-500'
                                    }`}
                            >
                                <HeartHandshake size={24} />
                                <span className="font-medium text-sm">I'm a Therapist</span>
                            </button>
                        </div>

                        <form onSubmit={handleSignup} className="space-y-4">
                            <Input
                                label="Full Name"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Email address"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <div>
                                <Input
                                    label="Password"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="mt-3 grid grid-cols-2 gap-y-1 pl-1">
                                    <Criterion met={passwordCriteria.length} label="Min 8 chars" />
                                    <Criterion met={passwordCriteria.upper} label="Uppercase" />
                                    <Criterion met={passwordCriteria.lower} label="Lowercase" />
                                    <Criterion met={passwordCriteria.number} label="Number" />
                                    <Criterion met={passwordCriteria.symbol} label="Symbol (!@#$)" />
                                </div>
                            </div>

                            <Input
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    className="w-full text-lg shadow-lg shadow-primary-500/20"
                                    disabled={isLoading || !isPasswordValid}
                                >
                                    {isLoading ? 'Creating account...' : 'Create Account'}
                                </Button>
                            </div>
                        </form>

                        <div className="mt-8 text-center text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                                Log in
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
