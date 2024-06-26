import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuid } from 'uuid';

export const setAlert = (msg, alertType, timeout = 4000) => (dispatch) => {
	const id = uuid();

	dispatch({
		type: SET_ALERT,
		payload: { msg, alertType, id },
	});

	setTimeout(() => {
		dispatch({
			type: REMOVE_ALERT,
			payload: id,
		});
	}, timeout);
};

export const removeAlert = (id) => (dispatch) => {
	dispatch({
		type: REMOVE_ALERT,
		payload: id,
	});
};
