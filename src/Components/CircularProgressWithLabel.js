import React, { useState, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    circularProgress: {
        transform: 'scale(1)',
        // transition: '0.5s ease all',
        animation: props => props.animate ? 'pulse 1s forwards' : null
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

export default CircularProgressWithLabel;