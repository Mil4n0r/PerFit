import React, {useState, useEffect} from 'react';

import { Badge } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import { getTrainingsForMonth } from '../../api';

import { WhiteKeyboardDatePicker} from '../../style/style';

import { format, parseISO } from 'date-fns';

import { es } from 'date-fns/locale'

export const RoutineCalendar = (props) => {
	const selectedDate = props.selectedDate;
	const handleChange = props.handleChange;
	const routine = props.routine;
	const deleted = props.deleted;

	const [selectedDays, setSelectedDays] = useState([]);
	const [activeMonth, setActiveMonth] = useState(new Date());
	const [calendarTrainings, setCalendarTrainings] = useState()

	useEffect(() => {
		const fetchDays = async () => {
			if(calendarTrainings) {
				let days = [];
				calendarTrainings?.map(training=>days.push(format(parseISO(training.diaEntrenamiento), 'yyyy-MM-dd')))
				setSelectedDays(days);
			}
		}
		fetchDays();
	}, [calendarTrainings]);

	useEffect(() => {
		const fetchCalendarTrainings = async () => {
			const trainings = routine && await getTrainingsForMonth(routine._id, activeMonth);
			setCalendarTrainings(trainings);
		}
		fetchCalendarTrainings();
	}, [activeMonth, routine, deleted]);

	const renderDaysWithTrainings = (date, selectedDate, isInCurrentMonth, dayComponent) => {
		const normalizedDate = format(date, 'yyyy-MM-dd');

		const markDate = isInCurrentMonth && selectedDays.includes(normalizedDate)
		return (
			<Badge badgeContent={markDate ? "🏋️" : undefined}>{dayComponent}</Badge>
		)
	}

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
			<WhiteKeyboardDatePicker
				className={"white"}
				value={selectedDate}
				format="dd/MM/yyyy"
				onChange={handleChange}
				renderDay={renderDaysWithTrainings}
				onMonthChange={(month => setActiveMonth(month))}
				autoOk
				cancelLabel="Cancelar"
			/>
		</MuiPickersUtilsProvider>
	)
}