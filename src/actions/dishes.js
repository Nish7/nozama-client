import {
	GET_DISHES,
	GET_DISH,
	DISH_ERROR,
	REMOVE_DISH,
	UPDATE_DISH,
	DISH_CLEAR,
	ADD_DISH,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const getDishes = () => async (dispatch) => {
	dispatch({ type: DISH_CLEAR });

	try {
		const res = await axios.get('http://localhost:3001/api/product');
		dispatch({ type: GET_DISHES, payload: res.data });
	} catch (err) {
		dispatch({ type: DISH_ERROR });
	}
};

export const getDish = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`http://localhost:3001/api/product/${id}`);
		dispatch({ type: GET_DISH, payload: res.data });
	} catch (err) {
		dispatch({ type: DISH_ERROR });
	}
};

export const addDish = (newDish, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = { ...newDish };

		const res = await axios.post('http://localhost:3001/api/product', body, config);
		dispatch({ type: ADD_DISH, payload: res.data });
		dispatch(setAlert('New Product Added', 'success'));
		history.push('/admin/products');
	} catch (err) {
		if (err.response) {
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error, 'danger')),
			);
		}

		dispatch({ type: DISH_ERROR });
	}
};

export const updateDish = (dish, id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = { ...dish };

		const res = await axios.put(`http://localhost:3001/api/product/${id}`, body, config);
		dispatch({ type: UPDATE_DISH, payload: res.data });
		dispatch(setAlert('Product Updated!', 'success'));
	} catch (err) {
		if (err.response) {
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error, 'danger')),
			);
		}

		dispatch({ type: DISH_ERROR });
	}
};

export const removeDish = (dishId, history) => async (dispatch) => {
	try {
		await axios.delete(`http://localhost:3001/api/product/${dishId}`);
		dispatch({ type: REMOVE_DISH, payload: dishId });
		dispatch(setAlert('Product Removed', 'dark'));
	} catch (err) {
		if (err.response) {
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error, 'danger')),
			);
		}

		dispatch({ type: DISH_ERROR });
	}
};
