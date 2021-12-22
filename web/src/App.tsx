
import './App.css';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client"
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Landing from './components/Landing';
import { setContext } from 'apollo-link-context'
import Signup from './pages/Signup';
import Login from './pages/Login';
import IsAuthenticated from './components/IsAuthenticated';
import Home from './pages/Home';
import Profile from './pages/Profile';

const httplink = new HttpLink({ uri: 'http://localhost:4000' })

const authLink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  }
})

const link = authLink.concat(httplink as any)
const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/landing">
            <Landing />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <IsAuthenticated>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </IsAuthenticated>
        </Switch>
      </Router>
    </ApolloProvider>

  );
}

export default App;


