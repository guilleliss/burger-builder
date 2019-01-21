import React from 'react'
import Modal from '../UI/Modal/Modal'

const withErrorHandler = (WrappedComponnet, axios) => {
	return class extends React.Component {
		state = {
			error: null
		}

		componentWillMount() {
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({ error: null })
				return req
			})			

			this.responseInterceptor = axios.interceptors.response.use(null, error => {
				this.setState({ error: error })
			})
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor)
			axios.interceptors.response.eject(this.responseInterceptor)
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null })
		}

		render () {
			return (
				<>
					<Modal 
					show={this.state.error}
					modalClosed={this.errorConfirmedHandler} >
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponnet {...this.props} />
				</>
			)
		}
	}
}

export default withErrorHandler