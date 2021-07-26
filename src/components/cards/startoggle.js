/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
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
    const finalSlug = cardType === "kanji" ? cardInfo.query : cardInfo.slug

    const setToggle = async () => {
        
        const curDate = new Date()

        const obj = cardType === "kanji" ? 
            {
                "kanji": cardInfo.query,
                "nextReview": new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(),
                    curDate.getHours() + 4, curDate.getMinutes(), curDate.getSeconds())
            } :
            {
                "wordSlug": cardInfo.slug,
                "nextReview": new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(),
                    curDate.getHours() + 4, curDate.getMinutes(), curDate.getSeconds())
            }

        console.log(obj.nextReview)

        const res = isToggled ? await axios.put(process.env.REACT_APP_API_URL+"users/removeReview/"+user["https://jisho-flashcards.namespace.com/username"], obj)
            : await axios.post(process.env.REACT_APP_API_URL+"users/addReview/"+user["https://jisho-flashcards.namespace.com/username"], obj)

        console.log("set toggle ", res)

        if(res.status === 200){
            setIsToggled(!isToggled)
            await axios.post(process.env.REACT_APP_API_URL+"db/"+cardType, cardInfo)
        }
    }

    useEffect(() => {
        const main = async () => {
            // eslint-disable-next-line no-undef
            const result = await axios.get(process.env.REACT_APP_API_URL+"users/checkReview/"+cardType+"/"+user["https://jisho-flashcards.namespace.com/username"]+"/"+finalSlug)

            console.log("in effect ", result)

            if(result.status === 200) 
                setIsToggled(true)
            else
                setIsToggled(false)
                    
        }
        main()
    }, [cardInfo])

    return(
        <>
            { isToggled && (
                <FontAwesomeIcon onClick={() => setToggle() } icon={starFilled} style={{float: "right"}} color="gold" />
            )}
            { !isToggled && (
                <FontAwesomeIcon onClick={() => setToggle()} icon={starOutline} style={{float: "right"}} />
            )}
        </>
    )

}

export default StarToggle