import { GET_MENU, MENU_ERROR } from './types';
import axios from 'axios';

export const getMenu = () => async (dispatch) => {
	try {
		const res = await axios.get('http://localhost:3001/api/menu');
		dispatch({ type: GET_MENU, payload: res.data });
	} catch (err) {
		dispatch({ type: MENU_ERROR, payload: err.response.data });
	}
};
