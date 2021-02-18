import React from 'react'
import { useForm } from 'react-hook-form';

export const FoodForm = ({ food, onSubmit }) => {
	
	const { register, handleSubmit } = useForm({	// Creamos el formulario de creación de usuario
		defaultValues: {
			foodname: food ? food.nombreAlimento : "",
			foodsize: food ? food.tamRacion : "",
			unit: food ? food.unidadesRacion : "",
			calories: food ? food.nutrientesRacion.calorias : "",
			carbs: food ? food.nutrientesRacion.carbohidratos : "",
			proteins: food ? food.nutrientesRacion.proteinas : "",
			fats: food ? food.nutrientesRacion.grasas : ""
		}	// Asignamos valores por defecto en caso de estar modificando
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
						<label htmlFor="text">
							Tamaño de la ración:
						</label>
						<input className="form-control" ref={register} type="text" name="foodsize" id="foodsize" />
						<input className="form-control" ref={register} type="text" name="unit" id="unit" placeholder="Unidad"/>
						<label htmlFor="text">
							Nutrientes:
						</label>
						<label htmlFor="text">
							Calorías:
						</label>
						<input className="form-control" ref={register} type="text" name="calories" id="calories" />
						<label htmlFor="text">
							Carbohidratos:
						</label>
						<input className="form-control" ref={register} type="text" name="carbs" id="carbs" />
						<label htmlFor="text">
							Proteinas:
						</label>
						<input className="form-control" ref={register} type="text" name="proteins" id="proteins" />
						<label htmlFor="text">
							Grasas:
						</label>
						<input className="form-control" ref={register} type="text" name="fats" id="fats" />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar alimento
						</button>
					</div>
				</form>
	);
}