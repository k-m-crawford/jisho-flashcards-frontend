import { Card, Col, ListGroup } from "react-bootstrap"
import StarToggle from './startoggle'

const WordCard = ({active, setActiveCard, hit}) => {

    const bg = active === hit.slug ? "primary" : ""
    const subtitleColor = active === hit.slug ? "" : "text-muted"

    return (
        <Col className="mb-2 px-1">
            <Card bg={bg}
                onClick={() => active === hit.slug ? setActiveCard(-1) : setActiveCard(hit.slug)} 
                className="mx-auto"
            >
                <Card.Body>
                    <Card.Title>
                        {hit.japanese[0].word} <StarToggle cardInfo={hit} cardType="word" />
                    </Card.Title>
                    <Card.Subtitle style={{color:"white"}} className={"mb-2 " + subtitleColor}>{hit.japanese[0].reading}</Card.Subtitle>
                        
                </Card.Body>
                    <ListGroup variant="flush">
                    { active === hit.slug ?
                        hit.senses.map((sense, i) => 
                            <ListGroup.Item key={i}>
                                { sense.english_definitions.map( (def, i) => 
                                    <span key={def+Number(i)}>
                                        {def + (i === sense.english_definitions.length - 1 ? '' : '; ' )} 
                                    </span>)
                                }
                            </ListGroup.Item>
                        ) : <></>
                    }
                    </ListGroup>

            </Card>
        </Col>
    )
}

export default WordCard