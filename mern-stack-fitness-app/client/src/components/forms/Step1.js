import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { joiResolver } from '@hookform/resolvers/joi';

import FormContext from '../../context/FormContext';
import { RegisterSchema1 } from './schemas/RegisterSchema1';

export const Step1 = () => {
	
	const { data, getData } = useContext(FormContext);
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		defaultValues: { 
			alias: data ? data.alias : "",
			email: data ? data.email : "",
			password: data ? data.password : "",
			passwordConfirm: data ? data.passwordConfirm : ""
		},
		resolver: joiResolver(RegisterSchema1),
		mode: "onTouched"
	});
	const history = useHistory();

	const onSubmit = (data) => {	// Pasamos los datos del formulario
		history.push("./2");
		getData(data);
	};

	return (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<h1>Datos de inicio de sesión</h1>
						<label htmlFor="text">
							Nombre de usuario:
						</label>
						<input className="form-control" type="text" name="alias" id="alias"
						ref={
							register({})
						} 
						/>
						<ErrorMessage errors={errors} name="alias" as="p" />
						<label htmlFor="text">
							Email de usuario:
						</label>
						<input className="form-control" type="text" name="email" id="email"
						ref={
							register({})
						} 
						/>
						<ErrorMessage errors={errors} name="email" as="p" />
						<label htmlFor="text">
							Contraseña:
						</label>
						<input className="form-control" type="password" name="password" id="password"
						ref={
							register({})
						}
						/>
						<ErrorMessage errors={errors} name="password" as="p" />
						<label htmlFor="text">
							Confirmar contraseña:
						</label>
						<input className="form-control" type="password" name="passwordConfirm" id="passwordConfirm" 
						ref={
							register({})
						}
						/>
						<ErrorMessage errors={errors} name="passwordConfirm" as="p" />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Siguiente
						</button>
					</div>
				</form>
	);
}