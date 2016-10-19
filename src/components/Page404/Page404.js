import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
//require("!style!css!./Page404.css");
import s from './Page404.css';
import Button from 'react-toolbox/lib/button/Button.js';

class Page404 extends Component {
	render() {
		return (
			<div className="page404">
				<h1>404 - Page Not Found</h1>
				<Button label="React-ToolBox Button" />
			</div>
		);
	}
}

export default Page404
