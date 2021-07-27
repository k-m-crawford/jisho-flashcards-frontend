/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { List, ListItem, Paper, Typography } from "@material-ui/core"

const KanjiCardBody = (data) => {

    return (
    
        <List sx={{p: 0}}>
            <Paper sx={{ backgroundColor: process.env.REACT_APP_KANJI_COLOUR, mx: 0.1, my: 0.3}}>
                <ListItem sx={{my: 0.15, backgroundColor: "white"}}>
                    <Typography variant="h5" style={{ display: "inline" }}>Kun:&nbsp;</Typography>
                    { data.data.kunyomi.map((kun, i) => (
                        <Typography sx={{mt: 0.70}} key={kun}>{kun + (i === data.data.kunyomi.length - 1 ? "" : ",")} &nbsp;</Typography>
                    ))}
                </ListItem>
                <ListItem sx={{my: 0.15, backgroundColor: "white"}}>
                    <Typography variant="h5" style={{ display: "inline" }}>On:&nbsp;</Typography >
                    { data.data.onyomi.map((on, i) => (
                        <Typography sx={{mt: 0.70}} key={on}>{on + (i === data.data.onyomi.length - 1 ? "" : ", ")}&nbsp;</Typography>
                    ))}
                </ListItem>
            </Paper>
        </List>

    )

}

export default KanjiCardBody