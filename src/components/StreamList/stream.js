import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/stream';
import * as selectors from '../../utils/lib/selectors';

import { GridList, GridTile } from 'material-ui';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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

	componentDidMount() {
		this.props.fetchFeedItems();
		// For easy console fun
		// console.log(this.props.fetchFeedItems());
	}

	render() {
		const { feedItems, openFeedItemId, addFeedItem, openFeedItem } = this.props;

		return(
			<div>
				<Paper className={s.paperBlock}>
					<h1 className={s.title}>User Stream</h1>
		
					<div className={s.StreamContent}>
						<button className={s.addFeedItemButton} onClick={() => addFeedItem()}>Create Post</button>	
					</div><br/>

					<GridList cellHeight={180} className={s.gridList} padding={10} cols={3}>
						{
							( feedItems.length === 0) ? 
									<div>No Content...</div>
							: feedItems.map( (tile) =>(
								<GridTile 
									className={s.gridTile}
									title={tile.id}
									actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
								>
									{tile.content}
								</GridTile>
						))}
					</GridList>
				</Paper>
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