// confetti
// ringing sound when updating
// animations (bitmoji?) when updating

// turn it into a platform where you can login and watch the madinah videos and save your progress
// allow users to leave comments

// domain name
// google analytics 

// modularise the code
// pulse/confetti animations
// alert when you finish
// save page state and selected book state and reload 
// reset each progress first === noppee
// colour books gold when finished === noppee
// share progress on social media - maybe
// add a login system  
// if youve already filled out the form then just reload the page youre on 
// deploy
// whats next page 
// notifications on updating chapter 
// light/dark mode
// mahas idea

import './App.css';

import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

import ProgressPage from './Components/ProgressPage';
import LandingPage from './Components/LandingPage';
import MyCarousel from './Components/MyCarousel';
import GitHubLink from './Components/GitHubLink';
import withTheme from './Components/HOC/withTheme';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  button: {
    margin: theme.spacing(1),
    width: 150,
    fontWeight: 'bold',
    display: 'inline'
  },
  h3: {
    fontWeight: 300
  },
  paragraph: {
    margin: theme.spacing(2)
  },
  circularProgress: {
    transform: 'scale(1)',
    // transition: '0.5s ease all',
    animation: props => props.animate ? 'pulse 1s forwards' : null
  },
  fixedBottomLeft: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: 40,
    margin: 20,
    transition: 'all 0.2s ease',
    zIndex: 999,
    cursor: 'pointer'
  },
  fixedBottomRight: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: 40,
    margin: 20,
    transition: 'all 0.2s ease',
    zIndex: 999,
    cursor: 'pointer'
  },
  carouselPage: {
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)'
  }
}));

function CircularProgressWithLabel(props) {

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => { setAnimate(false) }, 1000);
  }, [props.value])

  const classes = useStyles({ animate });

  return (
    <Box
      position="relative"
      display="inline-flex"
    >
      <CircularProgress
        size={300}
        thickness={2.4}
        variant="determinate"
        color={props.value < 100 ? "primary" : "secondary"}
        {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          className={classes.circularProgress}
          variant="h5"
          component="div"
          // color="textPrimary"
          color={props.value < 100 ? "primary" : "secondary"}
        >
          {`${Math.round(props.value,)}%`}
          <Typography variant="inherit" color="textPrimary"> COMPLETED</Typography>
        </Typography>
      </Box>
    </Box>
  );
}

const App = () => (
  <>
    <MyCarousel pages={[LandingPage, ProgressPage]} />
    <GitHubLink />
  </>
)

export default withTheme(App);
