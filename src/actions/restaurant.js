import { UPDATE_RESTAURANT, GET_RESTAURANT, RESTAURANT_ERROR } from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const getRestaurant = () => async (dispatch) => {
	try {
		const res = await axios.get('http://localhost:3001/api/restaurant');
		dispatch({ type: GET_RESTAURANT, payload: res.data });
	} catch (err) {
		dispatch({ type: RESTAURANT_ERROR });
	}
};

export const updateRestaurant = (newCred) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = { ...newCred };

		const res = await axios.post('http://localhost:3001/api/restaurant', body, config);
		dispatch(setAlert('Restaurant Updated', 'success'));
		dispatch({ type: UPDATE_RESTAURANT, payload: res.data });
	} catch (err) {
		if (err.response) {
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error, 'danger')),
			);
		}

		dispatch({ type: RESTAURANT_ERROR });
	}
};
