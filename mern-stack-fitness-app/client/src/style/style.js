import styled from 'styled-components'
import {FormControlLabel, Tooltip, Stepper, Divider, Tab, Tabs, AppBar, Button, TableHead, TableRow, TableCell, TableContainer, Container, Avatar, Typography, Grid, TextField, Select, InputLabel, Modal, Paper, CircularProgress, List, ListItem, ListItemText, LinearProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {green, red, orange, lightGreen} from '@material-ui/core/colors'
import { ErrorMessage } from '@hookform/error-message';

import { KeyboardDatePicker } from "@material-ui/pickers";

import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const HeaderContainer = styled.div`
	background: ${props => props.theme.palette.primary.dark};
	background-size: 100%;
	display: flex;
	justify-content:center;
	align-items:center;
	padding: ${props => props.theme.spacing(2)};
	width: 100%;
	& img {
		max-width: 100%;
	}
`;

const NavLink = styled(Link)`
	color: ${props => props.theme.palette.secondary.main};
	text-decoration: none;
`

const NavProgress = styled(CircularProgress)`
	&& {
		padding: ${props => props.theme.spacing(1)};
		width: 50px;
		height: 50px;
	}
`

const NavBar = styled(AppBar)`
	&& { 
		width: 100%;
		padding: 0;
		margin: 0;
		background: ${props => props.theme.palette.primary.dark};
		align-items: center;
		justify-content: center;
	}
`

const NavTab = styled(Tab)`
	&& { 
		text-decoration: none;
		color: white;
	}
	&:hover {
		color: ${props => props.theme.palette.secondary.main};
	}
`

const NavTabs = styled(Tabs)`
	&& {
		width: 100%;
	}
`

const LogOutButton = styled(Button)({
	
})

const CustomTableHead = styled(TableHead)`
	&& {
		background: ${props => props.theme.palette.primary.dark};
	}
`

const CustomTableRow = styled(TableRow)`
`

const BodyContainer = styled(Container)`
	&& {
		display: flex;
		padding: ${props => props.theme.spacing(2)};
		text-align: center;
		justify-content:center;
		align-items:center;
		flex-direction: column;
	}
`

const FormContainer = styled(Container)`
	&& {
		display: flex;
		padding: ${props => props.theme.spacing(2)};
		text-align: left;
		justify-content:center;
		align-items:center;
		flex-direction: column;
	}
`

const TableHeaderCell = styled(TableCell)`
	&& {
		color: white;
		font-weight: bold;
	}
`

const TableBottomRow = styled(TableRow)`
&& {
	background: ${props => props.theme.palette.primary.dark};
}
`

const CustomTableCell = styled(TableCell)`
	&.center {
		text-align: center;
	}
	&.colorPrimary {
		color: ${props => props.theme.palette.primary.main};
	}
	&.colorSecondary {
		color: ${props => props.theme.palette.secondary.main};
	}
	&.separator {
		border-bottom: 2px solid ${props => props.theme.palette.primary.light};
	}
`

const LoginButton = styled(Button)`
	&& {
		margin-top: ${props => props.theme.spacing(2)};
		margin-bottom: ${props => props.theme.spacing(2)};
	}
`

const LoginAvatar = styled(Avatar)`
	&& {
		background-color: ${props => props.theme.palette.secondary.main};
		margin: ${props => props.theme.spacing(2)};
	}
`

const RegisterAvatar = styled(Avatar)`
	&& {
		background-color: ${props => props.theme.palette.primary.main};
		margin: ${props => props.theme.spacing(2)};
	}
`

const ButtonAvatar = styled(Avatar)`
	&& {
		background-color: ${props => props.theme.palette.primary.main};
		margin: ${props => props.theme.spacing(2)};
	}
`

const ButtonAvatarSecondary = styled(Avatar)`
	&& {
		background-color: ${props => props.theme.palette.secondary.main};
		margin: ${props => props.theme.spacing(2)};
	}
`

const FullWidthForm = styled.form`
	& .error {
		color: ${red[500]}; // Color de los errores
	}
	width: 100%;
`

const CustomTypography = styled(Typography)`
	&.MuiTypography-h5 {
		font-weight: bold;
	}
	&.caps {
		text-transform: uppercase;
	}
	&.bold {
		font-weight: bold;
	}
	&.center {
		text-align: center;
	}
`

const ButtonsContainer = styled(Container)`
	&& {
		margin: ${props => props.theme.spacing(2)} 0 0 0;
		padding: 0
	}
`

const TextFieldWithMargin = styled(TextField)`
	&:first-child {
		margin: ${props => props.theme.spacing(2)} 0 ${props => props.theme.spacing(2)} 0;
	}
	& {
		margin: ${props => props.theme.spacing(2)} 0 ${props => props.theme.spacing(1)} 0;
	}
`

const SelectWithMargin = styled(Select)`
	&& {
		margin: 0 0 ${props => props.theme.spacing(1)} 0;
	}
`

const InputLabelWithMargin = styled(InputLabel)`
	&& {
		margin: ${props => props.theme.spacing(2)} 0 0 0;
	}
`

const VerticalGrid = styled(Grid)`
	&& {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: ${props => props.theme.spacing(2)}
	}
	&.zoom:hover {
		transform: scale(1.2);
		overflow: hidden;
	}
`

const InputLabelWithoutMargin = styled(InputLabel)`
	&& {
		margin: 0;
	}
`

const HorizontalGrid = styled(Grid)`
	&& {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: ${props => props.theme.spacing(0.2)};
	}
	&.centerText {
		text-align:center;
	}
`

const PrimaryLink = styled(Link)`
	&& {
		color: ${props => props.theme.palette.primary.main};
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
`

const TableContainerWithMargin = styled(TableContainer)`
	&& {
		margin: ${props => props.theme.spacing(2)}
	}
`

const CenterPaper = styled(Paper)`
	&& {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
`

const CapacityInputLabel = styled(InputLabel)`
	&.AlmostFull {
		color: ${orange["A400"]};
	}
	&.Full {
		color: ${red["A400"]};
	}
	&.Available {
		color: ${green["A700"]};
	}
`

const FullWidthPaper = styled(Paper)`
	&& {
		width: 100%;
		overflow: hidden;
	}
	&.external {
		padding: ${props => props.theme.spacing(1)};
	}
`

const HorizontalList = styled(List)`
	&& {
		display: flex;
		flexDirection: row;
	}
`

const CustomListItemText = styled(ListItemText)`
	&.center {
		text-align: center;
	}
	&.colorPrimary {
		color: ${props => props.theme.palette.primary.main};
	}
	&.colorSecondary {
		color: ${props => props.theme.palette.secondary.main};
	}
	&.bold span {
		font-weight: bold;
	}	
	
`
const CustomListItem = styled(ListItem)`

`

const ContainerWithPadding = styled(Container)`
	&& {
		padding: ${props => props.theme.spacing(2)}
	}
`

const VerticalDivider = styled(Divider)`
	&& {
		margin: -1px;
	}
`

const NutrientBar = styled(LinearProgress)`
	& .MuiLinearProgress-colorPrimary {
		background-color: ${props => props.theme.palette.primary.light};
	}
	& .MuiLinearProgress-barColorPrimary {
		background-color: ${props => props.theme.palette.primary.main};
	}
	& .MuiLinearProgress-colorSecondary {
		background-color: ${props => props.theme.palette.secondary.light};
	}
	& .MuiLinearProgress-barColorSecondary {
		background-color: ${props => props.theme.palette.secondary.main};
	}
`

const CustomDeleteForeverOutlinedIcon = styled(DeleteForeverOutlinedIcon)`
	&& {
		color: ${props => props.theme.palette.secondary.light};
	}
`

const CustomEditOutlinedIcon = styled(EditOutlinedIcon)`
	&& {
		color: ${props => props.theme.palette.primary.light};
	}
`

const NoBackgroundStepper = styled(Stepper)`
	&& {
		background: transparent;
	}
`

const WhiteKeyboardDatePicker = styled(KeyboardDatePicker)`
	& .MuiInput-root, & .MuiInputAdornment-root button {
		color: white;
	}
	& .MuiInput-underline {
		border-bottom: 1px solid white;
	}

`

const CircleLink = styled(Link)`
	&& {
		border-width: 1px;
		border-style: solid;
		border-radius: 5px;
		transform: scale(1.2);
	}
	&.primary {
		border-color: ${props => props.theme.palette.primary.light};
	}
	&.secondary {
		border-color: ${props => props.theme.palette.secondary.light};
	}
`

const HiddenTextField = styled(TextField)`
	&& {
		display: none
	}
`

const CustomToolTip = styled(Tooltip)`
	&& {
		white-space: pre-wrap;
	}
`

const NoMarginFormControlLabel = styled(FormControlLabel)`
	&& {
		margin: 0
	}
`

export {ButtonAvatarSecondary, NoMarginFormControlLabel, CustomToolTip, HiddenTextField, CircleLink, TableBottomRow, WhiteKeyboardDatePicker, NoBackgroundStepper, CustomTableCell, CustomDeleteForeverOutlinedIcon, CustomEditOutlinedIcon, NutrientBar, VerticalDivider, CustomListItem, ContainerWithPadding, HorizontalList, HeaderContainer, NavTab, NavProgress, NavLink, NavTabs, NavBar, LogOutButton, CustomTableHead, CustomTableRow, BodyContainer, FormContainer, TableHeaderCell, LoginButton, LoginAvatar, RegisterAvatar, ButtonAvatar, FullWidthForm, CustomTypography, ButtonsContainer, TextFieldWithMargin, SelectWithMargin, InputLabelWithMargin, InputLabelWithoutMargin, VerticalGrid, HorizontalGrid, PrimaryLink, TableContainerWithMargin, CenterPaper, CapacityInputLabel, FullWidthPaper, CustomListItemText}