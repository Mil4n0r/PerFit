import React, {useState, useEffect} from 'react';
import { getMeasure } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const MeasureInfo = () => {

	const match = useRouteMatch();
	const [measure, setMeasure] = useState();

	useEffect(() => {
		const fetchMeasure = async () => {
			const measure = await getMeasure(match.params.id);
			setMeasure(measure);
		}
		fetchMeasure();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
	<>
		<h1>Medida</h1>
		{
			measure && (
				<>
					<p>Valor: {measure.measureInfo.valorMedida}</p>
					<p>Fecha: {measure.measureInfo.fechaMedida}</p>
					{
						measure.permission.includes('write') && (
							<Link to={`/edit/measure/${measure.measureInfo._id}`}>Editar</Link>
						)
					}
					{
						measure.permission.includes('delete') && (
							<Link to={`/delete/measure/${measure.measureInfo._id}`}>Eliminar</Link>
						)
					}
				</>
			)
		}
	</>
	)
};

