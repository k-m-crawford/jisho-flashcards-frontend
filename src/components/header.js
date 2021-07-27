/* eslint-disable react/react-in-jsx-scope */
import { Box, Grid, Link } from "@material-ui/core"
import UserProfile from "./users/userprofile"
import logo from "../logo.png"

const Header = () => (
    <Box>
        <Grid container mt={1} mb={2} sx={{ flexGrow: 1 }} spacing={2}>
            <Grid item xs={8} sm={5} md={4}>
                <Link href="/"><img style={{width: "100%" }} src={logo} /></Link>
            </Grid>
            <Grid item xs={3} sm={6} md={7}></Grid>
            <Grid item my="auto" xs={1} md={1} lg={1}>
                <UserProfile badge={true} />
            </Grid>
        </Grid>
    </Box>
)

export default Header