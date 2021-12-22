import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Modal from "react-modal";
import { useHistory } from 'react-router-dom';
import { ME_QUERY } from "../pages/Profile";
import { logoutModalStyles } from "../styles/LogoutModal"


function Logout() {
    const history = useHistory()
    const [modalIsOpen, setIsOpen] = useState(false)

    const { loading, error, data } = useQuery(ME_QUERY)

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>


    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }


    const handleLogout = async () => {
        localStorage.removeItem("token")
        history.push("/login")
    }

    return (
        <div className="logout">
            <span onClick={openModal} style={{ flex: 1, flexDirection: "row" }}>
                <h4>
                    Logout
                </h4>
            </span>
            <div style={{ position: "absolute", bottom: 0 }}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Modal"
                    style={logoutModalStyles}
                >
                    <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                        <p style={{ borderBottom: "1px solid black" }}>
                            Log out @{data.me.name}
                        </p>
                    </span>
                </Modal>
            </div>
        </div>
    );
}

export default Logout;