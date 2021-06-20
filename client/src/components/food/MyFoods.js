import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getFoodsCreated } from '../../api';

import { Table, TableBody, TableCell, Paper, TextField, InputAdornment } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography, TableContainerWithMargin as TableContainer } from '../../style/style';

import AuthContext from '../../context/AuthContext';

export const MyFoods = (props) => {
	const [foods, setFoods] = useState([])	// Creamos una variable de estado para almacenar la información del alimentos y una función para actualizarla

	const { loggedIn } = useContext(AuthContext);
	
	useEffect(() => {
		const fetchFoods = async () => {
			const foods = await getFoodsCreated(loggedIn._id);	// Llamamos a la API para obtener la información de los alimentos
			setFoods(foods);	// Actualizamos la información de nuestra variable de estado para que contenga la información del alimento
		}
		fetchFoods();	// Llamamos aparte a fetchFoods para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Listado de alimentos creados por mi
			</CustomTypography>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Nombre del alimento</TableHeaderCell>
							<TableHeaderCell>Tamaño de la ración</TableHeaderCell>
							<TableHeaderCell>Valor energético (Kcal)</TableHeaderCell>
							<TableHeaderCell>Carbohidratos (g)</TableHeaderCell>
							<TableHeaderCell>Proteinas (g)</TableHeaderCell>
							<TableHeaderCell>Grasas (g)</TableHeaderCell>
							<TableHeaderCell align="center">
								<Link to={'/create/food'}><AddCircleOutlinedIcon color='secondary'/></Link>
							</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{foods.map(food => (
							<TableRow key={food._id}>
								<TableCell component="th" scope="row">{food.nombreAlimento}</TableCell>
								<TableCell>{food.tamRacion} g</TableCell>
								<TableCell>{food.nutrientesRacion.calorias}</TableCell>
								<TableCell>{food.nutrientesRacion.carbohidratos}</TableCell>
								<TableCell>{food.nutrientesRacion.proteinas}</TableCell>
								<TableCell>{food.nutrientesRacion.grasas}</TableCell>
								<TableCell>
									<HorizontalGrid container spacing={1}>
										<HorizontalGrid item xs>
											<Link to={`/food/info/${food._id}`}>
												<VisibilityOutlinedIcon color='primary'/>
											</Link>
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