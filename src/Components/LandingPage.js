import React, { useState, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
		width: 150,
		fontWeight: "bold",
		display: "inline",
	},
}));

function LandingPage(props) {
	const classes = useStyles();
	return (
		<>
			<Container maxWidth="md">
				<Typography variant="h4" component="h4">
					السلام عليكم ورحمة الله وبركاته
				</Typography>
				<Typography variant="h2" component="h2" gutterBottom>
					Track your progress with the{" "}
					<Typography variant="inherit" color="primary">
						Madinah Books
					</Typography>
					!
				</Typography>
				<Container maxWidth="sm">
					<Typography component="p" paragraph>
						A simple web app to help students of the arabic language stay
						motivated.
					</Typography>
					<Typography component="p" paragraph>
						A big thanks to Dr. V Abdur Rahim for authoring these amazing books
						and Asif Meherali for his gift in teaching them.
						<br />
					</Typography>
					<Typography component="p" paragraph>
						Some useful links:
						<br />
						<a
							href="https://www.amazon.co.uk/Arabic-Course-English-Speaking-Students-complete/dp/B004NIIV9C/ref=sr_1_9?dchild=1&keywords=madinah+books&qid=1610816209&sr=8-9"
							target="_blank"
							rel="noreferrer"
						>
							Amazon link to buy the books
						</a>
						<br />
						LQToronto Playlist{" "}
						<a
							href="https://www.youtube.com/c/LearnarabicInfo/playlists"
							target="_blank"
							rel="noreferrer"
						>
							YouTube
						</a>{" "}
						/{" "}
						<a
							href="http://www.lqtoronto.com/videodlmac.html"
							target="_blank"
							rel="noreferrer"
						>
							lqtoronto.com
						</a>
						<br />
						<a
							href="http://www.lqtoronto.com/forums/"
							target="_blank"
							rel="noreferrer"
						>
							LQToronto Forum
						</a>
					</Typography>
					<Button
						variant={"contained"}
						className={classes.button}
						onClick={() => setTimeout(props.nextPage, 500)}
					>
						Next
					</Button>
				</Container>
			</Container>
		</>
	);
}

export default LandingPage;
