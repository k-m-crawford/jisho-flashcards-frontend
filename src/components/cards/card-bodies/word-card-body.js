/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { ListGroup } from "react-bootstrap"

const WordCardBody = (data) => {

    return (
    
        <ListGroup>
            {data.data.senses.map((sense, i)=> (
                <ListGroup.Item key={i}>
                    <small>{ sense.parts_of_speech.map((pos, i) => (
                        <span key={i} className="text-muted">
                            {pos + (i === sense.parts_of_speech.length - 1 ? "" : "; ")}
                        </span>
                    ))}</small><br />
                    <span className="text-muted">{i + 1}.&nbsp;&nbsp;</span>
                    {sense.english_definitions.map((def, i) => (
                        <span key={i}>
                            {def + (i === sense.english_definitions.length - 1 ? "" : "; " )} 
                        </span>
                    ))}
                </ListGroup.Item>
            ))}
        </ListGroup>

    )

}

export default WordCardBody