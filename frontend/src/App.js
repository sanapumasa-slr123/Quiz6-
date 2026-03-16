import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import ApplySeller from './screens/ApplySeller';
import UserProfile from './screens/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/services/:id" element={<DetailScreen />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/apply"
            element={
              <ProtectedRoute>
                <ApplySeller />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
