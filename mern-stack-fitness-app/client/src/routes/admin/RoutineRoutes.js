import { Route } from 'react-router-dom';

import { EditRoutine } from '../../components/routine/EditRoutine';
import { AssociateRoutineToUser } from '../../components/routine/AssociateRoutineToUser';
import { UserRoutineList } from '../../components/routine/UserRoutineList';
import { AssociateExercisesToTraining } from '../../components/training/AssociateExercisesToTraining';
import { AssociateTrainingToRoutine } from '../../components/routine/AssociateTrainingToRoutine';
import { CreateTraining } from '../../components/training/CreateTraining';
import { CreateWorkout } from '../../components/training/CreateWorkout';
import { EditWorkout } from '../../components/training/EditWorkout';
import { EditTraining } from '../../components/training/EditTraining';
import { RoutineInfo } from '../../components/routine/RoutineInfo';

function RoutineRoutes() {
	return (
		<>
			<Route exact path="/routine/list/:id" component={ UserRoutineList } />
			<Route exact path="/routine/info/:id" component={ RoutineInfo } />
			<Route path="/edit/routine/:userid/:id" component={ EditRoutine } />
			<Route exact path="/associate/routine/:id" component={ AssociateRoutineToUser } />
			<Route exact path="/associate/training/exercise/:routineid/:id" component={ AssociateExercisesToTraining } />
			<Route exact path="/associate/routine/training/:id" component={ AssociateTrainingToRoutine } />
			<Route exact path="/create/training/:id" component={ CreateTraining } />
			<Route exact path="/create/workout/:routineid/:trainingid/:exerciseid" component={ CreateWorkout } />
			<Route exact path="/edit/workout/:routineid/:trainingid/:id" component={ EditWorkout } />
			<Route exact path="/edit/training/:routineid/:id" component={ EditTraining } />
		</>
	)
}

export default RoutineRoutes;