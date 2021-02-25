import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link } from "react-router-dom";
import FormContext from '../../../../../context/FormContext';

export const StepConfirm = ({ onSubmit }) => {
	const { data } = useContext(FormContext);
	console.log(JSON.stringify(data))

	const submitHandler = (data) => {	// Pasamos los datos del formulario
		onSubmit(data);
	};

	return (
				<form onSubmit={(event)=>{
					event.preventDefault();
					submitHandler(data);
					}}>
					<div className="form-group">
						<p>
							{JSON.stringify(data)}
						</p>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Registrarse
						</button>
						<Link to={"./1"}>Volver a rellenar</Link>
					</div>
				</form>
	);
}