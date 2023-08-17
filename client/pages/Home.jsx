import React, { useContext } from 'react';
import Main from '../components/Main';
import Row from '../components/Row';
import requests from '../requests';
import AppContext from '../lib/AuthContext';

const Home = ({ handleNewLikes, likedItems, handleRemoveLikes }) => {

  const contextValue = useContext(AppContext);
  const token = window.localStorage.getItem('trailerflix-jwt');

  if (token && contextValue.user?.user) {
    return (
      <>
        <Main handleNewLikes={handleNewLikes} likedItems={likedItems} handleRemoveLikes={handleRemoveLikes}/>
        <Row rowId='0' title={`${(token && contextValue.user?.user) ? contextValue?.user?.user.username : null}'s Favorites`} fetchURL='/auth/get-likes'
          likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes}/>
        <Row rowId='1' title='Top 10 Movies in the U.S. Today' fetchURL={requests.popular} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='2' title='Trending Now' fetchURL={requests.trending} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='3' title='Coming Soon' fetchURL={requests.upcoming} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='4' title='Now Playing in Theaters' fetchURL={requests.nowPlaying} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='5' title='Top Rated' fetchURL={requests.topRated} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='6' title='TV Movies' fetchURL={requests.tvMovies} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='7' title='Action' fetchURL={requests.action} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='8' title='Fantasy' fetchURL={requests.fantasy} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='9' title='Adventure' fetchURL={requests.adventure} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='10' title='Horror' fetchURL={requests.horror} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='11' title='Comedy' fetchURL={requests.comedy} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='12' title='Animation' fetchURL={requests.animation} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='13' title='Science Fiction' fetchURL={requests.scifi} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='14' title='Thriller' fetchURL={requests.thriller} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='15' title='Romance' fetchURL={requests.romance} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='16' title='Crime' fetchURL={requests.crime} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='17' title='Music' fetchURL={requests.music} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
        <Row rowId='18' title='War' fetchURL={requests.war} likedItems={likedItems} handleNewLikes={handleNewLikes} handleRemoveLikes={handleRemoveLikes} />
      </>
    );
  } else {
    return (
      <>
        <Main />
        <Row rowId='1' title='Top 10 Movies in the U.S. Today' fetchURL={requests.popular} />
        <Row rowId='2' title='Trending Now' fetchURL={requests.trending} />
        <Row rowId='3' title='Coming Soon' fetchURL={requests.upcoming} />
        <Row rowId='4' title='Now Playing in Theaters' fetchURL={requests.nowPlaying} />
        <Row rowId='5' title='Top Rated' fetchURL={requests.topRated} />
        <Row rowId='6' title='TV Movies' fetchURL={requests.tvMovies} />
        <Row rowId='7' title='Action' fetchURL={requests.action} />
        <Row rowId='8' title='Fantasy' fetchURL={requests.fantasy} />
        <Row rowId='9' title='Adventure' fetchURL={requests.adventure} />
        <Row rowId='10' title='Horror' fetchURL={requests.horror} />
        <Row rowId='11' title='Comedy' fetchURL={requests.comedy} />
        <Row rowId='12' title='Animation' fetchURL={requests.animation} />
        <Row rowId='13' title='Science Fiction' fetchURL={requests.scifi} />
        <Row rowId='14' title='Thriller' fetchURL={requests.thriller} />
        <Row rowId='15' title='Romance' fetchURL={requests.romance} />
        <Row rowId='16' title='Crime' fetchURL={requests.crime} />
        <Row rowId='17' title='Music' fetchURL={requests.music} />
        <Row rowId='18' title='War' fetchURL={requests.war} />
      </>
    );
  }

};

export default Home;
