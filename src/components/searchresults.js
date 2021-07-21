import { Row, CardColumns } from "react-bootstrap"
import { useState } from 'react'
import Masonry from "react-masonry-css";
import WordCard from './wordcard'

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
        <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        >
            {hits.map((hit, i) => 
                <WordCard 
                    active={activeCard} 
                    setActiveCard={setActiveCard}
                    key={hit.slug + Number(i)} 
                    hit={hit} />
            )}
        </Masonry>
        </Row>

    )

}

export default SearchResults