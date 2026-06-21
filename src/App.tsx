import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import MenuPage from './components/menu/MenuPage';
import './App.css';

function App() {
  const [page, setPage] = useState('login');

  return (
    <>
      {page === 'login' && <Login onSwitch={() => setPage('register')} />}
      {page === 'register' && <Register onSwitch={() => setPage('login')} />}
      <MenuPage />
    </>
  );
}

export default App;
