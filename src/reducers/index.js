import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import menu from './menu';
import dishes from './dishes';
import tray from './tray';
import categories from './categories';
import orders from './orders';
import restaurant from './restaurant';

export default combineReducers({
	alert,
	auth,
	menu,
	tray,
	dishes,
	orders,
	restaurant,
	categories,
});
