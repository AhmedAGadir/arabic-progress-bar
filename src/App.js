import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import amber from '@material-ui/core/colors/amber';
import lightBlue from '@material-ui/core/colors/lightBlue';
import purple from '@material-ui/core/colors/purple';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    // color: 'white'
  },
  // selectEmpty: {
  //   marginTop: theme.spacing(2),
  // },
  // progressing: {
  //   color: lightBlue[500],
  // },
  // progressingContrast: {
  //   color: lightBlue[300]
  // },
  // completed: {
  //   color: amber[500]
  // }
}));

function CircularProgressWithLabel(props) {
  const size = 300;
  // const classes = useStyles();

  // const innerTheme = createMuiTheme({
  //   palette: {
  //     primary: {
  //       main: props.value < 100 ? lightBlue[500] : amber[500],
  //     },
  //   },
  // });


  return (
    // <ThemeProvider theme={innerTheme}>
    <Box
      position="relative"
      display="inline-flex"
    // className={classes.progress}
    // style={{ width: size, height: size }}
    >
      <CircularProgress
        style={{ width: size, height: size }}
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
          variant="h5"
          component="div"
          // color="textPrimary"
          color={props.value < 100 ? "primary" : "secondary"}
        >
          {`${Math.round(props.value,)}%`}
          <span
            style={{
              color: 'white'
              // color: lightBlue[300]
              // color: props.value < 100 ? lightBlue[300] : 'white'
            }}
          > COMPLETED</span></Typography>
      </Box>
    </Box>
    // </ThemeProvider >
  );
}

function CompletionForm({ label, options, value, onChange }) {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        native
        value={value}
        onChange={onChange}
        label={label}
      >
        {
          options.map(option => {
            return (
              <option value={option} key={option}>{option}</option>
            )
          })
        }
      </Select>
    </FormControl >
  );
}

function App() {
  const [progress, setProgress] = useState(0);

  const [dvds, setDvds] = useState([]);
  const [dvdVal, setDvdVal] = useState(0);
  const [parts, setParts] = useState([]);
  const [partsVal, setPartsVal] = useState('');

  const [restoringProgress, setRestoringProgress] = useState(false);

  useEffect(() => {
    let dvds = courseData.map(dvd => dvd.dvd);
    setDvds(dvds);

    let savedProgress = JSON.parse(localStorage.getItem('MB3-progress'));
    if (savedProgress) {
      setRestoringProgress(true);
      const savedDvd = savedProgress[0];
      setDvdVal(savedDvd);
    } else {
      setDvdVal(1);
    }
  }, []);

  useEffect(() => {
    if (dvdVal) {
      let parts = courseData.find(dvd => dvd.dvd === dvdVal).parts;
      setParts(parts);
    }
  }, [dvdVal]);

  useEffect(() => {
    if (parts.length === 0) {
      return;
    }
    if (restoringProgress) {
      let savedPart = JSON.parse(localStorage.getItem('MB3-progress'))[1];
      setPartsVal(savedPart);
      setRestoringProgress(false);
    } else {
      setPartsVal(parts[0]);
    }
    updateProgress();
  }, [parts]);

  useEffect(() => {
    if (!partsVal) {
      return;
    }
    updateProgress();
  }, [partsVal]);

  const updateProgress = () => {
    let watchedVideosCount = 0;
    let totalVideosCount = 0;
    courseData.forEach(dvd => {
      if (dvdVal > dvd.dvd) {
        watchedVideosCount += dvd.parts.length;
      } else if (dvdVal === dvd.dvd) {
        let watchedParts = 1 + dvd.parts.findIndex(part => partsVal === part);
        watchedVideosCount += watchedParts;
      }
      totalVideosCount += dvd.parts.length;
    });
    let progress = Math.floor(100 * watchedVideosCount / totalVideosCount)
    setProgress(progress);
    console.log('saving progress', [dvdVal, partsVal])
    localStorage.setItem('MB3-progress', JSON.stringify([dvdVal, partsVal]))
  }

  const courseData = require('./madinah_book_3.json');

  const handleDVDChange = event => {
    const selectedDVD = parseInt(event.target.value);
    setDvdVal(selectedDVD);
  }

  const handlePartsChange = event => {
    setPartsVal(event.target.value);
  }

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        // light: lightBlue[200],
        main: lightBlue[500],
        // main: purple[500]
      },
      secondary: {
        // light: 'white',
        main: amber[500]
      }
    },
  });


  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <header className="App-header">
          <Typography variant="h2" component="h2" gutterBottom>
            Madinah Book <span style={{ color: progress < 100 ? lightBlue[500] : amber[500] }}>3</span>
          </Typography>
        </header>
        <main>
          <div style={{ margin: 30 }}>
            <CircularProgressWithLabel value={progress} />
          </div>
          <div>
            <CompletionForm
              label="DVD"
              options={dvds}
              value={dvdVal}
              onChange={handleDVDChange}
            />
            <CompletionForm
              label="Part"
              options={parts}
              value={partsVal}
              onChange={handlePartsChange}
            />
          </div>
        </main>
      </div>
    </ThemeProvider >
  );
}

export default App;
