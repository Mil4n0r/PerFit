import React from 'react'
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { FoodSchema } from '../../schemas/food/FoodSchema';

const normalizeFloat = (value) => {
	const normalizedFloat = value.replace(",", ".")
	return normalizedFloat;
};

export const FoodForm = ({ food, onSubmit }) => {
	
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		defaultValues: {
			foodname: food ? food.foodInfo.nombreAlimento : "",
			foodsize: food ? food.foodInfo.tamRacion : "",
			unit: food ? food.foodInfo.unidadesRacion : "",
			calories: food ? food.foodInfo.nutrientesRacion.calorias : "",
			carbs: food ? food.foodInfo.nutrientesRacion.carbohidratos : "",
			proteins: food ? food.foodInfo.nutrientesRacion.proteinas : "",
			fats: food ? food.foodInfo.nutrientesRacion.grasas : ""
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(FoodSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="text">
							Nombre del alimento:
						</label>
						<input className="form-control" ref={register} type="text" name="foodname" id="foodname" />
						<ErrorMessage errors={errors} name="foodname" as="p" />
						<label htmlFor="text">
							Tamaño de la ración:
						</label>
						<input className="form-control" ref={register} type="text" name="foodsize" id="foodsize" />
						<ErrorMessage errors={errors} name="foodsize" as="p" />
						<input className="form-control" ref={register} type="text" name="unit" id="unit" placeholder="Unidad"/>
						<ErrorMessage errors={errors} name="unit" as="p" />
						<label htmlFor="text">
							Nutrientes:
						</label>
						<label htmlFor="text">
							Calorías:
						</label>
						<input className="form-control" ref={register} type="text" name="calories" id="calories" />
						<ErrorMessage errors={errors} name="calories" as="p" />
						<label htmlFor="text">
							Carbohidratos:
						</label>
						<input className="form-control" ref={register} type="text" name="carbs" id="carbs" onChange={(event) => {
							event.target.value = normalizeFloat(event.target.value);
						}}/>
						<ErrorMessage errors={errors} name="carbs" as="p" onChange={(event) => {
							event.target.value = normalizeFloat(event.target.value);
						}}/>
						<label htmlFor="text">
							Proteinas:
						</label>
						<input className="form-control" ref={register} type="text" name="proteins" id="proteins" onChange={(event) => {
							event.target.value = normalizeFloat(event.target.value);
						}}/>
						<ErrorMessage errors={errors} name="proteins" as="p" />
						<label htmlFor="text">
							Grasas:
						</label>
						<input className="form-control" ref={register} type="text" name="fats" id="fats" onChange={(event) => {
							event.target.value = normalizeFloat(event.target.value);
						}}/>
						<ErrorMessage errors={errors} name="fats" as="p" />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar alimento
						</button>
					</div>
				</form>
	);
}