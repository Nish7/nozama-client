import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addCategory } from '../../actions/categories';

const AddCategory = ({ addCategory, history }) => {
	const [formData, setFormData] = useState({ type: '', sortOrder: '' });

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<Fragment>
			<h1>Add a Category</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addCategory(formData, history);
				}}>
				<div className='form-group'>
					<label htmlFor=''>Name of the Category</label>
					<input
						className='form-control'
						type='text'
						name='type'
						required
						onChange={onChange}
						placeholder='Name of the new category'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor=''>Sort Order</label>
					<input
						className='form-control'
						type='number'
						name='sortOrder'
						required
						onChange={onChange}
						placeholder='Sort Order'
					/>
				</div>
				<button className='btn btn-primary'>Submit</button>
			</form>
		</Fragment>
	);
};

AddCategory.propTypes = {};

export default connect(null, { addCategory })(withRouter(AddCategory));
