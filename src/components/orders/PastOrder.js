import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { reorder } from '../../actions/tray';

const PastOrder = ({ order, menu, reorder }) => {
	const reorderItems = order.dishes.map((dish) => {
		return { quantity: dish.quantity, id: dish.dishId };
	});

	const allDishes = Object.values(menu).flat();

	const reorderAvalaible = order.dishes.every(({ dishId }) =>
		allDishes.find((dish) => dish._id === dishId),
	);

	return (
		<div className='pastorder'>
			<p>
				<i
					style={{ color: 'green', fontSize: '15px' }}
					className='fas fa-check-circle'></i>
				Order Number: {order.orderId}
			</p>
			<p className='past-sub-header'>at Table {order.tableNum}</p>
			<hr />
			<div className='order-section past-order-items'>
				<p className='past-sub-header'>Items</p>
				{order.dishes.map((item, index) => (
					<p key={index}>
						{item.quantity} x {item.dishName}
					</p>
				))}
			</div>
			<div className='order-section past-order-date'>
				<p className='past-sub-header'>Ordered On:</p>
				<p>
					<Moment format='DD MMM YYYY'>{order.date}</Moment> at{' '}
					<Moment format='hh:mm A'>{order.date}</Moment>
				</p>
			</div>
			<div className='order-section past-order-amount'>
				<p className='past-sub-header'>Total Amount:</p>
				<p>₹{order.totalPrice}</p>
			</div>

			{reorderAvalaible && (
				<Fragment>
					<hr />
					<button
						onClick={(e) => reorder(reorderItems)}
						className='btn btn-primary'>
						Repeat Order
					</button>
				</Fragment>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	menu: state.menu.dishes,
});

export default connect(mapStateToProps, { reorder })(PastOrder);
