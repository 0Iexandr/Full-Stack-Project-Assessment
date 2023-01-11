import React, { useState } from 'react';
import DeleteButton from '../buttons/DeleteButton';
import LikeIcon from '../buttons/LikeIcon';
import DislikeIcon from '../buttons/DislikeIcon';
import YouTubeEmbed from '../YouTubeEmbed/YouTubeEmbed';

function Video({video, deleteVideo}) {
  const [votes, setVotes] = useState(video.rating);

  const addVote = (event) => {
    if(event.currentTarget.name === 'like') {
      setVotes(votes + 1);
    } else {
      setVotes(votes - 1);
    }
  };

  return (
    <div className='video-container'>
      <p>{video.title}</p>
      <YouTubeEmbed video={video} />
      <div className='control-container'>
        <div className='vote-container'>
          <LikeIcon addVote={addVote} />
          <p>{votes} Votes</p>
          <DislikeIcon addVote={addVote} />
        </div>
        <DeleteButton deleteVideo={() => deleteVideo(video.id)}/>
      </div>
    </div>
  );
}

export default Video