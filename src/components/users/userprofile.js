import { Col, Image, Row } from 'react-bootstrap'
import { useAuth0 } from "@auth0/auth0-react"

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    isAuthenticated && (
      <Row>
        <Col xs={1} md={1}>
            <Image className="mt-1 p-1" src={user.picture} alt={user.name} roundedCircle fluid />
        </Col>
        <Col xs={1} md={1}>
            <h2>{user['https://jisho-flashcards.namespace.com/username']}</h2>
        </Col>
       </Row>
    )
  )
}

export default UserProfile