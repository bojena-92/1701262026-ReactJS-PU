import { HashRouter as Router, Switch } from 'react-router-dom';
import PublicRoute from './Routes/PublicRoute';
import ProtectedRoute from './Routes/ProtectedRoute';
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
import HomePage from './components/Main/HomePage';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Switch>
          <PublicRoute path="/login" exact>
            <Login />
          </PublicRoute>
          <PublicRoute path="/register" exact>
            <Register />
          </PublicRoute>
          <ProtectedRoute path="/">
            <HomePage />
          </ProtectedRoute>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
