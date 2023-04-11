// import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import { getDish } from '../../actions/dishes';
import { getCategories } from '../../actions/categories';
import { connect } from 'react-redux';
import { updateDish } from '../../actions/dishes';

const EditDish = ({
	dish,
	match,
	loading,
	getDish,
	categories,
	updateDish,
	getCategories,
}) => {
	const [formData, setFormData] = useState({
		dishName: '',
		category: '',
		price: '',
		featured: false,
		hot: false,
		image: '',
		OutOfStock: false,
	});

	useEffect(() => {
		if (!dish) return getDish(match.params.id);
		if (categories.length === 0) return getCategories();

		return setFormData({
			dishName: loading || !dish.dishName ? '' : dish.dishName,
			category:
				loading || !dish.category || !dish.category._id
					? ''
					: dish.category._id,
			OutOfStock: loading || !dish.OutOfStock ? false : dish.OutOfStock,
			price: loading || !dish.price ? '' : dish.price,
			image: loading || !dish.image ? '' : dish.image,
			featured: loading || !dish.featured ? false : dish.featured,
			hot: loading || !dish.hot ? false : dish.hot,
		});
	}, [loading, dish, getCategories, categories, getDish, match.params.id]);

	const { dishName, category, price, hot, OutOfStock, featured } =
		formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<Fragment>
			<h1>
				Edit {dishName}{' '}
				<span
					onClick={(e) => setFormData({ ...formData, featured: !featured })}
				>
					<i
						style={{
							fontSize: '40px',
							color: '#FFCC32',
							marginLeft: '5px',
						}}
						alt="Featured"
						className={`fa${featured ? 's' : 'r'} fa-star`}
					></i>
				</span>
			</h1>
			<form className="form edit-food-form">
				<div className="form-group">
					<label htmlFor="">Product Name</label>
					<input
						className="form-control"
						value={dishName}
						onChange={onChange}
						name="dishName"
						type="text"
						placeholder="dish name"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="">Category</label>
					<select
						className="categories form-select"
						name="category"
						value={category}
						onChange={onChange}
					>
						<option value="">Select a Category</option>
						{categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.type}
							</option>
						))}
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="">Price</label>
					<input
						className="form-control"
						type="text"
						name="price"
						onChange={onChange}
						placeholder="Price"
						value={`${price}`}
					/>
				</div>

				<div className="form-group">
					<div className="form-check">
						<label className="form-check-label" htmlFor="flexCheckDefault">
							Hot
						</label>
						<input
							className="form-check-input"
							type="checkbox"
							id="flexCheckDefault"
							onChange={(e) =>
								setFormData({ ...formData, hot: !hot })
							}
							checked={hot}
						/>
					</div>

					<div className="form-check">
						<label className="form-check-label" htmlFor="flexCheckDefault">
							Out of Stock
						</label>
						<input
							className="form-check-input"
							type="checkbox"
							id="flexCheckDefault"
							onChange={(e) =>
								setFormData({ ...formData, OutOfStock: !OutOfStock })
							}
							checked={OutOfStock}
						/>
					</div>
				</div>

				<button
					onClick={(e) => {
						e.preventDefault();
						updateDish(formData, dish._id);
					}}
					className="btn btn-primary"
				>
					Save Changes
				</button>
			</form>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	dish: state.dishes.dish,
	categories: state.categories.categories,
	loading: state.dishes.loading,
});

export default connect(mapStateToProps, { getDish, getCategories, updateDish })(
	EditDish
);
