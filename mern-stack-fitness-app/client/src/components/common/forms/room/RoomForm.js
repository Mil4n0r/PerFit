import React from 'react'
import { useForm, Controller } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { RoomSchema } from '../../schemas/room/RoomSchema';

import { Button, Typography, MenuItem, Chip } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, SelectWithMargin as Select, InputLabelWithMargin as InputLabel, TextFieldWithMargin as TextField } from '../../../../style/style';

export const RoomForm = ({ room, onSubmit }) => {
	
	const { register, errors, handleSubmit, control } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			roomname: room ? room.roomInfo.nombreSala : "",
			roomequipment: room ? room.roomInfo.equipamientoSala : [],
			roomcapacity: room ? room.roomInfo.aforoSala : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(RoomSchema),
		mode: "onTouched"
	});

	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (
		<FormContainer>
			<FullWidthForm onSubmit={submitHandler}>
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Nombre de la sala"
					type="text"
					name="roomname"
					id="roomname"
				/>
				<ErrorMessage errors={errors} name="roomname" as={Typography} />
				<InputLabel htmlFor="roomequipment">
					Equipamiento requerido
				</InputLabel>
				<Controller
					control={control}
					name="roomequipment"
					id="roomequipment"
					as={
						<Select
							multiple
							variant="outlined"
							fullWidth
							renderValue={(selected) => (
								<>
								  {selected.map((value) => (
									<Chip key={value} label={value} />
								  ))}
								</>
							)}
						>
							<MenuItem value="Bicicletas">Bicicletas</MenuItem>
							<MenuItem value="Peso libre">Peso libre</MenuItem>
							<MenuItem value="Piscina">Piscina</MenuItem>
							<MenuItem value="Esterillas">Esterillas</MenuItem>
							<MenuItem value="Cintas de correr">Cintas de correr</MenuItem>
						</Select>
					}
					defaultValue={[]}
				/>
				<ErrorMessage errors={errors} name="roomequipment" as={Typography} />
				<TextField
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Aforo"
					type="number"
					name="roomcapacity"
					id="roomcapacity"
					inputProps={{ min: "1", step: "1"}}
				/>
				<ErrorMessage errors={errors} name="roomcapacity" as={Typography} />
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar sala
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}