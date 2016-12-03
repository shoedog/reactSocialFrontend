import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import {Tabs, Tab, TextField, RaisedButton, FlatButton, FontIcon} from 'material-ui';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import s from './NewUserSetup.css';

class NewUserSetup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0
    };
    this.onFinish = this.onFinish.bind(this);
    this.connectTwitter = this.connectTwitter.bind(this);
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >=2
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0){
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  onFinish(e){
    e.preventDefault();
    this.context.router.push("/profile");
  }

  connectTwitter() {
    //console.log(this.props.user.userId)
    window.location = `http://54.212.196.159:5000/social/connect/twitter?id=${this.props.user.userId}`
  }

  getStepContent(stepIndex) {
    switch(stepIndex){
      case 0:
        return "Let's get started setting up your profile! This walkthrough will get your profile set up!";
      case 1:
        return(
          <div className={s.buttonContainer}>
            <p>Moonwalk lets you interact with all your social media accounts in one place!
              Choose which Social Media platforms you'd like to link
            </p>
            <RaisedButton
                label="Connect"
                icon = {<img style={{"height":"16px", "width":"16px"}} src="https://upload.wikimedia.org/wikipedia/en/9/9f/Twitter_bird_logo_2012.svg" />}
                onClick={this.connectTwitter}
            /><br /><br />

            <RaisedButton
              label="Facebook"
              icon = {<img style={{"height":"16px", "width":"16px"}} src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg" />}
            /><br /><br />

            <RaisedButton
              label="Instagram"
              icon = {<img style={{"height":"16px", "width":"16px"}} src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" />}
            /><br />

          </div>
          );
      case 2:
        return(
          <div>"You're all done! Click Finish to begin connecting!"</div>
          );
      default:
        return;
    }
  }

  render() {
    const { finished, stepIndex } = this.state;

    return (
      <div>
        <Paper className={s.paperBlock}>
          <h1 className={s.title}>New User Setup</h1>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Getting Started </StepLabel>
            </Step>
            
            <Step>
              <StepLabel>Link Social Media</StepLabel>
            </Step>

            <Step>
              <StepLabel>Finish</StepLabel>
            </Step>
          </Stepper>

          <div>
              <div>
                {this.getStepContent(stepIndex)}
                <div>
                  <FlatButton
                    label="Back"
                    disabled={stepIndex==0}
                    onTouchTap={this.handlePrev}
                  />
                  <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    primary = {true}
                    onTouchTap={stepIndex === 2 ? this.onFinish : this.handleNext}
                  />
                </div>
              </div>
          </div>
        </Paper>
      </div>
    );
  }
}

NewUserSetup.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default NewUserSetup;