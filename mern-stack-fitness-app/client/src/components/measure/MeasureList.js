import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMeasures, deleteMeasure } from '../../api';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

import { Table, TableBody, TableCell, Paper, List, ListItem, Divider, Grid, Modal } from '@material-ui/core';
import { CenterPaper, CustomTableCell, FullWidthPaper, CustomDeleteForeverOutlinedIcon, CustomEditOutlinedIcon, CustomListItemText as ListItemText, NutrientBar, VerticalDivider, HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography, TableContainerWithMargin as TableContainer, VerticalGrid } from '../../style/style';

import { CongratulationsMessage } from './CongratulationsMessage';
import Confetti from 'react-confetti';

export const MeasureList = (props) => {
	const [measures, setMeasures] = useState([])	// Creamos una variable de estado para almacenar la información de las medidas y una función para actualizarla
	const [deleted, setDeleted] = useState(); // Permite recargar la lista de entrenamientos al borrar
	const [open, setOpen] = useState();

	const handleClose = () => {
		setOpen(false);
	};

	const goalAchieved = (currentValue, goalValue) => {
		const condition = currentValue >= goalValue;
		if(condition && open === undefined)
			setOpen(true)
		return condition;
	}

	const deleteMeasureFromTracking = async (measureid) => {
		await deleteMeasure(props.tracking._id,measureid); // Debemos borrar tanto la medida como su referencia en el seguimiento...
		setDeleted(measureid);
	}

	useEffect(() => {
		const fetchMeasures = async () => {
			const measures = await getMeasures(props.tracking._id);	// Llamamos a la API para obtener la información de las medidas
			setMeasures(measures);	// Actualizamos la información de nuestra variable de estado para que contenga la información de las medidas
		}
		fetchMeasures();	// Llamamos aparte a fetchExercises para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, [deleted]);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			{
				open && (
					<>
						<Confetti />
						<Modal
							open={open}
							onClose={handleClose}
						>
							<CenterPaper><CongratulationsMessage setOpen={setOpen}/></CenterPaper>
						</Modal>
					</>
				)
			}
			<CustomTypography component="h2" variant="h5">
				Listado de medidas del seguimiento {props?.tracking?.nombrePlan}
			</CustomTypography>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Valor de la medida</TableHeaderCell>
							<TableHeaderCell>Fecha de la medida</TableHeaderCell>
							<TableHeaderCell align="center"><Link to={`/create/measure/${props.tracking._id}`}><AddCircleOutlinedIcon color='secondary'/></Link></TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{measures.map(measure => (
							<TableRow key={measure._id}>
								{
									goalAchieved(measure.valorMedida, props.tracking.valorObjetivo) ? (
										<CustomTableCell component="th" scope="row" className='colorSecondary'>{measure.valorMedida} / {props.tracking.valorObjetivo}</CustomTableCell>
									) : (
										<CustomTableCell component="th" scope="row" className='colorPrimary'>{measure.valorMedida} / {props.tracking.valorObjetivo}</CustomTableCell>
									)
								}
								
								<TableCell>{measure.fechaMedida}</TableCell>
								<TableCell align="center">
									<HorizontalGrid container spacing={1}>
										<HorizontalGrid item xs>
											<Link to={`/edit/measure/${props.tracking._id}/${measure._id}`}><CustomEditOutlinedIcon /></Link>
										</HorizontalGrid>
										<HorizontalGrid item xs>
											<Link to={"#"} onClick={() => { deleteMeasureFromTracking(measure._id) } }><CustomDeleteForeverOutlinedIcon /></Link>
										</HorizontalGrid>
									</HorizontalGrid>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}