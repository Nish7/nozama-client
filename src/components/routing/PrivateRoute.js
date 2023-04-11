import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
	setAlert,
	history,
	...rest
}) => {
	const unauthorised = () => {
		setAlert('Please Log in as Admin', 'warning');
		history.push('/admin');
	};

	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated && !loading ? unauthorised() : <Component {...props} />
			}
		/>
	);
};

PrivateRoute.propTypes = {
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth.admin,
});

export default connect(mapStateToProps, { setAlert })(withRouter(PrivateRoute));
