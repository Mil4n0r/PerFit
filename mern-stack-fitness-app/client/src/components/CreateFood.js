import React from 'react';
import { useHistory } from 'react-router-dom';
import { createFood } from '../api';
import { FoodForm } from './forms/food/FoodForm';

export const CreateFood = () => {
	const history = useHistory();
	
	const onSubmit = async (data) => {
		await createFood(data);	// Llamamos a la API para crear el alimento
		history.push("/food/list");	// Redireccionamos al listado de alimentos
	};

	return (
		<div className="container">
			<div className="mt-3">
				<h3>Crear alimento</h3>
				<FoodForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}