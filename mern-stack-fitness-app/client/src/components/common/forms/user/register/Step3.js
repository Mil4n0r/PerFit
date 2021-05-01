import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import FormContext from '../../../../../context/FormContext';
import { RegisterSchema3 } from '../../../schemas/user/register/RegisterSchema3';

import { getSubscriptions } from '../../../../../api';

export const Step3 = () => {
	const { data, getData } = useContext(FormContext);
	const [subscriptions, setSubscriptions] = useState([])	// Creamos una variable de estado para almacenar la información de las suscripciones y una función para actualizarla
	const { register, errors, handleSubmit, watch } = useForm({	// Creamos el formulario de creación de usuario
		defaultValues: { 
			role: data ? data.role : "",
			privacy: data ? data.privacy : "",
		},
		resolver: yupResolver(RegisterSchema3),
		mode: "onTouched"
	});
	const role = watch("role");

	const history = useHistory();
	
	const onSubmit = (data) => {	// Pasamos los datos del formulario
		history.push("./confirm");
		getData(data);
	};

	useEffect(() => {
		const fetchSubscriptions = async () => {
			const subscriptions = await getSubscriptions();	// Llamamos a la API para obtener la información de las suscripciones
			setSubscriptions(subscriptions);	// Actualizamos la información de nuestra variable de estado para que contenga la información de las salas
		}
		fetchSubscriptions();
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<h1>Datos adicionales</h1>
						<label htmlFor="text">
							Rol:
						</label>
						<select className="form-control" type="text" name="role" id="role" defaultValue={"Miembro"}
							ref={
								register({})
							}>
							<option value="Miembro">Miembro</option>
							<option value="Entrenador">Entrenador personal</option>
							<option value="Monitor">Monitor</option>
							{/*<option value="moderador">Moderador</option>*/}
							<option value="Administrador">Administrador</option>
						</select>
						<ErrorMessage errors={errors} name="role" as="p" />
						<label htmlFor="text">
							Configuración de privacidad:
						</label>
						<select className="form-control" type="text" name="privacy" id="privacy" defaultValue={"publico"}
							ref={
								register({})
							}>
							<option value="publico">Público: Perfil visible para todo el mundo</option>
							<option value="solo amigos">Sólo amigos: Perfil visible para mi y para mis amigos</option>
							<option value="privado">Privado: Perfil visible sólo para mi</option>
						</select>
						<ErrorMessage errors={errors} name="privacy" as="p" />
					</div>
					{
						role === "Monitor" && (
							<>
								<label htmlFor="text">
									Especialidad:
								</label>
								<select className="form-control" type="text" name="specialty" id="specialty"
								ref={
									register({})
								}>
									<option value="bicicletas">Bicicletas</option>
									<option value="peso libre">Peso libre</option>
									<option value="piscina">Piscina</option>
									<option value="esterillas">Esterillas</option>
									<option value="cintas de correr">Cintas de correr</option>
								</select>
								<ErrorMessage errors={errors} name="specialty" as="p" />
							</>
						)
					}
					{
						role === "Miembro" && (
							<>
								<label htmlFor="text">
									Suscripción:
								</label>
								<select className="form-control" type="text" name="subscription" id="subscription"
								ref={
									register({})
								}>
								{
									subscriptions && ( 
										subscriptions.map(subscription => (
											<option key={subscription._id} value={subscription._id}>{subscription.nombreSuscripcion}</option>
										))
									)
								}
								{/* QUEREMOS MOSTRAR INFORMACIÓN DE LA SUSCRIPCIÓN AL HACER HOVER SOBRE ELLA */}
								</select>
								<ErrorMessage errors={errors} name="specialty" as="p" />
							</>
						)
					}
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Siguiente
						</button>
					</div>
				</form>
	);
}