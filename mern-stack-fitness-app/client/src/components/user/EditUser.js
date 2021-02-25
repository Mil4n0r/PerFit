import React, {useState, useEffect} from 'react';
import { getUser, updateUser } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { UserForm } from '../common/forms/user/UserForm';

export const EditUser = () => {
	const match = useRouteMatch();
	const [user, setUser] = useState();	// Creamos una variable de estado para almacenar la información del usuario y una función para actualizarla
	const history = useHistory();

	useEffect(() => {
		const fetchUser = async () => {
			const user = await getUser(match.params.id);	// Llamamos a la API para obtener la información del usuario
			setUser(user);	// Actualizamos la información de nuestra variable de estado para que contenga la información del usuario
		}
		fetchUser();	// Llamamos aparte a fetchUser para no hacer el useEffect completo asíncrono (práctica no recomendada)
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	const onSubmit = async (data) => {
		await updateUser(data, match.params.id);	// Llamamos a la API para modificar los datos del usuario
		history.push("/admin/list");	// Redireccionamos al listado de usuarios
	}

	return user ? (
		<div className="container">
			<div className="mt-3">
				<h3>Editar usuario</h3>
				<UserForm user={user} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<>
		</>
	);
};