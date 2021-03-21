import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { DietSchema } from '../../schemas/diet/DietSchema';

const normalizeFloat = (value) => {
	const normalizedFloat = value.replace(",", ".")
	return normalizedFloat;
};

export const DietForm = ({ diet, onSubmit }) => {

	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			dietname: diet ? diet.nombrePlan : "",
			calories: diet ? diet.objetivoDiario.calorias : "",
			carbs: diet ? diet.objetivoDiario.carbohidratos : "",
			proteins: diet ? diet.objetivoDiario.proteinas : "",
			fats: diet ? diet.objetivoDiario.grasas : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		//resolver: yupResolver(DietSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="text">
							Nombre de la dieta
						</label>
						<input className="form-control" ref={register} type="text" name="dietname" id="dietname" />
						<ErrorMessage errors={errors} name="dietname" as="p" />
						<label htmlFor="text">
							Calorías
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
						{
							diet && (
								<Link to={`/associate/diet/meal/${diet._id}`}>Asociar comidas a la dieta</Link>
							)
						}
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar dieta
						</button>
					</div>
				</form>
	);
}