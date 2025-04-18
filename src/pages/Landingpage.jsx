

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-3xl sm:text-5xl font-bold text-white text-center"
    >
      {displayText}
    </motion.h1>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-purple-900 via-pink-800 to-pink-900">

    
    
    {/* Text + Button */}
    
    <div className="relative z-10 text-center px-6 sm:px-8 max-w-md w-full">
      <TypewriterText text="AAAOO THODA MOOD FRESH KARE" />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glow-button mt-6 sm:mt-8 px-6 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg font-semibold text-white rounded-full border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        onClick={() => navigate('/gift')}
      >
        CHALOOOOO
      </motion.button>
    </div>
        </div>
    
  );
};

export default LandingPage;
