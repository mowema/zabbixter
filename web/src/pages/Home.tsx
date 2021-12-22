import { gql, useQuery } from "@apollo/client"
import React from "react"
import { useHistory } from "react-router-dom"
import Hosts from "../components/Hosts"
import LeftNav from "../components/LeftNav"
import "../styles/home.css"
import "../styles/layout.css"

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

function Home() {
  const history = useHistory()
  const { loading, error, data } = useQuery(ME_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  return (
    <>
      <div className="base">
        <div className="left">
          <LeftNav />
        </div>
        <div className="home">
          <div className="home-header">
            <h3 className="home-title">Zabbix</h3>
          </div>
          <Hosts />
        </div>
      </div>
    </>
  )
}

export default Home