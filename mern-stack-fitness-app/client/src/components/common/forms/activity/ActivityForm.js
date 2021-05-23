import React from 'react'
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

//import { ActivitySchema } from '../../schemas/activity/ActivitySchema';

export const ActivityForm = ({ activity, onSubmit }) => {
	
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			activityname: activity ? activity.activityInfo.nombreActividad : "",
			activityequipment: activity ? activity.activityInfo.equipamientoActividad : "",
			activitydescription: activity ? activity.activityInfo.descripcionActividad : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		//resolver: yupResolver(ActivitySchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="text">
							Nombre de la actividad:
						</label>
						<input className="form-control" ref={register} type="text" name="activityname" id="activityname" />
						<ErrorMessage errors={errors} name="activityname" as="p" />
						<label htmlFor="text">
							Equipamiento requerido:
						</label>
						<select className="form-control" type="text" name="activityequipment" id="activityequipment"
							ref={
								register({})
							}
						>
							<option value="Bicicletas">Bicicletas</option>
							<option value="Peso libre">Peso libre</option>
							<option value="Piscina">Piscina</option>
							<option value="Esterillas">Esterillas</option>
							<option value="Cintas de correr">Cintas de correr</option>
						</select>
						<ErrorMessage errors={errors} name="activityequipment" as="p" />
						<label htmlFor="text">
							Descripción:
						</label>
						<input className="form-control" ref={register} type="text" name="activitydescription" id="activitydescription" />
						<ErrorMessage errors={errors} name="activitydescription" as="p" />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar actividad
						</button>
					</div>
				</form>
	);
}