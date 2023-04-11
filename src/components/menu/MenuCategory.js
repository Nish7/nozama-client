import React, { useState } from 'react';
import DishItems from './DishItems';

export default function MenuCategory({ category, dishes }) {
	const [collapsed, setCollapsed] = useState(true);

	const categoryBrief = dishes
		.slice(0, 2)
		.map((dish) => dish.dishName)
		.join(', ');

	return (
		<div className='category'>
			<div className='category-info'>
				<div>
					<h2>{category}</h2>
					<p>{categoryBrief}</p>
				</div>
				<button
					className='btn btn-category'
					type='button'
					onClick={(e) => setCollapsed(!collapsed)}
					data-toggle='collapse'
					data-target={`#${category.split(' ')[0]}`}
					aria-expanded='false'
					aria-controls={category.split(' ')[0]}>
					<i className={`fas fa-chevron-${collapsed ? 'down' : 'up'}`}></i>
				</button>
			</div>

			<hr />

			<DishItems dishes={dishes} forMenu={true} />
		</div>
	);
}
