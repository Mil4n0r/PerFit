

import React from 'react';

import { Button } from '@material-ui/core';
import {HorizontalGrid, CustomTypography as Typography, ErrorDrawer} from '../../../style/style'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

function ErrorDisplayer(props) {
	const closeError = () => {
		props.setError();
	};

	return (
		props.error ? (
			<ErrorDrawer
				color='secondary'
				anchor="top"
				open={Boolean(props.error)}
				onClose={closeError}
			>
				<HorizontalGrid container spacing={1}>
					<HorizontalGrid item xs={3}>
						<ErrorOutlineOutlinedIcon/>
					</HorizontalGrid>
					<HorizontalGrid item xs={6}>
						<Typography>{props.error.data}</Typography>
					</HorizontalGrid>
					<HorizontalGrid item xs={3}>
						<Button onClick={closeError}><CloseOutlinedIcon	/></Button>
					</HorizontalGrid>
				</HorizontalGrid>
			</ErrorDrawer>
		) : <></>
	)
}

export default ErrorDisplayer;