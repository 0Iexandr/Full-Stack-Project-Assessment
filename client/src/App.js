import React from 'react';
import { useState } from 'react';
import './App.css';
import Video from './Video/Video';
import dataVideos from './data/exampleresponse.json';
import AddVideoButton from './buttons/AddVideoButton';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [videos, setVideos] = useState(dataVideos);
  const sortedVideos = videos.sort((a, b) => b.rating - a.rating);

  const addVideo = (videoData) => {
    const rating = Math.round(Math.random() * 3000);
    const newDate = new Date();
    const date = newDate.toLocaleDateString('fr-CA');
    const time = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
    const newVideo = { ...videoData, id: uuidv4(), rating: rating, date: date, time: time };
    setVideos(prevState => [...prevState, newVideo]);
  };

  const deleteVideo = (id) => {
    setVideos(prevState => prevState.filter(video => video.id !== id));
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Video Recommendation</h1>
      </header>
      <main className='App-main'>
        <AddVideoButton addVideo={addVideo} />
        <section className='videos'>
          {sortedVideos.map((video) => (
            <Video video={video} key={video.id} deleteVideo={deleteVideo} />
          ))} 
        </section>
      </main>
    </div>
  );
}

export default App;
