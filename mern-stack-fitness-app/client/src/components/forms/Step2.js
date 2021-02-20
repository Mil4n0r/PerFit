import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { joiResolver } from '@hookform/resolvers/joi';

import FormContext from '../../context/FormContext';
import { RegisterSchema2 } from './schemas/RegisterSchema2';

export const Step2 = () => {
	
	const { data, getData } = useContext(FormContext);
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		defaultValues: { 
			name: data ? data.name : "",
			surname: data ? data.surname : "",
			dni: data ? data.dni : "",
			address: data ? data.address : "",
			telephone: data ? data.telephone : "",
			birthdate: data ? data.birthdate : "",
		},
		resolver: joiResolver(RegisterSchema2),
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
						<ErrorMessage errors={errors} name="dni" as="p" />
						<label htmlFor="text">
							Dirección:
						</label>
						<input className="form-control" type="text" name="address" id="address"
						ref={
							register({})
						} />
						<ErrorMessage errors={errors} name="address" as="p" />
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