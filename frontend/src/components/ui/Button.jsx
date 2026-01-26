import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
        secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-500",
        outline: "bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 focus:ring-primary-500",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-500",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
