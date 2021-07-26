/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Row, Col, Button } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import ReviewCard from "../cards/reviewcard"

const ReviewPage = () => {

    return (
        <>
            <Row>
                <Col className="mt-4 mb-1">
                    <ReviewCard reviewType={useParams().type}/>
                </Col>
            </Row>
            <Row>
                <Col className="my-2" style={{textAlign: "center"}}>
                    <Link to="/">
                        <Button variant="jisho-green">Go Back</Button>
                    </Link>
                </Col>
            </Row>
        </>
    )

}

export default ReviewPage