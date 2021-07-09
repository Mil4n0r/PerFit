import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { getActivities, getUsers, getRooms } from '../../../../api';

import { Button, Grid, Typography, MenuItem, Chip } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, SelectWithMargin as Select, InputLabelWithMargin as InputLabel, TextFieldWithMargin as TextField } from '../../../../style/style';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

import { ClassSchema } from '../../schemas/class/ClassSchema'
import { getMonitors } from '../../../../api/user_api';

export const ClassForm = ({ sclass, onSubmit }) => {

	const [activities, setActivities] = useState([])	// Creamos una variable de estado para almacenar la información de las actividades y una función para actualizarlas
	const [users, setUsers] = useState([])
	const [monitors, setMonitors] = useState([])
	const [rooms, setRooms] = useState([])
	const [selectedDate, handleDateChange] = useState(new Date(localStorage.getItem('currentDate')) || new Date() );

	useEffect(() => {
		const setLocalStorageDate = async () => {
			localStorage.setItem('currentDate', selectedDate);
		}
		setLocalStorageDate();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, [selectedDate]);

	useEffect(() => {
		const fetchActivities = async () => {
			const activities = await getActivities();	// Llamamos a la API para obtener la información de las actividades
			setActivities(activities);	// Actualizamos la información de nuestra variable de estado para que contenga la información de las actividades
		}
		const fetchMonitors = async () => {
			const monitors = await getMonitors();	// Llamamos a la API para obtener la información de los usuarios
			setMonitors(monitors);	// Actualizamos la información de nuestra variable de estado para que contenga la información de los usuarios
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
		fetchMonitors();
		fetchRooms();
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	const { register, errors, handleSubmit, control } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			classday: sclass && sclass.classInfo ? sclass.classInfo.diaClase : selectedDate,
			classmonitor: sclass && sclass.classInfo.monitorClase  ? sclass.classInfo.monitorClase._id : "",
			classactivity: sclass && sclass.classInfo.actividadClase ? sclass.classInfo.actividadClase._id : "",
			classroom: sclass && sclass.classInfo.salaClase ? sclass.classInfo.salaClase._id : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(ClassSchema),
		mode: "onTouched"
	});
	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		handleDateChange(data.classday);
		onSubmit(data);
	});

	return (
		<FormContainer>
			<FullWidthForm onSubmit={submitHandler}>
				<InputLabel htmlFor="classactivity">
					Actividad de la clase
				</InputLabel>
				<Controller
					control={control}
					name="classactivity"
					id="classactivity"
					as={
						<Select
							variant="outlined"
							fullWidth
						>
							{
								activities && ( 
									activities.map(activity => (
										<MenuItem key={activity._id} value={activity._id}>{activity.nombreActividad}</MenuItem>
									))
								)
							}
						</Select>
					}
					defaultValue={[]}
				/>
				<ErrorMessage className="error" errors={errors} name="classactivity" as={Typography} />
				<InputLabel htmlFor="classday">
					Fecha de la clase
				</InputLabel>
				<Controller
					control={control}
					name="classday"
					id="classday"
					render={({ ref, ...rest }) => (
						<KeyboardDateTimePicker
							ampm={false}
							inputVariant="outlined"
							format="dd/MM/yyyy HH:mm"
							autoOk
							value={selectedDate}
							cancelLabel="Cancelar"
							{...rest}
						/>
					)}
				/>
				<ErrorMessage className="error" errors={errors} name="classday" as={Typography} />
				<InputLabel htmlFor="classmonitor">
					Monitor de la clase
				</InputLabel>
				<Controller
					control={control}
					name="classmonitor"
					id="classmonitor"
					as={
						<Select
							variant="outlined"
							fullWidth
						>
							{
								monitors && ( 
									monitors.map(monitor => (
										<MenuItem key={monitor._id} value={monitor._id}>{monitor.aliasUsuario}</MenuItem>
									))
								)
							}
						</Select>
					}
					defaultValue={[]}
				/>
				<ErrorMessage className="error" errors={errors} name="classmonitor" as={Typography} />
				<InputLabel htmlFor="classroom">
					Sala de la clase
				</InputLabel>
				<Controller
					control={control}
					name="classroom"
					id="classroom"
					as={
						<Select
							variant="outlined"
							fullWidth
						>
							{
								rooms && ( 
									rooms.map(room => (
										<MenuItem key={room._id} value={room._id}>{room.nombreSala}</MenuItem>
									))
								)
							}
						</Select>
					}
					defaultValue={[]}
				/>
				<ErrorMessage className="error" errors={errors} name="classroom" as={Typography} />
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar clase
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}