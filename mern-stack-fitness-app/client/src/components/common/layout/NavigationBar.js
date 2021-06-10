import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

import logo from '../../../images/Logo.png'

import { NavLink, NavBar, NavTab, NavTabs, NavProgress, HeaderContainer } from '../../../style/style';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import DirectionsBikeOutlinedIcon from '@material-ui/icons/DirectionsBikeOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import RestaurantMenuOutlinedIcon from '@material-ui/icons/RestaurantMenuOutlined';

function NavigationBar() {
	
	const { loggedIn } = useContext(AuthContext);

	const [tabs, setTabs] = useState([]);
	
	const initialValue = parseInt(localStorage.getItem('tabIndex')) || 0;

	const [value, setValue] = useState(initialValue);

	const handleChange = () => {
		let path = window.location.pathname;
		let tabIndex;
		tabs.map((tab) => {
			if(tab.props.to === path) {
				tabIndex = tab.props.value;
			}			
		})
		localStorage.setItem('tabIndex', tabIndex);
		setValue(tabIndex);
	}
	
	const getTabIndex = () => {
		const localTab = parseInt(localStorage.getItem('tabIndex'));
		if((!loggedIn && localTab <= 10) || (loggedIn && localTab > 10)) {// El usuario ha pasado de estar logeado a no logeado o viceversa
			setValue(0);
		}
		else
			setValue(localTab);
	}

	useEffect(() => {
		const fetchTabs = async () => {
			getTabs()
		}
		const fetchTabIndex = async () => {
			getTabIndex();
		}
		fetchTabs();
		fetchTabIndex();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, [loggedIn]);

	const getTabs = () => {
		console.log("LOGGED", loggedIn)
		if(loggedIn) {
			setTabs([
				<NavTab icon={<HomeOutlinedIcon/>} key="home" label = "INICIO" to= "/" component = {NavLink} value = {0} wrapped/>,
				<NavTab icon={<RestaurantMenuOutlinedIcon/>} key="foodlist" label = "ALIMENTOS" to = "/food/list" component = {NavLink} value = {1} wrapped/>,
				<NavTab icon={<MeetingRoomOutlinedIcon/>} key="roomlist" label = "SALAS" to = "/room/list" component = {NavLink} value = {2} wrapped/>,
				<NavTab icon={<AccountBalanceWalletOutlinedIcon/>} key="subscriptionlist" label = "SUSCRIPCIONES" to = "/subscription/list" component = {NavLink} value = {3} wrapped/>,
				<NavTab key="activitylist" label = "ACTIVIDADES" to = "/activity/list" component = {NavLink} value = {4} wrapped/>,
				<NavTab icon={<DirectionsBikeOutlinedIcon/>} key="classlist" label = "CLASES" to = "/class/list" component = {NavLink} value = {5} wrapped/>,
				<NavTab icon={<FitnessCenterOutlinedIcon/>} key="exerciselist" label = "EJERCICIOS" to = "/exercise/list" component = {NavLink} value = {6} wrapped/>,
				<NavTab icon={<GroupOutlinedIcon/>} key="userlist" label = "LISTAR USUARIOS" to = "/user/list" component = {NavLink} value = {7} wrapped/>,
				<NavTab icon={<PermIdentityOutlinedIcon/>} key="myprofile" label = "MI PERFIL" to = {`/user/profile/${loggedIn._id}`} component = {NavLink} value = {8} wrapped/>,
				<NavTab icon={loggedIn.peticionesPendientes.length > 0 ? <NotificationsActiveOutlinedIcon color='secondary'/> : <NotificationsOutlinedIcon/>} key="requestlist" label = "SOLICITUDES" to = {`/request/list/${loggedIn._id}`} component = {NavLink} value = {9} wrapped/>,
				<NavTab key="friendlist" label = "AMIGOS" to = {`/friend/list/${loggedIn._id}`} component = {NavLink} value = {10} wrapped/>,
				<NavTab key="clientlist" label = "ALUMNOS" to = {`/client/list/${loggedIn._id}`} component = {NavLink} value = {11} wrapped/>,
				<NavTab icon={<ExitToAppOutlinedIcon/>} key="logout" label = "CERRAR SESIÓN" to = "/logout" component = {NavLink} value = {12} wrapped/>
			])
		}
		else if(loggedIn === false) { // Evita problemas cuando loggedIn está sin definir
			setTabs([
				<NavTab key="home" label = "INICIO" to= "/" component = {NavLink} value = {0} />,
				<NavTab key="login" label = "INICIAR SESIÓN" to = "/login" component = {NavLink} value = {11} />,
				<NavTab key="register" label = "REGISTRARSE" to = "/register/step/1" component = {NavLink} value = {12} />
			])
		}
	}

	return (
		<NavBar position="static">
			<HeaderContainer>
				<img src={logo} alt="Logo" />
			</HeaderContainer>
			{
				
				loggedIn !== undefined ? (
					<NavTabs indicatorColor='secondary' value={value} onClick={handleChange} variant='scrollable'>
						{tabs}
					</NavTabs>
				) :
					<NavProgress/>
			}
		</NavBar>
	);
}

export default NavigationBar;