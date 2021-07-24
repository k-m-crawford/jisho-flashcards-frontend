/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Card, Button, Spinner, Collapse } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

const ReviewCard = ({reviewType}) => {

    const [ cardData, setCardData ] = useState(null)
    const [ bgColor, setBgColor ] = useState("white")
    const [ bodyExpanded, setBodyExpanded ] = useState(false)

    const { user } = useAuth0()

    useEffect(() => {

        const main = async () => {

            const res = await axios.get(process.env.REACT_APP_API_URL+"users/getReviews/due/one/"+reviewType+"/"+user["https://jisho-flashcards.namespace.com/username"])
            setCardData(res.data)

            if(reviewType === "kanji")
                setBgColor(process.env.REACT_APP_KANJI_COLOUR)
            else if(reviewType === "word")
                setBgColor(process.env.REACT_APP_WORD_COLOUR)
            else if(reviewType === "all")
                setBgColor(process.env.REACT_APP_ALL_COLOUR)

        }

        main()

    })

    return (
        <Card>
            <Card.Header style={{ textAlign: "center", backgroundColor: bgColor }} >
                { cardData && (
                    <h1 className="my-5 py-3" style={{ color:"white" }}>
                        { cardData.wordSlug && cardData.wordSlug }
                        { cardData.kanji && cardData.kanji }
                    </h1>
                )}
                { !cardData && (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Retrieving ...</span>
                    </Spinner>
                )}
                <Button 
                    style={{width:"100%"}} 
                    className="m-0" 
                    variant="outline-light"
                    aria-controls="card-body-collapse"
                    aria-expanded={bodyExpanded}
                    onClick={()=>setBodyExpanded(!bodyExpanded)}>
                        Reveal
                </Button>
            </Card.Header>

            <Collapse in={bodyExpanded}>
                <div id="card-body-collapse">
                    <Card.Body>
                                        
                    </Card.Body>
                </div>
            </Collapse>

            { cardData && (
                <Card.Footer className="p-0">
                    {/* <Button style={{width:"100%"}} className="m-0" variant="light">Reveal</Button> */}
                </Card.Footer>
            )}

        </Card>
    )
}

export default ReviewCard