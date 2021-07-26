/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react"
import { Card, Col, Collapse } from "react-bootstrap"
import KanjiCardBody from "./card-bodies/kanji-card-body"
import StarToggle from "./startoggle"

const KanjiCard = ({ kanji, active, setActiveCard }) => {

    const isActive = active === kanji.query
    const bg = isActive ? process.env.REACT_APP_KANJI_COLOUR : "white"
    const col = isActive ? "white" : "black"
    const subtitleColor = isActive ? "" : "text-muted"

    return (
        <Col className="mb-2 px-1">
            <Card style={{ backgroundColor: bg, color: col }}
                aria-controls="card-body-collapse"
                aria-expanded={isActive}
                onClick={() => isActive ? setActiveCard(-1) : setActiveCard(kanji.query)} 
                className="mx-auto">
                <Card.Body>
                    <Card.Title>
                        {kanji.query} <StarToggle cardInfo={kanji} cardType="kanji" />
                    </Card.Title>
                    <Card.Subtitle style={{color:"white"}} className={"mb-2 " + subtitleColor}>{kanji.meaning}</Card.Subtitle>

                </Card.Body>

                <Collapse in={isActive}>
                    <div id="card-body-collapse">
                        <KanjiCardBody data={kanji} />
                    </div>
                </Collapse>

            </Card>
        </Col>
    )
}

export default KanjiCard
