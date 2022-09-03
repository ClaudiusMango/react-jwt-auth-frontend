import './App.css';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom';
import Header from './components/Header';
import { PrivateRoute } from './utils/PrivateRoute';
import { AuthProvider } from './contexts/UserAuthContext';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' exact element = {
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          } />
          <Route path='/login' element = {<LoginPage />} />
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;