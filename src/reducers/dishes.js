import {
	GET_DISHES,
	GET_DISH,
	REMOVE_DISH,
	DISH_ERROR,
	ADD_DISH,
	DISH_CLEAR,
	UPDATE_DISH,
} from '../actions/types';

const intialState = {
	dishes: [],
	dish: null,
	loading: true,
};

export default function (state = intialState, action) {
	const { payload, type } = action;

	switch (type) {
		case GET_DISHES:
			return {
				...state,
				dishes: payload,
				loading: false,
			};
		case GET_DISH:
			return {
				...state,
				dish: payload,
				loading: false,
			};
		case ADD_DISH:
			return {
				...state,
				dishes: [payload, ...state.dishes],
				loading: false,
			};
		case UPDATE_DISH:
			return {
				...state,
				dishes: state.dishes.map((dish) =>
					payload._id !== dish._id ? dish : { ...payload },
				),
				loading: false,
			};
		case REMOVE_DISH:
			return {
				...state,
				dishes: state.dishes.filter((dish) => dish._id !== payload),
			};
		case DISH_CLEAR:
			return {
				...state,
				dish: null,
				loading: false,
			};
		case DISH_ERROR:
			return {
				dishes: [],
				dish: null,
				loading: false,
			};
		default:
			return state;
	}
}
