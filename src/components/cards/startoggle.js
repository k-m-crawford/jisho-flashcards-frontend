/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as starOutline } from "@fortawesome/free-regular-svg-icons"
import { faStar as starFilled } from "@fortawesome/free-solid-svg-icons"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

const StarToggle = ({cardInfo, cardType}) => {

    const [ isToggled, setIsToggled ] = useState(null)
    const { user } = useAuth0()
    const dbSlug = cardType === "kanji" ? "db/kanji/" : "db/word/"
    const finalSlug = cardType === "kanji" ? cardInfo.query : cardInfo.slug

    const setToggle = async () => {

        const obj = cardType === "kanji" ? 
            {
                "kanji": cardInfo.query
            } :
            {
                "wordSlug": cardInfo.slug
            }
    
        if(isToggled){
            // await axios.delete(process.env.REACT_APP_API_URL+dbSlug+finalSlug)
            // eslint-disable-next-line no-undef
            await axios.put(process.env.REACT_APP_API_URL+"users/removeReview/"+user["https://jisho-flashcards.namespace.com/username"], obj)
        }
        else{
            // await axios.post(process.env.REACT_APP_API_URL+dbSlug, obj)
            // eslint-disable-next-line no-undef
            await axios.post(process.env.REACT_APP_API_URL+"users/addReview/"+user["https://jisho-flashcards.namespace.com/username"], obj)
        }
        
        setIsToggled(!isToggled)
    }

    useEffect(() => {
        const main = async () => {
            // eslint-disable-next-line no-undef
            const result = await axios.get(process.env.REACT_APP_API_URL+"users/checkReview/"+cardType+"/"+user["https://jisho-flashcards.namespace.com/username"]+"/"+finalSlug)

            if(result.status === 200) 
                setIsToggled(true)
            else
                setIsToggled(false)
                    
        }
        main()
    }, [isToggled, cardType, dbSlug, finalSlug, user])

    if(isToggled) {
        return (
            <FontAwesomeIcon onClick={() => setToggle() } icon={starFilled} style={{float: "right"}} color="gold" />
        )
    }
    else {
        return (
            <FontAwesomeIcon onClick={() => setToggle()} icon={starOutline} style={{float: "right"}} />
        )
    }

}

export default StarToggle