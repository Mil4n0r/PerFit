import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMeasures } from '../../api';

export const MeasureList = () => {
	const [measures, setMeasures] = useState([])	// Creamos una variable de estado para almacenar la información de las medidas y una función para actualizarla

	useEffect(() => {
		const fetchMeasures = async () => {
			const measures = await getMeasures();	// Llamamos a la API para obtener la información de las medidas
			setMeasures(measures);	// Actualizamos la información de nuestra variable de estado para que contenga la información de las medidas
		}
		fetchMeasures();	// Llamamos aparte a fetchExercises para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Lista de Medidas</h3>	
				<table className="table table-stripped mt-3">
					<thead>
						<tr>
							<th>Valor de la medida</th>
							<th>Fecha de la medida</th>
						</tr>
					</thead>
					<tbody>
						{
							measures.map(measure => (
								<tr key={measure._id}>
									<td>
										{measure.valorMedida}
									</td>
									<td>
										{measure.fechaMedida}
									</td>
									<td>
										<Link to={`/measure/info/${measure._id}`}>Ver</Link>
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