import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/stream';
import * as selectors from '../../utils/lib/selectors';

import { GridList, GridTile } from 'material-ui';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { TwitterButton, TwitterCount } from 'react-social';

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

// Old Post Button
// <button className={s.addFeedItemButton} onClick={() => addFeedItem()}>Create Post</button>

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

		const twtBtn = {
			backgroundColor: '#00aced',
			color: 'white',
			paddingTop: 8,
			paddingBottom: 13,
			paddingRight: 17,
			paddingLeft: 17,

		};

		const icontwitter = {
			color: '#00aced',

		};
		const fastack1x = {
			color: 'white',
		}
	/*
	 <RaisedButton  overlayStyle={{backgroundColor: '#00aced', width: 115, height: 41}}
	 children={
	 <TwitterButton message={message} url={link}  style={twtBtn} >
	 <span className="fa-stack fa-1x icon-twitter" style={icontwitter}>
	 <i className="fa fa-square fa-stack-2x"></i>
	 <i className="fa fa-twitter fa-stack-2x" style={fastack1x}></i>
	 </span>
	 {" Tweet"}
	 </TwitterButton>} />*/

		const { feedItems, openFeedItemId, addFeedItem, openFeedItem } = this.props;

		let message = '';
		let link = "";

		return(
				<Paper className={s.paperBlock} style={paper}>
					<h1 className={s.title}>User Stream</h1>
					<br/>

					<TwitterButton message={message} url={link}  style={twtBtn} >
							<span className="fa-stack fa-1x icon-twitter" style={icontwitter}>
          						<i className="fa fa-square fa-stack-2x"></i>
								<i className="fa fa-twitter fa-stack-2x" style={fastack1x}></i>
        					</span>
						{" Tweet"}
					</TwitterButton>


					<br/>
					{
						( feedItems.length === 0) ?
								<div>No Content...</div>
						:
							<GridList cellHeight='auto' style={{"width":"100%", "height":"100%"}} padding={10} cols={2}>
								{feedItems.map((tile) => (
									<StreamItem key={tile.id}
										tweetId={tile.id_str}
										favorited={tile.favorited}
										retweeted={tile.retweeted}
										retweetCount={tile.retweet_count}
										favoriteCount={tile.favorite_count}
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
