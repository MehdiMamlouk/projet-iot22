import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import HomePage from './components/HomePage'; 
import NotificationPage from './components/NotificationPage'; 
import HistoryPage from './components/HistoryPage'; 
import RemoteActivationPage from './components/RemoteActivationPage'; 
import Navbar from './components/Navbar'; 
import './App.css'; 
import LoginPage from './components/Login'; 
import UserPage from './components/UserPage'; 
import AdminPage from './components/AdminPage'; 
import PlantHistoryPage from './components/PlantHistoryPage'; 

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage backgroundImage="url('/images/fond2.jpeg')" />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/historypage" element={<PlantHistoryPage />} />
        <Route path="/remote" element={<RemoteActivationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;