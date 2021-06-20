import React, {useState, useEffect} from 'react';
import { getTracking, getUser } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";

import {Grid, Paper, Modal, Button, List, Avatar, ListItemAvatar, Divider, InputLabel, ListItemIcon, InputAdornment } from '@material-ui/core';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

import FolderIcon from '@material-ui/icons/Folder';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import {NutrientBar, VerticalDivider, CustomListItem as ListItem, ContainerWithPadding, CustomListItemText as ListItemText, HorizontalList, FullWidthPaper, BodyContainer, CustomTypography as Typography, VerticalGrid, HorizontalGrid, ButtonAvatar, TextFieldWithMargin as TextField, InputLabelWithoutMargin, PrimaryLink, CenterPaper, CapacityInputLabel} from '../../style/style'

import { DeleteTracking } from './DeleteTracking';

import {Chart, Line} from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-date-fns';
import { es } from 'date-fns/locale'

Chart.register(annotationPlugin);

export const TrackingInfo = () => {
	const match = useRouteMatch();
	const [tracking, setTracking] = useState();
	const [user, setUser] = useState();
	const [open, setOpen] = useState(false);
	const [error, setError] = useState();

	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};
	
	const trackingName = tracking && tracking.nombrePlan
	const trackingUnit = tracking && tracking.unidadObjetivo;
	const trackingGoal = tracking && tracking.valorObjetivo;
	const measuresDates = tracking && tracking.medidasSeguidas.map(t => t.fechaMedida)
	const measuresValues = tracking && tracking.medidasSeguidas.map(t => t.valorMedida);
	const chartData = {
		labels: measuresDates,
		datasets: [{
			label: trackingName,
			data: measuresValues,
			fill: false,
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: '#3f50b5',
		}]
	};

	const chartOptions = {
		plugins: {
			title: {
                display: true,
                text: 'Progreso'
			},
			legend: {
				display: false
			},
			tooltip: {
				callbacks: {
					label: (context) => {
						var label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += `${context.parsed.y} ${trackingUnit}`;
                        }
                        return label;
					}
				}
			},
			annotation: {
				annotations: [{
					type: 'line',
					scaleID: 'y',
					borderWidth: 3,
					borderColor: 'red',
					value: trackingGoal,
					label: {
						content: (ctx) => `Objetivo: ${trackingGoal} ${trackingUnit}`,
						enabled: true
					},
				}]
			}	
		},
		scales: {
			x: {
				type: 'time',
				time: {
					tooltipFormat: 'dd/MM/yyyy'
				},
				adapters: {
					date: {
						locale: es
					}
				}
			},
			y: {
				ticks: {
                    callback: function(value, index, values) {
                        return `${value} ${trackingUnit}`;
                    }
                }
				//beginAtZero: true
			},
			
		}
	};

	useEffect(() => {
		const fetchTrackingAndUser = async () => {
			const tracking = await getTracking(match.params.id);
			if(tracking.response) {
				setError(tracking.response);
			}
			else {
				setTracking(tracking);
			}
			const user = await getUser(tracking.usuarioPlan);
			if(user.response) {
				setError(user.response);
			}
			else {
				setUser(user);
			}
			
		}
		fetchTrackingAndUser();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Seguimiento
			</Typography>
			{
				tracking && (
					<>
						<VerticalGrid container spacing={1}>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabelWithoutMargin>Nombre</InputLabelWithoutMargin>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={tracking.nombrePlan}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabelWithoutMargin>Valor objetivo</InputLabelWithoutMargin>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={tracking.valorObjetivo}
										InputProps={{
											readOnly: true,
											endAdornment: <InputAdornment position="end">{tracking.unidadObjetivo}</InputAdornment>
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<ContainerWithPadding>
								<InputLabel>Evolución</InputLabel>
								{
									<Line
										data={chartData}
										options={chartOptions}
									/>
								}
							</ContainerWithPadding>
							{
								user && user.permission.includes('checkplans') && (
									<>
										<Typography component="h3" variant="h6">Opciones</Typography>
										<ContainerWithPadding>
											<Grid container spacing={3}>
												{
													<Grid item xs>
														<PrimaryLink to={`/associate/tracking/measure/${tracking._id}`}>
															<FullWidthPaper>
																<VerticalGrid item xs className="zoom">
																	<ButtonAvatar><DescriptionOutlinedIcon /></ButtonAvatar>
																	<Typography color='primary' className="caps">
																		Medidas
																	</Typography>
																</VerticalGrid>
															</FullWidthPaper>
														</PrimaryLink>
													</Grid>
												}
												{
													<Grid item xs>
														<PrimaryLink to={`/edit/tracking/${user.userInfo._id}/${tracking._id}`}>
															<FullWidthPaper>
																<VerticalGrid item xs className="zoom">
																	<ButtonAvatar><EditOutlinedIcon /></ButtonAvatar>
																	<Typography color='primary' className="caps">
																		Editar
																	</Typography>
																</VerticalGrid>
															</FullWidthPaper>
														</PrimaryLink>
													</Grid>
												}
												{
													<Grid item xs>
														<PrimaryLink to={"#"} onClick={handleOpen}>
															<FullWidthPaper>												
																<VerticalGrid item xs className="zoom">
																	<ButtonAvatar><DeleteForeverOutlinedIcon /></ButtonAvatar>
																	<Typography color='primary' className="caps">
																		Eliminar
																	</Typography>
																</VerticalGrid>
															</FullWidthPaper>
														</PrimaryLink>
													</Grid>
												}
												<Modal
													open={open}
													onClose={handleClose}
												>
													<CenterPaper><DeleteTracking setOpen={setOpen} userId={user.userInfo._id}/></CenterPaper>
												</Modal>
											</Grid>
										</ContainerWithPadding>
									</>
								)
							}
						</VerticalGrid>
					</>
				)
			}
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	)
};