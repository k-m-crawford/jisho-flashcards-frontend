/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { List, ListItem, Typography, Paper } from "@material-ui/core"

const WordCardBody = (data) => {

    return (
    
        <List sx={{p: 0}}>
            <Paper sx={{ backgroundColor: process.env.REACT_APP_WORD_COLOUR, mx: 0.1, my: 0.3}}>
                {data.data.senses.map((sense, i)=> (
                    <ListItem key={i} sx={{my: 0.15, backgroundColor: "white"}}>
                        <div>
                            <Typography className="text-muted">{i + 1}.&nbsp;</Typography>
                        </div>
                        <div>
                            <Typography sx={{fontSize: "smaller"}}>{ sense.parts_of_speech.map((pos, i) => (
                                <span key={i} className="text-muted">
                                    {pos + (i === sense.parts_of_speech.length - 1 ? "" : "; ")}
                                </span>
                            ))}</Typography>
                            <Typography sx={{fontSize: "smaller", color: "black"}}>{ sense.english_definitions.map((def, i) => (
                                <span key={i}>
                                    {def + (i === sense.english_definitions.length - 1 ? "" : "; " )} 
                                </span>
                            ))}</Typography>
                        </div>
                        
                    </ListItem>
                ))}
            </Paper>
        </List>

    )

}

export default WordCardBody