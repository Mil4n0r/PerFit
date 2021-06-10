import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getFoods, getFoodsMatching } from '../../api';

import { Table, TableBody, TableCell, Paper, TextField, InputAdornment } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import { ContainerWithPadding, HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography, TableContainerWithMargin as TableContainer } from '../../style/style';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

export const FoodList = (props) => {
	const [foods, setFoods] = useState([])	// Creamos una variable de estado para almacenar la información del alimentos y una función para actualizarla
	const [search, setSearch] = useState();

	useEffect(() => {
		const fetchFoods = async () => {
			const foods = await getFoodsMatching(search);	// Llamamos a la API para obtener la información de los alimentos
			setFoods(foods);	// Actualizamos la información de nuestra variable de estado para que contenga la información del alimento
		}
		fetchFoods();	// Llamamos aparte a fetchFoods para no hacer el useEffect completo asíncrono (práctica no recomendada)
	}, [search]);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())

	return (
		<BodyContainer>
			<CustomTypography component="h2" variant="h5">
				Listado de alimentos
			</CustomTypography>
			<ContainerWithPadding>
				<HorizontalGrid container spacing={1}>
					<HorizontalGrid item xs={6}>
						<TextField
							variant="outlined"
							fullWidth
							type="text"
							onChange={(e)=>setSearch(e.target.value)}
							placeholder="Buscar alimentos"
							InputProps={{endAdornment: <InputAdornment position="end"><SearchOutlinedIcon /></InputAdornment>}}
						/>
					</HorizontalGrid>					
				</HorizontalGrid>
			</ContainerWithPadding>
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
								{
									props && props.meal ? (
										<Link to={`/create/food/${props.diet}/${props.meal}`}><AddCircleOutlinedIcon color='secondary'/></Link>
									) : 
										<Link to={'/create/food'}><AddCircleOutlinedIcon color='secondary'/></Link>
								}
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
								{ 
									props && props.meal ? (
										<TableCell align="center"><Link to={`/create/ration/${props.diet}/${props.meal}/${food._id}`}><ArrowForwardOutlinedIcon/></Link></TableCell>
									) :
										<TableCell align="center"><Link to={`/food/info/${food._id}`}><VisibilityOutlinedIcon/></Link></TableCell>
								}
								
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</BodyContainer>
	);
}