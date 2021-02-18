import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
//import UserContext from '../../context/UserContext';

import { LogOut } from '../Logout';

function NavBar() {

	const { loggedIn } = useContext(AuthContext);
	//const { user } = useContext(UserContext);
	// DIFERENCIAR ENTRE 'socio', 'entrenador_personal', 'monitor', 'moderador', 'admin'

	return(
		<div>
			<nav className="navbar bg-light navbar-expand-lg navbar-light">
				<ul className="navbar-nav mr-auto">
					<li className="navbar-item">
						<Link to="/" className="nav-link">Home</Link>
					</li>
					{
						loggedIn === "socio" && (
							<>
								<li className="navbar-item">
									<Link to="/create/food" className="nav-link">Crear Alimento</Link>
								</li>
								<li className="navbar-item">
									<Link to="/food/list" className="nav-link">Lista de Alimentos</Link>
								</li>
								<li className="navbar-item">
									<Link to="/admin/list" className="nav-link">Lista de Usuarios</Link>
								</li>
								<li className="navbar-item">
									<Link to={`/user/profile/${user}`} className="nav-link">Perfil</Link>
								</li>
								<li className="navbar-item">
									<LogOut/>
								</li>
							</>
						)
					}
					{
						loggedIn === false && (
							<>
								<li className="navbar-item">
									<Link to="/login" className="nav-link">Login</Link>
								</li>
								<li className="navbar-item">
									<Link to="/register" className="nav-link">Registrarse</Link>
								</li>
							</>
						)
					}
					
				</ul>
			</nav>
		</div>
	)
}

export default NavBar;