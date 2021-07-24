/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Col, Card, Spinner, Button } from "react-bootstrap"
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

                const all = reviewType === "all" ? res.data.kanji.concat(res.data.words) : res.data

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

        <Col className="mb-4" xs={12} md={4} lg={3}>
            <Card style={{textAlign: "center"}}>

                <Card.Header className="my-0 pt-3 pb-2"><h6>{reviewType.toUpperCase()}</h6></Card.Header>

                <Card.Body style={{ backgroundColor: color }}>
                    { count === null && (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Counting ...</span>
                        </Spinner>
                    )}
                    { count !== null && (
                        <h1 style={{color: "white"}}>{count}</h1>
                    )}
                    <Link to={`/review/${reviewType}`}>
                        <Button variant="outline-light" style={{width: "100%"}}>Review!</Button>
                    </Link>
                </Card.Body>

                <Card.Footer>
                    <span className="footer-text">next reviews in </span>
                </Card.Footer>

            </Card>
        </Col>

    )

}

export default ToReview