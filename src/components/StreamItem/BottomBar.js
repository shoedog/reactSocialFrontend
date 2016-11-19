import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Share from 'material-ui/svg-icons/social/share';
import Comment from 'material-ui/svg-icons/communication/comment';
import Forum from 'material-ui/svg-icons/communication/forum';

import s from './streamItem.css';

const style = {
    height: 200,
    width: 300,
    margin: 10,
    textAlign: 'left',
    display: 'inline-block',
};

class BottomBar extends Component {
    state = {
        selectedIndex: 0,
    };

    select = (index) => this.setState({selectedIndex: index});

    render() {


        return (
            <Paper zDepth={1}>
                <BottomNavigation>

                    <BottomNavigationItem label="Comments"
                                          icon={<Forum/>}
                                          onTouchTap={() => this.select(0)}
                    ></BottomNavigationItem>
                    <BottomNavigationItem label="Comment"
                                          icon={<Comment/>}
                                          onTouchTap={() => this.select(1)}
                    />
                    <BottomNavigationItem label="Favorite"
                        icon={<FavoriteBorder/>}
                        onTouchTap={() => this.select(2)}
                    />
                    <BottomNavigationItem label="Share"
                                          icon={<Share/>}
                                          onTouchTap={() => this.select(3)}
                    />
                </BottomNavigation>
            </Paper>
        )
    }
};


export default BottomBar;