import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClasses } from '../../api';

export const ClassList = () => {
	const [classes, setClasses] = useState([])	// Creamos una variable de estado para almacenar la información de las clases y una función para actualizarla

	useEffect(() => {
		const fetchClasses = async () => {
			const classes = await getClasses();	// Llamamos a la API para obtener la información de las clases
			setClasses(classes);	// Actualizamos la información de nuestra variable de estado para que contenga la información de los ejercicios
		}
		fetchClasses();	// Llamamos aparte a fetchClasses para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Lista de Clases</h3>	
				<table className="table table-stripped mt-3">
					<thead>
						<tr>
							<th>Actividad de la clase</th>
							<th>Fecha y hora de la clase</th>
							<th>Monitor de la clase</th>
							<th>Sala de la clase</th>
							<th>Asistentes de la clase</th>
							<th>Acción</th>
						</tr>
					</thead>
					<tbody>
						{
							classes.map(sclass => (
								<tr key={sclass._id}>
									<td>
										{sclass.actividadClase}
									</td>
									<td>
										{sclass.diaClase}
									</td>
									<td>
										{sclass.monitorClase}
									</td>
									<td>
										{sclass.salaClase}
									</td>
									<td>
										{sclass.asistentesClase}
									</td>
									<td>
										<Link to={`/edit/class/${sclass._id}`}>Editar</Link>
										<Link to={`/delete/class/${sclass._id}`}>Eliminar</Link>
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</div>
	);
}