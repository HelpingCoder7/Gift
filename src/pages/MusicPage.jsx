import React, { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

function VinylRecord({ imageSrc }) {
    const vinylRef = useRef();

    useEffect(() => {
        if (vinylRef.current) {
            gsap.to(vinylRef.current, {
                rotation: 360,
                duration: 5,
                repeat: -1,
                ease: 'linear'
            });
        }
    }, []);

    return (
        <div className="relative flex items-center justify-center">
            <div ref={vinylRef} className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-black shadow-2xl border-4 border-gray-900 flex items-center justify-center overflow-hidden">
                <img
                    src={imageSrc}
                    alt="Album Art"
                    className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover border-2 border-gray-800"
                />
                <div className="absolute inset-0 rounded-full border border-gray-700"></div>
            </div>
        </div>
    );
}

function Message() {
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef.current) {
            gsap.from(messageRef.current, {
                opacity: 1,
                y: -20,
                duration: 1.5,
                delay: 0.5,
                ease: 'power2.out'
            });
        }
    }, []);

    return (
        <h1 ref={messageRef} className="text-white text-lg md:text-3xl font-bold text-center mb-4 drop-shadow-lg px-4">
            This song reminds me of you
        </h1>
    );
}

function MusicPage() {
    const containerRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (containerRef.current) {
            gsap.from(containerRef.current, {
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
        }
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-800 to-pink-900 flex flex-col items-center justify-center p-4">
            <Message />
            <VinylRecord imageSrc="https://picsum.photos/200" />
            <div className="w-full max-w-[280px] md:max-w-[320px] mt-6">
                <AudioPlayer
                    src="/songs/her++.mp3"
                    showJumpControls={false}
                    customProgressBarSection={[]}
                    customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                    className="rounded-lg shadow-2xl bg-white/30 backdrop-blur-md text-sm"
                    style={{ background: 'rgba(255, 255, 255, 0.15)', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)' }}
                    autoPlay
                    volume={0.8}
                />
            </div>
            <button
                onClick={() => navigate('/gift-selection')}
                className="mt-6 px-4 py-2 bg-white text-black rounded-lg shadow-lg hover:bg-gray-200 transition"
            >
                Take Me to the End
            </button>
        </div>
    );
}

export default MusicPage;
