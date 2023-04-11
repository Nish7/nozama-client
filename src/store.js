import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

const intialState = {};

const composeEnhancers = composeWithDevTools({
	trace: true,
	traceLimit: 25,
});

const middleware = [thunk];

const store = createStore(
	rootReducers,
	intialState,
	composeEnhancers(applyMiddleware(...middleware)),
);

export default store;
