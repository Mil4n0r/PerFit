import { Route } from 'react-router-dom';

import { FoodList } from '../../components/food/FoodList';
import { CreateFood } from '../../components/food/CreateFood';
import { EditFood } from '../../components/food/EditFood';
import { DeleteFood } from '../../components/food/DeleteFood';
import { FoodInfo } from '../../components/food/FoodInfo';

function FoodRoutes() {
    return (
        <>
            <Route path="/create/food" component={ CreateFood } />
            <Route path="/food/list" component={ FoodList } />
            <Route path="/food/info/:id" component={ FoodInfo } />
            <Route path="/edit/food/:id" component={ EditFood } />
            <Route path="/delete/food/:id" component={ DeleteFood } />
        </>
    )
}

export default FoodRoutes;

