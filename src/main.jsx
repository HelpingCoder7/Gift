import React from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import GiftBoxPage from './pages/GiftBox';
import MusicPage from './pages/MusicPage';
import './index.css';

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-6xl font-bold text-white text-center mb-8 text-shadow"
      style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
    >
      {displayText}
    </motion.h1>
  );
};

const Sparkle = ({ x, y }) => {
  return (
    <motion.div
      className="sparkle"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        times: [0, 0.2, 1],
      }}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        position: 'absolute',
      }}
    />
  );
};

function LandingPage() {
  const [sparkles, setSparkles] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const createSparkle = () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const id = Date.now();
      setSparkles(prev => [...prev, { id, x, y }]);

      setTimeout(() => {
        setSparkles(prev => prev.filter(sparkle => sparkle.id !== id));
      }, 2000);
    };

    const interval = setInterval(createSparkle, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-purple-900 via-pink-800 to-pink-900">
      <div className="absolute inset-0">
        <AnimatePresence>
          {sparkles.map(sparkle => (
            <Sparkle key={sparkle.id} x={sparkle.x} y={sparkle.y} />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 text-center px-4">
        <TypewriterText text="Welcome to Your Special Day!" />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glow-button mt-8"
          onClick={() => navigate('/gift')}
        >
          Begin Your Journey
        </motion.button>
      </div>
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gift" element={<GiftBoxPage />} />
        <Route path="/music" element={<MusicPage />} />
      </Routes>
    </Router>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
