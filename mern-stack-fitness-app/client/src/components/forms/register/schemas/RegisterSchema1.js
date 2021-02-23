import * as yup from 'yup';

export const RegisterSchema1 = yup.object().shape({
    alias: yup.string()
        .required("Por favor introduzca un nombre de usuario")
        .matches(/^([a-zA-Z0-9\-\_\.]+)$/, "El nombre de usuario debe constar únicamente de caracteres alfanuméricos, guiones (-), guiones bajos (_) y puntos (.)")
        .matches(/^.{3,16}$/, "El nombre de usuario debe ocupar entre 3 y 16 caracteres"),
    email: yup.string()
        .email("Por favor introduzca un email válido")
        .required("Por favor introduzca un email"),
    password: yup.string()
        .matches(/^(?=.*[A-Z])/, "La contraseña debe contener al menos una letra mayúscula")
        .matches(/^(?=.*?[a-z])/, "La contraseña debe contener al menos una letra minúscula")
        .matches(/^(?=.*?[0-9])/, "La contraseña debe contener al menos un dígito")
        .matches(/^.{8,}$/, "La contraseña debe contener al menos 8 caracteres"),

    passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null], "Las contraseñas deben coincidir")
        .required("Por favor introduzca la contraseña de nuevo")
});