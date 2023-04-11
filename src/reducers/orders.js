import {
	GET_ORDERS,
	CLEAR_ORDERS,
	ORDER_ERROR,
	ADD_ORDER,
	ADD_TO_PASTORDERS,
	STATUS_UPDATE,
} from '../actions/types';

const intialState = {
	allOrders: [],
	order: null,
	pastOrders: JSON.parse(localStorage.getItem('pastOrders')) || [],
	loading: true,
};

export default function (state = intialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_ORDERS:
			return {
				...state,
				allOrders: [...payload],
				loading: false,
			};
		case CLEAR_ORDERS:
		case ORDER_ERROR:
			return {
				...state,
				allOrders: [],
				order: null,
				loading: false,
			};
		case STATUS_UPDATE:
			return {
				...state,
				allOrders: state.allOrders.map((order) =>
					payload._id === order._id ? { ...payload } : order,
				),
				loading: false,
			};
		case ADD_TO_PASTORDERS:
			const pastOrders = [payload, ...state.pastOrders];
			localStorage.setItem('pastOrders', JSON.stringify(pastOrders));
			return {
				...state,
				pastOrders,
				loading: false,
			};
		case ADD_ORDER:
			return {
				...state,
				allOrders: [payload, ...state.allOrders],
				loading: false,
			};
		default:
			return state;
	}
}
