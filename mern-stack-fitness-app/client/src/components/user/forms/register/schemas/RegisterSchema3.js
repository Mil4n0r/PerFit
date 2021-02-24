import * as yup from 'yup';

export const RegisterSchema3 = yup.object().shape({
    role: yup.string()
        .required("Debe seleccionar un rol"),
    privacy: yup.string()
        .required("Debe seleccionar una política de privacidad")
});