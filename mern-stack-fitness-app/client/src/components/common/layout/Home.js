import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

import trainingimage from '../../../images/TrainingImage.jpg';
import foodimage from '../../../images/FoodImage.jpg';
import trackingimage from '../../../images/TrackingImage.jpg';
import classimage from '../../../images/ClassImage.jpg';
import subscriptionimage from '../../../images/SubscriptionImage.jpg';

import { Grid, CardActionArea, CardMedia, CardContent } from '@material-ui/core';
import { CustomTypography as Typography, BodyContainer, VerticalGrid, FullWidthCard, CustomCardContent, NavLink, HorizontalGrid, ContainerWithPadding } from '../../../style/style'


export const Home = () => {
	const { loggedIn } = useContext(AuthContext);
	return (
		<BodyContainer>
			<Typography className="bold" component="h1" variant="h4">Ha llegado el momento de comenzar tu cambio</Typography>
			<Typography component="h2" variant="h6">En PerFit podrás rodearte de profesionales que te ayudarán a mejorar tu estado físico y tu salud</Typography>
			<ContainerWithPadding>
				<Grid container spacing={6}>
					<Grid item xs={12}>
						<FullWidthCard>
							<HorizontalGrid className="hometab" container spacing={1}>
								<Grid item xs>
									<CardActionArea component={NavLink} to={loggedIn ? `/class/list/${loggedIn._id}` : "#"}>
										<CardMedia
											component="img"
											alt="Imagen suscripciones"
											image={subscriptionimage}
										/>
									</CardActionArea>
								</Grid>
								<Grid item xs={8}>
									<VerticalGrid container>
										<VerticalGrid item xs>
											<Typography component="h3" variant="h5">
												Encuentra el tipo de suscripción que más se ajuste a tus necesidades
											</Typography>
										</VerticalGrid>
										<VerticalGrid item xs>
											<Typography component="p" align="justify">
												Contamos con planes para todos los bolsillos. En caso de dudar, puedes optar por nuestro plan de prueba.
											</Typography>
										</VerticalGrid>
										<VerticalGrid item xs>
											<Typography component="p" align="justify">
												Si tienes las suficientes P-Coins, podrás canjearlas por suscripciones a planes de manera GRATUITA.
											</Typography>
										</VerticalGrid>
									</VerticalGrid>
								</Grid>
							</HorizontalGrid>
						</FullWidthCard>
					</Grid>
					<Grid item xs={12}>
						<FullWidthCard>
							<HorizontalGrid className="hometab" container spacing={1}>
								<Grid item xs={8}>
									<VerticalGrid container>
										<VerticalGrid item xs>
											<Typography component="h3" variant="h5">
												Ponte en forma en compañía con nuestras clases dirigidas
											</Typography>
										</VerticalGrid>
										<VerticalGrid item xs>
											<Typography component="p" align="justify">
												Asiste a clases de forma regular para conseguir P-Coins y canjéalas para obtener beneficios.
											</Typography>
										</VerticalGrid>
										<VerticalGrid item xs>
											<Typography component="p" align="justify">
												Superarse en equipo resulta mucho más divertido. ¡Disfruta de las clases y trata de hacer amigos!
											</Typography>
										</VerticalGrid>
									</VerticalGrid>
								</Grid>
								<Grid item xs>
									<CardActionArea component={NavLink} to={loggedIn ? `/class/list/${loggedIn._id}` : "#"}>
										<CardMedia
											component="img"
											alt="Imagen clases dirigidas"
											image={classimage}
										/>
									</CardActionArea>
								</Grid>
							</HorizontalGrid>
						</FullWidthCard>
					</Grid>
					<Grid item xs={12}>
						<FullWidthCard>
							<HorizontalGrid className="hometab" container spacing={1}>
							<Grid item xs>
								<CardActionArea component={NavLink} to={loggedIn ? `/diet/list/${loggedIn._id}` : "#"}>
									<CardMedia
										component="img"
										alt="Imagen comida"
										image={foodimage}
									/>
								</CardActionArea>
							</Grid>
							<Grid item xs={8}>
									<VerticalGrid container>
										<VerticalGrid item xs>
											<Typography component="h3" variant="h5">
												Controla lo que comes con nuestros planes personalizados de dieta
											</Typography>
										</VerticalGrid>
										<VerticalGrid item xs>
											<Typography component="p" align="justify">
												Establece un diario de comidas para calcular las calorías y macronutrientes que tomas.
											</Typography>
										</VerticalGrid>
										<VerticalGrid item xs>
											<Typography component="p" align="justify">
												Comer de forma equilibrada y saludable tiene gran importancia en la salud, pero no olvides disfrutar de la comida.
											</Typography>
										</VerticalGrid>
									</VerticalGrid>
								</Grid>
							</HorizontalGrid>
						</FullWidthCard>
					</Grid>
					<Grid item xs={12}>
						<FullWidthCard>
							<HorizontalGrid className="hometab" container spacing={1}>
								<Grid item xs={10}>
									<VerticalGrid container>
										<VerticalGrid item xs>
											<Typography component="h3" variant="h5">
												Elabora tus propias rutinas de entrenamiento.
											</Typography>
										</VerticalGrid>
										<VerticalGrid item xs>
											<Typography component="p" align="justify">
												Contamos con una amplia selección de ejercicios que incorporar a tu rutina.
											</Typography>
										</VerticalGrid>
										<VerticalGrid item xs>
											<Typography component="p" align="justify">
												No olvides que también puedes añadir tus propios ejercicios al sistema, de forma que tanto tú como el resto de usuarios puedan verlos.
											</Typography>
										</VerticalGrid>
										<VerticalGrid item xs>
											<Typography component="p" align="justify">
												Personaliza todo lo relacionado con el entrenamiento (pesos utilizados, series, número de repeticiones...)
											</Typography>
										</VerticalGrid>
									</VerticalGrid>
								</Grid>
								<Grid item xs>
									<CardActionArea component={NavLink} to={loggedIn ? `/routine/list/${loggedIn._id}` : "#"}>
										<CardMedia
											component="img"
											alt="Imagen entrenamiento"
											image={trainingimage}
										/>
									</CardActionArea>
								</Grid>
							</HorizontalGrid>
						</FullWidthCard>
					</Grid>
					<Grid item xs={12}>
						<FullWidthCard>
							<HorizontalGrid className="hometab" container spacing={1}>
								<Grid item xs>
									<CardActionArea component={NavLink} to={loggedIn ? `/tracking/list/${loggedIn._id}` : "#"}>
										<CardMedia
											component="img"
											alt="Imagen seguimiento"
											image={trackingimage}
										/>
									</CardActionArea>
								</Grid>
								<Grid item xs={7}>
									<VerticalGrid container>
										<VerticalGrid item xs>
											<Typography component="h3" variant="h5">
												Apunta tu progreso y establece objetivos. 
											</Typography>
										</VerticalGrid>
										<VerticalGrid item xs>
											<Typography component="p" align="justify">
												Puedes fijar objetivos como peso, tamaño de cintura, levantamiento máximo, tiempos de carrera...
											</Typography>
										</VerticalGrid>
										<VerticalGrid item xs>
											<Typography component="p" align="justify">
												¡No te compares con el resto y consigue tu mejor versión!
											</Typography>
										</VerticalGrid>
									</VerticalGrid>
								</Grid>
							</HorizontalGrid>
						</FullWidthCard>
					</Grid>
				</Grid>
			</ContainerWithPadding>
		</BodyContainer>
	);
};