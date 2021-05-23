import React from 'react';

import logo from '../../../images/Logo.png'

import { HeaderContainer } from '../../../style/style';

function Header() {
	return (
		<HeaderContainer>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
			<img src={logo} alt="Logo" />
		</HeaderContainer>
	);
}

export default Header;