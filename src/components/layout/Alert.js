import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeAlert } from '../../actions/alert';

const Alert = ({ alerts, removeAlert }) => {
	const alertRender = alerts.map((alert) => (
		<div
			key={alert.id}
			id={alert.id}
			className={`alert alert-${alert.alertType} alert-dismissible fade show`}
			role='alert'>
			{alert.msg}
			<button
				type='button'
				onClick={(e) => removeAlert(alert.id)}
				className='btn-close'
				data-bs-dismiss='alert'
				aria-label='Close'></button>
		</div>
	));

	return (
		<Fragment>
			{alerts !== null && alerts.length > 0 ? alertRender : ''}
		</Fragment>
	);
};

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
	removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(Alert);
