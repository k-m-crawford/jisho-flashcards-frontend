import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as starOutline } from '@fortawesome/free-regular-svg-icons'
import { faStar as starFilled } from '@fortawesome/free-solid-svg-icons'

const StarToggle = () => {

    const [ isToggled, setIsToggled ] = useState(false)

    if(isToggled) {
        return (
            <FontAwesomeIcon onClick={() => setIsToggled(false) } icon={starFilled} style={{float: "right"}} color="gold" />
        )
    }
    else {
        return (
            <FontAwesomeIcon onClick={() => setIsToggled(true) } icon={starOutline} style={{float: "right"}} />
        )
    }

}

export default StarToggle