import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getRestaurant, updateRestaurant } from '../../actions/restaurant';

const Restaurant = ({
	getRestaurant,
	updateRestaurant,
	restaurant,
	loading,
}) => {
	const [formData, setFormData] = useState({
		name: '',
		about: '',
		address: '',
		phone: '',
		numberOfTables: '',
	});

	useEffect(() => {
		if (!restaurant) return getRestaurant();

		return setFormData({
			name: loading || !restaurant.name ? '' : restaurant.name,
			about: loading || !restaurant.about ? '' : restaurant.about,
			address: loading || !restaurant.address ? '' : restaurant.address,
			phone: loading || !restaurant.phone ? '' : restaurant.phone,
			numberOfTables:
				loading || !restaurant.numberOfTables ? '' : restaurant.numberOfTables,
		});
	}, [getRestaurant, restaurant, loading]);

	const { name, about, address, phone, numberOfTables } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<Fragment>
			<h1> Restuarant Info</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					updateRestaurant(formData);
				}}>
				<div class='form-group'>
					<label>Name</label>
					<input
						class='form-control'
						type='text'
						value={name}
						onChange={onChange}
						name='name'
						placeholder='name'
					/>
				</div>

				<div class='form-group'>
					<label>About</label>
					<input
						class='form-control'
						type='text'
						value={about}
						onChange={onChange}
						name='about'
						placeholder='about'
					/>
				</div>

				<div class='form-group'>
					<label>Address</label>
					<input
						class='form-control'
						type='text'
						value={address}
						onChange={onChange}
						name='address'
						placeholder='address'
					/>
				</div>

				<div class='form-group'>
					<label>Phone</label>
					<input
						class='form-control'
						type='text'
						value={phone}
						onChange={onChange}
						name='phone'
						placeholder='phone'
					/>
				</div>

				<div class='form-group'>
					<label>Tables</label>
					<input
						class='form-control'
						type='number'
						value={numberOfTables}
						onChange={onChange}
						name='numberOfTables'
						placeholder='number of tables'
					/>
				</div>

				<button class='btn btn-primary'>Save Changes</button>
			</form>
		</Fragment>
	);
};

Restaurant.propTypes = {};

const mapStateToProps = (state) => ({
	restaurant: state.restaurant.restaurant,
	loading: state.restaurant.loading,
});

export default connect(mapStateToProps, { getRestaurant, updateRestaurant })(
	Restaurant,
);
