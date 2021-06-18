import * as yup from 'yup';

export const ResetPasswordSchema = yup.object().shape({
	password: yup.string()
		.matches(/^(?=.*[A-Z])/, "La contraseña debe contener al menos una letra mayúscula")
		.matches(/^(?=.*?[a-z])/, "La contraseña debe contener al menos una letra minúscula")
		.matches(/^(?=.*?[0-9])/, "La contraseña debe contener al menos un dígito")
		.matches(/^.{8,}$/, "La contraseña debe contener al menos 8 caracteres"),
	passwordConfirm: yup.string()
		.oneOf([yup.ref('password'), null], "Las contraseñas deben coincidir")
		.required("Por favor introduzca la contraseña de nuevo"),
});