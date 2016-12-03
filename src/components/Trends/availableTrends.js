import React, { PropTypes, Component } from 'react';
import TextField from 'material-ui/TextField';
import { Tabs, Tab, GridList, GridTile } from 'material-ui';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FaTwitter from 'react-icons/lib/fa/twitter';
import StreamItem from '../StreamItem/StreamItem';
import s from './trends.css';
import Snackbar from 'material-ui/Snackbar';
import { fetchJson } from '../../utils/lib/fetchUtils';
import cities from '../../utils/lib/cities';

class AvailableTrends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            dopen: false,
            availablePlaces: null,
            availableTrends: null,
            searchData: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAvailableTrends = this.getAvailableTrends.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        //this.getTrending = this.getTrending.bind(this);
        this.viewTweets = this.viewTweets.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.getAvailableTrends();
    }

    handleToggle(){
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    handleRequestClose() {
        this.setState({open: false});
    }

    /**
     *     PLACES!
     *
     *
     * **/
    getAvailableTrends = () => {
        let options = { method: 'GET'};
        return fetchJson(`http://localhost:5000/social/trends/available`,
            {options})
        .then((res) => {
            console.log('AVAILABLE');
            console.log(res);
            this.setState({availablePlaces: res});
        })
    };
/*
<div>
{/* Begin Place List }
{places.map((place) => (
    <ul key={place.name}>
        <li>Name: {place.name}</li>
        <li>PlaceType: {place.placeType.name}</li>
        <li>parentid ( Country ?): {place.parentid}
            <FlatButton label="Trending Country" onClick={this.getTrending(place.parentid)} /></li>
        <li>country: {place.country} </li>
        <li> woeid (local? ): {place.woeid} <FlatButton label="Trending Here" onClick={this.getTrending(place.woeid)} /></li>
        <li>countryCode: {place.countryCode} </li>
    </ul>
))}

{/* End Place List }
</div>
 */


    /**
     *     TRENDS!
     *
     *
     * **/
    getTrending(id) {
        let options = { method: 'GET'};
        return fetchJson(`http://localhost:5000/social/trends/place/${id}`,
            {options})
        .then((res) => {
            console.log('TRENDS');
            console.log(res);
            this.setState({availableTrends: res});
        })
    };

  /*  getTrends(trends) {
        if (trends == null ) {
            return (
                <div>
                </div>
            );
        } else {
            return (
                <div>
                    {/* Begin Place List }
                    {trends.map((trend) => (
                        <ul key={trend.url}>
                            <li>Name: {trend.name}</li>
                            <li>Url: {trend.url}</li>
                            <li>Promoted Content: { trend.promotedContent === null ? 'NO' : 'YES'}</li>
                            <li>Query: {trend.query} <FlatButton label="See Trending Tweets" onTouch={this.viewTweets(trend.query)} /></li>
                            <li> Tweet Volume: {trend.tweet_volume} </li>
                        </ul>
                    ))}

                    {/* End Place List }
                </div>
            );
        }
    }

*/
    /**
     *  TWEETS!
     *
     *
     *
     * **/
    viewTweets = (term) => {
        let options = { method: 'GET'};
        return fetchJson(`http://localhost:5000/social/stream/${term}`,
            {options})
        .then((res) => {
            console.log(res);
            this.setState({searchData: res});
            this.setState({dopen: !this.state.dopen});
        })
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

/**
 *  TWEET DRAWER
 *
 *
 * **/
    getDrawer(searchGroup) {
        if (searchGroup == null ) {
            return (
                <div>
                </div>
            );
        } else {
            return (
                <div>
                    {/* Begin Left Drawer */}
                    <Drawer open={this.state.dopen} width={400} docked={false} openSecondary={true} onRequestChange={(dopen) => this.setState({dopen})}>
                        <GridList cellHeight='auto' style={{
                            width: 350,
                            display: 'flex',
                            justifyContent: 'center',
                            marginLeft: '10%',
                            marginTop: 40
                        }} padding={10} cols={1}>
                            {searchGroup.map((tweet) => (
                                <GridTile key={tweet.id_str}>
                                    <StreamItem
                                        tweetId={tweet.id_str}
                                        favorited={tweet.favorited}
                                        retweeted={tweet.retweeted}
                                        retweetCount={tweet.retweet_count}
                                        favoriteCount={tweet.favorite_count}
                                        friend={tweet.user.screen_name}
                                        avatarImg={tweet.user.profile_image_url}
                                        textContent={this.getText(tweet)} />
                                </GridTile>
                            ))}
                        </GridList>
                    </Drawer>
                    {/* End Left Drawer */}
                </div>
            );
        }
    }

   /**
    *   RENDER!!
    *<li>Name: {place.name}</li>
    <li>PlaceType: {place.placeType.name}</li>
    <li>parentid ( Country ?): {place.parentid}
    <FlatButton label="Trending Country" onClick={this.getTrending(place.parentid)} /></li>
    <li>country: {place.country} </li>
    *
    *
    * **/

    render() {
        let link = "";
        return(
            <div>
                {/* SNACKBAR START */}
                <Snackbar
                    open={this.state.open}
                    message="Finding Trends!"
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                />
                {/* SNACKBAR END */}

                {/* START MAIN BLOCK */}
                <Paper className={s.paperBlock} zDepth={0}>
                    <div style={{display: 'flex', }}>
                        <div>
                            {/* Begin Place List */}
                            {cities.map((city) => (
                                <ul key={city}>
                                    <li> <FlatButton label="Trending Here" onClick={this.getTrending(city)} /></li>
                                </ul>
                            ))}

                            {/* End Place List */}
                        </div>
                        <div>
                            <p>TRENDS</p>
                            {/* Begin Trend List  {this.getTrends(this.state.availableTrends)}*/}

                            {/* End Trend List */}
                        </div>
                    </div>
                    {/* Begin Left Drawer {this.getDrawer(this.state.searchData)}*/}

                    {/* End Left Drawer */}
                </Paper>
                {/* END MAIN BLOCK */}
            </div>
        );
    }
}

export default AvailableTrends;