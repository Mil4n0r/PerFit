import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

//import { TrackingSchema } from '../../schemas/tracking/TrackingSchema';

export const TrackingForm = ({ tracking, onSubmit }) => {

	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de seguimiento
		defaultValues: {
            trackingname: tracking ? tracking.nombrePlan : "",
			targetvalue: tracking ? tracking.valorObjetivo : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		//resolver: yupResolver(TrackingSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="text">
							Nombre del seguimiento:
						</label>
						<input className="form-control" ref={register} type="text" name="trackingname" id="trackingname" />
						<ErrorMessage errors={errors} name="trackingname" as="p" />
						<label htmlFor="text">
							Valor objetivo
						</label>
						<input className="form-control" ref={register} type="text" name="targetvalue" id="targetvalue" />
						<ErrorMessage errors={errors} name="targetvalue" as="p" />
						{
							tracking && (
								<Link to={`/associate/tracking/measure/${tracking._id}`}>Asociar medidas al seguimiento</Link>
							)
						}
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar seguimiento
						</button>
					</div>
				</form>
	);
}