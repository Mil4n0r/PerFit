import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
//import { associateDiet } from '../../api';
import { deleteMeal, getDiet, getMeals } from '../../api';

const formatDate = (date) => {
	const [year, month, day] = date.substr(0,10).split("-");
	return `${day}/${month}/${year}`;
}

const mealFormat = (t) => {
	const mealname = t.nombreComida;
	const mealday = formatDate(t.diaComida);
	return (
		`Comida: ${mealname} - Día ${mealday}`
	)
}

export const AssociateMealToDiet = () => {
	const match = useRouteMatch();

	const [diet, setDiet] = useState();
	const [meals, setMeals] = useState();
	
	const [deleted, setDeleted] = useState();

	useEffect(() => {
		const fetchDiet = async () => {
			const diet = await getDiet(match.params.id);
			setDiet(diet);
		}
		fetchDiet();

		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	useEffect(() => {
		const fetchMeals = async () => {
			const meals = await getMeals(match.params.id);
			setMeals(meals);
		}
		fetchMeals();
	}, [deleted]);
	
	const deleteMealFromDiet = async (mealid) => {
		await deleteMeal(match.params.id, mealid); // Debemos borrar tanto la comida como su referencia en la dieta...
		setDeleted(mealid);
	}

	return (
		<>
			{
				diet && diet.comidasDieta && (
					<>
						<h3>Comidas asociadas</h3>
						<table className="table table-stripped mt-3">
							<thead>
								<tr>
									<th>Comida</th>
									<th>Acción</th>
								</tr>
							</thead>
							<tbody>
								{meals && meals.map((meal) => (
										<tr key={meal._id}>
											<td>
												{mealFormat(meal)}
											</td>
											<td>
												<Link to={`/edit/meal/${diet._id}/${meal._id}`}>Editar comida</Link>
												<button onClick={() => {
													deleteMealFromDiet(meal._id)
												}
												}>Eliminar de la dieta</button>
											</td>
										</tr>
										
									))
								}
							</tbody>
						</table>
					</>
				)
			}
			<Link to={`/create/meal/${match.params.id}`}>Añadir comidas</Link>			
		</>
	);
}

