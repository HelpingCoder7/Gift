import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { createGiftBox } from '../utils/createGiftBox';
import * as THREE from 'three';
import { motion } from 'framer-motion';


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
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth <= 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);
  
    useEffect(() => {
      if (isOpened && giftBox.current) {
        gsap.to(giftBox.current.rotation, {
          x: -Math.PI / 2,
          duration: 1.2,
          ease: 'back.inOut(1.7)',
        });
        gsap.to(giftBox.current.position, {
          y: 2,
          duration: 1,
          ease: 'power2.inOut',
          delay: 0.4,
        });
        gsap.delayedCall(1.8, onOpen);
      }
    }, [isOpened, onOpen]);
  
    return (
      <group
        ref={giftBox}
        scale={isMobile ? 0.6 : 1}
        position={isMobile ? [0, 0.5, 0] : [0, 1, 0]}
        onClick={() => !isOpened && setIsOpened(true)}
      >
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



function GiftBoxPage() {
  const navigate = useNavigate();

  const dummyImages = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        url: `/images/${i + 1}.jpeg`,
        quote: [
          "आज दिन बहुत खास हैं,बहन के लिए कुछ मेरे पास है,उसके सुकून के खातिर ओ बहना,तेरा भाई हमेशा तेरे आस – पास है।",
          'आसमान पर जितने सितारे हैं,आंखों में जितने इशारे हैं,समंदर के जितने किनारे है,उतने ही स्क्रू ढीलें तुम्हारे हैं।',
          'दूर रहना आपका हमसे सहा नहीं जाता,जुदा हो के आपसे हमसे रहा नहीं जाता,अब तो वापस लौट आईये हमारे पास,दिल का हाल अब किसी से कहा नहीं जाता।',

          'इन दूरियों की ना परवाह कीजिये,दिल करे जब हमे पुकार लीजिये,ज्यादा दूर नहीं हैं हम आपसे,बस एक कॉल करके हमे बुला लीजिये।',

          'तेरे और मेरे दिल का रिश्ता बहुत अजीब है,मीलों की है दूरियाँ फिर भी तू सबसे क़रीब है।',
          'मांगी थी एक दुआ हमने रब से देना एक प्यारी से बहन जो अलग हो सबसे,खुदा ने कर ली कबूल मेरी दुआ,और बोलै सम्भालो अपनी अमानत,जो अनमोल है सबसे',
        ][i],
      })),
    []
  );

  const handleContinue = () => {
    gsap.to('.relative', {
      opacity: 0,
      duration: 0.5,
      onComplete: () => navigate('/music'),
    });
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-purple-900 via-pink-800 to-pink-900 overflow-y-auto">
      <PhotosDisplay images={dummyImages} onContinue={handleContinue} />
    </div>
  );
}

function PhotosDisplay({ images, onContinue }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-4">
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
{images.map((image, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              className="relative w-full aspect-[3/4] rounded-2xl shadow-xl overflow-hidden cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <img
                src={image.url}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl"
              />

              {isActive && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-3 text-center text-white rounded-2xl transition-opacity duration-300">
                  <span className="text-xs sm:text-sm md:text-base font-semibold leading-snug">
                    {image.quote || `Memory ${index + 1}`}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glow-button mt-6 sm:mt-8 px-6 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg font-semibold text-white rounded-full border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        onClick={onContinue}
      >
        MAJA AAYA
      </motion.button>
      
    </div>
  );
}   
export default GiftBoxPage;

