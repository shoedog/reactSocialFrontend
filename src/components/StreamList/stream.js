import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/stream';
import * as selectors from '../../utils/lib/selectors';
import TextField from 'material-ui/TextField';
import { GridList, GridTile } from 'material-ui';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { TwitterButton, TwitterCount } from 'react-social';
import StreamItem from '../StreamItem/StreamItem';
import s from './stream.css';
import _ from 'lodash';

class StreamList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	state = {
		isToggleOn: false
	};

	handleChange(event) {
    this.setState({searchTerm: event.target.value});
		//const search = _.debounce((term) => { console.log("FUCK") }, 1000)(this.state.searchTerm);
  }

	searchTweets = (term) => {
		fetch(`http://0.0.0.0:5000/social/stream/${term}`,
			{
			})
		.then((res) => {
			console.log(res);
		});
	};

	handleSubmit(e) {
		e.preventDefault();
		let form = {
			searchTerm: this.state.searchTerm,
		};
		this.searchTweets(this.state.searchTerm);
	}

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
					<form onSubmit={this.handleSubmit}>
						<div>
					<TextField
						id="searchTerm" type="text"
						hintText="Search"
						floatingLabelText="Search"
						value={this.state.searchTerm}
						onChange={this.handleChange}
					/><br />
					<div>
						<RaisedButton label="Search" primary={true} type="submit" disabled={this.props.submitting}/>
					</div>
							</div>
						</form>
					<br/>
					{
						( feedItems.length === 0) ?
								<div>No Content...</div>
						:
							<GridList cellHeight='auto' style={{"width":"100%", "height":"100%"}} padding={10} cols={1}>
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
