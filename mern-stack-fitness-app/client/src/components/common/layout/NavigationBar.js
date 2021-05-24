import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

import { LogOut } from '../../user/Logout';

import { Container, AppBar, Tab, Tabs, CircularProgress } from '@material-ui/core'

import { NavLink, NavBar, NavTab, NavTabs, NavProgress } from '../../../style/style';

/*
	<li className="navbar-item">
		<Link to="/create/routine" className="nav-link">Crear Rutina</Link>
	</li>
	<li className="navbar-item">
		<Link to="/create/diet" className="nav-link">Crear Dieta</Link>
	</li>
*/
function NavigationBar() {
	
	const { loggedIn } = useContext(AuthContext);

	const [tabs, setTabs] = useState([]);
	
	console.log(localStorage.getItem('tabIndex'))
	const initialValue = parseInt(localStorage.getItem('tabIndex')) || 0;
	const [value, setValue] = useState(initialValue);

	const handleChange = (event, value) => {
		let path = window.location.pathname;
		console.log("BUSCANDO PARA ", path)
		let tabIndex;
		tabs.map((tab) => {
			if(tab.props.to === path) {
				console.log("ASIGNANDO: " , tab.props.to , " -> ", tab.props.value)
				tabIndex = tab.props.value;
			}			
		})
		localStorage.setItem('tabIndex', tabIndex);
		console.log("AHORA?:", localStorage.getItem('tabIndex'))
		setValue(tabIndex);
		console.log("ENCONTRADO", tabIndex)
	}
	
	useEffect(() => {
		const fetchTabs = async () => {
			getTabs()
		}
		fetchTabs();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, [loggedIn]);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	const getTabs = () => {
		if(loggedIn) {
			setTabs([
				<NavTab key="home" label = "INICIO" to= "/" component = {NavLink} value = {0} />,
				<NavTab key="foodlist" label = "COMIDAS" to = "/food/list" component = {NavLink} value = {1} />,
				<NavTab key="createroom" label = "CREAR SALAS (ADMIN)" to = "/create/room" component = {NavLink} value = {2} />,
				<NavTab key="roomlist" label = "LISTAR SALAS" to = "/room/list" component = {NavLink} value = {3} />,
				<NavTab key="createsubscription" label = "CREAR SUSCRIPCIÓN (ADMIN)" to = "/create/subscription" component = {NavLink} value = {4} />,
				<NavTab key="subscriptionlist" label = "LISTAR SUSCRIPCIONES" to = "/subscription/list" component = {NavLink} value = {5} />,
				<NavTab key="activitylist" label = "ACTIVIDADES" to = "/activity/list" component = {NavLink} value = {6} />,
				<NavTab key="createclass" label = "CREAR CLASES (ADMIN)" to = "/create/class" component = {NavLink} value = {7} />,
				<NavTab key="classlist" label = "LISTAR CLASES" to = "/class/list" component = {NavLink} value = {8} />,
				<NavTab key="createexercise" label = "CREAR EJERCICIOS" to = "/create/exercise" component = {NavLink} value = {9} />,
				<NavTab key="exerciselist" label = "LISTAR EJERCICIOS" to = "/exercise/list" component = {NavLink} value = {10} />,
				<NavTab key="userlist" label = "LISTAR USUARIOS" to = "/user/list" component = {NavLink} value = {11} />,
				<NavTab key="myprofile" label = "MI PERFIL" to = {`/user/profile/${loggedIn._id}`} component = {NavLink} value = {12} />,
				<NavTab key="requestlist" label = "LISTAR SOLICITUDES" to = {`/request/list/${loggedIn._id}`} component = {NavLink} value = {13} />,
				<NavTab key="logout" label = "CERRAR SESIÓN" to = "/logout" component = {NavLink} value = {14} />,
			])
		}
		else {
			setTabs([
				<NavTab key="home" label = "INICIO" to= "/" component = {NavLink} value = {0} />,
				<NavTab key="login" label = "INICIAR SESIÓN" to = "/login" component = {NavLink} value = {1} />,
				<NavTab key="register" label = "REGISTRARSE" to = "/register/step/1" component = {NavLink} value = {2} />
			])
		}
	}

	return (
		<NavBar position="static">
			{
				loggedIn ? (
					<NavTabs indicatorColor='secondary' value={value} onClick={handleChange}>
						{tabs}
					</NavTabs>
				) :
					<NavProgress/>
			}
		</NavBar>
	);
}

export default NavigationBar;