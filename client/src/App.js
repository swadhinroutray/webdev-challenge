import React from 'react';
import logo from './logo.svg';
import './App.css';
import Headers from './components/Header'
import AppRouter from './pages/AppRouter'
function App() {
  return (
    <div className="App">
      <Headers />
      <AppRouter />
     </div>
  );
}

export default App;
