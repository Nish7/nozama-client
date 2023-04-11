import {
	ADD_TO_TRAY,
	REORDER,
	REMOVE_FROM_TRAY,
	REMOVE_QUANTITY,
	CLEAR_TRAY,
	ADD_QUANTITY,
} from '../actions/types';

const intialState = {
	items: [],
};
export default function (state = intialState, action) {
	const { type, payload } = action;

	switch (type) {
		case ADD_TO_TRAY:
			return {
				...state,
				items: [...state.items, { id: payload, quantity: 1 }],
			};
		case ADD_QUANTITY:
			return {
				...state,
				items: state.items.map((item) =>
					item.id === payload ? { ...item, quantity: item.quantity + 1 } : item,
				),
			};
		case REMOVE_QUANTITY:
			return {
				...state,
				items: state.items.map((item) =>
					item.id === payload ? { ...item, quantity: item.quantity - 1 } : item,
				),
			};
		case REORDER:
			return {
				...state,
				items: payload,
			};
		case REMOVE_FROM_TRAY:
			return {
				...state,
				items: state.items.filter((item) => item.id !== payload),
			};
		case CLEAR_TRAY:
			return {
				...state,
				items: [],
			};
		default:
			return state;
	}
}
