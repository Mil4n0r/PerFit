import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Home } from './Home';
import { UserList } from './UserList';
import { CreateUser } from './CreateUser';
import { EditUser } from './EditUser';
import { DeleteUser } from './DeleteUser';
import { Login } from './Login';
import { Register } from './Register';
import { Profile } from './Profile';

// Estructura general de la aplicación
function App() {
	return (
		<div>
			<nav className="navbar bg-light navbar-expand-lg navbar-light">
				<ul className="navbar-nav mr-auto">
					<li className="navbar-item">
						<Link to="/list" className="nav-link">Lista de Usuarios</Link>
					</li>
					<li className="navbar-item">
						<Link to="/create" className="nav-link">Crear Usuario</Link>
					</li>
					<li className="navbar-item">
						<Link to="/login" className="nav-link">Login</Link>
					</li>
					<li className="navbar-item">
						<Link to="/register" className="nav-link">Registrarse</Link>
					</li>
					<li className="navbar-item">
						<Link to="/user/profile" className="nav-link">Perfil</Link>
					</li>
				</ul>
			</nav>
			<Switch>
				<Route exact path="/" component={ Home } />
				<Route exact path="/list" component={ UserList } />
				<Route path="/edit/:id" component={ EditUser } />
				<Route path="/create" component={ CreateUser } />
				<Route path="/delete/:id" component={ DeleteUser } />
				<Route path="/login" component={ Login } />
				<Route path="/register" component={ Register } />
				<Route path="/user/profile" component={ Profile } />
			</Switch>
		</div>
  );
}

export default App;
