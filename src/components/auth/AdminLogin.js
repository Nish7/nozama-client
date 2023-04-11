import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../actions/auth';
import { connect } from 'react-redux';

const AdminLogin = ({ loginUser, admin: { isAuthenticated } }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		loginUser(formData);
	};

	if (isAuthenticated) return <Redirect to='/admin/dashboard' />;

	return (
		<Fragment>
			<h1 style={{ textAlign: 'center' }}>Login</h1>

			<form className='form form-adminlogin' onSubmit={onSubmit}>
				<input
					value={email}
					type='text'
					name='email'
					onChange={onChange}
					placeholder='email'
				/>
				<input
					value={password}
					name='password'
					type='password'
					onChange={onChange}
					placeholder='password'
				/>
				<br />
				<button className='btn btn-primary'>Login</button>
			</form>
		</Fragment>
	);
};

AdminLogin.propTypes = {
	loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	admin: state.auth.admin,
});

export default connect(mapStateToProps, { loginUser })(AdminLogin);
