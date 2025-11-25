import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Implementación from './components/Implementación.jsx';

function App() {
    return (
    <div className="app-shell">
        <Navbar />

        <main className="app-main">
        <div className="page-container">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/implementación" element={<Implementación />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
        </main>
    </div>
    );
}

export default App;
