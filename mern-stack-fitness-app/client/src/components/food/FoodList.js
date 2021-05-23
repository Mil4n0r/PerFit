import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFoods } from '../../api';

import { Table, TableBody, TableCell, TableContainer, Paper } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell } from '../../style/style';



export const FoodList = () => {
	const [foods, setFoods] = useState([])	// Creamos una variable de estado para almacenar la información del alimentos y una función para actualizarla

	useEffect(() => {
		const fetchFoods = async () => {
			const foods = await getFoods();	// Llamamos a la API para obtener la información de los alimentos
			setFoods(foods);	// Actualizamos la información de nuestra variable de estado para que contenga la información del alimento
		}
		fetchFoods();	// Llamamos aparte a fetchFoods para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<TableContainer component={Paper}>
				<Table size="medium">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Nombre del alimento</TableHeaderCell>
							<TableHeaderCell align="right">Tamaño de la ración</TableHeaderCell>
							<TableHeaderCell align="right">Valor energético (Kcal)</TableHeaderCell>
							<TableHeaderCell align="right">Carbohidratos (g)</TableHeaderCell>
							<TableHeaderCell align="right">Proteinas (g)</TableHeaderCell>
							<TableHeaderCell align="right">Grasas (g)</TableHeaderCell>
							<TableHeaderCell align="right"><Link to={'/create/food'}><AddCircleIcon color='secondary'/></Link></TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{foods.map(food => (
							<TableRow key={food._id}>
								<TableCell component="th" scope="row">
									{food.nombreAlimento}
								</TableCell>
								<TableCell align="right">{food.tamRacion} {food.unidadesRacion}</TableCell>
								<TableCell align="right">{food.nutrientesRacion.calorias}</TableCell>
								<TableCell align="right">{food.nutrientesRacion.carbohidratos}</TableCell>
								<TableCell align="right">{food.nutrientesRacion.proteinas}</TableCell>
								<TableCell align="right">{food.nutrientesRacion.grasas}</TableCell>
								<TableCell align="right"><Link to={`/food/info/${food._id}`}><VisibilityIcon/></Link></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}