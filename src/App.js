//make percentage correspond to pages in the book ?

// confetti
// ringing sound when updating
// animations (bitmoji?) when updating

// turn it into a platform where you can login and watch the madinah videos and save your progress
// allow users to leave comments

// domain name
// google analytics 

// create different services/higher order functions
// that provide progress percentage e.g one for chapters, one for lq toronto videos, one for youtube
// ^^ strategy pattern 

// localstorage for selected theme state and selected book state 

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

import ProgressPage from './Components/ProgressPage';
import LandingPage from './Components/LandingPage';
import MyCarousel from './Components/MyCarousel';
import GitHubLink from './Components/GitHubLink';
import withTheme from './Components/HOC/withTheme';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <>
    <MyCarousel pages={[LandingPage, ProgressPage]} />
    <GitHubLink />
  </>
)

export default withTheme(App);
