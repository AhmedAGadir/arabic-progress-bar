import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
}));

const GitHubLink = () => {
    const classes = useStyles();
    return (
        <a
            href="https://github.com/AhmedAGadir/arabic-progress-bar"
            target="_blank">
            <img
                className={classes.fixedBottomRight}
                src="https://res.cloudinary.com/ahmedagadir/image/upload/v1530726623/product-landing-page/github-sign.svg"
                alt="GitHub repository"
                title="GitHub repository" />
        </a>
    )
}

export default GitHubLink