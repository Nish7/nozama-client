import {
	CLEAR_TRAY,
	ADD_TO_PASTORDERS,
	GET_ORDERS,
	ADD_ORDER,
	ORDER_ERROR,
	ORDER_FAIL,
	STATUS_UPDATE,
} from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const submitOrder = ({ dishes, tableNum }) => async (dispatch) => {
	dispatch({ type: CLEAR_TRAY });
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = JSON.stringify({ dishes, tableNum });

		const res = await axios.post('https://nozama-server.vercel.app/api/order', body, config);

		dispatch(
			setAlert(
				`Order Successful : Order Number ${res.data.orderId} `,
				'success',
				6000,
			),
		);
		dispatch({ type: ADD_TO_PASTORDERS, payload: res.data });
	} catch (err) {
		if (err)
			err.response.data.errors.forEach((error) =>
				dispatch(setAlert(error, 'danger')),
			);
	}
};

export const getOrders = (date) => async (dispatch) => {
	try {
		const res = await axios.get(`https://nozama-server.vercel.app/api/order?date=${date}`);
		dispatch({ type: GET_ORDERS, payload: res.data });
	} catch (err) {
		dispatch({ type: ORDER_FAIL });
	}
};

export const addOrder = (newOrder) => (dispatch) => {
	dispatch({ type: ADD_ORDER, payload: newOrder });
};

export const changeStatus = (id, status) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = { status };

		const res = await axios.put(`https://nozama-server.vercel.app/api/order/${id}/status`, body, config);
		dispatch({ type: STATUS_UPDATE, payload: res.data });
	} catch (err) {
		dispatch({ type: ORDER_ERROR });
	}
};
