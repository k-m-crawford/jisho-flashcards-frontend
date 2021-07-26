/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { ListGroup } from "react-bootstrap"

const KanjiCardBody = (data) => {

    return (
    
        <ListGroup>
            <ListGroup.Item>
                <h5 className="my-auto" style={{ display: "inline" }}>Kun: </h5>
                { data.data.kunyomi.map((kun, i) => (
                    <span className="mt-5" key={kun}>{kun + (i === data.data.kunyomi.length - 1 ? "" : ", ")}</span>
                ))}
            </ListGroup.Item>
            
            <ListGroup.Item>
                <h5 className="my-auto" style={{ display: "inline" }}>On: </h5>
                { data.data.onyomi.map((on, i) => (
                    <span className="mt-5" key={on}>{on + (i === data.data.onyomi.length - 1 ? "" : ", ")}</span>
                ))}
            </ListGroup.Item>
        </ListGroup>

    )

}

export default KanjiCardBody