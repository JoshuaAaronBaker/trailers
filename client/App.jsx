import React, { useState, useEffect } from 'react';
import parseRoute from './lib/parse-route';
import AppContext from './lib/AuthContext';
import jwtDecode from 'jwt-decode';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import SearchResults from './components/SearchResults';

function App() {

  const [user, setUser] = useState(null);
  const [route, setRoute] = useState(parseRoute(window.location.hash));
  const [list, setList] = useState(true);

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setRoute(parseRoute(window.location.hash));
    });
    const token = window.localStorage.getItem('trailerflix-jwt');
    const user = token ? jwtDecode(token) : null;
    setUser({ user });
  }
  , []);

  const handleSignIn = result => {
    const { user, token } = result;
    window.localStorage.setItem('trailerflix-jwt', token);
    setUser({ user });
    setList(false);
  };

  const handleSignOut = () => {
    window.localStorage.removeItem('trailerflix-jwt');
    setUser({ user: null });
  };

  const renderPage = () => {
    const { path } = route;

    if (path === '') {
      return <Home />;
    }
    if (path === 'sign-in') {
      return <LogIn />;
    }
    if (path === 'sign-up') {
      return <SignUp />;
    }
    if (path === 'results') {
      return <SearchResults />;
    }
  };

  const contextValue = { user, route, handleSignIn, handleSignOut, list };
  return (
    <AppContext.Provider value={contextValue}>
      <>
        <Navbar />
        {renderPage()}
      </>
    </AppContext.Provider>
  );
}

export default App;
