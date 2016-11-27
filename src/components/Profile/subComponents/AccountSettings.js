import React from 'react';

/*  Material-ui Libs  */
import {Card, CardActions, CardHeader, 
        CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

/*  Component style   */
const style = {
  card: {
    width: '40%',
    margin: 'auto'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
  }
}

class AccountSettings extends React.Component {

  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }
  onDelete(e){
    alert("delete");
  }

  render() {
    return (
      <Card>

        <CardHeader 
          title="Account Settings"
          actAsExpander={true}
          showExpandableButton={true}
          titleColor="#00bcd4"
        />

        <CardText expandable={true}>
          Profile settings here
        </CardText>

        <CardActions expandable={true}>
          <div style={style.container}>

            <Card style={style.card}>
              <CardTitle title="Change Username"/>
              <CardText>Coming Soon!</CardText>
            </Card>
            <Card style={style.card}>
              <CardTitle title="Change Email"/>
              <CardText>Coming Soon!</CardText>
            </Card>
          </div><br />

          <div style={style.container}>
            <Card style={style.card}>
              <CardTitle title="Change Password"/>
              <CardText>Coming Soon!</CardText>
            </Card>
            <Card style={style.card}>
              <CardTitle title="Delete Account"/>
              <CardText>Permanently delete your Moonwalk account</CardText>
              <CardActions>
                <RaisedButton label="Delete" onClick={this.onDelete} primary={true}/>
              </CardActions>
            </Card>
          </div>
          
        </CardActions>

      </Card>
    );
  };
}

AccountSettings.propTypes = {

}


export default AccountSettings;