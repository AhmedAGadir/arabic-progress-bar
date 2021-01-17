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

import amber from '@material-ui/core/colors/amber';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';
import deepPurple from '@material-ui/core/colors/deepPurple';
import blueGrey from '@material-ui/core/colors/blueGrey';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';

import Brightness1Icon from '@material-ui/icons/Brightness1';
import Brightness2Icon from '@material-ui/icons/Brightness2';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';


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
    // left: '50%',
    // marginBottom: 200,
    // transform: 'translateX(-50%)',
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
  }
}));

function CircularProgressWithLabel(props) {

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => { setAnimate(false) }, 1200);
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

function LandingPage(props) {
  const classes = useStyles();
  return (
    <div className="app-page">
      <Container maxWidth="md">
        <div>السلام عليكم ورحمة الله وبركاته</div>
        <Typography variant="h2" component="h2" gutterBottom>
          Track your progress with the <Typography variant="inherit" color="primary">Madinah Books</Typography>!
        </Typography>
        <Container maxWidth="sm">
          <Typography variant="body1" component="p" paragraph>
            A simple web app to help students of the arabic language stay motivated🙏🏾 .
                </Typography>
          <Typography variant="body1" component="p" paragraph>
            May Allah preserve both Shaykh Dr. V Abdur Rahim for authoring these amazing books and Shaykh Asif Meherali for his gift in teaching these books.<br />
          </Typography>
          <Typography variant="body1" component="p" paragraph>
            Some useful links:<br />
            <a href="https://www.amazon.co.uk/Arabic-Course-English-Speaking-Students-complete/dp/B004NIIV9C/ref=sr_1_9?dchild=1&keywords=madinah+books&qid=1610816209&sr=8-9" target="_blank" rel="noreferrer">Amazon link to buy the books</a><br />
            LQToronto Playlist <a href="https://www.youtube.com/c/LearnarabicInfo/playlists" target="_blank" rel="noreferrer">YouTube</a> / <a href="http://www.lqtoronto.com/videodlmac.html" target="_blank" rel="noreferrer">lqtoronto.com</a><br />
            <a href="http://www.lqtoronto.com/forums/" target="_blank" rel="noreferrer">LQToronto Forum</a>
          </Typography>
          <Button
            variant={'contained'}
            className={classes.button}
            onClick={() => setTimeout(props.nextPage, 500)}
          >Next</Button>
        </Container>
      </Container>
    </div>
  )
}

function ProgressPage() {
  const allBooks = [1, 2, 3];
  const [selectedBook, setSelectedBook] = useState(allBooks[0]);

  const [progress, setProgress] = useState(0);

  const [totalChapters, setTotalChapters] = useState(0);
  const [completedChapters, setCompletedChapters] = useState('');

  const madinahBooks = require('./madinah_books.json');

  useEffect(() => {
    let totalChapters = madinahBooks.find(book => book.book === selectedBook).chapters;
    setTotalChapters(totalChapters);

    let savedProgress = JSON.parse(localStorage.getItem(`MB${selectedBook}-progress`));
    if (savedProgress) {
      const savedChapter = parseInt(savedProgress);
      setCompletedChapters(savedChapter);
      if (savedChapter === completedChapters) {
        updateProgress();
      }
    } else {
      setCompletedChapters(0);
    }
  }, [selectedBook]);

  useEffect(() => {
    if (completedChapters === '') {
      return;
    }
    updateProgress();
  }, [completedChapters])

  const updateProgress = () => {
    let totalChapters = madinahBooks.find(book => book.book === selectedBook).chapters;
    setTotalChapters(totalChapters);

    let progress;
    if (!completedChapters) {
      progress = 0;
    } else {
      progress = Math.floor(100 * completedChapters / totalChapters);
    }
    setProgress(progress);
    localStorage.setItem(`MB${selectedBook}-progress`, JSON.stringify(completedChapters))
  }

  const handleCompletedChaptersChange = event => {
    const completedChapters = parseInt(event.target.value);
    setCompletedChapters(completedChapters);
  }
  const classes = useStyles();

  return (
    <div className="app-page">
      <Box>
        {allBooks.map(bookNo => (
          <Button
            key={bookNo}
            variant={selectedBook === bookNo ? 'contained' : 'outlined'}
            className={classes.button}
            onClick={() => setSelectedBook(bookNo)}
          >Book {bookNo}</Button>))
        }
      </Box>
      <Box margin={2}>
        دروس اللغة العربية
        <Typography variant="h2" component="h2" gutterBottom>
          Madinah Book <Typography variant="inherit" color={progress < 100 ? 'primary' : 'secondary'}>{selectedBook}</Typography>
        </Typography>
      </Box>
      <Box marginBottom={4}>
        <CircularProgressWithLabel value={progress} />
      </Box>
      <Box>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Chapter</InputLabel>
          <Select
            native
            value={completedChapters}
            onChange={handleCompletedChaptersChange}
            label={'Chapter'}>
            {
              [<option value="" key=""></option>,
              ...Array.from({ length: totalChapters }, (_, i) => i + 1).map(num => (
                <option value={num} key={num}>{num}</option>
              ))]
            }
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

function App() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setCarouselIndex(selectedIndex);
  };

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    selectTheme(prefersDarkMode ? darkTheme : lightTheme)
  }, []);

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: lightBlue[500],
      },
      secondary: {
        main: amber[500]
      },
      background: {
        default: '#282c34'
      }
    },
  });

  const lightTheme = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: deepPurple['A400'],
      },
      secondary: {
        main: amber['A400']
      },
      background: {
        // default: 'ghostwhite'
      },
      text: {
        // primary: '#282c34'
        primary: deepPurple[900]
      }
    },
  });

  const [theme, selectTheme] = useState(lightTheme);

  const toggleTheme = () => {
    let newTheme = theme.palette.type === 'dark' ? lightTheme : darkTheme;
    selectTheme(newTheme);
  }

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Carousel
        activeIndex={carouselIndex}
        onSelect={handleSelect}
        wrap={false}
        interval={null}>
        <Carousel.Item>
          <LandingPage nextPage={() => setCarouselIndex(carouselIndex + 1)} />
        </Carousel.Item>
        <Carousel.Item>
          <ProgressPage />
        </Carousel.Item>
      </Carousel>
      <footer>
        <Box className={classes.fixedBottomLeft} onClick={toggleTheme}>
          {theme.palette.type === 'dark' ? <Brightness1Icon fontSize="large" /> : <Brightness2Icon fontSize="large" />}
        </Box>
        <Box className={classes.fixedBottomRight}>
          <a
            href="https://github.com/AhmedAGadir/arabic-progress-bar"
            target="_blank">
            <img
              src="https://res.cloudinary.com/ahmedagadir/image/upload/v1530726623/product-landing-page/github-sign.svg"
              alt="GitHub repository"
              title="GitHub repository" />
          </a>
        </Box>
      </footer>
    </ThemeProvider >
  );
}

export default App;
