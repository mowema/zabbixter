import React from "react"
import { Link } from "react-router-dom"
import favicon from "../logo.svg"
import "../styles/leftNav.css"
import Logout from "./Logout"
//import Logout from "./Logout"

function LeftNav() {
    return (
        <div>
            <Link to="/users">
                <img src={favicon} alt="logo" style={{ width: "40px" }} />
            </Link>
            <Link to="/">
                <h2>
                    <i className="fa fa-home" aria-hidden="true" /> <span className="title">Home</span>
                </h2>
            </Link>
            <Link to="/profile">
                <h2>
                    <i className="fa fa-user" aria-hidden="true" /> <span className="title">Profile</span>
                </h2>
            </Link>
            <Logout />
        </div>
    )
}

export default LeftNav