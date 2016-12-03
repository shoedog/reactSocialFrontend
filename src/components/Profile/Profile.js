import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/user';
import s from './Profile.css';
import { browserHistory } from 'react-router';
/*  Material-ui Libs  */
import { Card, CardActions, CardHeader,
        CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { FlatButton } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Tabs, Tab } from 'material-ui';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import formUrlencoded from 'form-urlencoded';

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
  },
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.connectTwitter = this.connectTwitter.bind(this);
    this.removeTwitter = this.removeTwitter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    this.fetchHandler = this.fetchHandler.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      password: '',
      email: '',
      open: false,
      dialog: false
    }
  }

  componentDidMount() {
    if (this.props.location.query.twitter) {
      console.log(this.props.location.query.twitter);
      // TODO: set up endpoint to check if twitter handle exists
      sessionStorage.setItem('twitter', this.props.location.query.twitter);
    }

    //If user is not signed in, redirect to Login page
    if(!sessionStorage.getItem('token'))
    {
      browserHistory.push( '/login');
    }
  }

  handleClose() {
    this.setState({dialog: false});
  }

  handleConfirmDelete() {
    const userId = sessionStorage.getItem('userId');
    const userToken = sessionStorage.getItem('token');
    return fetch(`http://54.212.196.159:5000/user/${userId}`,
      {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'Bearer' + userToken
        }
      })
      .then((res) => {
        console.log(res)
        if (res.ok) {
          this.setState({
            dialog: false
          });
          sessionStorage.clear();
          browserHistory.push( '/login');
        }
      });
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  handleDelete() {
    this.setState({dialog: true});
  }

  handlePasswordSubmit() {
    this.fetchHandler({password: this.state.password});
  }

  handleEmailSubmit() {
    this.fetchHandler({email: this.state.email});
  }

  fetchHandler(args) {
    console.log(args);
    const userToken = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    console.log(userId, userToken)
    return fetch(`http://54.212.196.159:5000/user/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'Bearer' + userToken
        },
          body: formUrlencoded(args)
      })
      .then((res) => {
        if (res.ok) {
          this.setState({
            [Object.keys(args)[0]]: '',
            open: true
          });
        }
      });
  }

  connectTwitter() {
    //console.log(this.props.user.userId)
    window.location = `http://54.212.196.159:5000/social/connect/twitter?id=${this.props.user.userId}`
  }

  removeTwitter() {
  fetch(`http://54.212.196.159:5000/social/remove/twitter?id=${this.props.user.userId}`, {
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
    // WHY?  Because this loads a new copy of user profile from server
    // which will not have twitter connected
    // solves problem of browser thinking twitter is connected
    (result) => { browserHistory.push( '/profile'); },
    (error) => { browserHistory.push( '/profile'); }
  );
  }

  onDelete(){
    if( confirm("Are you sure you would like to Permanently DELETE your account?"))
    {
      this.props.deleteAccount(this.props.user.userId, this.props.user.token);
      this.props.logout();
    }
   }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleConfirmDelete}
      />,
    ];

    const { user } = this.props;
    if(user.userId != null)
      return(
        <div>
        {/* DIALOG START */}
        <Dialog
          title="Are you sure?"
          actions={actions}
          modal={false}
          open={this.state.dialog}
          onRequestClose={this.handleClose}
        >
          Please confirm you would like to delete your account.
        </Dialog>
        {/* DIALOG END */}
        {/* SNACKBAR START */}
        <Snackbar
          open={this.state.open}
          message="Profile successfully changed."
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
        {/* SNACKBAR END */}
        <Paper>
        <h1 style={{'textAlign':'center'}}>User Profile: {user.displayName}</h1>
        <Tabs>
          {/* ACCOUNT SETTINGS START */}
          <Tab label='Account Settings'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5%' }}>
              <TextField
                id="password"
                hintText="enter new Password"
                floatingLabelText="Change Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <FlatButton id="passwordBtn" label="Submit" onClick={this.handlePasswordSubmit}/>
              <br />
              <TextField
                id="email"
                hintText="enter new email"
                floatingLabelText="Change Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <FlatButton id="emailBtn" label="Submit" onClick={this.handleEmailSubmit}/>
              <br />
              <FlatButton
                id="deleteAccount"
                label="Delete Account"
                secondary={true}
                style={{marginTop: '5%'}}
                onClick={this.handleDelete}
              />
            </div>
          </Tab>
          {/* ACCOUNT SETTINGS END */}

          <Tab label='Link Social Media'>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '50'}}>
          <Paper style={{width: 500}}>

          <div style={style.container}>

            <Card style={style.card}>
              <CardText>
                Select which Social Media platforms you would like to link to your account:
              </CardText>
              <CardActions>
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
          </div>
          </Paper>
          </div>
          </Tab>
        </Tabs>
        </Paper>
        </div>
      );
    else
      return(
        <Paper className={s.paperBlock}>

        </Paper>
      );
  };
};

//<h1>You Must Be Logged In to Access This Page!</h1>

export default connect(mapStateToProps, actionCreators)(Profile);
