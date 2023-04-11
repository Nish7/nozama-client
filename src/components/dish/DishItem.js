import React from 'react';
import { Link } from 'react-router-dom';
import { removeDish } from '../../actions/dishes';
import { connect } from 'react-redux';

const DishItem = ({ dish, removeDish }) => {
	return (
		<tr key={dish._id}>
			<td>{dish.dishName}</td>
			<td>{dish.category.type}</td>
			<td>${dish.price}</td>
			<td>{!dish.OutOfStock ? 'Yes' : 'No'}</td>
			<td>{dish.featured ? 'Yes' : 'No'}</td>
			<td>{dish.hot ? 'Yes' : 'No'}</td>
			<td>
				<Link
					to={`/admin/products/edit/${dish._id}`}
					className='btn btn-primary btn-orders'>
					Edit
				</Link>
			</td>
			<td>
				<button
					onClick={(e) => {
						e.preventDefault();
						removeDish(dish._id);
					}}
					className='btn btn-danger btn-orders'>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default connect(null, { removeDish })(DishItem);
