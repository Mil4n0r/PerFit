import React from 'react'
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

//import { SubscriptionSchema } from '../../schemas/subscription/SubscriptionSchema';

export const SubscriptionForm = ({ subscription, onSubmit }) => {
	
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			subscriptionname: subscription ? subscription.subscriptionInfo.nombreSuscripcion : "",
			subscriptiondescription: subscription ? subscription.subscriptionInfo.descripcionSuscripcion : "",
			subscriptioncost: subscription ? subscription.subscriptionInfo.costeSuscripcion : "",
			subscriptionend: subscription ? subscription.subscriptionInfo.vencimientoSuscripcion : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		//resolver: yupResolver(SubscriptionSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="text">
							Nombre de la suscripción:
						</label>
						<input className="form-control" ref={register} type="text" name="subscriptionname" id="subscriptionname" />
						<ErrorMessage errors={errors} name="subscriptionname" as="p" />
						<label htmlFor="text">
							Descripción de la suscripción:
						</label>
						<input className="form-control" ref={register} type="text" name="subscriptiondescription" id="subscriptiondescription" />
						<ErrorMessage errors={errors} name="subscriptiondescription" as="p" />
						<label htmlFor="text">
							Coste de la suscripción:
						</label>
						<input className="form-control" ref={register} type="number" name="subscriptioncost" id="subscriptioncost" />
						<ErrorMessage errors={errors} name="subscriptioncost" as="p" />
						<label htmlFor="text">
							Fecha de vencimiento de la suscripción:
						</label>
						<input className="form-control" ref={register} type="date" name="subscriptionend" id="subscriptionend" />
						<ErrorMessage errors={errors} name="subscriptionend" as="p" />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar suscripción
						</button>
					</div>
				</form>
	);
}