import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { getActivities, getUsers, getRooms } from '../../../../api';

//import Select from 'react-select';

//import { ClassSchema } from '../../schemas/class/ClassSchema';
/*
const normalizeFloat = (value) => {
	const normalizedFloat = value.replace(",", ".")
	return normalizedFloat;
};
*/
export const ClassForm = ({ sclass, onSubmit }) => {

	const [activities, setActivities] = useState([])	// Creamos una variable de estado para almacenar la información de las actividades y una función para actualizarlas
	const [users, setUsers] = useState([])
	const [rooms, setRooms] = useState([])

	useEffect(() => {
		const fetchActivities = async () => {
			const activities = await getActivities();	// Llamamos a la API para obtener la información de las actividades
			setActivities(activities);	// Actualizamos la información de nuestra variable de estado para que contenga la información de las actividades
		}
		const fetchUsers = async () => {
			const users = await getUsers();	// Llamamos a la API para obtener la información de los usuarios
			setUsers(users);	// Actualizamos la información de nuestra variable de estado para que contenga la información de los usuarios
		}
		const fetchRooms = async () => {
			const rooms = await getRooms();	// Llamamos a la API para obtener la información de las salas
			setRooms(rooms);	// Actualizamos la información de nuestra variable de estado para que contenga la información de las salas
		}
		fetchActivities();	// Llamamos aparte a fetchActivities para no hacer el useEffect completo asíncrono (práctica no recomendada)
		fetchUsers();	// Llamamos aparte a fetchActivities para no hacer el useEffect completo asíncrono (práctica no recomendada)
		fetchRooms();
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			classday: sclass ? sclass.diaClase : "",
			classmonitor: sclass ? sclass.classMonitor : "",
			classactivity: sclass ? sclass.actividadClase : "",
			classroom: sclass ? sclass.salaClase : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		//resolver: yupResolver(ClassSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="text">
							Actividad de la clase
						</label>
						<select className="form-control" type="text" name="classactivity" id="classactivity"
								ref={
									register({})
								}
						>
						{
							activities && ( 
								activities.map(activity => (
									<option value={activity._id}>{activity.nombreActividad}</option>
								))
							)
						}
						</select>
						<label htmlFor="text">
							Fecha de la clase
						</label>
						<input className="form-control" ref={register} type="date" name="classday" id="classday" />
						<ErrorMessage errors={errors} name="classday" as="p" />
						<label htmlFor="text">
							Monitor de la clase
						</label>
						<select className="form-control" type="text" name="classmonitor" id="classmonitor"
								ref={
									register({})
								}
						>
						{
							users && ( 
								users.map(user => (
									<option value={user._id}>{user.aliasUsuario}</option>
								))
							)
						}
						</select>
						<ErrorMessage errors={errors} name="classmonitor" as="p" />
						<label htmlFor="text">
							Sala de la clase
						</label>
						<select className="form-control" type="text" name="classroom" id="classroom"
								ref={
									register({})
								}
						>
						{
							rooms && ( 
								rooms.map(room => (
									<option value={room._id}>{room.nombreSala}</option>
								))
							)
						}
						</select>
						<ErrorMessage errors={errors} name="classroom" as="p" />
						{
							sclass && (
								<Link to={`/associate/class/user/???`}>Apuntarse a la clase</Link>
							)
						}
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar clase
						</button>
					</div>
				</form>
	);
}