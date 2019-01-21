import React from 'react'
import BurgerIngridient from './BurgerIngridient/BurgerIngridient'
import styles from './Burger.module.css'

const burger = (props) => {

	let ingredientsArr = Object.keys(props.ingredients)
		.map(igKey => {
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngridient key={igKey + i} type={igKey} />
			})
	})
	.reduce((arr, el) => {
		return arr.concat(el)
	}, [])

	if(ingredientsArr.length === 0) {
		ingredientsArr = <p>Please start adding ingredients</p>
	}

	return (
		<div className={styles.Burger}>
			<BurgerIngridient type='bread-top' />			
			{ingredientsArr}
			<BurgerIngridient type='bread-bottom' />				
		</div>
	)
}

export default burger