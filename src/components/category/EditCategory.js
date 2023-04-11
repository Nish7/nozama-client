import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCategory, updateCategory } from '../../actions/categories';
import { connect } from 'react-redux';

const EditCategory = ({
	updateCategory,
	getCategory,
	category,
	match,
	loading,
}) => {
	const [formData, setFormData] = useState({
		type: '',
		sortOrder: '',
	});

	useEffect(() => {
		if (!category) return getCategory(match.params.id);

		setFormData({
			type: loading || !category.type ? '' : category.type,
			sortOrder: loading || !category.sortOrder ? '' : category.sortOrder,
		});
	}, [loading, category]);

	const onChange = (e) => setFormData({ [e.target.name]: e.target.value });

	const { type, sortOrder } = formData;

	return (
		<Fragment>
			<h1>Edit Category: {type}</h1>

			<form>
				<div className='form-group'>
					<label for=''>Name of the Category</label>
					<input
						className='form-control'
						type='text'
						onChange={onChange}
						name='type'
						placeholder='Name of the new category'
						value={type}
					/>
				</div>
				<div className='form-group'>
					<label for=''>Sort Category</label>
					<input
						className='form-control'
						onChange={onChange}
						name='sortOrder'
						type='number'
						placeholder='Sort Order'
						value={sortOrder}
					/>
				</div>
				<button
					onClick={(e) => {
						e.preventDefault();
						updateCategory(formData, category._id);
					}}
					className='btn btn-primary'>
					Submit
				</button>
			</form>
		</Fragment>
	);
};

EditCategory.propTypes = {};

const mapStateToProps = (state) => ({
	category: state.categories.category,
	loading: state.categories.loading,
});

export default connect(mapStateToProps, { getCategory, updateCategory })(
	EditCategory,
);
