import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RoleProvider } from './context/RoleContext';
import { PatientProvider } from './context/PatientContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ManagePatients from './pages/ManagePatients';

const App = () => {
  return (
    <RoleProvider>
      <PatientProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/manage-patients" element={<ManagePatients />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Router>
      </PatientProvider>
    </RoleProvider>
  );
};

export default App;
