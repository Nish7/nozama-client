import React from 'react';
import StatusButtons from './StatusButtons';
import Moment from 'react-moment';

const OrderItem = ({ order }) => {
	return (
		<tr>
			<td>{order.orderId}</td>
			<td>
				<ol>
					{order.dishes.map((dish) => (
						<li key={dish._id}>
							{dish.dishName} x{' '}
							<span className='quantity'>{dish.quantity}</span>
						</li>
					))}
				</ol>
			</td>
			<td>${order.totalPrice}</td>
			<td>
				<Moment date={order.date} format='DD/MM/YYYY hh:mm A' local />
			</td>

			<StatusButtons order={order} orderId={order._id} status={order.status} />
		</tr>
	);
};

export default OrderItem;
