import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router-dom';
import CreateProfile from '../components/CreateProfile';
import LeftNav from '../components/LeftNav';
import UpdateProfile from '../components/UpdateProfile';

import "../styles/layout.css"
import "../styles/profile.css"

export const ME_QUERY = gql`
    query me {
        me {
            id
            name
            Profile {
                id
                bio
                location
                website
            }
        }
    }
`

function Profile() {
    const history = useHistory()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, error, data } = useQuery(ME_QUERY)
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    return (
        <>
            <div className="base">
                <div className="left">
                    <LeftNav />
                </div>
                <div className="profile">
                    <div className="profile-info">
                        <div className="profile-head">
                            <span className="back-arrow" onClick={() => history.goBack()}>
                                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                            </span>

                        </div>
                        <div className="avatar">
                            <i className="fa fa-user fa-5x" aria-hidden="true"></i>
                        </div>
                        <div className="make-profile">
                            {data.me.Profile ? <UpdateProfile /> : <CreateProfile />}
                        </div>

                        <h3 className="name">{data.me.name}</h3>

                        {data.me.Profile ? (
                            <p>
                                <i className="fas fa-link"> </i> {data.me.Profile.website}
                            </p>
                        ) : null}

                    </div>

                </div>
            </div>
        </>
    );
}

export default Profile;