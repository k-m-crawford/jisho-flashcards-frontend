import { Container, Spinner } from 'react-bootstrap'
import SearchBar from './components/searchbar'
import LoginButton from './components/loginbutton'
import { useAuth0 } from '@auth0/auth0-react'
import './App.css'

const App = () => {

  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <Container>
          { isLoading && 
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
          }
          {!isAuthenticated && !isLoading && <LoginButton />}
          {isAuthenticated && !isLoading && <SearchBar />}
    </Container>
  )
  
}

export default App;
