import React from 'react'
import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import MobileToggle from '../MobileToggle/MobileToggle'

const toolbar = props => (
		<header className={styles.Toolbar}>
			<MobileToggle opened={props.sideDrawerOpened}/>
			<Logo />
			<NavigationItems />
		</header>
	)

export default toolbar