import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary'
import ContactData from '../ContactData'

class Checkout extends Component {
	state = {
		ingredients: {
			cheese: 2,
			tomato: 2,
			salad: 1
		}
	}

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search)
		const ingredients = {}

		for(let param of query.entries()) {
			ingredients[param[0]] = +param[1]
		}

		this.setState({ingredients: ingredients})
	}

	checkoutCancelledHandler = () => {
		this.props.history.push('/')
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/data')
	}

	render() {
		return (
			<div>
				<CheckoutSummary ingredients={this.state.ingredients}
				onCheckoutCancelled={this.checkoutCancelledHandler}
				onCheckoutContinued={this.checkoutContinuedHandler} />
				<Route path="/checkout/data" component={ContactData} />
			</div>
		);
	}
}

export default Checkout
