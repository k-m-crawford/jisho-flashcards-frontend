/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Card, Col, Collapse } from "react-bootstrap"
import WordCardBody from "./card-bodies/word-card-body"
import StarToggle from "./startoggle"

const WordCard = ({active, setActiveCard, hit}) => {

    const isActive = active === hit.slug
    const bg = isActive ? process.env.REACT_APP_WORD_COLOUR : "white"
    const col = isActive ? "white" : "black"
    const subtitleColor = isActive ? "" : "text-muted"

    return (
        <Col className="mb-2 px-1">
            <Card style={{ backgroundColor: bg, color: col }}
                aria-controls="card-body-collapse"
                aria-expanded={isActive}
                onClick={() => isActive ? setActiveCard(-1) : setActiveCard(hit.slug)} 
                className="mx-auto"
            >
                <Card.Body>
                    <Card.Title >
                        {hit.japanese[0].word} <StarToggle cardInfo={hit} cardType="word" />
                    </Card.Title>
                    <Card.Subtitle style={{color:"white"}} className={"mb-2 " + subtitleColor}>{hit.japanese[0].reading}</Card.Subtitle>
                        
                </Card.Body>
                <Collapse in={isActive}>
                    <div id="card-body-collapse">
                        <WordCardBody data={hit} />
                    </div>
                </Collapse>

            </Card>
        </Col>
    )
}

export default WordCard