import React from 'react'
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

//import { RoomSchema } from '../../schemas/room/RoomSchema';

export const RoomForm = ({ room, onSubmit }) => {
	
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			roomname: room ? room.roomInfo.nombreSala : "",
			roomequipment: room ? room.roomInfo.equipamientoSala : "",
			roomcapacity: room ? room.roomInfo.aforoSala : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		//resolver: yupResolver(RoomSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="text">
							Nombre de la sala:
						</label>
						<input className="form-control" ref={register} type="text" name="roomname" id="roomname" />
						<ErrorMessage errors={errors} name="roomname" as="p" />
						<label htmlFor="text">
							Equipamiento requerido:
						</label>
						<select className="form-control" type="text" name="roomequipment" id="roomequipment"
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
						<ErrorMessage errors={errors} name="roomequipment" as="p" />
						<label htmlFor="text">
							Aforo:
						</label>
						<input className="form-control" ref={register} type="number" name="roomcapacity" id="roomcapacity" />
						<ErrorMessage errors={errors} name="roomcapacity" as="p" />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Guardar sala
						</button>
					</div>
				</form>
	);
}