import { Route } from 'react-router-dom';
import { MessageInfo } from '../../components/message/MessageInfo';
import { MessageList } from '../../components/message/MessageList';
import { SendMessage } from '../../components/message/SendMessage';

function MessageRoutes() {
	return (
		<>
			<Route exact path="/message/list/:id" component={ MessageList } />
			<Route exact path="/send/message/:id" component={ SendMessage } />
			<Route exact path="/message/info/:id" component={ MessageInfo } />
		</>
	)
}

export default MessageRoutes;
