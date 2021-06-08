import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getFoods, getRations, deleteRation } from '../../api';

import { Table, TableBody, TableCell, Paper, List, ListItem, Divider, Grid, CircularProgress } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { CustomListItemText as ListItemText, NutrientBar, VerticalDivider, HorizontalGrid, CustomTableHead as TableHead, BodyContainer, CustomTableRow as TableRow, TableHeaderCell, CustomTypography as Typography, TableContainerWithMargin as TableContainer } from '../../style/style';
import { FoodList } from '../food/FoodList';

export const AssociateFoodsToMeal = () => {
	const match = useRouteMatch();

	return ( 
		<FoodList meal={match.params.id} diet={match.params.dietid}/>
	)
}
