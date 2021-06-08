import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { TrackingSchema } from '../../schemas/tracking/TrackingSchema';

import { Button, Typography, InputAdornment, Grid } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, TextFieldWithMargin as TextField } from '../../../../style/style';

export const TrackingForm = ({ tracking, onSubmit }) => {

	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de seguimiento
		defaultValues: {
            trackingname: tracking ? tracking.nombrePlan : "",
			targetvalue: tracking ? tracking.valorObjetivo : "",
			trackingunit: tracking ? tracking.unidadObjetivo : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(TrackingSchema),
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
					label="Nombre del seguimiento"
					type="text"
					name="trackingname"
					id="trackingname"
				/>
				<ErrorMessage errors={errors} name="trackingname" as={Typography} />
				<Grid container spacing={1}>
					<Grid item xs={8}>
						<TextField
							variant="outlined"
							inputRef={register}
							fullWidth
							label="Valor objetivo"
							type="number"
							name="targetvalue"
							id="targetvalue"
							inputProps={{ min: "0", step: "1"}}
						/>
						<ErrorMessage errors={errors} name="targetvalue" as={Typography} />
					</Grid>
					<Grid item xs={4}>
						<TextField
							variant="outlined"
							inputRef={register}
							fullWidth
							label="Unidades"
							type="text"
							name="trackingunit"
							id="trackingunit"
						/>
						<ErrorMessage errors={errors} name="trackingunit" as={Typography} />
					</Grid>
				</Grid>
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar seguimiento
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}