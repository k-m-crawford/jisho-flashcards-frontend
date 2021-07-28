/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { List, ListItem, Typography, Grid } from "@material-ui/core"

const WordCardBody = (data) => {

    return (
    
        <Grid container>
            <Grid item xs={12}>
                <List>
                    {data.data.senses.map((sense, i)=> (
                        <ListItem key={i} sx={{ backgroundColor: "white"}}>
                            <div>
                                <Typography sx={{color: "rgba(0, 0, 0, 0.6)"}}>{i + 1}.&nbsp;</Typography>
                            </div>
                            <div>
                                <Typography sx={{fontSize: "smaller", color: "rgba(0, 0, 0, 0.6)"}}>{ sense.parts_of_speech.map((pos, i) => (
                                    <span key={i}>
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
                </List>
            </Grid>
        </Grid>

    )

}

export default WordCardBody