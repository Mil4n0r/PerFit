import { Route } from 'react-router-dom';

import { RoutineList } from '../../components/routine/RoutineList';
import { CreateRoutine } from '../../components/routine/CreateRoutine';
import { EditRoutine } from '../../components/routine/EditRoutine';
import { DeleteRoutine } from '../../components/routine/DeleteRoutine';
import { AssociateRoutineToUser } from '../../components/routine/AssociateRoutineToUser';
import { UserRoutineList } from '../../components/routine/UserRoutineList';
import { AssociateExercisesToTraining } from '../../components/training/AssociateExercisesToTraining';
import { AssociateTrainingToRoutine } from '../../components/routine/AssociateTrainingToRoutine';
import { CreateTraining } from '../../components/training/CreateTraining';
import { CreateWorkout } from '../../components/training/CreateWorkout';
import { EditWorkout } from '../../components/training/EditWorkout';
import { EditTraining } from '../../components/training/EditTraining';

/*
	<Route path="/create/routine" component={ CreateRoutine } />
*/

function RoutineRoutes() {
	return (
		<>
			<Route exact path="/routine/list" component={ RoutineList } />
			<Route exact path="/routine/list/:id" component={ UserRoutineList } />
			<Route path="/edit/routine/:userid/:id" component={ EditRoutine } />
			<Route path="/delete/routine/:userid/:id" component={ DeleteRoutine } />
			<Route exact path="/associate/routine/:id" component={ AssociateRoutineToUser } />
			<Route exact path="/associate/training/exercise/:id" component={ AssociateExercisesToTraining } />
			<Route exact path="/associate/routine/training/:id" component={ AssociateTrainingToRoutine } />
			<Route exact path="/create/training/:id" component={ CreateTraining } />
			<Route exact path="/create/workout/:trainingid/:exerciseid" component={ CreateWorkout } />
			<Route exact path="/edit/workout/:trainingid/:id" component={ EditWorkout } />
			<Route exact path="/edit/training/:routineid/:id" component={ EditTraining } />
		</>
	)
}

export default RoutineRoutes;