import { Route } from 'react-router-dom';

import { CheckClassAssistance } from '../../components/class/CheckClassAssistance';

function ClassRoutes() {
	return (
		<>
			<Route path="/check/class/assistance/:id" component={ CheckClassAssistance } />
		</>
	)
}

export default ClassRoutes;