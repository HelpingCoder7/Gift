import React from 'react';

const Spinner = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="loader"></div>
            <style jsx>{`
                .loader {
                    border: 8px solid rgba(255, 255, 255, 0.3);
                    border-top: 8px solid #fff;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Spinner; 