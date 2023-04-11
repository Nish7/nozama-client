import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FoodItems from '../menu/DishItems';
import { submitOrder } from '../../actions/orders';
import { getMenu } from '../../actions/menu';
import PastOrder from '../orders/PastOrder';

function Tray({
	tableNum,
	tray: { items },
	menu,
	getMenu,
	submitOrder,
	pastOrders,
}) {
	useEffect(() => {
		if (menu.length === 0) return getMenu();
	}, [menu, getMenu]);

	const allDishes = Object.values(menu).flat();

	const trayDishes = items.map((item) => {
		const dish = allDishes.find((dish) => dish._id === item.id);
		return { ...item, dish };
	});

	const dishes = trayDishes.map((trayItem) => trayItem['dish']);

	// Calcuate Total Price
	const totalPrice = trayDishes.reduce(
		(acc, curr) => acc + curr.dish.price * curr.quantity,
		0,
	);

	return (
		<Fragment>
			<div className='tray-header'>
				<h3>
					<Link to='/catalog'>
						<i
							className='fas fa-chevron-left'
							style={{
								color: 'black',
								fontSize: '0.7em',
								marginRight: '10px',
							}}></i>
					</Link>
					Place this order | <span>Cart</span>
				</h3>
			</div>

			<div className='tray-food'>
				{!items || items.length === 0 ? (
					<div className='no-trayItems'>
						<i
							className='fas fa-times-circle'
							style={{ fontSize: '40px', marginBottom: '20px' }}></i>
						<h4> No Items in the Cart </h4>
						<p>Please add items to your Cart</p>
						<Link to='/menu'>
							<button className='btn btn-outline-dark'>Catalog</button>
						</Link>
					</div>
				) : (
					<Fragment>
						<FoodItems dishes={dishes} forMenu={false} />

						<div className='tray-bill'>
							<h3>
								Total Payable Amount: <span>₹{totalPrice}</span>
							</h3>
							<button
								disabled={items.length === 0}
								onClick={(e) => submitOrder({ tableNum, dishes: items })}
								className='btn btn-primary btn-order-tray'>
								Confirm & Place Order
							</button>
						</div>
					</Fragment>
				)}
			</div>

			{pastOrders.length > 0 && (
				<Fragment>
					<h4>Past Orders</h4>
					<div className='past-orders'>
						{pastOrders.map((order) => (
							<PastOrder key={order._id} order={order} />
						))}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
}

const mapStateToProps = (state) => ({
	tray: state.tray,
	tableNum: state.auth.tableNum,
	menu: state.menu.dishes,
	pastOrders: state.orders.pastOrders,
});

export default connect(mapStateToProps, { submitOrder, getMenu })(Tray);
