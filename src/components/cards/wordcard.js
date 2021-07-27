/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Card, CardContent, Collapse, CardHeader, Typography, Grid } from "@material-ui/core"
import WordCardBody from "./card-bodies/word-card-body"
import StarToggle from "./startoggle"

const WordCard = ({active, setActiveCard, hit}) => {

    const isActive = active === hit.slug
    const bg = isActive ? process.env.REACT_APP_WORD_COLOUR : "white"
    const col = isActive ? "white" : "black"
    const subtitleColor = isActive ? "white" : "rgba(0, 0, 0, 0.6)"

    return (
        <Grid item sx={{ px: 1, my: 1 }} >
            <Card sx={{ backgroundColor: bg, color: col }}
                aria-controls="card-body-collapse"
                aria-expanded={isActive}
                onClick={() => isActive ? setActiveCard(-1) : setActiveCard(hit.slug)} 
                className="mx-auto"
            >   
                <CardHeader title={hit.japanese[0].word} 
                    subheader={<Typography sx={{color: subtitleColor}}>{hit.japanese[0].reading}</Typography>}
                    action={<StarToggle cardInfo={hit} />} />
                <Collapse in={isActive}>
                    <CardContent sx={{p: 0, m: 0}}>
                        <WordCardBody data={hit} />
                    </CardContent>
                </Collapse>

            </Card>
        </Grid>
    )
}

export default WordCard