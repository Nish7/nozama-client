import {
	ADD_TO_TRAY,
	ADD_QUANTITY,
	REMOVE_QUANTITY,
	REMOVE_FROM_TRAY,
	REORDER,
} from './types';

export const addToTray = (id) => (dispatch) => {
	dispatch({ type: ADD_TO_TRAY, payload: id });
};

export const reorder = (order) => (dispatch) => {
	dispatch({ type: REORDER, payload: order });
};

export const addQuantity = (id) => (dispatch) => {
	dispatch({ type: ADD_QUANTITY, payload: id });
};

export const removeQuantity = (id) => (dispatch) => {
	dispatch({ type: REMOVE_QUANTITY, payload: id });
};

export const removeFromTray = (id) => (dispatch) => {
	dispatch({ type: REMOVE_FROM_TRAY, payload: id });
};
