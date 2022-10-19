import React from 'react';
import { Card, CardContent, Divider } from '@mui/material';

import RegisterLabel from '../components/RegisterLabel';
import RegisterForm from '../components/RegisterForm';

import '../styles/views/login.css';

type Props = {
  setView: React.Dispatch<React.SetStateAction<string>>;
};
function Register({ setView }: Props) {
  return (
    <div id="register-container">
      <Card id="register-card" variant="outlined">
        <CardContent id="register-card-content">
          <RegisterLabel className="split left" />
          <Divider flexItem variant="middle" orientation="vertical" />
          <RegisterForm className="split right" setView={setView} />
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
