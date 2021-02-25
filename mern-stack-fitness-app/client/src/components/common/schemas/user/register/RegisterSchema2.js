import * as yup from 'yup';
import 'yup-phone';

export const RegisterSchema2 = yup.object().shape({
	name: yup.string()
		.required("Por favor introduzca su nombre")
		.matches(/^[a-zA-Z\'\- À-ú]+$/, "El nombre debe contener sólo caracteres alfabéticos"),
	surname: yup.string()
		.required("Por favor introduzca su(s) apellido(s)")
		.matches(/^[a-zA-Z\'\- À-ú]+$/, "El apellido debe contener sólo caracteres alfabéticos"),
	dni: yup.string()
		.matches(/^\d{8}[a-zA-Z]$/, "El DNI debe constar de 8 dígitos y una letra")
		.test(
			"valid-dni",
			"La letra no se corresponde con el DNI introducido",
			(val) => {
				const number = val.substr(0,val.length-1) % 23;
				const letter = val.substr(val.length-1,1);
				const checkletter = 'TRWAGMYFPDXBNJZSQVHLCKET'.substring(number,number+1);
				return (checkletter === letter.toUpperCase())
			}
		),
	address: yup.string()
		.matches(/^[a-zA-Z\'\/\-\.\, À-ú\º0-9]+$/, "La dirección no tiene un formato válido")
		.matches(/^.{4,80}$/, "La dirección debe tener entre 4 y 80 caracteres"),
	telephone: yup.string()
		.phone("ES", true, "El número de teléfono introducido no tiene un formato válido")
		.required("Por favor introduzca su número de teléfono"),
	birthdate: yup.date()
		.typeError("Por favor introduzca una fecha válida")
		.required("Por favor introduzca su fecha de nacimiento")
		.test(
			"future-birthdate",
			"Pero Doc, ¿has construido una máquina del tiempo con un De Lorean?",
			(val) => {
				const today = new Date()
				return (val.getTime() < today.getTime())
			}
		),
});