import React, {useState, useEffect} from 'react';
import { getFood } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const FoodInfo = () => {

	const match = useRouteMatch();
	const [food, setFood] = useState();

	useEffect(() => {
		const fetchFood = async () => {
			const food = await getFood(match.params.id);
			setFood(food);
		}
		fetchFood();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
	<>
		<h1>Alimento</h1>
		{
			food && (
				<>
					<p>Nombre: {food.foodInfo.nombreAlimento}</p>
					<p>Cantidad: {food.foodInfo.tamRacion}</p>
					<p>Unidad: {food.foodInfo.unidadesRacion}</p>
					<p>Calorías: {food.foodInfo.nutrientesRacion.calorias}</p>
					<p>Carbohidratos: {food.foodInfo.nutrientesRacion.carbohidratos}</p>
					<p>Proteinas: {food.foodInfo.nutrientesRacion.proteinas}</p>
					<p>Grasas: {food.foodInfo.nutrientesRacion.grasas}</p>
					{
						food.permission.includes('write') && (
							<Link to={`/edit/food/${food.foodInfo._id}`}>Editar</Link>
						)
					}
					{
						food.permission.includes('delete') && (
							<Link to={`/delete/food/${food.foodInfo._id}`}>Eliminar</Link>
						)
					}
				</>
			)
		}
	</>
	)
};