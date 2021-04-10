import React from 'react'
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

//import { MeasureSchema } from '../../schemas/measure/MeasureSchema';

const formatDate = (date) => {
	const [year, month, day] = date.substr(0,10).split("-");
	return `${day}/${month}/${year}`;
}

export const MeasureForm = ({ measure, onSubmit }) => {
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de medida
		defaultValues: {
			measurevalue: measure ? measure.measureInfo.valorMedida : "",
			measuredate: measure ? measure.measureInfo.fechaMedida.substr(0,10): ""
		},	// Asignamos valores por defecto en caso de estar modificando
		//resolver: yupResolver(MeasureSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="text">
							Valor de la medida
						</label>
						<input className="form-control" ref={register} type="text" name="measurevalue" id="measurevalue" />
						<ErrorMessage errors={errors} name="measurevalue" as="p" />
						<label htmlFor="text">
							Fecha de la medida
						</label>
						<input className="form-control" ref={register} type="date" name="measuredate" id="measuredate" />
						<ErrorMessage errors={errors} name="measuredate" as="p" />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar medida
						</button>
					</div>
				</form>
	);
}