// modularise the code
// pulse animation
// save page state and selected book state and reload 
// reset each progress first === noppee
// colour books gold when finished === noppee
// share progress on social media - maybe
// add a login system LOL 
// if youve already filled out the form then just reload the page youre on 


import './App.css';

import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
// import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
// import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';
import Container from '@material-ui/core/Container';

import amber from '@material-ui/core/colors/amber';
import lightBlue from '@material-ui/core/colors/lightBlue';
import purple from '@material-ui/core/colors/purple';

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

// function CompletionForm({ label, options, value, onChange }) {
//   const classes = useStyles();

//   return (
//     <FormControl variant="outlined" className={classes.formControl}>
//       <InputLabel>{label}</InputLabel>
//       <Select
//         native
//         value={value}
//         onChange={onChange}
//         label={label}
//       >
//         {
//           options.map(option => (
//             <option value={option} key={option}>{option}</option>
//           ))
//         }
//       </Select>
//     </FormControl >
//   );
// }

function App() {

  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setCarouselIndex(selectedIndex);
  };

  const allBooks = [1, 2, 3];
  const [selectedBook, setSelectedBook] = useState(allBooks[0]);

  // const allResources = ['LQToronto Website', 'YouTube Playlist', 'Book Chapters']
  // const [selectedResource, setSelectedResource] = useState(allResources[0]);

  const [progress, setProgress] = useState(0);

  // const [dvds, setDvds] = useState([]);
  // const [dvdVal, setDvdVal] = useState(0);
  // const [parts, setParts] = useState([]);
  // const [partsVal, setPartsVal] = useState('');

  // const [restoringProgress, setRestoringProgress] = useState(false);

  // const [videoCount, setVideoCount] = useState(0);
  // const [currentVideoNo, setCurrentVideoNo] = useState(0)

  const [totalChapters, setTotalChapters] = useState(0);
  const [completedChapters, setCompletedChapters] = useState(null);

  const madinahBooks = require('./madinah_books.json');

  useEffect(() => {
    let totalChapters = madinahBooks.find(book => book.book === selectedBook).chapters;
    console.log('setting total chapters for book', totalChapters, 'selected book', selectedBook)
    setTotalChapters(totalChapters);

    let savedProgress = JSON.parse(localStorage.getItem(`MB${selectedBook}-progress`));
    if (savedProgress) {
      // setRestoringProgress(true);
      const savedChapter = parseInt(savedProgress);
      setCompletedChapters(savedChapter);
    } else {
      // setCompletedChapters(0);
    }
  }, [selectedBook]);

  useEffect(() => {
    if (completedChapters === null) {
      return;
    }
    updateProgress();
  }, [completedChapters])

  const updateProgress = () => {
    let progress;
    if (!completedChapters) {
      progress = 0;
    } else {
      progress = Math.floor(100 * completedChapters / totalChapters);
    }
    setProgress(progress);
    console.log('saving progress', completedChapters)
    localStorage.setItem(`MB${selectedBook}-progress`, JSON.stringify(completedChapters))
  }

  const handleCompletedChaptersChange = event => {
    const completedChapters = parseInt(event.target.value);
    setCompletedChapters(completedChapters);
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

  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <Carousel
        activeIndex={carouselIndex}
        onSelect={handleSelect}
        wrap={false}
        interval={null}>
        <Carousel.Item>
          <div className="App">
            <div>
              السلام عليكم ورحمة الله وبركاته
              <Typography variant="h2" component="h2" gutterBottom>
                Track your progress with the <span style={{ color: lightBlue[500] }}>Madinah Books</span>!
              </Typography>
              <Container maxWidth="sm">
                <Typography variant="body1" component="p">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, tempora blanditiis voluptates nam doloribus at illum adipisci culpa, dignissimos nobis magnam, quasi dolores error cupiditate! Mollitia dolores illo velit molestiae.
              </Typography>
                {/* <Button
                  variant='outlined'
                  className={classes.button}
                  onClick={() => {
                    // setTimeout(() => setCarouselIndex(carouselIndex + 1), 500);
                    // setCarouselIndex(carouselIndex + 1)
                    // document.activeElement.blur()
                  }}
                >Get Started</Button> */}
              </Container>
            </div>
          </div>
        </Carousel.Item>
        {/* <Carousel.Item>
          <div className="App">
            <div style={{}}>
              <Typography variant="h3" component="h3" className={classes.h3} gutterBottom>
                Which book are you on?
              </Typography>
              {allBooks.map(bookNo => (
                <Button
                  key={bookNo}
                  variant={selectedBook === bookNo ? 'contained' : 'outlined'}
                  className={classes.button}
                  onClick={() => {
                    setSelectedBook(bookNo);
                    // setTimeout(() => setCarouselIndex(carouselIndex + 1), 500);
                    // setCarouselIndex(carouselIndex + 1)
                    // document.activeElement.blur()
                  }}
                >Book {bookNo}</Button>))
              }
            </div>
          </div>
        </Carousel.Item> */}
        <Carousel.Item>
          <div className="App">
            <div style={{}}>
              {allBooks.map(bookNo => (
                <Button
                  key={bookNo}
                  variant={selectedBook === bookNo ? 'contained' : 'outlined'}
                  className={classes.button}
                  onClick={() => {
                    setSelectedBook(bookNo);
                    // setTimeout(() => setCarouselIndex(carouselIndex + 1), 500);
                    // setCarouselIndex(carouselIndex + 1)
                    // document.activeElement.blur()
                  }}
                >Book {bookNo}</Button>))
              }
            </div>
            <header className="App-header">
              <div>دروس اللغة العربية</div>
              <Typography variant="h2" component="h2" gutterBottom>
                Madinah Book <span style={{ color: progress < 100 ? lightBlue[500] : amber[500] }}>{selectedBook}</span>
              </Typography>
            </header>
            <main>
              <div style={{ margin: 30 }}>
                <CircularProgressWithLabel value={progress} />
              </div>
              <div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Completed Chapter</InputLabel>
                  <Select
                    native
                    value={completedChapters}
                    onChange={handleCompletedChaptersChange}
                    label={'Completed Chapter'}
                  >
                    {
                      [
                        <option></option>,
                        ...Array.from({ length: totalChapters }, (_, i) => i + 1).map(num => (
                          <option value={num} key={num}>{num}</option>
                        ))
                      ]
                    }
                  </Select>
                </FormControl >
              </div>
            </main>
          </div>
        </Carousel.Item>
      </Carousel>
      <footer>
        {/* <Button variant="contained" color="primary">Learn More</Button> */}
        <a
          href="https://github.com/AhmedAGadir"
          target="_blank">
          <img src="https://res.cloudinary.com/ahmedagadir/image/upload/v1530726623/product-landing-page/github-sign.svg" alt="link to my github" title="Check out my github" />
        </a>
      </footer>
    </ThemeProvider >
  );
}

export default App;
