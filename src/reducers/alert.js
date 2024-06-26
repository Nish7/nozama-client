import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const intialState = [];

export default function (state = intialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_ALERT:
			return [...state, action.payload];
		case REMOVE_ALERT:
			return state.filter((state) => state.id !== payload);
		default:
			return state;
	}
}
