import React, {useState, useEffect} from 'react';

import { Badge } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import { getMealsForMonth } from '../../api';

import { WhiteKeyboardDatePicker} from '../../style/style';

import { format, parseISO } from 'date-fns';

import { es } from 'date-fns/locale'

export const DietCalendar = (props) => {
	const selectedDate = props.selectedDate;
	const handleChange = props.handleChange;
	const diet = props.diet;
	const deleted = props.deleted;

	const [selectedDays, setSelectedDays] = useState([]);
	const [activeMonth, setActiveMonth] = useState(new Date());
	const [calendarMeals, setCalendarMeals] = useState()

	useEffect(() => {
		const fetchDays = async () => {
			if(calendarMeals) {
				let days = [];
				calendarMeals.map(meal=>days.push(format(parseISO(meal.diaComida), 'yyyy-MM-dd')))
				setSelectedDays(days);
			}
		}
		fetchDays();
	}, [calendarMeals]);

	useEffect(() => {
		const fetchCalendarMeals = async () => {
			const meals = diet && await getMealsForMonth(diet._id, activeMonth);
			setCalendarMeals(meals);
		}
		fetchCalendarMeals();
	}, [activeMonth, diet, deleted]);

	const renderDaysWithMeals = (date, selectedDate, isInCurrentMonth, dayComponent) => {
		const normalizedDate = format(date, 'yyyy-MM-dd');

		const markDate = isInCurrentMonth && selectedDays.includes(normalizedDate)
		return (
			<Badge badgeContent={markDate ? "🍔" : undefined}>{dayComponent}</Badge>
		)
	}

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
			<WhiteKeyboardDatePicker
				className={"white"}
				value={selectedDate}
				format="dd/MM/yyyy"
				onChange={handleChange}
				renderDay={renderDaysWithMeals}
				onMonthChange={(month => setActiveMonth(month))}
				autoOk
				cancelLabel="Cancelar"
			/>
		</MuiPickersUtilsProvider>
	)
}