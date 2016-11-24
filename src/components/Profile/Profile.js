import React, { Component } from 'react';
import {Card, CardActions, CardHeader, 
        CardMedia, CardTitle, CardText,
        Tabs, Tab} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/user';
import s from './Profile.css';

const style = {
  card: {
    width: 'auto',
    margin: 'auto'
  },
  card2: {
    width: '40%',
    margin: 'auto'
  },
  container: {
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
  },
  container2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 'a'};
    this.connectTwitter = this.connectTwitter.bind(this);
    this.removeTwitter = this.removeTwitter.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  componentDidMount() {
    if (this.props.location.query.twitter) {
      console.log(this.props.location.query.twitter);
      // TODO: set up endpoint to check if twitter handle exists
      sessionStorage.setItem('twitter', this.props.location.query.twitter);
    }
  }

  connectTwitter() {
    //console.log(this.props.user.userId)
    window.location = `http://0.0.0.0:5000/social/connect/twitter?id=${this.props.user.userId}`
  }

  removeTwitter() {
  fetch(`http://0.0.0.0:5000/social/remove/twitter?id=${this.props.user.userId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Bearer' + this.props.user.token
    },
    body: '' }
  )
  .then((response) => {
    return response.json();
  })
  .then(
    (result) => { window.location.href = 'http://0.0.0.0:3000/profile' },
    (error) => { window.location.href = 'http://0.0.0.0:3000/profile' }
  );
  }

  onToggle(e){
    this.setState({value: this.state.value});
  };

  render() {
    const { user } = this.props;

    return(
      <Paper className={s.paperBlock}>
      <h1>User Profile: {user.displayName}</h1>
      <div style={style.container}>


        <Card style={style.card}>
          <CardHeader title="Link Social Media"
                      actAsExpander={true}
                      showExpandableButton={true}
                      titleColor="#00bcd4" />
          <CardText expandable={true}>
            Select which Social Media platforms you'd like to link to your account:
          </CardText>
          <CardActions expandable={true}>
            <Table selectable={false}>
            <TableBody>

              <TableRow selected={true} selectable={false} striped={true}>
                <TableRowColumn>Twitter</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton 
                    label="Connect" 
                    icon = {<img style={{"height":"16px", "width":"16px"}} src="https://upload.wikimedia.org/wikipedia/en/9/9f/Twitter_bird_logo_2012.svg" />}
                    onClick={this.connectTwitter}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <RaisedButton 
                    label="Remove" 
                    icon = {<img style={{"height":"16px", "width":"16px"}} src="https://upload.wikimedia.org/wikipedia/en/9/9f/Twitter_bird_logo_2012.svg" />}
                    onClick={this.removeTwitter}
                  />
                </TableRowColumn>
              </TableRow>

              <TableRow selectable={false}>
                <TableRowColumn>Facebook</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton 
                    label="Connect" 
                    icon = {<img style={{"height":"16px", "width":"16px"}} src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg" />}
                    disabled={true}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <RaisedButton 
                    label="Remove" 
                    icon = {<img style={{"height":"16px", "width":"16px"}} src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg" />}
                    disabled={true}
                  />
                </TableRowColumn>
              </TableRow>

              <TableRow selectable={false}>
                <TableRowColumn>Instagram</TableRowColumn>
                <TableRowColumn>

                  <RaisedButton 
                    label="Connect" 
                    icon = {<img style={{"height":"16px", "width":"16px"}} src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" />}
                    disabled={true}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <RaisedButton 
                    label="Remove" 
                    icon = {<img style={{"height":"16px", "width":"16px"}} src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" />}
                    disabled={true}
                  />
                </TableRowColumn>
              </TableRow> 

            </TableBody>           
            </Table>
          </CardActions>
        </Card>

        <Card>
          <CardHeader title="Account Settings"
                      actAsExpander={true}
                      showExpandableButton={true}
                      titleColor="#00bcd4"/>

          <CardText expandable={true}>
            Profile settings here
          </CardText>

          <CardActions expandable={true}>
            <div style={style.container2}>
              <Card style={style.card2}>
                <CardTitle title="Change Username"/>
                <CardText>new card!</CardText>
              </Card>
              <Card style={style.card2}>
                <CardTitle title="Change Email"/>
                <CardText>new card!</CardText>
              </Card>
            </div><br />
            <div style={style.container2}>
              <Card style={style.card2}>
                <CardTitle title="Change Password"/>
                <CardText>new card!</CardText>
              </Card>
              <Card style={style.card2}>
                <CardTitle title="Delete Account"/>
                <CardText>new card!</CardText>
              </Card>
            </div>
          </CardActions>
        </Card>
      </div>
      </Paper>
    );
  };
};

export default connect(mapStateToProps, actionCreators)(Profile);
