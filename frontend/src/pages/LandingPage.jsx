import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Heart, Shield, CheckCircle, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200 last:border-none">
            <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-medium text-slate-900">{question}</span>
                {isOpen ? <ChevronUp className="text-primary-600" /> : <ChevronDown className="text-slate-400" />}
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <p className="pb-6 text-slate-600 leading-relaxed">
                    {answer}
                </p>
            </motion.div>
        </div>
    );
};

const LandingPage = () => {
    const faqs = [
        {
            question: "What is Aletheia?",
            answer: "Aletheia is an AI-powered therapy platform that combines advanced artificial intelligence with professional human support. We provide a safe, judgment-free space for you to explore your thoughts and feelings, 24/7."
        },
        {
            question: "Who are the therapists?",
            answer: "Our human therapists are licensed, trained, appropriate, and experienced psychologists (PhD / PsyD), marriage and family therapists (LMFT), clinical social workers (LCSW / LMSW), or licensed professional counselors (LPC)."
        },
        {
            question: "Is it effective?",
            answer: "Yes. Research shows that online therapy can be as effective as in-person therapy for many mental health conditions. Our AI tools are based on Cognitive Behavioral Therapy (CBT) principles to help you build resilience."
        },
        {
            question: "How much does it cost?",
            answer: "We offer affordable monthly subscription plans starting at $60/week (billed every 4 weeks). This includes unlimited AI chat, mood tracking, and one live session with a professional therapist per week."
        },
        {
            question: "Is it secure and private?",
            answer: "Absolutely. We take your privacy seriously. All your data is encrypted with bank-grade security (256-bit SSL). You can also choose to remain anonymous with your therapist."
        },
        {
            question: "Can I cancel my subscription?",
            answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or hidden fees. You are in control of your journey."
        },
        {
            question: "How do I get started?",
            answer: "Simply click the 'Get Started' button, answer a few questions about yourself and your needs, and you'll be matched with the right tools and therapist for you."
        }
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider mb-6">
                            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                            Aletheia - AI Powered Therapist
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight">
                            Mental Wellness, <span className="text-primary-600">Simplified.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Your personal safe space for support, guidance, and growth.
                            Connect with AI-powered tools and professional therapists whenever you need them.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/signup">
                                <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                                    Get Started
                                </Button>
                            </Link>
                            <Link to="/about">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8">
                                    Learn More
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-primary-500" />
                                <span>Private & Secure</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-primary-500" />
                                <span>24/7 Availability</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-primary-500" />
                                <span>No Judgment</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to thrive</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            We provide a comprehensive suite of tools designed to help you understand your emotions and build resilience.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                        >
                            <Card className="p-8 border-none shadow-lg shadow-slate-200/50 bg-slate-50 hover:bg-white hover:-translate-y-1 transition-all duration-300">
                                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                                    <MessageSquare className="text-primary-600 w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">AI Companion</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Chat with our empathetic AI anytime, anywhere. It's trained to listen, support, and help you navigate life's challenges.
                                </p>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <Card className="p-8 border-none shadow-lg shadow-slate-200/50 bg-slate-50 hover:bg-white hover:-translate-y-1 transition-all duration-300">
                                <div className="w-14 h-14 bg-secondary-100 rounded-2xl flex items-center justify-center mb-6">
                                    <Heart className="text-secondary-600 w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Mood Tracking</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Understand your emotional patterns with our intuitive mood tracker. Gain insights into what triggers your feelings.
                                </p>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <Card className="p-8 border-none shadow-lg shadow-slate-200/50 bg-slate-50 hover:bg-white hover:-translate-y-1 transition-all duration-300">
                                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                                    <Shield className="text-blue-600 w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Professional Help</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Need more support? Seamlessly connect with licensed therapists who specialize in your specific needs.
                                </p>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Social Proof / Stats */}
            <section className="py-20 bg-primary-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                    >
                        <div>
                            <div className="text-4xl font-bold mb-2">10k+</div>
                            <div className="text-primary-200">Users Supported</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">24/7</div>
                            <div className="text-primary-200">Availability</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">4.9/5</div>
                            <div className="text-primary-200">Average Rating</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">100%</div>
                            <div className="text-primary-200">Private & Secure</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-3xl font-bold text-center text-slate-900 mb-16"
                    >
                        Stories of Growth
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card className="p-8 bg-white shadow-sm border border-slate-100">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-slate-700 mb-6 italic">
                                    "I was skeptical about talking to an AI, but it felt incredibly natural. It helped me organize my thoughts before my actual therapy sessions."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">SM</div>
                                    <div>
                                        <div className="font-bold text-slate-900">Sarah M.</div>
                                        <div className="text-xs text-slate-500">Student</div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card className="p-8 bg-white shadow-sm border border-slate-100">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-slate-700 mb-6 italic">
                                    "The mood tracking feature has been a game changer. I can finally see the patterns in my anxiety and address them proactively."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">DK</div>
                                    <div>
                                        <div className="font-bold text-slate-900">David K.</div>
                                        <div className="text-xs text-slate-500">Software Engineer</div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-3xl font-bold text-center text-slate-900 mb-12"
                    >
                        Frequently Asked Questions
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="space-y-2"
                    >
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to start your journey?</h2>
                        <p className="text-lg text-slate-600 mb-10">
                            Join thousands of others who are taking control of their mental well-being today.
                        </p>
                        <Link to="/signup">
                            <Button size="lg" className="text-lg px-10 shadow-xl shadow-primary-500/20">
                                Get Started for Free
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
