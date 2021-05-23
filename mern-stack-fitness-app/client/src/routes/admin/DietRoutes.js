import { Route } from 'react-router-dom';

import { DietList } from '../../components/diet/DietList';
import { CreateDiet } from '../../components/diet/CreateDiet';
import { EditDiet } from '../../components/diet/EditDiet';
import { DeleteDiet } from '../../components/diet/DeleteDiet';
import { AssociateDietToUser } from '../../components/diet/AssociateDietToUser';
import { UserDietList } from '../../components/diet/UserDietList';
import { AssociateFoodsToMeal } from '../../components/meal/AssociateFoodsToMeal';
import { AssociateMealToDiet } from '../../components/diet/AssociateMealToDiet';
import { CreateMeal } from '../../components/meal/CreateMeal';
import { CreateRation } from '../../components/meal/CreateRation';
import { EditRation } from '../../components/meal/EditRation';
import { EditMeal } from '../../components/meal/EditMeal';

/* 
	<Route path="/create/diet" component={ CreateDiet } />
*/

function DietRoutes() {
	return (
		<>
			<Route exact path="/diet/list" component={ DietList } />
			<Route exact path="/diet/list/:id" component={ UserDietList } />
			<Route path="/edit/diet/:userid/:id" component={ EditDiet } />
			<Route path="/delete/diet/:userid/:id" component={ DeleteDiet } />
			<Route exact path="/associate/diet/:id" component={ AssociateDietToUser } />
			<Route exact path="/associate/meal/food/:id" component={ AssociateFoodsToMeal } />
			<Route exact path="/associate/diet/meal/:id" component={ AssociateMealToDiet } />
			<Route exact path="/create/meal/:id" component={ CreateMeal } />
			<Route exact path="/create/ration/:mealid/:foodid" component={ CreateRation } />
			<Route exact path="/edit/ration/:mealid/:id" component={ EditRation } />
			<Route exact path="/edit/meal/:dietid/:id" component={ EditMeal } />
		</>
	)
}

export default DietRoutes;