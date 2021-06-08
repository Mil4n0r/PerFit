import React, { useState, useEffect, useContext } from 'react';
import { useRouteMatch } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getDietsForUser, getUser } from '../../api';
import AuthContext from '../../context/AuthContext';

import { Table, TableBody, TableCell, Paper, List, ListItem, Divider, Grid } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { CustomListItemText as ListItemText, NutrientBar, VerticalDivider, HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography as Typography, TableContainerWithMargin as TableContainer } from '../../style/style';

function NutrientBarWithLabel(props) {
	return (
		<HorizontalGrid container spacing={1}>
			<Grid item xs={2}>
				<Typography color="textSecondary">{`${Math.ceil(props.value)}%`}</Typography>
			</Grid>
			<Grid item xs={10}>
				<NutrientBar variant="determinate" {...props} color={Math.ceil(props.value) > 50 ? 'secondary' : 'primary'}/>
			</Grid>
		</HorizontalGrid>
	);
}

const objectivesFormat = (o) => {
	const calories = o.calorias;
	const carbs = o.carbohidratos;
	const proteins = o.proteinas;
	const fats = o.grasas;

	const carbsPerc = ((carbs*4) / calories) * 100
	const proteinsPerc = ((proteins*4) / calories) * 100
	const fatsPerc = ((fats*9) / calories) * 100

	return (
		<List>
			<ListItem key="calories">
				<Typography className="bold">Ingesta calórica: {calories} Kcal</Typography>
			</ListItem>
			<Divider/>
			<ListItem key="carbs">
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<ListItemText className="center">Carbohidratos</ListItemText>
					</Grid>
					<VerticalDivider orientation="vertical" flexItem />
					<Grid item xs={8}>
						<ListItemText className="center"><NutrientBarWithLabel value={carbsPerc} /></ListItemText>
					</Grid>
					<VerticalDivider orientation="vertical" flexItem />
					<Grid item xs={1}>
						<ListItemText className={carbsPerc > 50 ? 'center colorSecondary' : 'center colorPrimary'}>{carbs}g</ListItemText>
					</Grid>
				</Grid>
			</ListItem>
			<Divider/>
			<ListItem key="proteins">
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<ListItemText className="center">Proteinas</ListItemText>
					</Grid>
					<VerticalDivider orientation="vertical" flexItem />
					<Grid item xs={8}>
						<ListItemText className="center"><NutrientBarWithLabel value={proteinsPerc} /></ListItemText>
					</Grid>
					<VerticalDivider orientation="vertical" flexItem />
					<Grid item xs={1}>
						<ListItemText className={proteinsPerc > 50 ? 'center colorSecondary' : 'center colorPrimary'}>{proteins}g</ListItemText>
					</Grid>
				</Grid>
			</ListItem>
			<Divider/>
			<ListItem key="fats">
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<ListItemText className="center">Grasas</ListItemText>
					</Grid>
					<VerticalDivider orientation="vertical" flexItem />
					<Grid item xs={8}>
						<ListItemText className="center"><NutrientBarWithLabel value={fatsPerc} /></ListItemText>
					</Grid>
					<VerticalDivider orientation="vertical" flexItem />
					<Grid item xs={1}>
						<ListItemText className={fatsPerc > 50 ? 'center colorSecondary' : 'center colorPrimary'}>{fats}g</ListItemText>
					</Grid>
				</Grid>
			</ListItem>
			<Divider/>
		</List>
	)
}

export const UserDietList = () => {
	const [diets, setDiets] = useState([]);
	const [user, setUser] = useState();

	const { loggedIn } = useContext(AuthContext);

	const match = useRouteMatch();
	
	useEffect(() => {
		const fetchDiets = async () => {
			const diets = await getDietsForUser(match.params.id);	// Llamamos a la API para obtener la información de los ejercicios
			setDiets(diets);	// Actualizamos la información de nuestra variable de estado para que contenga la información de los ejercicios
		}
		const fetchUser = async () => {
			const user = await getUser(match.params.id);
			setUser(user);
		}
		fetchDiets();	// Llamamos aparte a fetchRoutines para no hacer el useEffect completo asíncrono (práctica no recomendada)
		fetchUser();
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Listado de dietas de {user?.userInfo?.aliasUsuario}
			</Typography>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Nombre de la dieta</TableHeaderCell>
							<TableHeaderCell>Objetivo diario</TableHeaderCell>
							{
								loggedIn && loggedIn.role === "Administrador" ? (
									<TableHeaderCell align='center'><Link to={`/associate/diet/${match.params.id}`}><AddCircleOutlinedIcon color='secondary'/></Link></TableHeaderCell>
								) :
									<TableHeaderCell align='center'>Acción</TableHeaderCell>
							}
						</TableRow>
					</TableHead>
					<TableBody>
						{diets.map(diet => (
							<TableRow key={diet._id}>
								<TableCell component="th" scope="row">{diet.nombrePlan}</TableCell>
								<TableCell>{objectivesFormat(diet.objetivoDiario)}</TableCell>
								<TableCell align='center'><Link to={`/diet/info/${diet._id}`}><VisibilityOutlinedIcon/></Link></TableCell>
								{
									/*
									<Link to={`/edit/diet/${match.params.id}/${diet._id}`}>Editar</Link>
									<Link to={`/delete/diet/${match.params.id}/${diet._id}`}>Eliminar</Link>
									*/
								}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}