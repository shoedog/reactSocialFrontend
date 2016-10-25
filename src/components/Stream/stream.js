import React from 'react';
import Sidebar from '../Sidebar/sidebar';
import StreamContent from './StreamContent';
import style from './stream.css';

class Stream extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			isToggleOn: false
		};
		this.handleToggle = this.handleToggle.bind(this)
	}

	handleToggle(){
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
	}

	render() {
		return (
			<div className={style.Stream}>
				<h1>User Stream</h1>
				<div>
					{ this.state.isToggleOn ? <Sidebar /> : "" }
				</div>

				<a href="" className={style.SideBarToggle} onClick={this.handleToggle}>
					{this.state.isToggleOn ? 'v':'>'} Username
				</a>
				
				<div className={style.StreamContent}>
					<StreamContent /> 
				</div>
			</div>
		);
	}
}

export default Stream