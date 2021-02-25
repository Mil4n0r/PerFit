import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import FormContext from '../../../../../context/FormContext';
import { RegisterSchema3 } from '../../../schemas/user/register/RegisterSchema3';

export const Step3 = () => {
	const { data, getData } = useContext(FormContext);
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		defaultValues: { 
			role: data ? data.role : "",
			privacy: data ? data.privacy : "",
		},
		resolver: yupResolver(RegisterSchema3),
		mode: "onTouched"
	});
	const history = useHistory();

	const onSubmit = (data) => {	// Pasamos los datos del formulario
		history.push("./confirm");
		getData(data);
	};

	return (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<h1>Datos personales</h1>
						<label htmlFor="text">
							Rol:
						</label>
						<select className="form-control" type="text" name="role" id="role" defaultValue={"socio"}
							ref={
								register({})
							}>
							<option value="socio">Socio</option>
							<option value="entrenador personal">Entrenador personal</option>
							<option value="monitor">Monitor</option>
							<option value="moderador">Moderador</option>
							<option value="admin">Administrador</option>
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
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Siguiente
						</button>
					</div>
				</form>
	);
}