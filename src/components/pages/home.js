/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Header from "../header"
import ToReview from "./toreview"
import SearchBar from "../searchbar/searchbar"

const Home = () => (
    <>
        <Header />
        <Grid container spacing={2} px={5} my={2} sx={{justifyContent: "center"}}>
            <ToReview reviewType="kanji" color={process.env.REACT_APP_KANJI_COLOUR}/>
            <ToReview reviewType="word" color={process.env.REACT_APP_WORD_COLOUR}  />
            <ToReview reviewType="all" color={process.env.REACT_APP_ALL_COLOUR} />
        </Grid>
        <Grid container spacing={2} px={5} my={2} sx={{justifyContent: "center"}}>
            <Grid item mb={3} xs={12} lg={12}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="search-panel"
                        id="search-panel" >
                        <Typography>Search for Review Cards.</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SearchBar />
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    </>
)

export default Home