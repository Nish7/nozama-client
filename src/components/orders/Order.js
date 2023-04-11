import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';
import { connect } from 'react-redux';
import { getOrders, addOrder } from '../../actions/orders';
import OrderItem from './OrderItem';
import moment from 'moment';

const Order = ({ orders, getOrders, addOrder }) => {
	const [filter, setFilter] = useState('all');

	const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

	useEffect(() => {
		getOrders(date);

		// Enable pusher logging - don't include this in production
		// Pusher.logToConsole = true;

		var pusher = new Pusher('bee981962eb28eb86711', {
			cluster: 'ap2',
		});

		var channel = pusher.subscribe('orderChannel');
		channel.bind('inserted', function (data) {
			addOrder(data.newOrder);
		});
	}, [getOrders, addOrder, date]);

	let filteredOrder = '';

	if (filter !== 'all') {
		const data = orders.filter((order) => order.status === filter);
		filteredOrder = data;
	}

	return (
		<Fragment>
			<h1> Orders </h1>

			<div className='actions-field order'>
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
						value='Proccessing'
						className={`btn ${
							filter === 'Proccessing' ? 'btn-dark' : 'btn-outline-primary'
						} btn-filters`}>
						Proccessing
					</button>
					<button
						onClick={(e) => setFilter(e.target.value)}
						value='Confirmed'
						className={`btn ${
							filter === 'Confirmed' ? 'btn-dark' : 'btn-outline-primary'
						} btn-filters`}>
						Confirmed
					</button>
					<button
						onClick={(e) => setFilter(e.target.value)}
						value='Paid'
						className={`btn ${
							filter === 'Paid' ? 'btn-dark' : 'btn-outline-primary'
						} btn-filters`}>
						Paid
					</button>
					<button
						onClick={(e) => setFilter(e.target.value)}
						value='Cancelled'
						className={`btn ${
							filter === 'Cancelled' ? 'btn-dark' : 'btn-outline-primary'
						} btn-filters`}>
						Cancelled
					</button>
				</div>

				<div>
					<input
						type='date'
						name='date'
						className='date-picker'
						value={date}
						onChange={(e) => {
							setDate(e.target.value);
						}}
					/>
				</div>
			</div>

			<table className='table order-table table-hover'>
				<thead>
					<tr>
						<th>Order ID</th>
						<th>Items</th>
						<th>Total Price</th>
						<th>Date</th>
						<th>Confirm Order</th>
						<th>Cancel Order</th>
						<th>Paid</th>
					</tr>
				</thead>

				<tbody>
					{filter === 'all' &&
						orders.map((order) => <OrderItem key={order._id} order={order} />)}

					{filter !== 'all' &&
						filteredOrder.length > 0 &&
						filteredOrder.map((order) => (
							<OrderItem key={order._id} order={order} />
						))}
				</tbody>
			</table>
		</Fragment>
	);
};

Order.propTypes = {
	orders: PropTypes.array.isRequired,
	getOrders: PropTypes.func.isRequired,
	addOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ orders: state.orders.allOrders });

export default connect(mapStateToProps, { getOrders, addOrder })(Order);
