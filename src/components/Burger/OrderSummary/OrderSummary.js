import React from 'react'
import styles from './OrderSummary.module.css'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
	const ingridientSummary = Object.keys(props.ingredients)
		.map(igKey => {
			return (
				<li key={igKey}>
					<span>{igKey}</span>: {props.ingredients[igKey]}
				</li>)
		})

	return (
		<div className={styles.OrderSummary}>
			<h3>Your Order</h3>
			<p>Delicious burger with the following ingredients:</p>
			<ul>
				{ingridientSummary}
			</ul>
			<p><strong>Total Price: ${props.totalPrice}</strong></p>
			<p>Continue to Checkout?</p>
			<Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
			<Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
		</div>
	)
}

export default orderSummary