/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react"
import Masonry from "react-masonry-css"
import WordSearchCard from "../cards/wordcard"
import KanjiCard from "../cards/kanjicard"

const SearchResults = ({hits}) => {

	const [ activeCard, setActiveCard ] = useState(-1)

	const breakpointColumnsObj = {
		default: 4,
		992: 3,
		768: 2,
		576: 1
	}

	return (
		<>
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
            			type={"word"} />
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
		</>
	)

}

export default SearchResults