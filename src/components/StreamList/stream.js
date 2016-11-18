import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/stream';
import * as selectors from '../../utils/lib/selectors';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import Avatar from 'material-ui/Avatar';
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

	getText(tweet) {
		if ( tweet.extended_tweet ){
			return tweet.extended_tweet.full_text;
		} else if ( tweet.retweeted_status ) {
			if ( tweet.retweeted_status.extended_tweet ){
				return tweet.retweeted_status.extended_tweet.full_text;
			}
			return tweet.retweeted_status.text;
		}
		return tweet.text;
	}

	getImgs(tweet) {
		if (tweet.entities.media ) {
			return tweet.entities.media[0].media_url;
		}
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



						{
							( feedItems.length === 0) ? 
									<div>No Content...</div>
							:

								<GridList cellHeight={180} className={s.gridList} padding={10} cols={3}>
									{feedItems.map((tile) => (
										<GridTile
											key={tile.id.toString()}
											className={s.gridTile}
											title={<span className={s.avatar}><Avatar src={tile.user.profile_image_url}/>{tile.user.screen_name}</span>}
											actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
										>
											{this.getText(tile)}
											<img src={this.getImgs(tile)}/>
										</GridTile>
									))}
								</GridList>

						}

				</Paper>
			</div>			
		);
	}
}

/*
 <GridList cellHeight={180} className={s.gridList} padding={10} cols={3}>
 {feedItems.map((tile) => (
 <GridTile
 key={tile.id}
 className={s.gridTile}
 title={tile.screen_name}
 actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
 >
 {tile.text}
 </GridTile>
 ))}</GridList>
 */

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