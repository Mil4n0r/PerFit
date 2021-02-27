import { Route } from 'react-router-dom';

import { ExerciseList } from '../../components/exercise/ExerciseList';
import { CreateExercise } from '../../components/exercise/CreateExercise';
import { EditExercise } from '../../components/exercise/EditExercise';
import { DeleteExercise } from '../../components/exercise/DeleteExercise';

function ExerciseRoutes() {
	return (
		<>
			<Route path="/create/exercise" component={ CreateExercise } />
			<Route path="/exercise/list" component={ ExerciseList } />
			<Route path="/edit/exercise/:id" component={ EditExercise } />
			<Route path="/delete/exercise/:id" component={ DeleteExercise } />
		</>
	)
}

export default ExerciseRoutes;