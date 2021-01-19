import React, { useState, useEffect } from 'react';

import Box from '@material-ui/core/Box';
import Carousel from 'react-bootstrap/Carousel'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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


function MyCarousel(props) {
    const [carouselIndex, setCarouselIndex] = useState(null);

    const handleSelect = (selectedIndex, e) => {
        setCarouselIndex(selectedIndex);
        localStorage.setItem('madinah-carousel-page', selectedIndex);
    };

    useEffect(() => {
        let savedPage = localStorage.getItem('madinah-carousel-page');
        if (savedPage) {
            setCarouselIndex(parseInt(savedPage))
        } else {
            setCarouselIndex(0)
        }
    }, []);

    const classes = useStyles();

    if (carouselIndex === null) {
        return <></>
    }

    return (
        <>
            <Carousel
                activeIndex={carouselIndex}
                onSelect={handleSelect}
                wrap={false}
                interval={null}>
                {
                    props.pages.map((Page, ind) => (
                        <Carousel.Item key={ind}>
                            <Box className={classes.carouselPage}>
                                <Page nextPage={() => setCarouselIndex(carouselIndex + 1)} />
                            </Box>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </>
    );
}

export default MyCarousel;