import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'

const navigationItems = (props) => (
	<nav className={styles.NavigationItems}>
		<ul>
			<NavigationItem url="/" active>Burger Builder</NavigationItem>
			<NavigationItem url="/">Checkout</NavigationItem>
		</ul>
	</nav>
)
 
export default navigationItems 