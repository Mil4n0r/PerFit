import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { WorkoutSchema } from '../../schemas/training/WorkoutSchema';

import { Button, Grid, Typography, List, ListItem, TextField } from '@material-ui/core';
import { HiddenTextField, FormContainer, FullWidthForm, ButtonsContainer, SelectWithMargin as Select, InputLabelWithMargin as InputLabel, TextFieldWithMargin } from '../../../../style/style';

const createArrayWithNumbers = (length) => {
	return Array.from({ length }, (_, k) => k);
}

export const WorkoutForm = ({ workout, exercise, onSubmit }) => {
	const [numberOfSets, setNumberOfSets] = useState(workout ? workout.numSeries : 0);

	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		defaultValues: {
			exercisepreview: workout ? workout.ejercicioEntrenamiento.nombreEjercicio : exercise ? exercise.exerciseInfo.nombreEjercicio : "",
			trainingexercise: workout ? workout.ejercicioEntrenamiento._id : exercise ? exercise.exerciseInfo._id : "",
			numberofseries: workout ? workout.numSeries : "",
		},	// Asignamos valores por defecto en caso de estar modificando
		resolver: yupResolver(WorkoutSchema),
		mode: "onTouched"
	});
	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});

	return (	
		<FormContainer>
			<FullWidthForm onSubmit={submitHandler}>
				<TextFieldWithMargin
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Ejercicio"
					type="text"
					name="exercisepreview"
					id="exercisepreview"
					disabled
				/>
				<HiddenTextField
					inputRef={register}
					fullWidth
					label="Ejercicio"
					type="text"
					name="trainingexercise"
					id="trainingexercise"
				/>
				<TextFieldWithMargin
					variant="outlined"
					inputRef={register}
					fullWidth
					label="Número de series"
					type="number"
					name="numberofseries"
					id="numberofseries"
					inputProps={{ min: "1", step: "1"}}
					onChange={(event) => setNumberOfSets(event.target.value)}
				/>
				<ErrorMessage className="error" errors={errors} name="numberofseries" as={Typography} />
				<List dense component="ol">
					{
						(
							createArrayWithNumbers(numberOfSets).map((index) => {
								return (
									<ListItem key={`serie ${index}`}>
										<Grid container spacing={2}>
											<Grid item xs>
												<TextField
													variant="standard"
													inputRef={register()}
													fullWidth
													label="Número de repeticiones"
													type="number"
													name={`numberofreps[${index}]`}
													id={`numberofreps[${index}]`}
													inputProps={{ min: "1", step: "1"}}
													defaultValue={workout ? workout.numRepeticiones[index] : ""}
												/>
												<ErrorMessage className="error" errors={errors} name={`numberofreps[${index}]`} as={Typography} />
											</Grid>
											<Grid item xs>
												<TextField
													variant="standard"
													inputRef={register()}
													fullWidth
													label="Pesos utilizados"
													type="number"
													name={`weightsused[${index}]`}
													id={`weightsused[${index}]`}
													inputProps={{ min: "0", step: "0.1"}}
													defaultValue={workout ? workout.pesosUtilizados[index] : ""}
												/>
											<ErrorMessage className="error" errors={errors} name={`weightsused[${index}]`} as={Typography} />
											</Grid>
										</Grid>
									</ListItem>
								)
							})
						)
					}
				</List>
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar series
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	)
}