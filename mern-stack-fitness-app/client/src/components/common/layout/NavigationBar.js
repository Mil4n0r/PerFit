import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

import { LogOut } from '../../user/Logout';

import { Container, AppBar, Tab, Tabs } from '@material-ui/core'

import { NavLink, NavBar, NavTab, NavTabs } from '../../../style/style';

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
	// DIFERENCIAR ENTRE 'Miembro', 'Entrenador', 'Monitor', 'Administrador'

	const initialTabIndex = 0;

	const [value, setValue] = React.useState(initialTabIndex);

	const handleChange = (event, value) => {
		setValue(value);
	}

	var loggedInTabs = [];
	var loggedOutTabs = [];

	if(loggedIn) {
		loggedInTabs = [
			//<NavTab key="createfood" label = "CREAR COMIDAS" to = "/create/food" component = {NavLink} />,
			<NavTab key="foodlist" label = "COMIDAS" to = "/food/list" component = {NavLink} />,
			<NavTab key="createroom" label = "CREAR SALAS (ADMIN)" to = "/create/room" component = {NavLink} />,
			<NavTab key="roomlist" label = "LISTAR SALAS" to = "/room/list" component = {NavLink} />,
			<NavTab key="createsubscription" label = "CREAR SUSCRIPCIÓN (ADMIN)" to = "/create/subscription" component = {NavLink} />,
			<NavTab key="subscriptionlist" label = "LISTAR SUSCRIPCIONES" to = "/subscription/list" component = {NavLink} />,
			<NavTab key="createactivity" label = "CREAR ACTIVIDADES (ADMIN)" to = "/create/activity" component = {NavLink} />,
			<NavTab key="activitylist" label = "LISTAR ACTIVIDADES" to = "/activity/list" component = {NavLink} />,
			<NavTab key="createclass" label = "CREAR CLASES (ADMIN)" to = "/create/class" component = {NavLink} />,
			<NavTab key="classlist" label = "LISTAR CLASES" to = "/class/list" component = {NavLink} />,
			<NavTab key="createexercise" label = "CREAR EJERCICIOS" to = "/create/exercise" component = {NavLink} />,
			<NavTab key="exerciselist" label = "LISTAR EJERCICIOS" to = "/exercise/list" component = {NavLink} />,
			<NavTab key="userlist" label = "LISTAR USUARIOS" to = "/user/list" component = {NavLink} />,
			<NavTab key="myprofile" label = "MI PERFIL" to = {`/user/profile/${loggedIn._id}`} component = {NavLink} />,
			<NavTab key="requestlist" label = "LISTAR SOLICITUDES" to = {`/request/list/${loggedIn._id}`} component = {NavLink} />,
			<NavTab key="logout" label = "CERRAR SESIÓN" to = "/logout" component = {NavLink} />,
		]
	}
	else {
		loggedOutTabs = [
			<NavTab key="login" label = "INICIAR SESIÓN" to = "/login" component = {NavLink} />,
			<NavTab key="register" label = "REGISTRARSE" to = "/register/step/1" component = {NavLink} />
		]
	}
	return (
		<NavBar position="static">
			<NavTabs indicatorColor='secondary' value={value} onChange={handleChange}>
				<NavTab label = "INICIO" to= "/" component = {NavLink} />
				{loggedInTabs}
				{loggedOutTabs}
			</NavTabs>
		</NavBar>
	);
}

export default NavigationBar;