//import React from 'react';
import { gql, useQuery } from '@apollo/client'

const ALLUSERS_QUERY = gql`
    query ALLUSERS_QUERY {
        allUsers {
            id
            name
        }
    }
    `

interface User {
    name: string,
}

function Users() {
    const { loading, error, data } = useQuery(ALLUSERS_QUERY)
    if (loading) { return <p>Loading...</p> }
    if (error) { return <p>{error.message}</p> }
    return (
        <div>
            {data.allUsers.map((user: User) => <p>{user.name}</p>)}
        </div>
    );
}

export default Users;