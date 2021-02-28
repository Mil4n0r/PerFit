import { Route } from 'react-router-dom';

import { RoutineList } from '../../components/routine/RoutineList';
import { CreateRoutine } from '../../components/routine/CreateRoutine';
import { EditRoutine } from '../../components/routine/EditRoutine';
import { DeleteRoutine } from '../../components/routine/DeleteRoutine';
import { AssociateRoutine } from '../../components/routine/AssociateRoutine';
import { UserRoutineList } from '../../components/routine/UserRoutineList';

function RoutineRoutes() {
	return (
		<>
			<Route path="/create/routine" component={ CreateRoutine } />
			<Route exact path="/routine/list" component={ RoutineList } />
			<Route exact path="/routine/list/:id" component={ UserRoutineList } />
			<Route path="/edit/routine/:id" component={ EditRoutine } />
			<Route path="/delete/routine/:id" component={ DeleteRoutine } />
			<Route path="/associate/routine/:id" component={ AssociateRoutine } />
		</>
	)
}

export default RoutineRoutes;