import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Video from './Video/Video';
import AddVideoButton from './buttons/AddVideoButton';

function App() {
  const [videos, setVideos] = useState([]);
  const sortedVideos = videos.sort((a, b) => b.rating - a.rating);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/', {
      mode: 'cors'
    })
    .then(res => res.json())
    .then(data => setVideos(data))
  }, []);

  const addVideo = (videoData) => {
    fetch('http://127.0.0.1:5000/', {
      method: 'post',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(videoData)
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
    })
    .then(data => setVideos(prevState => [...prevState, data]))
  };

  const deleteVideo = (id) => {
    fetch(`http://127.0.0.1:5000/${id}`, {
      method: 'delete',
      mode: 'cors'
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
    })
    .then(data => setVideos(data))
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
