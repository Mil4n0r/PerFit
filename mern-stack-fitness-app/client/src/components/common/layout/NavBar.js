import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

import { LogOut } from '../../user/Logout';

/*
	<li className="navbar-item">
		<Link to="/create/routine" className="nav-link">Crear Rutina</Link>
	</li>
	<li className="navbar-item">
		<Link to="/create/diet" className="nav-link">Crear Dieta</Link>
	</li>
*/
function NavBar() {

	const { loggedIn } = useContext(AuthContext);
	// DIFERENCIAR ENTRE 'Miembro', 'Entrenador', 'Monitor', 'Administrador'

	return (
		<div>
			<nav className="navbar bg-light navbar-expand-lg navbar-light">
				<ul className="navbar-nav mr-auto">
					<li className="navbar-item">
						<Link to="/" className="nav-link">Home</Link>
					</li>
					{
						loggedIn && (//loggedIn.rol === "Miembro" && (
							<>
								{/*<li className="navbar-item">
									<Link to="/diet/list" className="nav-link">Lista de Dietas (QUITAR)</Link>
								</li>*/}
								<li className="navbar-item">
									<Link to="/create/food" className="nav-link">Crear Alimento</Link>
								</li>
								<li className="navbar-item">
									<Link to="/food/list" className="nav-link">Lista de Alimentos</Link>
								</li>
								<li className="navbar-item">
									<Link to="/create/room" className="nav-link">Crear Sala</Link>
								</li>
								<li className="navbar-item">
									<Link to="/room/list" className="nav-link">Lista de Salas</Link>
								</li>
								<li className="navbar-item">
									<Link to="/create/subscription" className="nav-link">Crear Suscripción</Link>
								</li>
								<li className="navbar-item">
									<Link to="/subscription/list" className="nav-link">Lista de Suscripciones</Link>
								</li>
								<li className="navbar-item">
									<Link to="/create/activity" className="nav-link">Crear Actividad (ADMIN)</Link>
								</li>
								<li className="navbar-item">
									<Link to="/activity/list" className="nav-link">Lista de Actividades</Link>
								</li>
								<li className="navbar-item">
									<Link to="/create/class" className="nav-link">Crear Clase (ADMIN)</Link>
								</li>
								<li className="navbar-item">
									<Link to="/class/list" className="nav-link">Lista de Clases</Link>
								</li>
								{/*<li className="navbar-item">
									<Link to="/routine/list" className="nav-link">Lista de Rutinas (QUITAR)</Link>
								</li>*/}
								<li className="navbar-item">
									<Link to="/create/exercise" className="nav-link">Crear Ejercicio</Link>
								</li>
								<li className="navbar-item">
									<Link to="/exercise/list" className="nav-link">Lista de Ejercicios</Link>
								</li>
								<li className="navbar-item">
									<Link to="/user/list" className="nav-link">Lista de Usuarios (ADMIN)</Link>
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