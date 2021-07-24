/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import ReviewCard from "../cards/reviewcard"

const ReviewPage = () => {

    return (
        <Row>
            <Col className="my-4">
                <ReviewCard reviewType={useParams().type}/>
            </Col>
        </Row>
    
    )

}

export default ReviewPage