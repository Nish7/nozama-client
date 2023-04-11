import {
	UPDATE_RESTAURANT,
	GET_RESTAURANT,
	RESTAURANT_ERROR,
} from '../actions/types';

const initialState = {
	restaurant: null,
	loading: true,
};

export default function (state = initialState, action) {
	const { payload, type } = action;

	switch (type) {
		case GET_RESTAURANT:
			return {
				...state,
				restaurant: payload,
				loading: false,
			};
		case UPDATE_RESTAURANT:
			return {
				...state,
				restaurant: payload,
				loading: false,
			};
		default:
			return state;
	}
}
