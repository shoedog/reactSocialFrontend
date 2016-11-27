import React from 'react';

/*  Material-ui Libs  */
import {Card, CardActions, CardHeader, 
        CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

/*  Component style   */
const style = {
  card: {
    width: 'auto',
    margin: 'auto'
  },
}

class LinkSocialMedia extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { connectTwitter, removeTwitter } = this.props;
    return (
        <Card style={style.card}>
          <CardHeader 
            title="Link Social Media"
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
                    onClick={connectTwitter}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <RaisedButton 
                    label="Remove" 
                    icon = {<img style={{"height":"16px", "width":"16px"}} src="https://upload.wikimedia.org/wikipedia/en/9/9f/Twitter_bird_logo_2012.svg" />}
                    onClick={removeTwitter}
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
    );
  };
}

LinkSocialMedia.propTypes = {
  connectTwitter: React.PropTypes.func.isRequired,
  removeTwitter: React.PropTypes.func.isRequired,
}


export default LinkSocialMedia;