import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getExercises, getWorkouts, deleteWorkout } from '../../api';

import { ExerciseList } from '../exercise/ExerciseList';

export const AssociateExercisesToTraining = () => {
	const match = useRouteMatch();
	
	return (
		<ExerciseList training={match.params.id} routine={match.params.routineid}/>
	);
}