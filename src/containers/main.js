import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from '../components/NavBar';


function Root({children}) {

    return (
      <MuiThemeProvider>
        <div>
          <NavBar />
          {children}
        </div>
      </MuiThemeProvider>
    );

  }

export default Root;
