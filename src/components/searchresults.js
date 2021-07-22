import { Row } from "react-bootstrap"
import { useState } from 'react'
import Masonry from "react-masonry-css";
import WordSearchCard from './wordcard'
import KanjiCard from './kanjicard'

const SearchResults = ({hits}) => {

    const [ activeCard, setActiveCard ] = useState(-1)

    const breakpointColumnsObj = {
        default: 4,
        992: 3,
        768: 2,
        576: 1
      };

    return (
        <Row>
        { hits.constructor === Array && hits.length > 0 &&
            <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            >
                {hits.map((hit, i) => 
                    <WordSearchCard 
                        active={activeCard} 
                        setActiveCard={setActiveCard}
                        key={hit.slug + Number(i)} 
                        hit={hit}
                        type={'word'} />
                )}
            </Masonry>
        }
        { hits.constructor !== Array && hits.found &&
            <KanjiCard 
            active={activeCard} 
            setActiveCard={setActiveCard}
            kanji={hits}
            />
        }
        </Row>
    )

}

export default SearchResults