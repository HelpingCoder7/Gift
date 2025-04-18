import React from 'react';
import ReactDOM from 'react-dom/client';
import {  AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GiftBoxPage from './pages/GiftBox';
import MusicPage from './pages/MusicPage';
import './index.css';
import LandingPage from './pages/Landingpage';
import GiftSelectionPage from './pages/GiftSelectionPage';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gift" element={<GiftBoxPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/gift-selection" element={<GiftSelectionPage />} />
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
