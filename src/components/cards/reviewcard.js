/* eslint-disable no-unexpected-multiline */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Card, CardHeader, CardContent, CircularProgress, Collapse, Button, Typography, Grid, Paper } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import WordCardBody from "./card-bodies/word-card-body"
import KanjiCardBody from "./card-bodies/kanji-card-body"
import axios from "axios"
import { Redirect } from "react-router-dom"

const ReviewCard = ({reviewType}) => {

    const [ cardData, setCardData ] = useState(null)
    const [ dbTypePath, setDbTypePath ] = useState(null)
    const [ bgColor, setBgColor ] = useState("white")
    const [ bodyExpanded, setBodyExpanded ] = useState(false)
    const [ successReviewTime, setSuccessReviewTime ] = useState(null)
    const [ failureReviewTime, setFailureReviewTime ] = useState(null)
    const [ level, setLevel ] = useState(null)
    const [ bankRef, setBankRef ] = useState(null)
    const { user } = useAuth0()

    const updateReview = async (passedLevel) => {

        const newLevel = passedLevel <= 0 ? 1 : passedLevel

        console.log(newLevel) 

        await axios.put(process.env.REACT_APP_API_URL+"users/updateReview/"+dbTypePath+"/"+user["https://jisho-flashcards.namespace.com/username"], 
            {  
                ref: bankRef,
                newLevel
            })

        
        window.location.reload()

    }

    useEffect(() => {

        const main = async () => {

            const selectedReview = await axios.get(process.env.REACT_APP_API_URL+"users/getReviews/due/one/"+reviewType+"/"+user["https://jisho-flashcards.namespace.com/username"])
            setLevel(selectedReview.data.level)
            console.log(selectedReview)

            switch(selectedReview.data.level) {
            case 1:
                setSuccessReviewTime("8 hours")
                setFailureReviewTime("4 hours")
                break
            case 2:
                setSuccessReviewTime("1 day")
                setFailureReviewTime("8 hours")
                break
            case 3:
                setSuccessReviewTime("2 days")
                setFailureReviewTime("1 day")
                break
            case 4:
                setSuccessReviewTime("1 week")
                setFailureReviewTime("2 days")
                break
            case 5:
                setSuccessReviewTime("2 weeks")
                setFailureReviewTime("1 week")
                break
            case 6:
                setSuccessReviewTime("1 month")
                setFailureReviewTime("2 weeks")
                break
            case 7:
                setSuccessReviewTime("4 months")
                setFailureReviewTime("1 month")
                break
            case 8:
                setSuccessReviewTime("completed")
                setFailureReviewTime("4 months")

            }


            const dbPath = selectedReview.data.kanji ? "kanji" : "word"
            setDbTypePath(dbPath)
            const _bankRef = dbPath === "word" ? selectedReview.data.wordSlug : selectedReview.data.kanji
            setBankRef(_bankRef)
            console.log(bankRef)
            const pulledData = await axios.get(process.env.REACT_APP_API_URL+"db/"+dbPath+"/"+_bankRef)

            if(pulledData.data)
                setCardData(pulledData.data)
            else
                setCardData("redirect")
            console.log(pulledData)

            if(dbPath === "kanji")
                setBgColor(process.env.REACT_APP_KANJI_COLOUR)
            else if(dbPath === "word")
                setBgColor(process.env.REACT_APP_WORD_COLOUR)


        }

        main()

    }, [])

    return (
        <Card elevation={18}>
            { cardData === "redirect" && (
                <Redirect to="/" />
            )}
            { cardData && (
                <>
                    <CardHeader sx={{ textAlign: "center", backgroundColor: bgColor, color: "white", pt: 7 }} 
                        title={ 
                            <Typography sx={{color:"white"}} variant="h1">
                                {cardData.kanji && cardData.kanji}
                                {cardData.wordSlug && cardData.data.japanese[0].word }
                            </Typography>
                        }
                        subheader={
                            (
                                <>
                                    <Collapse sx={{mb: 10}} in={bodyExpanded}> 
                                        <Typography sx={{color:"white"}} variant="subtitle1">
                                            { cardData.kanji &&  cardData.data.meaning}
                                            { cardData.wordSlug && cardData.data.japanese[0].reading }  
                                        </Typography>
                                    </Collapse>
                                    <Button 
                                        style={{width:"100%"}} 
                                        variant="contained"
                                        color="default"
                                        onClick={()=> setBodyExpanded(!bodyExpanded) }>
                                    Reveal
                                    </Button>
                                </>
                            )
                        }/>
                    
                    <Collapse in={bodyExpanded}> 
                        <CardContent>
                            <Paper elevation={4}>
                                { cardData.kanji && ( <KanjiCardBody data={cardData.data} /> ) }
                                { cardData.wordSlug && ( <WordCardBody data={cardData.data} /> ) } 
                            </Paper>
                            
                            <Grid container spacing={2} sx={{justifyContent: "center", mt: 1}}>
                                <Grid item>
                                    <Button onClick={() => updateReview(level + 1)} variant="contained" >Correct</Button>
                                </Grid>
                                <Grid item>    
                                    <Button onClick={() => updateReview(level - 1)} variant="contained" color="secondary" >Incorrect</Button>
                                </Grid>
                                <Grid item xs={12} sx={{textAlign:"center"}}>
                                    <Paper variant="outlined">
                                        <Typography variant="subtitle2">
                                            successful review in {successReviewTime}
                                            <br />incorrect review in {failureReviewTime}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Collapse>
                    {/* <CardHeader style={{ textAlign: "center", backgroundColor: bgColor }} >
                        <h1 className="mt-3 py-3" style={{ color:"white" }}>
                            { cardData.kanji && cardData.kanji }
                            { cardData.wordSlug && cardData.wordSlug }
                        </h1>
                        { !bodyExpanded && (<br/>)}
                        { cardData.wordSlug && (
                            <Collapse in={bodyExpanded}> 
                                <h6 className="mb-4" style={{ color:"white" }}>{cardData.data.japanese[0].reading}</h6>
                            </Collapse>
                        )}
                        { cardData.kanji && (
                            <Collapse in={bodyExpanded}> 
                                <h6 className="mb-4" style={{ color:"white" }}>{cardData.data.meaning}</h6>
                            </Collapse>
                        )}
                        <Button 
                            style={{width:"100%"}} 
                            className="m-0" 
                            variant="outline-light"
                            aria-controls="card-body-collapse"
                            aria-expanded={bodyExpanded}
                            onClick={()=> setBodyExpanded(!bodyExpanded) }>
                                Reveal
                        </Button>
                    </Card.Header>
                    
                    <Collapse in={bodyExpanded}>
                        <div id="card-body-collapse">
                            { cardData.kanji && ( <KanjiCardBody data={cardData.data} /> ) }
                            { cardData.wordSlug && ( <WordCardBody data={cardData.data} /> ) }
                            <Card.Body style={{textAlign: "center"}}>
                                <Button onClick={() => updateReview(level + 1)} className="mx-1" variant="jisho-green">Correct</Button>
                                <Button onClick={() => updateReview(level - 1)} className="mx-1" variant="jisho-gray">Incorrect</Button>
                            </Card.Body>
                
                            <Card.Footer style={{textAlign: "center"}}>
                                <small className="text-muted mx-1">
                                    successful review in <Badge className="jisho-green">{successReviewTime}</Badge>
                                </small>
                            </Card.Footer>
                            <Card.Footer style={{textAlign: "center"}}>
                                <small className="text-muted mx-1">
                                    incorrect review in <Badge className="jisho-gray">{failureReviewTime}</Badge>
                                </small>
                            </Card.Footer>
                        </div>
                    </Collapse>
                     */}
                </>
            )}
            { !cardData && (
                <CardHeader style={{ textAlign: "center", backgroundColor: bgColor }} >
                    <CircularProgress />
                </CardHeader>
            )}
        </Card>
    )
}

export default ReviewCard