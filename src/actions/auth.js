import {
	SET_TABLE,
	REMOVE_TABLE,
	ADMIN_SUCCESS,
	ADMIN_FAIL,
	USER_ERROR,
	GET_USER,
	LOGOUT,
	CLEAR_CATEGORY,
	DISH_ERROR,
	CLEAR_ORDERS,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const setTable = (tableNum) => (dispatch) => {
	dispatch({ type: SET_TABLE, payload: tableNum });
};

export const removeTable = () => (dispatch) => {
	dispatch({ type: REMOVE_TABLE });
};

export const loadUser = () => async (dispatch) => {
	// Add the x-auth-token headers
	if (localStorage.token) {
		axios.defaults.headers.common['x-auth-token'] = localStorage.token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}

	try {
		const res = await axios.get('https://nozama-server.vercel.app/api/auth');
		dispatch({ type: GET_USER, payload: res.data });
	} catch (err) {
		dispatch({ type: USER_ERROR });
	}
};

export const loginUser = ({ email, password }) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = { email, password };

		const res = await axios.post('https://nozama-server.vercel.app/api/auth', body, config);
		dispatch({ type: ADMIN_SUCCESS, payload: res.data.token });
		dispatch(loadUser());
		dispatch(setAlert('Admin Logged in!', 'success', 3000));
	} catch (err) {
		if (err.response.data.errors) {
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error, 'danger')),
			);
		}

		dispatch({ type: ADMIN_FAIL, payload: err.response.data.errors });
	}
};

export const logout = () => (dispatch) => {
	dispatch({ type: DISH_ERROR });
	dispatch({ type: CLEAR_ORDERS });
	dispatch({ type: CLEAR_CATEGORY });
	dispatch({ type: LOGOUT });
	dispatch(setAlert('Logged Out!', 'dark'));
};
