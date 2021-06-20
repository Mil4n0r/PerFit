import { Route } from 'react-router-dom';

import { RequestList } from '../../components/request/RequestList';

function RequestRoutes() {
	return (
		<>
			<Route exact path="/request/list/:id" component={ RequestList } />
		</>
	)
}

export default RequestRoutes;
