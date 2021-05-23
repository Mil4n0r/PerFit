import React, {useState, useEffect} from 'react';
import { getClass } from '../../api';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const formatDate = (date) => {
	const [year, month, day] = date.substr(0,10).split("-");
	return `${day}/${month}/${year}`;
}

export const ClassInfo = () => {

	const match = useRouteMatch();
	const [sclass, setClass] = useState();

	useEffect(() => {
		const fetchClass = async () => {
			const sclass = await getClass(match.params.id);
			setClass(sclass);
		}
		fetchClass();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
	<>
		<h1>Clase</h1>
		{
			sclass && (
				<>
                    <p>Actividad: {sclass.classInfo.actividadClase.nombreActividad}</p>
					<p>Fecha: {formatDate(sclass.classInfo.diaClase)}</p>
                    <p>Monitor: {
									sclass.classInfo.monitorClase && (
										sclass.classInfo.monitorClase.aliasUsuario
									)
								}</p>
					<p>Sala: {sclass.classInfo.salaClase.nombreSala}</p>
                    <p>Asistentes: {sclass.classInfo.asistentesClase.aliasUsuario}</p>
					{
						sclass.classInfo.asistentesClase.map(user => (
							<li>{user.aliasUsuario}</li>
						))
					}
					{
						sclass.permission.includes('join') && (
							<Link to={`/join/class/${sclass.classInfo._id}`}>Unirse</Link>
						)
					}
					{
						sclass.permission.includes('leave') && (
							<Link to={`/leave/class/${sclass.classInfo._id}`}>Abandonar</Link>
						)
					}
					{
						sclass.permission.includes('write') && (
							<Link to={`/edit/class/${sclass.classInfo._id}`}>Editar</Link>
						)
					}
					{
						sclass.permission.includes('delete') && (
							<Link to={`/delete/class/${sclass.classInfo._id}`}>Eliminar</Link>
						)
					}
				</>
			)
		}
	</>
	)
};