import { Route } from 'react-router-dom';

import { ClassList } from '../../components/class/ClassList.js';
import { CreateClass } from '../../components/class/CreateClass';
import { EditClass } from '../../components/class/EditClass';
import { DeleteClass } from '../../components/class/DeleteClass';
import { ClassInfo } from '../../components/class/ClassInfo';
import { JoinClass } from '../../components/class/JoinClass';
import { LeaveClass } from '../../components/class/LeaveClass';

function ClassRoutes() {
	return (
		<>
			<Route path="/create/class" component={ CreateClass } />
			<Route path="/class/list" component={ ClassList } />
			<Route path="/class/info/:id" component={ ClassInfo } />
			<Route path="/edit/class/:id" component={ EditClass } />
			<Route path="/delete/class/:id" component={ DeleteClass } />
			<Route path="/join/class/:id" component={ JoinClass } />
			<Route path="/leave/class/:id" component={ LeaveClass } />
		</>
	)
}

export default ClassRoutes;