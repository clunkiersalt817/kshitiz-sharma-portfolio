import React, { useEffect } from 'react';
import { Gamepad2, Headphones, Box, Terminal as TerminalIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Arcade: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-green-500 font-mono selection:bg-green-900 selection:text-white relative overflow-hidden">
            {/* Scanlines Effect */}
            <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20"></div>

            {/* CRT Flicker */}
            <div className="fixed inset-0 pointer-events-none z-50 animate-flicker"></div>

            <div className="container mx-auto px-6 py-12 relative z-10">

                {/* Header */}
                <div className="flex justify-between items-center mb-16 border-b border-green-900/50 pb-6">
                    <Link to="/" className="flex items-center gap-2 hover:text-green-400 transition-colors group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>RETURN_TO_BASE</span>
                    </Link>
                    <div className="flex items-center gap-2 text-xs md:text-sm">
                        <span className="animate-pulse">●</span>
                        <span>SYSTEM_ONLINE</span>
                    </div>
                </div>

                {/* Hero */}
                <div className="text-center mb-24">
                    <h1 className="text-4xl md:text-7xl font-bold mb-6 glitch-text tracking-tighter" data-text="THE_ARCADE">
                        THE_ARCADE
                    </h1>
                    <p className="max-w-xl mx-auto text-green-700 dark:text-green-700 text-lg">
                        &gt; Access Granted. Welcome to the hidden realm.<br />
                        &gt; Here lies the collection of virtual artifacts.
                    </p>
                </div>

                {/* Grid Sections */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Gaming Section */}
                    <div className="border border-green-900 bg-green-900/5 p-6 rounded-lg hover:border-green-500 transition-all group">
                        <Gamepad2 className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform text-green-500" />
                        <h2 className="text-2xl font-bold mb-4">&gt; GAMING_LOGS</h2>
                        <div className="space-y-4 text-sm text-green-700">
                            <div className="flex justify-between border-b border-green-900/30 pb-2">
                                <span>STATUS</span>
                                <span className="text-green-500">ACTIVE</span>
                            </div>
                            <p>Steam, Ubisoft, and EA stats loading...</p>
                            <button className="w-full py-2 bg-green-900/20 hover:bg-green-500/20 border border-green-900 hover:border-green-500 transition-all mt-4 text-xs font-bold uppercase tracking-widest">
                                CONNECT_SERVICE
                            </button>
                        </div>
                    </div>

                    {/* Music Section */}
                    <div className="border border-green-900 bg-green-900/5 p-6 rounded-lg hover:border-green-500 transition-all group">
                        <Headphones className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform text-green-500" />
                        <h2 className="text-2xl font-bold mb-4">&gt; AUDIO_WAVES</h2>
                        <div className="space-y-4 text-sm text-green-700">
                            <div className="flex justify-between border-b border-green-900/30 pb-2">
                                <span>FREQUENCY</span>
                                <span className="text-green-500">HI-FI</span>
                            </div>
                            <p>Curated playlists and soundscapes.</p>
                            {/* Placeholder for Spotify Embed */}
                            <div className="w-full h-32 bg-black/50 border border-green-900/50 flex items-center justify-center">
                                <span className="animate-pulse text-xs">[SPOTIFY_WIDGET_LOADING]</span>
                            </div>
                        </div>
                    </div>

                    {/* 3D Art Section */}
                    <div className="border border-green-900 bg-green-900/5 p-6 rounded-lg hover:border-green-500 transition-all group">
                        <Box className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform text-green-500" />
                        <h2 className="text-2xl font-bold mb-4">&gt; RENDER_CACHE</h2>
                        <div className="space-y-4 text-sm text-green-700">
                            <div className="flex justify-between border-b border-green-900/30 pb-2">
                                <span>ENGINE</span>
                                <span className="text-green-500">BLENDER</span>
                            </div>
                            <p>3D modeling and animation showcase.</p>
                            <button className="w-full py-2 bg-green-900/20 hover:bg-green-500/20 border border-green-900 hover:border-green-500 transition-all mt-4 text-xs font-bold uppercase tracking-widest">
                                VIEW_GALLERY
                            </button>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="mt-20 text-center text-green-900 text-xs">
                    ID: USER_AUTH_KSHITIZ_PF // SECURE_CONNECTION
                </div>

            </div>

            <style>{`
        @keyframes flicker {
          0% { opacity: 0.97; }
          5% { opacity: 0.95; }
          10% { opacity: 0.9; }
          15.1% { opacity: 0.95; }
          20% { opacity: 0.99; }
          25% { opacity: 0.95; }
          30% { opacity: 0.9; }
          30.1% { opacity: 1; }
          35% { opacity: 0.96; }
          40% { opacity: 0.98; }
          100% { opacity: 0.94; }
        }
        .animate-flicker {
          animation: flicker 0.15s infinite;
        }
        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 #00ff00;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim-1 5s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: -1px 0 #ff00ff;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim-2 5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim-1 {
          0% { clip: rect(20px, 9999px, 81px, 0); }
          20% { clip: rect(68px, 9999px, 8px, 0); }
          40% { clip: rect(10px, 9999px, 64px, 0); }
          60% { clip: rect(54px, 9999px, 59px, 0); }
          80% { clip: rect(31px, 9999px, 32px, 0); }
          100% { clip: rect(74px, 9999px, 20px, 0); }
        }
        @keyframes glitch-anim-2 {
          0% { clip: rect(65px, 9999px, 94px, 0); }
          20% { clip: rect(46px, 9999px, 3px, 0); }
          40% { clip: rect(24px, 9999px, 75px, 0); }
          60% { clip: rect(2px, 9999px, 25px, 0); }
          80% { clip: rect(81px, 9999px, 56px, 0); }
          100% { clip: rect(48px, 9999px, 90px, 0); }
        }
      `}</style>
        </div>
    );
};

export default Arcade;
