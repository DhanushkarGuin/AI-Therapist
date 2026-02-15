import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Heart, Users, Globe, Shield, CheckCircle } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-primary-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Making professional therapy accessible, affordable, and convenient.
                    </h1>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-10">
                        Aletheia is the world's largest therapy platform. We change the way people get help with facing life's challenges by providing convenient, discreet, and affordable access to a licensed therapist.
                    </p>
                    <Link to="/signup">
                        <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 border-none text-white font-bold px-8 shadow-lg">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-display font-bold text-slate-900 mb-6">Our Mission</h2>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                Our mission is to make professional counseling accessible, affordable, and convenient - so anyone who struggles with life's challenges can get help, anytime, anywhere.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Aletheia combines advanced AI support with human professional care to ensure you always have someone to talk to, whether it's 2 AM or during your lunch break.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="p-6 bg-primary-50 border-none text-center">
                                <Users className="w-10 h-10 text-primary-600 mx-auto mb-4" />
                                <h3 className="font-bold text-slate-900">For Everyone</h3>
                                <p className="text-sm text-slate-500">Individuals, couples, and teens.</p>
                            </Card>
                            <Card className="p-6 bg-primary-50 border-none text-center">
                                <Globe className="w-10 h-10 text-primary-600 mx-auto mb-4" />
                                <h3 className="font-bold text-slate-900">Accessible</h3>
                                <p className="text-sm text-slate-500">Available worldwide, anytime.</p>
                            </Card>
                            <Card className="p-6 bg-primary-50 border-none text-center">
                                <Shield className="w-10 h-10 text-primary-600 mx-auto mb-4" />
                                <h3 className="font-bold text-slate-900">Secure</h3>
                                <p className="text-sm text-slate-500">Bank-grade encryption.</p>
                            </Card>
                            <Card className="p-6 bg-primary-50 border-none text-center">
                                <Heart className="w-10 h-10 text-primary-600 mx-auto mb-4" />
                                <h3 className="font-bold text-slate-900">Professional</h3>
                                <p className="text-sm text-slate-500">Licensed therapists.</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Section (Why Us?) */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-display font-bold text-center text-slate-900 mb-12">
                        Why choose Aletheia?
                    </h2>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="grid grid-cols-3 p-6 bg-slate-100 border-b border-slate-200 font-bold text-slate-700">
                            <div className="col-span-1">Feature</div>
                            <div className="col-span-1 text-center text-primary-700">Aletheia</div>
                            <div className="col-span-1 text-center text-slate-400">Traditional</div>
                        </div>

                        {[
                            "Instant AI Support 24/7",
                            "Licensed Therapist Access",
                            "Send Messages Anytime",
                            "Smart Mood Tracking",
                            "Affordable Flat Rate"
                        ].map((feature, i) => (
                            <div key={i} className="grid grid-cols-3 p-6 border-b border-slate-100 last:border-none items-center">
                                <div className="col-span-1 font-medium text-slate-700">{feature}</div>
                                <div className="col-span-1 flex justify-center text-primary-600"><CheckCircle size={20} className="fill-primary-100" /></div>
                                <div className="col-span-1 flex justify-center text-slate-300"><div className="w-4 h-4 bg-slate-200 rounded-full"></div></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
                        Ready to feel better?
                    </h2>
                    <p className="text-xl text-slate-600 mb-10">
                        Join the thousands of people who have taken the first step toward a happier life.
                    </p>
                    <Link to="/signup">
                        <Button size="lg" className="px-12 py-4 text-lg shadow-xl shadow-primary-500/20">
                            Get Matched Now
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;
