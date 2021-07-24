import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Container, Row, Col, Spinner } from "react-bootstrap"
import Home from "./components/pages/home"
import ReviewPage from "./components/pages/reviewpage"
import LoginButton from "./components/users/loginbutton"
import Header from "./components/header"
import { useAuth0 } from "@auth0/auth0-react"
import "./App.css"

const App = () => {

    const { isAuthenticated, isLoading } = useAuth0()

    return (
        <Router>
            <Container>

                { isLoading && (
                    <>
                        <Header />
                        <Row>
                            <Col className="my-2" xs={{ span: 1, offset: 6 }}>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </Col>
                        </Row>
                    </>
                )}

                { !isLoading && !isAuthenticated && (
                    <>
                        <Header />
                        <Row>
                            <Col className="my-2" xs={{ span: 1, offset: 5 }}>
                                <LoginButton />
                            </Col>
                        </Row>
                    </>
                )}

                { !isLoading && isAuthenticated && (
                    <Switch>
                        <Route path="/review/:type">
                            <ReviewPage />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                )}
            </Container>
        </Router>
    )
}

export default App
