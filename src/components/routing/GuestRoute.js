import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const GuestRoute = ({
	component: Component,
	tableNum,
	setAlert,
	history,
	...rest
}) => {
	const unauthorised = () => {
		setAlert('Please Enter Table Number', 'warning');
		history.push('/');
	};

	return (
		<Route
			{...rest}
			render={(props) =>
				!tableNum ? unauthorised() : <Component {...props} />
			}
		/>
	);
};

const mapStateToProps = (state) => ({
	tableNum: state.auth.tableNum,
});

export default connect(mapStateToProps, { setAlert })(withRouter(GuestRoute));
