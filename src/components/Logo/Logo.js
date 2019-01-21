import React from 'react'

import styles from './Logo.module.css'
import burgerLogo from '../../assets/images/logo-peperino1.png'

const logo = (props) => (
	<div className={styles.Logo}>
		<img src={burgerLogo} alt="Peperino's" />
	</div>
)

export default logo