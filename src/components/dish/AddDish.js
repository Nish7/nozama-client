import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../../actions/categories';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addDish } from '../../actions/dishes';

const AddDish = ({ categories, getCategories, addDish, history }) => {
	const [formData, setFormData] = useState({
		dishName: '',
		category: '',
		price: '',
		featured:false,
		hot:false,
		image: '',
		OutOfStock: false,
	});

	useEffect(() => {
		getCategories();
	}, [getCategories]);

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const { dishName, category, price, featured, hot, image } = formData;

	return (
		<Fragment>
			<h1>Add Product</h1>

			<form className='form edit-food-form'>
				<div className='form-group'>
					<label htmlFor=''>name</label>
					<input
						onChange={onChange}
						className='form-control'
						type='text'
						value={dishName}
						name='dishName'
						placeholder='Name'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor=''>Category</label>
					<select
						className='categories form-select'
						name='category'
						onChange={onChange}
						value={category}>
						<option value='' disabled defaultValue>
							Select a Category
						</option>
						{categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.type}
							</option>
						))}
					</select>
				</div>

				<div className='form-group'>
					<label htmlFor=''>Price</label>
					<input
						onChange={onChange}
						value={price}
						name='price'
						className='form-control'
						type='text'
						placeholder='Price'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor=''>image</label>
					<input
						onChange={onChange}
						value={image}
						name='image'
						className='form-control'
						type='text'
						placeholder='image'
					/>
				</div>

				<div className='form-group'>
					<div className='form-check'>
						<input
							className='form-check-input'
							onChange={(e) => setFormData({ ...formData, featured: !featured })}
							checked={featured}
							type='checkbox'
							id='flexCheckDefault'
						/>
						<label className='form-check-label' htmlFor='flexCheckDefault'>
							Featured
						</label>
					</div>

					<div className='form-check'>
						<input
							className='form-check-input'
							onChange={(e) => setFormData({ ...formData, hot: !hot })}
							checked={hot}
							type='checkbox'
							id='flexCheckDefault'
						/>
						<label className='form-check-label' htmlFor='flexCheckDefault'>
							Hot
						</label>
					</div>

				</div>

				<button
					onClick={(e) => {
						e.preventDefault();
						addDish(formData, history);
					}}
					className='btn btn-primary'>
					Submit
				</button>
			</form>
		</Fragment>
	);
};

AddDish.propTypes = {
	categories: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	categories: state.categories.categories,
});

export default connect(mapStateToProps, { getCategories, addDish })(
	withRouter(AddDish),
);
