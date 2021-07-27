/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react"
import { Grid, Card, CardHeader, Collapse, Typography } from "@material-ui/core"
import KanjiCardBody from "./card-bodies/kanji-card-body"
import StarToggle from "./startoggle"

const KanjiCard = ({ kanji, active, setActiveCard }) => {

    const isActive = active === kanji.query
    const bg = isActive ? process.env.REACT_APP_KANJI_COLOUR : "white"
    const col = isActive ? "white" : "black"
    const subtitleColor = isActive ? "" : "text-muted"

    return (
        <Grid item sx={{ px: 1, my: 1 }} xs={12} >
            <Card sx={{ backgroundColor: bg, color: col }}
                aria-controls="card-body-collapse"
                aria-expanded={isActive}
                onClick={() => isActive ? setActiveCard(-1) : setActiveCard(kanji.query)} 
                className="mx-auto"
            >   
                <CardHeader title={kanji.query}
                    subheader={<Typography sx={{color: subtitleColor}}>{kanji.meaning}</Typography>} 
                    action={<StarToggle cardInfo={kanji} />}/>
                  
                <Collapse in={isActive}>
                    <div id="card-body-collapse">
                        <KanjiCardBody data={kanji} />
                    </div>
                </Collapse>

            </Card>
        </Grid>
    )
}

export default KanjiCard
