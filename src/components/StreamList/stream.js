import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/stream';
import * as selectors from '../../utils/lib/selectors';
import TextField from 'material-ui/TextField';
import { Tabs, Tab, GridList, GridTile } from 'material-ui';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';
import FaTwitter from 'react-icons/lib/fa/twitter';
import StreamItem from '../StreamItem/StreamItem';
import s from './stream.css';
import Snackbar from 'material-ui/Snackbar';

class StreamList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			tweetBox: '',
			open: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.sendTweet = this.sendTweet.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);
	}

	state = {
		isToggleOn: false
	};

	handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

	handleRequestClose() {
		this.setState({open: false, tweetBox: ''});
	}

	sendTweet() {
		this.setState({open: true});
	}

	searchTweets = (term) => {
		fetch(`http://localhost:5000/social/stream/${term}`,
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

		const streamItem = {
			minHeight: 200,
			minWidth: 300,
			margin: 10,
		};

		const fastack1x = {
			color: 'white',
		};
		const gridList = {
	    width: 450,
			display: 'flex',
			justifyContent: 'center',
			marginLeft: '30%',
			marginTop: 40
		};
		const { feedItems, openFeedItemId, addFeedItem, openFeedItem } = this.props;

		let message = '';
		let link = "";

		return(
			<div>
			{/* SNACKBAR START */}
			<Snackbar
				open={this.state.open}
				message="Tweet sent!"
				autoHideDuration={2000}
				onRequestClose={this.handleRequestClose}
			/>
			{/* SNACKBAR END */}

			{/* START MAIN BLOCK */}
			<Paper className={s.paperBlock} zDepth={0}>
				<Tabs>
				<Tab label="User Stream">
				<div style={{display: 'flex', justifyContent: 'space-around'}}>
					{/* BEGIN FEED */}
					{
						( feedItems.length === 0) ?
								<div>No Content...</div>
						:
						<div style={{flex: '10 0 0', display: 'flex', justifyContent: 'center'}}>
							<GridList cellHeight='auto' style={gridList} padding={10} cols={1}>
								{feedItems.map((tile) => (
									<GridTile >
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
									</GridTile>
								))}
							</GridList>
						</div>
					}
					{/* END FEED */}

					{/* BEGIN SIDEBAR */}
					<div style={{flex: '1 0 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '50'}}>
						<form onSubmit={this.handleSubmit}>
							<div>
								<TextField
									id="searchTerm" type="text"
									hintText="Search"
									floatingLabelText="Search"
									value={this.state.searchTerm}
									onChange={this.handleChange}
								/>
								<div>
									<RaisedButton label="Search" primary={true} type="submit" disabled={this.props.submitting}/>
								</div>
							</div>
						</form>
					</div>
					{/* END SIDEBAR */}
				</div>
				</Tab>

				{/* START TWEET TAB */}
				<Tab label="Tweet">
					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10%'}}>
						<TextField
							id="tweetBox"
							value={this.state.tweetBox}
							onChange={this.handleChange}
							hintText="Tell the world what you're all about #OSU FTW!"
							multiLine={true}
							rows={4}
							rowsMax={4}
							maxLength={140}
						/>
						<FlatButton href={link}
							label='Tweet'
							icon={<FaTwitter size={12}/>}
							labelPosition="after"
							primary={true}
							viewBox='0 0 64 64'
							style={{width: 100}}
							onClick={this.sendTweet}
						/>
				</div>
				</Tab>
				{/* END TWEET TAB */}
				</Tabs>
			</Paper>
			{/* END MAIN BLOCK */}
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
