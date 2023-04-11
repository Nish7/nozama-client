import { Fragment, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import Navbar from './components/layout/Navbar';
import Table from './components/layout/Table';
import Routes from './components/routing/Routes';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';

if (localStorage.token) {
	axios.defaults.headers.common['x-auth-token'] = localStorage.token;
} else {
	delete axios.defaults.headers.common['x-auth-token'];
}

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<section className='container'>
						<Alert />
						<Switch>
							<Route exact path='/' component={Table} />
							<Route component={Routes} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
