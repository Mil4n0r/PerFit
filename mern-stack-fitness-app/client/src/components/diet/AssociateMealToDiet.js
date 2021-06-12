import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
//import { associateDiet } from '../../api';
import { deleteMeal, getDiet, deleteRation, getMealsForDate, getMealsForMonth } from '../../api';

import { Table, TableBody, TableCell, Paper, List, ListItem, Divider, Grid, CircularProgress } from '@material-ui/core';

import {format} from 'date-fns';
import { es } from 'date-fns/locale'

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

import { CircleLink, TableBottomCell, TableBottomRow, CustomTableCell, FullWidthPaper, CustomDeleteForeverOutlinedIcon, CustomEditOutlinedIcon, CustomListItemText as ListItemText, NutrientBar, VerticalDivider, HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography as Typography, TableContainerWithMargin as TableContainer, VerticalGrid } from '../../style/style';
import { NutrientList } from './NutrientList';
import { DietCalendar } from './DietCalendar';

const nutrientsFormat = (n, multiplier) => {
	const calories = n.calorias;
	const carbs = n.carbohidratos;
	const proteins = n.proteinas;
	const fats = n.grasas;

	return (
		<List dense>
			<ListItem key={"calories"}>
				<ListItemText className="bold">Calorías: {Math.trunc(calories * multiplier)}</ListItemText>
			</ListItem>
			<Divider/>
			<ListItem key={"carbs"}>
				<ListItemText>Carbohidratos: {Math.trunc(carbs * multiplier)}</ListItemText>
			</ListItem>
			<Divider/>
			<ListItem key={"proteins"}>
				<ListItemText>Proteinas: {Math.trunc(proteins * multiplier)}</ListItemText>
			</ListItem>
			<Divider/>
			<ListItem key={"fats"}>
				<ListItemText>Grasas: {Math.trunc(fats * multiplier)}</ListItemText>
			</ListItem>
			<Divider/>
		</List>
	)
}

const rationFormat = (r) => {
	const foodname = r.alimentoComida?.nombreAlimento;
	const nutrients = nutrientsFormat(r.alimentoComida?.nutrientesRacion, r.numRaciones)
	//const amount = r.alimentoComida.tamRacion * r.numRaciones;
	const rations = r.numRaciones;
	const foodsize = r.alimentoComida.tamRacion;
	return (
		<HorizontalGrid container className="centerText">
			<Grid item xs={6}>
				<VerticalGrid container>
					<VerticalGrid item>{foodname}</VerticalGrid>
					<VerticalGrid item>({Math.trunc(rations*foodsize)} g)</VerticalGrid>
				</VerticalGrid> 
			</Grid>
			<Grid item xs={6}>{nutrients}</Grid>
		</HorizontalGrid>
	)
}

const getRationRows = (meals) => {
	return Math.max(...meals.map(m=>m.racionesComida.length)) 
}

const getNutrientsFromMeals = (meals) => {
	var meals_nutrients = {"calorias": 0, "carbohidratos": 0, "grasas": 0, "proteinas": 0};
	if(meals)
		meals.map((meal) =>
			meal.racionesComida.map((ration) => {
				const amount = ration.numRaciones;
				const ration_nutrients = ration.alimentoComida?.nutrientesRacion

				for(let x in ration_nutrients) {
					meals_nutrients[x] += ration_nutrients[x] * amount
				}
			})
		)
		Object.keys(meals_nutrients).map(key => meals_nutrients[key] = Math.trunc(meals_nutrients[key]))
	return meals_nutrients;
}

export const AssociateMealToDiet = () => {
	const match = useRouteMatch();

	const [diet, setDiet] = useState();
	const [meals, setMeals] = useState();
	const [deleted, setDeleted] = useState();

	const [selectedDate, handleDateChange] = useState(new Date(localStorage.getItem('currentDate')) || new Date() );

	useEffect(() => {
		const setLocalStorageDate = async () => {
			localStorage.setItem('currentDate', selectedDate);
		}
		setLocalStorageDate();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, [selectedDate]);
	
	useEffect(() => {
		const fetchDiet = async () => {
			const diet = await getDiet(match.params.id);
			setDiet(diet);
		}
		fetchDiet();

		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);

	useEffect(() => {
		const fetchMeals = async () => {
			const meals = await getMealsForDate(match.params.id, selectedDate);
			setMeals(meals);
		}
		
		fetchMeals();
	}, [deleted, selectedDate]);

/*
	useEffect(() => {
		const fetchMeals = async () => {
			const meals = await getMeals(match.params.id);
			setMeals(meals);
		}
		fetchMeals();
	}, [deleted]);
*/
	const deleteMealFromDiet = async (mealid) => {
		await deleteMeal(match.params.id, mealid); // Debemos borrar tanto la comida como su referencia en la dieta...
		setDeleted(mealid);
	}

	const deleteRationFromMeal = async (mealid, rationid) => {
		await deleteRation(diet._id, mealid, rationid);
		setDeleted(rationid);
	}

	return diet && diet.comidasDieta ? (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Comidas de {diet.nombrePlan}
			</Typography>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>
								{
									/*
									<HorizontalGrid container spacing={1}>
										<HorizontalGrid item xs={8}>
											{mealFormat(meal)}
										</HorizontalGrid>
										<HorizontalGrid item xs={2}>
											<Link to={`/edit/meal/${diet._id}/${meal._id}`}><CustomEditOutlinedIcon /></Link>
										</HorizontalGrid>
										<HorizontalGrid item xs={2}>
											<Link to={"#"} onClick={() => { deleteMealFromDiet(meal._id) } }><CustomDeleteForeverOutlinedIcon /></Link>
										</HorizontalGrid>
									</HorizontalGrid>
									*/
								}
								<HorizontalGrid container spacing={1}>
									<HorizontalGrid item xs={8}>
										Comidas del {format(selectedDate, 'PPPP', {locale: es})}
									</HorizontalGrid>
									<HorizontalGrid item xs={4}>
										<DietCalendar selectedDate={selectedDate} diet={diet} handleChange={handleDateChange} deleted={deleted}/>
									</HorizontalGrid>
								</HorizontalGrid>
							</TableHeaderCell>
							{
								//<TableHeaderCell align='center'><Link to={`/create/meal/${match.params.id}`}><AddCircleOutlinedIcon color='secondary'/></Link></TableHeaderCell>
							}
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<CustomTableCell className="separator">
								<NutrientList nutrients={getNutrientsFromMeals(meals)} format={"Meal"} totals={diet.objetivoDiario}/>
							</CustomTableCell>
						</TableRow>
						{meals && meals.length > 0 && meals.map((meal) => (
							<React.Fragment key={meal._id}>
								<TableRow>
									<CustomTableCell className="separator">
										<HorizontalGrid container spacing={1}>
											<HorizontalGrid item xs={8}>
												<Typography component="h3" variant="h6">
													{meal.nombreComida}
												</Typography>
											</HorizontalGrid>
											<HorizontalGrid item xs={2}>
												<CircleLink className='primary' to={`/edit/meal/${diet._id}/${meal._id}`}><CustomEditOutlinedIcon /></CircleLink>
											</HorizontalGrid>
											<HorizontalGrid item xs={2}>
												<CircleLink className='secondary' to={"#"} onClick={() => { deleteMealFromDiet(meal._id) } }><CustomDeleteForeverOutlinedIcon /></CircleLink>
											</HorizontalGrid>
										</HorizontalGrid>
									</CustomTableCell>
								</TableRow>
								{
									meal.racionesComida.map(ration => (
										<TableRow>
											<TableCell key={ration._id}>
												<HorizontalGrid container spacing={1}>
													<HorizontalGrid item xs={8}>
														{rationFormat(ration)}
													</HorizontalGrid>
													<HorizontalGrid item xs={2}>
														<Link to={`/edit/ration/${match.params.id}/${meal._id}/${ration._id}`}><CustomEditOutlinedIcon /></Link>
													</HorizontalGrid>
													<HorizontalGrid item xs={2}>
														<Link to={"#"} onClick={() => { deleteRationFromMeal(meal._id, ration._id) } }><CustomDeleteForeverOutlinedIcon /></Link>
													</HorizontalGrid>
												</HorizontalGrid>												
											</TableCell>
										</TableRow>
									))}
								<TableRow>
									<CustomTableCell className="separator">
										<HorizontalGrid container>
											<HorizontalGrid item xs>
												<Link to={`/associate/meal/food/${diet._id}/${meal._id}`}>Añadir raciones</Link>
											</HorizontalGrid>
										</HorizontalGrid>
									</CustomTableCell>
								</TableRow>
							</React.Fragment>
						))}
						<TableBottomRow>
							<TableCell>
								<Link to={`/create/meal/${match.params.id}`}>
									<HorizontalGrid container spacing={1}>
										<HorizontalGrid item xs>
											<AddCircleOutlinedIcon color='secondary'/>
										</HorizontalGrid>
									</HorizontalGrid>
								</Link>
							</TableCell>
						</TableBottomRow>
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	) : (
		<BodyContainer>
			<CircularProgress/>
		</BodyContainer>
	);
}