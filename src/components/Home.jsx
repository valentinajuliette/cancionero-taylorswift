import { Link } from 'react-router-dom';
import taylorImg from '../assets/taylor-bg.jpg';

function Home() {
    return (
    <section className="home-card shadow-soft">
        <p className="home-eyebrow">Proyecto Frontend · Taller 2</p>
        <h1 className="display-5 fw-bold mb-3">Cancionero Swiftie</h1>
        <p className="lead mb-4">
        Una aplicación web hecha con React para explorar la discografía completa
        de Taylor Swift, ordenarla cronológicamente, filtrar por álbum y ver los
        detalles y la letra de cada canción.
        </p>

        <div className="row g-4">
        <div className="col-md-6">
            <h2 className="h5 fw-semibold mb-2">Desarrolladora</h2>
            <ul className="mb-0">
            <li>Valentina Juliette Muñoz Rabanal</li>
            </ul>
        </div>

        <div className="col-md-6">
            <h2 className="h5 fw-semibold mb-2">Tecnologías utilizadas</h2>
            <ul className="mb-0">
            <li>React + Vite</li>
            <li>React Router</li>
            <li>PrimeReact (DataTable, Button, Dialog, Dropdown)</li>
            <li>Bootstrap 5</li>
            <li>Context API (patrón Provider) + capa de servicios</li>
            <li>Taylor Swift API</li>
            </ul>
        </div>
        </div>

        <div className="mt-4 d-flex gap-3 flex-wrap">
        <Link to="/implementación" className="btn ts-btn-primary">
            Ver Implementación
        </Link>
        </div>

        <div className="col-md-6">
            <br />
            <img src={taylorImg} alt="Taylor Swift" className="home-image" />
        </div>
    </section>
    );
}

export default Home;
