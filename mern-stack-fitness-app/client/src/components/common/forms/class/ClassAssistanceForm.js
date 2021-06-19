import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import { getActivities, getUsers, getRooms } from '../../../../api';

import { Button, Grid, Typography, MenuItem, Chip, Switch, FormControlLabel, FormGroup } from '@material-ui/core';
import { FormContainer, FullWidthForm, ButtonsContainer, SelectWithMargin as Select, InputLabelWithMargin as InputLabel, TextFieldWithMargin as TextField } from '../../../../style/style';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

import { getMonitors } from '../../../../api/user_api';

export const ClassAssistanceForm = ({ sclass, onSubmit }) => {
	const { register, errors, handleSubmit } = useForm({	// Creamos el formulario de creación de ejercicio
		mode: "onTouched"
	});
	const submitHandler = handleSubmit((data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	});
	return (
		<FormContainer>
			<FullWidthForm onSubmit={submitHandler}>
				<FormGroup>
					{
						sclass.classInfo.asistentesClase.map(a => (
							<React.Fragment key={a._id}>
								<FormControlLabel
									control={
										<Switch
											inputRef={register()}
											name={`checkassistance[${a._id}]`}
											id={`checkassistance[${a._id}]`}
											color="primary"
											defaultChecked
										/>
									}
									name={`checkassistance[${a._id}]`}
									id={"checkassistance"}
									label={a.aliasUsuario}
								/>
								<ErrorMessage className="error" errors={errors} name={`checkassistance[${a._id}]`} as={Typography} />
							</React.Fragment>
						))
					}
				</FormGroup>
				<ButtonsContainer>
					<Button type="submit" variant="contained" color='primary'>
						Guardar asistencia
					</Button>
				</ButtonsContainer>
			</FullWidthForm>
		</FormContainer>
	);
}