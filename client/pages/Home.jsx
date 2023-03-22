import React from 'react';
import Main from '../components/Main';
import Row from '../components/Row';
import requests from '../requests';

const Home = () => {
  return (
    <>
      <Main />
      <Row rowId='1' title='Top 10 Movies in the U.S. Today' fetchURL={requests.popular} />
      <Row rowId='2' title='Coming Soon' fetchURL={requests.upcoming} />
      <Row rowId='3' title='Trending Now' fetchURL={requests.trending} />
      <Row rowId='4' title='Now Playing in Theaters' fetchURL={requests.nowPlaying} />
      <Row rowId='5' title='Animation' fetchURL={requests.animation} />
      <Row rowId='6' title='Horror' fetchURL={requests.horror} />
    </>
  );
};

export default Home;
