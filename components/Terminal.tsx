import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal as TerminalIcon, X } from 'lucide-react';

const Terminal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>(['> SYSTEM_READY. TYPE "help" FOR COMMANDS.']);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();
        setHistory(prev => [...prev, `> ${input}`]);
        setInput('');

        switch (cmd) {
            case 'help':
                setHistory(prev => [...prev, 'AVAILABLE COMMANDS:', '  open arcade  - Access hidden realm', '  clear        - Clear terminal', '  exit         - Close terminal']);
                break;
            case 'open arcade':
                setHistory(prev => [...prev, 'ACCESSING ARCADE...']);
                setTimeout(() => {
                    setIsOpen(false);
                    navigate('/arcade');
                }, 1000);
                break;
            case 'clear':
                setHistory(['> SYSTEM_READY.']);
                break;
            case 'exit':
                setIsOpen(false);
                break;
            default:
                setHistory(prev => [...prev, `UNKNOWN COMMAND: "${cmd}". TYPE "help".`]);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-black border border-green-500 rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.3)] overflow-hidden font-mono">
                {/* Header */}
                <div className="bg-green-900/20 border-b border-green-500/50 p-2 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-green-500 text-sm">
                        <TerminalIcon className="w-4 h-4" />
                        <span>ROOT@KSHITIZ-PF:~</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-green-500 hover:text-green-400">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 h-80 overflow-y-auto custom-scrollbar bg-black/90 text-green-500 text-sm">
                    {history.map((line, i) => (
                        <div key={i} className="mb-1">{line}</div>
                    ))}
                    <form onSubmit={handleCommand} className="flex gap-2 mt-2">
                        <span className="text-green-400">$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="bg-transparent border-none outline-none flex-1 text-green-500 placeholder-green-800"
                            border-none focus:ring-0
                            autoFocus
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Terminal;
