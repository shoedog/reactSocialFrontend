import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from '../components/NavBar';


class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider>
        <NavBar />
      </MuiThemeProvider>
    );
  }
}
export default App;
