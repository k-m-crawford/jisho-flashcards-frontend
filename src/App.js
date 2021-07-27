import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Grid, Container, CircularProgress, ThemeProvider } from "@material-ui/core"
import Home from "./components/pages/home"
import ReviewPage from "./components/pages/reviewpage"
import DecksPage from "./components/pages/decks"
import LoginButton from "./components/users/loginbutton"
import Header from "./components/header"
import { useAuth0 } from "@auth0/auth0-react"
import "./App.css"
import "@fontsource/roboto"

import { createTheme } from "@material-ui/core/styles"

const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#56d926",
        },
        secondary: {
            main: "#5a5a5b",
        },
        default: {
            main: "#e0e0e0"
        }
    },
    typography: {
        button: {
            fontWeight: 500,
            lineHeight: 2,
            letterSpacing: "0.15em",
        },
    },
    props: {
        MuiList: {
            dense: true,
        },
        MuiMenuItem: {
            dense: true,
        },
        MuiTable: {
            size: "small",
        },
    },
})

const App = () => {

    const { isAuthenticated, isLoading } = useAuth0()

    return (
        <Router>
            <ThemeProvider theme={theme}><Container>

                { isLoading && (
                    <>
                        <Header />
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs={1}>
                                <CircularProgress />
                            </Grid>
                        </Grid>
                    </>
                )}

                { !isLoading && !isAuthenticated && (
                    <>
                        <Header />
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs={1}>
                                <LoginButton />
                            </Grid>
                        </Grid>
                    </>
                )}

                { !isLoading && isAuthenticated && (
                    <Switch>
                        <Route path="/review/:type">
                            <ReviewPage />
                        </Route>
                        <Route path="/decks">
                            <DecksPage />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                )}
            </Container></ThemeProvider>
        </Router>
    )
}

export default App
