import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-300 via-teal-300 to-teal-400 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="text-center z-10 max-w-2xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-wider uppercase mb-6 drop-shadow-sm">
                        AI Therapist
                    </h1>
                    <p className="text-slate-700 font-medium text-xl md:text-2xl leading-relaxed max-w-lg mx-auto mb-12">
                        Personalized mental wellness support, <br className="hidden md:block" />
                        anytime you need it.
                    </p>

                    <motion.button
                        onClick={() => navigate('/signup')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-slate-900 text-white font-bold text-lg py-4 px-16 rounded-full shadow-2xl hover:bg-slate-800 transition-all duration-300"
                    >
                        Get started
                    </motion.button>
                </motion.div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-3xl"></div>
                <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] bg-teal-100/30 rounded-full blur-3xl"></div>
            </div>

        </div>
    );
};

export default LandingPage;
