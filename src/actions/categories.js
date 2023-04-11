import {
	GET_CATEGORIES,
	UPDATE_CATEGORY,
	ADD_CATEGORY,
	REMOVE_CATEGORY,
	GET_CATEGORY,
	CATEGORY_ERROR,
	CLEAR_CATEGORY,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const getCategories = () => async (dispatch) => {
	dispatch({ type: CLEAR_CATEGORY });
	try {
		const res = await axios.get('https://nozama-server.vercel.app/api/category');
		dispatch({ type: GET_CATEGORIES, payload: res.data });
	} catch (err) {
		dispatch({ type: CATEGORY_ERROR });
	}
};

export const updateCategory = (updateCategory, id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = { ...updateCategory };

		const res = await axios.put(`https://nozama-server.vercel.app/api/category/${id}`, body, config);
		dispatch({ type: UPDATE_CATEGORY, payload: res.data });
		dispatch(setAlert('Category Updated!', 'success'));
	} catch (err) {
		if (err.response) {
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error, 'danger')),
			);
		}

		dispatch({ type: CATEGORY_ERROR });
	}
};

export const removeCategory = (categoryId) => async (dispatch) => {
	try {
		await axios.delete(`https://nozama-server.vercel.app/api/category/${categoryId}`);
		dispatch({ type: REMOVE_CATEGORY, payload: categoryId });
		dispatch(setAlert('Category Removed', 'dark'));
	} catch (err) {
		if (err.response) {
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error, 'danger')),
			);
		}

		dispatch({ type: CATEGORY_ERROR });
	}
};

export const getCategory = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`https://nozama-server.vercel.app/api/category/${id}`);
		dispatch({ type: GET_CATEGORY, payload: res.data });
	} catch (err) {
		dispatch({ type: CATEGORY_ERROR });
	}
};

export const addCategory = (newCategory, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = { ...newCategory };

		const res = await axios.post('https://nozama-server.vercel.app/api/category', body, config);
		dispatch({ type: ADD_CATEGORY, payload: res.data });
		dispatch(setAlert('New Category Added', 'success'));
		history.push('/admin/categories');
	} catch (err) {
		if (err.response) {
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error, 'danger')),
			);
		}

		dispatch({ type: CATEGORY_ERROR });
	}
};
