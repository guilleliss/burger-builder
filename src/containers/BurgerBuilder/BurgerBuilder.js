import React from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler'


import axios from 'axios'

const INGRIDIENT_PRICES = {
	salad: 0.5,
	tomato: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends React.Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount () {
		axios.get('/ingredients.json')
			.then(response => {
				this.setState({ ingredients: response.data })
			})
			.catch(error => { this.setState({ error: true }) })
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
		.map(igKey => {
			return ingredients[igKey]
		})
		.reduce((sum, el) => {
			return sum + el
		}, 0)
		this.setState({ purchasable: sum > 0 })
	}

	addIngredientHandler = (type) => {
		const updatedCount = this.state.ingredients[type] + 1
		const updatedIngridients = {...this.state.ingredients}
		updatedIngridients[type] = updatedCount

		const priceAddition = INGRIDIENT_PRICES[type]
		const newPrice = this.state.totalPrice + priceAddition
		this.setState({ totalPrice: newPrice, ingredients: updatedIngridients })
		this.updatePurchaseState(updatedIngridients)

	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type]
		if(oldCount > 0) {
			const updatedCount = oldCount - 1
			const updatedIngridients = {...this.state.ingredients}
			updatedIngridients[type] = updatedCount

			const priceAddition = INGRIDIENT_PRICES[type]
			const newPrice = this.state.totalPrice - priceAddition
			this.setState({ totalPrice: newPrice, ingredients: updatedIngridients })
			this.updatePurchaseState(updatedIngridients)
		}
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true })
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		this.setState( {loading: true} )
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Pepe Luis',
				address: {
					street: 'Calle Falsa 123',
					zipcode: '234234',
					country: 'Pepelandia'
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'fastest'
		}
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false, purchasing: false })
			})
			.catch(error => {
				console.log(error)
				this.setState({ loading: false, purchasing: false })
			})
	}	

	render() {
		const disabledInfo = {
			...this.state.ingredients
		}

		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		let orderSummary = null
		let burger = this.state.error ? <p>Ingridients not loading</p> : <Spinner />
		if(this.state.ingredients) {
			burger = (
				<>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls 
						price={this.state.totalPrice}
						addIngredient={this.addIngredientHandler}
						removeIngredient={this.removeIngredientHandler}
						disabled={disabledInfo} 
						purchasable={!this.state.purchasable}
						ordered={this.purchaseHandler} />
				</>
			)
			orderSummary =	<OrderSummary ingredients={this.state.ingredients}
				totalPrice={this.state.totalPrice.toFixed(2)}
				purchaseCanceled={this.purchaseCancelHandler}
				purchaseContinue={this.purchaseContinueHandler} />			
		}

		if(this.state.loading) {
			orderSummary = <Spinner />
		}

		return (
			<>
				{burger}
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
			</>
		)
	}
}

export default withErrorHandler(BurgerBuilder, axios)