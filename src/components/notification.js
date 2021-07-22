import { Alert } from "react-bootstrap"

const Notification = ({msg, flavour}) => {

    return (
        <>
        { msg !== null && 
        
            <Alert variant={flavour}>{msg}</Alert>

        }
        </>

    )
}

export default Notification