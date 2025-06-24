import React from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div style={{
      width: '70vw',
      minHeight: '110vh',
      margin: '0 auto',
      backgroundColor: 'goldenrod',
      padding: '16px',
      boxSizing: 'border-box'
    }}>
      <AppRoutes />
    </div>
  );
}

export default App;
