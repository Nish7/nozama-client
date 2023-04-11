import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMenu } from '../../actions/menu';
import MenuCategory from './MenuCategory';
import DishItems from './DishItems';

const Menu = ({
	menu: { dishes, sortedCategories, loading },
	getMenu,
	tray,
}) => {
	useEffect(() => {
		getMenu();
	}, [getMenu]);

	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('all');

	let filteredDishes = '';

	const allDishes = Object.values(dishes)
		.flat()
		.map((dish) => ({ ...dish, dishName: dish['dishName'] }));

	if (search && filter === 'all') {
		const searchedData = allDishes.filter((dish) =>
			dish.dishName.toLowerCase().includes(search.toLowerCase()),
		);

		filteredDishes = <DishItems dishes={searchedData} forMenu={false} />;
	}

	if (!search && filter && filter !== 'all') {
		const filteredData = allDishes.filter((dish) => dish[filter]);
		filteredDishes = <DishItems dishes={filteredData} forMenu={false} />;
	}

	return (
		<div className='menu'>
			<h1> Catalog </h1>

			<div className='actions-field'>
				<div className='filters'>
					<button
						onClick={(e) => setFilter(e.target.value)}
						value='all'
						className={`btn ${
							filter === 'all' ? 'btn-dark' : 'btn-outline-primary'
						} btn-filters`}>
						All
					</button>
					<button
						onClick={(e) => setFilter(e.target.value)}
						value='hot'
						className={`btn ${
							filter === 'hot' ? 'btn-dark' : 'btn-outline-primary'
						} btn-filters`}>
							Hot New Releases
					</button>
					<button
						onClick={(e) => setFilter(e.target.value)}
						value='featured'
						className={`btn ${
							filter === 'featured' ? 'btn-dark' : 'btn-outline-primary'
						} btn-filters`}>
						Featured
					</button>
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

			{!loading && !search && filter === 'all'
				? sortedCategories.map((category, index) =>
						dishes[category] ? (
							<MenuCategory
								key={index}
								category={category}
								dishes={dishes[category]}
							/>
						) : (
							''
						),
				  )
				: filteredDishes}

			{tray.items && tray.items.length > 0 && (
				<Link to='/tray'>
					<div className='sticky'>
						<button className='btn btn-dark btn-lg'>
							Place Order <br />
							<span> {`${tray.items.length} Items`}</span>
						</button>
					</div>
				</Link>
			)}
		</div>
	);
};

Menu.propTypes = {
	tableNum: PropTypes.string.isRequired,
	menu: PropTypes.object.isRequired,
	getMenu: PropTypes.func.isRequired,
	tray: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	tableNum: state.auth.tableNum,
	menu: state.menu,
	tray: state.tray,
});

export default connect(mapStateToProps, { getMenu })(Menu);
