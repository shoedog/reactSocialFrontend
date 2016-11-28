import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import BottomBar from './BottomBar';
import s from './streamItem.css';

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
    const { tweetId, friend, avatarImg, textContent, imgs, gifs } = props;
    console.log(friend);
	return(
			<Paper style={style} zDepth={1}>
                <List style={list}>
                    <ListItem
                        primaryText={<a target="_blank" href={"http://twitter.com/intent/user?screen_name=" + friend}>{'@' + friend}</a>}
                        leftAvatar={<Avatar style={avatar} src={avatarImg}></Avatar>}
                        style={header}
                    />
                    <Divider />
                    <ListItem style={{ flexGrow: 1}}>
                        {textContent} <br/>
                        { typeof imgs === 'undefined' ?
                            <span></span>
                            :
                            imgs.map((image) => (
                                <img className={{objectFit: 'contain'}} src={image.media_url + ':thumb'}/>

                            ))
                        }
                        { typeof gifs === 'undefined' ?
                            <span></span>
                            :
                            gifs.map((gif) => (
                                <video autoPlay className={{objectFit: 'contain'}}><source src={gif.video_info.variants[0].url} type="video/mp4"/> </video>

                            ))
                        }
                    </ListItem>
                </List>
                <BottomBar tweetId={tweetId}/>
            </Paper>

	);
};


export default StreamItem;
