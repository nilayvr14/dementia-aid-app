import React from 'react';
import { useRole } from '../context/RoleContext';

const Login = () => {
  const { setRole } = useRole();

  const handleLogin = (role) => {
    setRole(role);
    // Implement actual authentication logic here
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => handleLogin('patient')}>Login as Patient</button>
      <button onClick={() => handleLogin('caretaker')}>Login as Caretaker</button>
    </div>
  );
};

export default Login;
