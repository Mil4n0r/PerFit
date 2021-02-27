import { Route } from 'react-router-dom';

import { RoutineList } from '../../components/routine/RoutineList';
import { CreateRoutine } from '../../components/routine/CreateRoutine';
import { EditRoutine } from '../../components/routine/EditRoutine';
import { DeleteRoutine } from '../../components/routine/DeleteRoutine';

function RoutineRoutes() {
	return (
		<>
			<Route path="/create/routine" component={ CreateRoutine } />
			<Route path="/routine/list" component={ RoutineList } />
			<Route path="/edit/routine/:id" component={ EditRoutine } />
			<Route path="/delete/routine/:id" component={ DeleteRoutine } />
		</>
	)
}

export default RoutineRoutes;