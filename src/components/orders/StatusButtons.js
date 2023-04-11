import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { changeStatus } from '../../actions/orders';
import generatePdf from '../../utils/recieptPdf';

const StatusButtons = ({
	order,
	status,
	orderId,
	changeStatus,
	restaurant,
}) => {
	const _onClick = (e) => changeStatus(orderId, e.target.value);

	switch (status) {
		case 'Confirmed':
			return (
				<Fragment>
					<td>
						<i
							className='fas fa-check-circle'
							style={{ color: 'blue', fontSize: '30px' }}></i>
					</td>
					<td>
						<button
							onClick={_onClick}
							disabled
							value='Cancelled'
							className='btn btn-danger  btn-orders'>
							Cancel
						</button>
					</td>
					<td>
						<button
							onClick={_onClick}
							value='Paid'
							className='btn btn-success  btn-orders'>
							Paid
						</button>
					</td>
				</Fragment>
			);
		case 'Paid':
			return (
				<Fragment>
					<td colSpan='3'>
						<h3
							onClick={(e) => {
								generatePdf(order, restaurant);
							}}
							style={{ color: 'green', cursor: 'pointer' }}>
							Paid
							<i className='fas fa-check-double' style={{ color: 'green' }}></i>
						</h3>
					</td>
				</Fragment>
			);
		case 'Cancelled':
			return (
				<Fragment>
					<td colSpan='3'>
						<h3 style={{ color: 'red' }}>
							Cancelled{' '}
							<i className='fas fa-times' style={{ color: 'red' }}></i>
						</h3>
					</td>
				</Fragment>
			);
		default:
			return (
				<Fragment>
					<td>
						<button
							onClick={_onClick}
							value='Confirmed'
							className='btn btn-primary btn-orders'>
							Confirm
						</button>
					</td>
					<td>
						<button
							onClick={_onClick}
							value='Cancelled'
							className='btn btn-danger btn-orders'>
							Cancel
						</button>
					</td>
					<td>
						<button
							onClick={_onClick}
							value='Paid'
							className='btn btn-success btn-orders'>
							Paid
						</button>
					</td>
				</Fragment>
			);
	}
};

const mapStateToProps = (state) => ({
	restaurant: state.restaurant.restaurant,
});

export default connect(mapStateToProps, { changeStatus })(StatusButtons);
