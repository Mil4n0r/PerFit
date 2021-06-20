import React, {useState, useEffect} from 'react';
import { getFood } from '../../api';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import {Grid, Paper, Modal, Button, List, Avatar, ListItemAvatar, Divider, InputLabel, InputAdornment} from '@material-ui/core';
import ErrorDisplayer from '../common/layout/ErrorDisplayer';

import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import {NutrientBar, VerticalDivider, CustomListItem as ListItem, ContainerWithPadding, CustomListItemText as ListItemText, HorizontalList, FullWidthPaper, BodyContainer, CustomTypography as Typography, VerticalGrid, HorizontalGrid, ButtonAvatar, TextFieldWithMargin as TextField, InputLabelWithoutMargin, PrimaryLink, CenterPaper, CapacityInputLabel} from '../../style/style'

import { DeleteFood } from './DeleteFood';

function NutrientBarWithLabel(props) {
	return (
		<HorizontalGrid container spacing={1}>
			<Grid item xs={1}>
				<Typography color="textSecondary">{`${Math.ceil(props.value)}%`}</Typography>
			</Grid>
			<Grid item xs={11}>
				<NutrientBar variant="determinate" {...props} color={Math.ceil(props.value) > 50 ? 'secondary' : 'primary'}/>
			</Grid>
		</HorizontalGrid>
	);
}

const getNutrientName = (nutrient) => {
	return nutrient.charAt(0).toUpperCase() + nutrient.slice(1);
}

const getPercentage = (calories, nutrient, amount) => {
	let ratio = nutrient === "grasas" ? 9 : 4;
	const percentage = (amount * ratio / calories) * 100;
	return percentage;
}

export const FoodInfo = () => {

	const match = useRouteMatch();
	const [food, setFood] = useState();
	const [open, setOpen] = useState(false);
	const [error, setError] = useState();

	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const fetchFood = async () => {
			const food = await getFood(match.params.id);
			if(food.response) {
				setError(food.response);
			}
			else {
				setFood(food);
			}
		}
		fetchFood();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Alimento
			</Typography>
			{
				food && (
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
										defaultValue={food.foodInfo.nombreAlimento}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Grid>
							</HorizontalGrid>
							<HorizontalGrid container spacing={1}>
								<Grid item xs={3}>
									<InputLabelWithoutMargin>Cantidad</InputLabelWithoutMargin>
								</Grid>
								<Grid item xs={9}>
									<TextField
										variant="outlined"
										fullWidth
										type="text"
										defaultValue={food.foodInfo.tamRacion}
										InputProps={{
											readOnly: true,
											endAdornment: <InputAdornment position="end">g</InputAdornment>
										}}
										
									/>
								</Grid>
							</HorizontalGrid>
							<ContainerWithPadding>
								<InputLabel>Nutrientes</InputLabel>
								{
									food && food.foodInfo.nutrientesRacion && (
										<FullWidthPaper className="external">
											<List>
												{
													Object.keys(food.foodInfo.nutrientesRacion).map(nutrient => (
														nutrient === "calorias" ? (
															<ListItem key={nutrient} className="calories">
																<FullWidthPaper>
																	<ListItemText className="center bold">Valor energético: {food.foodInfo.nutrientesRacion[nutrient]} Kcal</ListItemText>
																</FullWidthPaper>
															</ListItem>
														) :
															<ListItem key={nutrient} className="nutrient">
																<FullWidthPaper>
																	<Grid container spacing={2}>
																		<Grid item xs={3}>
																			<ListItemText className="center">{getNutrientName(nutrient)}</ListItemText>
																		</Grid>
																		<VerticalDivider orientation="vertical" flexItem />
																		<Grid item xs={8}>
																		<ListItemText className="center">
																			<NutrientBarWithLabel value={getPercentage(food.foodInfo.nutrientesRacion.calorias, nutrient, food.foodInfo.nutrientesRacion[nutrient])} />
																		</ListItemText>
																		</Grid>
																		<VerticalDivider orientation="vertical" flexItem />
																		<Grid item xs={1}>
																			<ListItemText className={getPercentage(food.foodInfo.nutrientesRacion.calorias, nutrient, food.foodInfo.nutrientesRacion[nutrient]) > 50 ? 'center colorSecondary' : 'center colorPrimary'}>{food.foodInfo.nutrientesRacion[nutrient]}g</ListItemText>
																		</Grid>
																	</Grid>
																</FullWidthPaper>
															</ListItem>
													))
												}
											</List>
										</FullWidthPaper>
									)
								}
							</ContainerWithPadding>
						</VerticalGrid>
						{
							food.permission.includes('write') || food.permission.includes('delete') ? (
								<Typography component="h3" variant="h6">Opciones</Typography>
							) : 
								<></>
						}
						<ContainerWithPadding>
							<Grid container spacing={3}>
								{
									food.permission.includes('write') && (
										<Grid item xs>
											<PrimaryLink to={`/edit/food/${food.foodInfo._id}`}>
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
									)
								}
								{
									food.permission.includes('delete') && (
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
									)
								}
								<Modal
									open={open}
									onClose={handleClose}
								>
									<CenterPaper><DeleteFood setOpen={setOpen}/></CenterPaper>
								</Modal>
							</Grid>
						</ContainerWithPadding>
					</>
				)
			}
			{
				<ErrorDisplayer error={error} setError={setError}/>
			}
		</BodyContainer>
	)
};