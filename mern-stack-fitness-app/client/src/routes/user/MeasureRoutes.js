import { Route } from 'react-router-dom';

//import { MeasureList } from '../../components/measure/MeasureList';
import { AssociateMeasureToTracking } from '../../components/measure/AssociateMeasureToTracking';
import { EditMeasure } from '../../components/measure/EditMeasure';
import { CreateMeasure } from '../../components/measure/CreateMeasure';

function ExerciseRoutes() {
	return (
		<>
			<Route exact path="/create/measure/:id" component={ CreateMeasure } />
			<Route path="/edit/measure/:trackingid/:id" component={ EditMeasure } />
			<Route exact path="/associate/tracking/measure/:id" component={ AssociateMeasureToTracking } />
		</>
	)
}

export default ExerciseRoutes;