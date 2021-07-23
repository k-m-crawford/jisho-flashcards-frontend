import { Card, Col, ListGroup } from "react-bootstrap"
import StarToggle from './startoggle'

const KanjiCard = ({kanji}) => {

    return (
        <Col className="mb-2 px-1">
            <Card className="mx-auto">
                <Card.Header style={{float:"left"}}>
                    <h5 className="my-auto" style={{float: "left"}}>{kanji.query}</h5><StarToggle cardInfo={kanji} cardType="kanji" /><br />
                    <h6 className="my-auto">{kanji.meaning}</h6>
                   
                </Card.Header>
                <Card.Body>
                        <h5 className="my-auto" style={{display: "inline"}}>Kun: </h5>
                        { kanji.kunyomi.map((kun, i) => (
                            <span className="mt-5" key={kun}>{kun + (i === kanji.kunyomi.length - 1 ? '' : ', ')}</span>
                        ))} 
                        <br />
                        <h5 className="my-auto" style={{display: "inline"}}>On: </h5>
                        { kanji.onyomi.map((on,i) => (
                            <span className="mt-5" key={on}>{on + (i === kanji.onyomi.length - 1 ? '' : ', ')}</span>
                        ))}                  
                </Card.Body>

                    <ListGroup variant="flush">
 
                    </ListGroup>

            </Card>
        </Col>
    )
}

export default KanjiCard