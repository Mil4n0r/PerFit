import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getFoods, getRations, deleteRation } from '../../api';

const nutrientsFormat = (n) => {
	const calories = n.calorias;
	const carbs = n.carbohidratos;
	const proteins = n.proteinas;
	const fats = n.grasas;

	return (
		<ul>
			<li>Calorías: {calories}</li>
			<li>Carbohidratos: {carbs}</li>
			<li>Proteinas: {proteins}</li>
			<li>Grasas: {fats}</li>
		</ul>
	)
}

const rationFormat = (r) => {
	const rations = r.numRaciones;
	const foodname = r.alimentoComida.nombreAlimento;
	const foodsize = r.alimentoComida.tamRacion;
	const foodunit = r.alimentoComida.unidadesRacion;
	const calories = r.alimentoComida.nutrientesRacion.calorias * rations;
	const carbs = r.alimentoComida.nutrientesRacion.carbohidratos * rations;
	const proteins = r.alimentoComida.nutrientesRacion.proteinas * rations;
	const fats = r.alimentoComida.nutrientesRacion.grasas * rations;
	
	return (
		<>
			<p>{foodname} ({rations} x {foodsize} {foodunit}):</p>
			<p>Nutrientes:</p>
			<ul>
				<li>Calorías: {calories}</li>
				<li>Carbohidratos: {carbs}</li>
				<li>Proteinas: {proteins}</li>
				<li>Grasas: {fats}</li>
			</ul>
		</>
	)
}

export const AssociateFoodsToMeal = () => {
	const match = useRouteMatch();

	const [foods, setFoods] = useState();
	const [rations, setRations] = useState();
	
	const [deleted, setDeleted] = useState(); // Permite recargar la lista de entrenamientos al borrar

	useEffect(() => {
		const fetchFoods = async () => {
			const foods = await getFoods();
			setFoods(foods);
		}
		fetchFoods();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	useEffect(() => {
		const fetchRations = async () => {
			const rations = await getRations(match.params.id);
			setRations(rations);
		}
		fetchRations();
	}, [deleted]);
	
	const deleteRationFromMeal = async (rationid) => {
		await deleteRation(match.params.id, rationid);
		setDeleted(rationid);
	}

	return (
		<>
			{
				rations && (
					<>
						<h3>Raciones asociadas</h3>
						<table className="table table-stripped mt-3">
							<thead>
								<tr>
									<th>Alimento</th>
									<th>Acción</th>
								</tr>
							</thead>
							<tbody>
								{
									rations.map(ration => (
										<tr key={ration._id}>
											<td>
												{rationFormat(ration)}
											</td>
											<td>
												<Link to={`/edit/ration/${match.params.id}/${ration._id}`}>Editar alimento</Link>
													<button onClick={async () => {
														deleteRationFromMeal(ration._id)
													}
												}>Eliminar de la comida</button>
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</>
				)
			}
			<h3>Alimentos disponibles</h3>
			<table className="table table-stripped mt-3">
				<thead>
					<tr>
						<th>Alimento</th>
						<th>Cantidad</th>
						<th>Nutrientes</th>
						<th>Acción</th>
					</tr>
				</thead>
				<tbody>
				{
					foods && ( 
						foods.map(food => (
							<tr key={food._id}>
								<td>
									{food.nombreAlimento}
								</td>
								<td>
									{food.tamRacion} x {food.unidadesRacion}
								</td>
								<td>
									{nutrientsFormat(food.nutrientesRacion)}
								</td>
								<td>
									<Link to={`/create/ration/${match.params.id}/${food._id}`}>Añadir alimento a la comida</Link>
								</td>
							</tr>
						))
					)
				}
				</tbody>
			</table>
		</>
	);
}
