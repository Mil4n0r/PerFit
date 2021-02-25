import React from 'react'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { yupResolver } from '@hookform/resolvers/yup';

import { UserSchema } from '../../schemas/user/UserSchema';

export const UserForm = ({ user, onSubmit }) => {
	
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		defaultValues: {
			alias: user ? user.userInfo.aliasUsuario : "",
			email: user ? user.userInfo.emailUsuario : "",
			name: user ? user.userInfo.datosPersonales.nombreUsuario : "",
			surname: user ? user.userInfo.datosPersonales.apellidosUsuario : "",
			dni: user ? user.userInfo.datosPersonales.dniUsuario : "",
			address: user ? user.userInfo.datosPersonales.direccionUsuario : "",
			telephone: user ? user.userInfo.datosPersonales.telefonoUsuario : "",
			birthdate: user.userInfo.datosPersonales.fechaNacUsuario ? user.userInfo.datosPersonales.fechaNacUsuario.substr(0,10) : "", // Ajustamos la fecha al formato del formulario
			role: user.userInfo.rolUsuario ? user.userInfo.rolUsuario : "",
			privacy: user.userInfo.privacidadUsuario ? user.userInfo.privacidadUsuario : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(UserSchema),
		criteriaMode: 'all',
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});
	
	return (
		<form onSubmit={submitHandler}>
			<div className="form-group">
				<label htmlFor="text">
					Nombre de usuario:
				</label>
				<input className="form-control" type="text" name="alias" id="alias"
				ref={
					register({})
				} 
				/>
				<ErrorMessage
					errors={errors} name="alias" render={
						({ messages }) =>
							messages &&
								Object.entries(messages).map(([typeArray, messageArray]) => (
									<div key={"alias " + typeArray}>
										{Array.isArray(messageArray) ? (
											messageArray.map((message, id) => <p key={"alias" + id}>{message}</p>)
										) : <p>{messageArray}</p>}
									</div>
								))
					}
				/>
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
				<label htmlFor="text">
					Rol:
				</label>
				<select className="form-control" type="text" name="role" id="role"
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
				<select className="form-control" type="text" name="privacy" id="privacy"
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
					Enviar
				</button>
			</div>
		</form>
	);
}