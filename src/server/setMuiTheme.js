import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

export default function setMuiTheme(userAgent) {
  return getMuiTheme({
    /*Paper: {
      align: 'center',
      textAlign: 'center',
      padding: '20px',
      margin: '100px'
    },*/

    userAgent: userAgent
  })
}
