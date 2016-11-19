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
		if ( tweet.extended_entities) {
			let imgs = tweet.extended_entities.media.filter((media) => {
				if ( media.type === 'photo'){
					return media.media_url;
				}
			});
			return imgs;
		} else if (tweet.entitites) {
			let imgs = tweet.entities.media.filter((media) => {
				if ( media.type === 'photo') {
					return media.media_url;
				}
			});
			return imgs;
		}
	}

	getGif(tweet) {
		if (tweet.extended_entities) {
			let gifs = tweet.extended_entities.media.filter((media) => {
				if( media.type === 'animated_gif'){
					return media.video_info.variants[0].url;
				}
			});
			return gifs;
		}
	}

	render() {
		const paper = {
			marginTop: 15,
			marginRight: 0,
			minWidth: 643,
		};

		const streamItem = {
			minHeight: 200,
			minWidth: 300,
			margin: 10,
		};
		const { feedItems, openFeedItemId, addFeedItem, openFeedItem } = this.props;

		return(
			<div>
				<Paper className={s.paperBlock} style={paper}>
					<h1 className={s.title}>User Stream</h1>
		
					<div className={s.StreamContent}>
						<button className={s.addFeedItemButton} onClick={() => addFeedItem()}>Create Post</button>	
					</div><br/>
						{
							( feedItems.length === 0) ? 
									<div>No Content...</div>
							:
								<GridList cellHeight='auto' className={s.gridList} padding={10} cols={2}>
									{feedItems.map((tile) => (

										<StreamItem key={tile.id_str}
											friend={tile.user.screen_name}
											avatarImg={tile.user.profile_image_url}
											textContent={this.getText(tile)}
											imgs={this.getImgs(tile)}
											gifs={this.getGif(tile)}
										/>

									))}
								</GridList>

						}

				</Paper>
			</div>			
		);
	}
}

/*
 <GridTile
 key={tile.id.toString()}
 className={s.gridTile}
 title={<span className={s.avatar}><Avatar src={tile.user.profile_image_url}/>{tile.user.screen_name}</span>}
 actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
 >
 {this.getText(tile)}
 <img src={this.getImgs(tile)}/>
 </GridTile>
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