import React from 'react';

import { Table, TableBody, TableCell, Paper, List, ListItem, Divider, Grid } from '@material-ui/core';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

import { FullWidthPaper, CustomDeleteForeverOutlinedIcon, CustomEditOutlinedIcon, CustomListItemText as ListItemText, NutrientBar, VerticalDivider, HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography as Typography, TableContainerWithMargin as TableContainer } from '../../style/style';

const getNutrientName = (nutrient) => {
	return nutrient.charAt(0).toUpperCase() + nutrient.slice(1);
}

const getPercentage = (calories, nutrient, amount) => {
	let ratio = nutrient === "grasas" ? 9 : 4;
	const percentage = (amount * ratio / calories) * 100;
	return percentage;
}

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

export const NutrientList = (props) => {
	const nutrients = props.nutrients;
	const totals = props.totals;
	const format = props.format;
	const itemkey = props.itemkey;

	return format === "Diet" ? (
		<List>
			{
				Object.keys(nutrients).map((nutrient) => (
					nutrient === "calorias" ? (
						<ListItem key={itemkey+nutrient} className="calories">
							<FullWidthPaper>
								<ListItemText className="center bold">Ingesta calórica: {nutrients[nutrient]} Kcal</ListItemText>
							</FullWidthPaper>
						</ListItem>
					) : (
						<ListItem key={itemkey+nutrient} className="nutrient">
							<FullWidthPaper>
								<Grid container spacing={2}>
									<Grid item xs={3}>
										<ListItemText className="center">{getNutrientName(nutrient)}</ListItemText>
									</Grid>
									<VerticalDivider orientation="vertical" flexItem />
									<Grid item xs={8}>
										<ListItemText className="center">
											<NutrientBarWithLabel value={getPercentage(nutrients.calorias, nutrient, nutrients[nutrient])} />
										</ListItemText>
									</Grid>
									<VerticalDivider orientation="vertical" flexItem />
									<Grid item xs={1}>
										<ListItemText className={getPercentage(nutrients.calorias, nutrient, nutrients[nutrient]) > 50 ? 'center colorSecondary' : 'center colorPrimary'}>{nutrients[nutrient]}g</ListItemText>
									</Grid>
								</Grid>
							</FullWidthPaper>
						</ListItem>
					)
				))
			}
		</List>
	) : 
	(
		<List>
			{
				Object.keys(nutrients).map((nutrient) => (
					<React.Fragment key={nutrient}>
						<ListItem className="nutrient">
							<Grid container spacing={2}>
								<Grid item xs={3}>
									<ListItemText className="center">{getNutrientName(nutrient)}</ListItemText>
								</Grid>
								<Grid item xs={9}>
									<ListItemText className={nutrients[nutrient] > totals[nutrient] ? 'center colorSecondary' : 'center colorPrimary'}>
										{nutrients[nutrient] + " / " + totals[nutrient]}
									</ListItemText>
								</Grid>
							</Grid>
						</ListItem>
						<Divider variant='middle'/>
					</React.Fragment>
				))
			}
		</List>
	)
}