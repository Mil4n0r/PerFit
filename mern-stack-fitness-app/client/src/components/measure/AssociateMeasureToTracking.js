import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getMeasures, deleteMeasure, getTracking } from '../../api';

const formatDate = (date) => {
	
	const [year, month, day] = date.substr(0,10).split("-");
	return `${day}/${month}/${year}`;
}

const measureFormat = (m) => {
	const measurevalue = m.valorMedida;
	const measureday = formatDate(m.fechaMedida);
	return (
		`Medida: ${measurevalue} - Día ${measureday}`
	)
}

export const AssociateMeasureToTracking = () => {
	
	const match = useRouteMatch();

	const [tracking, setTracking] = useState();
	const [measures, setMeasures] = useState();
	const [deleted, setDeleted] = useState(); // Permite recargar la lista de entrenamientos al borrar

	useEffect(() => {
		const fetchTracking = async () => {
			const tracking = await getTracking(match.params.id);
			setTracking(tracking);
		}
		fetchTracking();

		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	useEffect(() => {
		const fetchMeasures = async () => {
			const measures = await getMeasures(match.params.id);
			setMeasures(measures);
		}
		fetchMeasures();
	}, [deleted]);
	
	const deleteMeasureFromTracking = async (measureid) => {
		await deleteMeasure(match.params.id,measureid); // Debemos borrar tanto la medida como su referencia en el seguimiento...
		setDeleted(measureid);
	}

	return (
		<>
			{
				tracking && tracking.medidasSeguidas && (
					<>
						<h3>Medidas asociadas</h3>
						<table className="table table-stripped mt-3">
							<thead>
								<tr>
									<th>Medida</th>
									<th>Acción</th>
								</tr>
							</thead>
							<tbody>
								{measures && measures.map((measure) => (
										<tr key={measure._id}>
											<td>
												{measureFormat(measure)}
											</td>
											<td>
												<Link to={`/edit/measure/${tracking._id}/${measure._id}`}>Editar medida</Link>
												<button onClick={() => {
													deleteMeasureFromTracking(measure._id)
												}
												}>Eliminar del seguimiento</button>
											</td>
										</tr>
										
									))
								}
							</tbody>
						</table>
					</>
				)
			}
			<Link to={`/create/measure/${match.params.id}`}>Añadir medida</Link>			
		</>
	);
	
}

