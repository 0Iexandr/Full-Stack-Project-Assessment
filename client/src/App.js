import React from 'react';
import { useState } from 'react';
import './App.css';
import Video from './Video/Video';
import dataVideos from './data/exampleresponse.json';
import AddVideoButton from './buttons/AddVideoButton';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [videos, setVideos] = useState(dataVideos);

  const generateVideoRating = () => {
    const rating = Math.round(Math.random() * 2000);
    return rating;
  };

  const addVideo = (videoData) => {
    const newVideo = { ...videoData, id: uuidv4(), rating: generateVideoRating() };
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
          {videos.map((video, key) => (
            <Video video={video} key={key} deleteVideo={deleteVideo} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
