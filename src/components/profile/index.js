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
  }

  render() {
    const { user } = this.props;
    console.log(user);
    return(
      <div style={style.container}>
        <Card style={style.card}>
          <CardTitle title={user.displayName} subtitle="Card subtitle" />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>
      </div>
    );
  };
};

export default connect(mapStateToProps, actionCreators)(CardExampleWithAvatar);
