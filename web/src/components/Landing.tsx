import React from "react"
import { Link } from "react-router-dom"
import "../styles/landing.css"


function Landing() {
    return (
        <div className="main">
            <div className="wrapper">
                <div className="left">
                    <div className="items-wrapper">
                        <div className="item">
                            <span className="icon">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </span>
                            <span className="label">Explore your Zabbix hosts.</span>
                        </div>
                        <div className="item">
                            <span className="icon">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </span>
                            <span className="label">Comment and operate.</span>
                        </div>
                        <div className="item">
                            <span className="icon">
                                <i className="fa fa-comment" aria-hidden="true"></i>
                            </span>
                            <span className="label">Share you job requests.</span>
                        </div>
                    </div>
                </div>

                <div className="center">
                    <h1>
                        Zabbix <br />
                        Desktop & Administration
                    </h1>
                    <span>Join Now.</span>
                    <Link to="/signup" className="btn-sign-up">
                        Sign up
                    </Link>
                    <Link to="/login" className="btn-login">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing