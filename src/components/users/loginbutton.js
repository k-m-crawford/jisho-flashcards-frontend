import React from "react"
import { Button } from "@material-ui/core"
import { useAuth0 } from "@auth0/auth0-react"

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0()

    return (
        <Button 
            onClick={() => loginWithRedirect()} 
            sx={{mt: 2}} 
            variant="contained">
                Login
        </Button>
    )
}

export default LoginButton