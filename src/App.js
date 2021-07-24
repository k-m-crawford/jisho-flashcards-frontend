import React, { useState }  from "react"
import { Container, Row, Col, Spinner, Accordion, Image } from "react-bootstrap"
import SearchBar from "./components/searchbar/searchbar"
import LoginButton from "./components/users/loginbutton"
import UserProfile from "./components/users/userprofile"
import { useAuth0 } from "@auth0/auth0-react"
import logo from "./logo.png"
import "./App.css"

const App = () => {

	const { isAuthenticated, isLoading } = useAuth0()
	// eslint-disable-next-line no-unused-vars
	const [ currentView, setCurrentView ] = useState("landing")

	return (
		<Container>
			<Row>
				<Col className="my-2" xs={8} sm={6} lg={3}>
					<Image src={logo} fluid />
				</Col>
				<Col className="py-3 mt-1" xs={{ span: 3, offset: 1 }} sm={{ span: 2, offset: 4 }} lg={{ span: 1, offset: 8 }} >
					<UserProfile badge={true} />
				</Col>
			</Row>
			{ isLoading && (
				<Row>
					<Col className="my-2" xs={{ span: 1, offset: 6 }}>
						<Spinner animation="border" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					</Col>
				</Row>
			)}

			{ !isLoading && !isAuthenticated && (
				<Row>
					<Col className="my-2" xs={{ span: 1, offset: 5 }}>
						<LoginButton />
					</Col>
				</Row>
			)}

			{ !isLoading && isAuthenticated && currentView === "landing" && (
				<>
					<Row>
						<Col xs={12} lg={{ span: 10, offset: 1 }}>
							<Accordion>
								<Accordion.Item eventKey="0">
									<Accordion.Header>
										Search for Cards
									</Accordion.Header>
									<Accordion.Body>
										<SearchBar />
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</Col>
					</Row>
				</>
			)}
		</Container>
	)
}

export default App
