import React from 'react'
import styles from './Modal.module.css'
import Backdrop from './../Backdrop/Backdrop'

class Modal extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show || nextProps.children !== this.props.children
	}

	render() {
		const modalStyles = [styles.Modal]
		if(this.props.show) modalStyles.push(styles.Show)

		return (
			<>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
				<div className={modalStyles.join(' ')}>{this.props.children}</div>
			</>
		)
	}

}

export default Modal