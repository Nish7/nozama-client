import {
	SET_TABLE,
	REMOVE_TABLE,
	LOGOUT,
	ADMIN_SUCCESS,
	ADMIN_FAIL,
	USER_ERROR,
	GET_USER,
} from '../actions/types';

const intialState = {
	tableNum: localStorage.getItem('tableNum')
		? localStorage.getItem('tableNum')
		: '',
	admin: {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
	},
};

export default function (state = intialState, action) {
	const { type, payload } = action;
	switch (type) {
		case SET_TABLE:
			localStorage.setItem('tableNum', payload);
			return { ...state, tableNum: payload };
		case REMOVE_TABLE:
			localStorage.removeItem('tableNum');
			return { ...state, tableNum: null };
		case ADMIN_SUCCESS:
			localStorage.setItem('token', payload);
			return {
				...state,
				admin: {
					...state.admin,
					isAuthenticated: true,
					loading: false,
					token: payload,
				},
			};
		case LOGOUT:
		case USER_ERROR:
		case ADMIN_FAIL:
			localStorage.removeItem('token');
			return {
				...state,
				admin: {
					user: null,
					isAuthenticated: false,
					loading: false,
					token: null,
				},
			};
		case GET_USER:
			return {
				...state,
				admin: {
					...state.admin,
					isAuthenticated: true,
					loading: false,
					user: { ...payload },
				},
			};
		default:
			return state;
	}
}
