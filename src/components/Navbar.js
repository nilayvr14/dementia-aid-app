import React from 'react';
import { Link } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

const Navbar = () => {
  const { role, setRole } = useRole();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/login">Login</Link>
      {role === 'caretaker' && <Link to="/manage-patients">Manage Patients</Link>}
      <select value={role} onChange={handleRoleChange}>
        <option value="patient">Patient</option>
        <option value="caretaker">Caretaker</option>
      </select>
    </nav>
  );
};

export default Navbar;
