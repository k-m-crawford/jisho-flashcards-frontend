/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Grid, CircularProgress, Alert, Link, ToggleButtonGroup, ToggleButton } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import Header from "../header"
import Masonry from "react-masonry-css"
import WordSearchCard from "../cards/wordcard"
import KanjiCard from "../cards/kanjicard"
import axios from "axios"

const DecksPage = () => {

    const [ cards, setCards ] = useState(null)
    const [ activeCard, setActiveCard ] = useState(null)
    const [ filter, setFilter ] = useState([ "kanji", "words" ])
    const { user } = useAuth0()
    
    const breakpointColumnsObj = {
        default: 4,
        992: 3,
        768: 2,
        576: 1
    }

    // const changeFilter = (val) => setFilter(val)

    useEffect(() => {

        const main = async () => {
            const res = await axios.get(process.env.REACT_APP_API_URL+"users/getReviews/all/all/"+user["https://jisho-flashcards.namespace.com/username"])
            const reviewSlugs = res.data.reviews

            let reviewCards = []

            for(let i = 0; i < reviewSlugs.length; i++) {
                const ref = reviewSlugs[i].kanji ? reviewSlugs[i].kanji : reviewSlugs[i].wordSlug
                const type = reviewSlugs[i].kanji ? "kanji" : "word"
                const fullCard = await axios.get(process.env.REACT_APP_API_URL+"db/"+type+"/"+ref)
                reviewCards.push(fullCard.data)
            }
            setCards(reviewCards)
        }

        main()

    }, [])

    return (
        <>
            <Header />

            { !cards && (
                <Grid container sx={{textAlign:"center"}}>
                    <Grid item  sx={{my: 5}} xs={12}>
                        <CircularProgress />
                    </Grid>
                </Grid>
            )}
            { cards && cards.length === 0 && (
                <Grid container>
                    <Grid item xs={12}>
                        <Alert severity="warning" sx={{mt: 2}}>No cards found. Get started by adding with the search bar on the <Link color="inherit" href="/">home screen</Link>.</Alert>
                    </Grid>
                </Grid>
            )}
            { cards && cards.length > 0 && (
                <>
                    <Grid container sx={{mt:2, mb:4, textAlign: "center" }} >
                        <Grid item xs={12}>
                            <ToggleButtonGroup variant="contained" color="primary"
                                value={filter}
                                onChange={(e, f) => { setFilter (f) }}
                            >
                                <ToggleButton value="kanji">Kanji</ToggleButton>
                                <ToggleButton value="words">Words</ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="masonry-grid"
                            >
                                {cards.map((card, i) => {
                                    console.log(card)
                                    return (
                                        <span key={i}>
                                            { card.wordSlug && filter.includes("words") && (
                                                <WordSearchCard 
                                                    active={activeCard} 
                                                    setActiveCard={setActiveCard}
                                                    hit={card.data}
                                                    type={"word"} />
                                            )}
                                            { card.kanji && filter.includes("kanji") && (
                                                <KanjiCard 
                                                    active={activeCard} 
                                                    setActiveCard={setActiveCard}
                                                    kanji={card.data} />
                                            )}
                                        </span>
                                    )})}
                            </Masonry>
                        </Grid>
                    </Grid>
                
                </>
            )}
        </>
    )

}

export default DecksPage