import { Route } from 'react-router-dom';

import { ClassList } from '../../components/class/ClassList.js';
import { CreateClass } from '../../components/class/CreateClass';
import { EditClass } from '../../components/class/EditClass';
import { DeleteClass } from '../../components/class/DeleteClass';
import { ClassInfo } from '../../components/class/ClassInfo';

function ClassRoutes() {
	return (
		<>
			<Route path="/create/class" component={ CreateClass } />
			<Route path="/class/list" component={ ClassList } />
			<Route path="/class/info/:id" component={ ClassInfo } />
			<Route path="/edit/class/:id" component={ EditClass } />
			<Route path="/delete/class/:id" component={ DeleteClass } />
		</>
	)
}

export default ClassRoutes;