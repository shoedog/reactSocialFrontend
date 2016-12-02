import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/sentiment';
import * as selectors from '../../utils/lib/selectors';
import TextField from 'material-ui/TextField';
import { Tabs, Tab, GridList, GridTile } from 'material-ui';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';
import FaTwitter from 'react-icons/lib/fa/twitter';
import StreamItem from '../StreamItem/StreamItem';
import s from './sentiment.css';
import Snackbar from 'material-ui/Snackbar';

class Sentiment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			tweetBox: '',
			open: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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

	searchTweets = (term) => {
        this.props.fetchSentimentServer(term)
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
		const { sentimentGroup } = this.props;
        //tweets.length
		let message = '';
		let link = "";

		return(
			<div>

			{/* START MAIN BLOCK */}
			<Paper className={s.paperBlock} zDepth={0}>
				<div style={{display: 'flex', justifyContent: 'space-around'}}>
					{/* BEGIN FEED */}
					{
						( sentimentGroup.length === 0) ?
								<div>No Content...</div>
						:
                            <div style={{flex: '10 0 0', display: 'flex', justifyContent: 'center'}}>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderColumn>Sentiment Term</TableHeaderColumn>
                                            <TableHeaderColumn>Total Value</TableHeaderColumn>
                                            <TableHeaderColumn>Average Value</TableHeaderColumn>
                                            <TableHeaderColumn>Polarity</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {sentimentGroup.map((tile) => (
                                            <TableRow key={tile.name}>
                                                <TableRowColumn>{tile.name}</TableRowColumn>
                                                <TableRowColumn>{tile.value.overall}</TableRowColumn>
                                                <TableRowColumn>{tile.value.average}</TableRowColumn>
                                                <TableRowColumn>{tile.value.polar}</TableRowColumn>
                                            </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
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
			</Paper>
			{/* END MAIN BLOCK */}
			</div>
		);
	}
}

/*
 <GridList cellHeight='auto' style={gridList} padding={10} cols={1}>
 <span>
 <GridTile key={tile.name}>
 <div>{tile.name}</div>
 <div>Overall: {tile.value.overall}</div>
 <div>Average: {tile.value.average}</div>
 <div>Polarity: {tile.value.polar}</div>

 </GridTile>
 {tile.value.tweets.map((tweet) => (
 <span>
 <StreamItem key={tweet.id_str}
 tweetId={tweet.id_str}
 favorited={tweet.favorited}
 retweeted={tweet.retweeted}
 retweetCount={tweet.retweet_count}
 favoriteCount={tweet.favorite_count}
 friend={tweet.user.screen_name}
 avatarImg={tweet.user.profile_image_url}
 textContent={this.getText(tweet)}
 />
 <span>
 Comparative: {tweet.moonwalkScore.comparative}
 <br/>
 Score: {tweet.moonwalkScore.score}
 </span>
 </span>
 ))}
 </span>
 </GridList>


};*/

const selector = (state) => ({
	sentimentItems: selectors.getSentimentItems(state),
	openSentimentItemId: selectors.getOpenSentimentItemId(state),
});

function mapStateToProps(state) {
    return {
        sentimentGroup: state.sentimentGroup
    }
}

export default connect(mapStateToProps, actionCreators)(Sentiment);
