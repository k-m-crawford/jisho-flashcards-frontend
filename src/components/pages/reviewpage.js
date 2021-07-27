/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Grid, Button } from "@material-ui/core"
import { useParams, Link } from "react-router-dom"
import ReviewCard from "../cards/reviewcard"

const ReviewPage = () => {

    return (
        <>
            <Grid container>
                <Grid item sx={{mt: 4, mb: 1}} xs={12}>
                    <ReviewCard reviewType={useParams().type}/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item sx={{my: 2}} xs={12} style={{textAlign: "center"}}>
                    <Button component={Link} to="/" variant="outlined" >Go Back</Button>
                </Grid>
            </Grid>
        </>
    )

}

export default ReviewPage