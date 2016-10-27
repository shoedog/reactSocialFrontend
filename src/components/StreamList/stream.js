import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/asyncActions';
import * as selectors from '../../lib/selectors';

import Sidebar from '../Sidebar/sidebar';
import StreamItem from '../StreamItem/StreamItem';
import s from './stream.css';

class StreamList extends Component {
	state = {
		isToggleOn: false
	};

		//this.handleToggle = this.handleToggle.bind(this)

	handleToggle(){
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
	}

	componentWillMount() {
		this.props.fetchFeedItems();
		// For easy console fun
		console.log(this.props.fetchFeedItems());
	}

	render() {
		const { feedItems, openFeedItemId, addFeedItem, openFeedItem } = this.props;

		return (
			<div className={s.Stream}>
				<h1>User Stream</h1>
				<div>
					{ this.state.isToggleOn ? <Sidebar /> : "" }
				</div>

				<a href="" className={s.SideBarToggle} onClick={ () => this.handleToggle()}>
					{this.state.isToggleOn ? 'v':'>'} Username
				</a>
				
				<div className={s.StreamContent}>
					<button className={s.addFeedItemButton} onClick={() => addFeedItem()}>Create Post</button>
					{( feedItems.length === 0) ?
						<div className={s.empty}>No Content...</div>
						: feedItems.map((feedItem) => (
							<button key={feedItem.id} className={(feedItem.id === openFeedItemId)
								? {...s.feedItem, ...s.selected} : s.feedItem }
											onClick={() => openFeedItem(feedItem.id)} >
								{feedItem.content === ''
									? <span className={s.newFeedItem}>Create Post</span>
									: <div>
									Content: {feedItem.content}
									<br/>...might need to map content into heading, main, img, preview, etc
								</div> }
							</button>
					))
					}
					<StreamItem />
				</div>
			</div>
		);
	}
}

StreamList.propTypes = {
	feedItems: PropTypes.arrayOf(PropTypes.shape({
		content: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
	}).isRequired).isRequired,
	openFeedItem: PropTypes.func.isRequired,
	addFeedItem: PropTypes.func.isRequired,
	openFeedItemId: PropTypes.string,
	fetchFeedItems: PropTypes.func.isRequired,
};

const selector = (state) => ({
	feedItems: selectors.getFeedItems(state),
	openFeedItemId: selectors.getOpenFeedItemId(state),
});

export default connect(selector, actionCreators)(StreamList);