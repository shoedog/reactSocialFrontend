import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
require("!style!css!./about.css");

class About extends Component {
	render() {
		return (
			<div className="about">
				<h1 className="title">About Our Project</h1>
				<div className="context">
				Moonwalk is a web based platform which integrates major social media networks. It allows users to seamlessly
				read, post, and share content across social media profiles. Moonwalk is capable of organizing content in a
				meaningful way by providing custom filter controls empowering users to curate their social media content. Our
				platform aggregates the user’s social media feeds and displays relevant content in one unified user stream.
				Additionally, it allows users to post and share across social media networks with just a click. Moonwalk
				empowers users to manage their online presence like never before.
				</div>
			</div>
		);
	}
}

export default About