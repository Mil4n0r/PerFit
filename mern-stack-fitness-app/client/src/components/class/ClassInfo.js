import React, {useState, useEffect} from 'react';
import { getClass } from '../../api';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
                    <p>Actividad: {sclass.actividadClase}</p>
					<p>Fecha: {sclass.diaClase}</p>
                    <p>Monitor: {sclass.monitorClase}</p>
					<p>Sala: {sclass.salaClase}</p>
                    <p>Asistentes: {sclass.asistentesClase}</p>
					{
						sclass.permission.includes('write') && (
							<Link to={`/edit/sclass/${sclass.classInfo._id}`}>Editar</Link>
						)
					}
					{
						sclass.permission.includes('delete') && (
							<Link to={`/delete/sclass/${sclass.classInfo._id}`}>Eliminar</Link>
						)
					}
				</>
			)
		}
	</>
	)
};