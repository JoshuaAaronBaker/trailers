import React, { useState, useEffect } from 'react';
import parseRoute from './lib/parse-route';
import AppContext from './lib/AuthContext';
import jwtDecode from 'jwt-decode';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const [searchKey, setSearchKey] = useState('');
  const updateKey = e => setSearchKey(e?.target?.value);

  useEffect(() => {
    if (searchKey) {
      document.body.style.overflowY = 'hidden';
    } else document.body.style.overflowY = 'visible';
  });

  const handleSearch = event => {
    event.preventDefault();

  };

  const [likedItems, setLikedItems] = useState([]);

  const handleNewLikes = item => {
    setLikedItems(prevLikedItems => [...prevLikedItems, item]);
    toast.success(`${item.title} was added to favorites`, {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    });
  };

  const handleRemoveLikes = item => {
    toast.error(`${item.title} was removed from favorites`, {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    });
    setLikedItems(prevLikedItems => [...prevLikedItems]);
  };

  const renderPage = () => {
    const { path } = route;

    if (path === '') {
      return <Home handleNewLikes={handleNewLikes} likedItems={likedItems} handleRemoveLikes={handleRemoveLikes} />;
    }
    if (path === 'sign-in') {
      return <LogIn />;
    }
    if (path === 'sign-up') {
      return <SignUp />;
    }
  };

  const contextValue = { user, route, handleSignIn, handleSignOut, list, handleSearch, searchKey, setSearchKey, handleNewLikes, handleRemoveLikes, likedItems, updateKey };
  return (
    <AppContext.Provider value={contextValue}>
      <>
        <Navbar />
        {renderPage()}
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
      </>
    </AppContext.Provider>
  );
}

export default App;
