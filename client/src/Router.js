import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './components/common/layout/Home';

import AdminActivityRoutes from './routes/admin/AdminActivityRoutes';
import AdminClassRoutes from './routes/admin/AdminClassRoutes';
import AdminRoomRoutes from './routes/admin/AdminRoomRoutes';
import AdminSubscriptionRoutes from './routes/admin/AdminSubscriptionRoutes';

import MonitorClassRoutes from './routes/admin/MonitorClassRoutes';

import ActivityRoutes from './routes/user/ActivityRoutes';
import AuthenticationProtectedRoutes from './routes/user/AuthenticationRoutes';
import ClassRoutes from './routes/user/ClassRoutes';
import DietRoutes from './routes/user/DietRoutes';
import ExerciseRoutes from './routes/user/ExerciseRoutes';
import FoodRoutes from './routes/user/FoodRoutes';
import MeasureRoutes from './routes/user/MeasureRoutes';
import MessageRoutes from './routes/user/MessageRoutes';
import RequestRoutes from './routes/user/RequestRoutes';
import RoomRoutes from './routes/user/RoomRoutes';
import RoutineRoutes from './routes/user/RoutineRoutes';
import SubscriptionRoutes from './routes/user/SubscriptionRoutes';
import TrackingRoutes from './routes/user/TrackingRoutes';
import UserRoutes from './routes/user/UserRoutes';

import AuthenticationRoutes from './routes/unprotected/AuthenticationUnprotectedRoutes';

import AuthContext from './context/AuthContext';

function Router() {

	const { loggedIn } = useContext(AuthContext);
	// DIFERENCIAR ENTRE 'Miembro', 'Entrenador', 'Monitor', 'Administrador'
	return(
		<div>
			<Switch>
				<Route exact path="/" component={ Home } />
				{
					loggedIn ? (
						<>
							{RoutineRoutes()}
							{DietRoutes()}
							{RoomRoutes()}
							{AuthenticationProtectedRoutes()}
							{UserRoutes()}
							{TrackingRoutes()}
							{SubscriptionRoutes()}
							{RequestRoutes()}
							{MessageRoutes()}
							{ActivityRoutes()}
							{ClassRoutes()}
							{ExerciseRoutes()}
							{FoodRoutes()}
							{MeasureRoutes()}
							{
								loggedIn.role === "Administrador" && (
									<>
										{AdminSubscriptionRoutes()}
										{AdminActivityRoutes()}
										{AdminClassRoutes()}
										{AdminRoomRoutes()}
									</>
								)
							}
							{
								loggedIn.role === "Monitor" && (
									<>
										{MonitorClassRoutes()}
									</>
								)
							}
						</>
					)
					: (
						<>
							{AuthenticationRoutes()}
						</>
					)
				}
			</Switch>
		</div>
	)
}

export default Router;