import React, {useState, useEffect} from 'react';
import { getUser } from '../../api';
import { useRouteMatch } from "react-router-dom";

import {CircularProgress, Grid, Card, CardActionArea } from '@material-ui/core';

import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import RestaurantMenuOutlinedIcon from '@material-ui/icons/RestaurantMenuOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';

import {FullWidthCard, ContainerWithPadding, FullWidthPaper, BodyContainer, CustomTypography as Typography, VerticalGrid, ButtonAvatar, PrimaryLink, NavLink, HorizontalGrid, CustomCardContent } from '../../style/style'


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
						<VerticalGrid container spacing={3}>
							<VerticalGrid className="fullWidth" item>
								<FullWidthCard className="card">
									<CardActionArea component={NavLink} to={`/routine/list/${user.userInfo._id}`}>
										<CustomCardContent>
											<HorizontalGrid container spacing={4}>
												<HorizontalGrid className="logo" item xs>
													<ButtonAvatar><FitnessCenterOutlinedIcon /></ButtonAvatar>
												</HorizontalGrid>
												<HorizontalGrid item xs>
													<Typography className="white caps" component="h2" variant="h5">
														Rutinas
													</Typography>
												</HorizontalGrid>
											</HorizontalGrid>
										</CustomCardContent>
									</CardActionArea>
								</FullWidthCard>
							</VerticalGrid>
							<VerticalGrid className="fullWidth" item>
								<FullWidthCard className="card">
									<CardActionArea component={NavLink} to={`/diet/list/${user.userInfo._id}`}>
										<CustomCardContent>
											<HorizontalGrid container spacing={4}>
												<HorizontalGrid className="logo" item xs>
													<ButtonAvatar><RestaurantMenuOutlinedIcon /></ButtonAvatar>
												</HorizontalGrid>
												<HorizontalGrid item xs>
													<Typography className="white caps" component="h2" variant="h5">
														Dietas
													</Typography>
												</HorizontalGrid>
											</HorizontalGrid>
										</CustomCardContent>
									</CardActionArea>
								</FullWidthCard>
							</VerticalGrid>
							<VerticalGrid className="fullWidth" item>
								<FullWidthCard className="card">
									<CardActionArea component={NavLink} to={`/tracking/list/${user.userInfo._id}`}>
										<CustomCardContent>
											<HorizontalGrid container spacing={4}>
												<HorizontalGrid className="logo" item xs>
													<ButtonAvatar><TrendingUpOutlinedIcon /></ButtonAvatar>
												</HorizontalGrid>
												<HorizontalGrid item xs>
													<Typography className="white caps" component="h2" variant="h5">
													Seguimientos
													</Typography>
												</HorizontalGrid>
											</HorizontalGrid>
										</CustomCardContent>
									</CardActionArea>
								</FullWidthCard>
							</VerticalGrid>
						</VerticalGrid>
					) : <CircularProgress/>
				}
			</ContainerWithPadding>
		</BodyContainer>
	)
};