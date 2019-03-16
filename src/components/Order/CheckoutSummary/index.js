import React from 'react'
import styles from './CheckoutSummary.module.css'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const CheckoutSummary = props => {
		return (
			<div className={styles.CheckoutSummary}>
				<h1>Here the summary</h1>
				<div className={styles.CheckoutSummaryInner}>
					<Burger ingredients={props.ingredients} />
				</div>
				<Button btnType="Danger" clicked={props.onCheckoutCancelled}>Cancel</Button>
				<Button btnType="Success" clicked={props.onCheckoutContinued}>Continue</Button>
			</div>
		)
}

export default CheckoutSummary
