import React, {useState, useEffect} from 'react';
import { getUser } from '../../api';
import { useRouteMatch } from "react-router-dom";

import {CircularProgress, Grid } from '@material-ui/core';

import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import RestaurantMenuOutlinedIcon from '@material-ui/icons/RestaurantMenuOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';

import {ContainerWithPadding, FullWidthPaper, BodyContainer, CustomTypography as Typography, VerticalGrid, ButtonAvatar, PrimaryLink } from '../../style/style'


export const MyPlans = () => {

	const match = useRouteMatch();
	const [user, setUser] = useState();

	useEffect(() => {
		const fetchUser = async () => {
			const user = await getUser(match.params.id);
			setUser(user);
		}
		fetchUser();
		// (Evita que salte warning por usar cadena vacía)
		// eslint-disable-next-line 
	}, []);		// La cadena vacía hace que solo se ejecute una vez (al pasar a estado componentDidMount())


	return (
		<BodyContainer>
			<Typography component="h2" variant="h5">
				Planes
			</Typography>
			<ContainerWithPadding>
				{
					user && user.permission.includes('checkplans') ? (
						<Grid container spacing={3}>
							<Grid item xs>
								<PrimaryLink to={`/routine/list/${user.userInfo._id}`}>
									<FullWidthPaper>
										<VerticalGrid item xs className="zoom">
											<ButtonAvatar><FitnessCenterOutlinedIcon /></ButtonAvatar>
											<Typography color='primary' className="caps">
												Rutinas
											</Typography>
										</VerticalGrid>
									</FullWidthPaper>
								</PrimaryLink>
							</Grid>
							<Grid item xs>
								<PrimaryLink to={`/diet/list/${user.userInfo._id}`}>
									<FullWidthPaper>
										<VerticalGrid item xs className="zoom">
											<ButtonAvatar><RestaurantMenuOutlinedIcon /></ButtonAvatar>
											<Typography color='primary' className="caps">
												Dietas
											</Typography>
										</VerticalGrid>
									</FullWidthPaper>
								</PrimaryLink>
							</Grid>
							<Grid item xs>
								<PrimaryLink to={`/tracking/list/${user.userInfo._id}`}>
									<FullWidthPaper>
										<VerticalGrid item xs className="zoom">
											<ButtonAvatar><TrendingUpOutlinedIcon /></ButtonAvatar>
											<Typography color='primary' className="caps">
												Seguimientos
											</Typography>
										</VerticalGrid>
									</FullWidthPaper>
								</PrimaryLink>
							</Grid>
						</Grid>
					) : <CircularProgress/>
				}
			</ContainerWithPadding>
		</BodyContainer>
	)
};