import * as yup from 'yup';

export const ForgotPasswordSchema = yup.object().shape({
	email: yup.string()
		.email("Por favor introduzca un email válido")
		.required("Por favor introduzca un email")
});