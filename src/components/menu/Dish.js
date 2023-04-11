import React from 'react';
import { connect } from 'react-redux';
import {
	addToTray,
	addQuantity,
	removeQuantity,
	removeFromTray,
} from '../../actions/tray';

function Dish({
	dish: { veg, dishName: name, _id: id, price, jain, vegan, featured },
	addToTray,
	addQuantity,
	removeQuantity,
	removeFromTray,
	tray: { items },
}) {
	const dishOptions = `${jain ? '(Jain' : ''} ${jain && vegan ? ',' : ''} ${
		vegan ? 'Vegan' : ''
	} ${jain || vegan ? 'Available)' : ''}`;

	let trayButtons = '';

	const foundItem = items.find((item) => item.id === id);

	if (foundItem) {
		trayButtons = (
			<div className='quantity-buttons'>
				<button
					className='btn-remove'
					onClick={(e) =>
						foundItem.quantity !== 1 ? removeQuantity(id) : removeFromTray(id)
					}>
					-
				</button>
				<button className='btn-quantity'>{foundItem.quantity}</button>

				<button className='btn-add' onClick={(e) => addQuantity(id)}>
					+
				</button>
			</div>
		);
	} else {
		trayButtons = (
			<div className='food-cart'>
				<button
					onClick={(e) => addToTray(id)}
					className='btn btn-outline-dark btn-cart'>
					+
				</button>
			</div>
		);
	}

	return (
		<div>
			<div className='food'>
				<div className='food-info'>
					<h4>
						<span>
							<i
								style={{
									color: veg ? 'green' : 'red',
									fontSize: '12px',
								}}
								className='fas fa-circle'></i>
						</span>
						{name}
						{featured && (
							<span>
								<i
									style={{
										fontSize: '20px',
										color: '#FFCC32',
										marginLeft: '5px',
									}}
									className='fas fa-star'></i>
							</span>
						)}
					</h4>
					<small>{dishOptions}</small>
					<p>₹{price}</p>
				</div>

				{trayButtons}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	tray: state.tray,
});

export default connect(mapStateToProps, {
	addToTray,
	addQuantity,
	removeQuantity,
	removeFromTray,
})(Dish);
