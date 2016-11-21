import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/user';


const style = {
  card: {
    width: 450,
    margin: 80
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

class CardExampleWithAvatar extends Component {
  constructor(props) {
    super(props);
    this.connectTwitter = this.connectTwitter.bind(this);
    this.removeTwitter = this.removeTwitter.bind(this);
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

  render() {
    const { user } = this.props;
    return(
      <div style={style.container}>
        <Card style={style.card}>
          <CardTitle title={user.displayName} />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions>
            <FlatButton label="Connect Twitter" onClick={this.connectTwitter}/>
            <FlatButton label="Remove Twitter" onClick={this.removeTwitter}/>
          </CardActions>
        </Card>
      </div>
    );
  };
};

export default connect(mapStateToProps, actionCreators)(CardExampleWithAvatar);
