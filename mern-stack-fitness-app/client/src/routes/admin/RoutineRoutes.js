import { Route } from 'react-router-dom';

import { RoutineList } from '../../components/routine/RoutineList';
import { CreateRoutine } from '../../components/routine/CreateRoutine';
import { EditRoutine } from '../../components/routine/EditRoutine';
import { DeleteRoutine } from '../../components/routine/DeleteRoutine';
import { AssociateRoutine } from '../../components/routine/AssociateRoutine';
import { UserRoutineList } from '../../components/routine/UserRoutineList';
import { AssociateExercisesToTraining } from '../../components/training/AssociateExercisesToTraining';
import { AssociateTrainingToRoutine } from '../../components/routine/AssociateTrainingToRoutine';
import { CreateTraining } from '../../components/training/CreateTraining';
import { CreateWorkout } from '../../components/training/CreateWorkout';

//<Route path="/delete/routine/exercise/:id" component={ DeleteExerciseFromRoutine } />
function RoutineRoutes() {
	return (
		<>
			<Route path="/create/routine" component={ CreateRoutine } />
			<Route exact path="/routine/list" component={ RoutineList } />
			<Route exact path="/routine/list/:id" component={ UserRoutineList } />
			<Route path="/edit/routine/:id" component={ EditRoutine } />
			<Route path="/delete/routine/:id" component={ DeleteRoutine } />
			<Route exact path="/associate/routine/:id" component={ AssociateRoutine } />
			<Route exact path="/associate/training/exercise/:id" component={ AssociateExercisesToTraining } />
			<Route exact path="/associate/routine/training/:id" component={ AssociateTrainingToRoutine } />
			<Route exact path="/create/training/:id" component={ CreateTraining } />
			<Route exact path="/create/workout/:trainingid/:exerciseid" component={ CreateWorkout } />
		</>
	)
}

export default RoutineRoutes;