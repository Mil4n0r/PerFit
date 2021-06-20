import { Route } from 'react-router-dom';

import { CreateClass } from '../../components/class/CreateClass';
import { EditClass } from '../../components/class/EditClass';

function ClassRoutes() {
	return (
		<>
			<Route path="/create/class" component={ CreateClass } />
			<Route path="/edit/class/:id" component={ EditClass } />
		</>
	)
}

export default ClassRoutes;