import { GET_MENU, MENU_ERROR } from '../actions/types';

const intialState = {
	dishes: [],
	sortedCategories: [],
	loading: true,
	errors: [],
};

export default function (state = intialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_MENU:
			return {
				...state,
				...payload,
				loading: false,
			};
		case MENU_ERROR:
			return {
				...state,
				errors: [...payload],
				loading: false,
			};
		default:
			return state;
	}
}
