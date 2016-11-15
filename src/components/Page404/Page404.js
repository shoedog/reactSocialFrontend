import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import s from './Page404.css';

class Page404 extends Component {
	render() {
		return (
			<div className="page404">
				<h1>404 - Page Not Found</h1>

			</div>
		);
	}
}

export default Page404
