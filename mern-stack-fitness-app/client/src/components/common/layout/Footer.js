import React from 'react';

import { Divider, Typography, Box, Container, List, ListItemText, ListItemAvatar, ListItem, Grid } from '@material-ui/core';
import { FooterContainer, HorizontalGrid, VerticalGrid, HorizontalList, FooterLink, VerticalDivider } from '../../../style/style'

import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';

function Footer() {
	return (
	<FooterContainer>
		<Box>
			<VerticalGrid container spacing={1}>
				<VerticalGrid item xs>
					<HorizontalList>
						<ListItem>
							<ListItemText>
								<FooterLink to='#contact'>Contacto</FooterLink>
							</ListItemText>
						</ListItem>
						<Divider orientation="vertical" flexItem/>
						<ListItem>
							<ListItemText>
								<FooterLink to='#aboutme'>Sobre mi</FooterLink>
							</ListItemText>
						</ListItem>
						<Divider orientation="vertical" flexItem/>
						<ListItem>
							<ListItemText>
								<FooterLink to='#faq'>Preguntas frecuentes</FooterLink>
							</ListItemText>
						</ListItem>
						<Divider orientation="vertical" flexItem/>
						<ListItem>
							<ListItemText>
								<FooterLink to='#location'>Ubicación</FooterLink>
							</ListItemText>
						</ListItem>
					</HorizontalList>
					<HorizontalList>
						<ListItem>
							<ListItemAvatar>
								<FooterLink to='#instagram'>
									<InstagramIcon/>
								</FooterLink>
							</ListItemAvatar>
						</ListItem>
						<ListItem>
							<ListItemAvatar>
								<FooterLink to='#twitter'>
									<TwitterIcon/>
								</FooterLink>
							</ListItemAvatar>
						</ListItem>
						<ListItem >
							<ListItemAvatar>
								<FooterLink to='#facebook'>
									<FacebookIcon/>
								</FooterLink>
							</ListItemAvatar>
						</ListItem>
						<ListItem>
							<ListItemAvatar>
								<FooterLink to='#youtube'>
									<YouTubeIcon/>
								</FooterLink>
							</ListItemAvatar>
						</ListItem>
					</HorizontalList>
					<Typography color='textSecondary'>
						@ 2021 PerFit - Universidad de Granada
					</Typography>
				</VerticalGrid>
			</VerticalGrid>		
		</Box>
	</FooterContainer>
	);
};

export default Footer;