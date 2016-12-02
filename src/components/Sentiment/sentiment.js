import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/sentiment';
import * as selectors from '../../utils/lib/selectors';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Drawer from 'material-ui/Drawer';
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import StreamItem from '../StreamItem/StreamItem';
import s from './sentiment.css';
import Snackbar from 'material-ui/Snackbar';

class Sentiment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			open: false,
            dopen: false,
            row: null,
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

    handleDrawer = (row) => {
        this.setState({row: row[0]});
        this.setState({dopen: !this.state.dopen});
    };

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

    getDrawer(sentimentGroup) {
        var myNamespace = {};

        myNamespace.round = function(number, precision) {
            var factor = Math.pow(10, precision);
            var tempNumber = number * factor;
            var roundedTempNumber = Math.round(tempNumber);
            return roundedTempNumber / factor;
        };

        if (this.state.row == null ) {
            return (
                <div>
                </div>
            );
        } else {
            return (
                <div>
                    {/* Begin Left Drawer */}
                    <Drawer open={this.state.dopen} width={400} docked={false} onRequestChange={(dopen) => this.setState({dopen})}>
                        <GridList cellHeight='auto' style={{
                            width: 350,
                            display: 'flex',
                            justifyContent: 'center',
                            marginLeft: '10%',
                            marginTop: 40
                        }} padding={10} cols={1}>
                            {sentimentGroup[this.state.row].value.tweets.map((tweet) => (
                                <span>
                                    <Divider />
                                <GridTile>

                                    <ul>
                                        <li>Comparative: {myNamespace.round(tweet.moonwalkScore.comparative, 2)}</li>
                                        <li>Score: {tweet.moonwalkScore.score}</li>
                                    </ul>
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

                                </GridTile>

                                    </span>
                            ))}
                        </GridList>
                    </Drawer>
                    {/* End Left Drawer */}
                </div>
            );
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

        const rowStyles = {
            paddingLeft: '12',
            paddingRight: '12'
        };
		const { sentimentGroup } = this.props;
		let message = '';
		let link = "";

		return(
			<div>

			{/* START MAIN BLOCK */}
			<Paper className={s.paperBlock} zDepth={0}>
                {/* BEGIN SIDEBAR */}
                <div style={{flex: '1 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px'}}>
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
                <Divider />
                {/* END SIDEBAR */}
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
					{/* BEGIN FEED */}
                    {
                        ( sentimentGroup.length === 0) ?
                            <div></div>
                            :

                            <Table onRowSelection={(e) => this.handleDrawer(e)}>
                                <TableHeader adjustForCheckbox={false}
                                             displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn colSpan="9"
                                                           tooltip="Click a Row to View Associated Content"
                                                           style={{textAlign: 'center'}}>
                                            Sentiment Analysis Results
                                        </TableHeaderColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableHeaderColumn
                                            tooltip={"The Search Term to Perform a Social Sentiment Analysis On"}>Term</TableHeaderColumn>
                                        <TableHeaderColumn
                                            tooltip={"Aggregate Sentiment Score from Sample (Sample Size = 100)"}>Score</TableHeaderColumn>
                                        <TableHeaderColumn
                                            tooltip={"Average Sentiment Score of Sample"}>Average</TableHeaderColumn>
                                        <TableHeaderColumn
                                            tooltip={"Difference Between Max and Min Sentiments"}>Polarity</TableHeaderColumn>
                                        <TableHeaderColumn
                                            tooltip={"Count of Positive Sentiments"}>#
                                            Pos</TableHeaderColumn>
                                        <TableHeaderColumn
                                            tooltip={"Count of Negative Sentiments"}>#
                                            Neg</TableHeaderColumn>
                                        <TableHeaderColumn
                                            tooltip={"Average of Positive Sentiments"}>Avg
                                            Pos</TableHeaderColumn>
                                        <TableHeaderColumn
                                            tooltip={"Average of Negative Sentiments"}>Avg
                                            Neg</TableHeaderColumn>
                                        <TableHeaderColumn
                                            tooltip={"Highest Sentiment in Sample"}>High</TableHeaderColumn>
                                        <TableHeaderColumn
                                            tooltip={"Lowest Sentiment in Sample"}>Low</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody stripedRows={true}
                                           showRowHover={true}
                                           displayRowCheckbox={false}>
                                    {sentimentGroup.map((tile) => (
                                        <TableRow key={tile.name}
                                                  selectable={true}>
                                            <TableRowColumn>{tile.name}</TableRowColumn>
                                            <TableRowColumn>{tile.value.overall}</TableRowColumn>
                                            <TableRowColumn>{tile.value.average}</TableRowColumn>
                                            <TableRowColumn>{tile.value.polar}</TableRowColumn>
                                            <TableRowColumn>{tile.value.pos}</TableRowColumn>
                                            <TableRowColumn>{tile.value.neg}</TableRowColumn>
                                            <TableRowColumn>{tile.value.posAvg}</TableRowColumn>
                                            <TableRowColumn>{tile.value.negAvg}</TableRowColumn>
                                            <TableRowColumn>{tile.value.posMax}</TableRowColumn>
                                            <TableRowColumn>{tile.value.negMax}</TableRowColumn>
                                        </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                    }</div>

					{/* END FEED */}
			</Paper>
			{/* END MAIN BLOCK */}
                {/* Begin Left Drawer */}
                {this.getDrawer(sentimentGroup)}
                {/* End Left Drawer */}
			</div>
		);
	}
}

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
