import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    return (
    <header className="ts-navbar">
        <div className="container-lg ts-navbar-inner">
        <Link to="/" className="ts-brand">
            <span className="ts-brand-icon">🎵</span>
            <span className="ts-brand-text">Cancionero Swiftie</span>
        </Link>

        <nav className="ts-nav-links">
            <NavLink
            end
            to="/"
            className={({ isActive }) =>
                'ts-nav-link' + (isActive ? ' active' : '')
            }
            >
            Inicio
            </NavLink>
            <NavLink
            to="/implementación"
            className={({ isActive }) =>
                'ts-nav-link' + (isActive ? ' active' : '')
            }
            >
            Implementación
            </NavLink>
        </nav>
        </div>
    </header>
    );
}

export default Navbar;
