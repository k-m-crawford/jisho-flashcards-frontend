/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Alert} from "@material-ui/core"

const Notification = ({msg, flavour}) => {

    return (
        <>
            { msg !== null && 
        
            <Alert severity={flavour}>{msg}</Alert>

            }
        </>

    )
}

export default Notification