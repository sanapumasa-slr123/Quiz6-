import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import HomeScreen from './screens/HomeScreen';
import ElectricalServices from './screens/ElectricalServices';
import DetailScreen from './screens/DetailScreen';
import ApplySeller from './screens/ApplySeller';
import UserProfile from './screens/UserProfile';
import UserScreen from './screens/UserScreen';
import SellerDashboard from './screens/SellerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/electrical-services" element={<ElectricalServices />} />
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
          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRoute requiredRole="seller">
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <UserScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Chatbot />
      </Router>
    </Provider>
    </ErrorBoundary>
  );
}

export default App;
