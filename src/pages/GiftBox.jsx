import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { createGiftBox } from '../utils/createGiftBox';
import * as THREE from 'three';

function Lights() {
    return (
        <>
            <ambientLight intensity={0.4} />
            <spotLight position={[5, 10, 5]} angle={0.3} intensity={1.5} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.8} />
        </>
    );
}

function GiftBox({ onOpen }) {
    const giftBox = useRef();
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        if (isOpened && giftBox.current) {
            gsap.to(giftBox.current.rotation, { x: -Math.PI / 2, duration: 1.2, ease: 'back.inOut(1.7)' });
            gsap.to(giftBox.current.position, { y: 2, duration: 1, ease: 'power2.inOut', delay: 0.4 });
            gsap.delayedCall(1.8, onOpen);
        }
    }, [isOpened, onOpen]);

    return (
        <group ref={giftBox} onClick={() => !isOpened && setIsOpened(true)}>
            <primitive object={createGiftBox()} />
        </group>
    );
}

function CenterPhoto({ image }) {
    const photoRef = useRef();

    useEffect(() => {
        const element = photoRef.current;
        if (!element) return;

        // Initial setup
        gsap.set(element, {
            scale: 0,
            opacity: 0,
            y: 1000
        });

        // Animate in
        gsap.to(element, {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'back.out(1.7)',
            delay: 0.2
        });

        // Subtle floating animation
        gsap.to(element, {
            y: '+=8',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    }, []);

    return (
        <div
            ref={photoRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
            <img
                src={image}
                alt="Center Memory"
                className="w-28 h-40 md:w-32 md:h-48 object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                style={{
                    boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                }}
            />
        </div>
    );
}

function SidePhoto({ image, index }) {
    const photoRef = useRef();

    useEffect(() => {
        const element = photoRef.current;
        if (!element) return;

        // Set initial position
        gsap.set(element, {
            opacity: 0,
            scale: 0.8
        });

        // Animate in
        gsap.to(element, {
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 0.5 + (index * 0.2),
            ease: 'power3.out'
        });
    }, [index]);

    return (
        <div
            ref={photoRef}
            className="cursor-pointer"
        >
            <img
                src={image}
                alt={`Memory ${index + 1}`}
                className="w-20 h-32 md:w-24 md:h-36 object-cover rounded-lg shadow-xl hover:scale-110 transition-transform duration-300"
                style={{
                    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                }}
            />
        </div>
    );
}

function PhotosDisplay({ images, onContinue }) {
    const buttonRef = useRef();

    useEffect(() => {
        if (buttonRef.current) {
            gsap.from(buttonRef.current, {
                opacity: 0,
                y: 20,
                duration: 1,
                delay: 2,
                ease: 'power2.out'
            });
        }
    }, []);

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center p-2">

            {/* Image Grid */}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={image}
                            alt={`Memory ${index + 1}`}
                            className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg shadow-xl transition-transform duration-300 transform group-hover:scale-105"
                            style={{
                                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                            }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-lg font-semibold">Image {index + 1}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Continue Button */}

            <button
                ref={buttonRef}
                onClick={onContinue}
                className="mt-4 px-6 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-full 
                          shadow-lg hover:bg-white/20 transition-all duration-300 font-semibold text-base
                          border border-white/20 hover:scale-105"
            >
                Continue to Music ♪
            </button>

        </div>
    );
}


function GiftBoxPage() {
    const [showPhotos, setShowPhotos] = useState(false);
    const navigate = useNavigate();

    const dummyImages = useMemo(() =>
        Array.from({ length: 7 }, (_, i) => `https://picsum.photos/400/600?random=${i + 1}`)
        , []);

    const handleContinue = () => {
        // Fade out animation before navigation
        gsap.to('.relative', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => navigate('/music')
        });
    };

    return (
        <div className="relative w-full h-screen bg-gradient-to-b from-purple-900 via-pink-800 to-pink-900">
            {!showPhotos ? (
                <Canvas shadows camera={{ position: [0, 3, 6], fov: 50 }}>
                    <Suspense fallback={null}>
                        <Lights />
                        <GiftBox onOpen={() => setShowPhotos(true)} />
                        <OrbitControls
                            enableZoom={false}
                            minPolarAngle={Math.PI / 3}
                            maxPolarAngle={Math.PI / 2}
                            enablePan={false}
                            target={[0, 1, 0]}
                        />
                        <Environment preset="sunset" />
                        <fog attach="fog" args={['#000', 5, 15]} />
                    </Suspense>
                </Canvas>
            ) : (
                <PhotosDisplay images={dummyImages} onContinue={handleContinue} />
            )}
        </div>
    );
}

export default GiftBoxPage;

