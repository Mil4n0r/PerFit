import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

import { LogOut } from '../../user/Logout';

function NavBar() {

	const { loggedIn } = useContext(AuthContext);
	// DIFERENCIAR ENTRE 'socio', 'entrenador_personal', 'monitor', 'moderador', 'admin'

	return (
		<div>
			<nav className="navbar bg-light navbar-expand-lg navbar-light">
				<ul className="navbar-nav mr-auto">
					<li className="navbar-item">
						<Link to="/" className="nav-link">Home</Link>
					</li>
					{
						loggedIn && (//loggedIn.rol === "socio" && (
							<>
								<li className="navbar-item">
									<Link to="/create/food" className="nav-link">Crear Alimento</Link>
								</li>
								<li className="navbar-item">
									<Link to="/food/list" className="nav-link">Lista de Alimentos</Link>
								</li>
								<li className="navbar-item">
									<Link to="/create/routine" className="nav-link">Crear Rutina</Link>
								</li>
								<li className="navbar-item">
									<Link to="/routine/list" className="nav-link">Lista de Rutinas</Link>
								</li>
								<li className="navbar-item">
									<Link to="/create/exercise" className="nav-link">Crear Ejercicio</Link>
								</li>
								<li className="navbar-item">
									<Link to="/exercise/list" className="nav-link">Lista de Ejercicios</Link>
								</li>
								<li className="navbar-item">
									<Link to="/user/list" className="nav-link">Lista de Usuarios</Link>
								</li>
								<li className="navbar-item">
									<Link to={`/user/profile/${loggedIn._id}`} className="nav-link">Perfil</Link>
								</li>
								<li className="navbar-item">
									<LogOut/>
								</li>
							</>
						)
					}
					{
						!loggedIn && (
							<>
								<li className="navbar-item">
									<Link to="/login" className="nav-link">Login</Link>
								</li>
								<li className="navbar-item">
									<Link to="/register/step/1" className="nav-link">Registrarse</Link>
								</li>
							</>
						)
					}
					
				</ul>
			</nav>
		</div>
	);
}

export default NavBar;