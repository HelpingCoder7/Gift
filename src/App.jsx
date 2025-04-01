
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MusicPage from './pages/MusicPage';
import GiftSelectionPage from './pages/GiftSelectionPage';
import GiftBoxPage from './pages/GiftBox';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/gift" />} />
                <Route path="/gift" element={<GiftBoxPage />} />
                <Route path="/music" element={<MusicPage />} />
                <Route path="/gift-selection" element={<GiftSelectionPage />} />
            </Routes>
        </Router>
    );
}

export default App;
