import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

const Player = ({ trailer }) => {

  return (
    <div className="w-screen h-screen z-50 flex text-center justify-center bg-yellow-400 text-blue-700">
      {console.log('from player component:', trailer)}
      <h1>
        HELLO
      </h1>
    </div>
  );
};

export default Player;
