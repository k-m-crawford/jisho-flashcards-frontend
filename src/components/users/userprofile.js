/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react"
import { Image, Dropdown } from "react-bootstrap"
import { useAuth0 } from "@auth0/auth0-react"

// eslint-disable-next-line react/prop-types
const UserProfile = ({ badge }) => {
    const { user, isAuthenticated, logout } = useAuth0()

    const toggle = React.forwardRef(({ children, onClick }, ref) => (
        <a href="/" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e) }}>
            {children}
        </a>
    ))

    return (
        isAuthenticated && badge && (
            <>
                <Dropdown>
                    <Dropdown.Toggle as={toggle} id="profile-dropdown">
                        <Image className="mx-auto" src={user.picture} alt={user.name} roundedCircle fluid />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/decks">Decks</Dropdown.Item>
                        <Dropdown.Item>Profile</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => { e.preventDefault(); logout({ returnTo: window.location.origin }) }}>
            Log Out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </>
        )
    )
}

export default UserProfile
