import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import {
  blueA200,
  blueGrey50,
  blueGrey600,
  blueGrey700,
  redA200,
  cyan500,
  cyan700,
  grey100,
  grey300,
  grey400,
  grey500,
  white,
  fullBlack
  } from 'material-ui/styles/colors';


export default function setMuiTheme(userAgent) {
  return getMuiTheme({
    fontFamily: 'Open Sans, sans-serif',
    palette: {
      primary1Color: '#59B4E8',
      primary2Color: cyan700,
      primary3Color: grey400,
      accent1Color: redA200,
      accent2Color: grey100,
      accent3Color: grey500,
      textColor: blueGrey600,
      alternateTextColor: white,
      canvasColor: white,
      borderColor: '#e7e7e7',
      pickerHeaderColor: cyan500,
      shadowColor: '#818181'
    },
    appBar: {
        color:  white,
        textColor: blueGrey600,
        height: 80,
        margin: 0
    },
    ListItem: {
        iconLeft: {paddingBottom : 20}
    },
    userAgent: userAgent
  })
}
