import React from 'react';
import Dish from './Dish';

export default function FoodItems({ dishes, forMenu }) {
	return (
		<div
			id={`${forMenu && dishes[0].category.type.split(' ')[0]}`}
			className={`food-items ${forMenu && 'collapse'}`}>
			{dishes.length > 0 &&
				dishes.map((dish) => <Dish key={dish._id} dish={dish} />)}
		</div>
	);
}
