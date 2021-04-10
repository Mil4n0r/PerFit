import { Route } from 'react-router-dom';

//import { MeasureList } from '../../components/measure/MeasureList';
import { AssociateMeasureToTracking } from '../../components/measure/AssociateMeasureToTracking';
import { EditMeasure } from '../../components/measure/EditMeasure';
import { DeleteMeasure } from '../../components/measure/DeleteMeasure';
import { MeasureInfo } from '../../components/measure/MeasureInfo';
import { CreateMeasure } from '../../components/measure/CreateMeasure';

/*
<Route path="/measure/list" component={ MeasureList } />
<Route path="/measure/info/:id" component={ MeasureInfo } />
<Route path="/delete/measure/:id" component={ DeleteMeasure } />
*/

function ExerciseRoutes() {
	return (
		<>
			<Route exact path="/associate/tracking/measure/:id" component={ AssociateMeasureToTracking } />
            <Route exact path="/create/measure/:id" component={ CreateMeasure } />
			<Route path="/edit/measure/:trackingid/:id" component={ EditMeasure } />
		</>
	)
}

export default ExerciseRoutes;