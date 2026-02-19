import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
