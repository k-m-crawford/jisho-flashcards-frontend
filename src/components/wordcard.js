import { Card, Col, ListGroup } from "react-bootstrap"
import StarToggle from './startoggle'

const WordCard = ({active, setActiveCard, hit}) => {

    return (
        <Col className="mb-2 px-1">
            <Card 
                onClick={() => active === hit.slug ? setActiveCard(-1) : setActiveCard(hit.slug)} 
                className="mx-auto"
            >
                <Card.Body>
                    <Card.Title>
                        {hit.japanese[0].word} <StarToggle />
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{hit.japanese[0].reading}</Card.Subtitle>
                        
                </Card.Body>
                    <ListGroup variant="flush">
                    { active === hit.slug ?
                            hit.senses.map(sense => 
                                <ListGroup.Item>
                                {sense.english_definitions.map( (def, i) => 
                                    <span key={def+Number(i)}>
                                        {def + (i === sense.english_definitions.length - 1 ? '' : '; ' )} 
                                    </span>)
                                }
                                </ListGroup.Item>
                    ) : 
                        <></>
                    }
                    </ListGroup>
            </Card>
        </Col>
    )
}

export default WordCard