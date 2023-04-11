import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Dashboard(props) {
	return (
		<Fragment>
			<h1> Administrator Dashboard</h1> <br />
			<div className='admin-actions'>
				<div className='btn-actions'>
					<Link to='/admin/orders'>
						<h2>
							<i className='fas fa-sticky-note'></i> Orders
						</h2>
					</Link>
				</div>

				<div className='btn-actions'>
					<Link to='/admin/products'>
						<h2>
							<i className='fas fa-box'></i> 
							Products
						</h2>
					</Link>
				</div>

				<div className='btn-actions'>
					<Link to='/admin/store'>
						<h2>
							<i className='fas fa-info-circle'></i> Restuarant info
						</h2>
					</Link>
				</div>

				<div className='btn-actions'>
					<Link to='/admin/categories'>
						<h2>
							<i className='fa fa-gear'></i> Categories
						</h2>
					</Link>
				</div>
			</div>
		</Fragment>
	);
}

Dashboard.propTypes = {};

export default Dashboard;
