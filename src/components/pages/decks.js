/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Row, Col, Spinner, Alert, ToggleButtonGroup, ToggleButton } from "react-bootstrap"
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

    const changeFilter = (val) => setFilter(val)

    useEffect(() => {

        const main = async () => {
            const res = await axios.get(process.env.REACT_APP_API_URL+"users/getReviews/all/all/"+user["https://jisho-flashcards.namespace.com/username"])
            const reviewSlugs = res.data.reviews

            let reviewCards = []

            for(let i = 0; i < reviewSlugs.length; i++) {
                const ref = reviewSlugs[i].kanji ? reviewSlugs[i].kanji : reviewSlugs[i].wordSlug
                const type = reviewSlugs[i].kanji ? "kanji" : "word"
                const fullCard = await axios.get(process.env.REACT_APP_API_URL+"db/"+type+"/"+ref)
                console.log(fullCard.data)
                reviewCards.push(fullCard.data)
            }

            console.log(reviewCards)

            setCards(reviewCards)
        }

        main()

    }, [activeCard])

    return (
        <>
            <Header />
            { cards && cards.length === 0 && (
                <Row>
                    <Col xs={12}>
                        <Alert variant="danger" className="mt-2">No cards found. Get started by adding with the search bar on the <Alert.Link href="/">home screen</Alert.Link>.</Alert>
                    </Col>
                </Row>
            )}
            { cards && cards.length > 0 && (
                <>
                    <Row className="mt-2 mb-4" style={{textAlign: "center"}}>
                        <Col>
                            <ToggleButtonGroup type="checkbox" value={filter} onChange={changeFilter}>
                                <ToggleButton variant="toggle-kanji" id="kanji" value={"kanji"}>Kanji</ToggleButton>
                                <ToggleButton className="toggle-word" id="words" value={"words"}>Words</ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="masonry-grid"
                        >
                            {cards.map((card, i) => (
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
                            ))}
                        </Masonry>
                    </Row>
                
                </>
            )}

            { !cards && (
                <Row style={{textAlign:"center"}}>
                    <Col className="my-5" xs={12}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Retrieving ...</span>
                        </Spinner>
                    </Col>
                </Row>
            )}
        </>
    )

}

export default DecksPage