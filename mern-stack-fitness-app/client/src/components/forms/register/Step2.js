import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import FormContext from '../../../context/FormContext';
import { RegisterSchema2 } from './schemas/RegisterSchema2';

export const Step2 = () => {
	const { data, getData } = useContext(FormContext);
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		defaultValues: { // Asignamos los valores previamente introducidos como valores por defecto
			name: data.name ? data.name : "",
			surname: data.surname ? data.surname : "",
			dni: data.dni ? data.dni : "",
			address: data.address ? data.address : "",
			telephone: data.telephone ? data.telephone : "",
			birthdate: data.birthdate ? data.birthdate.toISOString().substr(0,10) : "" // Ajustamos la fecha al formato del formulario
		},
		resolver: yupResolver(RegisterSchema2),
		criteriaMode: 'all',
		mode: "onTouched"
	});
	const history = useHistory();

	const onSubmit = (data) => {	// Pasamos los datos del formulario
		history.push("./3");
		getData(data);
	};

	return (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<h1>Datos personales</h1>
						<label htmlFor="text">
							Nombre:
						</label>
						<input className="form-control" type="text" name="name" id="name"
						ref={
							register({})
						} />
						<ErrorMessage errors={errors} name="name" as="p" />
						<label htmlFor="text">
							Apellidos:
						</label>
						<input className="form-control" type="text" name="surname" id="surname"
						ref={
							register({})
						} />
						<ErrorMessage errors={errors} name="surname" as="p" />
						<label htmlFor="text">
							DNI:
						</label>
						<input className="form-control" type="text" name="dni" id="dni"
						ref={
							register({})
						} />
						<ErrorMessage
							errors={errors} name="dni" render={
								({ messages }) =>
									messages &&
										Object.entries(messages).map(([typeArray, messageArray]) => (
											<div key={"dni " + typeArray}>
												{Array.isArray(messageArray) ? (
													messageArray.map((message, id) => <p key={"dni" + id}>{message}</p>)
												) : <p>{messageArray}</p>}
											</div>
										))
							}
						/>
						<label htmlFor="text">
							Dirección:
						</label>
						<input className="form-control" type="text" name="address" id="address"
						ref={
							register({})
						} />
						<ErrorMessage
							errors={errors} name="address" render={
								({ messages }) =>
									messages &&
										Object.entries(messages).map(([typeArray, messageArray]) => (
											<div key={"address " + typeArray}>
												{Array.isArray(messageArray) ? (
													messageArray.map((message, id) => <p key={"address" + id}>{message}</p>)
												) : <p>{messageArray}</p>}
											</div>
										))
							}
						/>
						<label htmlFor="text">
							Teléfono:
						</label>
						<input className="form-control" type="text" name="telephone" id="telephone"
						ref={
							register({})
						} />
						<ErrorMessage errors={errors} name="telephone" as="p" />
						<label htmlFor="text">
							Fecha de nacimiento:
						</label>
						<input className="form-control" type="date" name="birthdate" id="birthdate"
						ref={
							register({})
						} />
						<ErrorMessage errors={errors} name="birthdate" as="p" />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Siguiente
						</button>
					</div>
				</form>
	);
}