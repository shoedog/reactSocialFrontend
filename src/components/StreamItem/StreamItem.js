import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import BottomBar from './BottomBar';

const style = {
    minHeight: 200,
    minWidth: 300,
    margin: 10,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
};

const list = {
    paddingTop: 0,
};

const avatar = {
    left: 3,
    top: 4,
};

const header = {
    height: 50,
};

const StreamItem = (props) => {
    const {
      tweetId,
      favorited,
      retweeted,
      retweetCount,
      favoriteCount,
      friend,
      avatarImg,
      textContent,
      imgs,
      gifs
    } = props;

  const handleClickTop = () => {
    window.open('http://twitter.com/intent/user?screen_name=' + friend, '_blank')
  }

  const handleClickMain = () => {
    window.open('https://twitter.com/' + friend + '/status/' + tweetId, '_blank')
  }

	return(
			<Paper style={style} zDepth={1}>
                <List style={list}>
                    <ListItem
                        primaryText={'@' + friend}
                        leftAvatar={<Avatar style={avatar} src={avatarImg}></Avatar>}
                        style={header}
                        onTouchTap={handleClickTop}
                    />
                    <Divider />
                    <ListItem style={{ flexGrow: 1}} onTouchTap={handleClickMain}>
                        {textContent} <br/>
                        { typeof imgs === 'undefined' ?
                            <span></span>
                            :
                            imgs.map((image) => (
                                <img className={{objectFit: 'contain'}} src={image.media_url + ':thumb'} key={[image]}/>

                            ))
                        }
                        { typeof gifs === 'undefined' ?
                            <span></span>
                            :
                            gifs.map((gif) => (
                                <video autoPlay className={{objectFit: 'contain'}}><source src={gif.video_info.variants[0].url} type="video/mp4" key={[gif]}/> </video>

                            ))
                        }
                    </ListItem>
                </List>
                <BottomBar
                  tweetId={tweetId}
                  favorited={favorited}
                  retweeted={retweeted}
                  retweetCount={retweetCount}
                  favoriteCount={favoriteCount}
                  friend={friend}
                />
            </Paper>

	);
};


export default StreamItem;
