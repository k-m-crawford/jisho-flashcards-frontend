import React from "react"
import { Button } from 'react-bootstrap'
import { useAuth0 } from "@auth0/auth0-react"

const LogoutButton = () => {
  const { logout } = useAuth0()

  return (
    <Button 
      onClick={() => logout({ returnTo: window.location.origin })} 
      className="mt-2" 
      variant="secondary"
      size="lg"
    >
      Log Out
    </Button>
  )
}

export default LogoutButton