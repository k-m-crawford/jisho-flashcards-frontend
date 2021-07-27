/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Grid, CircularProgress, Card, CardHeader, CardContent, Button, Typography } from "@material-ui/core"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ToReview = ({reviewType, color}) => {

    const [ count, setCount ] = useState(null)
    const { user } = useAuth0()

    useEffect(() =>{
        const main = async () => {

            const res = await axios.get(process.env.REACT_APP_API_URL+"users/getReviews/all/" + reviewType + "/" + user["https://jisho-flashcards.namespace.com/username"])           
            if(res.status === 200){

                const all = reviewType === "all" ? res.data.reviews : res.data

                let toReview = 0
                all.forEach(review => {
                    const now = new Date()
                    const reviewTime = new Date(review.nextReview)

                    if(reviewTime < now)
                        toReview += 1
                })

                setCount(toReview)
            }
        }

        main()

    })

    return (

        <Grid item xs={12} md={4}>
            <Card elevation={4} sx={{textAlign: "center"}}>
                <CardHeader title={reviewType.toUpperCase()} />

                <CardContent sx={{ backgroundColor: color }}>
                    { count === null && (
                        <CircularProgress />
                    )}
                    { count !== null && (
                        <>
                            <Typography color="white" variant="h2">{count}</Typography>
                            { count !== 0 && (
                                <Button component={Link}
                                    to={`/review/${reviewType}`} 
                                    variant="outlined" 
                                    sx={{width: "100%", color: "white", borderColor: "white"}}>
                                            Review!
                                </Button>
                            )}
                            { count === 0 && (
                                <Button variant="outlined" 
                                    color="default" 
                                    style={{width: "100%"}}>
                                        Done!
                                </Button>
                            )}
                        </>
                    )}

                </CardContent>
                <CardContent><span className="footer-text">next reviews in </span></CardContent>
            </Card>
        </Grid>

    )

}

export default ToReview