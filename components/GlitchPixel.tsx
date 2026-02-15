import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GlitchPixel: React.FC = () => {
    const [clicks, setClicks] = useState(0);
    const navigate = useNavigate();

    const handleClick = () => {
        const newClicks = clicks + 1;
        setClicks(newClicks);
        if (newClicks >= 3) {
            navigate('/arcade');
            setClicks(0);
        }
    };

    return (
        <>
            <div
                onClick={handleClick}
                className="w-2 h-2 rounded-full cursor-pointer transition-colors duration-200 relative group"
                title="?"
            >
                <span className="absolute inset-0 rounded-full bg-slate-400 dark:bg-slate-500 animate-breathe"></span>
                <span className="absolute inset-0 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-[2px]"></span>
            </div>
            <style>{`
                @keyframes breathe {
                    0%, 100% { transform: scale(1); opacity: 0.2; }
                    50% { transform: scale(1.5); opacity: 0.5; }
                }
                .animate-breathe {
                    animation: breathe 3s ease-in-out infinite;
                }
            `}</style>
        </>
    );
};

export default GlitchPixel;
