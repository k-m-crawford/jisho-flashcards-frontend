/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import StarIcon from "@material-ui/icons/Star"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

const StarToggle = ({cardInfo}) => {

    const [ isToggled, setIsToggled ] = useState(false)
    const { user } = useAuth0()
    const cardType = cardInfo.query ? "kanji" : "word"
    const finalSlug = cardInfo.query ? cardInfo.query : cardInfo.slug

    const setToggle = async () => {
        
        const curDate = new Date()

        const obj = cardInfo.query ? 
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
            const result = await axios.get(process.env.REACT_APP_API_URL+"users/checkReview/"+cardType+"/"+user["https://jisho-flashcards.namespace.com/username"]+"/"+finalSlug)

            console.log(result)

            if(result.status === 200) 
                setIsToggled(true)
                    
        }
        main()
    }, [])

    return(
        <>
            { isToggled && (
                <StarIcon sx={{mr: 1, color: "gold"}} onClick={() => setToggle() } />
            )}
            { !isToggled && (
                <StarBorderIcon sx={{mr: 1}} onClick={() => setToggle() }  color="gold" />
            )}
        </>
    )

}

export default StarToggle