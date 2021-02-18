import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFoods } from '../api';

export const FoodList = () => {
	const [foods, setFoods] = useState([])	// Creamos una variable de estado para almacenar la información del alimentos y una función para actualizarla

	useEffect(() => {
		const fetchFoods = async () => {
			const foods = await getFoods();	// Llamamos a la API para obtener la información de los alimentos
			setFoods(foods);	// Actualizamos la información de nuestra variable de estado para que contenga la información del alimento
		}
		fetchFoods();	// Llamamos aparte a fetchFoods para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Lista de Alimentos</h3>	
				<table className="table table-stripped mt-3">
					<thead>
						<tr>
							<th>Nombre del alimento</th>
							<th>Tamaño de la ración</th>
							<th>Calorías</th>
							<th>Carbohidratos</th>
							<th>Proteinas</th>
							<th>Grasas</th>
						</tr>
					</thead>
					<tbody>
						{
							foods.map(food => (
								<tr key={food._id}>
									<td>
										{food.nombreAlimento}
									</td>
									<td>
										{food.tamRacion} {food.unidadesRacion}
									</td>
									<td>
										{food.nutrientesRacion.calorias}
									</td>
									<td>
										{food.nutrientesRacion.carbohidratos}
									</td>
									<td>
										{food.nutrientesRacion.proteinas}
									</td>
									<td>
										{food.nutrientesRacion.grasas}
									</td>
									<td>
										<Link to={`/edit/food/${food._id}`}>Editar</Link>
										<Link to={`/delete/food/${food._id}`}>Eliminar</Link>
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