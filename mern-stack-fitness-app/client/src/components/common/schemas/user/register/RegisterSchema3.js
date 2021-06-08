import * as yup from 'yup';

export const RegisterSchema3 = yup.object().shape({
	role: yup.string()
		.required("Debe seleccionar un rol"),
	privacy: yup.string()
		.required("Debe seleccionar una política de privacidad"),
	specialty: yup.array()
		.when('role', {
			is: "Monitor",
			then: yup.array()
				.of(yup.string()
					.required("Los monitores deben seleccionar sus especialidades")
				)
				.min(1, "Los monitores deben tener al menos una especialidad")
		}),
	subscription: yup.string()
		.when('role', {
			is: "Miembro",
			then: yup.string()
				.required("Los miembros deben seleccionar una suscripción")
		})
});