import { Route } from 'react-router-dom';

import { ExerciseList } from '../../components/exercise/ExerciseList';
import { CreateExercise } from '../../components/exercise/CreateExercise';
import { EditExercise } from '../../components/exercise/EditExercise';
import { ExerciseInfo } from '../../components/exercise/ExerciseInfo';
import { MyExercises } from '../../components/exercise/MyExercises';

function ExerciseRoutes() {
	return (
		<>
			<Route path="/create/exercise/:routineid?/:trainingid?" component={ CreateExercise } />
			<Route path="/exercise/list" component={ ExerciseList } />
			<Route path="/my/exercises" component={ MyExercises } />
			<Route path="/exercise/info/:id" component={ ExerciseInfo } />
			<Route path="/edit/exercise/:id" component={ EditExercise } />
		</>
	)
}

export default ExerciseRoutes;