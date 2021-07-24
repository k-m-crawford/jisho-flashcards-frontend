import "bootstrap/dist/css/bootstrap.css"
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { Auth0Provider } from "@auth0/auth0-react"

ReactDOM.render(
  
	<Auth0Provider 
		domain="jisho-flashcards.us.auth0.com"
		clientId="1iiJBdBmXz83B7nMSWrlZDMuvJTKK3Qh"
		redirectUri={window.location.origin}
		useRefreshTokens={true}
		cacheLocation="localstorage"
	>

		<React.StrictMode>
			<App />
		</React.StrictMode>

	</Auth0Provider>,
	document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
