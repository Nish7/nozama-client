import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories, removeCategory } from '../../actions/categories';

const Category = ({ getCategories, categories, removeCategory }) => {
	useEffect(() => {
		if (!categories.length !== 0) return getCategories();
	}, [getCategories]);

	return (
		<Fragment>
			<div className='headers'>
				<h1>Categories</h1>
				<Link to='/admin/categories/add'>
					<button className='btn btn-outline-primary btn-add'>
						Add a Category
					</button>
				</Link>
			</div>

			<table className='table table-category'>
				<thead>
					<tr>
						<th>Category</th>
						<th>Sort Order</th>
						<th>Edit Category</th>
						<th>Delete Category</th>
					</tr>
				</thead>

				<tbody>
					{categories.map((category) => (
						<tr key={category._id}>
							<td>{category.type}</td>
							<td>{category.sortOrder}</td>
							<td>
								<Link to={`/admin/categories/edit/${category._id}`}>
									<button className='btn btn-primary'>Edit</button>
								</Link>
							</td>
							<td>
								<button
									onClick={(e) => {
										e.preventDefault();
										removeCategory(category._id);
									}}
									className='btn btn-danger'>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	categories: state.categories.categories,
});

export default connect(mapStateToProps, { getCategories, removeCategory })(
	Category,
);
