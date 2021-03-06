import React, { Component } from 'react'

import Button from '../../components/UI/Button/Button'

import styles from './ContactData.module.css'

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		}
	}

	render() {
		return (
			<div className={styles.ContactData}>
				<h4>Enter your details</h4>
				<form>
					<input type="text" name="name" placeholder="Your Name" />
					<input type="email" name="email" placeholder="Your Email" />
					<input type="text" name="street" placeholder="Street" />
					<input type="text" name="postalCode" placeholder="Postal Code" />
					<Button btnType="Success">Order</Button>
				</form>
			</div>
		)
	}
}

export default ContactData
