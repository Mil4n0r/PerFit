import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
    email: yup.string()
        .email("Por favor introduzca un email válido")
        .required("Por favor introduzca un email"),
    password: yup.string()
        .matches(/^(?=.*[A-Z])/, "La contraseña debe contener al menos una letra mayúscula")
        .matches(/^(?=.*?[a-z])/, "La contraseña debe contener al menos una letra minúscula")
        .matches(/^(?=.*?[0-9])/, "La contraseña debe contener al menos un dígito")
        .matches(/^.{8,}$/, "La contraseña debe contener al menos 8 caracteres"),
});