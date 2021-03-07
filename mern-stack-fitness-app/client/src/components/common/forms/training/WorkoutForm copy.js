import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { WorkoutSchema } from '../../schemas/training/WorkoutSchema';

const normalizeUnsigned = (value) => {
	return value > 10 ? 10 : value < 0 ? 0 : value
};

const createArrayWithNumbers = (length) => {
	return Array.from({ length }, (_, k) => k + 1);
}

export const WorkoutForm = ({ exercise, onSubmit }) => {

	const [size, setSize] = useState(0);
	/*
	useEffect(() => {
		const fetchSize = async () => {
			if(fields.length < size)
				append({})
			else if(fields.length > size)
				remove({})
        }
        fetchSize();
	});
	*/
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			exercisepreview: exercise ? exercise.nombreEjercicio : "",
			trainingexercise: exercise ? exercise._id : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		//resolver: yupResolver(WorkoutSchema),
		mode: "onTouched"
	});
	/*
	const { fields, append, remove } = useFieldArray(
		{
			control,
			name: "test"
		}
	);
	*/
	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (	
		<form onSubmit={submitHandler}>
			{
				//console.log(size)
			}
			<div className="form-group">
				<label htmlFor="text">
					Ejercicio
				</label>
				<input className="form-control" ref={register} type="text" name="exercisepreview" id="exercisepreview" disabled />
				<input className="form-control" ref={register} type="text" name="trainingexercise" id="trainingexercise" readOnly /><p>Hay que marcarlo como hidden</p>
				<label htmlFor="text">
					Número de series
				</label>
				<input className="form-control" ref={register} type="number" min="0" max="10" name="numberofseries" id="numberofseries"
					onChange={(event) => {
						event.target.value = normalizeUnsigned(event.target.value);
						setSize(event.target.value >= 0 ? event.target.value : 0);
					}
				}/>
				<ErrorMessage errors={errors} name="numberofseries" as="p" />
				<ol>
					{
						/*fields.map((item, index) => {
							return (
							<li key={item.id}>
								<input
									name={`test[${index}].numberofreps`}
									ref={register()}
									defaultValue={""}
									placeholder="Repeticiones"
								/>
								<input
									name={`test[${index}].weightsused`}
									ref={register()}
									defaultValue={""}
									placeholder="Pesos empleados"
								/>
							</li>
							)
						})*/
					}
					{
						createArrayWithNumbers(size).map((index) => {
							return (
							<li key={`serie ${index}`}>
								<input
									name={`serie[${index}].numberofreps`}
									ref={register()}
									defaultValue={""}
									placeholder="Repeticiones"
								/>
								<input
									name={`serie[${index}].weightsused`}
									ref={register()}
									defaultValue={""}
									placeholder="Pesos empleados"
								/>
								<ErrorMessage errors={errors} name={`serie[${index}].numberofreps`} as="p" />
								<ErrorMessage errors={errors} name={`serie[${index}].weightsused`} as="p" />
							</li>
							)
						})
					}
				</ol>
			</div>
			<div className="form-group">
				<button type="submit" className="btn btn-primary">
					Guardar entrenamiento
				</button>
			</div>
		</form>
	)
}