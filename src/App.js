import { Container, Row, Col, Spinner } from 'react-bootstrap'
import SearchBar from './components/searchbar/searchbar'
import LoginButton from './components/users/loginbutton'
import LogoutButton from './components/users/logoutbutton'
// import UserProfile from './components/users/userprofile'
import { useAuth0 } from '@auth0/auth0-react'
import './App.css'

const App = () => {

  const { isAuthenticated, isLoading } = useAuth0();

  if(isLoading) {
    return ( 
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }
  else if(!isAuthenticated) {
    return ( <LoginButton /> )
  }
  else if(isAuthenticated) {
    return ( 
    
      <Container>
        <SearchBar />
        <Row className="justify-content-md-center">
          <Col xs={2}>
            <LogoutButton />
          </Col>
        </Row>
      </Container> )
  }

}

export default App;
