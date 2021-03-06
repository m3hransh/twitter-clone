import './App.css';
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { setContext } from 'apollo-link-context';
import Users from './components/Users';
import Landing from './components/Landing';
import IsAuthenticated from './components/IsAuthenticated';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from './pages/Home';

const httpLink = new HttpLink({
  uri: 'https://mehran-twitter-clone.herokuapp.com',
});
const authLink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authLink.concat(httpLink as any);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache(),
});

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
          <Route path="/users">
            <IsAuthenticated>
              <Users />
            </IsAuthenticated>
          </Route>
          <Route path="/profile">
            <IsAuthenticated>
              <Profile />
            </IsAuthenticated>
          </Route>
          <Route path="/">
            <IsAuthenticated>
              <Home />
            </IsAuthenticated>
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
