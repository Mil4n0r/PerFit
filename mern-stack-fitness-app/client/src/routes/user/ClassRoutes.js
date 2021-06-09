import { Route } from 'react-router-dom';

import { ClassList } from '../../components/class/ClassList.js';
import { ClassInfo } from '../../components/class/ClassInfo';

function ClassRoutes() {
	return (
		<>
			<Route path="/class/list" component={ ClassList } />
			<Route path="/class/info/:id" component={ ClassInfo } />
		</>
	)
}

export default ClassRoutes;