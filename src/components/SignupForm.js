import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import UserIcon from 'material-ui/svg-icons/action/account-circle';
import { browserHistory } from 'react-router'


const styles = {
    container: {
      padding: '5%',
      display: 'table',
      margin: '0 auto'
    },
}

class SignupCard extends React.Component {
  constructor(props){
    super(props);
  }


  render(){
    return (
      <div style={styles.container}>

        <Card style={{minWidth: 200, maxWidth: 400, paddingBottom: 36}}>

          <CardHeader
            title="Create Account"
            subtitle="Join us!"
          />
          <CardMedia style={{backgroundColor: '#ECEFF1', height: 60}}>
            <UserIcon style={{height: '60'}}/>
          </CardMedia>

          <div style={{display: 'block', margin: 'auto', width: '70%'}}>

            <TextField fullWidth={true}
              inputStyle={{maxHeight: 50}}
              ref="username"
              floatingLabelText='username'
            />


            <TextField fullWidth={true}
              inputStyle={{maxHeight: 50}}
              ref="password"
              floatingLabelText="password"
              type="password"/>

            <br />
          </div>

          <CardActions style={{paddingLeft: 60, paddingRight: 60}}>
            <RaisedButton label="Submit" fullWidth={true} primary/>
          </CardActions>

        </Card>

        <br />
      </div>
    );
  }
}


module.exports = SignupCard;
