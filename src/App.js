// modularise the code
// pulse/confetti animations
// alert when you finish
// save page state and selected book state and reload 
// reset each progress first === noppee
// colour books gold when finished === noppee
// share progress on social media - maybe
// add a login system LOL 
// if youve already filled out the form then just reload the page youre on 
// deploy

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

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
    // color: 'white'
  },
  button: {
    margin: theme.spacing(1),
    // minWidth: 120,
    width: 150,
    fontWeight: 'bold',
    display: 'inline'
  },
  h3: {
    fontWeight: 300
  },
  paragraph: {
    margin: theme.spacing(2)
  }
}));

function CircularProgressWithLabel(props) {
  const size = 300;

  return (
    <Box
      position="relative"
      display="inline-flex"
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
            }}
          > COMPLETED</span></Typography>
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
        <Typography variant="h2" component="h2">
          Track your progress with the <span style={{ color: lightBlue[500] }}>Madinah Books</span>!
        </Typography>
        <Container maxWidth="sm">
          <Typography variant="body1" component="p" className={classes.paragraph}>
            A simple web app to help students of the arabic language stay motivated🙏🏾 .
                </Typography>
          <Typography variant="body1" component="p" className={classes.paragraph}>
            May Allah preserve both Shaykh Dr. V Abdur Rahim for authoring these amazing books and Shaykh Asif Meherali for his gift in teaching these books.<br />
          </Typography>
          <Typography variant="body1" component="p" className={classes.paragraph}>
            Some useful links:<br />
            <a href="https://www.amazon.co.uk/Arabic-Course-English-Speaking-Students-complete/dp/B004NIIV9C/ref=sr_1_9?dchild=1&keywords=madinah+books&qid=1610816209&sr=8-9" target="_blank" rel="noreferrer">Amazon link to buy the books</a><br />
            <a href="http://www.lqtoronto.com/videodlmac.html" target="_blank" rel="noreferrer">LQToronto Playlist (lqtoronto.com)</a><br />
            <a href="https://www.youtube.com/c/LearnarabicInfo/playlists" target="_blank" rel="noreferrer">LQToronto Playlist (Youtube)</a>
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
          Madinah Book <span style={{ color: progress < 100 ? lightBlue[500] : amber[500] }}>{selectedBook}</span>
        </Typography>
      </Box>
      <Box marginBottom={4}>
        <CircularProgressWithLabel value={progress} />
      </Box>
      <Box>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Completed Chapter</InputLabel>
          <Select
            native
            value={completedChapters}
            onChange={handleCompletedChaptersChange}
            label={'Completed Chapter'}>
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

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: lightBlue[500],
      },
      secondary: {
        main: amber[500]
      }
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
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
      <a
        href="https://github.com/AhmedAGadir/arabic-progress-bar"
        target="_blank">
        <img
          src="https://res.cloudinary.com/ahmedagadir/image/upload/v1530726623/product-landing-page/github-sign.svg"
          alt="GitHub repository"
          title="GitHub repository" />
      </a>
    </ThemeProvider >
  );
}

export default App;
