import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MusicPage from './pages/MusicPage';
import GiftSelectionPage from './pages/GiftSelectionPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/music" />} />
                <Route path="/music" element={<MusicPage />} />
                <Route path="/gift-selection" element={<GiftSelectionPage />} />
            </Routes>
        </Router>
    );
}

export default App;
