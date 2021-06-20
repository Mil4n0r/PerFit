import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

import logo from '../../../images/Logo.png'

import {Grid, Menu, MenuItem, Typography, Badge} from '@material-ui/core';
import { NavLink, NavBar, NavTab, NavTabs, NavProgress, HeaderContainer, AuxMenu, HorizontalGrid, HeaderGrid } from '../../../style/style';

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
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import AirplayOutlinedIcon from '@material-ui/icons/AirplayOutlined';
import SportsTennisOutlinedIcon from '@material-ui/icons/SportsTennisOutlined';

function NavigationBar() {
	
	const { loggedIn } = useContext(AuthContext);

	const [tabs, setTabs] = useState([]);
	
	const initialValue = parseInt(localStorage.getItem('tabIndex')) || 0;
	const [value, setValue] = useState(initialValue);

	const [openMenu, setOpenMenu] = useState(null);
	const [openControlMenu, setOpenControlMenu] = useState(null);

	const handleClickMenu = (e) => {
		setOpenMenu(e.currentTarget);
	}

	const handleCloseMenu = () => {
		setOpenMenu(null);
	};

	const handleClickControlMenu = (e) => {
		setOpenControlMenu(e.currentTarget);
	}

	const handleCloseControlMenu = () => {
		setOpenControlMenu(null);
	};

	const handleChange = () => {
		const path = window.location.pathname;
		const hash = window.location.hash;
		let tabIndex;
		tabs.map((tab) => {
			if(tab.props.to === path) {
				tabIndex = tab.props.value;
			} else {
				if(hash === "#control") {
					tabIndex = 5;
				} else if(hash === "#panel") {
					tabIndex = 8;
				}
			}
		})
		localStorage.setItem('tabIndex', tabIndex);
		setValue(tabIndex);
	}
	
	const getTabIndex = () => {
		const localTab = parseInt(localStorage.getItem('tabIndex'));
		if((!loggedIn && localTab >= 3) || (loggedIn && localTab < 3 && localTab > 0)) {// El usuario ha pasado de estar logeado a no logeado o viceversa
			setValue(0);
		}
		else
			setValue(localTab);
	}

	useEffect(() => {
		const fetchTabs = async () => {
			getTabs();
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
		var tabs;
		if(loggedIn) {
			tabs = [
				<NavTab icon={<HomeOutlinedIcon/>} key="home" label = {"INICIO"} to= "/" component = {NavLink} value = {0} wrapped/>,
				<NavTab icon={<DirectionsBikeOutlinedIcon/>} key="classlist" label = "CLASES" to = "/class/list" component = {NavLink} value = {3} wrapped/>,
				<NavTab icon={<AccountBalanceWalletOutlinedIcon/>} key="myplans" label = "PLANES" to = {`/user/plans/${loggedIn._id}`} component = {NavLink} value = {4} wrapped/>,
			]
			if(loggedIn.role === "Administrador") {
				tabs.push(<NavTab className="highlight" icon={<AirplayOutlinedIcon/>} key="control" label="GESTIÓN" to = "#control" onClick={handleClickControlMenu} component = {NavLink} value = {5} wrapped/>);
			}
			else if(loggedIn.role === "Entrenador") {
				tabs.push(<NavTab icon={<GroupOutlinedIcon/>}  key="clientlist" label = "ALUMNOS" to = {`/client/list/${loggedIn._id}`} component = {NavLink} value = {6} wrapped/>);
			}
			else if(loggedIn.role === "Monitor") {
				// METER GESTIÓN DE CLASES DIRIGIDAS
			}
			tabs.push(<NavTab className="highlight" icon={<PermIdentityOutlinedIcon/>} key="panel" label = "PANEL" to = "#panel" onClick={handleClickMenu} component = {NavLink} value = {8} wrapped/>);
		}
		else if(loggedIn === false) { // Evita problemas cuando loggedIn está sin definir
			tabs = [
				<NavTab key="home" label = "INICIO" to= "/" component = {NavLink} value = {0} />,
				<NavTab key="login" label = "INICIAR SESIÓN" to = "/login" component = {NavLink} value = {1} />,
				<NavTab key="register" label = "REGISTRARSE" to = "/register/step/1" component = {NavLink} value = {2} />
			]
		}
		setTabs(tabs);
	}

	return (
		<NavBar position="static">
			<HeaderGrid container spacing={1}>
				<HeaderGrid className="logo" item xs={4}>
					<img src={logo} alt="Logo" />
				</HeaderGrid>
				<HeaderGrid className="bar" item xs={8}>
					{
						loggedIn !== undefined && (
							<NavTabs indicatorColor='secondary' value={value} onClick={handleChange} variant='fullWidth' >
								{tabs}
							</NavTabs>
						)
					}
					<AuxMenu 
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
						open={Boolean(openMenu)}
						onClose={handleCloseMenu}
						getContentAnchorEl={null}
						anchorEl={openMenu}
					>
						{
							loggedIn && 
							[
								<MenuItem key="profileitem">
									<NavTab icon={<AccountBoxOutlinedIcon/>} key="myprofile" label = "PERFIL" to = {`/user/profile/${loggedIn._id}`} onClick={handleCloseMenu} component = {NavLink} value = {9} wrapped/>
								</MenuItem>,
								loggedIn.role === "Miembro" && (
									<MenuItem key="subscriptionitem">
										<NavTab icon={<StarBorderOutlinedIcon/>} key="subscriptionlist" label = "SUSCRIPCIONES" to = {`/subscription/list/${loggedIn._id}`} onClick={handleCloseMenu} component = {NavLink} value = {9} wrapped/>
									</MenuItem>
								),
								<MenuItem key="requestitem">
									<NavTab icon={loggedIn.peticionesPendientes.length > 0 ? <Badge badgeContent={loggedIn.peticionesPendientes.length} color="secondary"><NotificationsActiveOutlinedIcon color="secondary"/></Badge> : <NotificationsOutlinedIcon/>} key="requestlist" label = "SOLICITUDES" to = {`/request/list/${loggedIn._id}`} onClick={handleCloseMenu} component = {NavLink} value = {11} wrapped/>,
								</MenuItem>,
								<MenuItem key="frienditem">
									<NavTab icon={<GroupOutlinedIcon/>} key="friendlist" label = "AMIGOS" to = {`/friend/list/${loggedIn._id}`} onClick={handleCloseMenu} component = {NavLink} value = {12} wrapped/>,
								</MenuItem>,
								<MenuItem key="logoutitem">
									<NavTab icon={<ExitToAppOutlinedIcon/>} key="logout" label = "CERRAR SESIÓN" to = "/logout" onClick={handleCloseMenu} component = {NavLink} value = {13} wrapped/>,
								</MenuItem>,
								
							]
						}
					</AuxMenu>
					<AuxMenu 
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
						open={Boolean(openControlMenu)}
						onClose={handleCloseControlMenu}
						getContentAnchorEl={null}
						anchorEl={openControlMenu}
					>
						{
							loggedIn && 
							[
								<MenuItem key="useritem">
									<NavTab icon={<GroupOutlinedIcon/>} key="userlist" label = "USUARIOS" to = "/user/list" onClick={handleCloseControlMenu} component = {NavLink} value = {14} wrapped/>
								</MenuItem>,
								<MenuItem key="roomitem">
									<NavTab icon={<MeetingRoomOutlinedIcon/>} key="roomlist" label = "SALAS" to = "/room/list" onClick={handleCloseControlMenu} component = {NavLink} value = {15} wrapped/>
								</MenuItem>,
								<MenuItem key="activityitem">
									<NavTab icon={<SportsTennisOutlinedIcon/>} key="activitylist" label = "ACTIVIDADES" to = "/activity/list" onClick={handleCloseControlMenu} component = {NavLink} value = {16} wrapped/>
								</MenuItem>,
								<MenuItem key="subscriptionitem">
									<NavTab icon={<StarBorderOutlinedIcon/>} key="subscriptionlist" label = "SUSCRIPCIONES" to = "/subscription/list" onClick={handleCloseControlMenu} component = {NavLink} value = {9} wrapped/>
								</MenuItem>
							]
						}
					</AuxMenu>
				</HeaderGrid>
			</HeaderGrid>
		</NavBar>
	);
}

export default NavigationBar;
