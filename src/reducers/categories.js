import {
	GET_CATEGORIES,
	REMOVE_CATEGORY,
	ADD_CATEGORY,
	UPDATE_CATEGORY,
	CLEAR_CATEGORY,
	GET_CATEGORY,
	CATEGORY_ERROR,
} from '../actions/types';
const initialState = {
	categories: [],
	category: null,
	loading: true,
};

export default function (state = initialState, action) {
	const { payload, type } = action;

	switch (type) {
		case GET_CATEGORIES:
			return {
				...state,
				categories: [...payload],
				loading: false,
			};
		case GET_CATEGORY:
			return {
				...state,
				category: payload,
				loading: false,
			};
		case ADD_CATEGORY:
			return {
				...state,
				categories: [...state.categories, payload],
				loading: false,
			};
		case UPDATE_CATEGORY:
			return {
				...state,
				categories: state.categories.map((category) =>
					category._id !== payload._id ? category : { ...payload },
				),
				loading: false,
			};
		case REMOVE_CATEGORY:
			return {
				...state,
				categories: state.categories.filter(
					(category) => category._id !== payload,
				),
			};
		case CATEGORY_ERROR:
			return {
				categories: [],
				category: null,
				loading: false,
			};
		case CLEAR_CATEGORY:
			return {
				...state,
				category: null,
				loading: false,
			};
		default:
			return state;
	}
}
