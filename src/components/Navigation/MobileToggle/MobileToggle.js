import React from 'react'
import styles from './MobileToggle.module.css'

const mobileToggle = (props) => (
	<div className={styles.MobileToggle} onClick={props.opened}><i/></div>
)

export default mobileToggle