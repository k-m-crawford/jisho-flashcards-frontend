/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Row, Col, Accordion } from "react-bootstrap"
import Header from "../header"
import ToReview from "./toreview"
import SearchBar from "../searchbar/searchbar"

const Home = () => (
    <>
        <Header />
        <Row className="justify-content-center">
            <ToReview reviewType="kanji" color={process.env.REACT_APP_KANJI_COLOUR}/>
            <ToReview reviewType="word" color={process.env.REACT_APP_WORD_COLOUR}  />
            <ToReview reviewType="all" color={process.env.REACT_APP_ALL_COLOUR} />
        </Row>
        <Row>
            <Col className="mb-3" xs={12} lg={{ span: 10, offset: 1 }}>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                                                Search for Cards
                        </Accordion.Header>
                        <Accordion.Body>
                            <SearchBar />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Col>
        </Row>
    </>
)

export default Home