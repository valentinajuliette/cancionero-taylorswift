import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { SongProvider } from './context/SongContext.jsx';

// Estilos globales
import './index.scss';

// PrimeReact
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter>
        <SongProvider>
        <App />
        </SongProvider>
    </BrowserRouter>
    </React.StrictMode>
);
