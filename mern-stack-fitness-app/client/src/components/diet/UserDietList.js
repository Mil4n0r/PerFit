import React, { useState, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getDietsForUser } from '../../api';

const objectivesFormat = (o) => {
	const calories = o.calorias;
	const carbs = o.carbohidratos;
	const proteins = o.proteinas;
	const fats = o.grasas;

	return (
		<ul>
			<li>Calorías: {calories}</li>
			<li>Carbohidratos: {carbs}</li>
			<li>Proteinas: {proteins}</li>
			<li>Grasas: {fats}</li>
		</ul>
	)
}

export const UserDietList = () => {
	const [diets, setDiets] = useState([]);

	const match = useRouteMatch();
	
	useEffect(() => {
		const fetchDiets = async () => {
			const diets = await getDietsForUser(match.params.id);	// Llamamos a la API para obtener la información de los ejercicios
			setDiets(diets);	// Actualizamos la información de nuestra variable de estado para que contenga la información de los ejercicios
		}
		fetchDiets();	// Llamamos aparte a fetchRoutines para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Lista de Dietas</h3>	
				<table className="table table-stripped mt-3">
					<thead>
						<tr>
							<th>Nombre de la dieta</th>
							<th>Objetivo diario</th>
							<th>Usuario asociado a la dieta</th>
							<th>Acción</th>
						</tr>
					</thead>
					<tbody>
						{
							diets.map(diet => (
								<tr key={diet._id}>
									<td>
										{diet.nombrePlan}
									</td>
									<td>
										{objectivesFormat(diet.objetivoDiario)}
									</td>
									<td>
										{diet.usuarioPlan}
									</td>
									<td>
										<Link to={`/edit/diet/${diet._id}`}>Editar</Link>
										<Link to={`/delete/diet/${diet._id}`}>Eliminar</Link>
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