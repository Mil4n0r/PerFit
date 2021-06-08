import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getMeasures, deleteMeasure, getTracking } from '../../api';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

import { Table, TableBody, TableCell, Paper, List, ListItem, Divider, Grid, CircularProgress } from '@material-ui/core';
import { FullWidthPaper, CustomDeleteForeverOutlinedIcon, CustomEditOutlinedIcon, CustomListItemText as ListItemText, NutrientBar, VerticalDivider, HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography as Typography, TableContainerWithMargin as TableContainer, VerticalGrid } from '../../style/style';
import { MeasureList } from './MeasureList';

export const AssociateMeasureToTracking = () => {
	
	const match = useRouteMatch();

	const [tracking, setTracking] = useState();
	const [measures, setMeasures] = useState();

	useEffect(() => {
		const fetchTracking = async () => {
			const tracking = await getTracking(match.params.id);
			setTracking(tracking);
		}
		fetchTracking();

		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	return tracking ? (
		<MeasureList tracking={tracking}/>
		/*
		
		<BodyContainer children="">
			<Typography component="h2" variant="h5">
				Medidas del seguimiento {tracking?.nombrePlan}
			</Typography>
			<TableContainer component={Paper} children="">
				<Table size="medium">
					<TableHead>
						<TableRow>
							{measures && measures.length > 0 && measures.map((measure) => (
								<TableHeaderCell key={measure._id}>
									<HorizontalGrid container spacing={1}>
										<HorizontalGrid item xs={8}>
											{measureFormat(measure)}
										</HorizontalGrid>
										<HorizontalGrid item xs={2}>
											<Link to={`/edit/measure/${tracking._id}/${measure._id}`}><CustomEditOutlinedIcon /></Link>
										</HorizontalGrid>
										<HorizontalGrid item xs={2}>
											<Link to={"#"} onClick={() => { deleteMeasureFromTracking(measure._id) } }><CustomDeleteForeverOutlinedIcon /></Link>
										</HorizontalGrid>
									</HorizontalGrid>
								</TableHeaderCell>
							))}
							{
								<TableHeaderCell align='center'><Link to={`/create/measure/${match.params.id}`}><AddCircleOutlinedIcon color='secondary'/></Link></TableHeaderCell>
							}
						</TableRow>
					</TableHead>
					<TableBody>
						{measures.map(measure => (
							<TableRow key={measure._id}>
								<TableCell component="th" scope="row">{measure.valorMedida}</TableCell>
								<TableCell>{measure.fechaMedida}</TableCell>
								<TableCell align="center"><Link to={`/measure/info/${measure._id}`}><VisibilityOutlinedIcon/></Link></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
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
		</BodyContainer>
		*/
	) : (
		<></>
	);
}

