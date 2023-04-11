import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Account = ({ user }) => {
	const { name, email, role } = user;

	return (
		<div>
			<h1> Admin Account</h1>
			<h3>Name: {name}</h3>
			<h3>email: {email}</h3>
			<h3>Role : {role}</h3>
		</div>
	);
};

Account.propTypes = {
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.auth.admin.user,
});

export default connect(mapStateToProps)(Account);
