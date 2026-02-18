import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('cerealpro_user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Simple authentication simulation
    const users = JSON.parse(localStorage.getItem('cerealpro_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('cerealpro_user', JSON.stringify(user));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleRegister = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('cerealpro_users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false;
    }
    
    const newUser = { email, password, id: Date.now() };
    users.push(newUser);
    localStorage.setItem('cerealpro_users', JSON.stringify(users));
    localStorage.setItem('cerealpro_user', JSON.stringify(newUser));
    setIsAuthenticated(true);
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem('cerealpro_user');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <Register onRegister={handleRegister} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
              <Dashboard onLogout={handleLogout} /> : 
              <Navigate to="/login" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
