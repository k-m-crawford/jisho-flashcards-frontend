/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useState } from "react"
import { Menu, MenuItem, Link, Avatar } from "@material-ui/core"
import { useAuth0 } from "@auth0/auth0-react"

// eslint-disable-next-line react/prop-types
const UserProfile = ({ badge }) => {

    const [ anchorEl, setAnchorEl ] = useState(null)
    const { user, isAuthenticated, logout } = useAuth0()

    const openMenu = (e) => { setAnchorEl(e.currentTarget) }
    const handleClose = () => { setAnchorEl(null) }

    return (
        isAuthenticated && badge && (
            <span>
                <Avatar style={{float: "right"}} alt={user.name} src={user.picture} onClick={openMenu} />
                <Menu id="profile-menu"
                    anchorEl={anchorEl}
                    autoFocus={false}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <MenuItem component={Link} color="inherit" href="/decks">Decks</MenuItem>
                    <MenuItem><Link underline="none" href="/decks" color="inherit">Profile</Link></MenuItem>
                    <MenuItem onClick={(e) => { e.preventDefault(); logout({ returnTo: window.location.origin }) }}>Logout</MenuItem>
                </Menu>
                
            </span>
        )
    )
}

export default UserProfile
