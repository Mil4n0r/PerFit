import React, {useState, useEffect} from 'react';
import { getUser, updateUser } from '../../api'; 
import { useRouteMatch, useHistory } from "react-router-dom";
import { UserForm } from '../common/forms/user/UserForm';

import { BodyContainer, CustomTypography } from '../../style/style';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

export const EditUser = () => {
	const match = useRouteMatch();
	const [user, setUser] = useState();	// Creamos una variable de estado para almacenar la información del usuario y una función para actualizarla
	const [error, setError] = useState();
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
		const updatedUser = await updateUser(data, match.params.id);	// Llamamos a la API para modificar los datos del usuario
		if(updatedUser.response) {
			setError(updatedUser.response);
		}
		else {
			history.push(`/user/profile/${match.params.id}`);	// Redireccionamos al listado de usuarios
		}
	}

	return user ? (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Editar usuario
			</CustomTypography>
			<UserForm user={user} onSubmit={onSubmit} />
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	) : (
		<>
		</>
	);
};