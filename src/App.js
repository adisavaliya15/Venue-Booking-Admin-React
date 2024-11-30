import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Venue from './Pages/Venue';
import Booking from './Pages/Booking';
import Customer from './Pages/customer';
import Payment from './Pages/payment';
import Feedback from './Pages/feedback';
import Complaints from './Pages/complaints';
import LoginPage from './Pages/LoginPage';
import { useEffect, useState } from 'react';
import checkSession from './auth/authService'; // Import the checkSession function
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  axios.defaults.withCredentials = true;

  //for checking session 
  useEffect(() => {
    const authenticateUser = async () => {

      // Call checkSession to determine if user is authenticated
      // const isAuthenticated = await checkSession();
      // setIsAuthenticated(isAuthenticated);
      // setLoading(false); // Set loading to false after checking session
      try {
        const isAuthenticated = await checkSession();
        setIsAuthenticated(isAuthenticated);

      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Set loading to false after authentication check
      }
    };
    if (!isAuthenticated) {
      authenticateUser(); // Check session only if user is not authenticated
    } else {
      setLoading(false); // Set loading to false immediately if user is authenticated
    }

  }, [isAuthenticated]);

  // Render routes only after loading is false and isAuthenticated is determined
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/venue.html" element={isAuthenticated ? <Venue /> : <Navigate to="/login" />} />
          <Route path="/booking.html" element={isAuthenticated ? <Booking /> : <Navigate to="/login" />} />
          <Route path="/customer.html" element={isAuthenticated ? <Customer /> : <Navigate to="/login" />} />
          <Route path="/payment.html" element={isAuthenticated ? <Payment /> : <Navigate to="/login" />} />
          <Route path="/feedback.html" element={isAuthenticated ? <Feedback /> : <Navigate to="/login" />} />
          <Route path="/complaints.html" element={isAuthenticated ? <Complaints /> : <Navigate to="/login" />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
