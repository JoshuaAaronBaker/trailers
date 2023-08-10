import React, { useContext } from 'react';
import Main from '../components/Main';
import Row from '../components/Row';
import requests from '../requests';
import AppContext from '../lib/AuthContext';

const Home = ({ handleNewLikes, likedItems }) => {

  const contextValue = useContext(AppContext);
  const token = window.localStorage.getItem('trailerflix-jwt');

  if (token && contextValue.user?.user) {
    return (
      <>
        <Main handleNewLikes={handleNewLikes} likedItems={likedItems}/>
        <Row rowId='0' title={`${(token && contextValue.user?.user) ? contextValue?.user?.user.username : null}'s List`} fetchURL='/auth/get-likes'
        likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='1' title='Top 10 Movies in the U.S. Today' fetchURL={requests.popular} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='2' title='Coming Soon' fetchURL={requests.upcoming} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='3' title='Trending Now' fetchURL={requests.trending} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='4' title='Now Playing in Theaters' fetchURL={requests.nowPlaying} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='5' title='Animation' fetchURL={requests.animation} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='6' title='Horror' fetchURL={requests.horror} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='7' title='Comedy' fetchURL={requests.comedy} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='8' title='Documentaries' fetchURL={requests.documentary} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='9' title='Music' fetchURL={requests.music} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='10' title='Action' fetchURL={requests.action} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='11' title='Adventure' fetchURL={requests.adventure} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='12' title='Thriller' fetchURL={requests.thriller} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='13' title='History' fetchURL={requests.history} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='14' title='Fantasy' fetchURL={requests.fantasy} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='15' title='Science Fiction' fetchURL={requests.scifi} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='16' title='Drama' fetchURL={requests.drama} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='17' title='Romance' fetchURL={requests.romance} likedItems={likedItems} handleNewLikes={handleNewLikes} />
        <Row rowId='18' title='War' fetchURL={requests.war} likedItems={likedItems} handleNewLikes={handleNewLikes} />
      </>
    );
  } else {
    return (
      <>
        <Main />
        <Row rowId='1' title='Top 10 Movies in the U.S. Today' fetchURL={requests.popular} />
        <Row rowId='2' title='Coming Soon' fetchURL={requests.upcoming} />
        <Row rowId='3' title='Trending Now' fetchURL={requests.trending} />
        <Row rowId='4' title='Now Playing in Theaters' fetchURL={requests.nowPlaying} />
        <Row rowId='5' title='Animation' fetchURL={requests.animation} />
        <Row rowId='6' title='Horror' fetchURL={requests.horror} />
        <Row rowId='7' title='Comedy' fetchURL={requests.comedy} />
      </>
    );
  }

};

export default Home;
