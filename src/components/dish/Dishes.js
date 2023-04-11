import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDishes } from '../../actions/dishes';
import { getCategories } from '../../actions/categories';
import DishItem from './DishItem';

const Dishes = ({ dishes, getDishes, categories, getCategories }) => {
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('');

	useEffect(() => {
		getDishes();
		if (categories.length === 0) return getCategories();
	}, [getDishes, categories, getCategories]);

	let filteredDishes = '';

	if (!search && filter) {
		const data = dishes.filter((dish) => dish.category.type === filter);
		filteredDishes = data.map((dish) => (
			<DishItem key={dish._id} dish={dish} />
		));
	}

	if (search && !filter) {
		const data = dishes.filter((dish) =>
			dish.dishName.toLowerCase().includes(search.toLowerCase()),
		);

		filteredDishes = data.map((dish) => (
			<DishItem key={dish._id} dish={dish} />
		));
	}

	return (
		<Fragment>
			<div className='headers'>
				<div>
					<h1> Products </h1>

					<div className='actions-field'>
						<div className='filters'>
							<select
								className='form-select'
								onChange={(e) => setFilter(e.target.value)}
								value={filter}>
								<option value='' defaultValue>
									Select a category
								</option>
								{categories.map((category) => (
									<option key={category._id} value={category.type}>
										{category.type}
									</option>
								))}
							</select>
						</div>

						<div className='searchArea'>
							<form className='d-flex'>
								<input
									onChange={(e) => setSearch(e.target.value)}
									className='form-control me-2'
									type='search'
									placeholder='Search'
									aria-label='Search'
								/>
							</form>
						</div>
					</div>
				</div>

				<Link to='/admin/products/add'>
					<button className='btn btn-outline-primary btn-add'>
						Add a Dish
					</button>
				</Link>
			</div>

			<table className='table order-table'>
				<thead>
					<tr>
						<th>Dish Name</th>
						<th>Categories</th>
						<th>Price</th>
						<th>In Stock?</th>
						<th>Featured?</th>
						<th>Hot?</th>
						<th>Edit Dish</th>
						<th>Delete Dish</th>
					</tr>
				</thead>

				<tbody>
					{!filter &&
						!search &&
						dishes.map((dish) => <DishItem key={dish._id} dish={dish} />)}

					{filteredDishes}
				</tbody>
			</table>
		</Fragment>
	);
};

Dishes.propTypes = {
	getDishes: PropTypes.func.isRequired,
	dishes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	dishes: state.dishes.dishes,
	categories: state.categories.categories,
});

export default connect(mapStateToProps, { getDishes, getCategories })(Dishes);
